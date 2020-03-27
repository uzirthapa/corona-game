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
}