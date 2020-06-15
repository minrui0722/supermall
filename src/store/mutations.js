import {ADD_COUNTER,ADD_TO_CART,CHECK_CLICK,DELETE_INFO} from "./mutation-types";


export default {
  [ADD_COUNTER](state,payload){
    payload.count++;
  },
  [ADD_TO_CART](state,payload){
    //添加商品信息
    /*给商品信息添加一个checked属性，
    根据该值来决定复选款是否选中，默认是选中*/
    payload.checked = true;/*模型中的属性checked*/
    state.cartList.push(payload);
  },
  [CHECK_CLICK](state,payload){
    //修改checked的值
    payload.checked = !payload.checked;
  },
  [DELETE_INFO](state){
    /*定义一个新的cartList*/
    let newCartList = []
    /*将未选中的商品信息重新存放在newCartList中*/
    state.cartList.map(item => {
      if(item.checked){
        return
      }
      newCartList.push(item)
    })
    /*修改cartList的新指向*/
    state.cartList = newCartList
  }


}