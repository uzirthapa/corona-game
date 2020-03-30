<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <v-app-bar
            app
            dark
    >
      <div class="d-flex align-center">
        <div class="accent--text display-2">
          CoroNation
        </div>
      </div>

      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn
                  dark
                  icon
                  v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Restart</v-list-item-title>
          </v-list-item>
          <v-list-item to="home">
            <v-list-item-title>End Game</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-container
      fluid
      grid-list-md
    >
      <v-layout>
        <v-flex xs3>
          <div class="pb-2">
            <v-card
              dark
              class="pa-4"
            >
              <div class="text-center">
                {{counts.region}}
              </div>
              <div class="font-weight-bold display-1 text-center">
                Day {{daysPassed}}
              </div>
            </v-card>
          </div>

          <div class="pb-2">
            <v-card
              v-if="globalTotals"
              dark
              width="100%"
              class="pa-2"
            >
              <v-layout wrap>
                <v-flex
                  text-center
                  xs6
                >
                  <v-card outlined>
                    <v-flex>
                      <div class="title">
                        Population
                      </div>
                      <div :class="`display-1 font-weight-bold --text`">
                        {{globalTotals.totalAlive}}
                      </div>
                    </v-flex>
                  </v-card>
                </v-flex>
                <v-flex
                  text-center
                  xs6
                >
                  <v-card outlined>
                    <v-flex>
                      <div class="title">
                        Recovered
                      </div>
                      <div :class="`display-1 font-weight-bold green--text`">
                        {{globalTotals.totalImmune}}
                      </div>
                    </v-flex>
                  </v-card>
                </v-flex>
                <v-flex
                  text-center
                  xs6
                >
                  <v-card outlined>
                    <v-flex>
                      <div class="title">
                        Infected
                      </div>
                      <div :class="`display-1 font-weight-bold orange--text`">
                        {{globalTotals.totalSick}}
                      </div>
                    </v-flex>
                  </v-card>
                </v-flex>
                <v-flex
                  text-center
                  xs6
                >
                  <v-card outlined>
                    <v-flex>
                      <div class="title">
                        Dead
                      </div>
                      <div :class="`display-1 font-weight-bold red--text`">
                        {{globalTotals.totalDead}}
                      </div>
                    </v-flex>
                  </v-card>
                </v-flex>
                <!--<v-flex xs6 text-center v-for="(total, i) in totals" :key="i">-->
                <!--<v-card outlined>-->
                <!--<v-flex>-->
                <!--<div class="title">-->
                <!--{{total.name}}-->
                <!--</div>-->
                <!--<div :class="`display-1 font-weight-bold ${total.color}&#45;&#45;text`">-->
                <!--{{total.number}}-->
                <!--</div>-->
                <!--</v-flex>-->
                <!--</v-card>-->
                <!--</v-flex>-->
              </v-layout>
            </v-card>
            <!--<v-card dark width="100%" class="pa-2">-->
            <!--<v-layout wrap>-->
            <!--<v-flex xs6 text-center v-for="(total, i) in totals" :key="i">-->
            <!--<v-card outlined>-->
            <!--<v-flex>-->
            <!--<div class="title">-->
            <!--{{total.name}}-->
            <!--</div>-->
            <!--<div :class="`display-1 font-weight-bold ${total.color}&#45;&#45;text`">-->
            <!--{{total.number}}-->
            <!--</div>-->
            <!--</v-flex>-->
            <!--</v-card>-->
            <!--</v-flex>-->
            <!--</v-layout>-->
            <!--</v-card>-->
          </div>
          <div>
            <v-card
              dark
              width="100%"
            >
              <v-card-title>
                <div class="title grey--text">
                  Confirmed Cases by Country
                </div>
              </v-card-title>
              <v-list two-line>
                <div
                  v-for="(confCase, i) in confirmedCases"
                  :key="i"
                >
                  <v-list-item>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-layout>
                          <div class="font-weight-medium red--text">
                            {{confCase.cases}}
                          </div>
                          <div class="caption ml-2 pt-1 red--text">
                            confirmed
                          </div>
                        </v-layout>

                      </v-flex>
                      <v-flex xs12>
                        <v-layout>
                          <div class="font-weight-medium">
                            {{confCase.name}}
                          </div>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-list-item>
                  <v-divider/>
                </div>
              </v-list>

            </v-card>
          </div>
        </v-flex>
        <v-flex xs6>
          <div class="pb-2">
            <v-card
              dark
              height="500"
              width="100%"
              class="pa-0"
            >
              <slot name="canvas"/>
            </v-card>
          </div>
          <div>
            <v-card
              dark
              class="pa-2"
            >
              <v-card-title>
                <div>Number of Infections by day</div>
              </v-card-title>
              <canvas id="case-chart"></canvas>
              <!--    <v-sparkline
                      :value="value"
                      :gradient="gradient"
                      :smooth="radius || false"
                      :padding="padding"
                      :line-width="width"
                      :stroke-linecap="lineCap"
                      :gradient-direction="gradientDirection"
                      :fill="fill"
                      :type="type"
                      :auto-line-width="autoLineWidth"
                      auto-draw
                  ></v-sparkline>-->
            </v-card>
          </div>
        </v-flex>
        <v-flex xs3>
          <div class="pb-2">
            <v-card
              dark
              width="100%"
              class="pa-2"
            >
              <v-card-title>
                <div class="grey--text">
                  CDC Powers
                </div>
              </v-card-title>
              <v-layout wrap>
                <template v-for="(power, i) in cdcPowers">
                  <v-flex
                    xs12
                    :key="i"
                  >
                    <v-tooltip
                      left
                      max-width="200"
                    >
                      <template v-slot:activator="{ on }">
                        <v-card
                          :disabled="power.used"
                          v-on="on"
                          @click="runCdcPower(power)"
                          outlined
                          class="pa-3"
                        >
                          <v-layout align-center>
                            <v-avatar
                              color="teal"
                              size="48"
                            >
                              <span class="white--text headline">{{power.icon}}</span>
                            </v-avatar>
                            <div
                              class="ml-3"
                              :style="power.used ? 'text-decoration: line-through' : ''"
                            >
                              {{power.title}}
                            </div>
                            <v-flex
                              v-if="power.used"
                              text-end
                            >
                              <v-chip
                                class="font-weight-bold"
                                small
                                label
                                color="red"
                              >
                                Expired
                              </v-chip>
                            </v-flex>
                          </v-layout>
                        </v-card>
                      </template>
                      <span>{{power.description}}</span>
                    </v-tooltip>
                  </v-flex>
                </template>
              </v-layout>
            </v-card>
          </div>
          <div>
            <v-card
              dark
              width="100%"
              class="pa-2"
            >
              <v-card-title>
                <div class="grey--text">Government Powers</div>
              </v-card-title>
              <v-layout wrap>
                <template v-for="(power, i) in govtPowers">
                  <v-flex
                    xs12
                    :key="i"
                  >
                    <v-tooltip
                      left
                      max-width="200"
                    >
                      <template v-slot:activator="{ on }">
                        <v-card
                          :disabled="power.used"
                          v-on="on"
                          @click="runGovtPower(power)"
                          outlined
                          class="pa-3"
                        >
                          <v-layout align-center>
                            <v-avatar
                              color="indigo"
                              size="48"
                            >
                              <span class="white--text headline">{{power.icon}}</span>
                            </v-avatar>
                            <div
                              class="ml-3"
                              :style="power.used ? 'text-decoration: line-through' : ''"
                            >
                              {{power.title}}
                            </div>
                            <v-flex
                              v-if="power.used"
                              text-end
                            >
                              <v-chip
                                class="font-weight-bold"
                                small
                                label
                                color="red"
                              >
                                Expired
                              </v-chip>
                            </v-flex>
                          </v-layout>

                        </v-card>
                      </template>
                      <span>{{power.description}}</span>
                    </v-tooltip>
                  </v-flex>
                </template>
              </v-layout>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <!--<c-game-canvas msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
// import CGameCanvas from '@/components/CGameCanvas.vue'
import Chart from 'chart.js';
import {mapGetters, mapMutations} from 'vuex';

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
];
export default {
  name: 'Home',
  components: {
    // CGameCanvas
  },
  data() {
    return {
      width: 1,
      radius: 2,
      padding: 2,
      lineCap: 'round',
      labels: ['Day 0'],
      gradient: gradients[5],
      value: [0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      dayNum: 6,
      menu: false,
      totals: [
        {
          name: 'Population',
          number: 1024,
          color: '',
        },
        {
          name: 'Recovered',
          number: 1024,
          color: 'green',
        },
        {
          name: 'Infected',
          number: 1024,
          color: 'orange',
        },
        {
          name: 'Deaths',
          number: 1024,
          color: 'red',
        },
      ],
      confirmedCases: [
        {
          name: 'USA',
          cases: 500,
        },
        {
          name: 'China',
          cases: 500,
        },
        {
          name: 'Italy',
          cases: 500,
        },
        {
          name: 'India',
          cases: 500,
        },
        {
          name: 'Nepal',
          cases: 500,
        },
        {
          name: 'Spain',
          cases: 500,
        },
      ],
      cdcPowers: [
        {
          title: 'Wash your hands #tweet',
          tag: 'washHands',
          factor: 0.95,
          icon: 'XX',
          used: false,
          description: 'This will limit the spread of the virus by 50%',
        },
        {
          title: 'Speech by CDC Official',
          tag: 'cdcSpeech',
          factor: 0.85,
          icon: 'XX',
          used: false,
          description: "This reduces people's movement by 15%",
        },
        {
          title: 'New Vaccine introduced',
          tag: 'vaccine',
          factor: 0.15,
          icon: 'XX',
          used: false,
          description: 'This makes 15% of the population immune to the virus',
        },
        {
          title: 'Build new hospital',
          tag: 'newHospital',
          factor: 1.50,
          icon: 'XX',
          used: false,
          description: 'This increases peoples chances to recover by 50%',
        },

      ],
      govtPowers: [
        {
          title: 'Social distancing request',
          tag: 'socialDistancing',
          factor: 0.50,
          icon: 'XX',
          used: false,
          description: 'This will reduce infection rate of the virus by 50%',
        },
        {
          title: 'Stay at home order',
          tag: 'stayHome',
          factor: 0.05,
          icon: 'XX',
          used: false,
          description: 'This will slow the population of non essential employees to 5%',
        },
        {
          title: 'Lock down',
          tag: 'lockDown',
          factor: 0,
          icon: 'XX',
          used: false,
          description: 'This will decrease movement to 0 for all except 5% of the population for 5 days',
        },
        {
          title: 'Close Borders',
          tag: 'closeBorder',
          factor: 0.05,
          icon: 'XX',
          used: true,
          description: 'Coming soon - This will limit traffic from each region to 5% for 5 days',
        },
      ],

      pastCount:[],
      pastRecoveredCount:[],
      pastDeadCount: [],
      pastDays:[],
      // chart options
      chartData: {
        type: 'line',
        data: {
          labels: this.pastDays,
          datasets: [
            { // one line graph
              label: 'Number of Cases',
              data: this.pastCount,
              backgroundColor: 'rgba(255, 165,0,.8)',
              borderColor: '#FFA500',
              borderWidth: 3,
            },
            { // another line graph
              label: 'Number of Recovered',
              data: this.pastRecoveredCount,
              backgroundColor: [
                'rgba(71, 183,132,.5)', // Green
              ],
              borderColor: [
                '#47b784',
              ],
              borderWidth: 3
            },
            { // another line graph
              label: 'Number of Dead',
              data: this.pastDeadCount,
              backgroundColor: [
                'rgba(255, 0,0,.5)', //Red
              ],
              borderColor: 'rgba(255, 0,0,1)',
              borderWidth: 3
            },

          ],
        },
        options: {
          animation: false,
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                padding: 10,
                scaleOverride : true,
                scaleSteps : 5,
                scaleStepWidth : 50,
                scaleStartValue : 0,
                suggestedMax:10
              },
            }],
          },
        },
      },

    };
  },
  computed: {
    ...mapGetters({
      counts: 'counts',
      daysPassed: 'days',
      globalTotals: 'globalTotals',
    }),
  },
  watch:{
   /* "globalTotals.totalSick": function (val) {
      this.pastCount.push(val);
      this.$set(this.chartData.data.datasets[0], "data", this.pastCount);
      this.createChart('case-chart', this.chartData);
    },*/
  /*  "globalTotals.totalImmune": function (val) {
      this.pastRecoveredCount.push(val);
      this.$set(this.chartData.data.datasets[1], "data", this.pastRecoveredCount);
      this.createChart('case-chart', this.chartData);
    },*/
    daysPassed:function (val) {
      this.pastCount.push(this.globalTotals.totalSick);
      this.$set(this.chartData.data.datasets[0], "data", this.pastCount);

      this.pastRecoveredCount.push(this.globalTotals.totalImmune);
      this.$set(this.chartData.data.datasets[1], "data", this.pastRecoveredCount);

      this.pastDeadCount.push(this.globalTotals.totalDead);
      this.$set(this.chartData.data.datasets[2], "data", this.pastDeadCount);

      this.pastDays.push(`Day ${val}`);
      this.$set(this.chartData.data, "labels", this.pastDays);
      this.createChart('case-chart', this.chartData);
    },
  },
  mounted() {
    this.createChart('case-chart', this.chartData);
    this.resetPowers();
    this.resetChart();
  },
  methods: {
    ...mapMutations([
      'updateMoveSpeed',
      'updateWashHandsFactor',
      'updateCdcSpeechFactor',
      'updateLockDownFactor',
      'updateNewHospitalFactor',
      'updateSocialDistancingFactor',
      'updateStayAtHomeFactor',
      'updateVaccinePercentage',
      'updateVaccineUsed',
            'updateDays'
    ]),
    resetChart() {
      // this.chartData.data.labels = []
      // this.chartData.data.datasets[0].data = []
      // this.chartData.data.datasets[1].data = []
      // this.chartData.data.datasets[2].data = []
      this.pastCount = [];
      this.pastDays = [];
      this.pastRecoveredCount = [];
      this.createChart('case-chart', this.chartData);
    },
    resetPowers(){
      this.updateWashHandsFactor(1)
      this.updateCdcSpeechFactor(1)
      this.updateLockDownFactor(1)
      this.updateNewHospitalFactor(1)
      this.updateSocialDistancingFactor(1)
      this.updateStayAtHomeFactor(1)
      this.updateVaccinePercentage(0)
      this.updateVaccineUsed(0)
      this.updateDays(0)



      this.govtPowers.map(power => {
        if(power.tag !== "closeBorder") {
          power.used = false
        }
      })
      this.cdcPowers.map(power => {

        power.used = false
      })
    },
    runGovtPower(power) {
      power.used = true;
      console.log(power);
      console.log(power.tag);
      switch (power.tag) {
        case 'socialDistancing':
          this.updateSocialDistancingFactor(power.factor);
          break;
        case 'stayHome':
          this.updateStayAtHomeFactor(power.factor);
          break;
        case 'lockDown':
          this.updateLockDownFactor(power.factor);
          break;
        default:
          break;
        // case 'closeBorders':
        //   this.update(power.factor)
        //   break;
      }
    },
    runCdcPower(power) {
      console.log(power);
      power.used = true;
      switch (power.tag) {
        case 'washHands':
          console.log(power.factor);

          this.updateWashHandsFactor(power.factor);
          break;
        case 'cdcSpeech':
          this.updateCdcSpeechFactor(power.factor);
          break;
        case 'vaccine':
          this.updateVaccineUsed(-1);
          this.updateVaccinePercentage(power.factor);
          break;
        case 'newHospital':
          this.updateNewHospitalFactor(power.factor);
          break;
        default:
          break;
      }


    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
  },
};
</script>
