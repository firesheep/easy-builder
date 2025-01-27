<template>
  <div class="editor-toolbar">
    <div class="left">
      <el-button-group>
        <el-button :icon="Back" @click="$emit('undo')" :disabled="!canUndo">
          撤销
        </el-button>
        <el-button :icon="Right" @click="$emit('redo')" :disabled="!canRedo">
          重做
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-input v-model="pageTitle" placeholder="页面标题" style="width: 200px" @change="handleTitleChange" />
    </div>

    <div class="right">
      <el-button-group>
        <el-button @click="$emit('save')">
          <el-icon>
            <Document />
          </el-icon>
          保存
        </el-button>
        <el-button type="primary" @click="$emit('preview')">
          <el-icon>
            <View />
          </el-icon>
          预览
        </el-button>
        <el-button type="success" @click="$emit('publish')">
          <el-icon>
            <Upload />
          </el-icon>
          发布
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, watch } from 'vue'
  import { Back, Right, Document, View, Upload } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'EditorToolbar',
    props: {
      canUndo: Boolean,
      canRedo: Boolean,
      currentPage: {
        type: Object,
        required: true
      }
    },
    emits: ['save', 'preview', 'publish', 'undo', 'redo', 'update:currentPage'],
    setup(props, { emit }) {
      const pageTitle = ref(props.currentPage.title)

      watch(() => props.currentPage.title, (newTitle) => {
        pageTitle.value = newTitle
      })

      const handleTitleChange = (value) => {
        emit('update:currentPage', {
          ...props.currentPage,
          title: value
        })
      }

      return {
        pageTitle,
        handleTitleChange,
        Back,
        Right,
        Document,
        View,
        Upload
      }
    }
  })
</script>

<style lang="scss" scoped>
  .editor-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid #dcdfe6;
    background-color: #fff;

    .left,
    .right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }
</style>