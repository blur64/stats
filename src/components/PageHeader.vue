<template>
  <header class="page-header border-bottom px-3 fs-5 mb-4">
    {{ title }}
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
.page-header {
  height: 80px;
  line-height: 80px;
}
</style>
