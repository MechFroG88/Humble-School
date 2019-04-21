<template>
  <div id="_performance">
    <div class="titleContainer">
      <arrow-left-icon class="custom-class" @click="$router.push('/language')" ></arrow-left-icon>
      <div class="title">Choose Performance to Watch</div>
    </div>
  
    <div class="container">
      <div class="card">
        <div class="pic"></div>
      </div>
    </div>      

  </div>
  
  
</template>

<script>
import { ArrowLeftIcon } from 'vue-feather-icons'
  export default {
    components: {
      ArrowLeftIcon
    }
  }
</script>

<style>

</style>
