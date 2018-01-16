

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext("2d");
var slika = new Image();

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

var colorRed = "#FF0000";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBlue = "#032dc9";
var colorBlack = "#030000";
var colorWhite="#FFFFFF";

var curColor = colorRed;
var clickColor = new Array();

var painting = document.getElementById('javascriptPaint');
var paint_style = getComputedStyle(painting);
canvas.width = 800;//parseInt(paint_style.getPropertyValue('width'));
canvas.height = 600;//parseInt(paint_style.getPropertyValue('height'));

function dugmeClick(clicked_id) {

    switch (clicked_id) {
        case "Crvena":
            curColor = colorRed;
            break;
        case "Zelena":
            curColor = colorGreen;
            break;
        case "Zuta":
            curColor = colorYellow;
            break;
        case "Plava":
            curColor = colorBlue;
            break;
        case "Crna":
            curColor = colorBlack;
            break;
        case "Gumica":
            curColor = colorWhite;
            break;
        case "Obrisi":
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            clickX=[];
            clickY=[];
            clickDrag=[];
            clickColor=[];
            break;
        case "Lav":
            slika.src="img/lav.png";
            context.drawImage(slika,0,0,800,600);

            break;
        case "Ptica":
            slika.src="img/ptica.png";
            context.drawImage(slika,0,0,800,600);
            break;
        case "Prase":
            slika.src="img/prase.png";
            context.drawImage(slika,0,0,800,600);
            break;
    }
}

function redraw(){
   // context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.lineJoin = "round";
    context.lineWidth = 5;

    for(var i=0; i < clickX.length; i++) {
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.strokeStyle = clickColor[i];
        context.closePath();
        context.stroke();
    }
}

function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(curColor);
}

canvas.addEventListener('mousemove', function(e) {
    if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
}, false);

canvas.addEventListener('mousedown', function(e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
}, false);

canvas.addEventListener('mouseup', function() {
    paint = false;
}, false);

canvas.addEventListener('mouseleave', function() {
    paint = false;
}, false);

var onPaint = function() {
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
};