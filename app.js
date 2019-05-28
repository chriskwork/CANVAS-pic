const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

// default variables
const INIT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// in js i have to define canvas size. with only css, it doesnt work
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// paiting default setting

ctx.fillStyle = "white"; // default background white, if not, will be transparent...
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // ... when it is saved
ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = INIT_COLOR;
ctx.lineWidth = 2.5;



if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

// functions

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}

function handleModeClick() {
    if(filling === true){
        filling = false;
        mode.innerText = "fill";
    }else {
        filling = true;
        mode.innerText = "paint";
        
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // or canvas.width, canvas.height
    }
}

function handleSaveClick() {
    const image = canvas.toDataURL(); // default png, or toDataURL("image/jpeg")
    const link = document.createElement("a");
    link.href = image;
    link.download = "Myimg";
    link.click();
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}