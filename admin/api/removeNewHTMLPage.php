<?php

$_POST = json_decode(file_get_contents('php://input'), true);
$fileName = '../../' . $_POST['name'];

if(file_exists($fileName)) {
  unlink($fileName);
} else {
  header("HTTP/1.0 400 Bad Request");
}