<template>
  <v-app style="background-color: black">
    <v-app-bar
      app
      dark
    >
      <div class="d-flex align-center">
        <div class="display-2 font-weight-bold red--text">
          CoroNation
        </div>
        <!--<v-img-->
          <!--alt="Vuetify Logo"-->
          <!--class="shrink mr-2"-->
          <!--contain-->
          <!--src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"-->
          <!--transition="scale-transition"-->
          <!--width="40"-->
        <!--/>-->

        <!--<v-img-->
          <!--alt="Vuetify Name"-->
          <!--class="shrink mt-1 hidden-sm-and-down"-->
          <!--contain-->
          <!--min-width="100"-->
          <!--src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"-->
          <!--width="100"-->
        <!--/>-->
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/CGameCanvas';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
