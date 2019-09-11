export function debounce(func, delay) { //func指传入的为函数，这里指refresh()的函数，delay为时间
  let timer = null;
  return function (...args) { //"..."表示能传入多个参数
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}