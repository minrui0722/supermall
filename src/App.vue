<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <!--显示底部的导航栏-->
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/mainTabBar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
@import "assets/css/base.css";
</style>
