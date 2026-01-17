<template>
  <div class="statistics-page-wrapper">
    <StatisticsView
      :statistics="statisticsStore.statistics.value"
      :sessions="statisticsStore.getRecentSessions(20)"
      @clear-statistics="handleClearStatistics"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { StatisticsView } from '@/widgets/statistics-view';
import { useStatistics } from '@/entities/statistics';

const statisticsStore = useStatistics();

onMounted(() => {
  statisticsStore.loadStatistics();
});

function handleClearStatistics() {
  if (confirm('Вы уверены, что хотите удалить всю статистику? Это действие необратимо.')) {
    statisticsStore.clearStatistics();
  }
}
</script>

<style scoped>
.statistics-page-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
