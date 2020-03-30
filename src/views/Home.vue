<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <span class="accent--text display-4">
            CoroNation
          </span>
        </v-row>
        <v-row align="center" justify="center">
          <span class="secondary--text display-1">
            Decide or Die
          </span>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col xs="12" sm="10" md="6" lg="4">
        <v-row>
          <v-col cols="12">
            <v-card
                    to="game"
                    outlined
                    height="200px"
                    img="../assets/corona-spread.jpg"
                    :hover="true"
            >
              <v-img src="../assets/corona-spread.jpg" height="100%" class="text-secondary align-end">
                <v-card-text class="display-1">Play</v-card-text>
              </v-img>

            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card
                    class="pa-3 headline"
                    outlined
                    height="200px"
            >
              Game Settings
            </v-card>
          </v-col>

          <v-col cols="6">
            <v-card
                    to="about"
                    class="pa-3 headline"
                    outlined
                    height="200px"
            >About Us</v-card>

          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
}
</script>
