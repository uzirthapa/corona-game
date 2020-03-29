<template>
  <v-container
    fluid
    class="pa-0"
    style="width: 100%; height: 100%; overflow-y: auto;"
  >
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
                {{configs}}
              </div>
            </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="d-flex justify-center">
        <v-btn
          @click="start"
          :disabled="!!timer || ended"
        >Start
        </v-btn>

        <v-btn
          @click="playPause"
          :disabled="!timer"
        >
          {{this.paused ? 'Play' : 'Pause'}}
        </v-btn>

        <v-btn
          @click="reset"
          :disabled="!ended"
        >
          Reset
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Quad from './Quad';
import Region from './Region';

import {mapMutations, mapGetters} from 'vuex';

export default {
  name: 'GameCanvas',
  data: () => ({
    canvas: null,
    timer: null,
    paused: false,
    ended: false,
    counts: {},
    ticksPassed: 0,
    daysPassed: 0,

    regions: [
      new Region('Test Region', new Quad(0, 0, 500, 400)),
    ],
    testViewPort: new Quad(0, 0, 500, 400),
    initialHealthy: 249,
    initialSick: 1,
    totalCounts: {},
  }),
  created() {
    this.reset();
    const vm = this;
    this.$nextTick(
      () => {
        vm.canvas = vm.$refs.canvas;
        vm.drawBackground();
        console.log('Canvas', vm.canvas);
        // vm.timer = setInterval(
        //   () => {
        //     vm.draw();
        //   },
        //   10,
        // );
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
    ...mapGetters({
      washHandsFactor: 'washHandsFactor',
    }),
    configs() {
      return {
        ticksPerDay: 100,
        moveSpeed: 2,
        minDaysSick: 14,
        recoveryRate: 0.2, // rates need to be between 0-1 (inclusive)
        deathRate: 0.05, // rates need to be between 0-1 (inclusive)
        spreadChance: 0.1, // chances need to be between 0-1 (inclusive),

        washHandsFactor: this.washHandsFactor, // Wash Hands getter
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
    ...mapMutations([
      'updateCounts',
      'updateDays',
    ]),
    playPause() {
      this.paused = !this.paused;
    },
    reset() {
      this.drawBackground();
      this.paused = false;
      this.ended = false;

      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }

      this.regions.forEach(
        region => {
          region.reset();
          region.initialize(this.initialHealthy, this.initialSick);
        },
      );
    },
    start() {
      if (this.timer) {
        return;
      }

      if (!this.canvas) {
        return;
      }

      this.timer = setInterval(this.step, 10);
    },
    step() {
      if (this.paused) {
        return;
      }
      this.tick();
      this.draw();
      this.checkEnd();
    },
    tick() {
      // pretick all regions
      this.regions.forEach(region => region.preTick(this.configs));

      // then tick all regions
      this.regions.forEach(region => region.tick(this.configs));

      // update counts
      this.updateAllCounts();

      this.ticksPassed += 1;
      if (this.ticksPassed % this.configs.ticksPerDay === 0) {
        this.ticksPassed = 0;
        this.daysPassed += 1;
      }
      this.updateDays(this.daysPassed);
    },
    updateAllCounts() {
      this.regions.forEach(region => {
        this.$set(this.counts, region.name, region.getCounts());
      });

      this.updateCounts(this.counts);
    },
    draw() {
      this.drawBackground();
      this.regions.forEach(region => region.draw(this.canvas, this.testViewPort, 1));
    },
    drawBackground() {
      if (!this.canvas) {
        return;
      }
      const ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      // this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);

    },
    checkEnd() {
      if (this.totalSick === 0) {
        this.ended = true;
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    vaccinate(percentage) {
      this.regions.forEach(region => region.vaccinate(percentage));
    },
  },
};
</script>
