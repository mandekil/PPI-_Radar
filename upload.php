<?php
if(isset($_POST["upload"])){
    $file = $_FILES["berkas"];
    $filename = $_FILES["berkas"]["name"];
    $filedir = $_FILES["berkas"]["tmp_name"];
    $imageFileType = strtolower(pathinfo($filedir,PATHINFO_EXTENSION));
    move_uploaded_file($filedir,"uploads/".$file);

    $handle = file_get_contents($filedir);
    $contents = fread($handle, filesize($file));
    $data = unpack('v*',$contents);

    $filecsv = fopen("$file.csv","w");
    fputcsv($filecsv, $data, "\n");
    fclose($handle);
    $file = fopen("$file.csv","r");
    $productData = array();
    $i = 1;
    while (($array = fgetcsv($file, 0, ",")) !== FALSE) { 
        $productData[] = (array('id'=>$i++, 'data'=> $array));    
    }
    
    $json = json_encode($productData);
    if (file_put_contents("ppicoba.json", $json))
        echo "Ok";
    else
        echo "Error";

    fclose($filecsv);*/
}



/*if(isset($_POST['upload']) && !empty($_FILES['berkas']['name'])) {
    if(move_uploaded_file($_FILES["berkas"]["tmp_name"], $target_file)){
        $statusMsg = "The file ".$file. " has been uploaded.";
    }else{
        $statusMsg = "Sorry, there was an error uploading your file.";
    }
}*/

//echo $statusMsg;


?>