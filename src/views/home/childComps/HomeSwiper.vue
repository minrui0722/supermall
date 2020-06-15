<!--整个childComps文件封装的都是关于Home的所有子组件，子组件！！-->
<template>
    <swiper>
      <swiper-item v-for="item in banners"><!--v-for:遍历作用-->
        <!--1.由于轮播图中的图片是可以点击的，所以直接在img外包裹一层超链接a
        2.:href动态绑定item中的链接；:src动态绑定item中的图片地址-->
        <a :href="item.link"><!--动态绑定链接-->
          <img :src="item.image" @load="imgload"><!--动态绑定图片位置-->
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"
  export default {
    name: "HomeSwiper",
    props:{//父组件通过props属性将数据传给子组件，props是子组件中的属性
      /*
      * 将父组件Home中的banners数据通过props属性传给子组件HomeSwiper。
      * 这里的banners是子组件给在接收父组件传递过来的banners数据起的名字，只不过这里和父组件中的banners名字相同，
      * 子组件中使用的数据只能是自己data中的数据
      * */
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        isLoad:false//定义一个变量，用来记录当前是否已经发送数据，默认是没有的
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imgload(){
        /*由于轮播图一共有4张，所以会发送4次offsetTop的值，
        而实际上，我们只需要发送一次即可，
        为优化性能，只需要打印出一次即可*/
        if(!this.isLoad){//如果发送了数据就没有必要再发送数据了(isLoad=true)
          this.$emit('swiperImgLoad');
          this.isLoad=true;
        }
        /*console.log('++++++++');*/
      }
    }
  }
</script>

<style scoped>

</style>