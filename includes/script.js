var selected=0;
var selected_ele;
var error=0,empty_left=0;
var sound=1;
/*THE SOLVED SUDOKU
123576489
687249135
459318672
216435798
395687214
748921356
532194867
974863521
861752943
*/
/*******************************/
// two global variables
var seconds=0;
var minutes=0;
var intervalHandle;


function tick() {
    // grab the h1
    var timeDisplay = document.getElementById("time");
    // turn seconds into mm:ss
    seconds++;
    if(seconds==60){
		minutes++;
		seconds=0;
	}
	var sec=seconds;
	var min=minutes;
    // add a leading zero (as a string value) if seconds less than 10
    if (seconds < 10) {
        sec = "0" + sec;
    }
	if(minutes<10){
		min="0"+min;
	}
    // concatenate with colon
    var message = min + ":" + sec;
    // now change the display
	timeDisplay.innerHTML=message;
}

function startCountdown() {
    // every second, call the "tick" function
    intervalHandle = setInterval(tick, 1000);
}

/******************************/
function change_sound(){
	if(sound==1){
		sound=0;
		document.getElementById("sound_icon").setAttribute("src","images/off.jpg");
		document.getElementById("music").muted=true;
		
	}
	else if(sound==0){
		sound=1;
		document.getElementById("sound_icon").setAttribute("src","images/on.jpg");
		document.getElementById("music").muted=false;
		
	}
}
window.onload=function(){
	build_sudoku();
	var mytab=document.getElementById("sudoku_tab");
	var tab_values=mytab.getElementsByTagName("td");
	var i,len,c;
	len=tab_values.length;
	document.getElementById("choice").style.backgroundColor="#6E4465";
	document.getElementById("choice").style.color="yellow";
	clear_color();
	for(i=0;i<len;i++){
		if(tab_values[i].innerHTML==0){
			empty_left++;
		}
	}
	startCountdown();
}


var problem=["020500009","000040100","450010070","016405098","000080000","740901350","030090067","004063000","800002040"];
var solution=["123576489","687249135","459318672","216435798","395687214","748921356","532194867","974863521","861752943"];

//builds sudoku...........

function build_sudoku(){
	var mytab=document.getElementById("sudoku_tab");
	mytab=mytab.getElementsByTagName("tbody")[0];
	var i,j;
	var newRow,newCell;
	for(i=0;i<9;i++){
		newRow=document.createElement("tr");
		for(j=0;j<9;j++){
			newCell=document.createElement("td");
			newCell.setAttribute("onclick","get_value(this,this.innerHTML);");
			newCell.setAttribute("type","button");
			if(problem[i][j]==0){
				newCell.innerHTML="";
			}
			else{
				newCell.innerHTML=problem[i][j];
			}
			newRow.appendChild(newCell);
		}
		mytab.appendChild(newRow);
		
	}
}


function get_value(ele,value){
	
	new Audio("includes/click.wav").play();
	if(value==0){
		selected=1;
		selected_ele=ele;
		clear_color();
		ele.style.backgroundColor="#185F31";
		document.getElementById("choice").style.backgroundColor="#185F31";
		document.getElementById("choice").style.color="#FFd";
	}
	else{
		selected=0;
		color_values(value);
	}
}
function color_values(n){
	var mytab=document.getElementById("sudoku_tab");
	var tab_values=mytab.getElementsByTagName("td");
	var i,len,c;
	len=tab_values.length;
	document.getElementById("choice").style.backgroundColor="#6E4465";
	document.getElementById("choice").style.color="yellow";
	clear_color();
	for(i=0;i<len;i++){
		if(tab_values[i].innerHTML==n){
			c++;
			tab_values[i].style.backgroundColor="#0DC0A7";
			tab_values[i].style.fontWeight="bold";
		}
		
	}
}
function get_choice(ele,value){
	
	if(selected==0){
		return;
	}
	else{
		var row=selected_ele.parentNode.rowIndex;
		var col=selected_ele.cellIndex;
		if(solution[row][col]==value){
			selected_ele.innerHTML=ele.innerHTML;
			empty_left--;
			if(empty_left==0){
				setTimeout(show_end,1000);
			}
			color_values(value);
			selected_ele=undefined;
			selected=0;
		}
		else{
			error++;
			document.getElementById("errors").innerHTML="Errors: "+error;
			play_error_sound();
		}
	}
}

function show_end(){
	var snd=new Audio("includes/won.mp3");
	snd.play();
	var end=document.getElementById("main");
	end.innerHTML="Congratulations....";
	end.style.fontSize="3.0em";
	end.style.textAlign="center";
	end.style.margin="300px auto 0px auto";
	end.style.color="red";
}
function play_error_sound(){
	var snd=new Audio("includes/error.mp3");
	snd.play();
}
function clear_color(){
	var mytab=document.getElementById("sudoku_tab");
	var tab_values=mytab.getElementsByTagName("td");
	var i,len;
	len=tab_values.length;
	for(i=0;i<len;i++){
		
			tab_values[i].style.backgroundColor="#C1EDB0";
			tab_values[i].style.fontWeight="normal";
	}
}
