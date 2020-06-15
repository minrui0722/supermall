<template>
  <div class="profile">
    <nav-bar class="profile-nav-bar">
      <div slot="center">我的档案</div>
    </nav-bar>
    <!--用户信息-->
    <user-info/>
    <!--其他信息-->
    <div class="order-list">
      <div class="order-list-item">
        <img src="~/assets/img/profile/message.svg" alt="">
        <div class="item-message">我的消息</div>
      </div>
      <div class="order-list-item">
        <img src="~/assets/img/profile/pointer.svg" alt="">
        <div class="item-message">积分商城</div>
      </div>
      <div class="order-list-item">
        <img src="~/assets/img/profile/vip.svg" alt="">
        <div class="item-message">会员卡</div>
      </div>
    </div>
    <div class="order-list">
      <div class="order-list-item">
        <img src="~/assets/img/profile/cart.svg" alt="">
        <div class="item-message">我的购物车</div>
      </div>
      <div class="order-list-item">
        <img src="~/assets/img/profile/shopping.svg" alt="">
        <div class="item-message">下载购物APP</div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import UserInfo from "./childComps/UserInfo";
  export default {
    name: "Profile",
    components:{
      NavBar,
      UserInfo
    }
  }
</script>

<style scoped>
  .profile-nav-bar{
    background-color:  var(--color-tint);
    color: #fff;
  }

  .order-list:not(:last-of-type){
    display: flex;
    flex-direction: column;
    border-bottom: 10px solid #f2f2f2;
  }
  .order-list-item{
    display: flex;
    padding: 12px 15px;
    border-bottom: 1px solid #f2f2f2;
  }
  .order-list-item:last-of-type{
    border-bottom: none;
  }
  .order-list-item img{
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
</style>