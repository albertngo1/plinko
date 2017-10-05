class Peg {
  constructor(x, y, r) {
    const options = {
      isStatic: true
    }
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = "peg";
    this.r = r;
    World.add(world, this.body);
  }

  show() {
    fill("#45bf36");
    stroke(255);
    push();
    const pos = this.body.position;
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
