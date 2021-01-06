// 阻止textarea失效问题
export function preventTab (e) {
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
export function debounce (fn, timeout, scope) {
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
export function throttle (fn, threshold, scope) {
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
export function copyText (text) {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', text);
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    console.log('复制成功');
  }
}