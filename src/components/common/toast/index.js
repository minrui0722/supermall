import Toast from "./Toast";
const obj={}
obj.install=function (Vue) {
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  //2.通过new的方式，根据组件构造器，可以创建出一个组件对象
  const toast = new toastConstructor()
  //3.将组件对象，手动挂在到某一个元素上$mount
  toast.$mount(document.createElement("div"))
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  //5.将$toast对象添加到Vue的原型上
  Vue.prototype.$toast = toast
}
export default obj;