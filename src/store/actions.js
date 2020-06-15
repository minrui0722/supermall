export default {
  addCart(context,payload){
    return new Promise((resolve, reject) =>{
      //1. 通过判断旧的和新的cartList中商品的iid是否一致，来判断商品对象是否重复，查找之前的数组是否有该商品
      let oldProduct=context.state.cartList.find(item => item.iid === payload.iid);
      //2.判断oldProduct
      /*这里的count属性值自己在这里添加进去的，用来记录当前商品对象的数量*/
      if(oldProduct){//原来cartList中已有该商品对象，则直接该商品数量+1
        context.commit('addCounter',oldProduct);
        resolve('当前商品数量+1')
      }else{//如果没有该商品对象，则将count赋值为1，并把该商品对象push到cartList数组中
        payload.count = 1;
        context.commit('addToCart',payload)
        resolve('添加新的商品')
      }
    } )

  },

}