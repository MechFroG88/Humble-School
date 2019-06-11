<template>
  <div id="_modal" class="modal" :class="[
    active ? 'active' : ''
  ]">
    <!-- <a class="modal-overlay" aria-label="Close"
    @click="active = false"/> -->
    <div class="modal-container">
      <div class="modal-header">
        <slot name="pic" class="pic"/>
        <slot name="header"/>
        <span name="icon" class="icon-maximize-2 custom-class enlargeButton" @click="details"></span>
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
    classId: String,
    closable: {
      type: Boolean,
      default: true,
    },
    title: String,
  },
  methods: {
    details() {
      this.$router.push(`/details/${this.classId}`);
    }
  },
  data: () => ({
    active: false,
  }),
};
</script>

<style>

</style>