function collision(event) {
  let pairs = event.pairs[0];
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

function createBounds() {
  const bottomSideBound = new Boundary(width / 2, height - 45, width, 50, 'bottomBound');
  const leftSideBound = new Boundary(0, height / 2, 1, height, 'leftBound');
  const rightSideBound = new Boundary(width, height / 2, 1, 'rightBound');
}

function newPillars(spacing) {
  for (let i=1; i < cols; i++) {
    let x = i * spacing - spacing / 2;
    let h = 70;
    let w = 10;
    let y = height - 1.5*h;
    let b = new Boundary(x, y, w, h);
    pillars.push(b);
  }
}

function edgePillars(spacing) {
  let x = 1 * spacing - spacing;
  let h = 70;
  let w = 70;
  let y = height - 1.5*h;
  let b = new Boundary(x, y, w, h);
  pillars.push(b);

  x = (cols+1) * spacing - 50;
  b = new Boundary(x, y, w, h);
  pillars.push(b);
}

function newDisc() {
  const d = new Disc(320, 0, circleRadius);
  discs.push(d);
}

function createArrow() {
  img = loadImage('./assets/angle-arrow-down.svg');
  imageMode(CENTER);
  img.x = width/2;
  img.y = 10;
}

function arrowMovement() {
  if (keyIsDown(LEFT_ARROW)) {
    if (!arrowOffScreen(LEFT_ARROW)) {
      img.x -= 5;
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    if (!arrowOffScreen(RIGHT_ARROW)) {
      img.x += 5;
    }
  }
}

function arrowOffScreen(key) {
  let leftX;
  let rightX;
  leftX = img.x - img.width/(2 * cols);
  rightX = img.x + img.width/(2 * cols);
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
