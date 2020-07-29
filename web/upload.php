<?php
//require "convert2.php";
if(isset($_POST["upload"])){
    $file = $_FILES["berkas"];
    $filename = $_FILES["berkas"]["name"];
    $filedir = $_FILES["berkas"]["tmp_name"];
    $imageFileType = strtolower(pathinfo($filedir,PATHINFO_EXTENSION));
    //move_uploaded_file($filedir,"./uploads/");
}
$filechoosen = $filedir;
$handle = fopen($filechoosen, "rb");
$contents = fread($handle, filesize($filechoosen));
$data = unpack('v*',$contents);

$filecsv = fopen("$filename.csv","w");
fputcsv($filecsv, $data, "\n");
fclose($handle);
$fileopen = fopen("$filename.csv","r");
$productData = array();
$i = 1;
while (($array = fgetcsv($fileopen, 0, ",")) !== FALSE) { 
    $productData[] = (array('id'=>$i++, 'data'=> $array));    
}
 
$json = json_encode($productData);
file_put_contents("$filename.json", $json);

fclose($filecsv);
header("location:index3.php");   



/*if(isset($_POST['upload']) && !empty($_FILES['berkas']['name'])) {
    if(move_uploaded_file($_FILES["berkas"]["tmp_name"], $target_file)){
        $statusMsg = "The file ".$file. " has been uploaded.";
    }else{
        $statusMsg = "Sorry, there was an error uploading your file.";
    }
}*/

//echo $statusMsg;
?>