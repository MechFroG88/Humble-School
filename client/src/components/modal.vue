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
        <span class="icon-maximize-2 custom-class enlargeButton" @click="details"></span>
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
export default {
  props: {
    closable: {
      type: Boolean,
      default: true,
    },
    title: String,
  },
  methods: {
    details() {
      this.$router.push('/details');
    }
  },
  data: () => ({
    active: false,
  }),
};
</script>

<style>

</style>