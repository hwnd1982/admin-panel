<?php
$newFileName = '../../' . $_POST['name'];

if(file_exists($newFileName)) {
  unlink($newFileName);
} else {
  header("HTTP/1.0 400 Bad Request");
}