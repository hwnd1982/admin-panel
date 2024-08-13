<?php
$newFileName = '../../' . $_POST['name'] . '.html';

if(file_exists($newFileName)) {
  header("HTTP/1.0 400 Bad Request");
} else {
  fopen($newFileName, 'w');
}