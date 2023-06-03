<template>
  <table>
    <thead v-if="headers.length">
      <tr>
        <th v-for="(header, index) of headers" :key="index">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) of rows" :key="rowIndex">
        <td v-for="(data, dataIndex) of row" :key="dataIndex">
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
};
</script>
