<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/images/cart/tick.svg" alt=""> 
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button {
    border: 2px solid #aaa;
    border-radius: 50%;
  }

  .check {
    background-color: red;
    border-color: red;
  }
</style>