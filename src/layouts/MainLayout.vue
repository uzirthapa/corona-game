<template>
    <div class="home">
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <v-container fluid grid-list-md>
            <v-layout>
                <v-flex xs3>
                    <div class="pb-2">
                        <v-card dark class="pa-4">
                            <div class="font-weight-bold display-1 text-center">
                                Day {{dayNum}}
                            </div>
                        </v-card>
                    </div>

                    <div class="pb-2">
                        <v-card dark width="100%" class="pa-2">
                            <v-layout wrap>
                                <v-flex xs6 text-center v-for="(total, i) in totals" :key="i">
                                    <v-card outlined>
                                        <v-flex>
                                            <div class="title">
                                                {{total.name}}
                                            </div>
                                            <div :class="`display-1 font-weight-bold ${total.color}--text`">
                                                {{total.number}}
                                            </div>
                                        </v-flex>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-card>
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
                                    <v-list-item >
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
                    <div  class="pb-2">
                        <v-card color="yellow" height="500" width="100%">

                        </v-card>
                    </div>
                    <div>
                        <v-card dark class="pa-2">
                            <v-card-title>
                                <div>Number of Cases by day</div>
                            </v-card-title>
                            <v-sparkline
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
                            ></v-sparkline>
                        </v-card>
                    </div>
                </v-flex>
                <v-flex xs3>
                    <div class="pb-2">
                        <v-card dark  width="100%" class="pa-2">
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
                        <v-card  dark width="100%" class="pa-2">
                            <v-card-title >
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
                    }  ,
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
                        icon: "XX",
                        description: "This will limit the spread of germs by 1/2 because people will be washing them away"
                    },
                    {
                        title: "Speech by Dr.Fauchi",
                        icon: "XX",
                        description: "This will limit the spread of germs by 1/2 because people will be washing them away"
                    },
                    {
                        title: "News Report on vaccine",
                        icon: "XX",
                        description: "This will limit the spread of germs by 1/2 because people will be washing them away"
                    },
                    {
                        title: "Wash your hands #tweet",
                        icon: "XX",
                        description: "This will limit the spread of germs by 1/2 because people will be washing them away"
                    },

                ],
                govtPowers : [
                    {
                        title: "Stay at home order",
                        icon: "XX",
                        description: "This will limit the spread of germs by 1/2 because people will be washing them away"
                    },
                    {
                        title: "Social Distancing",
                        icon: "XX",
                        description: "This will limit the spread of germs by 1/2 because people will be washing them away"
                    },
                    {
                        title: "Lockdown Country",
                        icon: "XX",
                        description: "This will limit the spread of germs by 1/2 because people will be washing them away"
                    },
                    {
                        title: "Nuclear Bomb",
                        icon: "XX",
                        description: "This will limit the spread of germs by 1/2 because people will be washing them away"
                    },
                ]
            }
        },
        methods: {
            runGovtPower(power){
                console.log(power)
            },
            runCdcPower(power) {
                console.log(power)
            }
        }
    }
</script>
