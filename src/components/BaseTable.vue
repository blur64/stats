<template>
  <table @click="emitClickedColumnIndex" class="base-table">
    <thead v-if="headers.length" class="border-bottom">
      <tr>
        <th></th>
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
        <td class="pt-2 fw-bold">
          {{ rowIndex }}
        </td>
        <td
          v-for="(data, dataIndex) of row"
          :key="dataIndex"
          :data-row-index="dataIndex"
          :class="{ 'pt-2': rowIndex === 0 }"
          class="text-end px-2"
        >
          {{ data }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// МБ ЛУЧШЕ СДЕЛАТЬ ДВА ВИДА ТАБЛИЦЫ. ОДНА ОБЫЧНАЯ - ЭТА, ДРУГАЯ - С ГОРИЗОНТАЛЬНЫМИ ХЕДЕРАМИ

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
    // emitClickedColumnIndex(e) {
    //   let columnIndex = e.target.dataset.rowIndex;
    //   this.$emit('columnClicked', columnIndex);
    // },
  },
};
</script>
