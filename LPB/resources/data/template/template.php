<?php
/**
 * Created by IntelliJ IDEA.
 * User: Peter
 * Date: 05-09-2016
 * Time: 19:40
 */
session_start();
require('../connections/mysql.php');

function setCategories($itemId, $cats, $database)
{
    // clear existing
    $sql = "DELETE FROM `template_category` WHERE `templateId` = " . $itemId . "";
    $database->query($sql);
    //set new
    $arr = explode(',', $cats);
    $values = [];
    foreach ($arr as $value) {
        $values[] = "('" . $itemId . "', '" . $value . "')";
    }
    $insSQL = "INSERT INTO `template_category` (`templateId`, `categoryId`) VALUES " . implode(',', $values) . "";
    $database->query($insSQL);
}

function setGroup($itemId, $group, $database)
{
    // clear existing
    $sql = "DELETE FROM `template_group` WHERE `templateId` = " . $itemId . "";
    $database->query($sql);

    // set new or nothing if no group given
    if ($group) {
        $insSQL = "INSERT INTO `template_group` (`templateId`, `groupId`) VALUES ('" . $itemId . "', '" . $group . "')";
        $database->query($insSQL);
    }
}

function getLocation($locationId, $database)
{
    $sql = "SELECT * FROM `locations` WHERE `id` = '" . $locationId . "' LIMIT 0,1";
    $result = $database->query($sql);

    return $result->fetch_assoc();
}

function updateMruImages($id, $database)
{
    $sql = "UPDATE `images` SET `recentlyUsed` = NOW() WHERE `id` = '" . $id . "' ";
    $database->query($sql);
}

switch ($_GET['action']) {
    case 'update':
        $rawData = file_get_contents("php://input");
        $tmp = json_decode($rawData);
        $data = $tmp->template;

        for ($i = 0; $i < count($data); $i++) {
            $id = $database->real_escape_string($data[$i]->id);
            $beginTime = $database->real_escape_string($data[$i]->beginTime);
            $categorySelector = $database->real_escape_string($data[$i]->categorySelector);
            $city = $database->real_escape_string($data[$i]->city);
            $email = $database->real_escape_string($data[$i]->email);
            $endTime = $database->real_escape_string($data[$i]->endTime);
            $general = $database->real_escape_string($data[$i]->general);
            if ($general != 1) {
                $general = 0;
            }
            $groupSelector = $database->real_escape_string($data[$i]->groupSelector);
            $imageId = $database->real_escape_string($data[$i]->imageId);
            if ($imageId < 2) {
                $imageId = 1;
            }
            $location = $database->real_escape_string($data[$i]->location);
            $locationId = $database->real_escape_string($data[$i]->locationId);
            $number = $database->real_escape_string($data[$i]->number);
            $permanent = $database->real_escape_string($data[$i]->permanent);
            if ($permanent != 1) {
                $permanent = 0;
            }
            $phone = $database->real_escape_string($data[$i]->phone);
            $artist = $database->real_escape_string($data[$i]->artist);
            $published = $database->real_escape_string($data[$i]->published);
            if ($published != 1) {
                $published = 0;
            }
            $shortLocation = $database->real_escape_string($data[$i]->shortLocation);
            $source = $database->real_escape_string($data[$i]->source);
            $sourceURL = $database->real_escape_string($data[$i]->sourceURL);
            $street = $database->real_escape_string($data[$i]->street);
            $subtitle = $database->real_escape_string($data[$i]->subtitle);
            $text = $database->real_escape_string($data[$i]->text);
            $title = $database->real_escape_string($data[$i]->title);
            $URL = $database->real_escape_string($data[$i]->url);
            $userId = $database->real_escape_string($data[$i]->userId);
            $zip = $database->real_escape_string($data[$i]->zip);

            if ($location == 1) {
                // set locationId, clear shortlocation
                $shortLocation = '';
                $locationData = getLocation($locationId, $database);
            } else {
                // clear locationId, set shortlocation
                $locationId = 0;
                $locationData = $shortLocation;
            }

            try {
                $sql = "UPDATE `templates` SET `title` = '" . $title . "', `subtitle` = '" . $subtitle . "', `text` = '" . $text . "', `beginTime` = '" . $beginTime . "', `endTime` = '" . $endTime . "', `source` = '" . $source . "', `sourceURL` = '" . $sourceURL . "', `userId` = '" . $userId . "', `imageId` = '" . $imageId . "', `locationId` = '" . $locationId . "', `shortLocation` = '" . $shortLocation . "', `URL` = '" . $URL . "', `published` = '" . $published . "', `permanent` = '" . $permanent . "', `general` = '" . $general . "', `email` = '" . $email . "', `phone` = '" . $phone . "' WHERE `id` = '" . $id . "'";
                if ($categorySelector) {
                    setCategories($id, $categorySelector, $database);
                }
                if ($groupSelector) {
                    setGroup($id, $groupSelector, $database);
                } else {
                    setGroup($id, 0, $database);
                }
                $database->query($sql);
                updateMruImages($imageId, $database);

                echo '{"success": true}';
            } catch (Exception $e) {
                echo '{"success": false, "messages": [{"calendaritem": "' . $e->getMessage() . '"}]}';
            }
        }
        break;
    case 'destroy':
        $rawdata = file_get_contents("php://input");
        $tmp = json_decode($rawdata);
        $data = $tmp->template;

        for ($i = 0; $i < count($data); $i++) {
            // delete item
            $sql = "DELETE FROM `templates` WHERE id = " . $data[$i]->id . "";
            $database->query($sql);
            // delete category ref
            $sql = "DELETE FROM `templates_category` WHERE `itemId` = " . $data[$i]->id . "";
            $database->query($sql);
            // delete group ref
            $sql = "DELETE FROM `templates_group` WHERE `itemId` = " . $data[$i]->id . "";
            $database->query($sql);
            // delete imgage ref
            $sql = "DELETE FROM `templates_image` WHERE `itemId` = " . $data[$i]->id . "";
            $database->query($sql);

        }
        echo '{"success": true}';

        break;
    case 'create':
        $rawData = file_get_contents("php://input");
        $tmp = json_decode($rawData);
        $data = $tmp->template;

        for ($i = 0; $i < count($data); $i++) {
            $beginTime = $database->real_escape_string($data[$i]->beginTime);
            $categorySelector = $database->real_escape_string($data[$i]->categorySelector);
            $city = $database->real_escape_string($data[$i]->city);
            $email = $database->real_escape_string($data[$i]->email);
            $endTime = $database->real_escape_string($data[$i]->endTime);
            $general = $database->real_escape_string($data[$i]->general);
            if ($general != 1) {
                $general = 0;
            }
            $groupSelector = $database->real_escape_string($data[$i]->groupSelector);
            $imageId = $database->real_escape_string($data[$i]->imageId);
            if ($imageId < 2) {
                $imageId = 1;
            }
            $location = $database->real_escape_string($data[$i]->location);
            $locationId = $database->real_escape_string($data[$i]->locationId);
            $number = $database->real_escape_string($data[$i]->number);
            $permanent = $database->real_escape_string($data[$i]->permanent);
            if ($permanent != 1) {
                $permanent = 0;
            }
            $phone = $database->real_escape_string($data[$i]->phone);
            $artist = $database->real_escape_string($data[$i]->artist);
            $published = $database->real_escape_string($data[$i]->published);
            if ($published != 1) {
                $published = 0;
            }
            $shortLocation = $database->real_escape_string($data[$i]->shortLocation);
            $source = $database->real_escape_string($data[$i]->source);
            $sourceURL = $database->real_escape_string($data[$i]->sourceURL);
            $street = $database->real_escape_string($data[$i]->street);
            $subtitle = $database->real_escape_string($data[$i]->subtitle);
            $text = $database->real_escape_string($data[$i]->text);
            $title = $database->real_escape_string($data[$i]->title);
            $URL = $database->real_escape_string($data[$i]->url);
            $userId = $database->real_escape_string($data[$i]->userId);
            $zip = $database->real_escape_string($data[$i]->zip);

            if ($location == 1) {
                // set locationId, clear shortlocation
                $shortLocation = '';
                $locationData = getLocation($locationId, $database);
                //print_r($locationData['name']);
            } else {
                // clear locationId, set shortlocation
                $locationId = 0;
                $locationData = $shortLocation;
            }

            $sql = "INSERT INTO `templates` (`title`, `subtitle`, `text`, `beginTime`, `endTime`, `source`, `sourceURL`, `userId`, `imageId`, `locationId`, `shortLocation`, `URL`, `published`, `permanent`, `general`, `email`, `phone`)  VALUES ('" . $title . "', '" . $subtitle . "', '" . $text . "', '" . $beginTime . "', '" . $endTime . "', '" . $source . "', '" . $sourceURL . "', '" . $userId . "', '" . $imageId . "', '" . $locationId . "', '" . $shortLocation . "', '" . $URL . "', '" . $published . "', '" . $permanent . "', '" . $general . "', '" . $email . "', '" . $phone . "')";

            $database->query($sql);
            $insertedId = $database->insert_id;

            // set category and group for inserted id
            setCategories($insertedId, $categorySelector, $database);
            if ($groupSelector > 0) {
                setGroup($insertedId, $groupSelector, $database);
            }

            $insertedItems[] = array('shortLocation' => $shortLocation, 'name' => $locationData['name'], 'street' => $locationData['street'], 'number' => $locationData['number']);

            // update mru images
            updateMruImages($imageId, $database);
            // extjs flips when returning item id from php
            //$insertedItems[] = array('id'=> "$insertedId", 'shortLocation'=> $shortLocation, 'name'=> $locationData['name'], 'street'=>$locationData['street'], 'number'=>$locationData['number']);
        }

        echo '{"success": true, "calendaritem": ' . json_encode($insertedItems) . ' }';

        break;
    case 'getUserTemplates':

        if (isset($_GET['userId'])) {
            $filterSql = " WHERE `userId` = '" . $_GET['userId'] . "' ";
        }

        $sql = "SELECT `userName`, templates.title, templates.id FROM `users` JOIN templates ON users.id = templates.userId " . $filterSql . " ORDER BY `users`.`userName` ASC";
        $result = $database->query($sql);
        if (mysqli_num_rows($result)) {
            while ($obj = mysqli_fetch_object($result)) {
                $arr[$obj->userName][] = $obj;
            }
            echo '{"items":' . json_encode($arr) . '}';
        }
        break;
    default:
        if (isset($_GET['id'])) {
            // get template by given id
            $tplId = $_GET['id'];
            $sql = "SELECT `id`, `title`, `subtitle`, `text`, `beginTime`, `endTime`, `source`, `sourceURL`, `userId`, `imageId`, `locationId`, `shortLocation`, `URL`, `created`, `lastEdited`, `published`, `permanent`, `general`, `email`, `phone` FROM `templates` WHERE `id` = ?";
            $stmt = $database->prepare($sql);
            $stmt->bind_param('i', $tplId);
            $stmt->execute();
            $stmt->bind_result($id, $title, $subtitle, $text, $beginTime, $endTime, $source, $sourceURL, $userId, $imageId, $locationId, $shortLocation, $URL, $created, $lastEdited, $published, $permanent, $general, $email, $phone);
            $stmt->store_result();
            $stmt->fetch();
            $arr = array(id => $id, title => $title, subtitle => $subtitle, text => $text, beginTime => $beginTime, endTime => $endTime, source => $source, sourceURL => $sourceURL, userId => $userId, imageId => $imageId, locationId => $locationId, shortLocation => $shortLocation, url => $URL, created => $created, lasteEdited => $lastEdited, published => $published, permanent => $permanent, general => $general, email => $email, phone => $phone);

            if ($stmt->num_rows) {
                echo '{"success": true, "total": 1, "template":' . json_encode($arr) . '}';
            } else {
                echo '{"success": false}';
            }
        } else {
            $sql = "SELECT `id`, `title`, `subtitle`, `text`, DATE_FORMAT(`beginTime`, '%H:%i'), DATE_FORMAT(`endTime`, '%H:%i'), `source`, `sourceURL`, `userId`, `imageId`, `locationId`, `shortLocation`, `URL`, `created`, `lastEdited`, `published`, `permanent`, `general`, `email`, `phone` FROM `templates`";
            $stmt = $database->prepare($sql);
            $stmt->execute();
            $stmt->bind_result($id, $title, $subtitle, $text, $beginTime, $endTime, $source, $sourceURL, $userId, $imageId, $locationId, $shortLocation, $URL, $created, $lastEdited, $published, $permanent, $general, $email, $phone);
            $stmt->store_result();

            while ($stmt->fetch()) {
                $arr[] = [id => $id, title => $title, subtitle => $subtitle, text => $text, beginTime => $beginTime, endTime => $endTime, source => $source, sourceURL => $sourceURL, userId => $userId, imageId => $imageId, locationId => $locationId, shortLocation => $shortLocation, url => $URL, created => $created, lasteEdited => $lastEdited, published => $published, permanent => $permanent, general => $general, email => $email, phone => $phone];
            }
            if ($stmt->num_rows) {
                echo '{"success": true, "total": "' . $stmt->num_rows . '", "template":' . json_encode($arr) . '}';
            } else {
                echo '{"success": false}';

            }
        }
        break;
}