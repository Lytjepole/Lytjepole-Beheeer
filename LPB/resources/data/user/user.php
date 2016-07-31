<?php
/**
 * Created by IntelliJ IDEA.
 * User: Peter
 * Date: 5-12-2015
 * Time: 12:35
 */
session_start();
require('../connections/mysql.php');
require('../php/common/sha256.php');


function getUserImage($imageId, $database)
{
    $sql = "SELECT * FROM `userImages` WHERE `id` = " . $imageId . "";
    $result = $database->query($sql);
    $image = mysqli_fetch_object($result);
    return $image;
}

/**
 * generate password from chars default length 8 characters
 *
 * @param int $length
 * @return string
 * @author Peter
 */
function generatePassword($length = 8)
{
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";
    $password = substr(str_shuffle($chars), 0, $length);
    return $password;
}

/**
 * return image data from given image ID
 *
 * @param int $imageId , object $database
 * @return object
 * @author Peter
 */
function getImage($imageId, $database)
{
    $sql = "SELECT * FROM userImages WHERE id = $imageId";
    $result = $database->query($sql);
    $image = mysqli_fetch_object($result);
    return $image;
}

function getAdminCount($database)
{
    $sql = "SELECT * FROM `checkAdminCount`";
    $result =$database->query($sql);
    $count = mysqli_fetch_row($result);
    return $count[0];
}

/**
 * return user data from given user ID
 *
 * @param int $userId , object $database
 * @return object
 * @author Peter
 */
function getUser($userId, $database)
{
    $sql = "SELECT * FROM `users` WHERE `id` = " . $userId . " LIMIT 0,1";
    $result = $database->query($sql);
    $user = mysqli_fetch_object($result);
    return $user;
}

/**
 * set items owner to admin for deleted user
 *
 * @param int $userId
 * @param int $toUserId
 * @param object $database
 * @author Peter
 * @return string
 */
function updateItems($userId, $toUserId, $database)
{
    // set owner to admin for items who's owner is deleted
    $sql = "UPDATE items SET userId = '" . $toUserId . "' WHERE userId = '" . $userId . "'";
    $result = $database->query($sql);
    $rows = $database->affected_rows;
    $msg = '"items": "' . $rows . ' item(s) bijgewerkt"';
    return $msg;
}


/**
 * set images owner to admin for deleted user
 *
 * @param $toUserId int
 * @param $admin int
 * @param $database object
 * @author Peter
 * @return string
 */
function updateImages($userId, $toUserId, $database)
{
    // set owner to admin for images who's owner is deleted
    $sql = "UPDATE images SET ownerId = '" . $toUserId . "' WHERE ownerId = '" . $userId . "'";
    $result = $database->query($sql);
    $rows = $database->affected_rows;
    $msg = '"images": "' . $rows . ' afbeelding(en) bijgewerkt"';
    return $msg;
}

/**
 * set locations owner to to new user
 *
 * @param $toUserId int
 * @param $userId int
 * @param $database object
 * @author Peter
 * @return string
 */
function updateLocations($userId, $toUserId, $database)
{
    // set owner to admin for locations who's owner is deleted
    $sql = "UPDATE locations SET ownerId = '" . $toUserId . "' WHERE ownerId = '" . $userId . "'";
    $result = $database->query($sql);
    $rows = $database->affected_rows;
    $msg = '"locations": "' . $rows . ' locatie(s) bijgewerkt"';
    return $msg;
}

/**
 * set templates owner to to new user
 *
 * @param $toUserId int
 * @param $userId int
 * @param $database object
 * @author Peter
 * @return string
 */
function updateTemplates($userId, $toUserId, $database)
{
    // set owner to admin for locations who's owner is deleted
    $sql = "UPDATE `templates` SET `userId` = '" . $toUserId . "' WHERE `userId` = '" . $userId . "'";
    $result = $database->query($sql);
    $rows = $database->affected_rows;
    $msg = '"templates": "' . $rows . ' template(s) bijgewerkt"';
    return $msg;
}

function updateSession($userId, $accessLevel, $database) {

}

switch ($_GET['action']) {
    case 'create': // create new user
        // create new user in database
        // TODO cleanstring and add prepared statements
        sleep(2);
        $rawData = $GLOBALS['HTTP_RAW_POST_DATA'];
        $tmp = json_decode($rawData);
        $data = $tmp->user;

        for ($i = 0; $i < count($data); $i++) {
            //print_r($data[$i]);
            $userName = $data[$i]->userName;
            $fullName = $data[$i]->fullName;
            $email = $data[$i]->email;
            $phone = $data[$i]->phone;
            $street = $data[$i]->street;
            $number = $data[$i]->number;
            $zip = $data[$i]->zip;
            $city = $data[$i]->city;
            $lat = $data[$i]->lat;
            $lng = $data[$i]->lng;
            $enabled = $data[$i]->enabled;
            $autoPassGen = $data[$i]->autoPassGen;
            $imageId = $data[$i]->imageId;
            //$accessLevel = $data[$i]->accessLevel;
            $accessLevel = 3; //make user on add default
            $name = $data[$i]->name;

            $image = getImage($imageId, $database);

            if ($autoPassGen) {
                $password = generatePassword();
                $passwordHash = SHA256::hash($password);
            } else {
                $password = $data[$i]->password;
                $passwordHash = SHA256::hash($password);
            }

            $sql = "INSERT INTO `users` (`password`, `userName`, `fullName`, `phone`, `email` , `street`, `number`, `zip`, `city`, `lat`, `lng`, `enabled`, `imageId`, `accessLevel`) VALUES ('$passwordHash', '$userName', '$fullName', '$phone', '$email', '$street', '$number', '$zip', '$city', '$lat', '$lng', '$enabled', '$imageId', '$accessLevel')";

            if ($result = $database->query($sql) === true) {
                //insert was ok: sent user mail and echo user data to client
                echo '{"success": true, "user": [{"id": "' . $database->insert_id . '", "imagePath": "' . $image->imagePath . '"}]}';
            } else {
                //insert failed
                $error = $database->errno;
                switch ($error) {
                    case '1062': // duplicate key
                        $message[] = '"userName": "Opgegeven gebruikersnaam bestaat al.<br>Deze moet uniek zijn"';
                        break;
                }
                $implodedmessage = implode(',', $message);
                echo '{"success": false, "errors": {' . $implodedmessage . '}}';
            }
        }
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

            $user = getUser($userId, $database);
            $currentAccessLevel = $user->accessLevel.' ';

            if ($currentAccessLevel != $accessLevel) {
                // accesslevel changed update session
                updateSession($userId, $accessLevel, $database);
            }

            try {
                if (getAdminCount($database) == 1 && $currentAccessLevel == 1 && $accessLevel != 1) {
                    throw new Exception('Er moet minimaal 1 administrator actief zijn!');
                }

                if ($currentAccessLevel == 1 && $enabled === false) {
                    throw new Exception('Administrators kunnen niet geblokkeerd worden');
                }

                // save changes in database
                $sql = "UPDATE users SET imageId = '" . $imageId . "', lat = '" . $lat . "', lng = '" . $lng . "', accessLevel = '" . $accessLevel . "', fullName = '" . $fullName . "', street = '" . $street . "', number = '" . $number . "', zip = '" . $zip . "', city = '" . $city . "', phone = '" . $phone . "', email = '" . $email . "', enabled = '" . $enabled . "' WHERE id = '" . $userId . "'";

                $database->query($sql);
                $image = getUserImage($imageId, $database);

                // response when everything ok
                echo '{"success": true, "user": [{"id":' . $userId . ', "imagePath":"' . $image->imagePath . '"}]}';


            } catch (Exception $e) {
                // response when failure to update
                echo '{"success": false, "messages": [{"user": "' . $e->getMessage() . '", "id": "' . $userId . '"}]}';
            }
        }
        break;
    case 'destroy':
        $rawdata = $GLOBALS['HTTP_RAW_POST_DATA'];
        $tmp = json_decode($rawdata);
        $data = $tmp->user;

        $userId = $data[0]->id;

        $user = getUser($userId, $database);
        $currentUser = getUser($_GET['currentUserId'], $database);
        $toUserId = $_GET['toUserId'];

        try {
            if ($user->accessLevel < 2) {
                throw new Exception('Admins kunnen niet worden verwijderd!');
            }

            if ($user->id == $currentUser->id) {
                throw new Exception('Je kan jezelf niet verwijderen!');
            }

            $sql = "DELETE FROM `users` WHERE id = '" . $userId . "'";
            $database->query($sql);

            $messages[] = updateImages($user->id, $toUserId, $database);
            $messages[] = updateItems($user->id, $toUserId, $database);
            $messages[] = updateLocations($user->id, $toUserId, $database);
            $messages[] = updateTemplates($user->id, $toUserId, $database);

            $implodedmessages = implode(',', $messages);

            echo '{"success": true, "messages": {' . $implodedmessages . '}}';
        } catch (Exception $e) {
            // handle exception
            echo '{"success": false, "messages": [{"user": "' . $e->getMessage() . '", "id": "' . $userId . '"}]}';
        }
        break;
    case 'checkAdminCount': // check admin count

        break;
    case 'resetpassword':

        break;
    default:
        if (isset($_GET['id'])) { // id is given return user data
            $userId = $_GET['id'];
            $sql = "SELECT `U`.`id`, `U`.`userName`, `U`.`accessLevel`, `U`.`fullName`, `U`.`street`, `U`.`number`, `U`.`zip`, `U`.`city`, `U`.`phone`, `U`.`email`, `U`.`created`, `U`.`lastEdited`, `U`.`enabled`, `U`.`lat`, `U`.`lng`, `U`.`imageId`, `UI`.`imagePath` FROM `users` `U` LEFT JOIN `userImages` `UI` ON `U`.`imageId` = `UI`.`id`  WHERE `U`.`id`= ?";
            $stmt = $database->prepare($sql);
            $stmt->bind_param('i', $userId);
            $stmt->execute();
            $stmt->bind_result($id, $userName, $accessLevel, $fullName, $street, $number, $zip, $city, $phone, $email, $created, $lastEdited, $enabled, $lat, $lng, $imageId, $imagePath);
            $stmt->store_result();
            $stmt->fetch();
            $arr = array('id' => $id, 'userName' => $userName, 'accessLevel' => $accessLevel, 'fullName' => $fullName, 'street' => $street, 'number' => $number, 'zip' => $zip, 'city' => $city, 'phone' => $phone, 'email' => $email, 'created' => $created, 'lastEdited' => $lastEdited, 'enabled' => $enabled, 'lat' => $lat, 'lng' => $lng, 'imageId' => $imageId, `imagePath` => $imagePath);

            if ($stmt->num_rows) {
                echo '{"success": true, "total": 1, "user":' . json_encode($arr) . '}';
            } else {
                echo '{"success": false}';
            }
        } else {
            $sql = "SELECT `U`.`id`, `U`.`userName`, `U`.`accessLevel`, `U`.`fullName`, `U`.`street`, `U`.`number`, `U`.`zip`, `U`.`city`, `U`.`phone`, `U`.`email`, `U`.`created`, `U`.`lastEdited`, `U`.`enabled`, `U`.`lat`, `U`.`lng`, `U`.`imageId`, `UI`.`imagePath` FROM `users` `U` LEFT JOIN `userImages` `UI` ON `U`.`imageId` = `UI`.`id`";
            $stmt = $database->prepare($sql);
            $stmt->execute();
            $stmt->bind_result($id, $userName, $accessLevel, $fullName, $street, $number, $zip, $city, $phone, $email, $created, $lastEdited, $enabled, $lat, $lng, $imageId, $imagePath);
            $stmt->store_result();
            while ($stmt->fetch()) {
                $arr[] = [id => $id, userName => $userName, accessLevel => $accessLevel, fullName => $fullName, street => $street, number => $number, zip => $zip, city => $city, phone => $phone, email => $email, created => $created, lastEdited => $lastEdited, enabled => $enabled, lat => $lat, lng => $lng, imageId => $imageId, imagePath => $imagePath];
            }
            echo '{"success": true, "total": ' . $stmt->num_rows . ', "user":' . json_encode($arr) . '}';
        }
        break;
}