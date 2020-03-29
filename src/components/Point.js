export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toObj() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  add(otherPoint) {
    return new Point(this.x + otherPoint.x, this.y + otherPoint.y);
  }

  sub(otherPoint) {
    return new Point(this.x - otherPoint.x, this.y - otherPoint.y);
  }

  scale(factor) {
    return new Point(this.x * factor, this.y * factor);
  }

  floor() {
    return new Point(Math.floor(this.x), Math.floor(this.y));
  }
}

export const Zero = new Point(0, 0);