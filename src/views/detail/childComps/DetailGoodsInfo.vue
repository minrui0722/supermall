<template><!--首先判断传过来的detailInfo是否为空，如果为空则下面的操作均不执行-->
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div><!--这里的start和end是空标签占位-->
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list"><!--@load监听图片是否加载完成-->
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    data(){
      return {
        counter:0,//用来记录是否所有的图片都已经加载完成
        imgLength:0//用来记录所有图片的张数
      }
    },
    props:{
      detailInfo: {
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      imgLoad(){
        this.counter++;
        /*为防止每加载一张图片就向父组件发送数据，影响性能*/
        /*所以利用if判断是否全部的图片都已加载完成，然后最后才向父组件发送仅一次的信息*/
        if(this.counter==this.imgLength){
          /*当监听到图片全部记载完成则向父组件发送信息*/
          this.$emit('imgLoad');
        }
      }
    },
    watch:{/*watch函数用来监听某个属性的变化，一旦某个属性有变化就会回调该函数*/
      detailInfo(){
        /*当图片加载完成之后，九江图片的长度赋值给imgLength*/
        this.imgLength=this.detailInfo.detailImage[0].list.length;
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    /*设置上下内边距*/
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }
/*设置线条样式*/
  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }
/*设置样式*/
  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;/*开启定位，配合left和right定位*/
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;/*配合absolute定位右边的小方块样式*/
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>