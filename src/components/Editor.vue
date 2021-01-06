<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
  .bottom {
    display: flex;
    height: 95%;
    .left,
    .right {
      width: 50%;
      min-width: 500px;
      overflow-y: scroll;
      padding: 10px;
      //   自动换行
      word-wrap: break-word;
    }
    .left {
      background-color: lightcoral;
      resize: none;
      border: none;
      outline: none;
      font-size: 20px;
    }
  }
}
</style>
<template>
  <div class="main">
    <ToolBar :selected="textState.selected" @resetText="setTextState" />
    <div class="bottom">
      <textarea
        @keydown="getSelectedByKey"
        @click="getSelectedByMouse"
        class="left"
        v-model="textState.text"
      ></textarea>
      <div class="right markdown-body" v-html="textState.template"></div>
    </div>
  </div>
</template>
<script>
import 'marked'
import ToolBar from './ToolBar.vue'
import DOMPurify from 'dompurify'
import { preventTab } from '../until/tools.js'
import { reactive, render, watch } from 'vue'
export default {
  name: 'Editor',
  components: {
    ToolBar,
  },
  setup() {
    const textState = reactive({
      // 光标起始位置
      start: 0,
      // 光标结束位置
      end: 0,
      // 编辑器
      text: '',
      // 选中内容
      selected: '',
      //   渲染后的md内容
      template: '',
      // 缓存按键
      keyCache: [],
    })
    const renderHtml = (val) => {
      // 做转转义：防止XSS
      textState.template = DOMPurify.sanitize(marked(val))
    }
    // 接收处理完的字符串 重新替换字符串
    const setTextState = (recive) => {
      let origin = textState.text
      let start = textState.start,
        end = textState.end
      textState.text = `${origin.substring(0, start)}${recive}${origin.substr(
        start === end ? start : end
      )}`
      // 重置
      textState.start = 0
      textState.end = 0
      textState.selected = ''
    }
    // 获取选中的字符串 并记录光标位置
    const getSelectedByMouse = (e) => {
      // let origin = textState.text;
      textState.start = e.target.selectionStart
      textState.end = e.target.selectionEnd
      textState.selected = window.getSelection().toString()
    }
    // 判断键盘选择
    const getSelectedByKey = (e) => {
      textState.start = e.target.selectionStart - 1
      textState.end = e.target.selectionEnd - 1
      textState.selected = window.getSelection().toString()
      let code = e.keyCode
      // 17:ctrl
      // 67:c
      // 90:z
      // 65:a
      // 88:x
      console.log(`code=${code}`)
      switch (code) {
        // tab键
        case 9:
          preventTab(e)
          break
        // 回车
        case 13:
          // setTextState("\n");
          break
        default:
          break
      }
    }
    // watchvue3写法
    watch(
      () => {
        return textState.text
      },
      (val, oldVal) => {
        renderHtml(val)
      }
    )
    return {
      textState,
      renderHtml,
      setTextState,
      getSelectedByKey,
      getSelectedByMouse,
    }
  },
}
</script>