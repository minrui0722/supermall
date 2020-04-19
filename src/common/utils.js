//=============防抖函数操作============
export function debounce(func,delay){
  let timer=null;
  return function (...args) {
    /*下一次请求过来的时候，判断之前是否有准备要做调用函数的定时器，如果有则清除*/
    if(timer) clearTimeout(timer);
    /*如果没有则重新设置定时器，并在规定的时间之后调用函数*/
    timer=setTimeout( ()=> {
      func.apply(this,args);
    },delay)
  }
}
/*=============格式化时间戳===============*/
export function formatDate(date,fmt) {
  /*
  * 1.利用正则表达式匹配年份
  * RegExp.$1表示匹配到的年份结果
  * date.getFullYear()获取到的是数字，加上空串“”，意思是将数字转换为字符串
  * substr(start,length)是截取子字符串
  * */
  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
  }/*2.利用正则表达式获取月份*/
  let o={
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),//考虑 h/H
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };
  for(let k in o){/*${k}表示正则表达式获取到的结果*/
    if(new RegExp(`(${k})`).test(fmt)){
      let str=o[k]+'';/*let o中的方法获取到的都是数字，加上空串“”表示将数字转换为字符串*/
      fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str));
    }
  }
  return fmt;
};
/*该函数用于保证时：分：秒一定是两位数*/
function padLeftZero(str) {
  /*如，传递过来的字符串为 3
  * '003'.substr(1)===03
  * 传递过来的是 03
  * '0003'.substr(2)===03
  * 传递过来的是003
  * '00003'.substr(3)===03
  * 传递过来的是 0003
  * '000003'.substr(4)===03
  * */
  return ('00'+str).substr(str.length);
};