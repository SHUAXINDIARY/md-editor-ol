<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
  .top {
    height: 5%;
    display: flex;
    align-items: center;
    text-indent: 10px;
    position: sticky;
    background-color: rgb(224, 224, 224);
  }
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
    <div class="top">工具栏</div>
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
import "marked";
import DOMPurify from "dompurify";
import { reactive, render, watch } from "vue";
export default {
  name: "Editor",
  setup() {
    const textState = reactive({
      // 编辑器
      text: "",
      //   渲染后的md内容
      template: "",
    });
    const renderHtml = (val) => {
      // 防止XSS
      textState.template = DOMPurify.sanitize(marked(val));
    };
    // 阻止textarea失效问题
    const preventTab = (e) => {
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
    };
    // watchvue3写法
    watch(
      () => {
        return textState.text;
      },
      (val, oldVal) => {
        renderHtml(val);
      }
    );

    return {
      textState,
      renderHtml,
      preventTab
    };
  },
};
</script>