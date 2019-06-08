<template>
  <div id="_group">
    <div class="btn btn-primary addBtn"
    style="margin-bottom: 3.8rem;"
    @click="open">新增</div>

    <groupTable class="table" title ref="table" :columns="group" :tableData="data" width="50" navbar="搜寻学会名称">
      <template slot="title">团体管理</template>
      <template slot="action" slot-scope="{ data }" class="btn btn-primary addBtn">
        <div class="btn btn-primary addBtn" @click="openCmodal(data.id)">删除</div>
      </template>
    </groupTable>

    <modal class="modal" ref="add" title="添加团体">
      <div slot="body">
        <form ref="form">
          <div class="form-group">
            <label class="form-label" for="username">团体名称</label>
            <input class="form-input"  type="text" id="groupName" name="用户名"
            placeholder="团体名称" v-model="groupName">
          </div>
        </form>
      </div>

      <div slot="footer">
        <div class="button-group">
          <div class="btn btn-lg mr-2 cancel" @click="$refs.add.active = false">取消</div>
          <div class="btn btn-primary btn-lg confirm" :class="{'loading loading-lg': loading}"
          >确定</div>
        </div>
      </div>
    </modal>

     <cmodal ref="cancel" :trigger="removeClass"></cmodal>

  </div>
</template>

<script>
import groupTable from '@/components/tables';
import modal from '@/components/popup';
import cmodal from '@/components/confirm';
import { group_column } from '@/api/tableColumns';
import { getAllClass, deleteClass } from '@/api/class';

export default {
  components: {
    groupTable,
    cmodal,
    modal,
  },
  data: () => ({
    group: group_column,
    loading: false,
    groupName: '',
    data: [],
    deleteId: '',
  }),
   mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      getAllClass().then(({ data }) => {
        this.data = data.data;
        this.$refs.table.is_loading = false;
      }).catch((err) => {
        this.notification('数据读取失败！请重试！', 'error');
        console.log(err);
      });
    },
    removeClass() {
      deleteClass(this.deleteId).then((msg) => {
        this.$refs.cancel.active = false;
        this.notification('成功删除学会', 'success');
        this.getAll();
      }).catch((err) => {
        this.notification('操作失败！请重试！', 'error');
        console.log(err);
      })
    },
    open() {
    this.$nextTick(() => {
      this.$router.push('/admin/groupDetails');
      })
    },
  }


}
</script>

<style>

</style>
