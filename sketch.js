//declare variables
var headSize = 40; //ghost head size

var xPac = 0; //pacman starting position

//intialize variables for ghost colors
var c1;
var c2;
var c3;

//intialize arrays for ghostColors and ghostPositions
var ghostColors;
var ghostxPositions;
var ghostyPositions;

function setup() {
  createCanvas(400, 400);

  c1 = color(255, 158, 229);
  c2 = color(0, 146, 199);
  c3 = color(230, 55, 55);

  ghostColors = [c1, c2, c3];
  ghostxPositions = [101, 286, 194];
  ghostyPositions = [18, 18, 18];
}

function draw() {
  background(0, 0, 0);

  //draw food
  drawFood();

  //drawPacman
  if (mouseIsPressed) {
    //allows user to hide pacman from ghosts
    fill(0, 0, 0);
    arc(xPac, 200, 40, 40, PI / 6, (28 * PI) / 15);
  } else {
    fill(0, 0, 0);
    rect(xPac + -5, 197, 84, 35); //looks like pacman is eating the food as he moves
    fill(247, 255, 3);
    arc(xPac, 200, 40, 40, PI / 6, (28 * PI) / 15);
  }
  xPac++; //iterates pacmans x position so he moves along the x-axis

  if (xPac > 390) {
    //allows pacman to start over once he hits the edge of the screen
    xPac -= 390;
  }

  //draw Maze
  drawMaze(-77, 32, 146);
  drawMaze(-77, 220, 146);

  //draw Ghosts
  for (var i = 0; i < ghostColors.length; i++) {
    drawGhost(ghostxPositions[i], ghostyPositions[i], ghostColors[i]);
    ghostyPositions[i]++;
    if (ghostyPositions[i] > 330) {
      ghostyPositions[i] -= 390;
    }
  }

  //prompt user interaction
  fill(255, 3, 3);
  text("CLICK ANYWHERE TO HIDE PACMAN FROM GHOSTS", 46, 390);
}

// write functions here that are called in your setup or draw function.
const drawFood = () => {
  var x = 15;
  var y = 10;
  while (x < 380 && y < 395) {
    fill(230, 172, 172);
    rect(x, 10, 5, 5); //horizontal food
    rect(x, 200, 5, 5); //horizontal food
    rect(x, 368, 5, 5); //horizontal food

    rect(15, y, 5, 5); //vertical food
    rect(99, y, 5, 5); //vertical food
    rect(204, y, 5, 5); //vertical food
    rect(288, y, 5, 5); //vertical food
    x += 21;
    y += 21;
  }
};

//create maze by drawing rectangles in specificed locations
const drawMaze = (xRec, yRec, recSize) => {
  //color
  fill(0, 0, 0);
  stroke(0, 13, 255);
  //rectangular components
  rect(xRec, yRec, recSize, recSize); //left outer rect
  rect(xRec + 16, yRec + 18, recSize - 35, recSize - 37); //left inner rect
  rect(xRec + 211, yRec, recSize / 5, recSize); //stand alone rect

  rect(xRec + 379, yRec, recSize, recSize); //right outer rect
  rect(xRec + 399, yRec + 18, recSize - 35, recSize - 37); //right inner rect
  rect(xRec + 300, yRec, recSize / 5, recSize); //stand alone rect
  noStroke(); //turn off outlines for everything except rectangles
};

//draw ghosts

const drawGhost = (xHead, yHead, ghostColor) => {
  fill(ghostColor); //selected from ghostColor array when function is called
  ellipse(xHead, yHead, headSize, headSize); //ghost head
  rect(xHead - 20, yHead - 2, headSize, headSize - 4); //ghost body

  //create curvy body part underneath
  ellipse(xHead + 14, yHead + 32, headSize - 30, headSize - 22); //curvy body part
  ellipse(xHead - 14, yHead + 32, headSize - 30, headSize - 22); //curvy body part
  ellipse(xHead - 4, yHead + 32, headSize - 30, headSize - 22); //curvy body part
  ellipse(xHead + 5, yHead + 32, headSize - 29, headSize - 23); //curvy body part

  //create eyes
  fill(247, 247, 247); //outer eye color
  ellipse(xHead - 11, yHead - 3, headSize - 26, headSize - 20); //left outer eye
  ellipse(xHead + 5, yHead - 3, headSize - 24, headSize - 20); //right outer eye
  fill(53, 103, 196); //inner eye
  ellipse(xHead - 13, yHead - 3, headSize - 32, headSize - 32); //left inner eye
  ellipse(xHead + 3, yHead - 3, headSize - 32, headSize - 32); //right inner eye
};
