##在github上新创建一个空仓库后,把文件与仓库地址绑定
```git remote add origin https://github.com/Kido55/copymall.git```
```git push -u origin master```

新项目
1.划分目录结构

2.引用了两个css文件

3.vue.config.js 和 .editorconfig

4.将项目的模块划分：tabbar -> 路由映射关系





## Tarbar的实现思路

1. 如果在下方有一个单独的TarBar组件，你如何封装：
  1.1 自定义TabBar组件，在APP中使用
  1.2 让TabBar固定于底部，并且设置相关的样式
  
2. TabBar中显示的内容由外界决定
  2.1 定义插槽    <slot></slot>
  2.2 flex布局平分Tabbar

3. 自定义TabBarItem，可以传入图片和文字
  3.1 定义TabBarItem，并且定义两个插槽：图片、文字
  3.2 给两个插槽外层包装div，用于设置样式。
  3.3 填充插槽，实现底部TabBar的效果


## 轮播图实现思路

# 回顾：
offsetWidth 和 offsetHeight
1. 检测盒子的宽高
2. 包括宽高本身、padding、border，但不包括margin

offsetLeft 和 offsetTop
1. 检测 距离 父盒子（有定位的） 左/上 面的距离，返回距离上级盒子（带有定位）左边的距离
2. 如果父级都没有定位则以body为准
3. offsetLeft从父盒子的padding开始算，父盒子的border不算，在父盒子有定位的情况下，
  offsetLeft === style.left (去掉px)

offsetParent
1. 检测父系盒子中带有定位的节点
2. 父系盒子中都没有定位，则返回body为准
3. 有定位则返回最近的那个

# 过度属性详解
1. 过度属性
  transition-property: width;
2. 过渡持续时间
  transition-duration: 4s;
3. 运动曲线
  linear 线性   ease/ ease-in/ ease-out/ ease-in-out(先加速后减速)
  transition-timing-function: ease-in-out;
4. 过渡延迟
  transition-delay: 1s;
  
如果多个过度的特性是一样的，可以简写

transition: 过渡属性 持续时间 速度曲线（linear/匀速） 延迟时间
transition: width 4s ease-in-out 0s;
transition: all 2s;

transform: rotateX(360 deg);    //以x轴为轴心旋转
transform: translateX(300px);   //盒子沿
transition: transform 2s;

# 需求：1、图片自动轮播，无缝滚动；2、鼠标放到轮播图上点击拖动向左向右滑动
轮播思路：
1. 复制第一张图片放到ul最后
2. 当图片切换到第四张的时候，直接切换到第五张，（复制的那张）
3. 再次从第一张切换到第二张的时候，先瞬间转到第一张图，再滑动到第二张图,实现无缝滚动
步骤：
1. 获取事件源及相关元素 handleDom,
2. 复制最后一张图片、第一张图片所在的节点，添加到.swiper的首、尾位置
3. 给.indicator中添加li，.swiper中的个数-2，并点亮第一个按钮
4. 添加定时器setTimeout
5. 自动开始轮播,changeItem(num)
6. 拖动轮播图向左向右滑动
  6.1. 拖动事件处理：
    6.1.1 touchStart：判断是否在滚动轮播，是则不能拖动并停止下面的操作。否则停止计时器，保存开始拖动的位置startX
    6.1.2 touchMove：保存拖动结束时候的位置currentX，计算用户拖动的距离distance。声明当前图片移动的距离currentPosition。当前的拖动位置为moveDistance
    6.1.3 touchEnd：判断当前拖动的距离distance是否大于0，且获取的移动距离currentMove大于盒子的1/4，则向右滑动，反之向左滑。盒子移动到正确的位置scrollContent()，然后重新开启定时器。

## ref 
1. 一般绑定在子组件上，父组件获取子组件上的元素
2. ref如果是绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象
3. ref如果是绑定在普通的元素中，那么通过this.$refs.refname获取到的是一个元素对象

## props的属性绑定
:probe-type="3"， 前面不加冒号的话，后面的3会被当成是字符串，此处我们需要的是一个number。


### Home.vue 
## 一、FeatureView
1. 独立组件封装FeatureView
div > a > img

## 二、TabControl
# 独立组件的封装
1. props > titles --> :titles (组件中的所有props中的数据，都通过父组件传给子组件，props里面的值与v-bind配合使用)
2. div > 根据 title v-for 遍历 div > span {{item}
3. css相关 flex布局 
4. 选中哪个tab，哪个tab的文字改变颜色。文字下面横线border-bottom

## 三、首页商品数据的请求
1. 设计数据结构，用于保存数据
  home.vue > data（）{
    goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      }
  }

2. 发送数据请求
  · 在home.js中，封装getHomeGoods
  · 在Home.vue中，又在methods中 getHomeGoods(type)
  · 调用getHomeGoods('pop')/ getHomeGoods('new')/ getHomeGoods('sell')
    page：动态获取的page
  · 获取到数据：res
    · this.goods[type].list.push(..res.data.list)
    · this.goods[type].page += 1  

## 四、对商品数据进行展示
1. 封装GoodsList.vue
  · props: goods -> list[30]  (home.vue中data()中的goods传值到GoodsList，然后v-for)
  · v-for goods -> GoodsListItem[30]
  · GoodsListItem(组件) -> GoodsItem(数据)

2. 封装GoodsListItem.vue组件
  · props: goodsItem
  · goodsItem取出数据，并且使用正确的div、span、img基本标签进行展示

### 五、对滚动进行重构：Better-Scroll
5.1 在index.html中使用better-scroll
  · const bscroll = new BScroll(el, {})
  · 注意：样式 wrapper -> content -> 内容

  · 1. 监听滚动
      probeType:0/1/2(手指滚动)/3(只要滚动)
  · 2. 上拉加载
      pullUpLoad:true
      bscroll.on('pullingup',()=>{})
  · 3. click: false
      button 可以监听点击
      div不可以

5.2 在vue项目中使用Better-Scroll
  ·在Profile.vue中简单演示
  ·对Better-Scroll进行封装
  ·Home.vue和scroll.vue之间进行通讯
    ·Home.vue将probeType设置为3
    ·Scroll.vue需要通过$emit，实时将事件发送到Home.vue

### 六、回到顶部按钮TopClick
6.1 对TopClick.vue组件的封装 

6.2 如何监听组件的点击
  ·直接监听back-top的点击
      监听需要添加.native
  ·回到顶部
      scroll对象，scrollTo(x,y,time)
      this.$ref.scroll.scroll(0,0,500)

6.3 BackTop组件的显示和隐藏
  ·isShowBackTop：false -- 隐藏
  ·监听滚动，拿到滚动的位置：
      -position.y >1000 --> isShowBackTop:true
      isShowBackTop = -positiony > 1000


### 七、解决首页中Better-Scroll可滚动区域的问题
1. 问题分析
    ·Better-Scroll在决定有多少区域可以滚动时，是根据scrollerHeight属性决定
    ·scrollerHeight属性，是根据放Better-Scroll的content中的子组件的高度
    ·但是我们的首页中，刚开始计算scrollerHeight属性时，是没有讲图片计算在内的
    ·所以，计算出来的数据告诉我们是错误的（1300+）
    ·后来图片加载进来后，有了新的高度，但是scrollerHeight属性并有进行更新，所以出现了滚动错误
2. 解决问题
    ·监听每一张图片(GoodsListItem)是否加载完成，只要有一张图片加载完成了，执行一次refresh()
    ·如何监听图片加载完成：
      原生的js监听图片：img.onload = function() {}
      vue中监听：@load='方法'
    ·调用scroll的refresh()
3. 将GoodsListItem.vue中的事件传入到home.vue中
    ·因为涉及到非父子组件的通信，所以选择了事件总线。
      bus ：总线
      Vue.prototype.bus = new Vue()  -- main.js
      this.bus.emit('事件名称'，参数)  -- GoodsListItem.vue
      this.bus.on('事件名称'， 回调函数(参数))  --Home.vue

4. 对于refresh非常频繁的问题，进行防抖操作
    ·防抖debounce/节流throttle
    ·防抖函数起作用的过程：
      1.如果我们直接执行refresh，那么refresh函数会执行30次
      2.可以将refresh函数传入到debounce函数中，生成一个新的函数
      3.之后在调用非常频繁的时候，就使用新生成的函数
      4.而新生成的函数则不会频繁调用，如果下一次执行来的非常快，那么会将上一次取消掉

      ```
      debounce(func, delay) {
        let timer = null
        return function(...args) {
          if(timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      }
      ```

### 八、上拉加载更多的功能

### 九、tabControl的吸顶效果
9.1 获取到tabControl的offsetTop
  ·必须知道滚动到多少时，开始有吸顶效果，这个时候就需要获取tabControl的offsetTop
  ·直接到mounted中获取tabControl的offsetTop的值是不准确的，因为图片组件等还没加载完成
  ·获取正确的值：
    监听HomeSwiper的img的加载完成
    加载完成后，发出事件$emit，在Home.vue中获取正确的值
      为了不让HomeSwiper多次发出事件
      可以使用isLoad的变量进行状态的记录
    注意：这里不进行多次调用和debounce的区别 

9.2 监听滚动，动态的改变tabControl的样式
  ·问题：动态的改变tabControl的样式时，会出现两个问题：
    问题一：下面的商品内容，会突然往上移
    问题二：tabControl虽然设置了fixed，但是也随着Better-Scroll一起滚了出去
  ·其他方案解决停留问题
    在最上面，多复制一份TabControl组件对象，利用它来实现停留效果
    当用户滚动页面到一定位置时，TabControl显示出来，否则隐藏起来。

### 十、点击页面切换后，home页保持原来的状态
10.1 让Home不要随意销毁
  ·在home.vue下面插入一个destroyed（）方法属性
  ·在app.vue中的router-view标签外包裹一个keep-alive的标签
10.2 让Home中的内容保持原来的位置
  ·离开时，保存一个位置信息saveY
  ·进来时，将位置设置为原来保存的位置saveY信息即可
    ·注意：最好回来的时候，进行一次refresh()




  
































