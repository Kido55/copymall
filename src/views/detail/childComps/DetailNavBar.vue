<template>
  <div class="nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          :class="{active: index === currentIndex}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { log } from "util";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.back img{
  margin-top: 10px;
}

.title {
  display: flex;
  font-size: 16px;
  padding: 0 10px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}
</style>