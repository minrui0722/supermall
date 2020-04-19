<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{active: index===currentIndex}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0,
      }
    },
    methods:{
      titleClick(index){//监听点击事件
        this.currentIndex=index;
        /*向外面父组件发送点击监听事件*/
        this.$emit('titleClick',index);
      },
      backClick(){
        /*返回上一级效果*/
        this.$router.back();
        /*等价代码this.$router.go(-1)*/
      }
    }

  }
</script>

<style scoped>
  .title{
    display: flex;
    text-align: center;
    font-size: 13px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 12px;
  }
</style>