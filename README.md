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


##

































