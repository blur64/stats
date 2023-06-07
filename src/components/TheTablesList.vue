<template>
  <div class="d-flex">
    <tables-list-item
      v-for="tableData of tablesData"
      :key="tableData.id"
      :tableID="tableData.id"
      :tableName="tableData.name"
      @click="(tableID) => $emit('click', tableID)"
    />
  </div>
</template>

<script>
import TablesListItem from './TablesListItem.vue';

export default {
  components: {
    TablesListItem,
  },

  emits: {
    click: (id) => typeof id === 'number',
  },

  props: {
    tablesData: {
      type: Array,
      required: true,
    },
  },
};
</script>
