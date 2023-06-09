<template>
  <div>
    <base-table :rows="counts" :headers="['', 'count']" />
  </div>
</template>

<script>
import BaseTable from '../BaseTable.vue';

export default {
  components: {
    BaseTable,
  },

  props: {
    column: {
      type: Array,
      required: true,
    },
  },

  computed: {
    counts() {
      const columnUniqueItems = [];

      this.column.forEach((item) => {
        if (!columnUniqueItems.includes(item)) {
          columnUniqueItems.push(item);
        }
      });

      const counts = [];
      const columnItemsJoined = this.column.join();

      columnUniqueItems.forEach((item) => {
        const regExp = new RegExp(item, 'g');
        const count = columnItemsJoined.match(regExp).length;
        counts.push([item, count]);
      });

      return counts;
    },
  },
};
</script>
