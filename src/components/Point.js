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

  floor() {
    return new Point(Math.floor(this.x), Math.floor(this.y));
  }
}

export const Zero = new Point(0, 0);