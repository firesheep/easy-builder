<template>
  <div class="editor-canvas" @dragover.prevent @drop.prevent="handleDrop" @click="handleCanvasClick">
    <div class="canvas-container" :style="{ width: canvasWidth + 'px' }">
      <component-wrapper v-for="component in components" :key="component.id" :component="component"
        :is-selected="selectedId === component.id" @select="handleSelect" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import ComponentWrapper from './ComponentWrapper.vue'
  import { generateId } from '@/utils/index'

  const props = defineProps({
    components: {
      type: Array,
      required: true
    }
  })

  const emit = defineEmits(['add-component', 'select-component'])
  const canvasWidth = ref(1200)
  const selectedId = ref(null)

  const handleDrop = (event) => {
    try {
      const componentData = JSON.parse(event.dataTransfer.getData('application/json'))
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const newComponent = {
        id: generateId(),
        type: componentData.type,
        props: { ...componentData.defaultProps },
        style: {
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          ...componentData.defaultStyle
        }
      }

      emit('add-component', newComponent)
    } catch (error) {
      console.error('Error handling drop:', error)
    }
  }

  const handleCanvasClick = () => {
    selectedId.value = null
    emit('select-component', null)
  }

  const handleSelect = (componentId) => {
    selectedId.value = componentId
    emit('select-component', componentId)
  }
</script>