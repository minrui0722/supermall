<template>
  <div class="cart">
    <!--导航部分-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list></cart-list>
    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      CartList,
      CartBottomBar,
      NavBar
    },
    computed:{
      //1.使用的名称和getters中的名称一一致
      ...mapGetters(['cartLength','cartList']),
      //2.使用的名称和getters中定义的名称不一致
      /*...mapGetters({
        length:'cartLength',
        list:'cartList'
      })*/
    }

  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>