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

      chances -= 1;
      if (chances == 0) {
        gameOver = true;
      }
      intermission = true;
      discInPlay = false;
    }
  }
}

function renderNextPlay() {
  if (intermission && chances > 0) {
    textSize(80);
    fill(255, 0, 0);
    text(`You made $${money}!`, 600, 200);
    text(`Click anywhere`, 580, 300);
    text(`to try again.`, 540, 400);
  }
}

function renderNewGame() {
  if (gameOver) {
    text(`You cashed ${money}!`, 400, 400);
    text(`Your score is ${score}!`, 400, 500);
    text(`Press enter to play again.`, 400, 600);
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
  discInPlay = true;
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

function keyPressed123() {
  if (keyIsDown(13) && !game) {
    game = true;
  }
  if (!intermission && !discInPlay && chances > 0) {
    if (keyIsDown(32)) {
      newDisc();
    }
  }
}
function mouseClicked() {
  if (((mouseX < width && mouseX > width - 30) && (mouseY > 0 && mouseY < 30)) && !mute) {
    mute = true;
    backgroundSong.pause();
  } else if (mute) {
    mute = false;
    backgroundSong.play();
  }

  if (intermission && !discInPlay) {
    world.bodies.forEach( body => {
      if (body.label === 'disc') {
        World.remove(world, body);
      }
    })
    intermission = false;
    discs = [];
    cashCount = 0;
    if (gameOver) {
      chances = 3
      gameOver = false;
      score = 0;
    }
  }

}

function renderTitle() {
  textAlign(RIGHT);
  textSize(100);
  textFont(font);
  textStyle(BOLD);
  fill(255);
  stroke(0);
  text("P",60, 70);
  text("I",115, 70);
  ellipse(93, 45, 15);
  text("L",100, 70);
  text("N",165, 70);
  text("O",260, 70);
  text("K",215, 70);
}

function renderScore() {
  noStroke();
  textSize(50);
  text(`$${score}`, 605, 35);
}

function renderBeginGame() {
  textSize(60);
  text('Welcome to Plinko!', width / 2 + 250, 300);
  text('Press enter', width / 2 + 150, 400);
  text('to start.', width / 2 + 125 , 500);
}

function soundOption() {
  if (!mute) {
    imageMode(CENTER);
    image(unmutedSound, width-15, 15, 30, 30);
  } else if (mute) {
    imageMode(CENTER);
    image(mutedSound, width-15, 15, 30, 30);
  }
}
