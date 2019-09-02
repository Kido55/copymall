<template>
  <div class="wrapper" ref="datalist">
    <ul class="content">
      <button @Click="btnClick">按钮</button>
      <li> datalist1</li>
      <li> datalist2</li>
      <li> datalist3</li>
      <li> datalist4</li>
      <li> datalist5</li>
      <li> datalist6</li>
      <li> datalist7</li>
      <li> datalist8</li>
      <li> datalist9</li>
      <li> datalist10</li>
      <li> datalist11</li>
      <li> datalist12</li>
      <li> datalist13</li>
      <li> datalist14</li>
      <li> datalist15</li>
      <li> datalist16</li>
      <li> datalist17</li>
      <li> datalist18</li>
      <li> datalist19</li>
      <li> datalist20</li>
      <li> datalist21</li>
      <li> datalist22</li>
      <li> datalist23</li>
      <li> datalist24</li>
      <li> datalist25</li>
      <li> datalist26</li>
      <li> datalist27</li>
      <li> datalist28</li>
      <li> datalist29</li>
      <li> datalist30</li>
      <li> datalist31</li>
      <li> datalist32</li>
      <li> datalist33</li>
      <li> datalist34</li>
      <li> datalist35</li>
      <li> datalist36</li>
      <li> datalist37</li>
      <li> datalist38</li>
      <li> datalist39</li>
      <li> datalist40</li>
      <li> datalist41</li>
      <li> datalist42</li>
      <li> datalist43</li>
      <li> datalist44</li>
      <li> datalist45</li>
      <li> datalist46</li>
      <li> datalist47</li>
      <li> datalist48</li>
      <li> datalist49</li>
      <li> datalist50</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import NavBar from '../../components/common/navbar/NavBar'
export default {
  name:'Category',
  data() {
    return {
      scroll: null
    }
  },
  components: {
    NavBar
  },
  // 组件创建完成后调用
  mounted() {
    // 创建BScroll实例对象
    // 默认情况下，BScroll是不可以实时的监听滚动位置
    // probe：侦测
    // 0,1都是不侦测实时的位置
    // 2：在手指滚动的过程中侦测，手指离开后的惯性滚动过程不侦测
    // 3：只要是滚动，都侦测
    this.scroll = new BScroll(this.$refs.datalist, {
      probeType: 3,
      pullUpLoad: true,
      click:true
    })
    this.scroll.on('scroll', (position) => {
      console.log(position)
    })
    this.scroll.on('pullingUp', () => {
      // 发送网络请求，请求更多页的数据
      console.log('上拉加载更多')
      // 等数据请求完成，并且将新的数据展示出来后
      setTimeout(() => {
        this.scroll.finishPullUp();
      }, 2000)
    })
  },
  methods: {
    btnClick() {
      console.log("btnclick")
    }
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
}  

.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;
}
</style>