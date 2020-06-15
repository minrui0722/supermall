<template>
  <div class="cart">
    <!--导航部分-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
      <div slot="right" @click="toggle">
        <div class="manager" v-if="!selectDelete">管理</div>
        <div class="manager" v-else>完成</div>
      </div>
    </nav-bar>
    <!--商品列表-->
    <cart-list></cart-list>
    <!--购物车为空-->
    <cart-empty class="cart-empty" v-show="!cartList.length"/>
    <!--底部汇总-->
    <cart-bottom-bar :selete-delete="selectDelete"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import CartEmpty from "./childComps/CartEmpty";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      CartList,
      CartBottomBar,
      NavBar,
      CartEmpty
    },
    computed:{
      //1.使用的名称和getters中的名称一一致
      ...mapGetters(['cartLength','cartList']),
      //2.使用的名称和getters中定义的名称不一致
      /*...mapGetters({
        length:'cartLength',
        list:'cartList'
      })*/
    },
    data(){
      return{
        selectDelete:false
      }
    },
    methods:{
      toggle(){
        this.selectDelete = !this.selectDelete
      }
    }

  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .manager{
    font-size: 14px;
    letter-spacing: 2px;
  }
  .cart-empty{
    position: absolute;
    top: 44px;
    width: 100%;
  }
</style>