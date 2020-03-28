import Point from './Point';
import Person from './Person';

export default class Region {
  constructor(quad, wallThickness = 1) {
    this.quad = quad;
    this.wallThickness = wallThickness;

    this.Healthy = [];
    this.Sick = [];
    this.Immune = [];
    this.Dead = [];

    for (let i = 0; i < 10; i++) {
      this.spawnHealthPerson();
    }
  }

  spawnHealthPerson(radius = 3, pos = undefined, vec = undefined) {
    this.Healthy.push(this.createPerson(radius, pos, vec));
  }

  createPerson(radius = 3, pos = undefined, vec = undefined) {
    if (pos === undefined) {
      // position is relative to the top left corner of the region (0,0)
      const newX = Math.random() * (this.quad.width - 2 * radius - 2 * this.wallThickness) + radius + this.wallThickness;
      const newY = Math.random() * (this.quad.height - 2 * radius - 2 * this.wallThickness) + radius + this.wallThickness;

      pos = new Point(newX, newY);
    }

    if (vec === undefined) {
      let dx = 0;
      let dy = 0;
      while (dx === 0 && dy === 0) {
        dx = Math.random() * 5 - 3;
        dy = Math.random() * 5 - 3;
      }

      // normalize the vector to ensure an uniform (normal) speed
      const length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      dx /= length;
      dy /= length;

      vec = new Point(dx, dy);
    }

    return new Person(pos, vec, radius);
  }

  getCount(healthStatus) {
    return this[healthStatus.name].count;
  }

  tick(){
    this.Healthy.forEach(person => person.updatePos(this.quad.width, this.quad.height));
  }

  draw(canvas, viewPort, zoom = 1) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.quad.x - viewPort.x, this.quad.y - viewPort.y, this.quad.width, this.quad.height);
    ctx.fillStyle = '#AAAAFF';
    ctx.fillRect(
      this.quad.x - viewPort.x + this.wallThickness,
      this.quad.y - viewPort.y + this.wallThickness,
      this.quad.width - 2 * this.wallThickness,
      this.quad.height - 2 * this.wallThickness,
    );

    ctx.fillStyle = '#000000';
    this.Healthy.forEach(
      person => {
        this.drawBall(
          ctx,
          person.pos.add(new Point(
            this.quad.x - viewPort.x + this.wallThickness,
            this.quad.y - viewPort.y + this.wallThickness,
          )).floor(),
          person.radius * zoom,
        );
      },
    );

    return true;
  }

  drawBall(context, pos, radius) {
    context.beginPath();
    context.arc(pos.x, pos.y, radius, 0, Math.PI * 2, true);
    context.fill();
  }
}