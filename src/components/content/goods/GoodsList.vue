<template>
  <div class="goods">
    <!--直接将从父组件Home.vue中请求到的数据遍历成一个一个的小组件
    传递给子组件GoodsListItem.vue，并通过每个小组件展示 商品信息
    -->
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props:{
      goods: {
        type:Array,
        default(){
          return[]
        }
      }
    }
  }
</script>

<style scoped>
/*设置一个大组件中每行显示2个小组件*/
  .goods{
    display: flex;
    /*这一步需要给小组件设定一个宽度，否则会将所有的小组件全部塞到一行显示*/
    /*wrap即表示根据小组件的宽度来决定一行显示多少个小组件
    *如果是nowrap：则会把所有的小组件全部往一行塞
    */
    flex-wrap: wrap;
    /*设置每行的小组件均等分*/
    justify-content: space-around;
    /*注意：这里内部的均等分是指两个小组件之间的距离是一样的
    *但是屏幕两边的距离之和 = 两个小组件之间的距离
    */
    padding: 0 2px;/*对两边屏幕和小组件之间的距离在均分的前提下做一个微调，使得距离和中间距离看起来更加一致*/
  }
</style>