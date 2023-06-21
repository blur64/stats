<template>
  <div class="confirm-modal bg-light rounded p-4">
    <div>{{ confirmText }}</div>
    <slot></slot>
    <div class="mt-4 d-flex justify-content-end">
      <button
        class="confirm-btn btn border me-3"
        @click="$emit('userAnswered', true)"
      >
        Oк
      </button>
      <button
        class="confirm-btn btn border"
        @click="$emit('userAnswered', false)"
      >
        Отмена
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: {
    userAnswered: null,
  },

  props: {
    confirmText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.confirm-modal {
  max-width: 500px;
}

.confirm-btn:hover {
  background-color: var(--bs-gray-400);
}
</style>
