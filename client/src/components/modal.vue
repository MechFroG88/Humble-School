<template>
  <div class="card" id="_card" v-if="active">
    <div class="card-image">
      <slot name="image"/>
      <span name="icon" class="icon-maximize-2 custom-class enlargeButton" @click="details"></span>
    </div>
    <div class="card-header">
      <slot name="header"/>
    </div>
    <div class="card-body">
      <slot name="body" class="content"/>
    </div>
    <div class="card-footer">
      <slot name="footer"/>
    </div>
  </div>
</template> 

<script>


export default {
  props: {
    image: String,
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