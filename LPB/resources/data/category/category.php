<?php
session_start();
require('../connections/mysql.php');

switch ($_GET['action']) {
    case 'getCategories':
        $itemId = $_GET['id'];
        $what = $_GET['what'];
        switch ($what) {
            case 'tpl':
                $sql = "SELECT * FROM `template_category` WHERE `templateId` = '" . $itemId . "'";
                break;
            case 'itm':
                $sql = "SELECT * FROM `item_category` WHERE `itemId` = '" . $itemId . "'";
            default:
                $sql = "SELECT * FROM `item_category` WHERE `itemId` = '" . $itemId . "'";
                break;
        }

        $result = $database->query($sql);
        if (mysqli_num_rows($result)) {
            while ($obj = mysqli_fetch_object($result)) {
                $arr[] = $obj->categoryId;
            }
            echo implode(',', $arr);
        } else {
            echo 0;
        }

        break;
    case 'create':

        break;
    case 'update':
        $rawdata = file_get_contents("php://input");
        $tmp = json_decode($rawdata);
        $data = $tmp->category;
        for ($i = 0; $i < count($data); $i++) {
            $id = $data[$i]->id;
            $title = $data[$i]->title;
            $alias = $data[$i]->alias;
            $subtitle = $data[$i]->subtitle;
            $order = $data[$i]->order;
            $published = $data[$i]->published;
            if ($published != 1) {
                $published = 0;
            }
            $general = $data[$i]->general;
            if ($general != 1) {
                $general = 1;
            } else {
                $general = 0;
            }
            $icon = $data[$i]->icon;

            $sql = "UPDATE `categories` SET `title` = '" . $title . "', `alias` = '" . $alias . "', `subtitle` = '" . $subtitle . "', `order` = '" . $order . "', `published` = '" . $published . "', `icon` = '" . $icon . "', `general` = '" . $general . "'  WHERE `id` = '" . $id . "'";
            $database->query($sql);

        }
        echo '{"success": true}';
        break;
    case 'destroy':

        break;
    default:
        // list categories
        $page = $_GET['page'];
        $pageSize = $_GET['limit'];

        if (isset($_GET['start'])) {
            $start = $_GET['start'];
        } else {
            $start = 0;
        };

        if (isset($_GET['sort'])) {
            $sortData = json_decode(stripslashes($_GET['sort']));
            for ($i = 0; $i < count($sortData); $i++) {
                $sortSql = ' ORDER BY `' . $sortData[$i]->property . '` ' . $sortData[$i]->direction . ' ';
            }
        }

        if (isset($_GET['filter'])) {
            $filterData = json_decode(stripslashes($_GET['filter']));
            for ($i = 0; $i < count($filterData); $i++) {
                $filterSql = ' WHERE ' . $filterData[$i]->property . ' ' . $filterData[$i]->operator . ' ' . $filterData[$i]->value . ' ';
            }
        }
        $sql = "SELECT SQL_CALC_FOUND_ROWS `id`, `title`, `subtitle`, `order`, `icon`, `published`, `alias`, !general AS general FROM `categories` " . $filterSql . " " . $sortSql . " ";
        $stmt = $database->prepare($sql);
        $stmt->execute();
        $stmt->bind_result($id, $title, $subtitle, $order, $icon, $published, $alias, $general);
        $stmt->store_result();

        //$arr = array('id' => $id, 'title' => $title, 'subtitle' => $subtitle, 'order' => $order, 'icon' => $icon, 'published' => $published, 'alias' => $alias, 'general' => $general);

        while ($stmt->fetch()) {
            $arr[] = [id => $id, title => $title, subtitle => $subtitle, order => $order, icon => $icon, published => $published, alias => $alias, general => $general];
        }
        echo '{"success": true, "total": ' . $stmt->num_rows . ', "category":' . json_encode($arr) . '}';

        break;
}