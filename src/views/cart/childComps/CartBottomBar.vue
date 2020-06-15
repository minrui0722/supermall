<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
              class="check-all"
              :is-checked="isSelectedAll"
              @click.native="checkAllClick"
      />
      <span>全选</span>
    </div>
    <div class="price">
      合计：￥{{totalPrice}}
    </div>
    <div class="button">
      <div v-if="!seleteDelete" class="calculate" @click="calcClick">去计算({{checkLength}})</div>
      <div v-else class="delete" @click="delClick">删除</div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters,mapMutations} from 'vuex'

  export default {
    name: "CartBottomBar",
    props:{
      seleteDelete:{
        type:Boolean,
        default:false
      }
    },
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList','totalPrice','checkLength','isSelectedAll']),
    },
    methods:{
      ...mapMutations({
        deleteInfo:'deleteInfo'
      }),
      checkAllClick(){
        /*注意：这里必须要定义一个全局变量all来保存当前this.isSelectedAll的值，
        * 不能直接在简化代码中取反
        * 因为全选按钮的状态和checked之间会相互影响，就会出现乱七八糟的，有时可以有时不可以*/
        let isAll = this.isSelectedAll;
        this.cartList.forEach(item => item.checked=!isAll)
        /*判断有没有没有被选中的，如果有则点击一次isChecked=true
        * 否则（全部都被选中），则点击一次isChecked=false
        * */
        /*if(this.isSelectedAll){//全选中
          this.cartList.forEach(item => item.checked=false)
        }else {//全部不选中或有某些没有被选中
          this.cartList.forEach(item => item.checked=true)
        }*/
      },
      calcClick(){
        //console.log(this.cartList.length);
        if(this.cartList.length === 0){
          this.$toast.show('您的购物车为空')
        }else if(!this.cartList.find(item => item.checked))
            //当购物车内没有商品时，提示选择商品之后才能结算
          this.$toast.show('请选择购买的商品');
      },
      delClick(){
        if(this.cartList.length === 0){
          this.$toast.show('您的购物车为空')
        }else{
          this.deleteInfo()
        }
      },
    }
  }
</script>

<style scoped>
  .bottom-bar{
    /*position: relative;*/
    display: flex;
    height: 40px;
    line-height: 40px;/*整体内容垂直居中*/
    font-size: 14px;

    background-color: #f2f2f2;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-all{
    width: 20px;
    height: 20px;
    line-height: 20px;/*使复选框中的图片√垂直居中显示*/
    margin-right: 5px;
  }
  .price{
    margin-left: 30px;
    flex: 1;
  }


  .button{
    display: flex;
    align-items: center;
    text-align: center;
  }
  .calculate{
    margin-right: 10px;
    width: 100px;
    background-color: var(--color-tint);
    color: #fff;

    border-radius: 20px;
  }
  .delete{
    width: 60px;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
    border-radius: 20px;
    background-color: #fff;
    color: var(--color-tint);
    border: 1px solid var(--color-tint);
  }
</style>