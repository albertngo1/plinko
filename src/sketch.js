const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

let engine;
let world;
let discs = [];
let pegs = [];
const rows = 12;
const cols = 9;
const topBuffer = 5;


function setup() {
  createCanvas(640, 600);

  engine = Engine.create();
  world = engine.world;
  newDisc();
  const spacing = width / cols;

  for (let i=0; i < rows; i++) {
    for (let j=0; j <= cols; j ++) {
      let x;
      if (i %  2 == 0) {
        x = j * spacing + (spacing / 2);
      } else {
        x = j * spacing;
      }
      let y = (i + 1) * (spacing / 2) + topBuffer;
      let p = new Peg(x, y, 4);
      pegs.push(p);
    }
  }
}

function newDisc() {
  const d = new Disc(300, 0, 20);
  discs.push(d);
}

function draw() {
  if (frameCount % 60 == 0) {
    newDisc();
  }
  background(51);
  Engine.update(engine);
  discs.forEach( disc => {
    disc.show();
  });
  pegs.forEach( peg => {
    peg.show();
  });
}
