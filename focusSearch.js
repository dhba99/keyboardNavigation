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
var firstPress = false;
var isSpecialShorcutPress = false;

function switchVisibilityButtons(value){
	// if(show == value) return;
	let buttons = document.querySelectorAll('button[id="buref"]');
	// console.log(buttons);
	console.log("llego aca " + buttons.length);
	show = value;
	if(value){
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

	if(e.ctrlKey && e.code =="Space" && !isSpecialShorcutPress){
		isSpecialShorcutPress = true;
		firstPress = !firstPress;
		if(modeKB && !firstPress) {
			//Si el modo listen esta activado se activa el nodo
			if(keys.length != 0){
				index = keys.join("");
				if(index < nodes.length){
					nodes[index].focus();
					nodes[index].click();
				}
			}
			console.log("si llega aca");
			notification.style.display = "none";
			modeKB = false;
			keys = [];
		}else{
			//Mostrar indices de elementos
			switchVisibilityButtons(true);
		}
	}

	console.log(e.ctrlKey+" "+e.key);

	//Inserta digitos en el modo listen
	const regexp=/Digit[0-9]/g;
	if(modeKB){
		if(regexp.exec(e.code)) keys.push(e.code[e.code.length -1]);
	}	

});

document.addEventListener("keyup",(e)=>{
	//Vuelve al estado inicial
	if(e.code == "Escape"){
		modeKB = false;
		isSpecialShorcutPress = false;
		firstPress = false;
		switchVisibilityButtons(false);
	}

	
	if((e.ctrlKey || e.code =="Space") && isSpecialShorcutPress && !modeKB && firstPress){
		modeKB = true;
		switchVisibilityButtons(false);
		notification.textContent="Modo Listen Activado";
		notification.style.display="inline";
	}
	if((e.ctrlKey || e.code =="Space") && isSpecialShorcutPress){
		isSpecialShorcutPress = false;
	}
});
  