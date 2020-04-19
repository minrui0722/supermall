<template><!--这里v-if的作用是判断goods对象是否为空，如果为空，则下面的操作就不用渲染了-->
  <div class="base-info" v-if="Object.keys(goods).length!==0">
    <!--展示标题信息-->
    <div class="info-title">{{goods.title}}</div>
    <!--展示价格、折扣信息-->
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <!--展示快递等信息-->
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div><!--可以用v-for遍历数字。下标从1开始，如v-for="n in 3"，则n=1，2，3-->
    <!--展示24消失发货之类的东西-->
    <div class="info-service">
      <!--这里v-for的goods.services.length-1是因为在上面已经把最后一个展示出来了-->
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <!--由于遍历数字是从1开始的，所以这里的index-1-->
        <img :src="goods.services[index-1].icon" alt=""><!--展示小图标-->
        <span>{{goods.services[index-1].name}}</span><!--展示图标后面的文字-->
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    color: #222
  }
  .info-price {
    margin-top: 10px;
  }
  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }
  .info-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;/*删除线*/
  }
  .info-price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }/*收藏，销量等其他信息*/
  .info-other {
    margin-top: 15px;
    line-height: 30px;/*使得文字和下边框有间隙*/
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;/*flex布局内容对齐方式：两边紧靠，中间均等分*/
  }/*运费，包邮等信息*/
  .info-service {
    /*flex布局内容对齐方式：两边紧靠，中间均等分*/
    display: flex;
    justify-content: space-between;
    line-height: 60px;/*撑起整个容器的高度，且能保证垂直居中显示*/
    /*注意：当容器内有内容时，可以通过设置line-height来撑起父元素的高度，就不用再写父元素高度了*/
  }
  .info-service-item img {
    width: 14px;
    height: 14px;
    margin-right: 3px;
    /*利用定位，调整图标的位置，使得图标和文字看起来在一条线上*/
    position: relative;
    top: 2px;
  }
  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
</style>