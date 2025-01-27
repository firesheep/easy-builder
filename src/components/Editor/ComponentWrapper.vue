<template>
  <div class="component-wrapper" :class="{ selected: isSelected }" :style="component.style"
    @click.stop="$emit('select', component.id)">
    <component :is="component.type" v-bind="component.props" />
  </div>
</template>

<script setup>
  defineProps({
    component: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  })

  defineEmits(['select'])
</script>