$("#file").change(function(){
	document.getElementById("berkas").defaultValue = this.files[0].name;
	console.log(this.files[0].name)
});