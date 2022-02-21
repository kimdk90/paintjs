const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("controls_color");
const range = document.getElementById("jsRange");
const fillBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const loadBtn = document.getElementById("jsLoad");
const jsFile = document.getElementById("jsFile");
const seletImage = document.getElementById("img");

const ctx = canvas.getContext("2d");

const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(e) {
    painting = false;
}

function startPainting(e) {
    painting = true;
}

function onMouseMove(e) {
    const X = e.offsetX;
    const Y = e.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(X,Y);
    } else {
        ctx.lineTo(X,Y);
        ctx.stroke();
        //ctx.closePath();
    }
}

function onMouseDown(e) {
    painting = true;
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

function handleCM(e) {
    e.preventDefault();
    console.log("우클릭방지");
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleColorClick(e) {
    const selColor = e.target.style.backgroundColor;
    ctx.strokeStyle = selColor;
    ctx.fillStyle = selColor;
};
Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));


function handleRangeChange(e) {
    const rangeSize = e.target.value;
    ctx.lineWidth = rangeSize;
} 

if(range) {
    range.addEventListener("input", handleRangeChange);
}

fillBtn.addEventListener("click", (e) => {
    if(filling == true) {
        fillBtn.innerText = "FILL"; 
        filling = false;
    } else if(filling == false) {
        fillBtn.innerText = "PAINT";
        filling = true;
    }
});

saveBtn.addEventListener("click", () => {
    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = img;
    link.download = "image[canvasJs]";
    link.click();
});

loadBtn.addEventListener("click", () => {
    jsFile.click();
});

jsFile.addEventListener("change", (e) => {
    const file = e.target.files[0]; //선택된 파일
    
    const img = new Image();

    img.src = URL.createObjectURL(file);

    img.onload = function() {
        ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    };
});