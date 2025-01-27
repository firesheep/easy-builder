<template>
  <div class="event-config">
    <div v-for="event in events" :key="event.name" class="event-item">
      <span class="event-label">{{ event.label }}</span>
      <el-select v-model="eventHandlers[event.name]" placeholder="选择处理函数">
        <el-option v-for="handler in availableHandlers" :key="handler.value" :label="handler.label"
          :value="handler.value" />
      </el-select>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'EventConfig',
    props: {
      events: {
        type: Array,
        default: () => []
      }
    },
    setup(props, { emit }) {
      const eventHandlers = ref({})
      const availableHandlers = ref([
        { label: '弹出提示', value: 'showMessage' },
        { label: '页面跳转', value: 'navigate' },
        { label: '自定义函数', value: 'custom' }
      ])

      return {
        eventHandlers,
        availableHandlers
      }
    }
  })
</script>