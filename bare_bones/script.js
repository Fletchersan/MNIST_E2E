let pen;
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


let myCanvas;
function setup() {
  let csize = 280
  pen = new Marker(mouseX, mouseY, 12, 0);
  myCanvas = createCanvas(csize, csize);
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
}




async function predict(){
  console.log('in predict')
  hdgs = getPooledGrayScaleArray()
  
  tensor_length = 28
  grayScale = tf.tensor(hdgs);
  grayScale = grayScale.reshape([1, tensor_length, tensor_length, 1])
  model = await tf.loadLayersModel('/home/fletcher/ComputerScience/dev/MNIST_E2E/bare_bones/model.json');
  console.log('loaded model')
  let output =  await model.predict(grayScale).argMax(1).data(); 
  console.log(output)

  console.log(grayScale.print())
  // console.log(img)
}

function getPooledGrayScaleArray(){
  hdgs = getHighDensityGrayScaleArray();
  console.log('hdgs dims')
  console.log(hdgs.length, hdgs[0].length)
  gs = []
  offset = 10
  let ctr= 0
  stride = offset
  for(let x = 0; x<hdgs.length; x+=offset){
    row = []
    for(let y = 0; y<hdgs.length; y+=offset){
      if(x>=hdgs.length && y>=hdgs.length){
        continue;
      }
      maxPoolVal = 0;
      for(let xi = x; xi<x+offset-1; xi += 1){
        for(let yi = y; yi<y+offset-1; yi += 1){
          if(x>=hdgs.length && y>=hdgs.length){
            continue
          }
          maxPoolVal = max(maxPoolVal, hdgs[x][y]);
        }
      }
      row.push(maxPoolVal);
    }
    gs.push(row);
  }
  return gs
}

function getHighDensityGrayScaleArray(){
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
  return grayScale;
}


// function makePreprocessingModel(){
//   let pre_model = tf.sequential()
//   x = tf.layers.maxPooling2d(poolSize=[10, 10], dataFormat = 'channelsLast')
//   pre_model.add(x)
  

// }