<template>
  <div id="_details" >
    <div class="pic" :style="`background-image: ${group.picture}`"></div>
    <span class="icon-x custom-class closeButton" @click="close"></span>
    <div class="container">
      <div class="title">
        <div class="modal-title h4">{{ group.theme }}</div>
        <span class="chip">{{ group.society }}</span>
      </div>
      <div class="place">{{ group.cn_class }}</div>
      <div class="time">3pm-5pm</div>
      <div class="content">{{ group.details }}</div>
    </div>
    

  </div>
</template>

<script>

import { getClass } from '@/api/class';
export default {
  data: () => ({
    group: {
      cn_class: '',
      en_class: '',
      theme: '',
      society: '',
      picture: '',
      detail: ''
    }
  }),
  mounted() {
    getClass(this.$route.params.id).then(({ data }) => {
    this.group = data.data[0];
    }).catch((err) => {
      this.notification('数据读取失败！请重试！', 'error');
      console.log(err);
    });
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
