<?php
$filename = "C:\\xampp\\htdocs\\raw.bin";
$handle = fopen($filename, "rb");
$contents = fread($handle, filesize($filename));
$data = unpack('v*',$contents);
$filecsv = fopen("raw.csv","w");
fputcsv($filecsv, $data, "\n");
fclose($handle);
fclose($filecsv);
?>