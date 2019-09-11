<template>
  <div id="app" class="wrapper">
    <!-- 除去Detail组件，不被keepalive -->
    <keep-alive exclude="Detail">  
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabbar/MainTabBar'

export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
