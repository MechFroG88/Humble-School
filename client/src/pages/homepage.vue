<template>
  <div id="_homepage">
    <sidebar :data="sidebar">
      <router-view/>
    </sidebar>
    <flash-message></flash-message>
  </div>
</template>

<script>
import sidebar from '../layouts/sidebar';

export default {
  components: {
    sidebar,  
  },
  data: () => ({
    username: '',
    sidebar: [
      {
        title: '系统管理',
        list: [
          { title: '团体管理', target: { name: 'group' } },
          { title: '用户管理', target: { name: 'users' } },
        ],
      },
    ],
  }),

};
</script>

<style >

</style>
