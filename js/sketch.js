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

let img;
let dingSound;
let cashSound;
let cashCount = 0;

function preload() {
  dingSound = loadSound('./assets/sounds/muted-metal-pot-hit.mp3');
  cashSound = loadSound('./assets/sounds/cha-ching-register.mp3');
}

function setup() {
  createCanvas(640, 550);
  const spacing = width / cols;
  createArrow();
  engine = Engine.create();
  world = engine.world;
  newDisc();

  Events.on(engine, 'collisionStart', collision)
  createPegs(spacing);
  createBounds();
  newPillars(spacing);
  edgePillars(spacing)
}

function draw() {
  background(51);
  arrowMovement();
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
  image(img, img.x, img.y, img.width/cols, img.height/cols);
}
