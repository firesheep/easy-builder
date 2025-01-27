<template>
  <div class="preview-page">
    <div class="preview-toolbar">
      <el-button @click="$router.back()">返回</el-button>
      <el-button type="primary" @click="handlePublish">发布</el-button>
    </div>
    <div class="preview-content">
      <!-- 这里渲染预览内容 -->
      <component v-for="component in components" :key="component.id" :is="component.type" v-bind="component.props"
        :style="component.style" />
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'PreviewPage',
    setup() {
      const components = ref([])

      const handlePublish = () => {
        // 实现发布逻辑
      }

      return {
        components,
        handlePublish
      }
    }
  })
</script>

<style lang="scss" scoped>
  .preview-page {
    height: 100vh;
    display: flex;
    flex-direction: column;

    .preview-toolbar {
      padding: 12px 20px;
      border-bottom: 1px solid #dcdfe6;
      background-color: #fff;
    }

    .preview-content {
      flex: 1;
      padding: 20px;
      overflow: auto;
    }
  }
</style>