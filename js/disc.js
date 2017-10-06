class Disc {

  constructor(x, y, r) {
    const options = {
      restitution: 1,
      friction: 0,
      density: .5
    }
    x += random(-1, 1);
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = "disc";
    this.r = r;
    World.add(world, this.body)
  }

  show() {
    fill(23, 232, 147);
    stroke(0);
    push();
    const pos = this.body.position;
    translate(pos.x, pos.y);
    image(dollarSignImg, 0, 0, 28, 28)
    pop();
  }

  offScreen() {
    let x = this.body.position.x;

    return (x < -50 || x > width + 50);
  }

}
