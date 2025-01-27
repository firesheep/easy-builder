import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEditorStore = defineStore('editor', () => {
  const components = ref([])
  const currentComponent = ref(null)
  const undoStack = ref([])
  const redoStack = ref([])
  const canvasConfig = ref({
    width: 1200,
    height: 800,
    backgroundColor: '#ffffff'
  })

  const canUndo = computed(() => undoStack.value.length > 0)
  const canRedo = computed(() => redoStack.value.length > 0)

  function addComponent(component) {
    saveState()
    components.value.push(component)
  }

  function updateComponent(component) {
    saveState()
    const index = components.value.findIndex(c => c.id === component.id)
    if (index !== -1) {
      components.value[index] = component
    }
  }

  function removeComponent(componentId) {
    saveState()
    const index = components.value.findIndex(c => c.id === componentId)
    if (index !== -1) {
      components.value.splice(index, 1)
    }
  }

  function selectComponent(componentId) {
    currentComponent.value = components.value.find(c => c.id === componentId) || null
  }

  function saveState() {
    undoStack.value.push(JSON.stringify(components.value))
    redoStack.value = []
  }

  function undo() {
    if (canUndo.value) {
      const lastState = undoStack.value.pop()
      redoStack.value.push(JSON.stringify(components.value))
      components.value = JSON.parse(lastState)
    }
  }

  function redo() {
    if (canRedo.value) {
      const nextState = redoStack.value.pop()
      undoStack.value.push(JSON.stringify(components.value))
      components.value = JSON.parse(nextState)
    }
  }

  return {
    components,
    currentComponent,
    canUndo,
    canRedo,
    addComponent,
    updateComponent,
    removeComponent,
    selectComponent,
    undo,
    redo
  }
})