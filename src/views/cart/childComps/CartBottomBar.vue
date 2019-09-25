<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算: {{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from 'vuex'
import { log } from 'util';

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return  preValue + item.price * item.count;
          }, 0).toFixed(2)
      )
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false  //当购物车内为空的时候，不选中
      // 1.使用filter
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      // 2.使用find
      // return !this.$store.state.cartList.find(item => !item.checked)
      // 3.使用普通遍历
      for (let item of this.cartList) {   //遍历购物车内容，当有商品不选中，则全选按钮不选中
        if(!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {   //全部选中
        this.cartList.forEach(item => item.checked = false)
      }else{  //部分或全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll){
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 16px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 7px;
  width: 80px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  flex:1;
}

.calculate {
  width: 100px;
  background-color: orange;
  text-align: center;
}
</style>