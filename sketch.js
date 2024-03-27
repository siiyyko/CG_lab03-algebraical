let screen, mainHolder;
let myShader;
let zoom, offsetX, offsetY, r, g, b, distance;
let zoomDiv, offsetXDiv, offsetYDiv, rDiv, gDiv, bDiv, distDiv;
let saveBtn;

function preload(){
  myShader = loadShader('shader.vert', 'shader.frag');
}

function savePressed(){
  save(mainHolder, 'fractal.png');
}

function setup() {
  mainHolder = createCanvas(500, 500, WEBGL);
  screen = createGraphics(width, height);
  saveBtn = createButton("Save to a file");
  saveBtn.mousePressed(savePressed);
  
  zoomDiv = createDiv();
  offsetXDiv = createDiv();
  offsetYDiv = createDiv();
  rDiv = createDiv();
  gDiv = createDiv();
  bDiv = createDiv();
  distDiv = createDiv();
  iterDiv = createDiv();
  
  let span = createSpan('Zoom: ');
  span.style('color', 'deeppink');
  span.parent(zoomDiv);
  
  span = createSpan('OffsetX: ');
  span.style('color', 'deeppink');
  span.parent(offsetXDiv);
  
  span = createSpan('OffsetY: ');
  span.style('color', 'deeppink');
  span.parent(offsetYDiv);
  
  span = createSpan('R: ');
  span.style('color', 'deeppink');
  span.parent(rDiv);
  
  span = createSpan('G: ');
  span.style('color', 'deeppink');
  span.parent(gDiv);
  
  span = createSpan('B: ');
  span.style('color', 'deeppink');
  span.parent(bDiv);
    
  span = createSpan('Max distance: ');
  span.style('color', 'deeppink');
  span.parent(distDiv);
  
  
  zoom = createSlider(0, 0.5, 0.25, 0.000005);
  offsetX = createSlider(-1, 1, 0, 0.0001);
  offsetY = createSlider(-1, 1, 0, 0.0001);
  r = createSlider(0, 1, 0.5, 0.001);
  g = createSlider(0, 1, 0.5, 0.001);
  b = createSlider(0, 1, 0.5, 0.001);
  distance = createSlider(0, 1000, 1, 1);
  
  zoom.parent(zoomDiv);
  offsetX.parent(offsetXDiv);
  offsetY.parent(offsetYDiv);
  r.parent(rDiv);
  g.parent(gDiv);
  b.parent(bDiv);
  distance.parent(distDiv);
  
  shader(myShader);
}

function drawScreen(){
  myShader.setUniform('u_resolution', [width, height]);
  myShader.setUniform('u_zoom', zoom.value());
  myShader.setUniform('u_offset', [offsetX.value(), offsetY.value()]);
  myShader.setUniform('u_col', [r.value(), g.value(), b.value()]);
  myShader.setUniform('u_dist', distance.value());

  const step = 0.00005;
  
  if(keyIsDown(SHIFT)){
    let val = zoom.value();
    zoom.remove();
    zoom = createSlider(0, 0.5, val-=step, step);
    zoom.parent(zoomDiv);
  }
  
  if(keyIsDown(CONTROL)){
    let val = zoom.value();
    zoom.remove();
    zoom = createSlider(0, 0.5, val+=step, step);
    zoom.parent(zoomDiv);
  }
  
  if(keyIsDown(UP_ARROW)){
    let val = offsetY.value();
    offsetY.remove();
    offsetY = createSlider(-1, 1, val += step, step);
    offsetY.parent(offsetYDiv);
  }
  
  if(keyIsDown(DOWN_ARROW)){
    let val = offsetY.value();
    offsetY.remove();
    offsetY = createSlider(-1, 1, val -= step, step);
    offsetY.parent(offsetYDiv);
  }
  
  if(keyIsDown(LEFT_ARROW)){
    let val = offsetX.value();
    offsetX.remove();
    offsetX = createSlider(-1, 1, val -=step, step);
    offsetX.parent(offsetXDiv);
  }
  
  if(keyIsDown(RIGHT_ARROW)){
    let val = offsetX.value();
    offsetX.remove();
    offsetX = createSlider(-1, 1, val +=step, step);
    offsetX.parent(offsetXDiv);
  }
  
  rect(0,0,width, height);
}

function draw() {
  background(220);
  
  drawScreen();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
  