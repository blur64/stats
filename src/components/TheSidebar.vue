<template>
  <div>
    <div class="logo-wrapper border-bottom px-3">
      <div class="logo fw-bold fs-4">STATS</div>
    </div>
    <the-navigation class="mt-3" />
  </div>
</template>

<script>
import TheNavigation from './TheNavigation.vue';

export default {
  components: {
    TheNavigation,
  },
};
</script>

<style scoped>
.logo-wrapper {
  height: 80px;
  line-height: 80px;
}

.logo {
  letter-spacing: 0.1rem;
}
</style>
