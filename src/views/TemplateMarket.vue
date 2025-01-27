<template>
  <div class="template-market">
    <h1>模板市场</h1>
    <div class="template-list">
      <el-card v-for="template in templates" :key="template.id" class="template-card">
        <img :src="template.thumbnail" class="template-image">
        <h3>{{ template.name }}</h3>
        <p>{{ template.description }}</p>
        <el-button type="primary" @click="useTemplate(template)">
          使用模板
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'TemplateMarket',
    setup() {
      const templates = ref([
        {
          id: 1,
          name: '后台管理模板',
          description: '包含常用的后台管理功能',
          thumbnail: ''
        }
      ])

      const useTemplate = (template) => {
        // 实现使用模板的逻辑
      }

      return {
        templates,
        useTemplate
      }
    }
  })
</script>

<style lang="scss" scoped>
  .template-market {
    padding: 20px;

    h1 {
      margin-bottom: 30px;
    }

    .template-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .template-card {
      .template-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
    }
  }
</style>