const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');
const clearBtn = document.getElementById('jsClear');
const initialColor = '#2c2c2c';

canvas.height = 500;
canvas.width = 700;


ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 700, 500);
ctx.lineWidth = 3; 
ctx.strokeStyle = initialColor;
ctx.fillStyle = initialColor;

let painting = false;
let filing = false;

function stopPainting () {
    painting = false;
}

function startPainting () {

}

function onMouseMove(event) {
x = event.offsetX;
y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange (event) {
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}

function changeMode (event) {
    if (filing == false) {
        filing = true;
        mode.innerText = 'Рисование';
    }
    else {
        filing = false;
        mode.innerText = 'Заливка';
    }
}

function canvasClick () {
    if (filing) {
        ctx.fillRect(0, 0, 700, 500);
        
    }
    
}

function contextMenu(event) {
    event.preventDefault();
}

function saveClick () {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJS [Export]";
    link.click();
}

function clearClilck () {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 700, 500);
}

if (canvas) {
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', canvasClick);
    canvas.addEventListener('contextmenu', contextMenu)
}

Array.from(colors).forEach(color => color.addEventListener('click', changeColor));

if (range) {
    range.addEventListener('input', changeRange)
}

if (mode) {
    mode.addEventListener('click', changeMode)
}

if (saveBtn) {
    saveBtn.addEventListener('click', saveClick);
}
if (clearBtn) {
    clearBtn.addEventListener('click', clearClilck);
}