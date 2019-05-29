<template>
  <div id="_sidebar">
    <div class="side col-2">
      <div style="width: 100%; display: flex; flex-direction: column;">
        <span class="title h2">百年校庆</span>
        <div v-for="c in data" :key="c.title" class="section">
          <span class="category_title">{{c.title}}</span>
          <ul>
            <li v-for="item in c.list" :key="item.title"
            :class="{'active': active == item.target.name}" @click="active = item.target.name">
              <router-link :to="item.target" tag="div">
                {{item.title}}
                <span class="link_extender"></span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <div class="user c-hand">
          <div class="popover popover-top">
            <i class="icon icon-user mr-2"></i>
          </div>
        </div>
        <div>
          <i class="icon icon-log-out ml-2 c-hand"
          @click="logout()"></i>
        </div>
      </div>
    </div>
    <div class="main col-10">
      <slot/>
    </div>
  </div>
</template>

<script>
import { userLogout} from '@/api/user';

export default {
  props: {
    data: Array,
  },
  data: () => ({
    active: '',
  }),
  methods: {
    logout() {
      userLogout().then(() => {
        this.$router.push('/login');
      }).catch((err) => {
        console.log('Error with logging out');
        console.log(err);
      });
    },
  },
  methods: {
    logout() {
      this.$router.push('/login');
      userLogout().catch((err) => {
        console.log('Error with logging out');
        console.log(err);
      });
    },
  },
};
</script>

<style>

</style>
