<?php

if(isset($_POST["upload"])){
    //baca multiple files
    $countfile = 0;
    foreach($_FILES["file"]["name"] as $filename){
        $filedir = $_FILES["file"]["tmp_name"][$countfile];
        $imageFileType = strtolower(pathinfo($filedir,PATHINFO_EXTENSION));
        
        //buka file binary
        $filechoosen = $filedir;
        $handle = fopen($filechoosen, "rb");
        $contents = fread($handle, filesize($filechoosen));
        $data = unpack('v*',$contents);
        

        //mulai convert hasil fft ke json
        $json = json_encode($data);

        for($i = 1; $i < count($_FILES["file"]["name"]); $i++){
            file_put_contents("file_$i.json", $json);    
        }
        fclose($handle);
        fclose($filecsv);
    }
}
header("location:index3.php");

?>