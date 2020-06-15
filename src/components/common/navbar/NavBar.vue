<template>
  <!--对三个插槽做一个简单的布局，为了保证效果，一般将slot用div包起来，对div进行布局-->
  <!--最好使用具名插槽，到时候才能够明确替换哪个插槽-->
  <div class="nav-bar"><!--首先组件不惜要有一个根-->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    /*前提是必须要有内容line-height才会撑起来*/
    line-height: 44px;/*直接使用line-height可以直接撑起整个高度，就不用再写height了，前提是必须要有内容，否则无法撑起高度*/
    text-align: center;
    box-shadow: 0 1px 3px rgba(0,0,0,.05);/*设置下方阴影*/
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex: 1;/*表示将剩余的宽度全部占据，因为一共只有3个插槽，且有两slot个宽度已固定，最后一个采用flex：1就会占据剩余的所有宽度*/
  }
</style>