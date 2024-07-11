let msjModeActivate = '<div id="noti" class="modal" style="display:none; background-color: aquamarine; border-radius: 1cm; border-width: 2px; border-style: solid; text-align: center; border-color:blue; z-index:1000; position:fixed; width: 10%; height: 5%; right: 5%; top: 5%;"> <p>Modo Listen Activado</p> </div>'

let pattern = 'a,button:not([id="buref"])';
let nodes = [];
document.getElementsByTagName("body")[0].insertAdjacentHTML("beforebegin",msjModeActivate);

function getValidNodes(){
	nodes = [];
	nodes = document.querySelectorAll(pattern);
	for(let i=0; i<nodes.length; ++i){
		let msj = '<button id="buref" style="position:absolute; font:initial !important; -webkit-appearance: revert; background:revert; border:revert; display:revert-layer; visibility:hidden; height:20px; z-index:100;">'+i+'</button>';
		nodes[i].insertAdjacentHTML("beforebegin",msj);
	}
}

getValidNodes();
let notification = document.getElementById("noti");
var index = -1;
var modeKB = false;
var keys = [];
var show = false;

function switchVisibilityButtons(value){
	if(show == value) return;
	let buttons = document.querySelectorAll('button[id="buref"]');
	show = ! show;
	if(show){
		buttons.forEach((element)=> element.style.visibility = "visible");
	}else{
		buttons.forEach((element)=> element.style.visibility = "hidden");
	}
}

document.addEventListener("keydown",(e)=>{
	if(e.altKey && e.ctrlKey){
		//Falta mejorar para paginas dinamicas
		if(nodes.length==0) return;
		++index;
		index%=nodes.length;
		nodes[index].focus();
	}

	//Mostrar indices de elementos
	if(e.ctrlKey && e.code =="KeyZ"){
		switchVisibilityButtons();
	}

	console.log(e.code+" "+e.key);
	if(e.code=="ShiftLeft" || e.code=="ShiftRight" ){
		let textSearch = document.querySelectorAll(pattern);
		if(textSearch.length != nodes.length){
			console.log("debug " + nodes.length + " " + textSearch.length);
			document.querySelectorAll('button[id="buref"]').forEach((e) => e.remove());
			getValidNodes();
		}
		if(modeKB) notification.style.display="none";
		if(!modeKB ) switchVisibilityButtons(true);
	}

	//check shortcut
	const regexp=/Digit[0-9]/g;
	if(modeKB){
		if(regexp.exec(e.code)) keys.push(e.code[e.code.length -1]);
	}	

});

document.addEventListener("keyup",(e)=>{
	if(e.code=="ShiftLeft" || e.code=="ShiftRight" ){
		if(modeKB){
			if(keys.length != 0){
				console.log("llego aca");
				index = keys.join("");
				if(index < nodes.length){
					nodes[index].focus();
					nodes[index].click();
				}
			}
			modeKB = false;
			keys = [];
		}else{
			modeKB = true;
			document.getElementById("noti").textContent="Modo Listen Activado";
			document.getElementById("noti").style.display="inline";
			switchVisibilityButtons();
		}
		
	}
});
  