<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/games">Close Games</router-link>
    </div>
    <transition name="page" mode="out-in">
      <router-view/>
    </transition>
    <transition name="slide-fade"><footer class="footer navbar-fixed-bottom mt-4">Made by widetrace. 2019</footer></transition>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'UnitedSans';
  src: url(./fonts/UnitedSansReg-Medium.otf)
}

body {
  height: 100%;
  background: #f3f3f3;
}
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: UnitedSans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #c70232;
    }
  }
}
footer {
  width: 100%;
  text-align: center;
  background-color: rgb(185, 185, 185);
}
.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
