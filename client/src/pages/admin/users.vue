<template>
  <div id="_users">
    <div class="btn btn-primary addBtn"
    style="margin-bottom: 3.8rem;"
    @click="open">新增</div>

    <userTable class="table" title ref="table" :columns="users" :tableData="data" width="100">
      <template slot="title">用户管理</template>
      <template slot="action" slot-scope="{ data }" class="btn btn-primary addBtn">
        <div class="btn btn-primary deleteBtn" @click="openCmodal(data.user_id)">删除</div>
      </template>
    </userTable>

    <modal class="modal" ref="add" title="添加用户">
      <div slot="body">
        <form ref="form">
          <div class="form-group">
            <label class="form-label" for="username">用户名</label>
            <input class="form-input"  type="text" id="username" name="用户名"
            placeholder="用户名" v-model="user.username">
          </div>
          <div class="form-group">
            <label class="form-label" for="username">密码</label>
            <input class="form-input"  type="password" id="password" name="密码" placeholder="密码" 
            v-model="user.password" >
          </div>
        </form>
      </div>

      <div slot="footer">
        <div class="button-group">
          <div class="btn btn-lg mr-2 cancel" @click="$refs.add.active = false">取消</div>
          <div class="btn btn-primary btn-lg confirm" :class="{'loading loading-lg': loading}"
          @click="addUser">确定</div>
        </div>
      </div>
    </modal>

    <cmodal ref="cancel" :trigger="removeUser"></cmodal>
  </div>
</template>

<script>
import { getAllUsers, createUser, deleteUser } from '@/api/user';

import userTable from '@/components/tables';
import modal from '@/components/popup';
import cmodal from '@/components/confirm';
import { users_column } from '@/api/tableColumns';

export default {
  components: {
    userTable,
    modal,
    cmodal,
  },
  data: () => ({
    users: users_column,
    loading: false,
    data: [],
    user: {
      username: '',
      password: '',
    },
    deleteId: '',
  }),
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      getAllUsers().then(({ data }) => {
        this.data = data.data;
        console.log(data);
        this.$refs.table.is_loading = false;
      }).catch((err) => {
        this.notification('数据读取失败！请重试！', 'error');
        if (err.response.status === 401) {
          this.$router.push('/model');
        }
        console.log(err);
      });
    },
    open() {
      this.$nextTick(() => {
        this.$refs.form.reset();
        this.$refs.add.active = true;
      })
    },
    addUser() {
      this.loading = true;
      createUser(this.user).then((msg) => {
        this.$refs.add.active = false;
        this.loading = false;
        this.notification('成功添加用户', 'success');
        this.getAll();
      }).catch((err) => {
        this.loading = false;
        this.notification('操作失败！请重试！', 'error');
        console.log(err);
      });
    },
    openCmodal(id) {
      this.deleteId = id;
      this.$refs.cancel.active = true;
    },
    removeUser() {
      deleteUser(this.deleteId).then((msg) => {
        this.$refs.cancel.active = false;
        this.notification('成功删除用户', 'success');
        this.getAll();
      }).catch((err) => {
        this.notification('操作失败！请重试！', 'error');
        console.log(err);
      })
    }
  },
};
</script>

<style>

</style>
