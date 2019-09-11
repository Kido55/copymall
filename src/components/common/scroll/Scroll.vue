<template>
  <!-- ref 一般绑定在子组件上，父组件获取子组件上的元素 -->
  <!-- ref如果是绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象 -->
  <!-- ref如果是绑定在普通的元素中，那么通过this.$refs.refname获取到的是一个元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 1.创建scroll实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true
    });
    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position)
        this.$emit("scroll", position); //子组件向父组件传值
      });
    }
    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 发送网络请求，请求更多页的数据
        // console.log('上拉加载更多')
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      // console.log('refresh')
      this.scroll && this.scroll.refresh();
    },
     finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {    //获取sroll.y的滚动距离
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>

<style scoped>
</style>