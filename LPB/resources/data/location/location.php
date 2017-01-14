<?php
/**
 * Created by IntelliJ IDEA.
 * User: Peter
 * Date: 27-4-2016
 * Time: 09:23
 */

session_start();
require('../connections/mysql.php');
//require('../php/common/sha256.php');

/** get image info for given location
 *
 * @param int $length, object $database
 * @return object
 * @author Peter
 */
function getLocationImage($locationId, $database)
{
    $sql = "SELECT * FROM `locationImages` WHERE `id` = " . $locationId . "";
    $result = $database->query($sql);
    $image = mysqli_fetch_object($result);
    return $image;
}

switch ($_GET['action']) {
    case 'create':
        $rawdata = file_get_contents("php://input");
        $tmp = json_decode($rawdata);
        $data = $tmp->location;
        $sql = "INSERT INTO `locations` (`name`, `ownerId`, `defaultLoc`, `street`, `number`, `zip`, `city`, `phone`, `www`, `email`, `lat`, `lng`, `fullAddress`, `markerType`, `imageId`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $database->prepare($sql);
        $stmt->bind_param("siissssssssssii", $name, $ownerId, $defaultLoc, $street, $number, $zip, $city, $phone, $www, $email, $lat, $lng, $fullAddress, $markerType, $imageId);
        //print_r($stmt);

        for ($i = 0; $i < count($data); $i++) {
            //$stmt->bind_param(':name', $data[$i]->name);
            $name = $data[$i]->name;
            $ownerId = $data[$i]->userId;
            $defaultLoc = 0;
            $street = $data[$i]->street;
            $number = $data[$i]->number;
            $zip = $data[$i]->zip;
            $city = $data[$i]->city;
            $phone = $data[$i]->phone;
            $www = $data[$i]->www;
            $email = $data[$i]->email;
            $lat = $data[$i]->lat;
            $lng = $data[$i]->lng;
            $fullAddress = $data[$i]->fullAddress;
            $markerType = 0;
            if($data[$i]->imageId == null) {$imageId = 1;} else {$imageId = $data[$i]->imageId;}

            $stmt->execute();
        }

        $image = getLocationImage($imageId, $database);

        echo '{"success": true, "location": [{"id":' . $stmt->insert_id . ', "imagePath":"' . $image->imagePath . '"}]}';
        break;
    case 'update':
        $rawdata = file_get_contents("php://input");
        $tmp = json_decode($rawdata);
        $data = $tmp->location;

        $sql = "UPDATE `locations` SET `name` = ?, `ownerId` = ?, `defaultLoc` = ?, `street` = ?, `number` = ?, `zip` = ?, `city` = ?, `phone` = ?, `www` = ?, `email` = ?, `lat` = ?, `lng` = ?, `fullAddress` = ?, `markerType` = ?, `imageId` = ?  WHERE `id` = ?";
        $stmt = $database->prepare($sql);
        $stmt->bind_param("siissssssssssiii", $name, $ownerId, $defaultLoc, $street, $number, $zip, $city, $phone, $www, $email, $lat, $lng, $fullAddress, $markerType, $imageId, $id);

        for ($i = 0; $i < count($data); $i++) {
            print_r($data[i]->name);
            $name = $data[$i]->name;
            $ownerId = $data[$i]->userId;
            $defaultLoc = 0;
            $street = $data[$i]->street;
            $number = $data[$i]->number;
            $zip = $data[$i]->zip;
            $city = $data[$i]->city;
            $phone = $data[$i]->phone;
            $www = $data[$i]->www;
            $email = $data[$i]->email;
            $lat = $data[$i]->lat;
            $lng = $data[$i]->lng;
            $fullAddress = $data[$i]->fullAddress;
            $markerType = 1;
            $imageId = $data[$i]->imageId;
            $id = $data[$i]->id;

            //print_r($stmt);
            $stmt->execute();
           // print_r($stmt);
        }
        $image = getLocationImage($imageId, $database);

        echo '{"success": true, "location": [{"id":' . $id . ', "imagePath":"' . $image->imagePath . '"}]}';
        break;
    case 'destroy':
        $rawdata = file_get_contents("php://input");
        $tmp = json_decode($rawdata);
        $data = $tmp->location;

        for ($i = 0; $i < count($data); $i++) {
            // delete location
            echo $sql = "DELETE FROM `locations` WHERE `id` = '".$data[$i]->id."'";
            print_r($database->query($sql));
            // clear item location
            $itemSql = "UPDATE `items` SET `locationId` = '0', `shortLocation` = '-' WHERE `id` = '".$data[$i]->id."'";
            $database->query($itemSql);
            // clear template location
            $tempSql = "UPDATE `templates` SET `locationId` = '0', `shortLocation` = '-' WHERE `id` = '".$data[$i]->id."'";
            $database->query($tempSql);
        }

        break;
    default:
        if (isset($_GET['id'])) { // id is given return single location

        } else {
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

            $sql = "SELECT SQL_CALC_FOUND_ROWS `L`.`id`, `L`.`name`, `L`.`ownerId` AS `userId`, `L`.`street`, `L`.`number`, `L`.`zip`, `L`.`city`, `L`.`phone`, `L`.`www`, `L`.`email`, `L`.`lat`, `L`.`lng`, `L`.`fullAddress`, `L`.`markerType`, `L`.`imageId`,  `I`.`imagePath` FROM `locations` `L` LEFT JOIN `locationImages` `I` ON `L`.`imageId` = `I`.`id` ".$filterSql." " . $sortSql . " " . $limitSql . "";
            $stmt = $database->prepare($sql);
            $stmt->execute();

            $stmt->bind_result($id, $name, $userId, $street, $number, $zip, $city, $phone, $www, $email, $lat, $lng, $fullAddress, $markerType, $imageId, $imagePath);
            $stmt->store_result();
            while ($stmt->fetch()) {
                $arr[] = [id => $id, name => $name, userId => $userId, street => $street, number => $number, zip => $zip, city => $city, phone => $phone, www => $www, email => $email, lat => $lat, lng => $lng, fullAddress => $fullAddress, markerType => $markerType, imageId => $imageId, imagePath => $imagePath];
            }
            $total = $database->query("SELECT FOUND_ROWS() AS TOTAL");
            //var_dump($total);
            $count = mysqli_fetch_assoc($total);
            //print_r($count['TOTAL']);
            echo '{"success": true, "total": ' . $count['TOTAL'] . ', "location":' . json_encode($arr) . '}';
        }
            break;
}