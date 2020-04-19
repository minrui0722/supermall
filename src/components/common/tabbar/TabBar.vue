<template>
  <div id="tab_bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab_bar{
    display: flex;/*采用flex布局*/
    background-color: #f6f6f6;

    /*使得tabbar固定在最下方*/
    position: fixed;
    bottom: 0;
    left: 0;/*最好写上left和right，这样可保证这个给tabbar是占据整个屏幕宽度的*/
    right: 0;

    /*设置tabbar上方的阴影，有过渡效果*/
    box-shadow: 0 -1px 1px rgba(0,0,0,.1);
  }

</style>