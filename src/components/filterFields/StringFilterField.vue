<template>
  <div>
    <span class="fw-bold">{{ title }}:</span>
    <input
      type="text"
      v-model.lazy="filterValue"
      class="form-control ms-1 w-25 d-inline"
    />
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
      required: false,
    },
  },

  data() {
    return { filterValue: '' };
  },

  watch: {
    filterValue() {
      this.$emit('filterValueChanged', this.title, this.filterValue);
    },
  },
};
</script>
