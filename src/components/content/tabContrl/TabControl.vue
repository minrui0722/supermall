<template>
  <div class="tab-control">
    <!--<div v-for="item in titles" class="tab-contrl-item">-->
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active:index==currentIndex}"
         @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return{
        currentIndex:0,//默认下标为0被选中
      }
    },
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      itemClick(index){//监听点击事件
        this.currentIndex=index;
        /*将点击事件传递到外面的Home组件中，子传父：this.$emit("父组件接收事件名")*/
        this.$emit('tabClick',index);
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    /*文字水平垂直居中*/
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;/*所有内容平分布局*/
    /*由于line-height是可以继承的，为统一管理代码，将所有的公共部分写在tab-contrl中
    height: 44px;
    line-height: 44px;
    */
  }
  .tab-control-item span{
    padding: 5px;/*使得整个padding都有5px的距离，那么给span设置下边框的时候就会比文字宽度长一些*/
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    /*实现选中状态下的文字下划线效果*/
    border-bottom: 2px solid var(--color-high-text);
  }
</style>