<template>
  <div>
    <two-axis-headers-table
      :rows="counts"
      :topHeaders="['count']"
      :sideHeaders="uniqueColumnItems"
    />
  </div>
</template>

<script>
import TwoAxisHeadersTable from '../TwoAxisHeadersTable.vue';

export default {
  components: {
    TwoAxisHeadersTable,
  },

  props: {
    column: {
      type: Array,
      required: true,
    },
  },

  computed: {
    uniqueColumnItems() {
      const columnUniqueItems = [];

      this.column.forEach((item) => {
        if (!columnUniqueItems.includes(item)) {
          columnUniqueItems.push(item);
        }
      });

      return columnUniqueItems;
    },

    counts() {
      const counts = [];
      const columnItemsJoined = this.column.join();

      this.uniqueColumnItems.forEach((item) => {
        const regExp = new RegExp(item, 'g');
        const count = columnItemsJoined.match(regExp).length;
        counts.push([count]);
      });

      return counts;
    },
  },
};
</script>
