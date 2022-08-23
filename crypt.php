<?php

/**
 * 
 * @version 1.0
 * @author Gusttavohsc 
 * @license MIT License
 * 
 * 
 */

include "enc.php";
include "dec.php";

$action = $_POST['crypt'];
$key = $_POST['key'];

unset($_POST);

$fileName = $_FILES['file']['name'];
$tmpName = $_FILES['file']['tmp_name'];

$fileFormat = pathinfo($fileName)['extension'];

$path = "originalFiles/$fileFormat/";
$fullPath = $path.$fileName;

$cryptFolder = "encryptedFiles/";
$decryptFolder = "decryptedFiles/";


if(!is_dir($path)){
    mkdir("originalFiles/$fileFormat");
}

if(is_uploaded_file($tmpName)){
    if(move_uploaded_file($tmpName, $path . $fileName)){
        echo "Copied successfully";
    }
}


switch ($action) {
    case 'enc':
        encryptFile($fullPath, $key, $cryptFolder.$fileName . '.enc');
        break;
        header("location: /");
    case 'dec':
        decryptFile($fullPath, $key, $decryptFolder . str_replace(".enc", "", $fileName));
        break;
        header("location: /");
    default:
        header("location: /");
}