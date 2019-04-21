<template>
  
  <div id="_3d">
    <button class="btn btn-primary" @click="pop">Pop Card</button>

    <modal ref="popUp" class="animated bounceInUp" closable>  
      <div slot="body">
        <div class="title">
           <div class="modal-title h4">VR game</div>
        <span class="chip">电脑学会</span>
        </div>
       
        <div class="place">中华楼停车场</div>
        <div class="time">3pm-5pm</div>
      </div>
      <div slot="footer">
        <div class="like">
          <heart-icon class="custom-class"></heart-icon>
          <div class="number">234</div>
          <div class="recommend"> recommended this</div>
        </div>
        
      </div>
    </modal>
  </div>
  
</template>

<script>

import modal from '@/components/modal';
import { HeartIcon } from 'vue-feather-icons'

export default {
  components: {
    modal,
    HeartIcon
  },
  methods: {
    pop() {
      this.$refs.popUp.active = true;
    }
  }
}
</script>

<style>

</style>
