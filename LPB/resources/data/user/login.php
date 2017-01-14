<?php
/**
 * Created by IntelliJ IDEA.
 * User: Peter
 * Date: 8-12-2015
 * Time: 12:41
 *
 * 1) check if post data is available
 * 2) get challenge data from database 'challenges' with php session_id as identifier
 * 3) get user data from database 'users' with userName given in post
 * 4)
 */
session_start();
require('../connections/mysql.php');
//require('../php/common/sha256.php');

$userName = $database->real_escape_string($_POST['userName']);
$response = $database->real_escape_string($_POST['response']);

if( isset($userName) && isset($response)) {
    //retrieve challenge from database

    if($stmt = $database->prepare("SELECT `challenge`, `sessionId`, `timestamp` FROM `challenges` WHERE `sessionId` = ? AND `timestamp` >= '".time()."'")) {
        $session = session_id();
        $stmt->bind_param('s', $session);
        $stmt->execute();

        $stmt->bind_result($challenge, $sessionId, $timestamp);

        $stmt->store_result();
        if($stmt->num_rows == 1) { // found valid challenge in database
            while ($stmt->fetch()) {

                // delete current hash from database table challenges
                $sql = "DELETE FROM `challenges` WHERE `challenge` = ?  or `timestamp` < '".time()."'";
                $stmt01 = $database->prepare($sql);
                $stmt01->bind_param('s', $challenge);
                $stmt01->execute();
                $stmt01->close();

                // get user data
                $userSql = "SELECT `userName`, `password`, `accessLevel`, `fullName`, `city`, `created`, `email`, `enabled`, `id`, `lastEdited`, `lat`, `lng`, `number`, `phone`, `street`, `zip` FROM `users` WHERE `userName` = ? LIMIT 0,1";
                $userStmt = $database->prepare($userSql);
                $userStmt->bind_param('s', $userName);
                $userStmt->execute();
                $userStmt->bind_result($userName, $password, $accessLevel, $fullName, $city, $created, $email, $enabled, $id, $lastEdited, $lat, $lng, $number, $phone, $street, $zip);
                $userStmt->store_result();
                $userStmt->fetch();

                if($userStmt->num_rows) {
                    // calculate hash from given credentials and compare with database
                    $string = $userName.':'.$password.':'.$challenge;
                    $expectedResponse = hash('sha256',$string);

                    if($expectedResponse == $response && $enabled) { // compare calculated hash from database with calculated hash from user input
                        // credentials ok
                        // generate random sessionhash
                        $sessionHash = md5(microtime());
                        echo '{"success":true, "userId":'.$id.', "sessionHash":"'.$sessionHash.'"}';
                    } else {
                        // credentials not ok
                        if($enabled) {
                            echo '{"success":false, "messages":"login gegevens onjuist, probeer aub opnieuw"}';
                        } else {
                            echo '{"success":false, "messages":"account is geblokkeerd"}';
                        }

                    }
                } else {
                    echo '{"success":false, "messages":"login gegevens onjuist, probeer aub opnieuw"}';
                }



            };
        } else {
            echo '{"success":false, "messages":"login gegevens onjuist, probeer aub opnieuw"}';
        }
        $stmt->close();
    }else {
        echo '{"success":false, "messages":"geen geldige sessie gevonden of sessie verlopen"}';
    }
} else { // no post data found!!!
    die();
}