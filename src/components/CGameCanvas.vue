<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <div>
          <canvas
            id="canvas"
            width="800"
            height="600"
          >
            Sorry, browser does not support canvas.
          </canvas>
        </div>
        <img
          src="../assets/bar.png"
          id="bar"
          style="display:none"
        />
        <div>
          {{counts}}
        </div>
        <div>
          Ticks today: {{ticksPassed}}<br/>
          Days passed: {{daysPassed}}
        </div>

        <div>
          <canvas
            id="canvas2"
            width="800"
            height="600"
          >
            Sorry, browser does not support canvas
          </canvas>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Person from './Person';
import Point from './Point';
import Quad from './Quad';
import Region from './Region';

let healthyPeople = [];
let immunePeople = [];
let deadPeople = [];
const radius = 5;
const patientX = new Person(new Point(400, 300), new Point(1, 2), radius);
patientX.healthy = false;
let sickPeople = [patientX];
const ticksPerDay = 100;
for (let i = 0; i < 10; i++) {
  const posX = Math.floor(Math.random() * (800 - 2 * radius)) + radius;
  const posY = Math.floor(Math.random() * (600 - 2 * radius)) + radius;
  let movX = Math.floor(Math.random() * 7) - 3;
  if (movX === 0) {
    movX -= 1;
  }
  let movY = Math.floor(Math.random() * 7) - 3;
  if (movY === 0) {
    movY -= 1;
  }

  healthyPeople.push(new Person(new Point(posX, posY), new Point(movX, movY), radius));
}

const testRegion = new Region(new Quad(0, 0, 800, 600));
testRegion.initialize(100);
const testViewPort = new Quad(0, 0, 800, 600);

export default {
  name: 'GameCanvas',
  data: () => ({
    canvas: null,
    canvas2: null,
    ctx: null,
    dx: 1,
    dy: 2,
    bar: null,
    circle: null,
    dxBar: 6,
    timer: null,
    barImg: null,
    counts: {
      healthy: 0,
      sick: 0,
      immune: 0,
      dead: 0,
      total: 0,
    },
    ticksPassed: 0,
    daysPassed: 0,
  }),
  created() {
    var vm = this;
    this.$nextTick(() => {
      window.addEventListener('keydown', vm.doKeyDown, false);
      vm.barImg = document.getElementById('bar');
      vm.canvas = document.getElementById('canvas');
      vm.canvas2 = document.getElementById('canvas2');
      vm.ctx = vm.canvas.getContext('2d');
      vm.timer = setInterval(
        () => {
          vm.draw();
          vm.draw2();
        },
        10,
      );
      vm.bar = new vm.Bar(400, 500);
      // vm.circle = new vm.Circle(400, 30, 10);
    });

    return this.timer;
  },
  methods: {
    Bar(x, y) {
      this.x = x;
      this.y = y;
    },
    Circle(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
    },
    drawBall(c) {
      this.ctx.beginPath();
      this.ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, true);
      this.ctx.fill();
    },
    doKeyDown(e) {
      if (e.keyCode == 37) {
        if (this.bar.x - this.dxBar > 0)
          this.bar.x -= this.dxBar;
      } else if (e.keyCode == 39) {
        if (this.bar.x + this.dxBar < this.canvas.width)
          this.bar.x += this.dxBar;
      }
    },
    tick() {
      this.movePeople();
      this.checkRecoveryDeath();
      this.spreadVirus();
      this.updateCounts();

      this.ticksPassed += 1;
      if (this.ticksPassed % ticksPerDay === 0) {
        this.ticksPassed = 0;
        this.daysPassed += 1;
      }
    },
    movePeople() {
      const boundary = {minX: 0, minY: 0, maxX: this.canvas.width, maxY: this.canvas.height};
      healthyPeople.forEach(person => person.tick(boundary, ticksPerDay));
      sickPeople.forEach(person => person.tick(boundary, ticksPerDay));
      immunePeople.forEach(person => person.tick(boundary, ticksPerDay));
    },
    checkRecoveryDeath() {
      sickPeople.forEach(person => person.checkRecoverOrDeath(ticksPerDay));
      immunePeople.push(...sickPeople.filter(x => x.immune));
      deadPeople.push(...sickPeople.filter(x => !x.alive));
      sickPeople = sickPeople.filter(x => !x.immune && x.alive);
    },
    spreadVirus() {
      const spreadChance = 0.1;
      const r2 = radius * radius;
      healthyPeople.forEach(
        person => {
          let staysHealthy = true;
          for (let i = 0; i < sickPeople.length; i++) {
            if (this.distance2(person, sickPeople[i]) <= r2) {
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
      sickPeople.push(...(healthyPeople.filter(x => !x.healthy)));
      healthyPeople = healthyPeople.filter(x => x.healthy);
    },
    updateCounts() {
      this.counts.healthy = healthyPeople.length;
      this.counts.sick = sickPeople.length;
      this.counts.immune = immunePeople.length;
      this.counts.dead = deadPeople.length;
      this.counts.total = [immunePeople, sickPeople, healthyPeople, deadPeople].reduce((acc, cur) => acc + cur.length, 0);
    },
    distance2(person1, person2) {
      return Math.pow(person1.pos.x - person2.pos.x, 2) + Math.pow(person1.pos.y - person2.pos.y, 2);
    },
    draw2() {
      const configs = {
        moveSpeed: 2.5,
        minDaysSick: 14,
        recoveryRate: 0.2,
        deathRate: 0.05,
        ticksPerDay: ticksPerDay,
      };
      // pretick all regions
      testRegion.preTick(configs);
      // tick all regions
      testRegion.tick(configs);
      this.canvas2.getContext('2d').clearRect(0, 0, this.canvas2.width, this.canvas2.height);
      this.canvas2.getContext('2d').fillStyle = '#FF00FF';
      this.canvas2.getContext('2d').fillRect(0, 0, 800, 600);
      testRegion.draw(this.canvas2, testViewPort, 1);
      // testRegion.draw(this.canvas2, new Quad(0, 300, 800, 600), 1);
      // testRegion.draw(this.canvas2, new Quad(400, 300, 800, 600), 1);
      // testRegion.draw(this.canvas2, new Quad(400, 0, 800, 600), 1);
    },
    draw() {
      this.tick();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#AAAAFF';
      // this.ctx.fillStyle = '#FAF7F8';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = '#000000';
      healthyPeople.forEach(person => {
        this.drawBall(person.getCircle());
      });

      this.ctx.fillStyle = '#FF0000';
      sickPeople.forEach(
        person => {
          this.drawBall(person.getCircle());
        },
      );

      this.ctx.fillStyle = '#00FF00';
      immunePeople.forEach(
        person => {
          this.drawBall(person.getCircle());
        },
      );

      // if (this.counts.sick === 0) {
      //   console.log('THE END');
      //   clearInterval(this.timer);
      // }
      // if (this.circle.x + this.dx > this.canvas.width || this.circle.x + this.dx < 0)
      //   this.dx = -this.dx;
      // if (this.circle.y + this.dy > this.bar.y && this.circle.x > this.bar.x && this.circle.x < this.bar.x + this.barImg.width)
      //   this.dy = -this.dy;
      // if (this.circle.y + this.dy > this.canvas.height || this.circle.y + this.dy < 0)
      //   this.dy = -this.dy;
      // this.circle.x += this.dx;
      // this.circle.y += this.dy;
      // this.ctx.drawImage(this.barImg, this.bar.x, this.bar.y);
      // if (this.circle.y > this.bar.y) {
      //   clearTimeout(this.timer);
      //   this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //   alert('Game Over');
      // }
    },
  },
};
</script>
