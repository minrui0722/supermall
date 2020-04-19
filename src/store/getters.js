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
}