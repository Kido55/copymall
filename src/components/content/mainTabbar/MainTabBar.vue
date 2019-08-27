<template>
<!-- 代码复制粘贴移动后，要注意文件引入的路径变化，需要重新输入 -->
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="../../../assets/images/tabbar/home.svg" alt />
        <img slot="item-icon-active" src="../../../assets/images/tabbar/home_active.svg" alt />
        <div slot="item-text">首 页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="../../../assets/images/tabbar/category.svg" alt />
        <img slot="item-icon-active" src="../../../assets/images/tabbar/category_active.svg" alt />
        <div slot="item-text">分 类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="../../../assets/images/tabbar/shopcart.svg" alt />
        <img slot="item-icon-active" src="../../../assets/images/tabbar/shopcart_active.svg" alt />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="../../../assets/images/tabbar/profile.svg" alt />
        <img slot="item-icon-active" src="../../../assets/images/tabbar/profile_active.svg" alt />
        <div slot="item-text">我 的</div>
      </tab-bar-item>
    </tab-bar>
  
</template>

<script>

import TabBar from "../../../components/common/tabbar/TabBar";
import TabBarItem from "../../../components/common/tabbar/TabBarItem.vue";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
</style>