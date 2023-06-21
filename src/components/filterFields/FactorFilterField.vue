<template>
  <div class="d-flex align-items-center">
    <div class="me-1 fw-bold">{{ title }}:</div>
    <div class="d-flex align-items-center">
      <select
        class="ms-1 form-select"
        style="width: auto"
        @input="updateFilterRecord($event.target.value, 0)"
      >
        <option v-for="(item, index) of uniqueItems" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
      <div
        v-for="counter of filterFieldsCount"
        :key="counter"
        class="d-flex align-items-center"
      >
        <div class="mx-2">или</div>
        <select
          class="ms-1 form-select"
          @input="updateFilterRecord($event.target.value, counter)"
        >
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
    return {
      filterRecords: [{ num: 0, value: '' }],
      filterFieldsCount: 0,
    };
  },

  computed: {
    uniqueItems() {
      const columnUniqueItems = [];

      this.columnValue.forEach((item) => {
        if (!columnUniqueItems.includes(item) && item !== '') {
          columnUniqueItems.push(item);
        }
      });

      columnUniqueItems.unshift('');
      return columnUniqueItems;
    },

    filterValue() {
      const filterValue = [];

      this.filterRecords.forEach((record) => {
        if (!filterValue.includes(record.value) && record.value !== '') {
          filterValue.push(record.value);
        }
      });

      return filterValue;
    },
  },

  methods: {
    updateFilterRecord(value, filterNum) {
      const filterRecord = this.filterRecords.find(
        (filter) => filter.num === filterNum
      );

      filterRecord.value = value;
    },
  },

  watch: {
    filterValue() {
      this.$emit('filterValueChanged', this.title, this.filterValue);
    },
    filterFieldsCount(newValue, oldValue) {
      if (newValue > oldValue) {
        this.filterRecords.push({
          num: newValue,
          value: '',
        });
      }
    },
  },
};
</script>
