<template>
  <div
    class="table-list-item p-3 d-flex flex-column align-items-center rounded-1"
    @click="$emit('click', tableID)"
  >
    <img class="mb-1" src="../assets/imgs/file-img.png" alt="" />
    <span class="text-center">{{ tableName }}</span>
  </div>
</template>

<script>
export default {
  emits: {
    click: (id) => typeof id === 'number',
  },

  props: {
    tableName: {
      type: String,
      required: true,
    },
    tableID: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.table-list-item {
  width: 122px;
}

.table-list-item:hover {
  cursor: pointer;
  background-color: var(--bs-gray-200);
  color: inherit;
}

.active {
  background-color: var(--bs-gray-200);
  color: inherit;
}
</style>
