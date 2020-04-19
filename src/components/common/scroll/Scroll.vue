<template>
  <!--设置ref属性值，保证在创建BScroll实例时，能准确拿到该wrapper-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name: "Scroll",
    props:{//接收父组件Home.vue传递过来的probeType属性值
      probeType: {/*注意，这里的命名为驼峰命名，所以在HOme.bue中系的时候要写成probe-type*/
        type:Number,
        default:0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll:null,
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll=new BScroll(this.$refs.wrapper,{
        click:true,/*出按钮以外的DOM元素事件监听*/
        probeType:this.probeType,/*实时滚动监听*/
        pullUpLoad:this.pullUpLoad,/*上拉加载更多*/
      });
      //2.实时监听滚动
      if(this.probeType===2||this.probeType===3){
        this.scroll.on("scroll",position=>{
          /*console.log(position);*/
          this.$emit('scroll',position);/*通过$emit()事件将实时滚动的position值传递给父组件*/
        })
      }
      //3.监听scroll滚动到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          /*console.log('监听到scroll已滚动到底部');*/
          this.$emit('pullingUp');
        })
      }



    },
    methods:{
      scrollTo(x,y,time=300){
        /*短路操作，首先判断是否有this.scroll对象*/
        this.scroll && this.scroll.scrollTo(x,y,time);
      },
      refresh(){
        //console.log('刷新');
        this.scroll && this.scroll.refresh();
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      },
      getSaveY(){/*判断当前是否有scroll，有则返回当前y值，没有则返回0*/
        return this.scroll?this.scroll.y:0;
      }
    }
  }
</script>

<style scoped>

</style>