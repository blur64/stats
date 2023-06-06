<template>
  <div>
    <table-page :dataset="dataset" />
  </div>
</template>

<script>
import TablePage from './pages/TablePage.vue';

export default {
  name: 'App',
  components: { TablePage },
  data() {
    return {
      dataset: [],
    };
  },
};
</script>

<style>
@font-face {
  font-family: 'Zen Maru Gothic';
  src: local('Zen Maru Gothic'),
    url('@/assets/fonts/ZenMaruGothic-Light.ttf') format('ttf'),
    url('@/assets/fonts/ZenMaruGothic-Light.woff') format('woff');
  font-weight: 300;
}

@font-face {
  font-family: 'Zen Maru Gothic';
  src: local('Zen Maru Gothic'),
    url('@/assets/fonts/ZenMaruGothic-Regular.ttf') format('ttf'),
    url('@/assets/fonts/ZenMaruGothic-Regular.woff') format('woff');
  font-weight: 400;
}

@font-face {
  font-family: 'Zen Maru Gothic';
  src: local('Zen Maru Gothic'),
    url('@/assets/fonts/ZenMaruGothic-Medium.ttf') format('ttf'),
    url('@/assets/fonts/ZenMaruGothic-Medium.woff') format('woff');
  font-weight: 500;
}

@font-face {
  font-family: 'Zen Maru Gothic';
  src: local('Zen Maru Gothic'),
    url('@/assets/fonts/ZenMaruGothic-Bold.ttf') format('ttf'),
    url('@/assets/fonts/ZenMaruGothic-Bold.woff') format('woff');
  font-weight: 700;
}

@font-face {
  font-family: 'Zen Maru Gothic';
  src: local('Zen Maru Gothic'),
    url('@/assets/fonts/ZenMaruGothic-Black.ttf') format('ttf'),
    url('@/assets/fonts/ZenMaruGothic-Black.woff') format('woff');
  font-weight: 900;
}

body {
  font-family: 'Zen Maru Gothic', sans-serif;
}
</style>
