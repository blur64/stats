<template>
  <div>
    <div
      class="logo-wrapper border-bottom px-3 d-flex justify-content-between align-items-center"
    >
      <div class="logo fw-bold fs-4">Diplom</div>
      <div>
        <button class="btn logout-btn" @click="logout">
          <i class="align-middle bi bi-box-arrow-in-right fs-4 me-1"></i>
          <span class="align-middle fw-medium">Выйти</span>
        </button>
      </div>
    </div>
    <the-navigation class="mt-3" />
  </div>
</template>

<script>
import TheNavigation from "./TheNavigation.vue";

import { sendRequestToUserLogout } from "../api.js";

export default {
  components: {
    TheNavigation,
  },

  methods: {
    logout() {
      sendRequestToUserLogout();
      localStorage.removeItem("userId");
      this.$router.push("/login");
    },
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

.logout-btn {
  color: var(--bs-gray-600);
}

.logout-btn:hover {
  color: inherit;
}

.logout-btn:focus {
  border-color: transparent;
}
</style>
