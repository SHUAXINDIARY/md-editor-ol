<style lang="less" scoped>
.top {
  height: 5%;
  display: flex;
  align-items: center;
  text-indent: 10px;
  position: sticky;
  background-color: rgb(224, 224, 224);
  .iconfont {
    font-size: 25px;
    cursor: pointer;
  }
}
.link_panel {
  // padding: 20px;
  width: 350px;
  height: 200px;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 5px 0px;
  .header {
    padding: 11px 20px;
    font-size: 15px;
  }
  .item {
    margin-bottom: 20px;
    label {
      display: inline-block;
      font-size: 15px;
      width: 100px;
      text-align: center;
    }
    input {
      color: #999;
      padding: 8px;
      border: 1px solid #ddd;
    }
  }
  .btn {
    position: relative;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    button {
      margin-right: 20px;
      color: #666;
      min-width: 75px;
      cursor: pointer;
      background: #fff;
      padding: 7px 10px;
      border: 1px solid #ddd;
    }
  }
}
</style>
<template>
  <div class="link_panel" v-if="link.panel">
    <div class="header">添加连接</div>
    <div class="item">
      <label>链接标题</label>
      <input type="text" v-model="link.title" placeholder="链接标题" />
    </div>
    <div class="item">
      <label>链接地址</label>
      <input type="text" v-model="link.linking" placeholder="链接标题" />
    </div>
    <div class="btn">
      <button @click="add">添加</button>
      <button @click="link.panel = false">关闭</button>
    </div>
  </div>
  <div class="top">
    <i
      v-for="(item, i) in icon"
      :key="i"
      :title="item.title"
      :class="`iconfont
      ${item.iconClass}`"
      @click="feature[item.FUN]"
    />
  </div>
</template>
<script>
import { reactive, ref, watchEffect } from "vue";
import { editorEvent } from "../until/constant.js";
import { icon } from "../until/constant.js";
export default {
  name: "ToolBar",
  emits: [editorEvent.RESETTEXT],
  props: {
    // 接受选中的值
    selected: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const link = reactive({
      panel: false,
      title: "",
      linking: "",
    });
    const add = () => {
      let result = `[${link.title}](${link.linking})`;
      console.log(result);
      context.emit(editorEvent.RESETTEXT, result);
    };
    let feature = {
      lowerCase: () => {
        let result = props.selected.toLowerCase();
        context.emit(editorEvent.RESETTEXT, result);
      },
      upperCase: () => {
        let result = props.selected.toUpperCase();
        context.emit(editorEvent.RESETTEXT, result);
      },
      bold: () => {
        let result = `**${props.selected}**`;
        context.emit(editorEvent.RESETTEXT, result);
      },
      markup: () => {
        let result = `> ${props.selected}`;
        context.emit(editorEvent.RESETTEXT, result);
      },
      italic: () => {
        let result = `*${props.selected}*`;
        context.emit(editorEvent.RESETTEXT, result);
      },
      headOne: () => {
        let result = `# ${props.selected}`;
        context.emit(editorEvent.RESETTEXT, result);
      },
      headTwo: () => {
        let result = `## ${props.selected}`;
        context.emit(editorEvent.RESETTEXT, result);
      },
      headThree: () => {
        let result = `### ${props.selected}`;
        context.emit(editorEvent.RESETTEXT, result);
      },
      headFour: () => {
        let result = `#### ${props.selected}`;
        context.emit(editorEvent.RESETTEXT, result);
      },
      headFive: () => {
        let result = `##### ${props.selected}`;
        context.emit(editorEvent.RESETTEXT, result);
      },
      headSix: () => {
        let result = `###### ${props.selected}`;
        context.emit(editorEvent.RESETTEXT, result);
      },
      link: () => {
        link.panel = true;
        console.log("链接");
      },
    };
    return {
      icon,
      feature,
      link,
      add,
    };
  },
};
</script>