let life;

function setup() {
  createCanvas(300, 1000);
  life = new Life();
}

function draw() {
  background(220);
  life.show();
}

class Life {
  constructor() {
    this.pos = createVector(mouseX,mouseY);
  }

  show(){
    ellipse(mouseX-1,mouseY - 1,50,50);
    fill(255,200);
  }
}
