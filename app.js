const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("controls_color");
const range = document.getElementById("jsRange");
const fillBtn = document.getElementById("jsMode");
const ctx = canvas.getContext("2d");


canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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
}


function handleColorClick(e) {
    const selColor = e.target.style.backgroundColor;
    ctx.strokeStyle = selColor;
};
Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));


function handleRangeChange(e) {
    const rangeSize = e.target.value;
    ctx.lineWidth = rangeSize;
} 

if(range) {
    range.addEventListener("input", handleRangeChange);
}

jsMode.addEventListener("click", (e) => {
    console.log(e);
});
