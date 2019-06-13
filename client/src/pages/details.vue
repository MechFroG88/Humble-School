<template>
  <div id="_details" >
    <!-- 国字楼 //-->
        <img src="../static/guozilou.jpeg" class="pic" v-if="group.class_id <= 67">
        <!-- 学生楼 //-->
        <img src="../static/xueshenglou.jpeg" class="pic" v-else-if="group.class_id <= 93 && group.class_id > 67">
        <!-- 食堂大楼，商科大楼 -->
        <img src="../static/shitangdalou.jpeg" class="pic" v-else-if="group.class_id <= 126 && group.class_id > 93">
        <!-- 新楼 -->
        <img src="../static/xinlou.jpeg" class="pic" v-else-if="group.class_id <= 147 && group.class_id > 126">
        <!-- 工艺喽 -->
        <img src="../static/gongyilou.jpeg" class="pic" v-else-if="group.class_id <= 157 && group.class_id > 147">
        <!-- 新场 //-->
        <img src="../static/xinchang.jpeg" class="pic" v-else-if="group.class_id <= 164 && group.class_id > 157">
        <!-- 中华广场 -->
        <img src="../static/guangchang.jpeg" class="pic" v-else-if="group.class_id == 165">
    <span class="icon-x custom-class closeButton" @click="close"></span>
    <div class="container">
      <div class="title">
        <div class="modal-title h4">{{ group.theme}}</div>
        <span class="chip">{{ group.society }}</span>
      </div>
      <div class="place">{{ group.cn_name }}</div>
      <div class="place">{{ group.en_name }}</div>
      
      <div class="content">{{ group.detail }}</div>
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
      detail: '',
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
      this.$router.push('/model')
    }
  }
}
</script>

<style>

</style>
