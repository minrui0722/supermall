<template>
  <div class="bottom-bar">
    <div class="bottom-bar-item bar-left">
      <div>
      <i class="icon service"></i>
      <span class="text">客服</span>
    </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bottom-bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
  <!--<sport-ball ref="ball" class="sport-ball"></sport-ball>-->
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods:{
      addToCart(){
        this.$emit('addToCart');
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height: 49px;
    background: #fff;
    /*固定定位*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
  }
  .bottom-bar-item{
    flex: 1;
    display: flex;/*使得block元素失效，同时使得内部的item称为flex items*/
    /*开启display:flex的时候，就不再区分块状元素还是内联元素*/
  }
  .bar-left>div{
    flex: 1;
    font-size: 14px;
  }
  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left .service{
    background-position: 0 -54px;
  }
  .bar-left .shop{
    background-position: 0 -98px;
  }
  .bar-right{
    display: flex;
    font-size: 15px;
    color: #fff;
    text-align: center;
    line-height: 49px;/*垂直居中，因为整个DetailBottomBar的高度为49px*/
  }
  .bar-right>div{
    flex: 1;
  }
  .bar-right .cart{
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy{
    background-color: #f69;
  }
  .sport-ball{
    position: absolute;
    left: 225px;
    bottom: 20px;
  }

</style>