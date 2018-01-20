

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

var crtaj = "free";
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
            crtaj = "free"
            break;
        case "Zelena":
            curColor = colorGreen;
            crtaj = "free"
            break;
        case "Zuta":
            curColor = colorYellow;
            crtaj = "free"
            break;
        case "Plava":
            curColor = colorBlue;
            crtaj = "free"
            break;
        case "Crna":
            curColor = colorBlack;
            crtaj = "free"
            break;
        case "Gumica":
            curColor = colorWhite;
            crtaj = "free"
            break;
        case "Obrisi":
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            clickX=[];
            clickY=[];
            clickDrag=[];
            clickColor=[];
            break;
        case "Lav":
            crtaj = "ubaci_lava";
            // slika.src="img/lav.png";
            // context.drawImage(slika,0,0,800,600);

            break;
        case "Ptica":
            crtaj = "ubaci_pticu";
            // slika.src="img/ptica.png";
            // context.drawImage(slika,0,0,800,600);
            break;
        case "Prase":
            crtaj = "ubaci_prase";
            // slika.src="img/prase.png";
            // context.drawImage(slika,0,0,800,600);
            break;
        case "tekst":
            crtaj = "ubaci_tekst";
            break;
        case "kvadrat":
            crtaj = "ubaci_kvadrat";
            break;
        case "krug":
            crtaj = "ubaci_krug";
            break;
        case "pravougaonik":
            crtaj = "ubaci_pravougaonik";
            break;
    }
}

function redraw(){
   // context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    if (crtaj=="free"){//crtaj linije i gumicu


    context.lineJoin = "round";
    context.lineWidth = 1;

    for(var i=0; i < clickX.length; i++) {
        if (clickColor[i]==colorWhite){context.lineWidth = 10;}//debljina 1 ili 10 za gumicu i ostale boje
        else{context.lineWidth = 1;}
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
    else if (crtaj=="ubaci_lava"){//ubaci sliku lava
        slika.src="img/lav.png";
        context.drawImage(slika,clickX[clickX.length-1],clickY[clickY.length-1],100,100);
        clickX.pop();
        clickY.pop();
        clickDrag.pop();
        clickColor.pop();
    }
    else if (crtaj=="ubaci_pticu"){//ubaci sliku ptice
        slika.src="img/ptica.png";
        context.drawImage(slika,clickX[clickX.length-1],clickY[clickY.length-1],100,100);
        clickX.pop();
        clickY.pop();
        clickDrag.pop();
        clickColor.pop();
    }
    else if (crtaj=="ubaci_prase"){//ubaci sliku praseta

        slika.src="img/prase.png";
        context.drawImage(slika,clickX[clickX.length-1],clickY[clickY.length-1],100,100);
        clickX.pop();
        clickY.pop();
        clickDrag.pop();
        clickColor.pop();

    }
    else if (crtaj=="ubaci_tekst"){//ubaci tekst
        var velicina =document.getElementById('text_size').value;
        var tekst = document.getElementById('text_value').value;
        context.font = velicina+"px Arial";
        context.fillText(tekst,clickX[clickX.length-1],clickY[clickY.length-1]);
        clickX.pop();
        clickY.pop();
        clickDrag.pop();
        clickColor.pop();
    }
    else if (crtaj=="ubaci_krug"){//ubaci krug
        var r=document.getElementById('poluprecnik kruga').value;

        context.beginPath();
        context.arc(clickX[clickX.length-1], clickY[clickY.length-1], r, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
        clickX.pop();
        clickY.pop();
        clickDrag.pop();
        clickColor.pop();
    }
    else if (crtaj=="ubaci_kvadrat"){//ubaci kvadrat
        var a=document.getElementById('stranica_kvadrata').value;

        context.beginPath();
        context.rect(clickX[clickX.length-1],clickY[clickY.length-1],a,a);
        context.stroke();
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
        clickX.pop();
        clickY.pop();
        clickDrag.pop();
        clickColor.pop();
    }
    else if (crtaj=="ubaci_pravougaonik"){//ubaci pravougaonik
        //crtanje pravougaonika drag and drop
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