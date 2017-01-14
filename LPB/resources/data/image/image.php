<?php
/**
 * Created by IntelliJ IDEA.
 * User: Peter
 * Date: 30-1-2016
 * Time: 09:41
 */

session_start();
include('../connections/mysql.php');

function getAverageColor($filename)
{
    // get average color from imagefile returns pixel object

    // Read image file with Image Magick
    $imageT = new Imagick($filename);
    // scale down to 1x1
    $imageT->scaleimage(1, 1);

    $pixels = $imageT->getimagehistogram();

    $pixel = reset($pixels);
    $rgb = $pixel->getcolor();

    return $pixel;
}

switch ($_GET['action']) {
    case 'createtmpimage': //upload tmp image to server
        try {
            //phpinfo();

            if (!count($_FILES) && !count($_POST)) {
                throw new RuntimeException('Er is iets misgegaan...');
            };

            //check error value
            switch ($_FILES['image']['error']) {
                case UPLOAD_ERR_OK :
                    break;
                case UPLOAD_ERR_NO_FILE :
                    throw new RuntimeException('no file uploaded');
                    break;
                case UPLOAD_ERR_INI_SIZE :
                case UPLOAD_ERR_FORM_SIZE :
                    throw new RuntimeException('upload file size limit exceeded');
                    break;
                default :
                    throw new RuntimeException('Unknown error');
            }

            //check file size
            if ($_FILES['image']['size'] > 10000000) {
                throw new RuntimeException('Opgegeven bestand is te groot.');
            }

            //check mime type of uploaded file
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            if (false === $ext = array_search($finfo->file($_FILES['image']['tmp_name']), array('jpg' => 'image/jpeg', 'png' => 'image/png', 'gif' => 'image/gif',), true)) {
                throw new RuntimeException('Bestandsformaat is ongeldig.');
            }

            // move uploaded file to tmpDir
            $originalFilename = $_FILES[image][name];
            $tmpDir = $_POST['tmpDir'];
            $tmpFileExt = $ext;
            $tmpFileName = md5(time());

            $destination = $tmpDir . $tmpFileName . '.' . $tmpFileExt;

            if (!move_uploaded_file($_FILES['image']['tmp_name'], $destination)) {
                throw new RuntimeException('Probleem met bestand');
            }

            // check image dimensions
            $file = $destination;
            $handle = fopen($file, 'a+');
            $image = new Imagick();
            $image->readImageFile($handle);
            $geometry = $image->getImageGeometry();

            if (($geometry['width'] < $_POST['minImageWidth']) or ($geometry['height'] < $_POST['minImageHeight'])) {
                unlink($file); // delete tmp file
                throw new RuntimeException('Opgegeven bestand is te klein');
            }

            // result if no errors did occur
            echo '{"success": true, "data": {"tmpName": "' . $tmpFileName . '.' . $ext . '", "extension": "' . $ext . '", "originalFilename": "' . $originalFilename . '"}}';
        } catch (RuntimeException $e) {
            // result if error
            echo '{"success": false, "errors": {"image": "' . $e->getMessage() . '"}}';
        }
        break;
    case 'tmpimage':
        //show tmp image 800x600
        $minCropWidth = $_GET['minCropWidth'];
        $minCropHeight = $_GET['minCropHeight'];

        $image = new Imagick('../../images/temp/' . $_GET['image']);
        $format = $image->getImageFormat();
        $averageColor = getAverageColor('../../images/temp/' . $_GET['image']);
        $geometry = $image->getImageGeometry();
        header('Content-type: image/' . $format . '');

        // if image $height > canvas height
        if ($geometry['width'] > 600 or $geometry['height'] > 800) {
            $image->resizeImage(800, 600, imagick::FILTER_CATROM, 1, true);
        }

        $canvas = new Imagick();
        $canvas->newImage(800, 600, $averageColor, $format);

        $geometry = $image->getImageGeometry();
        $x = (800 - $geometry['width']) / 2;
        $y = (600 - $geometry['height']) / 2;

        $canvas->compositeImage($image, imagick::COMPOSITE_OVER, $x, $y);

        if (isset($_GET['writetofile'])) {
            //write image to file
        } else {
            // display on screen
            //$canvas->WriteImage('../../images/temp/tmp_' . $_GET['image']);
            echo $canvas;
        }
        break;
    case 'cleantmpimage':
        unlink('../../images/temp/' . $_GET['tmpimage']);
        break;
    case 'create':
        $rawdata = file_get_contents("php://input");
        $tmp = json_decode($rawdata);
        $data = $tmp->image;

        for($i = 0; $i < count($data); $i++) {
            $tmpName = $data[0]->params->tmpName;
            //$title = $_POST['title'];
            //$artist = $_POST['artist'];
            //$ownerId = $_POST['ownerId'];
            $cropx = $data[$i]->params->x;
            $cropy = $data[$i]->params->y;
            $cropWidth = $data[$i]->params->cropWidth;
            $cropHeight = $data[$i]->params->cropHeight;
            $tmpDir = $data[$i]->params->tmpDir;
            $destDir = $data[$i]->params->uploadDir;
            $thumbnailDir = $data[$i]->params->thumbnailDir;
            $thumbnailWidth = $data[$i]->params->thumbnailWidth;
            $thumbnailHeight = $data[$i]->params->thumbnailHeight;
            $originalFilename = $data[$i]->params->originalFilename;
            $imageTitle = $data[$i]->params->imageTitle;
            $userId = $data[$i]->params->userId;

            $image = new Imagick('../../images/temp/' . $tmpName);

            $format = $image->getImageFormat();
            $averageColor = getAverageColor('../../images/temp/' . $tmpName);
            $geometry = $image->getImageGeometry();

            // if image $height > canvas height
            if ($geometry['width'] > 600 or $geometry['height'] > 800) {
                $image->resizeImage(800, 600, imagick::FILTER_CATROM, 1, true);
            }

            $canvas = new Imagick(); // blank canvas
            $canvas->newImage(800, 600, $averageColor, $format);

            $geometry = $image->getImageGeometry();
            $x = (800 - $geometry['width']) / 2;
            $y = (600 - $geometry['height']) / 2;

            // check if filename exists if so add $i to beginning of filename and check again
            $testName = $originalFilename;
            $i = 1;
            while (file_exists('../../images/items/' . $testName)) {
                $testName = $i . '_' . $originalFilename;
                $i++;
            }

        $canvas->compositeImage($image, imagick::COMPOSITE_OVER, $x, $y);
        $canvas->setImagePage(0, 0, 0, 0);
        $canvas->cropImage($cropWidth, $cropWidth, $cropx, $cropy);
        $canvas->setImagePage(0, 0, 0, 0);
        $origcanvas = $canvas;
        $canvas->resizeImage(150, 150, imagick::FILTER_CATROM, 1, true);
        $canvas->writeImage('../../images/items/'.$testName);
        $origcanvas->resizeImage(75, 75, imagick::FILTER_CATROM, 1, true);
        $origcanvas->writeImage('../../images/items/75x75/'.$testName);

        //update database

        $sql = "INSERT INTO `images` (`imageName`, `imagePath`, `artist`, `ownerId`, `recentlyUsed`) VALUES ('".$imageTitle."', '".$testName."', '', '".$userId."', NOW());";
        $database->query($sql);
        }

        echo '{"success": true}';
        break;
//    case 'create': // create new image
//        echo '{"success": false}';
//        break;
    case 'update':
        $rawdata = file_get_contents("php://input");
        $tmp = json_decode($rawdata);
        $data = $tmp->image;

        $sql = "UPDATE `images` SET `imageName` = ?, `artist` = ? WHERE `id` = ?";
        $stmt = $database->prepare($sql);
        $stmt->bind_param("ssi", $imageName, $artist, $id);

        for ($i = 0; $i < count($data); $i++) {
            $imageName = $data[$i]->imageName;
            $artist = $data[$i]->artist;
            $id = $data[$i]->id;

            $stmt->execute();
        }
        echo '{"success": true}';
        break;
    case 'destroy';
        $rawdata = file_get_contents("php://input");
        $tmp = json_decode($rawdata);
        $data = $tmp->image;

        for ($i = 0; $i < count($data); $i++) {
            $id = $data[$i]->id;
            $imagePath = $data[$i]->imagePath;

            // update database images
            $sql = "DELETE FROM `images` WHERE `id` = " . $id;
            $database->query($sql);

            unlink('../../images/items/' . $imagePath);
            unlink('../../images/items/75x75/' . $imagePath);
        }

        echo '{"success": true}';
        break;
    default:
            $start = $_GET['start'];
            $pageSize = $_GET['limit'];

            if (isset($pageSize)) {
                $limitSql = " LIMIT " . $start . " ,  " . $pageSize . " ";
            }

            if (isset($_GET['sort'])) {
                $sortData = json_decode(stripslashes($_GET['sort']));
                for ($i = 0; $i < count($sortData); $i++) {
                    $sortSql[] = ' ' . $sortData[$i]->property . ' ' . $sortData[$i]->direction . ' ';
                }

                $sortSql = ' ORDER BY ' . implode(',', $sortSql);
            }

            if (isset($_GET['filter'])) {
                $filterData = json_decode(stripslashes($_GET['filter']));
                $filterSql = ' WHERE ';
                for ($i = 0; $i < count($filterData); $i++) {
                    $filterArray[] = '`' . $filterData[$i]->property . '` ' . $filterData[$i]->operator . ' \'' . $filterData[$i]->value . '\' ';
                }
                $filterSql .= implode(' AND ', $filterArray);
            }

            if (isset($_GET['id'])) {
                $sql = "SELECT SQL_CALC_FOUND_ROWS id, imageName, imagePath, ownerId, recentlyUsed, artist FROM images WHERE `id` = ".$_GET['id']."";
            } else {
                // no image id given return all images bounded by sorting and filters parameters
                $sql = "SELECT SQL_CALC_FOUND_ROWS id, imageName, imagePath, ownerId, recentlyUsed, artist FROM images " . $filterSql . " " . $sortSql . " " . $limitSql . "";
            }

            //$sql = "SELECT SQL_CALC_FOUND_ROWS id, imageName, imagePath, ownerId, recentlyUsed, artist FROM images " . $filterSql . " " . $sortSql . " " . $limitSql . "";

            $result = $database->query($sql);
            $totalQuery = 'SELECT FOUND_ROWS()';
            $totalResult = $database->query($totalQuery);
            $total = mysqli_fetch_row($totalResult);

            if (mysqli_num_rows($result)) {
                while ($obj = mysqli_fetch_object($result)) {
                    $arr[] = $obj;
                }
                echo '{"success": true, "total": ' . $total[0] . ', "image":' . json_encode($arr) . '}';
            } else {
                echo '{"success": true, "total": "0", "image":' . json_encode($arr) . '}';
            }
        break;
}