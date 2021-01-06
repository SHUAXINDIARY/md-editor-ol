// 阻止textarea失效问题
export function preventTab(e) {
  let dom = e.target;
  if (e.keyCode == 9) {
    e.preventDefault();
    var indent = "    ";
    var start = dom.selectionStart;
    var end = dom.selectionEnd;
    var selected = window.getSelection().toString();
    selected = indent + selected.replace(/\n/g, "\n" + indent);
    dom.value =
      dom.value.substring(0, start) + selected + dom.value.substring(end);
    dom.setSelectionRange(start + indent.length, start + selected.length);
  }
}
// 防抖
export function debounce(fn, timeout, scope) {
  if (typeof fn !== 'function') {
    throw Error('fn must be a function')
  }
  if (typeof timeout !== 'number') {
    throw Error('threshold must be a number')
  }
  let timer = null
  return function () {
    let context = scope || this,
      args = arguments;
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, timeout);
  }
}
// 节流
export function throttle(fn, threshold, scope) {
  if (typeof fn !== 'function') {
    throw Error('fn must be a function')
  }
  if (typeof threshold !== 'number') {
    throw Error('threshold must be a number')
  }
  let timer;
  return function () {
    let context = scope || this,
      args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, threshold);
    }
  };
}
// 复制文本
export function copyText(text) {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', text);
  input.setAttribute('id', 'copy');
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    console.log('复制成功');
  }
  document.body.removeChild(document.querySelector('#copy'))
}
// 获取光标所在行内容
// position：当前光标位置 text：全部文本
export function getRowContent(position, text) {
  if (typeof position !== 'number') {
    throw new Error("position must be a number")
  }
  if (typeof text !== 'string') {
    throw new Error("text must be a string")
  }
  let start = -1,
    end = -1
  // 找到光标所在行首 通过换行符判断
  for (let i = position; i >= 0; i--) {
    if (text[i] === '\n' || i === 0) {
      start = i
      break
    }
  }
  // 找到光标所在行尾
  for (let i = position; i < text.length; i++) {
    if (text[i] === '\n' || i === text.length - 1) {
      end = i
      break
    }
  }
  return {
    start, end
  }
}
// 下载文件
export function saveFile(fileStr, fileType) {
  // 创建a标签
  var A = document.createElement('a');
  //文件的名称为时间戳加文件名后缀
  A.download = `${+new Date()}.${fileType}`;
  A.style.display = 'none';
  //生成一个blob二进制数据，可以用来下载任何文本内容
  var blob = new Blob([fileStr]);
  //生成一个指向blob的URL地址，并赋值给a标签的href属性
  A.href = URL.createObjectURL(blob);
  document.body.appendChild(A);
  A.click();
  document.body.removeChild(A);
}