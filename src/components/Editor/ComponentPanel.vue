<template>
  <div class="component-panel">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基础组件" name="basic">
        <div class="component-list">
          <div v-for="item in basicComponents" :key="item.type" class="component-item" draggable="true"
            @dragstart="handleDragStart($event, item)">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { componentList } from '@/config/componentList'

  const emit = defineEmits(['drag-start'])
  const activeTab = ref('basic')
  const basicComponents = componentList.filter(c => c.category === 'basic')

  const handleDragStart = (event, component) => {
    console.log('Drag start:', component)
    event.dataTransfer.setData('application/json', JSON.stringify(component))
    emit('drag-start', component)
  }
</script>