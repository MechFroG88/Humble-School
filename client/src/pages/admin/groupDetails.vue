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
          <input class="form-input" type="text" id="cn_class" placeholder="请输入活动地点" v-model="group.cn_class">
        </div>
        <div class="form-group">
          <label class="form-label" for="en_class">地点（英）</label>
          <input class="form-input" type="text" id="en_class" placeholder="请输入活动地点" v-model="group.en_class">
        </div>
      </div>
      <div class="form-group theme">
        <label class="form-label" for="theme">主题</label>
        <input class="form-input" type="text" id="theme" placeholder="请输入活动主题" v-model="group.theme">
      </div>
      <div class="form-group details">
        <label class="form-label" for="detail">活动详情</label>
        <textarea class="form-input" id="detail" placeholder="请输入活动详情" rows="5" v-model="group.detail"></textarea>
      </div>
      <div class="form-group pic">
        <label>封面照片</label>
        <label  class="btn btn-primary" for="pic" >上传封面照片</label>
        <input  type="file" id="pic" ref="file" @change="handleFileUpload">
      </div>
     
      <div class="submit">
         <div class="btn btn-primary " @click="$refs.cancel.active = true" >提交</div>
      </div>

      <cmodal ref="cancel" :trigger="submit"></cmodal>

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
      picture: null,
      detail: ''
    },
  }),
  mounted() {
    if (this.$route.params.action == 'edit') {
      // get with id
        getClass(this.$route.params.id).then(({ data }) => {
          this.group = data.data[0];
          // console.log(this.group);
        }).catch((err) => {
          this.notification('数据读取失败！请重试！', 'error');
          console.log(err);
        });
    }
  },
  methods: {
    addClass() {
      let formData = new FormData();
      formData.append('image',this.group.picture)
      createClass(this.group).then((msg) => {
        this.$router.push('/admin/group')
        this.notification('成功添加学会', 'success');
      }).catch((err) => {
        this.notification('操作失败！请重试！', 'error');
        console.log(err);
      });
    },
    updateClass() {
      updateClass(this.group.class_id, this.group).then((msg) => {
        this.$router.push('/admin/group')
        this.notification('成功编辑学会资料','success');
      }).catch((err) => {
        this.notification('操作失败！请重试！', 'error');
        console.log(err);
      });
    },
    handleFileUpload(event) {
      this.group.picture = event.target.files[0];
    },
    submit() {
      if (this.$route.params.action == 'edit') {
        this.updateClass();
      }
      else {
        this.addClass();
      }
    }

  }

}
</script>

<style>

</style>
