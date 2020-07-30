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

        $array = array ( $data);
        $dataparse = is_array($array)? array_values($array): array();
        

        //mulai convert hasil fft ke json
        $arr = $dataparse;
        //echo $arr[0].$arr[1].$arr[2].$arr[3];

        $ar = array();
        foreach ($arr as $key => $value) {
            $new = array("id"=>$key, "nilai_ppi"=>$value);
            array_push($ar, $new);
        }

        $json = json_encode($ar);
        
        for($i = 1; $i <= count($_FILES["file"]["name"]); $i++){
            file_put_contents("file_$i.json", $json);    
        }
        
        fclose($handle);

    }
}
header("location:index.php");

?>


<script type="text/javascript" src="/js/fft.js"></script>
<script>
arrPHP2JS();
function arrPHP2JS (){
	var outArr = [];
	var fft = new FFT();
	var real = <?php echo json_encode($ar); ?>;
	var imaginary = new Array(real.length); 
	imaginary.fill(0);   
	console.log(real)
	console.log(imaginary)

	//FFT
	var fft = new FFT(); 
	fft.calc(1, real, imaginary);
	console.log(real);
	console.log(imaginary);

	for (var i=0; i<real.length; i++){
		outArr.push(Math.sqrt(Math.pow(real[i],2) + Math.pow(imaginary[i],2)));
	}
	console.log(outArr);
	return outArr;
}
</script>