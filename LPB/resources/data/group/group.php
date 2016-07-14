<?php
session_start();
require('../connections/mysql.php');
require('../php/common/sha256.php');

switch ($_GET['action']) {
    case 'create':

        break;
    case 'update':

        break;
    case 'destroy':

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