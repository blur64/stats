<template>
  <nav class="fw-medium fs-5 gy-2 row">
    <navigation-item
      v-for="(navigationItemData, index) of navigationItemsData"
      :key="index"
      :link="navigationItemData.link"
      :route="navigationItemData.route"
      :icon="navigationItemData.icon"
    />
  </nav>
</template>

<script>
import NavigationItem from './NavigationItem.vue';

export default {
  components: {
    NavigationItem,
  },

  data() {
    return {
      navigationItemsData: [
        { route: '/', link: 'Мои таблицы', icon: 'table' },
        { route: '/filter', link: 'Фильтрация', icon: 'brush' },
        { route: '/visualisation', link: 'Визуализация', icon: 'bar-chart' },
      ],
    };
  },
};
</script>
