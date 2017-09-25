var reportContent = null,
	uploadEl = document.getElementById('upload'),
	buttonEl = document.getElementById('convert');

buttonEl.disabled = true;
uploadEl.addEventListener('change', function(e){
	if(e.target.files.length <= 0) return;
	var file = e.target.files[0],
		reader = new FileReader();

	reader.readAsText(file, 'utf-8');
	reader.onload = x => {
		reportContent = Papa.parse(x.target.result,{
			header: true
		}).data;
		buttonEl.disabled = false;
	}
});

buttonEl.addEventListener('click', function(e){
	if(reportContent == null || reportContent.length == 0) return;
	processData(reportContent);
});