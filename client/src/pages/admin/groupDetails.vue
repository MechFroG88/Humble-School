<template>
  <div id="_groupDetails">
    <div class="column col-9">
      <div class="title">学会详情</div>
      <div class="groupName">
        <label class="form-label" for="society">学会名称</label>
        <input class="form-input" type="text" id="society" placeholder="请输入学会名称" v-model="group.society">
      </div>
      <div class="classGroup">
        <div class="form-group">
          <label class="form-label" for="cn_class">地点（华）</label>
          <input class="form-input" type="text" id="cn_class" placeholder="请输入活动地点" v-model="group.cn_name">
        </div>
        <div class="form-group">
          <label class="form-label" for="en_class">地点（英）</label>
          <input class="form-input" type="text" id="en_class" placeholder="请输入活动地点" v-model="group.en_name">
        </div>
      </div>
      <div class="form-group theme">
        <label class="form-label" for="theme">主题</label>
        <input class="form-input" type="text" id="theme" placeholder="请输入活动主题" v-model="group.theme">
      </div>
      <div class="form-group details">
        <label class="form-label" for="details">活动详情</label>
        <textarea class="form-input" id="details" placeholder="请输入活动详情" rows="5" v-model="group.details"></textarea>
      </div>
      <div class="form-group pic">
        <label>封面照片</label>
        <label  class="btn btn-primary" for="pic" >上传封面照片</label>
        <input  type="file" id="pic" >
      </div>
     
      <div class="submit">
         <div class="btn btn-primary " @click="openCmodal" >提交</div>
      </div>

      <cmodal ref="cancel" :trigger="addClass"></cmodal>

    </div>
  </div>
  
</template>

<script>

import { createClass, getClass, updateClass } from '@/api/class';
import cmodal from '@/components/confirm';

export default {
  components: { 
    cmodal
  },
  data: () => ({
    group: {
      cn_class: '',
      en_class: '',
      theme: '',
      society: '',
      picture: '',
      details: ''
    }
  }),
  mounted() {
    // this.getAll();
  },
  methods: {
    getAll() {
      getClass()
    },
    addClass() {
      this.loading = true;
      createClass(this.group).then((msg) => {
        this.$router.push('/admin/group')
        this.notification('成功添加学会', 'success');
      }).catch((err) => {
        this.notification('操作失败！请重试！', 'error');
        console.log(err);
      });
    },
     openCmodal() {
      this.$refs.cancel.active = true;
    },
  }

}
</script>

<style>

</style>
