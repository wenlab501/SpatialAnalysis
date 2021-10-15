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
				
				if(row.join('')=='***') $('tbody').append('<tr><td colspan="7"><B>* 以下圖資為課程【13】～【17】內容，依照課程週次排序</B></td></tr>');
				else{	
				let ext="";
				if(typeof row[1] !== "undefined"){
					exts=row[1].split(";");
					for (const e of exts){ext=ext+'<'+e+'>.'+e+'</'+e+'> ';}
				}
								
				let datatype="";				
				if(row[2]=="面資料") datatype="<poly>面資料</poly>"
				else if (row[2]=="點資料") datatype="<point>點資料</point>"
				else if (row[2]=="") datatype=row[2]
				else datatype="<gray>"+row[2]+"</gray>";	
				
				let txt = '<tr>'+'<td>'+row[0]+'</td>'+
								'<td>'+row[1]+'</td>'+
								'<td>'+row[2]+'</td>'+
								'<td>'+row[3]+'</td>'+
								'<td>'+row[4]+'</td>'+
								'<td>'+row[5]+'</td>'+
						  '</tr>';
				
				$('tbody').append(txt);
				}
			}
        }
    });