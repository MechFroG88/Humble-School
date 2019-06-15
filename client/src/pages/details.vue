<template>
  <div id="_details" >
    <div class="detailsContainer">
      <!-- 国字楼 //-->
      <img src="../static/guozilou.jpeg" class="pic" v-if="group.class_id <= 67">
      <!-- 学生楼 //-->
      <img src="../static/xueshenglou.jpeg" class="pic" v-else-if="group.class_id <= 93 ">
      <!-- 食堂大楼，商科大楼 -->
      <img src="../static/shitangdalou.jpeg" class="pic" v-else-if="group.class_id <= 126 ">
      <!-- 新楼 -->
      <img src="../static/xinlou1.jpeg" class="pic" v-else-if="group.class_id <= 147 ">
      <!-- 工艺喽 -->
      <img src="../static/gongyilou.jpeg" class="pic" v-else-if="group.class_id <= 157 ">
      <!-- 新场 //-->
      <img src="../static/xinchang.jpeg" class="pic" v-else-if="group.class_id <= 164 ">
      <!-- 中华广场 -->
      <img src="../static/guangchang.jpeg" class="pic" v-else-if="group.class_id == 165">
      <span class="icon-x custom-class closeButton" @click="close"></span>
      <!-- <div class="container"> -->
      <!-- <div class="title">
        <div class="modal-title h2">十万个为什么</div>
        <span class="chip">华文学会</span>
      </div>
      <div class="place">初一忠</div>
      <div class="place">1zhong</div>
      <div class="content">   路与根先回是快总关她花，指作统严维建建深清候相，小红I有一容上想系。 龙内白为信位两转调全离交，象经东根2代规效般。

      走压史公结不，型E强。 维而七选四于进提带验间北，实子构是区低专要来，接影具G值们非八要奔。

      专向难油认八历主等别书史用构队直，各状经消装北8弦体盯史给极。</div>
      </div> -->
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
      class_id: 147,
    }
  }),
  mounted() {
    getClass(this.$route.params.id).then(({ data }) => {
    this.group = data.data[0];
    }).catch((err) => {
      this.notification('数据读取失败！请重试！', 'error');
      if (err.response.status === 401) {
          this.$router.push('/userManual');
        }
      console.log(err);
    });
  },
  
  methods: {
    close() {
      th
      this.$router.push('/model1')
    }
  }
}
</script>

<style>

</style>
