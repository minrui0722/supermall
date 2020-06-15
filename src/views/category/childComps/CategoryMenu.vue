<template>
  <scroll class="wrapper">
    <div class="menu">
      <div class="menu-item"
           @click="menuItemClick(index)"
           v-for="(item,index) in menuData"
           :class="{'active':currentIndex === index}">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  export default {
    name: "CategoryMenu",
    components:{
      Scroll
    },
    props: {
      menuData: {
        /*接收父组件Category请求到的所有分类信息的数组*/
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return {
        /*记录当前被选中的menu-item*/
        currentIndex:0
      }
    },
    methods:{
      menuItemClick(index){
        /*更新当前被选中的menu-item的索引下标*/
        this.currentIndex = index
        /*向父组件发送index位置的menu-item被点击的cuurentMenu事件*/
        this.$emit('currentMenu',index)
      }
    }
  }
</script>

<style scoped>

  .wrapper{
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }

  .menu-item{
    height: 45px;
    display: flex;
    /*设置单行flex items在交叉轴上的对齐方式*/
    align-items: center;
    /*设置单行flex items在主轴上的对齐方式*/
    justify-content: center;
    background-color: #f6f6f6;
    font-size: 14px;
  }
  .active{
    border-left: 2px solid var(--color-high-text);
    background-color: #fff;
  }
</style>