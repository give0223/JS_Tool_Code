//throttle【節流概念,事件結束or更新時間後必定做一次】
//fun:傳入function, wait:基本更新頻率, limit:最大必須更新時間, immediate:是否先執行
function throttle(fun, {
  wait = 1000 / 30,
  limit = 200,
  immediate = false
}) {
  let timer; //計時器
  let startTime = null; //起始時間

  return function () {
    let context = this;
    let args = arguments; //參數
    let currentTime = new Date().getTime(); //當前時間

    if (startTime === null) {
      if (!immediate) {
        startTime = currentTime;
      } else {
        startTime = currentTime - limit;
      }
    }

    let waitfun = function () {
      fun.apply(context, args);
      startTime = null;
    }

    clearTimeout(timer);

    //如果有給最大更新時間&現在時間-起始時間>=最大更新時間
    if (limit && currentTime - startTime >= limit) {
      fun.apply(context, args);
      startTime = currentTime;
    } else {
      timer = setTimeout(waitfun, wait)
    }
  }
}