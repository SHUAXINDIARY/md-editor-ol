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
    <ToolBar :text="textState.text"/>
    <div class="bottom">
      <textarea
        @keydown="preventTab"
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
      // 编辑器
      text: '',
      //   渲染后的md内容
      template: '',
    })
    const renderHtml = (val) => {
      // 防止XSS
      textState.template = DOMPurify.sanitize(marked(val))
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
      preventTab,
    }
  },
}
</script>