<template>
  <div>
    {{ title }}
    <input type="text" v-model.lazy="filterValue" />
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
