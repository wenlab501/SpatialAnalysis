function arrayToTable(tableData) {
	var table = $('<table></table>');
	$(tableData).each(function (i, rowData) {
		var row = $('<tr></tr>');
		$(rowData).each(function (j, cellData) {
			row.append($('<td>'+cellData+'</td>'));
		});
		table.append(row);
	});
	return table;
}

$.ajax({
	type: "GET",
	url: "https://raw.githubusercontent.com/wenlab501/SpatialAnalysis/main/datalist.csv",
	success: function (data) {
		data=Papa.parse(data).data;
		
		for (var i = 1; i < data.length-1; i++) {
			row=data[i];
			
			let ext="";
			if(typeof row[2] !== "undefined"){
				exts=row[2].split(";");
				for (const e of exts){
					if(e=='shp.xml'){ext=ext+'<shpxml>.'+e+'</shpxml> ';}
					else {ext=ext+'<'+e+'>.'+e+'</'+e+'> ';}}
			}
							
			let datatype="";				
			if(row[3]=="面資料") datatype="<poly>面資料</poly>"
			else if (row[3]=="點資料") datatype="<point>點資料</point>"
			else if (row[3]=="") datatype=row[3]
			else datatype="<gray>"+row[3]+"</gray>";	
			
			let txt = '<tr>'+'<td>'+row[0]+'</td>'+
							'<td><B>'+row[1]+'</B></td>'+
							'<td>'+ext+'</td>'+
							'<td>'+datatype+'</td>'+
							'<td><B>'+row[4]+'</B></td>'+
							'<td>'+row[5]+'</td>'+
					  '</tr>';
			
			$('tbody').append(txt);	
		}
		
		$("star").append("<sup><a href='#footer' target='_self'>*</a></sup>");
		$("note").each(
			function(index){ $(this).append("<sup><a href='#footer' target='_self'>"+(index+1)+"</a></sup>");}
		);
		$("footnote").each(
			function(index){ $(this).append("<sup><a href='#footer' target='_self'>"+(index+1)+"</a></sup>");}
		);
	}
});