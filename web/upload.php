<?php

if(isset($_POST["upload"])){
    //baca multiple files
    $countfile = 0;
    foreach($_FILES["berkas"]["name"] as $filename){
        $filedir = $_FILES["berkas"]["tmp_name"][$countfile];
        $imageFileType = strtolower(pathinfo($filedir,PATHINFO_EXTENSION));
        
        //buka file binary
        $filechoosen = $filedir;
        $handle = fopen($filechoosen, "rb");
        $contents = fread($handle, filesize($filechoosen));
        $data = unpack('v*',$contents);
        

        //mulai convert hasil fft ke json
        $json = json_encode($data);

        file_put_contents("$filename.json", $json);
        fclose($handle);
        fclose($filecsv);
    }
}
header("location:index3.php");

?>