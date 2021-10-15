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
        url: "https://raw.githubusercontent.com/wenlab501/GEOG2017/main/DATA/datalist.csv",
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
				else if (row[2]=="點座標") datatype="<coord>點座標</coord>"
				else if (row[2]=="") datatype=row[2]
				else datatype="<gray>"+row[2]+"</gray>";
				
				let crs;
				if(row[3]==3826) crs="<twd>3826</twd>"
				else if (row[3]=="無") crs="<na>無</na>"
				else if (row[3]==3828|row[3]==4326) crs="<crs>"+row[3]+"</crs>"
				else if (row[3]=="") crs=""
				else crs="<gray>"+row[3]+"</gray>";	
				
				let area;
				if(row[4]=="全台灣") area="<TWN>全台灣</TWN>"
				else if (row[4]=="台北市") area="<TPE>台北市</TPE>"
				else if (row[4]=="台南市") area="<TNN>台南市</TNN>"
				else if (row[4]=="") area=row[4]
				else area="<gray>"+row[4]+"</gray>";	
				
				
				let txt = '<tr>'+'<td><a href="data/'+row[7]+'"><button>'+row[0]+'</button></a></td>'+
								'<td>'+ext+'</td>'+
								'<td>'+datatype+'</td>'+
								'<td>'+crs+'</td>'+
								'<td>'+area+'</td>'+
								'<td>'+row[5]+'</td>'+
								'<td>'+row[6]+'</td>'+
						  '</tr>';
				
				$('tbody').append(txt);
				}
			}
        }
    });