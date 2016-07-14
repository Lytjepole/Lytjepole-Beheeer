<?php
/**
 * Created by IntelliJ IDEA.
 * User: Peter
 * Date: 27-4-2016
 * Time: 09:23
 */

session_start();
require('../connections/mysql.php');
require('../php/common/sha256.php');

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

        echo '{"success": true, "location": [{"imagePath": "location.jpg"}]}';
        break;
    case 'update':
        $rawdata = $GLOBALS['HTTP_RAW_POST_DATA'];
        $tmp = json_decode($rawdata);
        $data = $tmp->location;

        $sql = "UPDATE `locations` SET `name` = ?, `ownerId` = ?, `defaultLoc` = ?, `street` = ?, `number` = ?, `zip` = ?, `city` = ?, `phone` = ?, `www` = ?, `email` = ?, `lat` = ?, `lng` = ?, `fullAddress` = ?, `markerType` = ?, `imageId` = ?  WHERE `id` = ?";
        $stmt = $database->prepare($sql);
        $stmt->bind_param("siissssssssssiii", $name, $ownerId, $defaultLoc, $street, $number, $zip, $city, $phone, $www, $email, $lat, $lng, $fullAddress, $markerType, $imageId, $id);

        for ($i = 0; $i < count($data); $i++) {
            $name = $data[$i]->name;
            $ownerId = $data[$i]->ownerId;
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

            $stmt->execute();
        }
        $image = getLocationImage($imageId, $database);

        echo '{"success": true, "location": [{"id":' . $id . ', "imagePath":"' . $image->imagePath . '"}]}';
        break;
    case 'destroy':

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