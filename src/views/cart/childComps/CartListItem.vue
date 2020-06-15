<template>
  <div class="cart-list-item">
    <div class="item-select" >
      <CheckButton :isChecked="product.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{product.price}}</div>
        <!--<div class="item-count right">x{{product.count}}</div>-->
        <div class="item-count right">
          <button @click="decrease">-</button>
          <span>{{product.count}}</span>
          <button @click="increase">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartListItem",
    components:{
      CheckButton
    },
    props:{
      product:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      checkClick(){
        this.$store.commit('checkClick',this.product);
      },
      decrease(){
      },
      increase(){
      }
    }
  }
</script>

<style scoped>
  .cart-list-item{
    width: 100%;
    display: flex;
    /*设置字体大小为0，位的是使整个checkbox整体是圆的*/
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-select{
    width: 20px;
    display: flex;
    /*flex items分别在主轴和交叉轴上的对齐方式*/
    justify-content: center;
    align-items: center;
  }
  .item-title,.item-desc{
    /*设置文字信息当一行显示不下时，以省略号显示*/
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img{
    padding: 5px;
  }
  .item-img img{
    width: 80px;
    height: 100px;
    /*display: block;*/
    border-radius: 5px;
  }
  .item-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    /*父元素开启相对定位，后面的info-bottom需要定位*/
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .info-bottom .item-price{
    color: orangered;
  }
  .item-count{
    width: 80px;
    border: 1px solid #ebebeb;
    display: flex;
    text-align: center;
    align-items: center;
  }
  .item-count button{
    width: 20px;
    background-color: #fff;
    border: 0;
  }
  .item-count span{
    flex: 1;
    border-right: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
    font-size: 12px;
  }
</style>