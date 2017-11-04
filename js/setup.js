function collision(event) {
  let pairs = event.pairs[0];

    if ((pairs.bodyA.label == 'disc' && pairs.bodyB.label == 'peg') ||
    pairs.bodyA.label == 'peg' && pairs.bodyB.label == 'disc' && !mute) {
      dingSound.play();
    }
    if (((pairs.bodyA.label == 'disc' && pairs.bodyB.label == 'bottomBound') ||
    (pairs.bodyA.label == 'bottomBound' && pairs.bodyB.label == 'disc')) && cashCount == 0) {

      let discScoring = pairs.bodyA.label == 'disc' ? pairs.bodyA.position.x : pairs.bodyB.position.x
      if ((discScoring > 0 && discScoring < 80) ||
    (discScoring > 241 && discScoring < 285) || (discScoring > 346 && discScoring < 400) ||
    (discScoring > 560 && discScoring < 640)) {
        money = 0;
        if (!mute) {
          losingSound.play();
        }
      } else if ((discScoring > 80 && discScoring < 130) ||
      (discScoring > 505 && discScoring < 560) ) {
        money = 100;
        if (!mute) {
          cashSound.play();
        }
      } else if ((discScoring > 130 && discScoring < 190) ||
      (discScoring > 450 && discScoring < 505)) {
        money = 1000;
        if (!mute) {
          cashSound.play();
        }
      } else if ((discScoring > 400 && discScoring < 450) ||
      (discScoring > 190 && discScoring < 240)) {
        money = 500;
        if (!mute) {
          cashSound.play();
        }
      } else if ((discScoring > 295 && discScoring < 345)) {
        money = 10000;
        if (!mute) {
          cashSound.play();
        }
      }


      score += money;
      cashCount += 1;

      if (chances == 0) {
        gameOver = true;
        database.ref().push({
          score: score
        });
      }
      intermission = true;
      discInPlay = false;
    }
}

function renderNextPlay() {
  if (intermission && chances > 0) {
    textSize(80);
    stroke(0);
    fill('#34d73a');
    textAlign(CENTER);
    text(`You made $${money}.`, 330, 200);
    textAlign(RIGHT);
    text(`Click anywhere`, 580, 300);
    text(`to try again.`, 540, 400);
  }
}

function renderNewGame() {
  if (gameOver) {
    fill('#34d73a');
    textAlign(CENTER);
    text(`You made $${money}.`, 330, 200);
    textAlign(RIGHT);
    text(`Your total is $${score}!`, 530, 300);
    text(`Click to play again.`, 520, 400);
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
    chances -= 1;
  }
}

function createArrow() {
  input = loadImage('assets/images/angle-arrow-down.svg');
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
  if (!intermission && !discInPlay && chances > 0 && game) {
    if (keyIsDown(32)) {
      newDisc();
    }
  }
}
function mouseClicked() {
  if (((mouseX < width && mouseX > width - 30) && (mouseY > 0 && mouseY < 30)) && !mute) {
    mute = true;
    backgroundSong.pause();
  } else if (((mouseX < width && mouseX > width - 30) && (mouseY > 0 && mouseY < 30)) &&mute) {
    mute = false;
    backgroundSong.play();
  } else {
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
        chances = 3;
        gameOver = false;
        score = 0;
      }
    }
  }


}

function renderTitle() {
  textAlign(RIGHT);
  textSize(100);
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

function getHighScores(highScores) {
    Object.keys(highScores).map(el => highScores[el])
    highScores = _.orderBy(highScores, ['score'], ['desc'] )
    return highScores.slice(0, 4);
}

function renderHighScores() {
    $('.highscores').empty();
    $('.highscores').append(
      `<div class='highscores-title'>High Scores</div>`
    );
    highScoreList.forEach( (el, idx) => {
      $('.highscores').append(
        `<li class='highscore-list-item'>
        <div>
        ${idx + 1}. $${el.score}
        </div>
        </li>`
      );
    });
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

function renderChances() {
  textSize(20);
  textAlign(RIGHT);
  fill(255);
  noStroke();
  text(`Chips Left: ${chances}`, width - 5, 55);
}

function renderPointsBoard() {
  rectMode(RIGHT);
  noStroke();
  fill(240, 235, 127)
  rect(0, height - 70, width, 10);
  let y = width-100;
  let h = 90;
  fill(236, 26, 19);
  rect(0, y, 80, h);
  fill(34, 173, 44);
  rect(80, y, 50, h);
  fill(236, 26, 19);
  rect(130, y, 60, h);
  fill(34, 173, 44);
  rect(190, y, 50, h);
  fill(236, 26, 19);
  rect(240, y, 55, h);
  fill(34, 173, 44);
  rect(295, y, 50, h);
  fill(236, 26, 19);
  rect(345, y, 55, h);
  fill(34, 173, 44);
  rect(400, y, 50, h);
  fill(236, 26, 19);
  rect(450, y, 55, h);
  fill(34, 173, 44);
  rect(505, y, 55, h);
  fill(236, 26, 19);
  rect(560, y, 80, h);

  fill(255);
  stroke(0);
  textSize(65);
  text('0', 60, y+50);
  text('0', 283, y+50);
  text('0', 388, y+50);
  text('0', 615, y+50);
  fill(255);
  rotate(PI/2);
  textSize(30);
  text('100', width-55, -95);
  text('100', width-55, -523);
  text('500', width-50, -205);
  text('500', width-50, -413);
  textSize(25);
  text('1000', width-50, -150);
  text('1000', width-50, -470);
  textSize(20);
  text('10000', width-50, -313);


}
