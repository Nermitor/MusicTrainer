import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, shallowRef, getCurrentInstance, provide, cloneVNode, h, createElementBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { r } from './useStatistics-Fmyp9JtG.mjs';
import { s } from './v3-_2QdYnGM.mjs';
import { o } from './_plugin-vue_export-helper-BCo6x5W8.mjs';
import './state-Cgstzz6o.mjs';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

defineComponent({ name: "ServerPlaceholder", render: () => createElementBlock("div") });
const _ = /* @__PURE__ */ Symbol.for("nuxt:client-only"), T = defineComponent({ name: "ClientOnly", inheritAttrs: false, props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"], setup(e2, { slots: s2, attrs: l2 }) {
  const d2 = shallowRef(false), c2 = getCurrentInstance();
  return c2 && (c2._nuxtClientOnly = true), provide(_, true), () => {
    var _a;
    if (d2.value) {
      const e3 = (_a = s2.default) == null ? void 0 : _a.call(s2);
      return e3 && 1 === e3.length ? [cloneVNode(e3[0], l2)] : e3;
    }
    const o2 = s2.fallback || s2.placeholder;
    if (o2) return h(o2);
    const i2 = e2.fallback || e2.placeholder || "", n2 = e2.fallbackTag || e2.placeholderTag || "span";
    return createElementBlock(n2, l2, i2);
  };
} }), b = defineComponent({ __name: "training", __ssrInlineRender: true, setup(e2) {
  var _a;
  s({ title: "\u041C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0440\u0435\u043D\u0430\u0436\u0451\u0440 - \u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430", meta: [{ name: "description", content: "\u0422\u0440\u0435\u043D\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C \u0447\u0438\u0442\u0430\u0442\u044C \u043D\u043E\u0442\u044B \u043D\u0430 \u043C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u043E\u043C \u0442\u0440\u0435\u043D\u0430\u0436\u0435\u0440\u0435" }] }), ref(false), ref(null), ref(null);
  const t2 = useRoute();
  return ref(((_a = t2.state) == null ? void 0 : _a.settings) || { speed: 1, withAccidentals: false, noTimer: true, showClef: true, alwaysShowHint: false, hintDelay: 0, octaveRange: "all", locationRange: "all", trainingMode: "infinite", instrumentType: "piano", midiCalibration: 0, inputMode: "virtual-piano", enableKeyboardInput: true }), r(), (() => {
    const e3 = ref(null); computed(() => null !== e3.value); computed(() => e3.value && 0 !== e3.value.totalNotes ? Math.round(e3.value.correctNotes / e3.value.totalNotes * 100) : 0); computed(() => {
      var _a2;
      return ((_a2 = e3.value) == null ? void 0 : _a2.totalNotes) || 0;
    });
  })(), (e3, t3, o2, i2) => {
    const n2 = T;
    t3(`<div${ssrRenderAttrs(mergeProps({ class: "training-page-wrapper" }, i2))} data-v-63d84618>`), t3(ssrRenderComponent(n2, null, { fallback: withCtx((e4, t4, o3, i3) => {
      if (!t4) return [createVNode("div", { class: "loading-placeholder" }, [createVNode("div", { class: "notation-block-placeholder" }), createVNode("div", { class: "piano-placeholder" })])];
      t4(`<div class="loading-placeholder" data-v-63d84618${i3}><div class="notation-block-placeholder" data-v-63d84618${i3}></div><div class="piano-placeholder" data-v-63d84618${i3}></div></div>`);
    }) }, o2)), t3("</div>");
  };
} }), x = b.setup;
b.setup = (e2, t2) => {
  const o2 = useSSRContext();
  return (o2.modules || (o2.modules = /* @__PURE__ */ new Set())).add("pages/training.vue"), x ? x(e2, t2) : void 0;
};
const C = o(b, [["__scopeId", "data-v-63d84618"]]);

export { C as default };
