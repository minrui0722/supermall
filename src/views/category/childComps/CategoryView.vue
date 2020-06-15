<template>
  <scroll class="scroll">
    <div class="category-view">
      <div class="view-item">
        <div class="item" v-for="item in this.dataViews.subcategory">
          <a :href="item.link">
            <img class="item-img" :src="item.image" alt="">
            <span class="item-text">{{item.title}}</span>
          </a>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  export default {
    name: "CategoryView",
    components:{
      Scroll
    },
    props:{
      /*接收父组件Category组件传过来的具体分类信息，要求是一个对象*/
      dataViews:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .scroll{
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }
  .category-view{
    padding: 20px 0 20px 20px;
  }
  .view-item{
    display: flex;
    flex-wrap: wrap;
    /*设置flex items在主轴上的对齐方式*/
    justify-content: space-between;
  }
  .view-item .item{
    margin-top: 10px;
    margin-right: 20px;
  }
  .view-item .item a{
    display: flex;
    flex: 1;
    /*设置flex items垂直排列*/
    flex-direction :column;
    align-items: center;
    justify-content :space-between;
    margin-right: 5px;
  }
  .view-item .item a .item-img{
    width: 50px;
    height: 50px;
  }
  .view-item .item a .item-text{
    width: 50px;
    text-align: center;
    margin-top:10px;
    font-size: 12px;
  }
</style>