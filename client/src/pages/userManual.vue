<template>
  <div id="_userManual">
    <div class="container">
      <div class="title">User Manual </div>
      <div class="mobile">
        <div class="instructions">
          <div class="instruction">1. Use one finger to change angle of view.</div>
          <div class="instruction">2. Use two fingers to move the screen.</div>
          <div class="instruction">3. Pinch to zoom the screen.</div>
          <div class="instruction">4. Tap on any class to view details.</div>
        </div>
      </div>

      <div class="desktop">
        <div class="instructions">
          <div class="instruction">1. Right click and hold to change angle of view.</div>
          <div class="instruction">2. Left click to move the screen.</div>
          <div class="instruction">3. Scroll to zoom the screen.</div>
          <div class="instruction">4. Click on any class to view details.</div>
        </div>
      </div>
      <div class="btnGroup">
        <button class="btn btn-primary nextBtn" @click="next1">Model</button>
        <button class="btn btn-primary nextBtn" @click="next">Details</button>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  methods: {
    next() {
      this.$router.push('/model');
    },
    next1() {
      this.$router.push('/model1');
    }
  }
}
</script>

<style>

</style>
