import Point from './Point';

export default class Person {
  constructor(startPoint, moveVector, radius = 10) {
    this.pos = startPoint;
    this.moveVector = moveVector;
    this.radius = radius;
    this.healthy = true;
    this.immune = false;
    this.alive = true;
    this.ticksSick = 0;
    this.daysSick = 0;
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

  getColor() {
    return this.immune ? '#00FF00' : (this.healthy ? '#000000' : '#FF0000');
  }

  getCircle() {
    return {...this.pos.toObj(), r: this.radius};
  }

  tick({minX, minY, maxX, maxY}, ticksPerDay) {
    let newX = this.pos.x + this.moveVector.x;
    let newY = this.pos.y + this.moveVector.y;

    if (newX - this.radius < minX) {
      this.moveVector.x *= -1;
    }

    if (newX + this.radius > maxX) {
      this.moveVector.x *= -1;
    }

    if (newY - this.radius < minY) {
      this.moveVector.y *= -1;
    }

    if (newY + this.radius > maxY) {
      this.moveVector.y *= -1;
    }

    this.setPos(new Point(newX, newY));

    if (!this.healthy) {
      this.updateSickTime(ticksPerDay);
    }
  }

  updateSickTime(ticksPerDay) {
    this.ticksSick += 1;
    this.daysSick = Math.floor(this.ticksSick / ticksPerDay);
  }

  checkRecoverOrDeath(ticksPerDay) {
    const recoveryRate = 0.2;
    const deathRate = 0.05;

    if (this.ticksSick % ticksPerDay === 0) {
      if (this.daysSick >= 14) {
        const rand = Math.random();
        if (rand < recoveryRate) {
          this.immune = true;
          this.healthy = true;
        } else if (rand < recoveryRate + deathRate) {
          this.alive = false;
        }
      }
    }
  }
}