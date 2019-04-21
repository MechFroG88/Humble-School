<template>
  <div id="_modal" class="modal" :class="[
    active ? 'active' : ''
  ]">
    <a class="modal-overlay" aria-label="Close"
    @click="active = false"/>
    <div class="modal-container">
      <div class="modal-header">
        <div class="pic"></div>
        <slot name="header"/>
        <maximize-2-icon class="custom-class enlargeButton"></maximize-2-icon>
      </div>
      <div class="modal-body"> 
        <slot name="body" class="content"/>
      </div>
      <div class="modal-footer">
        <slot name="footer"/>
      </div>
    </div>
  </div>
</template> 

<script>
import { Maximize2Icon } from 'vue-feather-icons'

export default {
  components: {
    Maximize2Icon,
  },
  props: {
    closable: {
      type: Boolean,
      default: true,
    },
    title: String,
  },
  data: () => ({
    active: false,
  }),
};
</script>

<style>

</style>