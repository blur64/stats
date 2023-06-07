<template>
  <table @click="emitClickedColumnIndex" class="base-table">
    <thead v-if="headers.length" class="border-bottom">
      <tr>
        <th
          v-for="(header, index) of headers"
          :key="index"
          :data-row-index="index"
          class="fw-bold text-end p-2"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) of rows" :key="rowIndex">
        <td
          v-for="(data, dataIndex) of row"
          :key="dataIndex"
          :data-row-index="dataIndex"
          class="text-end px-2"
          :class="{ 'fw-bold': dataIndex === 0, 'pt-2': rowIndex === 0 }"
        >
          {{ data }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: false,
      default: () => [],
    },
    rows: {
      type: Array,
      required: true,
    },
  },

  emits: {
    columnClicked: null,
  },

  methods: {
    emitClickedColumnIndex(e) {
      let columnIndex = e.target.dataset.rowIndex;
      this.$emit('columnClicked', columnIndex);
    },
  },
};
</script>

<style scoped>
.base-table:hover {
  cursor: pointer;
}
</style>
