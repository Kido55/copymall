##在github上新创建一个空仓库后,把文件与仓库地址绑定
```git remote add origin https://github.com/Kido55/copymall.git```
```git push -u origin master```

新项目
1.划分目录结构

2.引用了两个css文件

3.vue.config.js 和 .editorconfig

4.将项目的模块划分：tabbar -> 路由映射关系





##Tarbar的实现思路

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




































