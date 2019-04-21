<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './vendor/three.js';
import './vendor/three.min.js';
import './vendor/OrbitControls.js';
</script>

<style lang="scss">
#app {
  font-family: "Noto Sans SC";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2D4059;
  // background-color: #f3f3f3;
}

body {
  padding: 0;
  margin: 0;
}

</style>
