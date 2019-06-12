<template>
  <div id="_3d">
    <button class="btn btn-primary" style="margin:1rem" @click="pop(3)">Pop Card</button>

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
        <img src="../static/card.jpg" class="img-responsive" v-if="classId == 3">
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
