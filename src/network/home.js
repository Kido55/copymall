import {request} from './request';

// 请求多个数据
export function getHomeMultidata() {
  return request({
    url: '/api/v1/home/multidata'
  })
}
// 获取商品数据
export function getHomeGoods(type,page) {
  return request({
    url: '/api/v1/home/data',
    params: {   //子元素往父元素传值
      type,   //种类
      page    //页码
    }
  })
}

// 函数调用 --> 压入函数栈（保存函数调用过程中所有变量）
// 函数调用结束 --> 弹出函数栈（释放函数所有变量）
// 此时需要创建一个空数组，用作保存函数
// function test() {
//   const name = ['why','aaa']
// }

// test();
// test();