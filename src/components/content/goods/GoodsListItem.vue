<!--该组件要同时用于首页的商品信息的展示，同时还可以用于详情页中推荐信息的展示，因为这两者部分展示形式是一样的
所以就要注意img的存在位置，比如首页中的信息展示图片是放在show数据中的img中，
而推荐信息中的图片是直接放在image中的，
这时就需要利用计算属性对src的属性值做判断-->

<template><!--在这里监听点击跳转详情页-->
  <div class="goods-item" @click="itemClick"><!--通过大组件GoodsList中的小组件GoodListItem展示商品信息-->
    <!--然后一次从请求到的书中，挑选出有用的数据并进行展示-->
    <img :src="showImage" alt="" @load="imgLoad" ><!--这里只能是imgload-->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return{}
        }
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img;
      }
    },
    methods:{
      imgLoad(){
        /*=========实现不同的路由接收消息做自己相应的操作=======*/
        //2.利用事件总线的$off，一旦进入到对应的路由就不要再监听该事件了
        this.$bus.$emit('itemimgLoad');
        //1.路由判断
        /*if(this.$route.path.indexOf('/home')!==-1){
          this.$bus.$emit('homeimgLoad');
        }else if(this.$route.path.indexOf('detail')!==-1){
          this.$bus.$emit('detailimgLoad');
        }*/

      },
      itemClick(){
        /*在这里实现跳转功能*/
        this.$router.push('/detail/'+this.goodsItem.iid);
        /*通过query方式跳转*/
        /*this.$router.push({
          path:'/detail',
          query:{
            iid:this.goodsItem.iid
          }
        })*/
        //console.log('跳转到详情页');
      }
    }

  }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;/*设置各小组件之间的距离*/
    position: relative;/*方便将整个文字信息直接定位到底部*/
/*在这里设置小组件的宽度，为的是父组件开启flex且能够根据小组件爱的宽度来决定一行显示多少个小组件
*但是这里不能把宽度写死(width: 150px;)，否则在不同的品目大小中呈现的效果不一致，应该用%
*/  width: 48%;

  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;/*设置圆角*/
  }
  .goods-info{
    font-size: 12px;
    /*将文字信息直接固定在底部5px处*/
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    /*设置文字信息的多余部分用省略号代替*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*设置描述信息与价格和收藏之间的垂直距离*/
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;/*设置价格和收藏数量之间的距离*/
  }
  /*通过伪元素设置收藏图标*/
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>