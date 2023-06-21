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
    <div class="mt-2">
      <label class="nan-checkbox pe-1" :for="`${columnName}-checkbox`"
        >Убрать NaN</label
      >
      <input
        class="nan-checkbox"
        type="checkbox"
        :id="`${columnName}-checkbox`"
        @input="$emit('NaNDeletingChecked', columnName, $event.target.checked)"
      />
      |
      <label :for="`${columnName}-text-input`">Заменить NaN на </label>
      <input
        class="form-control d-inline ms-2"
        style="width: 100px"
        type="text"
        :id="`${columnName}-text-input`"
        v-model.lazy="NaNReplaceValue"
      />
    </div>
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
    NaNDeletingChecked: null,
    NaNReplaceValueChanged: null,
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
      NaNReplaceValue: '',
    };
  },

  computed: {
    currentComponent() {
      return this.componentByType[this.columnType];
    },
  },

  watch: {
    NaNReplaceValue() {
      this.$emit(
        'NaNReplaceValueChanged',
        this.columnName,
        this.NaNReplaceValue
      );
    },
  },
};
</script>

<style scoped>
.nan-checkbox:hover {
  cursor: pointer;
}
</style>
