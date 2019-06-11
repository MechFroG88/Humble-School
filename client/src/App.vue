<template>
  <div id="app">
    <router-view/>
    <flash-message class="flash"></flash-message>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Noto Sans SC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2D4059;
  // background-color: #f3f3f3;
}
.flash {
  position: absolute;
  left: 50%; 
  top: 5%;
  transform: translateX(-50%);
  max-width: 60%;
}
body {
  padding: 0;
  margin: 0;
}
</style>
