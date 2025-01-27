<template>
  <div class="editor-page">
    <div class="editor-header">
      <h2>低代码平台</h2>
      <div class="editor-toolbar">
        <el-button-group>
          <el-button @click="undo" :disabled="historyIndex <= 0">
            <el-icon>
              <Back />
            </el-icon> 撤销
          </el-button>
          <el-button @click="redo" :disabled="historyIndex >= history.length - 1">
            <el-icon>
              <Right />
            </el-icon> 重做
          </el-button>
        </el-button-group>

        <!-- 修改对齐工具组 -->
        <el-button-group v-if="selectedComponent">
          <el-button @click="alignComponents('left')">
            左对齐
          </el-button>
          <el-button @click="alignComponents('center')">
            居中
          </el-button>
          <el-button @click="alignComponents('right')">
            右对齐
          </el-button>
        </el-button-group>

        <el-button type="primary" @click="handleSave">
          <el-icon>
            <Download />
          </el-icon> 保存
        </el-button>
      </div>
    </div>

    <div class="editor-main">
      <!-- 左侧组件面板 -->
      <div class="component-panel">
        <h3>基础组件</h3>
        <el-card v-for="item in componentList" :key="item.type" class="component-item" draggable="true"
          @dragstart="handleDragStart($event, item)">
          <div class="component-item-content">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.label }}</span>
          </div>
        </el-card>
      </div>

      <!-- 中间画布 -->
      <div class="editor-canvas" @dragover.prevent @drop="handleDrop" @click="handleCanvasClick">
        <div class="canvas-container">
          <div v-for="item in components" :key="item.id" class="canvas-component"
            :class="{ 'selected': selectedComponent?.id === item.id }" :style="item.style"
            @click.stop="handleComponentClick(item)" @mousedown="handleMouseDown($event, item)">
            <!-- 组件操作按钮 -->
            <div class="component-actions" v-show="selectedComponent?.id === item.id">
              <el-button-group>
                <el-tooltip content="上移一层">
                  <el-button size="small" @click.stop="adjustComponentLayer(item, 'up')">
                    <el-icon>
                      <Top />
                    </el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="下移一层">
                  <el-button size="small" @click.stop="adjustComponentLayer(item, 'down')">
                    <el-icon>
                      <Bottom />
                    </el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="删除">
                  <el-button type="danger" size="small" @click.stop="handleDeleteComponent(item.id)">
                    <el-icon>
                      <Delete />
                    </el-icon>
                  </el-button>
                </el-tooltip>
              </el-button-group>
            </div>

            <!-- 调整大小的手柄 -->
            <div v-if="selectedComponent?.id === item.id" class="resize-handles">
              <div v-for="handle in resizeHandles" :key="handle.position" class="resize-handle" :class="handle.position"
                @mousedown.stop="startResize($event, item, handle.position)" />
            </div>

            <!-- 组件内容 -->
            <el-button v-if="item.type === 'Button'" v-bind="item.props">
              {{ item.props.text }}
            </el-button>
            <el-input v-else-if="item.type === 'Input'" v-bind="item.props" />
          </div>
        </div>
      </div>

      <!-- 右侧属性面板 -->
      <div class="property-panel" v-if="selectedComponent">
        <h3>属性设置</h3>
        <el-form label-width="80px">
          <el-form-item label="文本" v-if="selectedComponent.type === 'Button'">
            <el-input v-model="selectedComponent.props.text" @input="handlePropChange" />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="selectedComponent.props.type" @change="handlePropChange">
              <el-option label="主要" value="primary" />
              <el-option label="成功" value="success" />
              <el-option label="警告" value="warning" />
              <el-option label="危险" value="danger" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import {
    Back, Right, Download, Delete, Top, Bottom
  } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'

  // 组件列表配置
  const componentList = ref([
    {
      type: 'Button',
      label: '按钮',
      icon: 'Pointer',
      defaultProps: {
        type: 'primary',
        text: '按钮',
        size: 'default'
      },
      defaultStyle: {
        width: 'auto',
        height: 'auto'
      }
    },
    {
      type: 'Input',
      label: '输入框',
      icon: 'Edit',
      defaultProps: {
        placeholder: '请输入',
        clearable: true
      },
      defaultStyle: {
        width: '200px'
      }
    }
  ])

  // 状态管理
  const components = ref([])
  const selectedComponent = ref(null)
  const clipboardComponent = ref(null)
  const history = ref([])
  const historyIndex = ref(-1)
  const isDragging = ref(false)
  const dragStartPos = ref({ x: 0, y: 0 })
  const dragStartStyle = ref(null)

  // 调整大小的手柄配置
  const resizeHandles = [
    { position: 'nw' }, { position: 'n' }, { position: 'ne' },
    { position: 'w' }, { position: 'e' },
    { position: 'sw' }, { position: 's' }, { position: 'se' }
  ]

  // 历史记录管理
  const saveHistory = () => {
    if (historyIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, historyIndex.value + 1)
    }
    history.value.push(JSON.stringify(components.value))
    historyIndex.value++
  }

  const undo = () => {
    if (historyIndex.value > 0) {
      historyIndex.value--
      components.value = JSON.parse(history.value[historyIndex.value])
    }
  }

  const redo = () => {
    if (historyIndex.value < history.value.length - 1) {
      historyIndex.value++
      components.value = JSON.parse(history.value[historyIndex.value])
    }
  }

  // 组件拖拽
  const handleDragStart = (event, component) => {
    event.dataTransfer.setData('application/json', JSON.stringify(component))
  }

  const handleDrop = (event) => {
    const componentData = JSON.parse(event.dataTransfer.getData('application/json'))

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newComponent = {
      id: Date.now(),
      type: componentData.type,
      props: { ...componentData.defaultProps },
      style: {
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        ...componentData.defaultStyle
      }
    }

    components.value.push(newComponent)
    saveHistory()
  }

  // 组件选择和删除
  const handleComponentClick = (component) => {
    selectedComponent.value = component
  }

  const handleCanvasClick = () => {
    selectedComponent.value = null
  }

  const handleDeleteComponent = (id) => {
    const index = components.value.findIndex(c => c.id === id)
    if (index !== -1) {
      components.value.splice(index, 1)
      if (selectedComponent.value?.id === id) {
        selectedComponent.value = null
      }
      saveHistory()
    }
  }

  // 组件移动
  const handleMouseDown = (event, component) => {
    if (event.target.closest('.component-actions') ||
      event.target.closest('.resize-handle')) return

    isDragging.value = true
    dragStartPos.value = {
      x: event.clientX,
      y: event.clientY
    }
    dragStartStyle.value = { ...component.style }

    const handleMouseMove = (e) => {
      if (!isDragging.value) return

      const dx = e.clientX - dragStartPos.value.x
      const dy = e.clientY - dragStartPos.value.y

      const left = parseInt(dragStartStyle.value.left) + dx
      const top = parseInt(dragStartStyle.value.top) + dy

      component.style.left = `${left}px`
      component.style.top = `${top}px`
    }

    const handleMouseUp = () => {
      isDragging.value = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      saveHistory()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // 组件对齐
  const alignComponents = (type) => {
    if (!selectedComponent.value) return

    const canvasRect = document.querySelector('.canvas-container').getBoundingClientRect()
    const componentRect = document.querySelector('.selected').getBoundingClientRect()

    switch (type) {
      case 'left':
        selectedComponent.value.style.left = '0px'
        break
      case 'center':
        selectedComponent.value.style.left = `${(canvasRect.width - componentRect.width) / 2}px`
        break
      case 'right':
        selectedComponent.value.style.left = `${canvasRect.width - componentRect.width}px`
        break
    }

    saveHistory()
  }

  // 组件层级调整
  const adjustComponentLayer = (component, direction) => {
    const index = components.value.findIndex(c => c.id === component.id)
    if (index === -1) return

    if (direction === 'up' && index < components.value.length - 1) {
      [components.value[index], components.value[index + 1]] =
        [components.value[index + 1], components.value[index]]
    } else if (direction === 'down' && index > 0) {
      [components.value[index], components.value[index - 1]] =
        [components.value[index - 1], components.value[index]]
    }

    saveHistory()
  }

  // 组件大小调整
  const startResize = (event, component, position) => {
    event.stopPropagation()
    const startX = event.clientX
    const startY = event.clientY
    const startWidth = parseInt(component.style.width) || 0
    const startHeight = parseInt(component.style.height) || 0
    const startLeft = parseInt(component.style.left)
    const startTop = parseInt(component.style.top)

    const handleMouseMove = (e) => {
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      if (position.includes('e')) component.style.width = `${Math.max(startWidth + dx, 20)}px`
      if (position.includes('w')) {
        const newWidth = Math.max(startWidth - dx, 20)
        component.style.width = `${newWidth}px`
        component.style.left = `${startLeft + (startWidth - newWidth)}px`
      }
      if (position.includes('s')) component.style.height = `${Math.max(startHeight + dy, 20)}px`
      if (position.includes('n')) {
        const newHeight = Math.max(startHeight - dy, 20)
        component.style.height = `${newHeight}px`
        component.style.top = `${startTop + (startHeight - newHeight)}px`
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      saveHistory()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // 复制粘贴功能
  const handleKeyDown = (event) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case 'z':
          if (event.shiftKey) {
            redo()
          } else {
            undo()
          }
          event.preventDefault()
          break
        case 'y':
          redo()
          event.preventDefault()
          break
        case 'c':
          if (selectedComponent.value) {
            clipboardComponent.value = JSON.parse(JSON.stringify(selectedComponent.value))
            ElMessage.success('已复制')
          }
          event.preventDefault()
          break
        case 'v':
          if (clipboardComponent.value) {
            const newComponent = JSON.parse(JSON.stringify(clipboardComponent.value))
            newComponent.id = Date.now()
            newComponent.style.left = `${parseInt(newComponent.style.left) + 20}px`
            newComponent.style.top = `${parseInt(newComponent.style.top) + 20}px`
            components.value.push(newComponent)
            saveHistory()
            ElMessage.success('已粘贴')
          }
          event.preventDefault()
          break
        case 's':
          handleSave()
          event.preventDefault()
          break
      }
    } else if (event.key === 'Delete' && selectedComponent.value) {
      handleDeleteComponent(selectedComponent.value.id)
    }
  }

  // 保存功能
  const handleSave = async () => {
    try {
      // 这里添加实际的保存逻辑
      console.log('保存的数据:', components.value)
      ElMessage.success('保存成功')
    } catch (error) {
      console.error('保存失败:', error)
      ElMessage.error('保存失败')
    }
  }

  // 生命周期钩子
  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
    saveHistory() // 保存初始状态
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
</script>

<style lang="scss" scoped>
  .editor-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;
  }

  .editor-header {
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    h2 {
      margin: 0;
      color: #303133;
      font-weight: 500;
    }

    .editor-toolbar {
      display: flex;
      gap: 12px;
      align-items: center;

      .el-button {
        display: flex;
        align-items: center;
        gap: 4px;

        .el-icon {
          margin-right: 4px;
        }
      }

      .el-button-group {
        .el-button {
          padding: 8px 12px;
        }
      }
    }
  }

  .editor-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .component-panel {
    width: 250px;
    background-color: #fff;
    border-right: 1px solid #dcdfe6;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    h3 {
      margin: 0 0 20px 0;
      color: #303133;
      font-weight: 500;
    }

    .component-item {
      margin-bottom: 12px;
      cursor: move;
      transition: all 0.3s;

      &:hover {
        border-color: #409eff;
        transform: translateY(-1px);
      }

      .component-item-content {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;

        .el-icon {
          font-size: 16px;
        }
      }
    }
  }

  .editor-canvas {
    flex: 1;
    padding: 20px;
    overflow: auto;
    background-color: #f5f7fa;
    position: relative;

    .canvas-container {
      width: 1200px;
      height: 800px;
      margin: 0 auto;
      background-color: #fff;
      position: relative;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .canvas-component {
      position: absolute;
      padding: 2px;
      border: 1px solid transparent;
      cursor: move;
      user-select: none;

      &.selected {
        border-color: #409eff;
        z-index: 2;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          border: 1px solid #409eff;
        }
      }

      .component-actions {
        position: absolute;
        right: -90px;
        top: 0;
        display: flex;
        gap: 4px;
        z-index: 3;
      }

      .resize-handles {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;

        .resize-handle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: white;
          border: 1px solid #409eff;
          border-radius: 50%;
          pointer-events: all;
          z-index: 3;

          &:hover {
            background: #409eff;
          }

          &.nw {
            top: -4px;
            left: -4px;
            cursor: nw-resize;
          }

          &.n {
            top: -4px;
            left: 50%;
            transform: translateX(-50%);
            cursor: n-resize;
          }

          &.ne {
            top: -4px;
            right: -4px;
            cursor: ne-resize;
          }

          &.w {
            top: 50%;
            left: -4px;
            transform: translateY(-50%);
            cursor: w-resize;
          }

          &.e {
            top: 50%;
            right: -4px;
            transform: translateY(-50%);
            cursor: e-resize;
          }

          &.sw {
            bottom: -4px;
            left: -4px;
            cursor: sw-resize;
          }

          &.s {
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);
            cursor: s-resize;
          }

          &.se {
            bottom: -4px;
            right: -4px;
            cursor: se-resize;
          }
        }
      }
    }
  }

  .property-panel {
    width: 300px;
    background-color: #fff;
    border-left: 1px solid #dcdfe6;
    padding: 20px;
    overflow-y: auto;

    h3 {
      margin: 0 0 20px 0;
      color: #303133;
      font-weight: 500;
    }

    .el-form-item {
      margin-bottom: 18px;
    }
  }

  // 动画效果
  .canvas-component {
    transition: border-color 0.3s;
  }

  .component-actions {
    transition: opacity 0.3s;
  }

  // 响应式调整
  @media (max-width: 1400px) {
    .component-panel {
      width: 200px;
    }

    .property-panel {
      width: 250px;
    }

    .canvas-container {
      width: 1000px;
    }
  }

  // 滚动条美化
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;

    &:hover {
      background: #a8a8a8;
    }
  }
</style>