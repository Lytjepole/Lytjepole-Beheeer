<?php
/**
 * Created by IntelliJ IDEA.
 * User: Peter
 * Date: 8-12-2015
 * Time: 18:51
 */

require('../connections/mysql.php');
require('../php/common/sha256.php');

session_start();
//sleep(2);
// delete all expired challenges, ie timestamp < now

$sql = "DELETE FROM `challenges` WHERE `timestamp` < '".time()."' or `sessionId` = '".session_id()."'";
$database->query($sql);

// generate challenge
echo $challenge = SHA256::hash(uniqid(mt_rand(), true));

// insert new challenge into database, valid for 6 minutes
$sql = "INSERT INTO `challenges` (`sessionId`, `challenge`, `timestamp`) VALUES ('".session_id()."', '".$challenge."', '".(time() + 360)."')";
$database->query($sql);