function collision(event) {
  let pairs = event.pairs[0];
  if (!mute) {
    if ((pairs.bodyA.label == 'disc' && pairs.bodyB.label == 'peg') ||
    pairs.bodyA.label == 'peg' && pairs.bodyB.label == 'disc') {
      dingSound.play();
    }
    if (((pairs.bodyA.label == 'disc' && pairs.bodyB.label == 'bottomBound') ||
    (pairs.bodyA.label == 'bottomBound' && pairs.bodyB.label == 'disc')) && cashCount == 0) {
      cashSound.play();
      cashCount += 1;
    }
  }
}

function createBounds() {
  const bottomSideBound = new Boundary(width / 2, height - 45, width, 50, 'bottomBound');
  const leftSideBound = new Boundary(0, height / 2, 1, height, 'leftBound');
  const rightSideBound = new Boundary(width, height / 2, 1, height, 'rightBound');
}

function newPillars(spacing) {
  for (let i=2; i < cols; i++) {
    let x = i * spacing - spacing / 2;
    let h = 70;
    let w = 10;
    let y = height - 1.5*h;
    let b = new Boundary(x, y, w, h, "rectangle");
    pillars.push(b);
  }
}

function edgePillars(spacing) {
  let x = 1 * spacing - spacing;
  let h = 70;
  let w = 30;
  let y = height - 1.5*h;
  let b = new Boundary(x, y, w, h);
  pillars.push(b);

  x = (cols+1) * spacing - 2 * w;
  b = new Boundary(x, y, w, h);
  pillars.push(b);
}

function newDisc() {
  if (discs.length < 1) {
    const d = new Disc(input.x, input.y, circleRadius);
    discs.push(d);
  }
}

function createArrow() {
  input = loadImage('./assets/angle-arrow-down.svg');
  imageMode(CENTER);
  input.x = width/2;
  input.y = 10;
}

function arrowMovement() {
  if (keyIsDown(LEFT_ARROW)) {
    if (!arrowOffScreen(LEFT_ARROW)) {
      input.x -= 5;
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    if (!arrowOffScreen(RIGHT_ARROW)) {
      input.x += 5;
    }
  }
}

function arrowOffScreen(key) {
  let leftX;
  let rightX;
  leftX = input.x - input.width/(2 * cols);
  rightX = input.x + input.width/(2 * cols);
  if (leftX < 0 && key == LEFT_ARROW ) {
    return true;
  } else if (rightX > width && key == RIGHT_ARROW) {
    return true;
  } else {
    return false;
  }
}

function createPegs(spacing) {
  for (let i=0; i < rows; i++) {
    for (let j=0; j <= cols; j ++) {
      let x;
      if (i %  2 == 1) {
        x = j * spacing + (spacing / 2);
      } else {
        x = j * spacing;
      }
      let y = (i + 1) * (spacing / 2) + topBuffer;
      let p = new Peg(x, y, pegRadius);
      pegs.push(p);
    }
  }
}

function keyPressed() {
  if (keyCode == 32) {
    newDisc();
  }
}

function drawTitle() {
  textSize(100);
  textFont(font);
  textStyle(BOLD);
  stroke(0);
  text("P",40, 70);
  text("I",120, 70);
  ellipse(121, 45, 15);
  text("L",90, 70);
  text("N",145, 70);
  text("O",237, 70);
  text("K",195, 70);
  fill(219);
}

function mouseClicked() {
  if (((mouseX < width && mouseX > width - 30) && (mouseY > 0 && mouseY < 30)) && !mute) {
    mute = true;
    backgroundSong.pause();
  } else if (mute) {
    mute = false;
    backgroundSong.play();
  }
}
