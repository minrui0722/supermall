<template>
  <div class="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="container">
      <div class="menu">
        <!--向子组件CategoryMenu组件发送全部分类信息categories，同时接收子组件CategoryMenu传过来的当前被选中状态的menu-item-->
        <category-menu @currentMenu="currentMenu" :menuData="categories"/>
      </div>
      <div class="view">
        <!--向子组件CategoriView发送具体的分类信息-->
        <category-view  :data-views="showSubcategory"/>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CategoryMenu from "./childComps/CategoryMenu";
  import CategoryView from "./childComps/CategoryView";

  import Scroll from "components/common/scroll/Scroll";

  import {getCategory,getSubcategory} from "network/category";


  export default {
    name: "Category",
    components: {
      NavBar,
      CategoryMenu,
      CategoryView,
      Scroll
    },
    data() {
      return {
        //用于保存所有的分类信息
        categories: [],
        //用于记录当前被选中分类的索引值
        currentIndex: -1,
        //用于保存单个分类的具体信息
        categoryData: {}
      }
    },
    created() {
      /*在Category组件被创建的时候就请求分类数据*/
      this._getCategory()
    },
    computed:{
      showSubcategory() {
        return this.categoryData[this.currentIndex]
      }
    },
    methods: {
      //1.请求所有的分类信息，将该信息传递给CategoryMenu
      _getCategory() {
        getCategory().then(res => {
          /*将请求到的分类信息保存在categories数组中*/
          this.categories = res.data.category.list
          /*遍历categories数组，动态为其添加具体分类信息subcategory属性*/
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              /*这里将具体的分类信息保存为对象，是因为接口对象中maitKey就是保存在一个对象中*/
              subcategory: {}
            }
          }
          //默认获取第一个菜单的数据，如果不做这步操作，刚开始进入分类页面的时候，是空白的信息，必须要点击左边的分类才会有数据信息
          this._getSubcategory(0)
        })
      },
      //2.请求单个分类的具体信息
      _getSubcategory(index) {
        /*通过关键字maitKey找到对应分类的具体信息，并保存起来*/
        const maitKey = this.categories[index].maitKey
        /*调用函数*/
        getSubcategory(maitKey).then(res => {
          /*动态添加对应分类索引的subcategory值，接口中是将具体商品信息保存在list数组中，每个数组元素都是一个对象*/
          this.categoryData[index].subcategory = res.data.list
          /*更新currentIndex的值*/
          this.currentIndex = index
        })
      },
      currentMenu(index) {
        // 菜单栏改变，请求新的分类的具体数据
        this._getSubcategory(index)
      }
    }
  }
</script>

<style scoped>
  .category-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
  .container{
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
    display: flex;
  }
  .container .menu{
    width: 100px;
  }
  .container .view{
    flex: 1;
  }
</style>