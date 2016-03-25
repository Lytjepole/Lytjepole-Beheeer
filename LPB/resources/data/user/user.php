<?php
/**
 * Created by IntelliJ IDEA.
 * User: Peter
 * Date: 5-12-2015
 * Time: 12:35
 */
session_start();
require('../connections/mysql.php');

function getUserImage($imageId, $database) {
    $sql = "SELECT * FROM `userImages` WHERE `id` = ".$imageId."";
    $result = $database->query($sql);
    $image = mysqli_fetch_object($result);
    return $image;
}

switch($_GET['action']) {
    case 'create': // create new user

        break;
    case 'update':
        $rawdata = $GLOBALS['HTTP_RAW_POST_DATA'];
        $tmp = json_decode($rawdata);
        $data = $tmp->user;
        for ($i = 0; $i < count($data); $i++) {
            $userId = $data[$i]->id;
            $fullName = $data[$i]->fullName;
            $email = $data[$i]->email;
            $phone = $data[$i]->phone;
            $street = $data[$i]->street;
            $number = $data[$i]->number;
            $zip = $data[$i]->zip;
            $city = $data[$i]->city;
            $accessLevel = $data[$i]->accessLevel;
            $enabled = $data[$i]->enabled;
            $lat = $data[$i]->lat;
            $lng = $data[$i]->lng;
            $imageId = $data[$i]->imageId;

            $sql = "UPDATE users SET imageId = '".$imageId."', lat = '" . $lat . "', lng = '" . $lng . "', accessLevel = '" . $accessLevel . "', fullName = '" . $fullName . "', street = '" . $street . "', number = '" . $number . "', zip = '" . $zip . "', city = '" . $city . "', phone = '" . $phone . "', email = '" . $email . "', enabled = '" . $enabled . "' WHERE id = '" . $userId . "'";

            $database->query($sql);
            $image = getUserImage($imageId, $database);
            echo '{"success": true, "user": [{"id":'.$userId.', "imagePath":"'.$image->imagePath.'"}]}';
        }
        break;
    case 'destroy';

        break;
    case 'checkAdminCount': // check admin count

        break;
    case 'resetpassword':

        break;
    default:
        if(isset($_GET['id'])) { // id is given return user data
            $userId = $_GET['id'];
            $sql = "SELECT `U`.`id`, `U`.`userName`, `U`.`accessLevel`, `U`.`fullName`, `U`.`street`, `U`.`number`, `U`.`zip`, `U`.`city`, `U`.`phone`, `U`.`email`, `U`.`created`, `U`.`lastEdited`, `U`.`enabled`, `U`.`lat`, `U`.`lng`, `U`.`imageId`, `UI`.`imagePath` FROM `users` `U` LEFT JOIN `userImages` `UI` on `U`.`imageId` = `UI`.`id`  WHERE `U`.`id`= ?";
            $stmt = $database->prepare($sql);
            $stmt->bind_param('i', $userId);
            $stmt->execute();
            $stmt->bind_result($id, $userName, $accessLevel, $fullName, $street, $number, $zip, $city, $phone, $email, $created, $lastEdited, $enabled, $lat, $lng, $imageId, $imagePath);
            $stmt->store_result();
            $stmt->fetch();
            $arr = array('id'=>$id, 'userName'=>$userName, 'accessLevel'=>$accessLevel, 'fullName'=>$fullName, 'street'=>$street, 'number'=>$number, 'zip'=>$zip, 'city'=>$city, 'phone'=>$phone, 'email'=>$email, 'created'=>$created, 'lastEdited'=>$lastEdited, 'enabled'=>$enabled, 'lat'=>$lat, 'lng'=>$lng, 'imageId'=>$imageId, `imagePath`=>$imagePath);

            if($stmt->num_rows) {
                echo '{"success": true, "total": 1, "user":' . json_encode($arr) . '}';
            }else {
                echo '{"success": false}';
            }
        } else {
            $sql = "SELECT `U`.`id`, `U`.`userName`, `U`.`accessLevel`, `U`.`fullName`, `U`.`street`, `U`.`number`, `U`.`zip`, `U`.`city`, `U`.`phone`, `U`.`email`, `U`.`created`, `U`.`lastEdited`, `U`.`enabled`, `U`.`lat`, `U`.`lng`, `U`.`imageId`, `UI`.`imagePath` FROM `users` `U` LEFT JOIN `userImages` `UI` on `U`.`imageId` = `UI`.`id`";
            $stmt = $database->prepare($sql);
            $stmt->execute();
            $stmt->bind_result($id, $userName, $accessLevel, $fullName, $street, $number, $zip, $city, $phone, $email, $created, $lastEdited, $enabled, $lat, $lng, $imageId, $imagePath);
            $stmt->store_result();
            while ($stmt->fetch()) {
                $arr[] = [id=>$id, userName=>$userName, accessLevel=>$accessLevel, fullName=>$fullName, street=>$street, number=>$number, zip=>$zip, city=>$city, phone=>$phone, email=>$email, created=>$created, lastEdited=>$lastEdited, enabled=>$enabled, lat=>$lat, lng=>$lng, imageId=>$imageId, imagePath=>$imagePath];
            }
            echo '{"success": true, "total": '.$stmt->num_rows.', "user":' . json_encode($arr) . '}';
        }
        break;
}