<template>
  <div class="grid-lines">
    <div v-for="line in lines.horizontal" :key="'h' + line" class="grid-line horizontal"
      :style="{ top: line + 'px' }" />
    <div v-for="line in lines.vertical" :key="'v' + line" class="grid-line vertical" :style="{ left: line + 'px' }" />
  </div>
</template>

<script>
  export default {
    name: 'GridLines',
    props: {
      lines: {
        type: Object,
        default: () => ({ horizontal: [], vertical: [] })
      }
    }
  }
</script>

<style scoped>
  .grid-lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .grid-line {
    position: absolute;
    background-color: #409EFF;

    &.horizontal {
      width: 100%;
      height: 1px;
    }

    &.vertical {
      width: 1px;
      height: 100%;
    }
  }
</style>