<template>
  <div>
    <div class="d-flex">
      <tables-list-item
        v-for="tableData of tablesData"
        :key="tableData.id"
        :tableId="tableData.id"
        :tableName="tableData.name"
        @click="(tableId) => $emit('tableSelected', tableId)"
        class="me-2"
      />
    </div>
    <div class="px-3 mt-3 mb-3">
      <label for="fileInput" class="form-label">Добавить таблицу</label>
      <input class="form-control" type="file" id="fileInput" />
    </div>
  </div>
</template>

<script>
import TablesListItem from './TablesListItem.vue';

export default {
  components: {
    TablesListItem,
  },

  emits: {
    tableSelected: (id) => typeof id === 'number',
  },

  props: {
    tablesData: {
      type: Array,
      required: true,
    },
  },
};
</script>
