
class Disc {

  constructor(x, y, r) {
    const options = {
      restitution: 1,
      friction: 0
    }
    this.body = Bodies.circle(x, y, r, options);
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


}

class Peg {
  constructor(x, y, r) {
    const options = {
      isStatic: true
    }
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
  }

  show() {
    fill(45, 230, 7);
    stroke(255);
    push();
    const pos = this.body.position;
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }


}
