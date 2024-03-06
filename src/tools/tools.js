// 校验
export function checkForm(formName, checkList) {
  const result = new Promise((res, rej) => {
    formName.value
      .validate()
      .then(() => {
        res()
      })
      .catch((error) => {
        console.log('error', error)
      })
  })
  checkList.push(result)
}
// 防抖
export function debounce(fn, delay) {
  // 定时器
  let timer = null
  return function (...args) {
    const _this = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(_this, args)
    }, delay)
  }
}
