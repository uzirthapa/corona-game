<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs3>
          <div class="pb-2">
            <v-card dark class="pa-4">
              <div class="text-center">
                {{counts.region}}
              </div>
              <div class="font-weight-bold display-1 text-center">
                 Day {{daysPassed}}
              </div>
            </v-card>
          </div>

          <div class="pb-2">
            <v-card v-if="counts.counts" dark width="100%" class="pa-2">
              <v-layout wrap>
                <v-flex text-center xs6>
                  <v-card outlined>
                  <v-flex>
                  <div class="title">
                  Population
                  </div>
                  <div :class="`display-1 font-weight-bold --text`">
                    {{counts.counts.totalAlive}}
                  </div>
                  </v-flex>
                  </v-card>
                </v-flex>
                <v-flex text-center xs6>
                  <v-card outlined>
                    <v-flex>
                      <div class="title">
                        Recovered
                      </div>
                      <div :class="`display-1 font-weight-bold green--text`">
                        {{counts.counts.Immune}}
                      </div>
                    </v-flex>
                  </v-card>
                </v-flex>
                <v-flex text-center xs6>
                  <v-card outlined>
                    <v-flex>
                      <div class="title">
                        Infected
                      </div>
                      <div :class="`display-1 font-weight-bold orange--text`">
                        {{counts.counts.Sick}}
                      </div>
                    </v-flex>
                  </v-card>
                </v-flex>
                <v-flex text-center xs6>
                  <v-card outlined>
                    <v-flex>
                      <div class="title">
                        Dead
                      </div>
                      <div :class="`display-1 font-weight-bold red--text`">
                        {{counts.counts.Dead}}
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
            <v-card dark width="100%">
              <v-card-title>
                <div class="title grey--text">
                  Confirmed Cases by Country
                </div>
              </v-card-title>
              <v-list two-line>
                <div v-for="(confCase, i) in confirmedCases" :key="i">
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
            <v-card color="yellow" height="500" width="100%" class="pa-0">
              <slot name="canvas"/>
            </v-card>
          </div>
          <div>
            <v-card dark class="pa-2">
              <v-card-title>
                <div>Number of Cases by day</div>
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
            <v-card dark width="100%" class="pa-2">
              <v-card-title>
                <div class="grey--text">
                  CDC Powers
                </div>
              </v-card-title>
              <v-layout wrap>
                <template v-for="(power, i) in cdcPowers">
                  <v-flex xs12 :key="i">
                    <v-tooltip left max-width="200">
                      <template v-slot:activator="{ on }">
                        <v-card v-on="on" @click="runCdcPower(power)" outlined class="pa-3">
                          <v-layout align-center>
                            <v-avatar color="teal" size="48">
                              <span class="white--text headline">{{power.icon}}</span>
                            </v-avatar>
                            <div class="ml-3">
                              {{power.title}}
                            </div>
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
            <v-card dark width="100%" class="pa-2">
              <v-card-title>
                <div class="grey--text">Government Powers</div>
              </v-card-title>
              <v-layout wrap>
                <template v-for="(power, i) in govtPowers">
                  <v-flex xs12 :key="i">
                    <v-tooltip left max-width="200">
                      <template v-slot:activator="{ on }">
                        <v-card v-on="on" @click="runGovtPower(power)" outlined class="pa-3">
                          <v-layout align-center>
                            <v-avatar color="indigo" size="48">
                              <span class="white--text headline">{{power.icon}}</span>
                            </v-avatar>
                            <div class="ml-3">
                              {{power.title}}
                            </div>
                            <!--<v-flex text-right>-->
                            <!--<v-menu-->
                            <!--:close-on-content-click="false"-->
                            <!--:nudge-width="200"-->
                            <!--offset-x-->
                            <!--&gt;-->
                            <!--<template v-slot:activator="{ on }">-->
                            <!--<v-btn-->
                            <!--color="indigo"-->
                            <!--dark-->
                            <!--icon-->
                            <!--v-on="on"-->
                            <!--&gt;-->
                            <!--<v-icon>-->
                            <!--mdi-information-->
                            <!--</v-icon>-->
                            <!--</v-btn>-->
                            <!--</template>-->
                            <!--<v-card>-->
                            <!--<v-card-text>-->
                            <!--{{power.description}}-->
                            <!--</v-card-text>-->
                            <!--</v-card>-->

                            <!--</v-menu>-->

                            <!--</v-flex>-->
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
  import {mapGetters, mapMutations} from 'vuex'

  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
  export default {
    name: 'Home',
    components: {
      // CGameCanvas
    },
    data() {
      return {
        width: 2,
        radius: 10,
        padding: 8,
        lineCap: 'round',
        gradient: gradients[5],
        value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8,],
        gradientDirection: 'top',
        gradients,
        fill: false,
        type: 'trend',
        autoLineWidth: false,
        dayNum: 6,
        menu: false,
        totals: [
          {
            name: "Population",
            number: 1024,
            color: ""
          },
          {
            name: "Recovered",
            number: 1024,
            color: "green"
          },
          {
            name: "Infected",
            number: 1024,
            color: "orange"
          },
          {
            name: "Deaths",
            number: 1024,
            color: "red"
          }
        ],
        confirmedCases: [
          {
            name: "USA",
            cases: 500
          },
          {
            name: "China",
            cases: 500
          },
          {
            name: "Italy",
            cases: 500
          },
          {
            name: "India",
            cases: 500
          },
          {
            name: "Nepal",
            cases: 500
          },
          {
            name: "Spain",
            cases: 500
          }
        ],
        cdcPowers: [
          {
            title: "Wash your hands #tweet",
            tag: 'washHands',
            factor: 0.95,
            icon: "XX",
            description: "This will limit the spread of germs by 1/2 because people will be washing them away"
          },
          {
            title: "Speech by CDC Official",
            tag: 'cdcSpeech',
            factor: 0.85,
            icon: "XX",
            description: "This will limit the spread of germs by 1/2 because people will be washing them away"
          },
          {
            title: "New Vaccine introduced",
            tag: 'vaccine',
            factor: 0.15,
            icon: "XX",
            description: "This will limit the spread of germs by 1/2 because people will be washing them away"
          },
          {
            title: "Build new hospital",
            tag: 'newHospital',
            factor: 1.50,
            icon: "XX",
            description: "This increases peoples recovery rate by 50%"
          },

        ],
        govtPowers: [
          {
            title: "Social distancing request",
            tag: 'socialDistancing',
            factor: 0.50,
            icon: "XX",
            description: "This will reduce spread rate by 50%"
          },
          {
            title: "Stay at home order",
            tag: 'stayHome',
            factor: 0.05,
            icon: "XX",
            description: "This will slow population of non essential employees to 5%"
          },
          {
            title: "Lock down",
            tag: 'lockDown',
            factor: 0.05,
            icon: "XX",
            description: "This will decrease movement to 0 for all except 5% of population for 5 days"
          },
          {
            title: "Close Borders",
            tag: 'washHands',
            factor: 0.05,
            icon: "XX",
            description: "Coming soon - This will limit traffic from each region to 5% for 5 days"
          },
        ],

        // chart options
        chartData: {
          type: 'line',
          data: {
            labels: ['0/01/01', '0/01/02', '0/01/03', '0/01/04', '0/01/05', '0/01/06', '0/01/07', '0/01/08'],
            datasets: [
              { // one line graph
                label: 'Number of Cases',
                data: [0, 0, 1, 2, 67, 62, 60, 40],
                backgroundColor: [
                  'rgba(255, 0,0,.5)'
                ],
                borderColor: [
                  '#36495d',
                  '#36495d',
                  '#36495d',
                  '#36495d',
                  '#36495d',
                  '#36495d',
                  '#36495d',
                  '#36495d',
                ],
                borderWidth: 3
              },
           /*   { // another line graph
                label: 'Planet Mass (x1,000 km)',
                data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
                backgroundColor: [
                  'rgba(71, 183,132,.5)', // Green
                ],
                borderColor: [
                  '#47b784',
                ],
                borderWidth: 3
              }*/
            ]
          },
          options: {
            responsive: true,
            lineTension: 1,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                }
              }]
            }
          }
        }

      }
    },
    computed: {
      ...mapGetters({
        counts: 'counts',
        daysPassed: 'days'
      })
    },
    mounted() {
      this.createChart('case-chart', this.chartData);
    },
    methods: {
      ...mapMutations([
              'updateMoveSpeed',
              'updateWashHandsFactor',
              "updateCdcSpeechFactor",
              "updateLockDownFactor",
              "updateNewHospitalFactor",
              "updateSocialDistancingFactor",
              "updateStayAtHomeFactor",
              "updateVaccinePercentage",
              "updateVaccineUsed"
      ]),
      runGovtPower(power) {
        console.log(power)
        switch(power.tag) {
          case 'socialDistancing':
            this.updateSocialDistancingFactor(power.factor)
            break;
          case 'stayHome':
            this.updateStayAtHomeFactor(power.factor)
            break;
          case 'lockdown':
            this.updateLockDownFactor(power.factor)
            break;
          default:
            break;
          // case 'closeBorders':
          //   this.update(power.factor)
          //   break;
        }
      },
      runCdcPower(power) {
        console.log(power)
        switch(power.tag) {
          case 'washHands':
            console.log(power.factor)
            this.updateWashHandsFactor(power.factor)
            break;
          case 'cdcSpeech':
            this.updateCdcSpeechFactor(power.factor)
            break;
          case 'vaccine':
            this.updateVaccineUsed(-1)
            this.updateVaccinePercentage(power.factor)
            break;
          case 'newHospital':
            this.updateNewHospitalFactor(power.factor)
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
      }
    }
  }
</script>
