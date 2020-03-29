import Point from './Point';
import Person from './Person';
import HealthStatuses from './HealthStatus';
import Jobs from './Jobs';
// import Quad from './Quad';

const radius = 3;
const r2 = radius * radius;

export default class Region {
  constructor(name, quad, wallThickness = 1) {
    this.name = name;
    this.quad = quad;
    this.wallThickness = wallThickness;

    this.Healthy = [];
    this.Sick = [];
    this.Immune = [];
    this.Dead = [];
  }

  reset() {
    Object.keys(HealthStatuses).forEach(
      key => {
        this[key] = [];
      },
    );
  }

  initialize(numHealthy, numSick = 1) {
    for (let i = 0; i < numHealthy; i++) {
      this.spawnHealthPerson();
    }

    for (let i = 0; i < numSick; i++) {
      this.spawnSickPerson();
    }
  }

  spawnHealthPerson(pos = undefined, vec = undefined) {
    this.Healthy.push(this.createPerson(pos, vec));
  }

  spawnSickPerson(pos = undefined, vec = undefined) {
    const person = this.createPerson(pos, vec);
    person.healthy = false;
    this.Sick.push(person);
  }

  createPerson(pos = undefined, vec = undefined) {
    if (pos === undefined) {
      // position is relative to the top left corner of the region (0,0)
      const newX = Math.random() * (this.quad.width - 2 * radius - 2 * this.wallThickness) + radius + this.wallThickness;
      const newY = Math.random() * (this.quad.height - 2 * radius - 2 * this.wallThickness) + radius + this.wallThickness;

      pos = new Point(newX, newY);
    }

    if (vec === undefined) {
      const rads = 2 * Math.PI * Math.random();
      const dx = Math.cos(rads);
      const dy = Math.sin(rads);

      vec = new Point(dx, dy);
    }

    const jobRand = Math.random();
    const job = jobRand < 0.5 ? Jobs.NonRemote : Jobs.Remote;
    return new Person(pos, vec, radius, job);
  }

  getCount(healthStatus) {
    return this[healthStatus.name].count;
  }

  getCounts() {
    const counts = {totalAlive: 0};
    Object.keys(HealthStatuses).forEach(
      statusName => {
        const count = this[statusName].length;
        counts[statusName] = count;
        if (statusName !== HealthStatuses.Dead.name) {
          counts.totalAlive += count;
        }
      },
    );

    return counts;
  }

  preTick(configs = {}) {
    this.movePeople(configs);
  }

  tick(configs = {}) {
    this.checkRecoveryDeath(configs);
    this.spreadVirus(configs);
  }

  movePeople(configs) {
    Object.keys(HealthStatuses).forEach(
      status => {
        this[status].forEach(person => person.updatePos(this.quad.width, this.quad.height, configs));
      },
    );
  }

  checkRecoveryDeath(configs) {
    this.Sick.forEach(person => person.checkRecoverOrDeath2(configs));
    this.Immune.push(...this.Sick.filter(x => x.immune));
    this.Dead.push(...this.Sick.filter(x => !x.alive));
    this.Sick = this.Sick.filter(x => !x.immune && x.alive);
  }

  spreadVirus(configs) {
    // todo fix this method - it is VERY inefficient and slows things down a lot when there are many people
    // todo: use a modified divide and conquer on subregions?

    const spreadChance = configs.spreadChance || 0.1;

    // Check each Healthy person to see if they get sick
    this.Healthy.forEach(
      person => {
        let staysHealthy = true;
        for (let i = 0; i < this.Sick.length; i++) {
          if (this.distance2(person, this.Sick[i]) <= r2) {
            const rand = Math.random();
            if (rand < spreadChance) {
              staysHealthy = false;
              break;
            }
          }
        }

        if (!staysHealthy) {
          person.healthy = false;
        }
      },
    );

    // move the new sick people out of the Healthy array and into the Sick array
    this.Sick.push(...(this.Healthy.filter(x => !x.healthy)));
    this.Healthy = this.Healthy.filter(x => x.healthy);
  }

  distance2(person1, person2) {
    return Math.pow(person1.pos.x - person2.pos.x, 2) + Math.pow(person1.pos.y - person2.pos.y, 2);
  }

  draw(canvas, viewPort, zoom = 1) {
    const ctx = canvas.getContext('2d');
    ctx.save();
    this.drawSetup(ctx, viewPort, zoom);

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.quad.width, this.quad.height);
    ctx.fillStyle = '#eeeeff';
    ctx.fillRect(this.wallThickness, this.wallThickness, this.quad.width - 2 * this.wallThickness, this.quad.height - 2 * this.wallThickness);
    ctx.fillStyle = '#000000';
    this.Healthy.forEach(
      person => {
        this.drawBall(
          ctx,
          person.pos.floor(),
          person.radius,
        );
      },
    );
    ctx.fillStyle = '#00FF00';
    this.Immune.forEach(
      person => {
        this.drawBall(
          ctx,
          person.pos.floor(),
          person.radius,
        );
      },
    );
    ctx.fillStyle = '#FF9800';
    this.Sick.forEach(
      person => {
        this.drawBall(
          ctx,
          person.pos.floor(),
          person.radius,
        );
      },
    );
    ctx.restore();
    return true;
  }

  drawSetup(ctx, viewPort, zoom) {
    // todo make this better (and actually work for a zoom level)
    const viewCenter = viewPort.center();
    const regionCenter = this.quad.center();
    const scaledRegionCenter = viewCenter.add(regionCenter.sub(viewCenter).scale(zoom));
    let offset = scaledRegionCenter.sub(new Point(this.quad.width * zoom / 2, this.quad.height * zoom / 2));
    offset = offset.sub(new Point(viewPort.x / zoom, viewPort.y / zoom));

    ctx.scale(zoom, zoom);
    ctx.translate(offset.x, offset.y);
  }

  drawBall(context, pos, radius) {
    context.beginPath();
    context.arc(pos.x, pos.y, radius, 0, Math.PI * 2, true);
    context.fill();
  }

  vaccinate(percentage) {
    // move/filter the newly immune
    const newHealthy = [];

    this.Healthy.forEach(
      person => {
        if (Math.random() < percentage) {
          // immunize them
          person.immune = true;
          this.Immune.push(person);
        } else {
          // They stay healthy
          newHealthy.push(person);
        }
      },
    );

    // Update the Healthy array
    this.Healthy = newHealthy;
  }
}