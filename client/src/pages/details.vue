<template>
  <div id="_details">
    <div class="pic"></div>
    <x-icon class="custom-class closeButton" @click="close"></x-icon>
    <div class="container">
      <div class="title">
        <div class="modal-title h4">VR game</div>
        <span class="chip">电脑学会</span>
      </div>
      <div class="place">中华楼停车场</div>
      <div class="time">3pm-5pm</div>
      <div class="content">
        于例该区导起期，分即用正带，农孤露起同。 级近别展包观，快包明图自，求E形还。 劳音始件平每器西，今断想规与速量型，果6化前新议。 数阶节教表置直成日，油例院世米发队指她，结陕率医收分料。 间取住都起么称更，面飞风质活资么治，期W给三真场。 育从开满意场子历元，位论问直者物手器共书，基十材现肃马秤口。 物通规压部心全片色接海查，行号率天那计南类省西，片于也V验组敌按如业。
      </div>
    </div>
    

  </div>
</template>

<script>
import { XIcon } from 'vue-feather-icons'

export default {
  components: {
    XIcon
  },
  methods: {
    close() {
      this.$router.push('/3d')
    }
  }
}
</script>

<style>

</style>
