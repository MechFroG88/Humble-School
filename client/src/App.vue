<template>
  <div id="app">
    <div class="btn btn-primary btnGroup"  @click="back()" 
    v-if="$route.name !== 'home' && 
          $route.name !== 'group' &&
          $route.name !== 'users' &&
          $route.name !== 'groupDetails'&&
          $route.name !== 'details' &&
          $route.name !== 'model'">
      <i class="icon icon-arrow-left1"></i>
      <div>back</div>
    </div>
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
#app {
  & > div.btnGroup {
    position: absolute;
    display: flex !important;
    margin-left: 20%;
    align-items: center;
    width: 6.5rem;
    border-radius: .2rem !important;
    height: 2.5rem !important;
    margin-top: 2rem;
    opacity: .8;
    box-shadow: 0 .2rem 1rem rgba($color: #ff4e6a, $alpha: 0.6);
    @media screen and (max-width: 500px){
      width: 5rem;
      height: 2rem !important;
      margin-left: 7%;
    }
    @media screen and (min-width: 900px){
      margin-left: 35%;
    }
    .icon {
      font-size: 1rem;
      margin-right: .5rem;
      margin-left: .3rem;
      @media screen and (min-width: 500px) {
        margin-left: 1rem;
      }
    }
  }
}
body {
  padding: 0;
  margin: 0;
}
</style>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>
