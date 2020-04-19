<template>
  <div id="home" class="wrapper">
    <!--导航栏-->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
            :titles="['流行','新款','精选']"
            @tabClick="tabClick"
            ref="tabControl1"
            :class="{fixed:isfixed}"
            class="tab-control"
            v-show="isfixed"
    />
    <scroll
            class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
           ><!--动态传递给Scroll.vue是否需要上拉加载-->
      <!--轮播图-->
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/><!--这里的:banners表示-->
      <!--推荐栏-->
      <recommend-view :recommends="recommends"></recommend-view>
      <!--本周流行feature部分-->
      <feature-view/>
      <!--选项卡部分-->
      <tab-control
              :titles="['流行','新款','精选']"
              @tabClick="tabClick"
              ref="tabControl2"
              :class="{fixed:isfixed}"
      />
      <!--商品展示-->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--回到顶部按钮-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  /*引入子组件，注意是由顺序的，养成良好的编程习惯*/
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  /*引入公共组件，注意顺序*/
  import NavBar from "components/common/navbar/NavBar";
  import BScroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabContrl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backtop/BackTop";
  import {itemListMixin} from "common/mixin";

  /*导入网络请求的相关数据*/
  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home";
  import Scroll from "../../components/common/scroll/Scroll";

  export default {
    name: "Home",
    data(){
      return{
        //result:null,//默认值为null，用来保存网络请求中的数据
        banners:[],
        recommends:[],
        goods:{
          /*默认将每个key的第一页的数据请求过来，至于第n页就根据用户的上拉加载来实现*/
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',//默认展示的商品请求时pop流行
        isShowBackTop:false,
        tabOffsetTop:0,/*接收HomeSwiper.vue发送轮播图是否加载完成的信息*/
        isfixed:false,/*记录当前是否需要设置tabControl的position为fixed*/
        saveY:0,/*记录切换路由时，当前的Y值*/
        //itemImgListener:null,//记录接收到GoodListItem中的图片加载完成之后调用的函数,注释是因为测试mixin，放在mixin.js文件中了
      }
    },
    components: {
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      BScroll,
      TabControl,
      GoodsList,
      BackTop


    },
    mixins:[itemListMixin],
    created() {
      //1.请求数据
      this.getHomeMultidata();
      //2.请求商品数据
      this.getHomeGoods('pop');//请求流行数据
      this.getHomeGoods('new');//请求新款数据
      this.getHomeGoods('sell');//请求精选数据
    },
    mounted() {
      //console.log('home混入测试');
      //1.图片加载完成的监听
      //const refresh=debounce(this.$refs.scroll.refresh,20);
      /*监听GoodListItem中的图片是否加载完成*/
      /*对监听的事件进行保存*/
      /*this.itemimgLisnter=()=>{
        refresh();
      };*/
      //2.接收GoodListItem.vue发送的图片加载完成的监听
      /*-----对应GoodSlistItem中的法2，事件总线-----*/
      //this.$bus.$on('itemimgLoad',this.itemimgLisnter);

      /*-----对应GoodSlistItem中的法1。路由判断-----*/
      //this.$bus.$on('homeimgLoad',this.itemimgLisnter);
    },
    activated() {
      /*再次回到该路由的时候，先刷新一下，否则会出现再次回到该路由的时候，无法滚动等莫名奇怪的问题*/
      this.$refs.scroll.refresh();
      //注意顺序，必须是先刷新，再回到之前离开的位置，否则没有保持原来状态的效果
      /*当再次回到该路由的时候，设置滚动到保存的位置即可*/
      this.$refs.scroll.scrollTo(0,this.saveY,0);

    },
    deactivated() {
      /*1.离开时记录当前Y值*/
      this.saveY=this.$refs.scroll.getSaveY();
      /*2.取消全局事件的监听，因为已经进入首页的时候，就不需要再监听itemimgload事件了*/
      /*
      * this.$bus.$off('itemimgLoad',要取消的函数)
      * 如果不传第二个参数，意味着将所有itemimgLoad有关的函数都取消掉
      * */
      this.$bus.$off('itemimgLoad',this.itemimgLisnter);
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    methods:{
      /*
      * =====================事件监听相关的方法
      * */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType='pop';
            break;
          case 1:
            this.currentType='new';
            break
          case 2:
            this.currentType='sell'
            break
        }/*使得俩个障眼法的tabControl按钮点击同步*/
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      contentScroll(position){
        //1.判断backTop是否显示
        this.isShowBackTop=(-position.y)>1000;
        //2.决定tabControl是否吸顶(position:fixed)
        this.isfixed=(-position.y)>this.tabOffsetTop;
      },
      loadMore(){
        /*console.log('监听到scroll已滚动到底部');*/
        this.getHomeGoods(this.currentType);
      },
      swiperImgLoad(){
        //接收轮播图已加载完成并获取到最终的offsetTop值
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
      },

      /*
      * =====================网络请求相关的方法
      * */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{//函数调用完之后，会释放所有的函数变量
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        //为使能复用该方法，即需要更具用户的上拉加载操作动态获取page的具体值
        const page=this.goods[type].page+1;//首先获取到当前页面，在此基础上+1，则表示用户的上拉加载操作，表示需要加载的页数数据
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);//将局部变量中请求到的数据保存起来
          this.goods[type].page+=1;//更新data属性中goods对象中的page页面，表示当前正处于页面数
          //完成上拉加载更多，进行下一次加载更多
          this.$refs.scroll.finishPullUp();
        })
      },


    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*//*设置上内边距为导航栏的高度，使得轮播图被覆盖部分显示出来*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /*固定导航栏:在使用浏览器原生滚动的时候，为了不让导航条跟随一起滚动设置的
    *而现在用来better-scroll之后，本身就可以实现局部滚动，那这部分央视就设置无效了
    */
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;!*保证宽度为视口宽度*!
    z-index: 9;!*保证导航栏在最上面显示*!*/
  }
/*  .tab-control{
    !*sticky属性：在没有达到top设置高度值时，默认position为static，
    当达到top值之后，就会自动将position设置为fixed
    *!
    !*该样式不设置在TabControl.vue中是因为TabControl组件是一个独立的组件，
    在TabControl中写该属性就意味着所有的TabControl的样式都是这样的*!
    position: sticky;
    top:44px;
    z-index: 9;!*防止被后面的内容覆盖*!
  }*/
  /*--------法2：利用calc()实现中间部分区域的尺寸-------*/
  /*.content{
    overflow: hidden;
    height: calc(100% - 44px - 49px);
    margin-top: 44px;!*前提是去掉home的padding-top，并且必须为home设置height:100vh*!
  }*/
  /*--------法1：利用定位来实现中间部分区域的尺寸-------*/
  .content{
    overflow: hidden;
/*设置中间部分内容的高度，前提是必须设置整个home高度为100vh*/
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;/*这里使用相对定位，不会脱离文档流*/
    z-index: 9;/*只有开启了定位的元素z-index才有效果*/
  }
</style>




