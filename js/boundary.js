class Boundary {

  constructor(x, y, w, h, label) {
    const options = {
      isStatic: true
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.body.label = label
    this.w = w;
    this.h = h;
    World.add(world, this.body)
  }

  show() {
    fill(250, 255, 244);
    stroke(230, 207, 59);
    push();
    const pos = this.body.position;
    rectMode(CENTER);
    rect(pos.x, pos.y, this.w, this.h);
    pop();
  }

}
