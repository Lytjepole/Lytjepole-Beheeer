<?php
/**
 * Created by IntelliJ IDEA.
 * User: Peter
 * Date: 31-05-2016
 * Time: 12:35
 */
session_start();
require('../connections/mysql.php');
require('../php/common/sha256.php');

switch ($_GET['action']) {
    case 'create':
        break;

    case 'update':
        $rawdata = $GLOBALS['HTTP_RAW_POST_DATA'];
        $tmp = json_decode($rawdata);
        $data = $tmp->calendaritem;

        for ($i = 0;$i < count($data); $i++) {
            $id = $data[$i]->id;
            $title = $data[$i]->title;
            $subtitle = $data[$i]->subtitle;
            $text = $data[$i]->text;
            $beginDate = $data[$i]->beginDate;
            $endDate = $data[$i]->endDate;
            $source = $data[$i]->source;
            $sourceLink = $data[$i]->sourceLink;
            $userId = $data[$i]->userId;
            $imageId = $data[$i]->imageId;
            $locationId = $data[$i]->locationId;
            $shortLocation = $data[$i]->shortLocation;
            $www = $data[$i]->www;
            $highlight = $data[$i]->highlight;
            $published = $data[$i]->published;
            $permanent = $data[$i]->permanent;
            $embargo = $data[$i]->embargo;
            $embargoEnd = $data[$i]->embargoEnd;
            $general = $data[$i]->general;
            $email = $data[$i]->email;
            $phone = $data[$i]->phone;

            try {
                $sql = "UPDATE `items` SET `title` = '".$title."', `subtitle` = '".$subtitle."', `text` = '".$text."', `beginDate` = '".$beginDate."', `endDate` = '".$endDate."', `source` = '".$source."', `sourceLink` = '".$sourceLink."', `userId` = '".$userId."', `imageId` = '".$imageId."', `locationId` = '".$locationId."', `shortLocation` = '".$shortLocation."', `www` = '".$www."', `highlight` = '".$highlight."', `published` = '".$published."', `permanent` = '".$permanent."', `embargo` = '".$embargo."', `embargoEnd` = '".$embargoEnd."', `general` = '".$general."', `email` = '".$email."', `phone` = '".$phone."' WHERE `id` = ".$id."";

                $database->query($sql);

                echo '{"success": true}';
            } catch (Exception $e) {
                echo '{"success": false, "messages": [{"calendaritem": "' . $e->getMessage() . '"}]}';
            }
        }
        break;
    case 'destroy':

        break;
    default:
        if (isset($_GET['id'])) {

        } else {
            $page = $_GET['page'];
            $pageSize = $_GET['limit'];

            if (isset($_GET['start'])) {
                $start = $_GET['start'];
            } else {
                $start = 0;
            };
            if ($pageSize) {
                $limit = " LIMIT " . $start . ", " . $pageSize . "";
            } else {
                $limit = '';
            }

            if (isset($_GET['sort'])) {
                $sortData = json_decode(stripslashes($_GET['sort']));
                $sortSql = ' ORDER BY ';
                for ($i = 0; $i < count($sortData); $i++) {
                    $sortArray[] = ' `' . $sortData[$i]->property . '` ' . $sortData[$i]->direction . ' ';
                }
                $sortSql .= implode(', ', $sortArray);
            }

            if (isset($_GET['filter'])) {
                $filterData = json_decode(stripslashes($_GET['filter']));
                $filterSql = ' WHERE ';
                for ($i = 0; $i < count($filterData); $i++) {
                    if ($filterData[$i]->operator == 'between') {
                        $values = explode('/', $filterData[$i]->value);
                        $filterArray[] = '`' . $filterData[$i]->property . '` ' . $filterData[$i]->operator . ' \'' . $values[0] . '\' AND \'' . $values[1] . '\' ';
                    } else {
                        $filterArray[] = '`' . $filterData[$i]->property . '` ' . $filterData[$i]->operator . ' \'' . $filterData[$i]->value . '\' ';
                    }
                }
                $filterSql .= implode(' AND ', $filterArray);
            }

            if (isset($_GET['id'])) {
                $filterSql = " WHERE id = '".$_GET['id']."' ";
            }

            $sql = "SELECT SQL_CALC_FOUND_ROWS `id`, `title`, `subtitle`, `text`, `beginDate`, `endDate`, `source`, `sourceURL`, `userId`, `imageId`, `locationId`, `shortLocation`, `url`, `highlight`, `created`, `lastEdited`, `published`, `imagePath`, `imageName`, `artist`, `recentlyUsed`, `name`, `street`, `number`, `zip`, `city`, `phone`, `email`, `lat`, `lng`, `permanent`, `embargo`, `embargoEnd`, `general` FROM `itemsView`" . $filterSql . " GROUP BY `id` " .$sortSql. " " . $limit . "";
            $result = $database->query($sql);
            $totalQuery = 'SELECT FOUND_ROWS()';
            $totalResult = $database->query($totalQuery);
            $total = mysqli_fetch_row($totalResult);

            if (mysqli_num_rows($result)) {
                while ($obj = mysqli_fetch_assoc($result)) {
                    $obj['title'] = mb_convert_encoding($obj['title'], "utf-8", "utf-8");
                    $obj['subtitle'] = mb_convert_encoding($obj['subtitle'], "utf-8", "utf-8");
                    $obj['text'] = mb_convert_encoding($obj['text'], "utf-8", "utf-8");
                    $obj['shortLocation'] = mb_convert_encoding($obj['shortLocation'], "utf-8", "utf-8");
                    $obj['url'] = mb_convert_encoding($obj['url'], "utf-8", "utf-8");
                    $arr[] = $obj;
                }
                echo '{"success": true, "total": ' . $total[0] . ', "calendaritem": ' . json_encode($arr) . ' }';
            } else {
                echo '{"success": true, "total": "0"}';
            }
        }
        break;
}