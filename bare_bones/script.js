// import { CanvasDrawable } from "canvas-drawable";
// const canvas = document.getElementById('canvas');
// const erase = document.getElementById('erase');
// const draw = document.getElementById('draw');
// const getImage = document.getElementById('getimage');
// const clearAll = document.getElementById('clearall');
// const drawable = new CanvasDrawable(canvas.getContext('2d'));
// erase.onclick = e => {
//   drawable.enerase();
// }
// draw.onclick = e => {
//   drawable.endraw();
// }
// getImage.onclick = e => {
//   console.log(drawable.getCanvasBase64())
// }
// clearAll.onclick = e => {
//   drawable.cleanAll()
// }
// import {createCanvas} from './node_modules/p5js';

// const { load } = require("send/node_modules/@types/mime");

let pen;
// var marks = [];
let buttonErase;

class Marker {

  constructor(_x, _y, _radius, _color) {
    this.x = _x;
    this.y = _y;
    this.radius = _radius;
    this.color = _color;
    this.marks = []
  }


  markings() {

    if (mouseIsPressed) {
      var mark = {
        x: mouseX,
        y: mouseY
      }
      this.marks.push(mark);
    }
  }

  displayMarkings() {
    if (this.marks.length > 1) {
      for (var i = 1; i < this.marks.length; i++) {
				strokeWeight(this.radius);
        line(this.marks[i].x, this.marks[i].y, this.marks[i - 1].x, this.marks[i - 1].y);
      }
    }
  }
}



function setup() {
  pen = new Marker(mouseX, mouseY, 12, 0);
  let myCanvas = createCanvas(560, 560);
  pixelDensity(1);
  myCanvas.parent('canvas');
  buttonErase = createButton('Erase');
  buttonErase.position(0, 700);
  buttonErase.mousePressed(clearBG);

  buttonPredict = createButton('Predict');
  buttonPredict.position(50, 700);
  buttonPredict.mousePressed(predict);
}
function clearBG() {
  setup()
}


function predict(){
  loadPixels();
  colored = pixels;
  grayScale = [];
  for(let x = 0; x<height; x++){
    grayScale[x] = new Array(width)
    for(let y = 0; y<width; y++) {
      var index = (x + y*width)*4;
      grayScale[x][y] = (pixels[index] + pixels[index+1] + pixels[index+2] + pixels[index+3])/4
    }
  }
  console.log(height, width);
  console.log(grayScale)
}

function draw(){
  background(0);
  stroke(1000);

  if(mouseIsPressed){
    fill(0);
    

  } else {
    fill(0);

    pen.marks.push(mouseX, mouseY)
  }
  pen.markings();
  pen.displayMarkings();
  // ellipse(mouseX, mouseY, 80, 80)
}

