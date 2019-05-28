<template>
  <div id="_login">
    <div class="form-group">
      <div class="title">登入</div>
      <div class="input-group">
        <div class="username" >
          <label class="form-label" for="username">用户名</label>
          <input class="form-input " type="text" id="username" name="用户名"
          placeholder="请输入用户名" v-model="username">
        </div>    
        <div class="password">
          <label class="form-label" for="password">密码</label>
          <input class="form-input " type="password" id="password" name="密码"
          placeholder="请输入密码" v-model="password">
        </div>
      </div>
      
      <button class="btn btn-primary login" @click="$router.push('/admin')">登入</button>
    </div>
   
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
