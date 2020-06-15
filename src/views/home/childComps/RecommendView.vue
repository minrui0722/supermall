<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a><!--由于推荐中的图片都是可点击的，所以外层最好包裹一个a-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  /*使得所有的recommend-item都能均等分显示*/
  .recommend{
    display: flex;
    width: 100%;

    text-align: center;/*文字图片居中显示*/
    font-size: 12px;
    /*设置上下边距*/
    padding: 10px 0 20px;

    /*设置底部样式*/
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;/*设置图片和文字之间的距离*/
  }
</style>