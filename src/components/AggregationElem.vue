<template>
  <div>
    <base-select
      :optionsData="aggregateFuncsForSelect"
      :label="'Функция агрегирования'"
      :id="`function-select${Math.random}`"
      class="mb-3"
      v-model="selectedAggregateFunc"
    />
    <base-select
      v-if="selectedAggregateFunc !== 'count'"
      :optionsData="functionParamsForSelect"
      :label="'Параметр функции'"
      :id="`column-aggregate-select${Math.random()}`"
      class="mb-3"
      v-model="aggregateFuncParam"
    />
  </div>
</template>

<script>
export default {
  emits: {
    newAggregationAdded: null,
  },

  props: {
    functionParams: {
      type: Array,
      required: true,
    },

    aggregationElemIndex: {
      type: String,
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
        return { value: param.name, title: param.name };
      });
    },

    aggregateFuncsForSelect() {
      return this.aggregateFuncs.map((param) => {
        return { value: param.name, title: param.name };
      });
    },
  },

  methods: {},
};
</script>
