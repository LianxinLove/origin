// 校验
export function checkForm(formName, checkList) {
  const result = new Promise((res, rej) => {
    formName.value
      .validate()
      .then(() => {
        res();
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
  checkList.push(result);
}
// 防抖
export function debounce(fn, delay) {
  let time = null;
  let flag = true; //标识是不是第一次触发
  return function () {
    clearTimeout(time);
    if (flag) {
      fn.apply(this, arguments);
      flag = false;
    }
    time = setTimeout(() => {
      //触发定时器
      fn.apply(this, arguments);
      flag = true;
    }, delay);
  };
}
