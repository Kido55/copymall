<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- @scroll、@pullingUp 是子组件scroll传过来的值 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top class="back-top" @click.native="topClick" v-show="showTopClick" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import {itemListenerMixin, backTopMixin} from "common/mixin";
import { log } from 'util';

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
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    //计算属性
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed() {   //调用这个函数(具体可以看看vue的的生命周期)，我们常用来销毁一些监听事件及定时函数
    // console.log('home');
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  activated() {   //回到home页面时，依然回到离开前的滚动的位置
    this.$refs.scroll.refresh()   //不添加这行代码，可能会出现换页回到home时候，自动滑回到顶部 
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
       
  },
  deactivated() {   //离开home页面时，获得当时滚动的位置saveY的值
  // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 2.取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
},
  created() {
    // 1.请求多个数据
    this.getHomeMultidata(),
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("sell");
    this.getHomeGoods("new");
  },
  mounted() {
    // 图片加载完成的事件监听
    //声明一下变量refresh，为debounce函数的调用,进行防抖动
  },
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 判断TopClick是否显示
      const positionY = -position.y;
      this.showTopClick = positionY > 1000;
      // 决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = positionY > this.tabOffsetTop;  //等于这个值时，isTabFixed变为true，tab-control显示出来
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      // // 监听图片加载完成，刷新
      // this.$refs.scroll.refresh();
      // console.log('loadmore')
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop)
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

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
        // setTimeout(() => {
        //   this.$refs.scroll.finishPullUp();
        // }, 5000);
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
  /* 在使用浏览器原生滚动时候，为了不让导航跟随一起滚动 */
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9; */
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

.tab-control {
  position: relative;
  z-index: 9;
}
</style>