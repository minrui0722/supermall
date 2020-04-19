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
    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return this.$store.state.cartList.filter(item => {
          return item.checked;
        }).reduce((preValue,item) => {
          return preValue + item.price*item.count;
        },0).toFixed(2);
      },
      checkLength(){
        //获取选中商品信息的数量
        return this.$store.state.cartList.filter(item => item.checked).length;
      },
      isSelectedAll(){
        //====判断cartList中只要有一个不选中，则全选按钮就不选中
        /*解决没有任何商品的时候，全选按钮不被选中*/
        /*当this.$store.state.cartList.find(item => !item.checked)没有值得时候返回undefined
        * 而！undefined=true*/
        if(this.$store.state.cartList.length===0) return false;
        return !this.$store.state.cartList.find(item => !item.checked);
      }
    },
    methods:{
      checkAllClick(){
        /*注意：这里必须要定义一个全局变量all来保存当前this.isSelectedAll的值，
        * 不能直接在简化代码中取反
        * 因为全选按钮的状态和checked之间会相互影响，就会出现乱七八糟的，有时可以有时不可以*/
        let all=this.isSelectedAll;
        this.cartList.forEach(item => item.checked = !all);
        /*判断有没有没有被选中的，如果有则点击一次isChecked=true
        * 否则（全部都被选中），则点击一次isChecked=false
        * */
        /*if(this.isSelectedAll){//全选中
          this.cartList.forEach(item => item.checked=false)
        }else {//全部不选中或有某些没有被选中
          this.cartList.forEach(item => item.checked=true)
        }*/
      }
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

    background-color: #eee;
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
  .calculate{
    width: 100px;
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
  }
</style>