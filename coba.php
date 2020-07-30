<?php
$filename = "C:\\xampp\\htdocs\\raw.bin";
$handle = fopen($filename, "rb");
$contents = fread($handle, filesize($filename));
$data = unpack('v*',$contents);

$json = json_encode($data);
//file_put_contents("$filename.json", $json);
echo ($json);
fclose($handle);
?>

<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<!--<script src="https://raw.githubusercontent.com/dntj/jsfft/master/lib/fft.js"></script>-->
<script type="module" src="js/fft.js"></script>
<script type = "text/javascript">
    //var url = 'js/fft.js';
    var datas = [1, 2, 3, 4, 5];
    console.log(datas);
    //var newdatas = new Array(datas);
    /*$.getScript(url, function(){
        $(document).ready(function  (){
            
            console.log(FFT(datas));
        });
    });*/
    console.log(FFT(datas));
    
</script>
