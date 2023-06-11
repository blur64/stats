<template>
  <table @click="emitClickedColumnIndex">
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
      <tr v-for="(row, rowIndex) of preparedRows" :key="rowIndex">
        <td class="pt-1 pe-2 fw-bold text-end">
          {{ rowIndex }}
        </td>
        <td
          v-for="(data, dataIndex) of row"
          :key="dataIndex"
          :data-row-index="dataIndex"
          :class="{ 'pt-2': rowIndex === 0 }"
          class="text-end px-2 pt-1"
        >
          {{ data !== '' ? data : 'NaN' }}
        </td>
      </tr>
      <template v-if="rows.length > 10">
        <tr>
          <td class="pt-1 pe-2 fw-bold text-end">...</td>
          <td
            v-for="(_, index) of headers"
            :key="index"
            class="text-end px-2 pt-1"
          >
            ...
          </td>
        </tr>
        <tr>
          <td class="pt-1 pe-2 fw-bold">{{ this.rows.length }}</td>
          <td
            v-for="(data, index) of rows.at(-1)"
            :key="index"
            class="text-end px-2 pt-1"
          >
            {{ data !== '' ? data : 'NaN' }}
          </td>
        </tr>
      </template>
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

  computed: {
    preparedRows() {
      return this.rows.slice(0, 10);
    },
  },
};
</script>
