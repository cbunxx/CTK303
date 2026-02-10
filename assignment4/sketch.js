let numTouches = 0;
let font1;
let state = 0; //change to 0 after debugging
let timer = 0;
//do i actually need this...
let flag = false; //change to false after debugging
let petBool = false;
let x1 = 50; 
let x2 = 50; 
let y1 = 50;
let y2 = 50;
let easeAmount = 0.05;
let xc, xy;

function preload(){
  
  font1 = loadFont('Assets/Miniver-Regular.ttf');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  frameRate(60);
  cnv.id("sealCanvas");
  angleMode(DEGREES);
}

function draw() {
  background(255, 255, 255, 30);
  //have a background image
  
  numTouches = touches.length;

  begin();
  translate(windowWidth/3.5, windowHeight/4.5);
  drawSeal();
    
  noStroke();
  fill('pink');
   for (let touch of touches) {
    circle(touch.x, touch.y, 40); //replace with hands
  }
  
}

//function for the beginning state - mouse press ONCE
function begin(){
  //fade in
  frameRate(30);
  
  textFont(font1);
  
  
  let alpha = timer;
  timer++;
  if(timer > 60){
    fill(255, 192, 203, alpha);
    textSize(21);
    //textWrap(WORD);
    text("Welcome to the seal petting simulation.", windowWidth/3, 200);
    //alpha += 2;
  }
  
  alpha = 0; //fix the fade later
  
  if(timer > 2 * 60){
    //instructions
    
    fill(255, 192, 203, alpha + timer / 2);
    text("The belly is waiting to be scratched.", windowWidth/3, 300);
  }
  
  if(timer > 3 * 60){
    //click to begin - no fade, inspired by rhythm heaven
    fill(100);
    textFont('Times New Roman');
    text("Lets Begin.", windowWidth/2.2, 400); 
    //could be centered tbh
    flag = true;
  }
  
 
}

function mousePressed() {
     //if statement for mousepress to call function to change state once only
  if (flag == true){
    //secondState();
    state = 1;
  }
  if(state == 1){
    petBool = true;
  }
  
  
}
function mouseReleased(){
  if(petBool){
    petBool = false;
  }
}

function drawSeal(){
  //display next scene
    if (state == 1) { 
      background('lightblue');
      
      fill(140);
      ellipse(200, 450, 400, 700); 
      fill(155);
      ellipse(200, 430, 350, 650);
      fill(165);
      ellipse(200, 410, 300, 600);
      fill(169); //belly?
      ellipse(200, 500, 280, 300);
      
      
  //snout
  fill(165);
  stroke(50);
  strokeWeight(3);
  arc(160, 210, 80, 30, 0, 190, OPEN);
  arc(240, 210, 80, 30, -10, 180, OPEN);
      //whiskers
      /*
      let j = 50;
      for(let i = 0; i < 3; i++){
        //line(280, 180, 350, 150);
        line(280, 180, 400 - j, 215 - j);
        j += 10;
      }
      
      for(let i = 0; i < 3; i++){
        //line(280, 180, 400 - j, 215 - j);
        line(130, 180, 10, 10);
        //j += 10;
      }
      */
  noStroke();
  //nose
  fill(50);
  circle(200, 200, 12);
      
      
      
      x1 = mouseX; 
      y1 = mouseY;
      easeTo(); //this should apply to all of the faces
      
      //head values around 200, 110
      // let headHit = int(dist(mouseX, mouseY, 200, 200));
      // let bellyHit = int(dist(mouseX, mouseY, 200, 530));
      let headHit = int(dist(mouseX, mouseY, (windowWidth / 3) + 200, (windowHeight / 4) + 200));
      let bellyHit = int(dist(mouseX, mouseY, (windowWidth / 3) + 200, (windowHeight / 4) + 530));
  
      //add hit detection condition
      if(numTouches < 3 && numTouches > 0 && headHit < 100 || petBool == true && headHit < 100){
        headSeal();
      } else if (numTouches >= 2 && bellyHit < 200 || petBool == true && bellyHit < 200){
        bellySeal();
      } else {
        idleSeal(xc, xy);
      }
      
  } 
}


//animated
//function for drawing the seal, idle 
function idleSeal(xcVal, xyVal){
  //circle(xcVal, xyVal, 10);
  //print("idle");
  
  //brows
  fill(140);
  circle(180, 160, 15);
  circle(220, 160, 15);
  
  //animate blinking cycle
  //eye
  fill(255);
  circle(161, 182, 30);
  circle(239, 182, 30);
  //pupil
  fill(50);
  circle(161, 182, 26);
  circle(239, 182, 26);
  
  blink();
}

//find use for this
function easeTo() {
  x2 += (x1 - x2) * easeAmount;
  y2 += (y1 - y2) * easeAmount;
  

  //number to constrain, min, max
  xc = constrain(x2, 130, 270); //i  want to curve this somehow
  xy = constrain(y2, 150, 250);
  // fill(169); 
  //   ellipse(x2 / 2, y2 /2, 180, 150);
  //fill(50);
  
  // ellipse(x2, y2, 50, 50);
  
}
//function for drawing the seal, head hit detection
function headSeal(){
  //print("head")
  //brows
  fill(140);
  circle(180, 160, 15);
  circle(220, 160, 15);
  
  //eyes are happy
  fill(255);
  circle(161, 182, 30);
  circle(239, 182, 30);
  //pupil
  fill(50);
  circle(161, 182, 26);
  circle(239, 182, 26);
  
  fill(165);
  arc(161, 182, 31, 31, 0, 180);
  arc(239, 182, 31, 31, 0, 180);
  //add blush
  fill('pink');
  ellipse(130, 190, 20, 10);
  ellipse(270, 190, 20, 10);
}
//function for drawing the seal, belly hit detection
function bellySeal(){
  //print("belly");
  
  //brows
  fill(140);
  circle(180, 155, 15);
  circle(220, 155, 15);
  
  //eyes are closed and happy
  noFill();
  strokeWeight(3);
  stroke(50);
  arc(161, 192, 30, 40, 190, 0);
  arc(239, 192, 30, 40, 180, 0);
  
  //add silly
  push();
  noStroke();
  fill(255);
  fill('pink');
  ellipse(244, 230, 10, 15);
  pop();
  fill(165);
  arc(240, 210, 80, 30, -10, 180, OPEN);
}


function blink(){
  frameRate(10);
  
  if(frameCount % 50 < 3){
    fill(165);
    circle(161, 182, 31); //right
    circle(239, 182, 31); //left
    push();
    //close eyes
    stroke(0)
    line(145, 180, 180, 180); //left
    line(222, 180, 257, 180); //right
    pop(); 
  }
  if (frameCount % 50 == 3){
    fill(165);
    circle(161, 182, 31); //right
    circle(239, 182, 31); //left
  }
}
//draggable func to place accessories

//or make a hand class... no bc i want different hands..?
//function to create left hand object - with different states?
//function to create right hand object


