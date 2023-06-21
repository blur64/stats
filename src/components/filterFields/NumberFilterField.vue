<template>
  <div>
    <span class="fw-bold">{{ title }}:</span> от
    <input
      type="number"
      v-model.lazy="minValue"
      class="form-control ms-1 w-10 d-inline"
    />
    до
    <input
      type="number"
      v-model.lazy="maxValue"
      class="form-control ms-1 w-10 d-inline"
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
    return {
      minValue: '',
      maxValue: '',
    };
  },

  watch: {
    minValue() {
      this.$emit('filterValueChanged', this.title, [
        this.minValue,
        this.maxValue,
      ]);
    },
    maxValue() {
      this.$emit('filterValueChanged', this.title, [
        this.minValue,
        this.maxValue,
      ]);
    },
  },
};
</script>

<style scoped>
.w-10 {
  width: 10%;
}
</style>
