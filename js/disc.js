class Disc {

  constructor(x, y, r) {
    const options = {
      restitution: 1,
      friction: .2,
      density: .5
    }
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = "disc";
    this.r = r;
    World.add(world, this.body)
  }

  show() {
    fill(255);
    stroke(255);
    push();
    const pos = this.body.position;
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }

  offScreen() {
    let x = this.body.position.x;

    return (x < -50 || x > width + 50);
  }

}
