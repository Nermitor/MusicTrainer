import { n as ge } from './server.mjs';
import { defineComponent, computed, ref, unref, mergeProps, withCtx, createVNode, createBlock, openBlock, withDirectives, withKeys, vModelText, createTextVNode, Fragment, renderList, toDisplayString, useSSRContext, provide } from 'file://C:/coding/pet-projects/MusicTrainer/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from 'file://C:/coding/pet-projects/MusicTrainer/node_modules/vue/server-renderer/index.mjs';
import { useRoute } from 'file://C:/coding/pet-projects/MusicTrainer/node_modules/vue-router/vue-router.node.mjs';
import { h, b, x } from './useProfile-CV7KmeJC.mjs';
import { o } from './_plugin-vue_export-helper-BCo6x5W8.mjs';
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
import './state-Cgstzz6o.mjs';

const R = defineComponent({ __name: "ProfileManager", __ssrInlineRender: true, props: { modelValue: { type: Boolean }, profiles: {} }, emits: ["update:modelValue", "close", "save", "load", "delete"], setup(e2, { emit: a2 }) {
  const g2 = e2, h2 = a2, k2 = computed({ get: () => g2.modelValue, set: (e3) => h2("update:modelValue", e3) }), j2 = ref(false), T2 = ref("");
  function w2() {
    T2.value.trim() && (h2("save", T2.value.trim()), T2.value = "", j2.value = false);
  }
  return (a3, t2, i2, g3) => {
    t2(ssrRenderComponent(unref(h), mergeProps({ modelValue: k2.value, "onUpdate:modelValue": (e3) => k2.value = e3, title: "\u{1F4C1} \u041F\u0440\u043E\u0444\u0438\u043B\u0438", onClose: (e3) => h2("close") }, g3), { default: withCtx((a4, t3, i3, o2) => {
      if (!t3) return [createVNode("div", { class: "profile-manager" }, [createVNode("div", { class: "save-section" }, [j2.value ? (openBlock(), createBlock("div", { key: 1, class: "save-form" }, [withDirectives(createVNode("input", { "onUpdate:modelValue": (e3) => T2.value = e3, type: "text", placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0444\u0438\u043B\u044F", class: "profile-input", onKeyup: withKeys(w2, ["enter"]) }, null, 40, ["onUpdate:modelValue"]), [[vModelText, T2.value]]), createVNode("div", { class: "save-actions" }, [createVNode(unref(b), { variant: "primary", onClick: w2 }, { default: withCtx(() => [createTextVNode("\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")]), _: 1 }), createVNode(unref(b), { onClick: (e3) => j2.value = false }, { default: withCtx(() => [createTextVNode("\u041E\u0442\u043C\u0435\u043D\u0430")]), _: 1 }, 8, ["onClick"])])])) : (openBlock(), createBlock("button", { key: 0, class: "save-button", onClick: (e3) => j2.value = true }, " \u{1F4BE} \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 ", 8, ["onClick"]))]), e2.profiles.length > 0 ? (openBlock(), createBlock("div", { key: 0, class: "profiles-list" }, [createVNode("h4", null, "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u0444\u0438\u043B\u0438:"), createVNode("div", { class: "profile-grid" }, [(openBlock(true), createBlock(Fragment, null, renderList(e2.profiles, (e3) => (openBlock(), createBlock("div", { key: e3.id, class: "profile-card" }, [createVNode("h5", null, toDisplayString(e3.name), 1), createVNode("div", { class: "profile-actions" }, [createVNode(unref(b), { onClick: (a5) => h2("load", e3) }, { default: withCtx(() => [createTextVNode("\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C")]), _: 1 }, 8, ["onClick"]), createVNode(unref(b), { variant: "danger", onClick: (a5) => h2("delete", e3.id) }, { default: withCtx(() => [createTextVNode("\u0423\u0434\u0430\u043B\u0438\u0442\u044C")]), _: 1 }, 8, ["onClick"])])]))), 128))])])) : (openBlock(), createBlock("div", { key: 1, class: "empty-state" }, " \u041D\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0445 \u043F\u0440\u043E\u0444\u0438\u043B\u0435\u0439 "))])];
      t3(`<div class="profile-manager" data-v-d346707b${o2}><div class="save-section" data-v-d346707b${o2}>`), j2.value ? (t3(`<div class="save-form" data-v-d346707b${o2}><input${ssrRenderAttr("value", T2.value)} type="text" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0444\u0438\u043B\u044F" class="profile-input" data-v-d346707b${o2}><div class="save-actions" data-v-d346707b${o2}>`), t3(ssrRenderComponent(unref(b), { variant: "primary", onClick: w2 }, { default: withCtx((e3, a5, t4, i4) => {
        if (!a5) return [createTextVNode("\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")];
        a5("\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C");
      }), _: 1 }, i3, o2)), t3(ssrRenderComponent(unref(b), { onClick: (e3) => j2.value = false }, { default: withCtx((e3, a5, t4, i4) => {
        if (!a5) return [createTextVNode("\u041E\u0442\u043C\u0435\u043D\u0430")];
        a5("\u041E\u0442\u043C\u0435\u043D\u0430");
      }), _: 1 }, i3, o2)), t3("</div></div>")) : t3(`<button class="save-button" data-v-d346707b${o2}> \u{1F4BE} \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 </button>`), t3("</div>"), e2.profiles.length > 0 ? (t3(`<div class="profiles-list" data-v-d346707b${o2}><h4 data-v-d346707b${o2}>\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u0444\u0438\u043B\u0438:</h4><div class="profile-grid" data-v-d346707b${o2}><!--[-->`), ssrRenderList(e2.profiles, (e3) => {
        t3(`<div class="profile-card" data-v-d346707b${o2}><h5 data-v-d346707b${o2}>${ssrInterpolate(e3.name)}</h5><div class="profile-actions" data-v-d346707b${o2}>`), t3(ssrRenderComponent(unref(b), { onClick: (a5) => h2("load", e3) }, { default: withCtx((e4, a5, t4, i4) => {
          if (!a5) return [createTextVNode("\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C")];
          a5("\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C");
        }), _: 2 }, i3, o2)), t3(ssrRenderComponent(unref(b), { variant: "danger", onClick: (a5) => h2("delete", e3.id) }, { default: withCtx((e4, a5, t4, i4) => {
          if (!a5) return [createTextVNode("\u0423\u0434\u0430\u043B\u0438\u0442\u044C")];
          a5("\u0423\u0434\u0430\u043B\u0438\u0442\u044C");
        }), _: 2 }, i3, o2)), t3("</div></div>");
      }), t3("<!--]--></div></div>")) : t3(`<div class="empty-state" data-v-d346707b${o2}> \u041D\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0445 \u043F\u0440\u043E\u0444\u0438\u043B\u0435\u0439 </div>`), t3("</div>");
    }), _: 1 }, i2));
  };
} }), I = R.setup;
R.setup = (e2, a2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("src/features/profile-manager/ui/ProfileManager.vue"), I ? I(e2, a2) : void 0;
};
const S = o(R, [["__scopeId", "data-v-d346707b"]]), P = defineComponent({ __name: "default", __ssrInlineRender: true, setup(a2) {
  const d2 = useRoute(), r2 = x(), u2 = ref(false), v2 = ref(false), c2 = computed(() => "/" === d2.path), p2 = computed(() => "/statistics" === d2.path), f2 = computed(() => "/training" === d2.path), m2 = ref({ speed: 1, withAccidentals: false, noTimer: true, showClef: true, alwaysShowHint: false, hintDelay: 0, octaveRange: "all", locationRange: "all", trainingMode: "infinite", instrumentType: "piano", midiCalibration: 0, inputMode: "virtual-piano", enableKeyboardInput: true });
  function b2() {
    ge("/");
  }
  function g2(e2) {
    r2.createProfile(e2, m2.value), u2.value = false;
  }
  function C2(e2) {
    var _a;
    m2.value = { speed: e2.speed, withAccidentals: e2.withAccidentals, noTimer: e2.noTimer, showClef: e2.showClef, alwaysShowHint: e2.alwaysShowHint, hintDelay: e2.hintDelay, octaveRange: e2.octaveRange, locationRange: e2.locationRange, trainingMode: e2.trainingMode, instrumentType: e2.instrumentType || "piano", midiCalibration: e2.midiCalibration || 0, inputMode: e2.inputMode || "virtual-piano", enableKeyboardInput: (_a = e2.enableKeyboardInput) != null ? _a : true }, u2.value = false;
  }
  function y2(e2) {
    r2.deleteProfile(e2);
  }
  return provide("settings", m2), (a3, t2, i2, d3) => {
    t2(`<div${ssrRenderAttrs(mergeProps({ class: "app-container" }, d3))} data-v-aa95be56><header class="app-header" data-v-aa95be56><div class="header-left" data-v-aa95be56><div class="app-logo" data-v-aa95be56>\u{1F3B5}</div><h1 class="app-title" data-v-aa95be56>\u041C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0440\u0435\u043D\u0430\u0436\u0451\u0440</h1></div><div class="header-right" data-v-aa95be56>`), c2.value ? t2(ssrRenderComponent(unref(b), { onClick: (t3) => ("navigateTo" in a3 ? a3.navigateTo : unref(ge))("/statistics") }, { default: withCtx((e2, a4, t3, i3) => {
      if (!a4) return [createTextVNode(" \u{1F4CA} \u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 ")];
      a4(" \u{1F4CA} \u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 ");
    }), _: 1 }, i2)) : t2("<!---->"), c2.value ? t2(ssrRenderComponent(unref(b), { onClick: (e2) => u2.value = true }, { default: withCtx((e2, a4, t3, i3) => {
      if (!a4) return [createTextVNode(" \u{1F4C1} \u041F\u0440\u043E\u0444\u0438\u043B\u0438 ")];
      a4(" \u{1F4C1} \u041F\u0440\u043E\u0444\u0438\u043B\u0438 ");
    }), _: 1 }, i2)) : t2("<!---->"), p2.value ? t2(ssrRenderComponent(unref(b), { onClick: (t3) => ("navigateTo" in a3 ? a3.navigateTo : unref(ge))("/") }, { default: withCtx((e2, a4, t3, i3) => {
      if (!a4) return [createTextVNode(" \u2B05 \u041A \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u043C ")];
      a4(" \u2B05 \u041A \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u043C ");
    }), _: 1 }, i2)) : t2("<!---->"), f2.value && !v2.value ? t2(ssrRenderComponent(unref(b), { variant: "danger", onClick: b2 }, { default: withCtx((e2, a4, t3, i3) => {
      if (!a4) return [createTextVNode(" \u23F9 \u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C ")];
      a4(" \u23F9 \u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C ");
    }), _: 1 }, i2)) : t2("<!---->"), t2('</div></header><main class="app-main" data-v-aa95be56>'), ssrRenderSlot(a3.$slots, "default", {}, null, t2, i2), t2('</main><footer class="app-footer" data-v-aa95be56><div class="footer-content" data-v-aa95be56><span data-v-aa95be56>\u041C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0440\u0435\u043D\u0430\u0436\u0451\u0440 \xA9 2026</span><span class="footer-separator" data-v-aa95be56>\u2022</span><span data-v-aa95be56>\u0412\u0435\u0440\u0441\u0438\u044F 3.0 (Nuxt 3)</span></div></footer>'), t2(ssrRenderComponent(unref(S), { modelValue: u2.value, "onUpdate:modelValue": (e2) => u2.value = e2, profiles: unref(r2).profiles.value, onSave: g2, onLoad: C2, onDelete: y2 }, null, i2)), t2("</div>");
  };
} }), D = P.setup;
P.setup = (e2, a2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue"), D ? D(e2, a2) : void 0;
};
const K = o(P, [["__scopeId", "data-v-aa95be56"]]);

export { K as default };
