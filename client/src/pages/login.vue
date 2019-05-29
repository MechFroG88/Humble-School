<template>
  <div id="_login">
    <div class="form-group">
      <div class="title">登入</div>
      <div class="input-group">
        <div class="username" >
          <label class="form-label" for="username">用户名</label>
          <input class="form-input " type="text" id="username" name="用户名"
          placeholder="请输入用户名" v-model="user.username">
        </div>    
        <div class="password">
          <label class="form-label" for="password">密码</label>
          <input class="form-input " type="password" id="password" name="密码"
          placeholder="请输入密码" v-model="user.password">
        </div>
      </div>
      
      <button class="btn btn-primary login" @click="login">登入</button>
    </div>
   
  </div>
</template>

<script>
import { userLogin } from '@/api/user';

export default {
  data: () => ({
    user: {
      username: '',
      password: ''      
    }
  }),
  methods: {
    login() {
      userLogin(this.user).then(() => {
        this.$router.push('/admin');
      }).catch((err) => {
        // this.notification(' 登入失败 ', 'error');
        console.log(err);
      })
    }
    
  }
}
</script>

<style>

</style>
