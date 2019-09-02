<template>
  <div id="hy-swiper">
    <!-- 轮播图 -->
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <!-- 指示器 -->
    <slot name="indicator">
    </slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'Swiper',
  props: {
    interval: {   //图片轮播时间间隔
      type: Number,
      default: 3000
    },
    animDuration: {   //延迟轮播开始的时间
      type: Number,
      default: 300
    },
    moveRatio: {  //拖动图片的移动比例
      type: Number,
      default: 0.25
    },
    showIndicator: {  //默认显示指示器
      type:Boolean,
      default: true
    }
  },
  data: function() {
    return {
      slideCount: 0,  //元素个数
      totalWidth: 0,  //swiper的宽度
      swiperStyle: {},  //swiper的样式
      currentIndex: 1,  //当前的index
      scrolling: false,   //是否正在滚动
    }
  },
  mounted: function() {
    //1.操作DOM，在前后添加slide，设置定时器
    setTimeout(() => {
      this.handleDom();

      //2.开启定时器
      this.startTimer();
    },100)
  },
  methods: {
    //定时器操作
    // 开始定时器
    startTimer: function () {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      },this.interval)
    },
    // 停止定时器
    stopTimer: function() {
      window.clearInterval(this.playTimer);
    },
    // 滚动到正确的位置
    scrollContent: function(currentPosition) {
      // 0.设置正在滚动
      this.scrolling = true;

      // 1.开始滚动动画
      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms';   //过度属性，PS：'transform '这里要加空格，不然会导致动画没有滑动的bug
      this.setTransform(currentPosition);

      // 2.判断滚动到的位置
      this.checkPosition();

      // 4.滚动完成
      this.scrolling = false
    },
    // 检验正确的位置
    checkPosition: function() {
      window.setTimeout(() => {
        //1.检验正确的位置
        this.swiperStyle.transition = '0ms';  // 动画过渡时间
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        // 2.结束移动后的回调
        this.$emit('transitionEnd', this.currentIndex-1);
      },this.animDuration)
    },
    // 设置滚动的位置
    setTransform: function (position) {
      this.swiperStyle.transform = `translate3d(${position}px,0,0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px),0,0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px),0,0`;
    },

    // A.操作DOM，在DOM前后添加slide
    handleDom: function() {
      // 1.获取要操作的元素
      let swiperEl = document.querySelector('.swiper'); //ul
      let slidesEls = swiperEl.getElementsByClassName('slide'); //li

      // 2.保存元素个数
      this.slideCount = slidesEls.length;

      // 3.如果元素个数大于1，那么在前后分别添加一个slide
      if (this.slideCount >1 ) {
        //复制第一张
        let cloneFirst = slidesEls[0].cloneNode(true);
        //复制最后一张
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        //把复制的最后一张插入到ul中，放到首位
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        //把复制的第一张插入到ul中，放到末位
        swiperEl.appendChild(cloneFirst);
        //.swiper的总宽度
        this.totalWidth = swiperEl.offsetWidth;
        //.swiper的样式
        this.swiperStyle = swiperEl.style;
      }
      // 4.让swiper元素，显示第一个（目前是显示前面添加的最后一个元素）
      this.setTransform(-this.totalWidth);
    },
    
    // 拖动事件的处理
    touchStart: function(e) {
      // 1.如果正在滚动，不可以拖动
      if(this.scrolling) return;
      // 2.停止定时器
      this.stopTimer();
      // 3.保存开始拖动的位置
      this.startX = e.touches[0].pageX;
    },

    touchMove: function(e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;
      // 2.设置当前的位置
      this.setTransform(moveDistance);
    },

    touchEnd: function(e) {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);
      // 2.判断最终的距离
      if(this.distance === 0) {
        return
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
        // 右边移动超过0.5
        this.currentIndex--;
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
        // 左边一定超过0.5
        this.currentIndex++;
      }
      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);
      // 4.移动完成后重新开启定时器
      this.startTimer();
    },

    // 控制上一个，下一个
    previous: function() {
      this.changeItem(-1);
    },
    next: function() {
      this.changeItem(1);
    },
    //自动开始轮播
    changeItem: function(num) {
      // 1.移除定时器
      this.stopTimer();
      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);
      // 3.添加定时器
      this.startTimer();
    }
  }
}
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }
  
  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }

</style>