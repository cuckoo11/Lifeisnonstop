let life;
let choice;
let color;

function setup() {
  createCanvas(300, 1000);
  life = new Life();
  choice = new Choice();

  color = random(0,255),random(0,255),random(0,255);
}

function draw() {
  let gravity = createVector(0,0.01);

  background(220);
  life.show();
  life.move();
  life.update();

  choice.show();
  choice.update();
  choice.applyForce(gravity);
}

class Life {
  constructor() {
    this.pos = createVector(10,10);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.pos.x = this.pos.x + random(-2, 2);
    this.pos.y = this.pos.y + random(-2, 2);
  }

  show(){
    ellipse(this.pos.x,this.pos.y,50,50);
    fill(color);
  }

  move(){
    this.vel.x = (mouseX-this.pos.x)/10;
    this.vel.y = (mouseY-this.pos.y)/10;
  }
}

class Choice {
  constructor(){
    this.pos = createVector(random(width),10);
    this.vel = createVector (0,0);
    this.acc = createVector(0,0);
  }

  applyForce(force) {
    let f = force.copy();
    this.acc.add(f);
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  show(){
    ellipse(this.pos.x,this.pos.y,50,50);
    fill(255,255,255,90);
  }

}
