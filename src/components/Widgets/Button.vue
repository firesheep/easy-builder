<template>
  <el-button :type="type" :size="size" @click="handleClick">
    {{ text }}
  </el-button>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ButtonWidget',
    props: {
      type: {
        type: String,
        default: 'primary'
      },
      text: {
        type: String,
        default: '按钮'
      },
      size: {
        type: String,
        default: 'default'
      }
    },
    emits: ['click'],
    setup(props, { emit }) {
      const handleClick = (event) => {
        emit('click', event)
      }

      return {
        handleClick
      }
    }
  })
</script>