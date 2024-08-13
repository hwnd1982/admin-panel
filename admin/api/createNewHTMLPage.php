<?php

$_POST = json_decode(file_get_contents('php://input'), true);
$newFileName = '../../' . $_POST['name'] . '.html';

if(file_exists($newFileName)) {
  header("HTTP/1.0 400 Bad Request");
} else {
  fopen($newFileName, 'w');
}