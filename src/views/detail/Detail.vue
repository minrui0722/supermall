<template><!--这里必须要加上name属性，否则从详情页回到主页的时候会立即回到顶部-->
  <div id="detail" name="Detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar><!--导入导航栏-->
    <scroll
            class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-images="topImages"/><!--导入轮播图-->
      <detail-base-info :goods="goods"/><!--商品标题快递等信息-->
      <detail-shop-info :shop="shop"/><!--店铺信息展示模块-->
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" /><!--详情页数据信息 展示模块-->
      <detail-param-info :param-info="paramInfo" ref="param"/><!--商品尺寸等信息-->
      <detail-comment-info :comment-info="commentInfo" ref="comment"/><!--评论信息展示-->
      <goods-list :goods="recommend" ref="recommend"/><!--推荐信息的展示-->
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
    <detail-bottom-bar @addToCart="addToCart"/>


  </div>
</template>

<script>
  /*子组件相关的导入*/
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  /*公共组件相关的导入*/
  import DetailSwiper from "./childComps/DetailSwiper";
  import Scroll from "components/common/scroll/Scroll";
  import {itemListMixin,backTopMixin} from "common/mixin";

  /*网络请求相关的导入*/
  import {getDetail,Goods,shop,paramInfo,getRecommend} from "network/detail";
  import {debounce} from "common/utils";

  export default {
    name: "Detail",
    data(){
      return{
        iid:0,
        topImages:[],
        goods:{},//用来保存商品信息
        shop:{},//用来保存店铺信息
        detailInfo:{},//用来保存商品图片信息
        paramInfo:{},//用来保存尺寸等商品信息
        commentInfo:{},//用来保存评论信息
        recommend:[],//用来保存推荐信息数据
        //itemImgListener:null//用于监听和取消图片加载信息的函数的变量，注释是因为测试mixin，放在mixin.js文件中了
        themeTopYs:[],//用来保存商品、参数、评论、推荐的offsetTop值
        getThemeY:null,//用来获取offsetTop值的函数调用
       /* positionY:0,//用来保存获取到的内容y值*/
        currentIndex:null,//用来保存当前导航条上的主题下标值，主要是用来防止频繁打印index

      }
    },
    components:{
      DetailNavBar,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,//推荐数据信息展示
      DetailBottomBar,

      DetailSwiper,
      Scroll,

    },
    mixins:[itemListMixin,backTopMixin],
    created() {
     // 1.保存传入商品的IID
      this.iid=this.$route.params.iid;
      // 2.根据IID请求详情页的数据
      getDetail(this.iid).then(res=>{
        const data=res.result;
        console.log(res);
        /*2.1获取顶部轮播图的信息*/
        this.topImages=data.itemInfo.topImages;
        /*2.2获取商品信息*/
        this.goods= new Goods(data.itemInfo,data.columns,data.shopInfo.services);
        /*2.3获取店铺信息对象*/
        this.shop= new shop(data.shopInfo);
        /*2.4获取具体的商品图片信息*/
        this.detailInfo=data.detailInfo;
        /*2.5获取尺寸等信息*/
        this.paramInfo=new paramInfo(data.itemParams.info,data.itemParams.rule);
        /*2.6获取评论信息*/
        //由于有些商品没有评论信息，所以首先判断是否有评论信息，有则请求数据，否则则不进行以下操作
        if(data.rate.crate!==0){
          this.commentInfo=data.rate.list[0];
        }
        /*/!*获取到组件中的offsetTop值*!/
        this.$nextTick(()=>{
          /!*保证每次更新数据的时候，themTopYs是空数组，然后才往里添加数据*!/
          this.themeTopYs=[];
          //将得到的offsetTop值传入themesTopYs数组中
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          console.log(this.themeTopYs);
        })*/

      });
      // 3.推荐信息的请求数据
      getRecommend().then(res=>{
        //console.log(res);
        this.recommend=res.data.list;//保存推荐信息
      })
      //4. 给getThemeY()函数赋值
      this.getThemeY=debounce(()=>{
        /*保证每次更新数据的时候，themTopYs是空数组，然后才往里添加数据*/
        this.themeTopYs=[];
        //将得到的offsetTop值传入themesTopYs数组中
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        this.themeTopYs.push(Number.MAX_VALUE);//在数组最后添加一个非常大的值，用于简化判断条件
        //console.log(this.themeTopYs);
      },100)

    },
    mounted() {
      //1.接收GoodsListItem发送的图片加载完成的监听信息并作刷新
      /*-----方法2：对应GoodListItem中的图片加载信息，事件总线，一旦进入该页面，就不需要再监听该事件*/
      /*const refresh=debounce(this.$refs.scroll.refresh,20);
      this.itemimgLisnter=()=>{//保存回刷新的回调函数
        refresh();
        console.log('刷新页面完成！');
      };
      this.$bus.$on('itemimgLoad',this.itemimgLisnter);*/
      //console.log('detail混入测试');
      /*-----方法1：对应GoodListItem中的图片加载信息，路由判断*/
      /*this.$bus.$on('detailimgLoad',()=>{
        console.log('图片加载完成！');
      })*/
    },
    /*这里不使用deactivated函数取消事件监听是因为该Detail组件中是没有在keep-alive范围内的，
    * 而actived函数和deactivated函数都是在keep-alive中才会回调的函数*/
    updated() {

    },
    destroyed() {
      this.$bus.$off('itemimgLoad',this.itemimgLisnter);
    },
    methods:{
      imgLoad(){
        /*接收到子组件DetailGoodsInfo.vue传递“所图片加载完成”的信息之后，刷新滚动区域*/
        this.refresh();
        //this.$refs.scroll.refresh();
        /*调用getThemeY()函数获取正确的offsetTop值，且不会频繁调用*/
        this.getThemeY();
      },
      titleClick(index){
        //console.log(index);
        /*利用offsetTop值滚动到对应的锚点位置，注意y值为负值*/
        /*+44px是因为导航栏的高度，但是此时的商品可能会出现回退的小bug，可通过if语句判断*/
        if(index===0){
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200);
        }else{
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,200);
        }
      },//监听scroll的滚动
      contentScroll(position){
        //1.获取y值，注意这里的y值是负数
        const positionY= -position.y;
        //2.将positionY和themeTopYs中的offsetTop值做对比
        const length=this.themeTopYs.length;
        /*============hack做法============*/
        /*
        * themeTopYs= [0,7938,9120,9452,Number.MAX_VALUE]
        * */
        for(let i=0;i<length-1;i++){
          if((this.currentIndex!=i)
              &&
              (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex;
            console.log(this.currentIndex);
          }
        }
        //3.是否回到顶部
        /*法2：通过调用另一个函数*/
        this.listenerShowBackTop(position);
        /*法1：非生命周期的方法函数中的部分代码是不可以抽入到混入的，而生命周期内的方法函数可以和mixin中的对应的生命周期函数代码合并*/
        //this.isShowBackTop= -position.y >1000;
        /*============普通循环条件做法============*/
        /*
        *themeTopYs= [0,7938,9120,9452]
        * · positionY>=9452,index=3
        * · 9120 >=positionY>9452,index=2
        * · 9452>=positionY>7938,index=1
        * · 7938 >=positionY,index=0
        * */
        /*for(let i=0;i<length;i++){
          //特别注意：通过for（let i in this.themeTopYs.length）获取到的i是string类型
          //可通过 i*1 或parseInt(i)将string转化为number
          /!*通过this.currentIndex!=i来解决打印频繁的操作*!/
          if(this.currentIndex!=i &&
              ((i< length-1 && this.positionY>=this.themeTopYs[i] && this.positionY<this.themeTopYs[i+1] )
              ||
              (i===length-1 && this.positionY>=this.themeTopYs[i]))){
            this.currentIndex=i;
            console.log(this.currentIndex);
            this.$refs.nav.currentIndex=this.currentIndex;
          }
        }*/
      },
      addToCart(){
        //1.获取购物车中需要展示的信息
        const product={};
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        //2.将商品添加到购物车里面
        this.$store.dispatch('addCart',product);
        /*mutations中的操作代码*/
        //this.$store.commit('addCart',product);
      }

    }
  }
</script>

<style scoped>
  #detail{
    /*使用相对定位不会使其脱离文档流，知识利用定位的z-index来提高层级，覆盖掉下方的TabBar*/
    /*而z-index只能用于定位元素中*/
    position: relative;
    z-index: 9;
    background-color: #fff;
    /*配合.content实现滚动区域的尺寸*/
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    /*设置滚动区域的尺寸，44px是导航栏的高度*/
    /*49px是底部栏的高度*/
    height: calc(100% - 44px - 49px);
    /*溢出部分隐藏，如果不设置当滑动到最底部时，会出现一大片白色区域和TabBar*/
    overflow: hidden;
  }
</style>