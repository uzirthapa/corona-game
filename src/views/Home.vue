<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <c-game-canvas msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CGameCanvas from '@/components/CGameCanvas.vue'

export default {
  name: 'Home',
  components: {
    CGameCanvas
  }
}
</script>
