<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="item.id" :class="{active: index === currentIndex}" class="tab-control-item" @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {   //当默认值是对象或者数组的时候，default需要是函数
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0   //当前title的索引，上拉加载更多loadMore，需要根据当前索引进行加载
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
     height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }
  
  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint)
  }
</style>