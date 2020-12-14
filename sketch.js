let life;
let choice = [];
let color;

let threshold = 30;
let accChangeX = 0;
let accChangeY = 0;
let accChangeT = 0;

function setup() {
  createCanvas(1000, 800);
  life = new Life();

  for (let i = 0; i < 500; i++) {
  choice.push(new Choice());
  }

}

function draw() {
  background(220);
  life.show();
  life.move();
  life.update();

  for (let i = 0; i < choice.length; i++) {
    choice[i].move();
    choice[i].update();
    choice[i].turn();
  }
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
  }

  show(){
    ellipse(this.pos.x,this.pos.y,50,50);
    fill(255,255,255);
  }

  move(){
    this.vel.x = (mouseX-this.pos.x)/10;
    this.vel.y = (mouseY-this.pos.y)/10;
  }
}


function checkForShake() {
  accChangeX = abs(accelerationX - pAccelerationX);
  accChangeY = abs(accelerationY - pAccelerationY);
  accChangeT = accChangeX + accChangeY;

  if (accChangeT >= threshold) {
    for (let i = 0; i < choice.length; i++) {
      choice[i].shake();
      choice[i].turn();
    }
  }

  else {
    for (let i = 0; i < choice.length; i++) {
      choice[i].stopShake();
      choice[i].turn();
      choice[i].move();
      choice[i].update();
    }
  }
}

class Choice {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.xspeed = random(-2, 2);
    this.yspeed = random(-2, 2);
    this.oxspeed = this.xspeed;
    this.oyspeed = this.yspeed;
    this.direction = 0.7;
  }

  move() {
    this.x += this.xspeed * this.direction;
    this.y += this.yspeed * this.direction;
  }

  turn() {
    if (this.x < 0) {
      this.x = 0;
      this.direction = -this.direction;
    } else if (this.y < 0) {
      this.y = 0;
      this.direction = -this.direction;
    } else if (this.x > width - 20) {
      this.x = width - 20;
      this.direction = -this.direction;
    } else if (this.y > height - 20) {
      this.y = height - 20;
      this.direction = -this.direction;
    }
  }

  shake() {
    this.xspeed += random(5, accChangeX / 3);
    this.yspeed += random(5, accChangeX / 3);
  }

  stopShake() {
    if (this.xspeed > this.oxspeed) {
      this.xspeed -= 0.6;
    } else {
      this.xspeed = this.oxspeed;
    }
    if (this.yspeed > this.oyspeed) {
      this.yspeed -= 0.6;
    } else {
      this.yspeed = this.oyspeed;
    }
  }

  update() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
    fill(255,255,200);

    if(life.pos.y>this.y && life.pos.x>this.x){
     this.stop();
    }
  }
  stop(){
    fill(0,0,0,0);
  }
}
