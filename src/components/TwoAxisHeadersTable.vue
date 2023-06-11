<template>
  <table>
    <thead class="border-bottom">
      <th></th>
      <th
        v-for="(topHeader, index) of topHeaders"
        :key="index"
        class="fw-bold text-end p-2"
      >
        {{ topHeader }}
      </th>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) of rows" :key="rowIndex">
        <th class="fw-bold" :class="{ 'pt-2': rowIndex === 0 }">
          {{ sideHeaders[rowIndex] }}
        </th>
        <td
          v-for="(data, dataIndex) of row"
          :key="dataIndex"
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
export default {
  props: {
    sideHeaders: {
      type: Array,
      required: true,
    },
    topHeaders: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
};
</script>
