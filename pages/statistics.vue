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
import { onMounted, defineAsyncComponent } from 'vue';
import { useStatistics } from '@/entities/statistics';

// Оптимизация: используем defineAsyncComponent для тяжелых виджетов
const StatisticsView = defineAsyncComponent(() => import('@/widgets/statistics-view/ui/StatisticsView.vue'));

// Оптимизация: используем useSeoMeta для SEO мета-тегов
useSeoMeta({
  title: 'Музыкальный тренажёр - Статистика',
  description: 'Просмотрите статистику ваших тренировок на музыкальном тренажере',
  ogTitle: 'Музыкальный тренажёр - Статистика',
  ogDescription: 'Просмотрите статистику ваших тренировок на музыкальном тренажере',
  ogType: 'website',
});

const statisticsStore = useStatistics();

// Оптимизация: используем useLazyAsyncData для не-критичной загрузки статистики
// Это улучшает FCP, так как данные загружаются асинхронно после рендеринга
const { pending } = useLazyAsyncData('statistics', () => {
  statisticsStore.loadStatistics();
  return Promise.resolve();
}, {
  server: false, // Загружаем только на клиенте (localStorage недоступен на сервере)
  lazy: true, // Ленивая загрузка - не блокирует рендеринг
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
