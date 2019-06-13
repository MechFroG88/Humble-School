<template>
  <div id="_3d">
    <button class="btn btn-primary" style="margin:1rem" @click="pop()">Pop Card</button>

    <!-- <modal ref="popUp" class="animated bounceInUp card"  :classId="`${ group.id }`" :image="url" >
      <div slot="image">
        <img src="../static/card.jpg" class="img-responsive">
      </div>
      <div slot="header">
        <div class="title">
          <div class="modal-title h4">{{ group.theme }}</div>
          <span class="chip">{{ group.society }}</span>
        </div>
      </div>
      <div slot="body">
        
      
        <div class="place">{{ group.cn_class }}</div>
        <div class="place">{{ group.en_class }}</div>
        
      </div>
      <div slot="footer">
      </div>
    </modal> -->

    <card ref="popUp" class="animated bounceInUp card"  :classId="`${ group.id }`" :image="url" >
      <div slot="image">
        <!-- 国字楼 -->
        <img src="../static/guozilou.jpeg" class="img-responsive" v-if="classId <= 67">
        <!-- 学生楼 -->
        <img src="../static/xueshenglou.jpeg" class="img-responsive" v-else-if="classId <= 93">
        <!-- 食堂大楼，商科大楼 -->
        <img src="../static/card.jpg" class="img-responsive" v-else-if="classId <= 126">
        <!-- 新楼 -->
        <img src="../static/card.jpg" class="img-responsive" v-else-if="classId <= 147">
        <!-- 工艺喽 -->
        <img src="../static/card.jpg" class="img-responsive" v-else-if="classId <= 157">
        <!-- 新场 -->
        <img src="../static/card.jpg" class="img-responsive" v-else-if="classId <= 164">
        <!-- 中华广场 -->
        <img src="../static/card.jpg" class="img-responsive" v-else-if="classId == 165">
        
      </div>
      <div slot="header">
        <div class="title">
          <div class="modal-title h4">十万个为什么</div>
          <span class="chip">华文学会</span>
        </div>
      </div>
      <div slot="body">
        <div class="place">初一忠</div>
        <div class="place">1zhong</div>
      </div>
      <div slot="footer">
      </div>
    </card>

  </div>
  
</template>

<script>
import card from '@/components/modal';
import { getClass } from '@/api/class';

export default {
  
  name: 'home',
  components: {
    card,
  },
  data: () => ({
    url: '',
    group: {
      cn_class: '',
      en_class: '',
      theme: '',
      society: '',
      picture: '',
      detail: ''
    },
    classId: 3,
  }),
  methods: {
    pop(id) {
      this.$refs.popUp.active = true;
      this.url="../static/card.jpg";
      getClass(id).then(({ data }) => {
          this.group = data.data[0];
          this.url="../static/card.jpg";
        }).catch((err) => {
          this.notification('数据读取失败！请重试！', 'error');
          console.log(err);
        });
    },
    like() {
      this.liked =! this.liked;
    }
  }
};
</script>

<style>

</style>
