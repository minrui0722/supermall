import {debounce} from "./utils";
import BackTop from "components/content/backtop/BackTop";

export const itemListMixin={
  data(){
    return {
      itemImgListener:null,
      refresh:null
    }
  },
  mounted(){
    this.refresh=debounce(this.$refs.scroll.refresh,100);
    this.itemImgListener=()=>{
      this.refresh();
    };
    this.$bus.$on('itemimgLoad',this.itemImgListener);
    //console.log('我是混入中的内容');
  }
}

export const backTopMixin={
  data(){
    return {
      isShowBackTop:false,//根据该值来判断是否显示回到顶部图标
    }
  },
  components:{
    BackTop,
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0);
    },
    listenerShowBackTop(position){
      this.isShowBackTop= -position.y >1000;
    }
  }
}