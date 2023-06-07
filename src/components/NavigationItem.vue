<template>
  <div class="navigation-item">
    <router-link
      :to="route"
      class="navigation-link rounded-1 d-flex justify-content-between px-3"
      :class="{ active: isLinkActive }"
    >
      <div>
        <i :class="`bi-${icon}`"></i>
        {{ link }}
      </div>
      <div>
        <i v-if="$route.path === route" class="bi-chevron-right text-end"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
  },

  computed: {
    isLinkActive() {
      return this.$route.path === this.route;
    },
  },
};
</script>

<style scoped>
.navigation-link {
  text-decoration: none;
  display: block;
  padding: 0.75rem;
  color: var(--bs-gray-600);
}

.navigation-link:hover {
  cursor: pointer;
  background-color: var(--bs-gray-200);
  color: inherit;
}

.active {
  background-color: var(--bs-gray-200);
  color: inherit;
}
</style>
