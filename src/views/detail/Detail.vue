<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    
    <scroll class="content" @scroll="contentScroll" :probe-type="3" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <!-- :top-images绑定属性，把这边父组件获得的topImages数组数据传到子组件DetailSwiper -->
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comments" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top class="back-top" @click.native="topClick" v-show="showTopClick"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { log } from "util";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTop: [],
      getThemeTop: null,
      currentIndex: 0
    };
  },
  created() {
    // 1.保存存入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res.result);
      // 1.获取数据
      const data = res.result;
      // 2.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 3.获取商品的信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 4.创建店铺信息对象，获取店铺数据
      this.shop = new Shop(data.shopInfo);
      // 5.保存商品的详情数据，获取商品详细数据
      this.detailInfo = data.detailInfo;
      // 6.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 7.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // 获取各个标题对应的高度
      // nextTick这个方法最后获取的值依然不对
      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM是已经被渲染出来
      //   // 但是图片依然没有加载完（目前获取到offsetTop不包含其中的图片）
      //   // offsetTop值不对的时候，都是图片的问题
      //   this.themeTop = [];
      //   this.themeTop.push(0);
      //   this.themeTop.push(this.$refs.params.$el.offsetTop)
      //   this.themeTop.push(this.$refs.comments.$el.offsetTop)
      //   this.themeTop.push(this.$refs.recommends.$el.offsetTop)
      //   console.log(this.themeTop);

      // })
    });
    // 3.获取推荐详情数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
      // console.log(res);
    });
    // 4.给getThemeTop赋值(对这个赋值的操作进行防抖)
    this.getThemeTop = debounce(() => {
      // console.log('-----');
      
      this.themeTop = [];
      this.themeTop.push(0);
      this.themeTop.push(this.$refs.params.$el.offsetTop);
      this.themeTop.push(this.$refs.comments.$el.offsetTop);
      this.themeTop.push(this.$refs.recommends.$el.offsetTop);
      this.themeTop.push(Number.MAX_VALUE)
    });
  },
  mounted() {
    // Home.vue和detail.vue的监听事件，需要分开处理
    // mixin.js封装起来
  },
  methods: {
    imageLoad() {
      // 页面加载完所有图片后，刷新一次页面
      this.$refs.scroll.refresh();
      this.getThemeTop()
    },
    contentScroll(position) {
      // 判断TopClick是否显示
      const positionY = -position.y;
      this.showTopClick = positionY > 1000;

      // 滚动内容对应标题
      // themeTop[i],数组的第i个数据 
      let length = this.themeTop.length;
      for(let i = 0; i < length-1; i++) {
        // 普通方法
        // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTop[i] && positionY < this.themeTop[i+1]) || (i === length - 1 && positionY > this.themeTop[i]))){
        //   // console.log(i);
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        //hack方法（在themeTop数组中额外增加一个Numner.Max-Value）
        if(this.currentIndex !== i && (positionY >= this.themeTop[i] && positionY < this.themeTop[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this. currentIndex
        } 
      }
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTop[index], 200);
      // console.log(index);
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product);
      // 2.将商品添加到购物车里
      // this.$store.commit('addCart', product)  //mutations
      this.$store.dispatch('addCart', product)
    }
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  }
}
</script>

<style scoped>
.content {
  position: relative;
  height: calc(100% - 44px - 49px);
}
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  /* position: relative; */
  z-index: 9;
  background-color: #fff;
}
</style>