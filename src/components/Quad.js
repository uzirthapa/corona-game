import Point from './Point';

export default class Quad {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  center() {
    return new Point(this.x + (this.width) / 2, this.y + (this.height) / 2);
  }
}