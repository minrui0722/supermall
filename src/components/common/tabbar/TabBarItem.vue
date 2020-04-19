<template>
  <div class="tab_bar_item" @click="itemClick()"><!--监听每个TabBarItem组件-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!--<div :class="{active: isActive}"><slot name="item-text"></slot></div>-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>

    <!--此时所有的组件都显示同一张图片和同样的文字-->
    <!--<img src="../../assets/img/tabbar/home.png" alt="">
    <div>首页</div>-->

  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{/*props属性：实现父组件向子组件传递数据*/
      link:String,/*要求传过来的链接是一个字符串类型*/
      activeColor:{
        /*接收传过来的activeColor属性，要全传过来的是一个字符串，并且设置默认值*/
        type:String,
        default:"red"
      }
    },
    data(){
      return{
        /*isActive:true*///不能把值写死了，否则永远都处于活跃状态
      }
    },
    computed:{
      isActive(){
        /*
        * 假设当前活跃状态路由为/home
        * /home -> item1(/home) = true
        * /home -> item2(/category) = false
        * /home -> item3(/shopcart) = false
        * /home -> item4(/profile) = false
        * */
        /*判断当前处于活跃状态的路径是否等于传过来的link，如果是则证明当前该路由处于活跃状态*/
        return this.$route.path.indexOf(this.link)!==-1;
      },
      activeStyle(){
        /*判断当前路由是否处于活跃状态，如何是则将指定的activeColor属性值赋值给color样式*/
        return this.isActive? {color:this.activeColor} : {};
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.link);
      }
    }
  }
</script>

<style scoped>
  .tab_bar_item{
    flex: 1;/*使得均等分*/
    text-align: center;
    height: 49px;/*常识：tabbar的高度移动端一般都是49px*/
    font-size: 14px;
  }
  .tab_bar_item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;/*设置图片与整个tabbar的上边距，此时图片下边会有3px的边距*/
    vertical-align: middle;/*去除由于img的上外边距而图片下边多出的3px*/

    margin-bottom: 2px;
  }
  /*.active{
    color: #1293D7;
  }*/
</style>