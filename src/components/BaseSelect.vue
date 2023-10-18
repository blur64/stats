<template>
  <div>
    <label :for="id">{{ label }} <span v-if="label">:</span></label>
    <select
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-select w-auto d-inline mx-2"
    >
      <option
        v-for="(optionData, index) of optionsData"
        :key="index"
        :value="optionData.value"
      >
        {{ optionData.title }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
    },
    optionsData: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: false,
    },
    modelValue: {
      type: [String, Number],
    },
  },
};
</script>
