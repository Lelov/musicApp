// ajax请求
// export default function ajax(url, methods = 'get', fn) {
//   // 获取XMLHttpRequest对象
//   const ajax = new XMLHttpRequest()
//   ajax.open(methods, url)
//   ajax.send()
//   ajax.onreadystatechange = () => {
//     // 判断是否成功发送请求
//     if (ajax.readyState !== 4) return
//     // 获取状态码信息
//     if (ajax.status !== 200) return
//     const res = JSON.parse(ajax.responseText)
//     fn && fn(res)
//   }
// }
export default function ajax(url, methods = 'get') {
  return new Promise((resolve, reject) => {
    // 获取XMLHttpRequest对象
    const ajax = new XMLHttpRequest()

    ajax.onreadystatechange = () => {
      // 判断是否成功发送请求及状态码信息
      if (ajax.readyState === 4 && ajax.status === 200) {
        const res = JSON.parse(ajax.responseText)
        resolve(res)
      }
    }

    ajax.open(methods, url)
    ajax.send()
  })
}
