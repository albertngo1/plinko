const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;

let highScores = [];
let engine;
let world;
let font;
let discs = [];
let pegs = [];
let pillars = [];
let input;
let backgroundSong;
let dollarSignImg;
let highScoreList;
let mutedSound;
let unmutedSound;
let dingSound;
let cashSound;
let losingSound;
let mute = false;
let game = false;
let cashCount = 0;
let score = 0;

let money;
let chances = 3;
let intermission = false;
let discInPlay = false;
let gameOver = false;

let database = window.firebase.database();

const rows = 14;
const cols = 12;
const topBuffer = 60;
const circleRadius = 15;
const pegRadius = 2;

function preload() {
  backgroundSong = loadSound('assets/sounds/main-theme.mp3');
  dingSound = loadSound('assets/sounds/muted-metal-pot-hit.mp3');
  cashSound = loadSound('assets/sounds/cha-ching-register.mp3');
  losingSound = loadSound('assets/sounds/losing-horn.mp3');
}

function setup() {
  createCanvas(640, 600);
  font = loadFont("assets/fonts/pricedown.ttf");
  dollarSignImg = loadImage('assets/images/dollar-sign-circle.svg');
  mutedSound = loadImage('assets/images/sound_off.svg');
  unmutedSound = loadImage('assets/images/sound_on.svg');
  createArrow();
  const spacing = width / cols;
  engine = Engine.create();
  world = engine.world;

  Events.on(engine, 'collisionStart', collision)

  database.ref().on("value", function(snapshot) {
      highScores = snapshot.val();});
      database.ref().push({
        score: 0
      });
  createPegs(spacing);
  createBounds();
  newPillars(spacing);
  edgePillars(spacing);
  backgroundSong.loop();
}

function draw() {
  textFont(font);
  background("#407be2");
  soundOption();
  renderTitle();
  keyPressed123();

  if (!game) {
    renderBeginGame();
    return;
  } else if (game) {
    renderScore();
    arrowMovement();
    Engine.update(engine, 16.667);

    discs.forEach( (disc, idx) => {
      disc.show();
    });
    pegs.forEach( peg => {
      peg.show();
    });
    pillars.forEach( pillar => {
      pillar.show();
    })
    image(input, input.x, input.y, input.width/cols, input.height/cols);

    if (!gameOver) {
      renderNextPlay();
    }
    if (chances == 0 && gameOver) {
      renderNewGame();
    }
    highScoreList = getHighScores(highScores);
    renderHighScores();
    renderChances();
    renderPointsBoard();
  }
}
