<?php
/**
 * Created by IntelliJ IDEA.
 * User: Peter
 * Date: 6-12-2015
 * Time: 20:21
 */
require('../connections/mysql.php');
session_start();

switch($_GET['action']) {
    case 'checkSession':
        $sessionHash = $_GET['sessionHash'];
        $sql = "SELECT  `userId` , `userName`, `fullName`, `userSessions`.`accessLevel`, `enabled`, `email`
FROM  `userSessions`
LEFT JOIN  `users` ON `userSessions`.`userId` = users.id
WHERE  `sessionHash` =  '".$sessionHash."'
AND  `expires` >= NOW( )
LIMIT 0 , 1";
        $result = $database->query($sql);
        if(mysqli_num_rows($result) )
        {
            while($obj = mysqli_fetch_object($result)) {
                $arr[] = $obj;
            }
            //echo '{"success": true, "sessionHash": "'.$sessionHash.'",  "accessLevel": "'.$arr[0]->accessLevel.'", "id": "'.$arr[0]->userId.'", "userName": "'.$arr[0]->userName.'", "fullName": "'.$arr[0]->fullName.'", "enabled": "'.$arr[0]->enabled.'", "email": "'.$arr[0]->email.'" }';
            echo '{"success": true, "id": "'.$arr[0]->userId.'"}';
        }else {
            echo '{"success": false}';
        }

        break;
    case 'destroySession':

        break;
    case 'createSession':
        echo $_POST['sessionHash'];
        $sql = "INSERT INTO `userSessions` (userId, sessionHash, accessLevel) VALUES (?, ?, ?)";
        $stmt = $database->prepare("INSERT INTO `userSessions` (userId, sessionHash, accessLevel, expires) VALUES (?, ?, ?, ?)");
        $stmt->bind_param('isis', $userId, $sessionHash, $accessLevel, $expires);
        $userId = $database->real_escape_string($_POST['id']);
        $sessionHash =  $database->real_escape_string($_POST['sessionHash']);
        $accessLevel = $database->real_escape_string($_POST['accessLevel']);
        $expires = date('Y-m-d H:i:s', strtotime("+5 days"));

        $stmt->execute();
        break;
    case 'updateSession':
        $stmt = $database->prepare("UPDATE userSessions SET expires = ? WHERE sessionHash = ?");
        $stmt->bind_param('ss', $expires, $sessionHash);
        $expires = date('Y-m-d H:i:s', strtotime("+5 days"));
        $sessionHash = $database->real_escape_string($_POST['sessionHash']);
        $stmt->execute();
        break;
}