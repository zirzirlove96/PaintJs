const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

//canvas의 크기가 css에서 정해 졌고, js가 활동할 canvas영역을 꼭 정해줘야 한다.
canvas.width = 700;
canvas.height = 700;//js에서 pixel size를 꼭 줘야 한다.
const INITIAL_COLOR = "2c2c2c";

ctx.fillStyle="white";
ctx.fillRect(0,0,700,700);//default값
ctx.strokeStyle="#2c2c2c";
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;

let painting = false;
let filling = false;//jsMode의 변환을 나타낸다.

function onMouseMove(event){
    //마우스의 움직임을 감지
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        //stop
        //path가 x,y값으로 간다.
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{//startPainting일때 
        //lineTo는 선을 그려주고, stroke은 획을 긋는 것
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function startPainting(){
    painting = true;
}

function stopPainting() {
    painting=false;
}

function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle = ctx.strokeStyle;//캔버스를 fill버튼 눌렀을 때
}

function handleRange(event){
    ctx.lineWidth = event.target.value;
}

function handleModeClick(event){//fill버튼을 바꾸기 위해
    if(filling===true){
        filling=false;
        mode.innerText="Fill";
    }
    else{
        filling=true;
        mode.innerText="Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,700,700);
    }//fill버튼을 눌렀을 경우에만 
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/png");//image의 url를 가져온다.
    //url를 클릭하면 저장한 그림이 나온다.
    //링크를 만든다.
    const link = document.createElement("a");
    //a태그화 해준다.

    link.href=image;//URL
    link.download = "PaintJs";//파일 이름
    link.click();

}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);//우클릭 방지하기 위해
}

Array.from(colors).forEach(color=>color.addEventListener("click",handleColor));

if(range) {
    range.addEventListener("input",handleRange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}//그림 저장