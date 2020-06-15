/*getters就相当于组件中的computed计算属性*/
export default {
  cartLength(state) {
    return state.cartList.reduce((preValue,item)=>{
      return preValue+item.count;
    },0)
  },
  cartList(state){
    return state.cartList;
  },
  totalPrice(state){
    return state.cartList.filter(item => {
      return item.checked;
    }).reduce((preValue,item) => {
      return preValue + item.price*item.count;
    },0).toFixed(2);
  },
  checkLength(state){
    //获取选中商品信息的数量
    return state.cartList.filter(item => item.checked).length;
  },
  isSelectedAll(state){
    //====判断cartList中只要有一个不选中，则全选按钮就不选中
    /*解决没有任何商品的时候，全选按钮不被选中*/
    /*当this.$store.state.cartList.find(item => !item.checked)没有值得时候返回undefined
    * 而！undefined=true*/
    if(state.cartList.length===0) return false;
    return !state.cartList.find(item => !item.checked);
  },
}