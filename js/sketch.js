const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;

let engine;
let world;
let font;
let discs = [];
let pegs = [];
let pillars = [];
let input;
let backgroundSong;
let dollarSignImg;
let mutedSound;
let unmutedSound;
let dingSound;
let cashSound;
let mute = false;
let cashCount = 0;
let score = 0;

const rows = 14;
const cols = 12;
const topBuffer = 60;
const circleRadius = 15;
const pegRadius = 2;

function preload() {
  backgroundSong = loadSound('./assets/sounds/main-theme.mp3');
  dingSound = loadSound('./assets/sounds/muted-metal-pot-hit.mp3');
  cashSound = loadSound('./assets/sounds/cha-ching-register.mp3');
}

function setup() {
  createCanvas(640, 600);
  font = loadFont("../assets/fonts/pricedown.ttf");
  dollarSignImg = loadImage('../assets/images/dollar-sign-circle.svg');
  mutedSound = loadImage('../assets/images/sound_off.svg');
  unmutedSound = loadImage('../assets/images/sound_on.svg');
  createArrow();
  const spacing = width / cols;
  engine = Engine.create();
  world = engine.world;

  Events.on(engine, 'collisionStart', collision)
  createPegs(spacing);
  createBounds();
  newPillars(spacing);
  edgePillars(spacing);
  backgroundSong.loop();
}

function draw() {
  background("#407be2");
  if (!mute) {
    imageMode(CENTER);
    image(unmutedSound, width-15, 15, 30, 30);
  } else if (mute) {
    imageMode(CENTER);
    image(mutedSound, width-15, 15, 30, 30);
  }
  drawTitle();
  keyPressed();
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
  image(input, input.x, input.y, input.width/cols, input.height/cols);
}
