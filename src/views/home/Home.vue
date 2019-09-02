<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top class="backtop" @click.native="topClick" v-show="showTopClick" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "../../network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      showTopClick: false
    };
  },
  computed: {
    //计算属性
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata(),
      // 2.请求商品数据
      this.getHomeGoods("pop");
    this.getHomeGoods("sell");
    this.getHomeGoods("new");
  },
  mounted() {},
  methods: {
    /**
     * 事件监听相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    topClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // console.log(position)
      this.showTopClick = -position.y > 1000;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      
      this.$refs.scroll.scroll.refresh()
    },
    /**
     * 网咯请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res.data);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; //声明商品列表的页码
      getHomeGoods(type, page).then(res => {
        //type：商品列表goods里面的自定义数组分类，pop、sell、new
        this.goods[type].list.push(...res.data.list); //把获取到的分类数组列表push到goods数组中
        this.goods[type].page += 1;
        // console.log(res.data.list)
        setTimeout(() => {
          this.$refs.scroll.finishPullUp();
        }, 2000);
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh; /*100vh,*/
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  position: sticky; /*由于使用了scroll插件，此时sticky失去了作用*/
  top: 44px;
  z-index: 9;
}

.content {
  /* 方法一 （#home不要定位）*/
  /* height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px; */

  /* 方法二 */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>