//x & y coordinates of current position
var posx;
var posy;

//Offsets for incrementing x and y coordinates - Possible Values: 1, 0, -1
var offx;
var offy;

//A variable defining the scale of the offsets - specifies the speed of the line
var offScale;

//Previous x & y coordinates (we need to save these when we STOP so that we can resume after pressing GO button)
var prevx;
var prevy;

//Canvas reference
var canvas;

//The context for our canvas
var context;

//Boolean to tell if we are stopped
var stopped;

//Line color
var lineColor;

//Entry point when page is loaded - performs preliminary initializations
function main(){

  //Set initial coordinates
  posx = 0;
  posy = 100;
  offx = 1;  //Start by facing the positie x-direction
  offy = 0;
  prevx = 0;
  prevy = 0;
  offScale = 1;
  stopped = false;
  lineColor = "green";

  //Get canvas and context for canvas
  canvas = document.getElementById("canvasId");
  context = canvas.getContext("2d");



  //Update XY display below canvas element
  updateXYDisplay(posx, posy);

  //alert("x: " + posx + ", y: " + posy);

  //Animation loop
  var animate = function() {

    draw();
    updateXYDisplay(posx, posy);

   //request that the browser calls animate() again "as soon as it can"
    requestAnimationFrame(animate, canvas);
  };

  // draw!
  animate();

}


//Draw a line segment from our current position to the next position as defined by the offset
function draw(){
  context.beginPath();
  context.lineWidth="2";
  context.strokeStyle=lineColor;
  context.moveTo(posx,posy);
  posx = posx + offx*offScale;
  posy = posy + offy*offScale;
  context.lineTo(posx,posy);
  context.stroke(); //Draw the segment
}



//Stop
function stop(){

  if(stopped)
    return;

  stopped = true;

  //Save the direction we were going in
  prevx = offx;
  prevy = offy;

  //Set offsets to zero - we dont want to go anywhere
  offx = 0;
  offy = 0;
}

//Go
function go(){

  if(!stopped)
    return;

  stopped = false;

  //Resume direction
  offx = prevx;
  offy = prevy;

}

//Turn Right
function right(){

  if(stopped)
    return;

  //If we were moving in x-direction...
  if(offx != 0)
  {
    //If we were moving in positive x-direction...
    if(offx == 1)
    {
      offx = 0;
      offy = 1;
    }
    //We were moving in the negative x-direction
    else
    {
      offx = 0;
      offy = -1;
    }
  }
  //We were moving in the y direction
  else
  {
    //If we were moving in the positive y-direction...
    if(offy == 1)
    {
      offy = 0;
      offx = -1;
    }
    //We were moving in the negative y-direction...
    else
    {
      offy = 0;
      offx = 1;
    }
  }

  //TODO: Used posx and posy in this function instead
  updateXYDisplay(offx, offy);



}

//Turn Left
function left(){

  if(stopped)
    return;

  //If we were moving in x-direction...
  if(offx != 0)
  {
    //If we were moving in positive x-direction...
    if(offx == 1)
    {
      offx = 0;
      offy = -1;
    }
    //We were moving in the negative x-direction
    else
    {
      offx = 0;
      offy = 1;
    }
  }
  //We were moving in the y direction
  else
  {
    //If we were moving in the positive y-direction...
    if(offy == 1)
    {
      offy = 0;
      offx = 1;
    }
    //We were moving in the negative y-direction...
    else
    {
      offy = 0;
      offx = -1;
    }
  }


}

//Update the display of the current location on the webpage
function updateXYDisplay(x, y){
  var coordString = "(" + x + ", " + y + ")";
  document.getElementById("coordDisplay").innerHTML = coordString;
}



function changeSpeed(){
  var tempScale = document.getElementById("speed").value;
  if(tempScale == "undefined")
    tempScale = 1;

  offScale = tempScale;
}

function toGreen(){
  lineColor = "green";
}

function toRed(){
  lineColor = "red";
}

function toBlue(){
  lineColor = "blue";
}

function toYellow(){
  lineColor = "yellow";
}

function toPurple(){
  lineColor = "purple";
}
