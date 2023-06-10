<template>
  <div>
    <component
      :is="currentComponent"
      :title="columnName"
      :columnValue="columnValue"
      @filterValueChanged="
        (title, filterValue) => $emit('filterValueChanged', title, filterValue)
      "
    />
  </div>
</template>

<script>
import StringFilterField from './StringFilterField.vue';
import NumberFilterField from './NumberFilterField.vue';
import FactorFilterField from './FactorFilterField.vue';

export default {
  components: {
    StringFilterField,
    NumberFilterField,
    FactorFilterField,
  },

  emits: {
    filterValueChanged: null,
  },

  props: {
    columnName: {
      type: String,
      required: true,
    },
    columnType: {
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
      componentByType: {
        number: 'NumberFilterField',
        factor: 'FactorFilterField',
        string: 'StringFilterField',
      },
    };
  },

  computed: {
    currentComponent() {
      return this.componentByType[this.columnType];
    },
  },
};
</script>
