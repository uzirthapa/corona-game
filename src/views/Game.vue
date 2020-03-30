<template>
    <div class="home">
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <main-layout ref="mainLayout">
            <template v-slot:canvas>
                <c-game-canvas @reset="reset" msg="Welcome to Your Vue.js App"/>
            </template>
        </main-layout>

    </div>
</template>

<script>
  import {MainLayout} from '../layouts'
  // @ is an alias to /src
  import CGameCanvas from '@/components/CGameCanvas.vue'
  export default {
    name: 'Game',
    components: {
      CGameCanvas,
      MainLayout
    },
    data() {
      return {
        value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8,],
        dayNum: 6,
        menu: false,
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
        reset(){
            if(this.$refs.mainLayout) {
                this.$refs.mainLayout.resetPowers()
                this.$refs.mainLayout.resetChart()
            }

        },

      runGovtPower(power){
        console.log(power)
      },
      runCdcPower(power) {
        console.log(power)
      }
    }
  }
</script>
