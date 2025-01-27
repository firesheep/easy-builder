<template>
  <div class="home">
    <h1>低代码平台</h1>
    <div class="actions">
      <el-button type="primary" @click="$router.push('/editor')">
        创建新页面
      </el-button>
      <el-button @click="$router.push('/template-market')">
        模板市场
      </el-button>
    </div>
    <div class="recent-pages" v-if="recentPages.length">
      <h2>最近编辑</h2>
      <el-table :data="recentPages">
        <el-table-column prop="title" label="页面名称" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button-group>
              <el-button size="small" @click="editPage(row)">编辑</el-button>
              <el-button size="small" @click="previewPage(row)">预览</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'HomePage',
    setup() {
      const recentPages = ref([
        {
          id: 1,
          title: '示例页面',
          updateTime: '2024-01-20 12:00:00'
        }
      ])

      const editPage = (page) => {
        router.push(`/editor?id=${page.id}`)
      }

      const previewPage = (page) => {
        router.push(`/preview?id=${page.id}`)
      }

      return {
        recentPages,
        editPage,
        previewPage
      }
    }
  })
</script>

<style lang="scss" scoped>
  .home {
    padding: 40px;

    h1 {
      margin-bottom: 40px;
      text-align: center;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 40px;
    }

    .recent-pages {
      max-width: 800px;
      margin: 0 auto;

      h2 {
        margin-bottom: 20px;
      }
    }
  }
</style>