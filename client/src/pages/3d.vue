<template>
  <div id="3d">
    <button class="btn btn-primary" @click="pop">Pop Card</button>

    <modal ref="popUp" title="VR game" closable>
      <div slot="body">
        
      </div>
    </modal>
  </div>
  
</template>

<script>
import modal from '@/components/modal';

export default {
  components: {
    modal,
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
