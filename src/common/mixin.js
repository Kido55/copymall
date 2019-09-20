import {debounce} from "./utils"
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener);
    // console.log("Mixin success");
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      showTopClick: false,
    }
  },
  methods: {
    topClick() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
}