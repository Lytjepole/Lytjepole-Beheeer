<?php
session_start();
require('../connections/mysql.php');

switch ($_GET['action']) {
    case 'getGroup':
        $itemId = $_GET['id'];
        $what = $_GET['what'];
        switch ($what) {
            case 'tpl':
                $sql = "SELECT * FROM `template_group` WHERE `templateId` = '".$itemId."'";
                break;
            default:
                $sql = "SELECT * FROM `item_group` WHERE `itemId` = '".$itemId."'";
                break;
        }

        $result = $database->query($sql);
        if(mysqli_num_rows($result) )
        {
            while($obj = mysqli_fetch_object($result)) {
                $arr[] = $obj->groupId;
            }
            echo implode(',', $arr);
        }else{
            echo 0;
        }
        break;
    case 'create':
        $rawdata = file_get_contents("php://input");
        $tmp = json_decode($rawdata);
        $data = $tmp->group;

        $sql = "INSERT INTO `groups` (`name`, `description`, `alias`, `userId`, `imageId`) VALUES (?, ?, ?, ?, ?) ";
        $stmt = $database->prepare($sql);
        $stmt->bind_param("sssii", $name, $description, $alias, $userId, $imageId);

        for ($i = 0; $i < count($data); $i++) {
            $name = $data[$i]->name;
            $alias = preg_replace('/\s+/', '', strtolower($name));
            $description = $data[$i]->description;
            $userId = $data[$i]->userId;
            $imageId = $data[$i]->imageId;

            $stmt->execute();
            //print_r($stmt);
        }
        echo '{"success": true, "group":[{"id":"'.$stmt->insert_id.'"}]}';

        break;
    case 'update':
        $rawdata = file_get_contents("php://input");
        $tmp = json_decode($rawdata);
        $data = $tmp->group;

        $sql = "UPDATE `groups` SET `name` = ?, `alias` = ?, `description` = ?, `userId` = ? WHERE `id` = ?";
        $stmt = $database->prepare($sql);
        $stmt->bind_param("sssii", $name, $alias, $description, $userId, $id);

        for ($i = 0; $i < count($data); $i++) {
            $id = $data[$i]->id;
            $name = $data[$i]->name;
            $alias = preg_replace('/\s+/', '', strtolower($name));
            $description = $data[$i]->description;
            $userId = $data[$i]->userId;

            //print_r($stmt);
            $stmt->execute();
        }

        echo '{"success": true}';

            break;
    case 'destroy':
        $rawdata = file_get_contents("php://input");
        $tmp = json_decode($rawdata);
        $data = $tmp->group;

        $sql = "DELETE FROM `groups` WHERE `id` = ?";

        $stmt = $database->prepare($sql);
        $stmt->bind_param("i", $id);

        for ($i = 0; $i < count($data); $i++) {
            $id = $data[$i]->id;

            $stmt->execute();
        }

        echo '{"success": true}';

        break;
    default:
        // list categories
        $page = $_GET['page'];
        $pageSize = $_GET['limit'];

        if(isset($_GET['start']) ){$start = $_GET['start'];}else{$start = 0;};

        if(isset($_GET['sort'])) {
            $sortData = json_decode(stripslashes($_GET['sort']) );
            for($i = 0; $i < count($sortData); $i++) {
                $sortSql = ' ORDER BY `'.$sortData[$i]->property.'` '.$sortData[$i]->direction.' ';
            }
        }

        if(isset($_GET['filter'])) {
            $filterData = json_decode(stripslashes($_GET['filter']) );
            for($i = 0; $i < count($filterData); $i++) {
                $filterSql = ' WHERE '.$filterData[$i]->property.' '.$filterData[$i]->operator.' '.$filterData[$i]->value.' ';
            }
        }
        $sql = "SELECT SQL_CALC_FOUND_ROWS `id`, `name`, `alias`, `description`, `userId`, `imageId` FROM `groups` ".$filterSql." ".$sortSql." ";
        $result = $database->query($sql);
        $totalQuery = 'SELECT FOUND_ROWS()';
        $totalResult = $database->query($totalQuery);
        $total = mysqli_fetch_row($totalResult);

        if(mysqli_num_rows($result) )
        {
            while($obj = mysqli_fetch_object($result)) {
                $arr[] = $obj;
            }
            echo '{"success": true, "total": '.$total[0].', "group":'.json_encode($arr).'}';
        }else{
            echo '{"success": false, "group":'.json_encode($arr).'}';
        }

        break;
}