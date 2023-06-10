<template>
  <div>
    {{ title }}
    от:
    <input type="number" v-model.lazy="minValue" />
    до:
    <input type="number" v-model.lazy="maxValue" />
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
