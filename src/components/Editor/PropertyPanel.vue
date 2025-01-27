<template>
  <div class="property-panel">
    <el-tabs v-model="activeTab">
      <!-- 样式配置 -->
      <el-tab-pane label="样式" name="style">
        <el-form label-width="80px">
          <el-form-item label="位置">
            <el-row :gutter="12">
              <el-col :span="12">
                <el-input-number v-model="style.left" :min="0" :step="1" @change="updateStyle('left')"
                  placeholder="X" />
              </el-col>
              <el-col :span="12">
                <el-input-number v-model="style.top" :min="0" :step="1" @change="updateStyle('top')" placeholder="Y" />
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="尺寸">
            <el-row :gutter="12">
              <el-col :span="12">
                <el-input-number v-model="style.width" :min="20" :step="1" @change="updateStyle('width')"
                  placeholder="宽" />
              </el-col>
              <el-col :span="12">
                <el-input-number v-model="style.height" :min="20" :step="1" @change="updateStyle('height')"
                  placeholder="高" />
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="背景色">
            <el-color-picker v-model="style.backgroundColor" @change="updateStyle('backgroundColor')" />
          </el-form-item>

          <el-form-item label="边框">
            <el-row :gutter="12">
              <el-col :span="8">
                <el-input-number v-model="style.borderWidth" :min="0" :step="1" @change="updateStyle('borderWidth')"
                  placeholder="宽度" />
              </el-col>
              <el-col :span="8">
                <el-select v-model="style.borderStyle" @change="updateStyle('borderStyle')">
                  <el-option label="实线" value="solid" />
                  <el-option label="虚线" value="dashed" />
                  <el-option label="点线" value="dotted" />
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-color-picker v-model="style.borderColor" @change="updateStyle('borderColor')" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 属性配置 -->
      <el-tab-pane label="属性" name="props">
        <component :is="propsConfigComponent" v-if="propsConfigComponent" :value="component.props"
          @update="updateProps" />
      </el-tab-pane>

      <!-- 事件配置 -->
      <el-tab-pane label="事件" name="events">
        <event-config :events="component.events" @update="updateEvents" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import EventConfig from './EventConfig.vue'

  const props = defineProps({
    component: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['update:component'])
  const activeTab = ref('style')
  const style = ref({ ...props.component.style })

  const propsConfigComponent = computed(() => {
    const type = props.component.type
    try {
      return require(`../Widgets/${type}Props.vue`).default
    } catch {
      return null
    }
  })

  const updateStyle = (key) => {
    const newComponent = {
      ...props.component,
      style: {
        ...props.component.style,
        [key]: style.value[key]
      }
    }
    emit('update:component', newComponent)
  }

  const updateProps = (newProps) => {
    const newComponent = {
      ...props.component,
      props: {
        ...props.component.props,
        ...newProps
      }
    }
    emit('update:component', newComponent)
  }

  const updateEvents = (newEvents) => {
    const newComponent = {
      ...props.component,
      events: newEvents
    }
    emit('update:component', newComponent)
  }
</script>

<style lang="scss" scoped>
  .property-panel {
    width: 300px;
    border-left: 1px solid #dcdfe6;
    background-color: #fff;
    height: 100%;
    overflow-y: auto;
    padding: 16px;

    :deep(.el-form-item) {
      margin-bottom: 18px;
    }

    :deep(.el-input-number) {
      width: 100%;
    }
  }
</style>