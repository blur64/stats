<template>
  <table>
    <tbody>
      <tr v-for="(row, rowIndex) of records" :key="rowIndex">
        <td
          v-for="(data, dataIndex) of row"
          :key="dataIndex"
          :data-row-index="dataIndex"
          :class="{ 'fw-bold': dataIndex === 0 }"
          class="text-end px-2"
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
    records: {
      type: Array,
      required: true,
    },
  },
};
</script>
