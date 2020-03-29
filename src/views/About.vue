<template>
  <div>
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
      <v-btn icon to="home">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-card height="300px">
            <v-img src="@/assets/josiah.jpg" height="100%" class="text-secondary">
              <v-card-text class="display-1 accent--text">Josiah</v-card-text>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="300px">
            <v-img src="@/assets/uzir.jpg" height="100%" class="text-secondary">
              <v-card-text class="display-1 accent--text">Uzir</v-card-text>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="300px">
            <v-img src="@/assets/aatish.jpg" height="100%" class="text-secondary">
              <v-card-text class="display-1 accent--text">Aatish</v-card-text>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="300px">
            <v-img src="@/assets/adam.jpg" height="100%" class="text-secondary ">
              <v-card-text class="display-1 accent--text">Adam</v-card-text>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
