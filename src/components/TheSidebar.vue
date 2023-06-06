<template>
  <div>
    <div class="logo-wrapper border-bottom py-3">
      <div class="logo fw-bold fs-4">STATS</div>
    </div>
    <the-navigation />
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
.logo {
  letter-spacing: 0.1rem;
}
</style>
