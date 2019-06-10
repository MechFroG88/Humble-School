<template>
  <div id="_3d">
    <button class="btn btn-primary" style="margin:1rem" @click="pop">Pop Card</button>

    <modal ref="popUp" class="animated bounceInUp" closable :classId="`${ group.id }`" >
      <div slot="pic" class="pic" :style="`background-image: ${group.picture}`"></div> 
      
      <div slot="body">
        <div class="title">
          <div class="modal-title h4">{{ group.theme }}</div>
          <span class="chip">{{ group.society }}</span>
        </div>
      
        <div class="place">{{ group.cn_class }}</div>
        <div class="time">3pm-5pm</div>
      </div>
      <div slot="footer">
      </div>
    </modal>
  </div>
  
</template>

<script>
import modal from '@/components/modal';
import { getClass } from '@/api/class';

export default {
  
  name: 'home',
  components: {
    modal,
  },
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
  methods: {
    pop() {
      this.$refs.popUp.active = true;
      getClass(this.$route.params.id).then(({ data }) => {
          this.group = data.data[0];
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
