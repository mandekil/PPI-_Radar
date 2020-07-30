<?php 
$arr = array(1, 2, 4, 4);
echo $arr[0].$arr[1].$arr[2].$arr[3];

$ar = array();
foreach ($arr as $key => $value) {
	$new = array("id"=>$key, "nilai_ppi"=>$value);
	array_push($ar, $new);
}

$json = json_encode($ar);

echo "<pre>";
echo $json;
echo "</pre>";

?>

<script type="text/javascript" src="/js/fft.js"></script>
<script>
arrPHP2JS();
function arrPHP2JS (){
	var outArr = [];
	var fft = new FFT();
	var real = <?php echo json_encode($arr); ?>;
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
