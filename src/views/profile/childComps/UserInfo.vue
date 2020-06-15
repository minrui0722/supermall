<template>
  <div class="user-info">
    <div class="user-info-top">
      <div class="user-img">
        <img src="~/assets/img/profile/avatar.svg" alt="">
      </div>
      <div class="user-detail">
        <div class="detail-top">登陆/注册</div>
        <div class="detail-bottom">
          <div class="phone-icon">
            <img src="~/assets/img/profile/phone.svg" alt="">
          </div>
          <div class="phone-text">暂无绑定手机号</div>
        </div>
      </div>
      <div class="arrow">
        <img src="~/assets/img/common/arrow-left.svg" alt="">
      </div>
    </div>
    <div class="user-bottom">
      <div class="count">
        <div class="count-item">
          <div class="balance">
            <span class="big">{{balance | formatPrice}}</span>
            <span>元</span>
          </div>
          <div class="count-text">我的余额</div>
        </div>
        <div class="count-item">
          <div class="coupon">
            <span class="big">{{coupon}}</span>
            <span>个</span>
          </div>
          <div class="count-text">我的优惠券</div>
        </div>
        <div class="count-item">
          <div class="integral">
            <span class="big">{{integral}}</span>
            <span>分</span>
          </div>
          <div class="count-text">我的积分</div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "UserInfo.vue",
    data(){
      return {
        balance: 0.00,
        coupon: 0,
        integral: 0
      }
    },
    filters:{
      /*将余额保存为两位数*/
      formatPrice(price){
        return price.toFixed(2)
      }
    }
  }
</script>

<style scoped>
  .user-info-top{
    display: flex;
    /*设置内边距*/
    padding: 15px;
    background-color: var(--color-tint);
    color: #fff;
    /*设置单行flex items在交叉轴上的对齐方式，即垂直居中*/
    align-items: center;
  }

  .user-img{
    display: flex;
    text-align: center;
    margin-right: 10px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
  }
  .user-img img{
    width: 60px;
    height: 60px;
  }

  .user-detail{
    /*user-info-top的flex items*/
    flex: 1;
    /*设置主轴的方向，垂直从上到下*/
    flex-direction: column;
    /*align-content: space-around;*/
  }
  .detail-bottom{
    display: flex;
    margin-top: 5px;
    /*设置单行flex items在交叉轴上的对齐方式*/
    align-items: center;
  }
  .phone-icon img{
    /*设置手机图标的大小*/
    width: 25px;
    height: 25px;
    margin-left: -4px;
  }
  .phone-text{
    font-size: 13px;
  }

  .arrow img{
    /*设置箭头图标的大小*/
    width: 20px;
    height: 20px;
  }
/*=============余额、优惠、积分部分==========*/
  .user-bottom{
    border-bottom: 10px solid #f2f2f2;
  }
  .count{
    display: flex;
    text-align: center;
  }
  .count-item{
    flex: 1;
    padding: 18px;
    border-right: 1px solid #f2f2f2;
  }
  .count-item:last-of-type{
    border-right: none;
  }
  .big{
    font-size: 26px;
    font-weight: bold;
    color: var(--color-high-text);
  }
  .count-text{
    font-size: 14px;
    margin-top: 5px;
  }
</style>