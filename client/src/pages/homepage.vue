<template>
  <div id="_homepage">
    <flash-message class="flash"></flash-message>
    <sidebar :data="sidebar">      
      <router-view/>
    </sidebar>
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

<style lang="scss">
#_homepage{
  .flash {
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translateX(-50%);
  max-width: 60%;
}
}


</style>

