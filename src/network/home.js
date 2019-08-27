import {request} from './request';

export function getHomeMultidata() {
  return request({
    url: '/api/v1/home/multidata'
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