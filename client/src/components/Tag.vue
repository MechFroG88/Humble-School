<template>
  <div class="tag" :style="{'top': `${top}px`, 'left': `${left}px`}">
    <div class="tag-container">
      <div class="text" v-text="text" @click="$emit('zoom', index)" @mouseleave="$emit('uncolor', index)" @mouseover="$emit('color', index)"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    top: Number,
    left: Number,
    text: String
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+SC&display=swap');
*{
  font-family: 'Noto Sans SC', sans-serif;
}
@keyframes expand {
  from {height: 0;}
  to{height: 70px;}
}
@keyframes expand2 {
  from {opacity: 0;}
  to{opacity: 0.8;}
}
.tag{
  position: absolute;
  width: 0;
  height: 0;
  .tag-container{
    position: relative;
    .text{
      position: absolute;
      top: -90px;
      left: 60px;
      background: black;
      color: white;
      padding: 4px 6px;
      text-align: center;
      width: 80px;
      z-index: 999;
      opacity: .8;
      font-size: 12px;
      animation-name: expand2;
      animation-duration: .5s;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
      cursor: pointer;
      &:hover{
        background: #db2d43;
        &::before{
          background: #db2d43;
        }
      }
      &::before{
        position: absolute;
        content: "";
        z-index: 500;
        top: 25px;
        left: -1px;
        background: black;
        width: .1rem;
        transform: rotate(45deg);
        transform-origin: left top;
        animation-name: expand;
        animation-duration: .5s;
        animation-delay: .5s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
    }
  }
}
</style>
