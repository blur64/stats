<template>
  <div>
    {{ title }}: от
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
    return { minValue: '', maxValue: '' };
  },

  watch: {
    minValue() {
      if (this.minValue === 0) {
        this.$emit('filterValueChanged', this.title, [
          0,
          this.maxValue ? this.maxValue : Infinity,
        ]);
      } else {
        this.$emit('filterValueChanged', this.title, [
          this.minValue ? this.minValue : -Infinity,
          this.maxValue ? this.maxValue : Infinity,
        ]);
      }
    },
    maxValue() {
      if (this.maxValue === 0) {
        this.$emit('filterValueChanged', this.title, [
          this.minValue ? this.minValue : -Infinity,
          0,
        ]);
      } else {
        this.$emit('filterValueChanged', this.title, [
          this.minValue ? this.minValue : -Infinity,
          this.maxValue ? this.maxValue : Infinity,
        ]);
      }
    },
  },
};
</script>

<style scoped>
.w-10 {
  width: 10%;
}
</style>
