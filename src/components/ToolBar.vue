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
import { icon } from '../until/constant.js'
import { saveFile, exportImg } from '../until/tools.js'
import { nextTick, reactive, ref, watch, watchEffect } from 'vue'
export default {
  name: 'ToolBar',
  emits: ['resetText', 'getAllText', 'getMdDom'],
  props: {
    // 接受选中的值
    selected: {
      type: String,
      required: true,
    },
    // 接受渲染后的dom
    targetDom: {
      type: Object,
    },
  },
  setup(props, context) {
    // 添加连接面板
    const link = reactive({
      panel: false,
      title: '',
      linking: '',
    })
    // 添加连接面板
    const add = () => {
      let result = `[${link.title}](${link.linking})`
      context.emit('resetText', result)
      link.panel = false
    }
    const demoRef = ref(null)
    // 功能键操作
    let feature = {
      lowerCase: () => {
        let result = props.selected.toLowerCase()
        context.emit('resetText', result)
      },
      upperCase: () => {
        let result = props.selected.toUpperCase()
        context.emit('resetText', result)
      },
      bold: () => {
        let result = `**${props.selected}**`
        context.emit('resetText', result)
      },
      markup: () => {
        let result = `> ${props.selected}`
        context.emit('resetText', result)
      },
      italic: () => {
        let result = `*${props.selected}*`
        context.emit('resetText', result)
      },
      headOne: () => {
        let result = `# ${props.selected}`
        context.emit('resetText', result)
      },
      headTwo: () => {
        let result = `## ${props.selected}`
        context.emit('resetText', result)
      },
      headThree: () => {
        let result = `### ${props.selected}`
        context.emit('resetText', result)
      },
      headFour: () => {
        let result = `#### ${props.selected}`
        context.emit('resetText', result)
      },
      headFive: () => {
        let result = `##### ${props.selected}`
        context.emit('resetText', result)
      },
      headSix: () => {
        let result = `###### ${props.selected}`
        context.emit('resetText', result)
      },
      link: () => {
        link.panel = true
        link.title = props.selected
        console.log('链接')
      },
      strikethrough: () => {
        let result = `~~${props.selected}~~`
        context.emit('resetText', result)
      },
      list: () => {
        let textArr = props.selected.split('\n')
        let result = textArr
          .map((item) => {
            // 判断item是否是换行符
            return item.length ? `- ${item}` : item
          })
          .join('\n')
        context.emit('resetText', result)
      },
      orderList: () => {
        let textArr = props.selected.split('\n')
        let index = 1
        let result = textArr
          .map((item) => {
            // 判断item是否是换行符
            return item.length ? `${index++}. ${item}` : item
          })
          .join('\n')
        context.emit('resetText', result)
      },
      // 导出md
      exportMD: () => {
        context.emit('getAllText')
        nextTick(() => {
          saveFile(props.selected, 'md')
        })
      },
      // 导出图片
      exportImg: () => {
        exportImg(props.targetDom)
      },
    }
    watch(
      () => {
        return link.panel
      },
      (val) => {
        if (val) return false
        link.title = ''
        link.linking = ''
      }
    )
    return {
      add,
      link,
      icon,
      feature,
    }
  },
}
</script>