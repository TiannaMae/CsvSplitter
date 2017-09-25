function processData(data){
	var people = {},
		data = data.filter(x=>x['Cardholder Name'] != null),
		lastDate = data.sort((a,b) => Date.parse(a['Post Date']) > Date.parse(b['Post Date']))[0]['Post Date'];
	
	data.forEach(x=>{
		if(people[x['Cardholder Name']] == null)
			people[x['Cardholder Name']] = [];
		
		people[x['Cardholder Name']].push({
			'NAME': x['Cardholder Name'].trim(),
			'DATE': x['Tran Date'],
			'VENDOR': x['Merchant Name'].trim(),
			'AMOUNT': -x['Amount'],
		});
	});

	buildExport(people, `${lastDate}.zip`);
}

function buildExport(people, fileName){
	var zip = new JSZip();

	Object.keys(people).forEach(k=>{
		var csv = Papa.unparse(people[k]);
		zip.file(`${k}.csv`, csv);
	});

	zip.generateAsync({type:'blob'}).then(content=> saveAs(content, fileName));
}