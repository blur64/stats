<template>
  <div>
    <base-select
      :optionsData="aggregateFuncsForSelect"
      class="mb-3"
      v-model="selectedAggregateFunc"
    />
    <base-select
      :class="{ invisible: selectedAggregateFunc === 'count' }"
      :optionsData="functionParamsForSelect"
      v-model="aggregateFuncParam"
    />
  </div>
</template>

<script>
import BaseSelect from './BaseSelect.vue';

export default {
  components: {
    BaseSelect,
  },

  emits: {
    aggregationRuleChanged: null,
  },

  props: {
    functionParams: {
      type: Array,
      required: true,
    },

    aggregationElemIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      selectedAggregateFunc: '',
      aggregateFuncParam: '',
      aggregateFuncs: ['count', 'max', 'min', 'sum', 'avg'],
    };
  },

  computed: {
    functionParamsForSelect() {
      return this.functionParams.map((param) => {
        return { value: param, title: param };
      });
    },

    aggregateFuncsForSelect() {
      return this.aggregateFuncs.map((param) => {
        return { value: param, title: param };
      });
    },
  },

  watch: {
    selectedAggregateFunc(newValue, oldValue) {
      if (
        (newValue === oldValue || !this.aggregateFuncParam) &&
        newValue !== 'count'
      ) {
        return;
      }

      this.$emit('aggregationRuleChanged', {
        func: newValue,
        param: newValue === 'count' ? '' : this.aggregateFuncParam,
        index: this.aggregationElemIndex,
      });
    },

    aggregateFuncParam(newValue, oldValue) {
      if (newValue === oldValue || !this.selectedAggregateFunc) {
        return;
      }

      this.$emit('aggregationRuleChanged', {
        func: this.selectedAggregateFunc,
        param: newValue,
        index: this.aggregationElemIndex,
      });
    },
  },
};
</script>

<style scoped>
.invisible {
  visibility: hidden;
}
</style>
