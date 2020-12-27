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
</style>
<template>
  <div class="top">
    <i
      v-for="(item, i) in icon"
      :key="i"
      :class="`iconfont
      ${item.iconClass}`"
      @click="fun(item.FUN)"
    />
  </div>
</template>
<script>
import { ref, watchEffect } from 'vue'
import { icon } from '../until/constant.js'
export default {
  name: 'ToolBar',
  props: {
    text: String,
  },
  setup(props) {
    const lowerCase = () => {
      // console.log('小写转换', text.value)
      console.log(props.text)
    }
    return {
      fun(funName) {
        switch (funName) {
          case 'lowerCase':
            lowerCase()
            break
          default:
            break
        }
      },
      icon,
    }
  },
}
</script>