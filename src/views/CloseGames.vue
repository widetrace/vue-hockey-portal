<template>
  <div class="games">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <FullGame class="col" gameStatus="previous" />
    <FullGame class="col" gameStatus="next" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import FullGame from '@/components/FullGame.vue'

export default {
  name: 'home',
  components: {
    HelloWorld, FullGame
  },
};
</script>

<style lang="scss">
  .games {
    display: flex;
    flex-flow: row nowrap;
    div {
      margin-left: 15px;
      margin-right: 15px;
    }
  }
</style>

