import { defineComponent, mergeProps, unref, computed, useSSRContext } from 'file://C:/coding/pet-projects/MusicTrainer/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'file://C:/coding/pet-projects/MusicTrainer/node_modules/vue/server-renderer/index.mjs';
import { o } from './_plugin-vue_export-helper-BCo6x5W8.mjs';
import { r } from './useStatistics-Fmyp9JtG.mjs';
import './state-Cgstzz6o.mjs';
import './server.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/h3/dist/index.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/destr/dist/index.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/hookable/dist/index.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/unstorage/dist/index.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/coding/pet-projects/MusicTrainer/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/ohash/dist/index.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/klona/dist/index.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/defu/dist/defu.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/scule/dist/index.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/pathe/dist/index.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/unhead/dist/server.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/devalue/index.js';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/unhead/dist/utils.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/unctx/dist/index.mjs';
import 'file://C:/coding/pet-projects/MusicTrainer/node_modules/vue-router/vue-router.node.mjs';

const b = defineComponent({ __name: "StatisticsView", __ssrInlineRender: true, props: { statistics: {}, sessions: {} }, emits: ["clear-statistics"], setup(a2) {
  const i2 = a2, d2 = computed(() => 0 === i2.statistics.totalNotes ? 0 : Math.round(i2.statistics.totalCorrect / i2.statistics.totalNotes * 100));
  return (s2, i3, n2, r2) => {
    i3(`<div${ssrRenderAttrs(mergeProps({ class: "statistics-view" }, r2))} data-v-9abb5a22><div class="stats-container" data-v-9abb5a22><h2 class="stats-title" data-v-9abb5a22>\u{1F4CA} \u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430</h2><div class="stats-overview" data-v-9abb5a22><div class="stat-card" data-v-9abb5a22><div class="stat-icon" data-v-9abb5a22>\u{1F3AF}</div><div class="stat-content" data-v-9abb5a22><div class="stat-value" data-v-9abb5a22>${ssrInterpolate(a2.statistics.totalNotes)}</div><div class="stat-label" data-v-9abb5a22>\u0412\u0441\u0435\u0433\u043E \u043D\u043E\u0442</div></div></div><div class="stat-card" data-v-9abb5a22><div class="stat-icon" data-v-9abb5a22>\u2705</div><div class="stat-content" data-v-9abb5a22><div class="stat-value" data-v-9abb5a22>${ssrInterpolate(a2.statistics.totalCorrect)}</div><div class="stat-label" data-v-9abb5a22>\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E</div></div></div><div class="stat-card" data-v-9abb5a22><div class="stat-icon" data-v-9abb5a22>\u274C</div><div class="stat-content" data-v-9abb5a22><div class="stat-value" data-v-9abb5a22>${ssrInterpolate(a2.statistics.totalWrong)}</div><div class="stat-label" data-v-9abb5a22>\u041E\u0448\u0438\u0431\u043E\u043A</div></div></div><div class="stat-card" data-v-9abb5a22><div class="stat-icon" data-v-9abb5a22>\u{1F4C8}</div><div class="stat-content" data-v-9abb5a22><div class="stat-value" data-v-9abb5a22>${ssrInterpolate(d2.value)}%</div><div class="stat-label" data-v-9abb5a22>\u0422\u043E\u0447\u043D\u043E\u0441\u0442\u044C</div></div></div><div class="stat-card" data-v-9abb5a22><div class="stat-icon" data-v-9abb5a22>\u{1F3C6}</div><div class="stat-content" data-v-9abb5a22><div class="stat-value" data-v-9abb5a22>${ssrInterpolate(a2.statistics.totalSessions)}</div><div class="stat-label" data-v-9abb5a22>\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043E\u043A</div></div></div></div><div class="sessions-history" data-v-9abb5a22><div class="history-header" data-v-9abb5a22><h3 data-v-9abb5a22>\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043E\u043A</h3><button class="clear-stats-btn" data-v-9abb5a22> \u{1F5D1}\uFE0F \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C </button></div>`), 0 === a2.sessions.length ? i3('<div class="empty-history" data-v-9abb5a22> \u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044B\u0445 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043E\u043A </div>') : (i3('<div class="sessions-list" data-v-9abb5a22><!--[-->'), ssrRenderList(a2.sessions, (a3) => {
      var s3, t2, d3;
      i3(`<div class="session-item" data-v-9abb5a22><div class="session-time" data-v-9abb5a22>${ssrInterpolate((d3 = a3.startTime, new Date(d3).toLocaleDateString()))} ${ssrInterpolate((function(a4) {
        return new Date(a4).toLocaleTimeString();
      })(a3.startTime))}</div><div class="session-mode-badge" data-v-9abb5a22>${ssrInterpolate((t2 = a3.mode, { infinite: "\u221E", exam: "\u{1F4DD}", timed: "\u23F1\uFE0F", survival: "\u2764\uFE0F" }[t2] || "?"))}</div><div class="session-stats" data-v-9abb5a22><span class="${ssrRenderClass([(s3 = a3.accuracy, s3 >= 80 ? "good" : s3 >= 60 ? "medium" : ""), "session-accuracy"])}" data-v-9abb5a22>${ssrInterpolate(a3.accuracy)}% </span><span class="session-notes" data-v-9abb5a22>${ssrInterpolate(a3.totalNotes)} \u043D\u043E\u0442</span><span class="session-duration" data-v-9abb5a22>${ssrInterpolate(Math.floor(a3.duration / 1e3))}\u0441</span></div></div>`);
    }), i3("<!--]--></div>")), i3("</div></div></div>");
  };
} }), u = b.setup;
b.setup = (a2, s2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("src/widgets/statistics-view/ui/StatisticsView.vue"), u ? u(a2, s2) : void 0;
};
const p = o(b, [["__scopeId", "data-v-9abb5a22"]]), m = defineComponent({ __name: "statistics", __ssrInlineRender: true, setup(a2) {
  const s2 = r();
  function i2() {
    confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u044E \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443? \u042D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043E\u0431\u0440\u0430\u0442\u0438\u043C\u043E.") && s2.clearStatistics();
  }
  return (a3, v2, c2, o2) => {
    v2(`<div${ssrRenderAttrs(mergeProps({ class: "statistics-page-wrapper" }, o2))} data-v-21c02675>`), v2(ssrRenderComponent(unref(p), { statistics: unref(s2).statistics.value, sessions: unref(s2).getRecentSessions(20), onClearStatistics: i2 }, null, c2)), v2("</div>");
  };
} }), _ = m.setup;
m.setup = (a2, s2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("pages/statistics.vue"), _ ? _(a2, s2) : void 0;
};
const g = o(m, [["__scopeId", "data-v-21c02675"]]);

export { g as default };
