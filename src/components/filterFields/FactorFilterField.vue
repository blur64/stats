<template>
  <div>
    {{ title }}
    <select name="" id="" v-model="filterValue">
      <option v-for="(item, index) of uniqueItems" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  emits: {
    filterValueChanged: null,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    columnValue: {
      type: Array,
      required: true,
    },
  },

  data() {
    return { filterValue: '' };
  },

  computed: {
    uniqueItems() {
      const columnUniqueItems = [];

      this.columnValue.forEach((item) => {
        if (!columnUniqueItems.includes(item)) {
          columnUniqueItems.push(item);
        }
      });

      return columnUniqueItems;
    },
  },

  watch: {
    filterValue() {
      this.$emit('filterValueChanged', this.title, this.filterValue);
    },
  },
};
</script>
