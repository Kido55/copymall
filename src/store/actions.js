export default {
  addCart(context, payload) {
    // payload:指新添加的商品
    // 判断新加入的商品payload.iid是否等于购物车中商品列表数组中的item.iid
    // 数组常用的方法：pop/push/shift/unshift/map/reverse/sort/filter/reduce/join 
    // 方法一
    // const oldProduct = null;
    // for(let item of carList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }

    // 方法二
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if (oldProduct) {
      // oldProduct.count += 1
      context.commit('addCounter', oldProduct)
    } else {
      payload.count = 1;
      // context.state.cartList.push(payload);
      context.commit('addToCart', payload)
    }
  }
}