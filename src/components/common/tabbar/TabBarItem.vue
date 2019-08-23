<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem" ,
  props:{ 
    path:String,
    activeColor: {  //把activeColor的属性设定为一个字符串，方便后面使用，设置样式的颜色
      type:String,
      default: 'red'  //默认是为红色，可自由修改
    }
  },
  data() {
    return {
      // isActive:false,
      // path:'/home'
    }
  },
  computed: {   //计算属性：isActive动态决定item状态，activeStyle动态决定颜色控制
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {   //activeColor是绑定在App里的属性；动态判断isActive，是则使用activeColor的样式
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick() {
      this.$router.replace(this.path)
      // console.log('itemClick')
    }
  }
}
</script>

<style scoped>

.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>