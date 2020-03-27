import Point from './Point';

export default class Person {
  constructor(startPoint, moveVector, radius = 10) {
    this.pos = startPoint;
    this.moveVector = moveVector;
    this.radius = radius;
  }

  setPos(newPoint) {
    this.pos = newPoint;
  }

  getPos() {
    return this.pos;
  }

  getVector() {
    return this.moveVector;
  }

  getCircle() {
    console.log(this.pos);
    return {...this.pos.toObj(), r: this.radius};
  }

  tick({minX, minY, maxX, maxY}) {
    let newX = this.pos.x + this.moveVector.x;
    let newY = this.pos.y + this.moveVector.y;

    if (newX - this.radius < minX){
      this.moveVector.x *= -1;
    }

    if (newX + this.radius > maxX){
      this.moveVector.x *= -1;
    }

    if (newY - this.radius < minY){
      this.moveVector.y *= -1;
    }

    if (newY + this.radius > maxY){
      this.moveVector.y *= -1;
    }

    this.setPos(new Point(newX, newY));
  }
}