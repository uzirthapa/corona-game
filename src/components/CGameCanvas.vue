<template>
  <v-container fluid class="pa-0" style="width: 100%; height: 100%;">
    <v-row class="text-center px-2">
      <v-col>
        <canvas
          id="canvas"
          width="500"
          height="400"
          ref="canvas"
        >
          Sorry, browser does not support canvas.
        </canvas>
      </v-col>
      <v-col>
        <div>
          {{counts}}
        </div>
        <div>
          Total sick: {{totalSick}}
        </div>
        <div>
          Ticks today: {{ticksPassed}}<br/>
          Days passed: {{daysPassed}}
        </div>
        <div v-if="totalExisting > 0">
          Alive%: {{totalAlive * 100 / totalExisting}}<br/>
          Sick%: {{totalSick * 100 / totalExisting}}<br/>
          Dead%: {{totalDead * 100 / totalExisting}}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Test
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Quad from './Quad';
import Region from './Region';

const testRegion = new Region('Test Region', new Quad(0, 0, 500, 400));
testRegion.initialize(500);
const testViewPort = new Quad(0, 0, 500, 400);

export default {
  name: 'GameCanvas',
  data: () => ({
    canvas: null,
    timer: null,
    counts: {},
    ticksPassed: 0,
    daysPassed: 0,

    regions: [],
    testViewPort: new Quad(0, 0, 500, 400),
    initialHealthy: 99,
    initialSick: 1,
  }),
  created() {
    this.canvas = this.$refs.canvas;
    console.log(this.canvas);
    const vm = this;
    this.$nextTick(
      () => {
        vm.canvas = vm.$refs.canvas;
        console.log('Canvas', vm.canvas);
        vm.timer = setInterval(
          () => {
            vm.draw();
          },
          10,
        );
      },
    );
    // var vm = this;
    // this.$nextTick(() => {
    //   vm.canvas = document.getElementById('canvas');
    //   vm.timer = setInterval(
    //     () => {
    //       vm.draw();
    //     },
    //     10,
    //   );
    // });
    //
    // return this.timer;
  },
  computed: {
    configs() {
      return {
        ticksPerDay: 100,
        moveSpeed: 1,
        minDaysSick: 14,
        recoveryRate: 0.2, // rates need to be between 0-1 (inclusive)
        deathRate: 0.05, // rates need to be between 0-1 (inclusive)
        spreadChance: 0.1, // chances need to be between 0-1 (inclusive),

        washHandsFactor: 1, // Wash Hands getter
        cdcSpeechFactor: 1, // Speech by CDC getter
        newHospitalFactor: 1, // Open new hospital getter
        socialDistancingFactor: 1, // Social Distancing getter
        stayAtHomeFactor: 1, // Stay at home order getter
        lockDownFactor: 1, // Lock down order getter
        vaccinePercentage: 0, // This should be set to the percentage (in decimal form) of Healthy people to make immune
        // note that the "Vaccine notice" will need a method that is called via a Watcher when that button is pressed
        // since this is a "one and done" effect instead of a continuous effect
      };
    },
    totalSick() {
      return Object.values(this.counts).reduce((total, {Sick}) => total + Sick, 0);
    },
    totalAlive() {
      return Object.values(this.counts).reduce((total, {totalAlive}) => total + totalAlive, 0);
    },
    totalDead() {
      return Object.values(this.counts).reduce((total, {Dead}) => total + Dead, 0);
    },
    totalExisting() {
      return this.totalAlive + this.totalDead;
    },
  },
  methods: {
    tick() {
      // pretick all regions
      testRegion.preTick(this.configs);

      // then tick all regions
      testRegion.tick(this.configs);

      // update counts
      this.$set(this.counts, testRegion.name, testRegion.getCounts());

      this.ticksPassed += 1;
      if (this.ticksPassed % this.configs.ticksPerDay === 0) {
        this.ticksPassed = 0;
        this.daysPassed += 1;
      }
    },
    draw() {
      this.tick();
      this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
      testRegion.draw(this.canvas, testViewPort, 1);
      this.checkEnd();
    },
    checkEnd() {
      if (this.totalSick === 0) {
        clearInterval(this.timer);
      }
    },
    vaccinate(percentage) {
      testRegion.vaccinate(percentage);
    },
  },
};
</script>
