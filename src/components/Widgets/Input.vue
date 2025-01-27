<template>
  <el-input v-model="modelValue" :type="type" :placeholder="placeholder" :clearable="clearable" @input="handleInput"
    @change="handleChange" />
</template>

<script>
  import { defineComponent, ref, watch } from 'vue'

  export default defineComponent({
    name: 'InputWidget',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      clearable: {
        type: Boolean,
        default: true
      },
      value: {
        type: [String, Number],
        default: ''
      }
    },
    emits: ['update:value', 'input', 'change'],
    setup(props, { emit }) {
      const modelValue = ref(props.value)

      watch(() => props.value, (newVal) => {
        modelValue.value = newVal
      })

      const handleInput = (value) => {
        emit('update:value', value)
        emit('input', value)
      }

      const handleChange = (value) => {
        emit('change', value)
      }

      return {
        modelValue,
        handleInput,
        handleChange
      }
    }
  })
</script>