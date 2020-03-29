import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //add creation of new simulation
    // decreasing by 5% is multiplying by .95
    // create config for each power to return config
    // create mutation to change the store

    counts: {},
    radius: 0,
    days: null,
    // moveSpeed: 2,
    // minDaysSick: 14,
    // recoveryRate: 0.2, // rates need to be between 0-1 (inclusive)
    // deathRate: 0.1, // rates need to be between 0-1 (inclusive)
    // spreadChance: 0.1, // chances need to be between 0-1 (inclusive)

    washHandsFactor: 1, // Wash Hands getter
    cdcSpeechFactor: 1, // Speech by CDC getter
    newHospitalFactor: 1, // Open new hospital getter
    socialDistancingFactor: 1, // Social Distancing getter
    stayAtHomeFactor: 1, // Stay at home order getter
    lockDownFactor: 1, // Lock down order getter
    vaccinePercentage: 0, // This should be set to the percentage (in decimal form) of Healthy people to make immune
    vaccineUsed: 0,
    // note that the "Vaccine notice" will need a method that is called via a Watcher when that button is pressed
    // since this is a "one and done" effect instead of a continuous effect

  },
  getters: {
    counts(state) {
      return state.counts
    },
    days(state) {
      return state.days
    },
    moveSpeed (state) {
      return state.moveSpeed
    },
    minDaysSick(state) {
      return state.minDaysSick
    },
    recoveryRate(state) {
      return state.recoveryRate
    },
    deathRate(state) {
      return state.deathRate
    },
    spreadChance(state) {
      return state.spreadChance
    },
    washHandsFactor(state) {
      return state.washHandsFactor
    },
    cdcSpeechFactor(state) {
      return state.cdcSpeechFactor
    },
    newHospitalFactor(state) {
      return state.newHospitalFactor
    },
    socialDistancingFactor(state) {
      return state.socialDistancingFactor
    },
    stayAtHomeFactor(state) {
      return state.stayAtHomeFactor
    },
    lockDownFactor(state) {
      return state.lockDownFactor
    },
    vaccinePercentage(state) {
      return state.vaccinePercentage
    },

  },
  mutations: {
    updateWashHandsFactor(state, value) {
      state.washHandsFactor = value
    },
    updateCdcSpeechFactor(state, value) {
      state.cdcSpeechFactor = value
    },
    updateNewHospitalFactor(state, value) {
      state.newHospitalFactor = value
    },
    updateSocialDistancingFactor(state, value) {
      state.socialDistancingFactor = value
    },
    updateStayAtHomeFactor(state, value) {
      state.stayAtHomeFactor = value
    },
    updateLockDownFactor(state, value) {
      state.lockDownFactor = value
    },
    updateVaccinePercentage(state, value) {
      state.vaccinePercentage = value
    },
    updateVaccineUsed(state, value) {
      state.vaccineUsed = value
    },

    updateCounts(state, value){
      state.counts = value
    },
    updateSpreadRate(state, value) {
      state.spreadRate = value
    },
    updateRadius(state, value) {
      state.radius = value
    },
    updateDays(state, value) {
      state.days = value
    },
    updateDeathRate(state, value) {
      state.deathRate = value
    },
    updateMoveSpeed(state, value) {
      state.moveSpeed = value
    },
    updateMinDaysSick(state, value) {
      state.minDaysSick = value
    },
    updateRecoveryRate(state, value) {
      state.recoveryRate = value
    },
    updateSpreadChance(state, value) {
      state.spreadChance = value
    },


  },
  actions: {
  },
  modules: {
  }
})
