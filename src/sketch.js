const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;

let engine;
let world;
let discs = [];
let pegs = [];
let pillars = [];
const rows = 12;
const cols = 12;
const topBuffer = 50;
const circleRadius = 10;
const pegRadius = 2;

let dingSound;
let cashSound;
let cashCount = 0;

function preload() {
  dingSound = loadSound('./assets/sounds/muted-metal-pot-hit.mp3');
  cashSound = loadSound('./assets/sounds/cha-ching-register.mp3');
}

function setup() {
  createCanvas(640, 550);

  engine = Engine.create();
  world = engine.world;
  newDisc();


  const spacing = width / cols;
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

  Events.on(engine, 'collisionStart', collision)

  newPillars(width, height, spacing);
  edgePillars(width, height, spacing)
  createBounds(width, height);
}

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

function createBounds(width, height) {
  const bottomSideBound = new Boundary(width / 2, height - 45, width, 50, 'bottomBound');
  const leftSideBound = new Boundary(0, height / 2, 1, height, 'leftBound');
  const rightSideBound = new Boundary(width, height / 2, 1, 'rightBound');
}

function newPillars(width, height, spacing) {
  for (let i=1; i < cols; i++) {
    let x = i * spacing - spacing / 2;
    let h = 70;
    let w = 10;
    let y = height - 1.5*h;
    let b = new Boundary(x, y, w, h);
    pillars.push(b);
  }
}

function edgePillars(width, height, spacing) {
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

function draw() {
  if (frameCount % 60 == 0) {
    // newDisc();
  }
  background(51);
  Engine.update(engine, 16.667);
  discs.forEach( (disc, idx) => {
    disc.show();
    if (disc.offScreen()) {
      World.remove(world, discs[idx]);
      discs.splice(idx, 1);
    }
  });
  pegs.forEach( peg => {
    peg.show();
  });
  pillars.forEach( pillar => {
    pillar.show();
  })
}
