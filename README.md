# Plinko

[Live](https://albertngo1.github.io/plinko/)

## Background
Plinko is a chance game based on the popular game on The Price is Right. Drop chips from the top and watch as physics and gravity determine how much money you've won.

![alt text](/assets/demo/demo.gif)

## How It Works

The most difficult implementation of the application was to sync the Matter world which contains bodies that have the physics with the shapes that are drawn on canvas. A lot of trial/error and reading the documentation was done to figure out how  ensure that the disconnect between the two were minimal.

```javascript
this.body = Bodies.circle(x, y, r, options);
this.body.label = "disc";
World.add(world, this.body)

show() {
  fill(23, 232, 147);
  stroke(0);
  push();
  const pos = this.body.position;
  translate(pos.x, pos.y);
  image(dollarSignImg, 0, 0, 28, 28)
  pop();
}
```

I assigned each body a label and created a `collision` event so that different events will happen depending on the label assigned to the body (`peg`, `chip`, or `boundary`).


## Tech

- Matter.js - Physics engine
- P5 - Processing
- Firebase - Database to store high scores
