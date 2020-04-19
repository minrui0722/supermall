<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
              v-for="(item,index) in cartList"
              :product="item"
              :key="index"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  import { mapGetters } from 'vuex'

  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem,
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      /*当商品列表cartList处于活跃状态时，即有商品信息时，刷新页面重新计算scrollHeight*/
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .content{
    /*导航栏的高度：44px
    *底部TabBar的高度：49px
    底部汇总bottomBar的高度：40px
    */
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>