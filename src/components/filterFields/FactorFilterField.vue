<template>
  <div>
    {{ title }}:
    <div class="d-inline-flex align-items-center">
      <select v-model="filterValue" class="ms-1 form-select">
        <option v-for="(item, index) of uniqueItems" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
      <div v-for="counter of filterFieldsCount" :key="counter" class="">
        <div>или</div>
        <select class="form-select">
          <option
            v-for="(item, index) of uniqueItems"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <button class="btn" @click="filterFieldsCount += 1">+</button>
    </div>
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
    return { filterValue: '', filterFieldsCount: 0 };
  },

  computed: {
    uniqueItems() {
      const columnUniqueItems = [];

      this.columnValue.forEach((item) => {
        if (!columnUniqueItems.includes(item)) {
          columnUniqueItems.push(item);
        }
      });

      columnUniqueItems.unshift('');
      return columnUniqueItems;
    },
  },

  watch: {
    filterValue() {
      this.$emit('filterValueChanged', this.title, this.filterValue);
    },
    filterFieldsCount() {
      console.log(this.filterFieldsCount);
    },
  },
};
</script>
