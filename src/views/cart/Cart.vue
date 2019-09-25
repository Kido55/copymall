<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="content">
    <cart-list/>
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "../cart/childComps/CartList"
import CartBottomBar from './childComps/CartBottomBar'
import Scroll from 'components/common/scroll/Scroll'
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
  },
  computed: {
    // 写法一，mapGetters:辅助函数仅仅是将store中的getter映射到局部计算属性
    // ...mapGetters(['cartLength','cartList'])
    // 写法二
    ...mapGetters({
      length: "cartLength"
    })
  }
};
</script>

<style scoped>
#cart {
  height: 100vh;
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  /* position: relative; */
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>