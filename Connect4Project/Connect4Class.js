function ConnectClass() {
	this.board = [[new ConnectCell("00", -1),
					new ConnectCell("01", -1),
					new ConnectCell("02", -1),
					new ConnectCell("03", -1),
					new ConnectCell("04", -1),
					new ConnectCell("05", -1),
					new ConnectCell("06", -1)],
				[new ConnectCell("10", -1),
					new ConnectCell("11", -1),
					new ConnectCell("12", -1),
					new ConnectCell("13", -1),
					new ConnectCell("14", -1),
					new ConnectCell("15", -1),
					new ConnectCell("16", -1)],
				[new ConnectCell("20", -1),
					new ConnectCell("21", -1),
					new ConnectCell("22", -1),
					new ConnectCell("23", -1),
					new ConnectCell("24", -1),
					new ConnectCell("25", -1),
					new ConnectCell("26", -1)],
				[new ConnectCell("30", -1),
					new ConnectCell("31", -1),
					new ConnectCell("32", -1),
					new ConnectCell("33", -1),
					new ConnectCell("34", -1),
					new ConnectCell("35", -1),
					new ConnectCell("36", -1)],
				[new ConnectCell("40", -1),
					new ConnectCell("41", -1),
					new ConnectCell("42", -1),
					new ConnectCell("43", -1),
					new ConnectCell("44", -1),
					new ConnectCell("45", -1),
					new ConnectCell("46", -1)],
				[new ConnectCell("50", -1),
					new ConnectCell("51", -1),
					new ConnectCell("52", -1),
					new ConnectCell("53", -1),
					new ConnectCell("54", -1),
					new ConnectCell("55", -1),
					new ConnectCell("56", -1)],
				[new ConnectCell("60", -1),
					new ConnectCell("61", -1),
					new ConnectCell("62", -1),
					new ConnectCell("63", -1),
					new ConnectCell("64", -1),
					new ConnectCell("65", -1),
					new ConnectCell("66", -1)]];
	
	this.myboard = new Array();
	this.ChangeStatus = ChangeStatus;
	this.GetStatus = GetStatus;
	this.Check = Check;
	
	for (var i = 0;i<7;i++) {
		
		this.myboard[i] = new Array();
		
		for (var j = 0;j<7;j++) {
			this.myboard[i][j] = this.board[i][j];
		}
	}
}

function ConnectCell(c, s) {
	this.cell = c;
	this.status = s; // -1: empty, 0: me , 1: you
}

function ChangeStatus(cell, number) {
	for (var i=0;i<7;i++) {
		for (var j= 0;j<7;j++) {
			if (cell == (""+i+j)) {
				//window.alert("BEFORE => board (row : "+ i +", column : "+j+") status : "+this.myboard[i][j].status);
				this.myboard[i][j].status = number;
				//window.alert("AFTER ==> board (row : "+ i +", column : "+j+") status : "+this.myboard[i][j].status);
			}
		}
	}
}

function GetStatus(row, column) {
	return this.myboard[row][column].status;
}

function RecordNewData() {

	var p1Name = document.getElementById("p0").value;
	var p1Time = document.getElementById("time0").value;
	
	var p2Name = document.getElementById("p1").value;
	var p2Time = document.getElementById("time1").value;
	
	if (turn == 0) {
		
		resultMessage(p1Name);
		
		insertNewRecord(p1Name, p1Time);	
	}else if (turn == 1) {
		
		resultMessage(p2Name);
		
		insertNewRecord(p2Name, p2Time);
	}
}

function checkConnection() {
				
		var httpRequest = false;
				
		try {
			httpRequest = new XMLHttpRequest();
		}catch (requestError) {
			try {
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			}catch (requestError) {
				try {
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				}catch (requestError) {
					window.alert("Your browser does not support AJAX!");
					return false;
				}
			}
		}
		return httpRequest;
}

function insertNewRecord(pname, ptime){
		
	var curdate = new Date();
	var newDate = curdate.getFullYear()+"-"+curdate.getMonth()+"-"+curdate.getDate();

	$.post("InsertData.php",{"pname": pname,"ptime":ptime, "newDate": newDate} , handleServerResponse);

}

function handleServerResponse(data, theStatus)  {
 		 if (theStatus == "success"){
                             //alert(data);
                        }
                }

function Check(row, column, turn) {
	
	space = " ";
 
	document.getElementById("txt").innerHTML += space+"==>HorizontalCheck(row="+row+", column="+column+", turn="+turn+")\n";
		
	var direction = "left"; 
	var sum = 0;
	
	if (direction == "left") {
		document.getElementById("txt").innerHTML += space+"==>LeftCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
		space += "     ";
		
		LeftCheckRecursion(row, column, sum, turn);
	}
	
	direction = "right";
	sum = 0;
	
	if (direction == "right") {
		document.getElementById("txt").innerHTML += space+"==>RightCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
		space += "     ";
		
		RightCheckRecursion(row, column, sum, turn);
	}
	
	direction = "down";
	sum =0;
	
	if (direction == "down") {
		document.getElementById("txt").innerHTML += space+"==>DownCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
		space += "     ";
		
		DownCheckRecursion(row, column, sum, turn);
	}
	
	direction = "leftdown";
	sum = 0;
	
	if (direction == "leftdown") {
		document.getElementById("txt").innerHTML += space+"==>LeftDownCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
		space += "     ";
		
		LeftDownCheckRecursion(row, column, sum, turn);
	}
	
	direction = "rightdown";
	sum = 0;
	
	if (direction == "rightdown") {
		document.getElementById("txt").innerHTML += space+"==>RightDownCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
		space += "     ";
		
		RightDownCheckRecursion(row, column, sum, turn);
	}
	
	direction = "leftup";
	sum = 0;
	
	if (direction == "leftup") {
		document.getElementById("txt").innerHTML += space+"==>LeftUpCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
		space += "     ";
		
		LeftUpCheckRecursion(row, column, sum, turn);
	}
	
	direction = "rightup";
	sum = 0;
	
	if (direction == "rightup") {
		document.getElementById("txt").innerHTML += space+"==>RightUpCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
		space += "     ";
		
		RightUpCheckRecursion(row, column, sum, turn);
	}
	
}

function LeftCheckRecursion(row, column, sum, turn) {
	document.getElementById("txt").innerHTML += space+"==>LeftCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
	
	if (column>-1 && column<7) {
		document.getElementById("txt").innerHTML += space+"==>if (column="+column+">-1 && column="+column+"<7)\n";
		if (sum < 4) {
			document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" < 4)\n";
			
			if ((Mygame.GetStatus(row, column)== turn)){
				
				if (sum == 3) {
					document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" == 4)\n";
					window.alert("Game is done!!");//================================================================
					gameDoneCheck=1;
					
					RecordNewData();
					
					document.getElementById("txt").innerHTML += space+"==>return true;\n";
					
					space = space.substring(0,space.length-5);
					return true;
				}
				
				document.getElementById("txt").innerHTML += space+"==>if (this.GetStatus(row="+row+", column="+column+")="+Mygame.GetStatus(row, column)+"== turn="+turn+")\n";
				
				document.getElementById("txt").innerHTML += space+"==>return LeftCheckRecursion(row="+row+", --column="+parseInt(column-1)+", ++sum="+parseInt(sum+1)+", turn="+turn+")\n";
				space += "     ";
				return LeftCheckRecursion(row, --column, ++sum, turn);
			}
			else {
				document.getElementById("txt").innerHTML += space+"==>else\n";
				
				document.getElementById("txt").innerHTML += space+"==>return false\n";
				
				space = space.substring(0,space.length-5);
				return false;
			}	
		}	
	}
	else 
		document.getElementById("txt").innerHTML += space+"==>else\n";
				
		document.getElementById("txt").innerHTML += space+"==>return false\n";
		
		space = space.substring(0,space.length-5);
		return false;
}

function RightCheckRecursion(row, column, sum, turn) {
	document.getElementById("txt").innerHTML += space+"==>RightCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";


	if (column>-1 && column<7) {
		document.getElementById("txt").innerHTML += space+"==>if (column="+column+">-1 && column="+column+"<7)\n";
		if (sum < 4) {
			document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" < 4)\n";
		
			if ((Mygame.GetStatus(row, column)== turn)){
				
				document.getElementById("txt").innerHTML += space+"==>if (this.GetStatus(row="+row+", column="+column+")="+Mygame.GetStatus(row, column)+"== turn="+turn+")\n";
				
				if (sum == 3) {
					document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" == 3)\n";
					window.alert("Game is done!!");//=================================================================================
					gameDoneCheck=1;
					
					RecordNewData();
					
					document.getElementById("txt").innerHTML += space+"==>return true;\n";
					
					space = space.substring(0,space.length-5);
					return true;
				}	
						
				document.getElementById("txt").innerHTML += space+"==>return RightCheckRecursion(row="+row+", ++column="+parseInt(column+1)+", ++sum="+parseInt(sum+1)+", turn="+turn+")\n";
				space += "     ";
				return RightCheckRecursion(row, ++column, ++sum, turn);
			}
			else {
				document.getElementById("txt").innerHTML += space+"==>else\n";
				
				document.getElementById("txt").innerHTML += space+"==>return false\n";
				
				space = space.substring(0,space.length-5);
				return false;
			}	
		}	
	}
	else 
		document.getElementById("txt").innerHTML += space+"==>else\n";
				
		document.getElementById("txt").innerHTML += space+"==>return false\n";
		
		space = space.substring(0,space.length-5);
		return false;
}

function DownCheckRecursion(row, column, sum, turn) {
	document.getElementById("txt").innerHTML += space+"==>DownCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";

	
	if (row>-1 && row<7) {
		document.getElementById("txt").innerHTML += space+"==>if (row="+row+">-1 && row="+row+"<7)\n";
		if (sum < 4) {
			document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" < 4)\n";
			
			if ((Mygame.GetStatus(row, column)== turn)){
				
				document.getElementById("txt").innerHTML += space+"==>if (this.GetStatus(row="+row+", column="+column+")="+Mygame.GetStatus(row, column)+"== turn="+turn+")\n";
				
				if (sum == 3) {
					document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" == 3)\n";
					window.alert("Game is done!!");//=========================================================
					gameDoneCheck=1;
				
					RecordNewData();
				
					document.getElementById("txt").innerHTML += space+"==>return true;\n";
				
					space = space.substring(0,space.length-5);
					return true;
				}
				
				document.getElementById("txt").innerHTML += space+"==>return DownCheckRecursion(++row="+parseInt(row+1)+", column="+column+", ++sum="+parseInt(sum+1)+", turn="+turn+")\n";
				space += "     ";
				return DownCheckRecursion(++row, column, ++sum, turn);
			}
			else {
				document.getElementById("txt").innerHTML += space+"==>else\n";
				
				document.getElementById("txt").innerHTML += space+"==>return false\n";
				
				space = space.substring(0,space.length-5);
				return false;
			}	
		}	
	}
	else 
		document.getElementById("txt").innerHTML += space+"==>else\n";
				
		document.getElementById("txt").innerHTML += space+"==>return false\n";
		
		space = space.substring(0,space.length-5);
		return false;
}

function LeftDownCheckRecursion(row, column, sum, turn) {
	document.getElementById("txt").innerHTML += space+"==>LeftDownCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
	
	if (row>-1 && row<7 && column>-1 && column<7) {
		document.getElementById("txt").innerHTML += space+"==>if (row="+row+">-1 && row="+row+"<7 && column="+column+">-1 && column="+column+"<7))\n";
		if (sum < 4) {
			document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" < 4)\n";
			
			if ((Mygame.GetStatus(row, column)== turn)){
				
				document.getElementById("txt").innerHTML += space+"==>if (this.GetStatus(row="+row+", column="+column+")="+Mygame.GetStatus(row, column)+"== turn="+turn+")\n";
				
				if (sum == 3) {
					document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" == 3)\n";
					window.alert("Game is done!!");//=========================================================
					gameDoneCheck=1;
					
					RecordNewData();
				
					document.getElementById("txt").innerHTML += space+"==>return true;\n";
				
					space = space.substring(0,space.length-5);
					return true;
				}
				
				document.getElementById("txt").innerHTML += space+"==>return LeftDownCheckRecursion(++row="+parseInt(row+1)+", --column="+parseInt(column-1)+", ++sum="+parseInt(sum+1)+", turn="+turn+")\n";
				space += "     ";
				return LeftDownCheckRecursion(++row, --column, ++sum, turn);
			}
			else {
				document.getElementById("txt").innerHTML += space+"==>else\n";
				
				document.getElementById("txt").innerHTML += space+"==>return false\n";
				
				space = space.substring(0,space.length-5);
				return false;
			}	
		}	
	}
	else 
		document.getElementById("txt").innerHTML += space+"==>else\n";
				
		document.getElementById("txt").innerHTML += space+"==>return false\n";
		
		space = space.substring(0,space.length-5);
		return false;
}

function RightDownCheckRecursion(row, column, sum, turn) {
	document.getElementById("txt").innerHTML += space+"==>RightDownCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
	
	if (row>-1 && row<7 && column>-1 && column<7) {
		document.getElementById("txt").innerHTML += space+"==>if (row="+row+">-1 && row="+row+"<7 && column="+column+">-1 && column="+column+"<7))\n";
		if (sum < 4) {
			document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" < 4)\n";
			
			if ((Mygame.GetStatus(row, column)== turn)){
				
				document.getElementById("txt").innerHTML += space+"==>if (this.GetStatus(row="+row+", column="+column+")="+Mygame.GetStatus(row, column)+"== turn="+turn+")\n";
				
				
				
				if (sum == 3) {
					document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" == 3)\n";
					window.alert("Game is done!!");//=========================================================
					gameDoneCheck=1;
					
					RecordNewData();
				
					document.getElementById("txt").innerHTML += space+"==>return true;\n";
				
					space = space.substring(0,space.length-5);
					return true;
				}
				
				document.getElementById("txt").innerHTML += space+"==>return RightDownCheckRecursion(++row="+parseInt(row+1)+", ++column="+parseInt(column+1)+", ++sum="+parseInt(sum+1)+", turn="+turn+")\n";
				space += "     ";
				return RightDownCheckRecursion(++row, ++column, ++sum, turn);
			}
			else {
				document.getElementById("txt").innerHTML += space+"==>else\n";
				
				document.getElementById("txt").innerHTML += space+"==>return false\n";
				
				space = space.substring(0,space.length-5);
				return false;
			}	
		}	
	}
	else 
		document.getElementById("txt").innerHTML += space+"==>else\n";
				
		document.getElementById("txt").innerHTML += space+"==>return false\n";
		
		space = space.substring(0,space.length-5);
		return false;
}

function LeftUpCheckRecursion(row, column, sum, turn) {
	document.getElementById("txt").innerHTML += space+"==>LeftUpCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
	
	if (row>-1 && row<7 && column>-1 && column<7) {
		document.getElementById("txt").innerHTML += space+"==>if (row="+row+">-1 && row="+row+"<7 && column="+column+">-1 && column="+column+"<7))\n";
		if (sum < 4) {
			document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" < 4)\n";
			
			if ((Mygame.GetStatus(row, column)== turn)){
				
				document.getElementById("txt").innerHTML += space+"==>if (this.GetStatus(row="+row+", column="+column+")="+Mygame.GetStatus(row, column)+"== turn="+turn+")\n";
				
				if (sum == 3) {
					document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" == 3)\n";
					window.alert("Game is done!!");//========================================================
					gameDoneCheck=1;
					
					RecordNewData();
					document.getElementById("txt").innerHTML += space+"==>return true;\n";
				
					space = space.substring(0,space.length-5);
					return true;
				}
				
				document.getElementById("txt").innerHTML += space+"==>return LeftUpCheckRecursion(--row="+parseInt(row-1)+", --column="+parseInt(column-1)+", ++sum="+parseInt(sum+1)+", turn="+turn+")\n";
				space += "     ";
				return LeftUpCheckRecursion(--row, --column, ++sum, turn);
			}
			else {
				document.getElementById("txt").innerHTML += space+"==>else\n";
				
				document.getElementById("txt").innerHTML += space+"==>return false\n";
				
				space = space.substring(0,space.length-5);
				return false;
			}	
		}	
	}
	else 
		document.getElementById("txt").innerHTML += space+"==>else\n";
				
		document.getElementById("txt").innerHTML += space+"==>return false\n";
		
		space = space.substring(0,space.length-5);
		return false;
}

function RightUpCheckRecursion(row, column, sum, turn) {
	document.getElementById("txt").innerHTML += space+"==>RightUpCheckRecursion(row="+row+", column="+column+", sum="+sum+", turn="+turn+")\n";
	
	if (row>-1 && row<7 && column>-1 && column<7) {
		document.getElementById("txt").innerHTML += space+"==>if (row="+row+">-1 && row="+row+"<7 && column="+column+">-1 && column="+column+"<7))\n";
		if (sum < 4) {
			document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" < 4)\n";
			
			if ((Mygame.GetStatus(row, column)== turn)){
				
				document.getElementById("txt").innerHTML += space+"==>if (this.GetStatus(row="+row+", column="+column+")="+Mygame.GetStatus(row, column)+"== turn="+turn+")\n";
				
				if (sum == 3) {
					document.getElementById("txt").innerHTML += space+"==>if (sum="+sum+" == 3)\n";
					window.alert("Game is done!!");//=========================================================
					gameDoneCheck=1;
					
					RecordNewData();
				
					document.getElementById("txt").innerHTML += space+"==>return true;\n";
				
					space = space.substring(0,space.length-5);
					return true;
				}
				
				document.getElementById("txt").innerHTML += space+"==>return RightUpCheckRecursion(--row="+parseInt(row-1)+", ++column="+parseInt(column+1)+", ++sum="+parseInt(sum+1)+", turn="+turn+")\n";
				space += "     ";
				return RightUpCheckRecursion(--row, ++column, ++sum, turn);
			}
			else {
				document.getElementById("txt").innerHTML += space+"==>else\n";
				
				document.getElementById("txt").innerHTML += space+"==>return false\n";
				
				space = space.substring(0,space.length-5);
				return false;
			}	
		}	
	}
	else 
		document.getElementById("txt").innerHTML += space+"==>else\n";
				
		document.getElementById("txt").innerHTML += space+"==>return false\n";
		
		space = space.substring(0,space.length-5);
		return false;
}
