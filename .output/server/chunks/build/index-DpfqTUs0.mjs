import { defineComponent, ref, provide, mergeProps, computed, unref, withCtx, createTextVNode, isRef, watch, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderSlot, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { x, b, h } from './useProfile-CV7KmeJC.mjs';
import { o } from './_plugin-vue_export-helper-BCo6x5W8.mjs';
import { c } from './state-Cgstzz6o.mjs';
import { r } from './useStatistics-Fmyp9JtG.mjs';
import { s } from './v3-_2QdYnGM.mjs';
import { n as ge } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const A = defineComponent({ __name: "BaseSlider", __ssrInlineRender: true, props: { modelValue: {}, min: {}, max: {}, step: { default: 1 }, label: {}, showValue: { type: Boolean, default: true }, disabled: { type: Boolean, default: false }, valueFormatter: {} }, emits: ["update:modelValue"], setup(e2, { emit: l2 }) {
  const d2 = e2, s2 = ref("slider-input"), n2 = computed(() => d2.valueFormatter ? d2.valueFormatter(d2.modelValue) : d2.modelValue.toString());
  return (a2, i2, l3, d3) => {
    i2(`<div${ssrRenderAttrs(mergeProps({ class: ["base-slider", { disabled: e2.disabled }] }, d3))} data-v-0d6358a8>`), e2.label ? (i2(`<label${ssrRenderAttr("for", s2.value)} class="slider-label" data-v-0d6358a8>${ssrInterpolate(e2.label)} `), e2.showValue ? i2(`<span class="slider-value" data-v-0d6358a8>${ssrInterpolate(n2.value)}</span>`) : i2("<!---->"), i2("</label>")) : i2("<!---->"), i2(`<input${ssrRenderAttr("id", s2.value)} type="range"${ssrRenderAttr("min", e2.min)}${ssrRenderAttr("max", e2.max)}${ssrRenderAttr("step", e2.step)}${ssrRenderAttr("value", e2.modelValue)}${ssrIncludeBooleanAttr(e2.disabled) ? " disabled" : ""}${ssrRenderAttr("aria-label", e2.label || "Slider")}${ssrRenderAttr("aria-valuemin", e2.min)}${ssrRenderAttr("aria-valuemax", e2.max)}${ssrRenderAttr("aria-valuenow", e2.modelValue)} class="slider-input" data-v-0d6358a8></div>`);
  };
} }), q = A.setup;
A.setup = (e2, a2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("src/shared/ui/slider/ui/BaseSlider.vue"), q ? q(e2, a2) : void 0;
};
const E = o(A, [["__scopeId", "data-v-0d6358a8"]]), K = defineComponent({ __name: "BaseCheckbox", __ssrInlineRender: true, props: { modelValue: { type: Boolean }, disabled: { type: Boolean, default: false } }, emits: ["update:modelValue"], setup: (e2, { emit: a2 }) => (a3, i2, l2, d2) => {
  i2(`<label${ssrRenderAttrs(mergeProps({ class: ["base-checkbox", { disabled: e2.disabled }] }, d2))} data-v-e5781221><input type="checkbox"${ssrIncludeBooleanAttr(e2.modelValue) ? " checked" : ""}${ssrIncludeBooleanAttr(e2.disabled) ? " disabled" : ""} class="checkbox-input" data-v-e5781221><span class="checkbox-label" data-v-e5781221>`), ssrRenderSlot(a3.$slots, "default", {}, null, i2, l2), i2("</span></label>");
} }), F = K.setup;
K.setup = (e2, a2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("src/shared/ui/checkbox/ui/BaseCheckbox.vue"), F ? F(e2, a2) : void 0;
};
const G = o(K, [["__scopeId", "data-v-e5781221"]]), P = defineComponent({ __name: "BaseRadioGroup", __ssrInlineRender: true, props: { modelValue: {}, options: {}, label: {}, inline: { type: Boolean, default: false }, disabled: { type: Boolean, default: false } }, emits: ["update:modelValue"], setup: (e2, { emit: a2 }) => (a3, i2, l2, d2) => {
  i2(`<div${ssrRenderAttrs(mergeProps({ class: "base-radio-group" }, d2))} data-v-077c3967>`), e2.label ? i2(`<label class="group-label" data-v-077c3967>${ssrInterpolate(e2.label)}</label>`) : i2("<!---->"), i2(`<div class="${ssrRenderClass([{ inline: e2.inline }, "radio-options"])}" data-v-077c3967><!--[-->`), ssrRenderList(e2.options, (a4) => {
    i2(`<label class="${ssrRenderClass([{ disabled: e2.disabled }, "radio-option"])}" data-v-077c3967><input type="radio"${ssrRenderAttr("value", a4.value)}${ssrIncludeBooleanAttr(e2.modelValue === a4.value) ? " checked" : ""}${ssrIncludeBooleanAttr(e2.disabled) ? " disabled" : ""} class="radio-input" data-v-077c3967><span class="radio-label" data-v-077c3967>${ssrInterpolate(a4.label)}</span></label>`);
  }), i2("<!--]--></div></div>");
} }), L = P.setup;
P.setup = (e2, a2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("src/shared/ui/radio-group/ui/BaseRadioGroup.vue"), L ? L(e2, a2) : void 0;
};
const O = o(P, [["__scopeId", "data-v-077c3967"]]), H = [{ id: "piano", name: "\u041F\u0438\u0430\u043D\u0438\u043D\u043E", icon: "\u{1F3B9}", toneSynth: "piano" }, { id: "synth", name: "\u0421\u0438\u043D\u0442\u0435\u0437\u0430\u0442\u043E\u0440", icon: "\u{1F39B}\uFE0F", toneSynth: "synth" }, { id: "guitar", name: "\u0413\u0438\u0442\u0430\u0440\u0430", icon: "\u{1F3B8}", toneSynth: "pluck" }, { id: "bass", name: "\u0411\u0430\u0441", icon: "\u{1F3B8}", toneSynth: "membraneSynth" }, { id: "organ", name: "\u041E\u0440\u0433\u0430\u043D", icon: "\u{1F3B9}", toneSynth: "fmSynth" }];
function z(e2, a2, t2) {
  return computed({ get: () => e2.modelValue[t2], set: (i2) => a2("update:modelValue", { ...e2.modelValue, [t2]: i2 }) });
}
const N = defineComponent({ __name: "InstrumentSelector", __ssrInlineRender: true, props: { modelValue: {} }, emits: ["update:modelValue"], setup(e2, { emit: a2 }) {
  const i2 = H;
  return (a3, l2, s2, n2) => {
    l2(`<div${ssrRenderAttrs(mergeProps({ class: "instrument-selector" }, n2))} data-v-0a618079><h3 class="selector-title" data-v-0a618079>\u{1F3B9} \u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442</h3><div class="instruments-grid" data-v-0a618079><!--[-->`), ssrRenderList(unref(i2), (a4) => {
      l2(`<label class="${ssrRenderClass([{ active: e2.modelValue === a4.id }, "instrument-card"])}" data-v-0a618079><input type="radio"${ssrRenderAttr("value", a4.id)}${ssrIncludeBooleanAttr(e2.modelValue === a4.id) ? " checked" : ""} class="instrument-input" data-v-0a618079><div class="instrument-icon" data-v-0a618079>${ssrInterpolate(a4.icon)}</div><div class="instrument-name" data-v-0a618079>${ssrInterpolate(a4.name)}</div></label>`);
    }), l2("<!--]--></div></div>");
  };
} }), Q = N.setup;
N.setup = (e2, a2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("src/features/instrument-selector/ui/InstrumentSelector.vue"), Q ? Q(e2, a2) : void 0;
};
const J = o(N, [["__scopeId", "data-v-0a618079"]]), W = defineComponent({ __name: "InputModeSelector", __ssrInlineRender: true, props: { modelValue: {}, midiCalibration: {}, enableKeyboardInput: { type: Boolean } }, emits: ["update:modelValue", "update:enableKeyboardInput", "startCalibration"], setup(e2, { emit: a2 }) {
  const i2 = [{ id: "midi", icon: "\u{1F3B9}", name: "MIDI-\u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0430", description: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435 MIDI-\u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E" }, { id: "virtual-piano", icon: "\u{1F3BC}", name: "\u0412\u0438\u0440\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0438\u0430\u043D\u0438\u043D\u043E", description: "\u041C\u044B\u0448\u044C \u0438\u043B\u0438 \u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0430" }];
  return (a3, l2, d2, s2) => {
    l2(`<div${ssrRenderAttrs(mergeProps({ class: "input-mode-selector" }, s2))} data-v-97c4ceab><h3 class="selector-title" data-v-97c4ceab>\u2328\uFE0F \u0420\u0435\u0436\u0438\u043C \u0432\u0432\u043E\u0434\u0430</h3><div class="modes-grid" data-v-97c4ceab><!--[-->`), ssrRenderList(i2, (a4) => {
      l2(`<label class="${ssrRenderClass([{ active: e2.modelValue === a4.id }, "mode-card"])}" data-v-97c4ceab><input type="radio"${ssrRenderAttr("value", a4.id)}${ssrIncludeBooleanAttr(e2.modelValue === a4.id) ? " checked" : ""} class="mode-input" data-v-97c4ceab><div class="mode-icon" data-v-97c4ceab>${ssrInterpolate(a4.icon)}</div><div class="mode-name" data-v-97c4ceab>${ssrInterpolate(a4.name)}</div><div class="mode-description" data-v-97c4ceab>${ssrInterpolate(a4.description)}</div></label>`);
    }), l2("<!--]--></div>"), "midi" === e2.modelValue ? l2(`<div class="calibration-section" data-v-97c4ceab><h4 class="calibration-title" data-v-97c4ceab>\u{1F39B}\uFE0F \u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0430 MIDI</h4><p class="calibration-description" data-v-97c4ceab> \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u043E\u0442\u0443 &quot;\u0414\u043E&quot; \u043C\u043B\u0430\u0434\u0448\u0435\u0439 \u043E\u043A\u0442\u0430\u0432\u044B \u043D\u0430 \u0432\u0430\u0448\u0435\u0439 MIDI-\u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0435 </p><div class="calibration-value" data-v-97c4ceab> \u0422\u0435\u043A\u0443\u0449\u0435\u0435 \u0441\u043C\u0435\u0449\u0435\u043D\u0438\u0435: ${ssrInterpolate(e2.midiCalibration > 0 ? "+" : "")}${ssrInterpolate(e2.midiCalibration)}</div><button class="calibration-btn" data-v-97c4ceab> \u{1F3B9} \u041D\u0430\u0447\u0430\u0442\u044C \u043A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0443 </button></div>`) : l2("<!---->"), "virtual-piano" === e2.modelValue ? l2(`<div class="keyboard-section" data-v-97c4ceab><label class="keyboard-checkbox" data-v-97c4ceab><input type="checkbox"${ssrIncludeBooleanAttr(e2.enableKeyboardInput) ? " checked" : ""} data-v-97c4ceab><span data-v-97c4ceab>\u2328\uFE0F \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0443 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430 (A-L, Q-P)</span></label></div>`) : l2("<!---->"), l2("</div>");
  };
} }), X = W.setup;
W.setup = (e2, a2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("src/features/input-mode-selector/ui/InputModeSelector.vue"), X ? X(e2, a2) : void 0;
};
const Y = o(W, [["__scopeId", "data-v-97c4ceab"]]), Z = defineComponent({ __name: "KeyBindingModal", __ssrInlineRender: true, props: { modelValue: { type: Boolean } }, emits: ["update:modelValue", "close"], setup(e2, { emit: l2 }) {
  const f2 = e2, k2 = l2, g2 = computed({ get: () => f2.modelValue, set: (e3) => k2("update:modelValue", e3) }), h2 = [{ midi: 60, name: "C4", isBlack: false }, { midi: 61, name: "C#4", isBlack: true }, { midi: 62, name: "D4", isBlack: false }, { midi: 63, name: "D#4", isBlack: true }, { midi: 64, name: "E4", isBlack: false }, { midi: 65, name: "F4", isBlack: false }, { midi: 66, name: "F#4", isBlack: true }, { midi: 67, name: "G4", isBlack: false }, { midi: 68, name: "G#4", isBlack: true }, { midi: 69, name: "A4", isBlack: false }, { midi: 70, name: "A#4", isBlack: true }, { midi: 71, name: "B4", isBlack: false }, { midi: 72, name: "C5", isBlack: false }, { midi: 73, name: "C#5", isBlack: true }, { midi: 74, name: "D5", isBlack: false }, { midi: 75, name: "D#5", isBlack: true }, { midi: 76, name: "E5", isBlack: false }, { midi: 77, name: "F5", isBlack: false }, { midi: 78, name: "F#5", isBlack: true }, { midi: 79, name: "G5", isBlack: false }, { midi: 80, name: "G#5", isBlack: true }, { midi: 81, name: "A5", isBlack: false }, { midi: 82, name: "A#5", isBlack: true }, { midi: 83, name: "B5", isBlack: false }], y2 = computed(() => h2.filter((e3) => !e3.isBlack)), x2 = computed(() => h2.filter((e3) => e3.isBlack)), C2 = ref(null), { rawBindings: S2 } = c(), w2 = S2;
  let j2 = false;
  function R2(e3) {
    C2.value = e3;
  }
  function T2(e3) {
    if (null === C2.value) return;
    if (["Escape", "Tab", "Enter", "Shift", "Control", "Alt", "Meta"].includes(e3.key)) return void ("Escape" === e3.key && (C2.value = null));
    e3.preventDefault();
    const a2 = e3.key.toLowerCase(), i2 = { ...w2.value };
    for (const t2 in i2) i2[t2] === a2.toUpperCase() && delete i2[t2];
    i2[C2.value] = a2.toUpperCase(), (function() {
      if (null === C2.value) return;
      const e4 = h2.findIndex((e5) => e5.midi === C2.value);
      e4 < h2.length - 1 ? C2.value = h2[e4 + 1].midi : C2.value = null;
    })();
  }
  function U2() {
    confirm("\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0441\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0441\u0435 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438 \u043A\u043B\u0430\u0432\u0438\u0448?") && (C2.value = null);
  }
  function A2() {
    C2.value = null, k2("close");
  }
  function q2(e3) {
    const a2 = h2.find((a3) => a3.midi === e3);
    return (a2 == null ? void 0 : a2.name) || "";
  }
  function E2(e3) {
    return `${(7 * Math.floor(e3 / 5) + [1, 2, 4, 5, 6][e3 % 5]) * (100 / 14)}%`;
  }
  return watch(g2, (e3) => {
    e3 ? j2 || ((void 0).addEventListener("keydown", T2), j2 = true) : (j2 && ((void 0).removeEventListener("keydown", T2), j2 = false), C2.value = null);
  }, { immediate: true }), (e3, a2, i2, l3) => {
    a2(ssrRenderComponent(unref(h), mergeProps({ modelValue: g2.value, "onUpdate:modelValue": (e4) => g2.value = e4, title: "\u2328\uFE0F \u041F\u0440\u0438\u0432\u044F\u0437\u043A\u0430 \u043A\u043B\u0430\u0432\u0438\u0448", size: "large", onClose: (e4) => k2("close") }, l3), { default: withCtx((e4, a3, i3, t2) => {
      if (!a3) return [createVNode("div", { class: "key-binding-modal" }, [createVNode("p", { class: "instruction" }, " \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043A\u043B\u0430\u0432\u0438\u0448\u0443 \u043F\u0438\u0430\u043D\u0438\u043D\u043E, \u0437\u0430\u0442\u0435\u043C \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u043D\u0430 \u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0435 \u0434\u043B\u044F \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438 "), createVNode("div", { class: "piano-container" }, [createVNode("div", { class: "piano-keys" }, [(openBlock(true), createBlock(Fragment, null, renderList(y2.value, (e5) => (openBlock(), createBlock("div", { key: e5.midi, class: ["piano-key white", { selected: C2.value === e5.midi, bound: unref(w2)[e5.midi] }], onClick: (a4) => R2(e5.midi) }, [createVNode("span", { class: "note-name" }, toDisplayString(e5.name), 1), unref(w2)[e5.midi] ? (openBlock(), createBlock("span", { key: 0, class: "bound-key-label" }, toDisplayString(unref(w2)[e5.midi]), 1)) : createCommentVNode("", true)], 10, ["onClick"]))), 128))]), createVNode("div", { class: "black-keys-container" }, [(openBlock(true), createBlock(Fragment, null, renderList(x2.value, (e5, a4) => (openBlock(), createBlock("div", { key: e5.midi, class: ["piano-key black", { selected: C2.value === e5.midi, bound: unref(w2)[e5.midi] }], style: { left: E2(a4) }, onClick: (a5) => R2(e5.midi) }, [createVNode("span", { class: "note-name-black" }, toDisplayString(e5.name), 1), unref(w2)[e5.midi] ? (openBlock(), createBlock("span", { key: 0, class: "bound-key-label-black" }, toDisplayString(unref(w2)[e5.midi]), 1)) : createCommentVNode("", true)], 14, ["onClick"]))), 128))])]), null !== C2.value ? (openBlock(), createBlock("div", { key: 0, class: "status-bar" }, [createVNode("span", { class: "status-text" }, [createTextVNode(" \u0412\u044B\u0431\u0440\u0430\u043D\u0430 \u043D\u043E\u0442\u0430: "), createVNode("strong", null, toDisplayString(q2(C2.value)), 1), createTextVNode(" (MIDI " + toDisplayString(C2.value) + ") \u2014 \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0443 \u043D\u0430 \u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0435 ", 1)])])) : createCommentVNode("", true), createVNode("div", { class: "modal-actions" }, [createVNode("button", { class: "action-btn secondary", onClick: U2 }, " \u{1F504} \u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0441\u0435 "), createVNode("button", { class: "action-btn primary", onClick: A2 }, " \u2713 \u0413\u043E\u0442\u043E\u0432\u043E ")])])];
      a3(`<div class="key-binding-modal" data-v-ab21101d${t2}><p class="instruction" data-v-ab21101d${t2}> \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043A\u043B\u0430\u0432\u0438\u0448\u0443 \u043F\u0438\u0430\u043D\u0438\u043D\u043E, \u0437\u0430\u0442\u0435\u043C \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u043D\u0430 \u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0435 \u0434\u043B\u044F \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438 </p><div class="piano-container" data-v-ab21101d${t2}><div class="piano-keys" data-v-ab21101d${t2}><!--[-->`), ssrRenderList(y2.value, (e5) => {
        a3(`<div class="${ssrRenderClass([{ selected: C2.value === e5.midi, bound: unref(w2)[e5.midi] }, "piano-key white"])}" data-v-ab21101d${t2}><span class="note-name" data-v-ab21101d${t2}>${ssrInterpolate(e5.name)}</span>`), unref(w2)[e5.midi] ? a3(`<span class="bound-key-label" data-v-ab21101d${t2}>${ssrInterpolate(unref(w2)[e5.midi])}</span>`) : a3("<!---->"), a3("</div>");
      }), a3(`<!--]--></div><div class="black-keys-container" data-v-ab21101d${t2}><!--[-->`), ssrRenderList(x2.value, (e5, i4) => {
        a3(`<div class="${ssrRenderClass([{ selected: C2.value === e5.midi, bound: unref(w2)[e5.midi] }, "piano-key black"])}" style="${ssrRenderStyle({ left: E2(i4) })}" data-v-ab21101d${t2}><span class="note-name-black" data-v-ab21101d${t2}>${ssrInterpolate(e5.name)}</span>`), unref(w2)[e5.midi] ? a3(`<span class="bound-key-label-black" data-v-ab21101d${t2}>${ssrInterpolate(unref(w2)[e5.midi])}</span>`) : a3("<!---->"), a3("</div>");
      }), a3("<!--]--></div></div>"), null !== C2.value ? a3(`<div class="status-bar" data-v-ab21101d${t2}><span class="status-text" data-v-ab21101d${t2}> \u0412\u044B\u0431\u0440\u0430\u043D\u0430 \u043D\u043E\u0442\u0430: <strong data-v-ab21101d${t2}>${ssrInterpolate(q2(C2.value))}</strong> (MIDI ${ssrInterpolate(C2.value)}) \u2014 \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0443 \u043D\u0430 \u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0435 </span></div>`) : a3("<!---->"), a3(`<div class="modal-actions" data-v-ab21101d${t2}><button class="action-btn secondary" data-v-ab21101d${t2}> \u{1F504} \u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0441\u0435 </button><button class="action-btn primary" data-v-ab21101d${t2}> \u2713 \u0413\u043E\u0442\u043E\u0432\u043E </button></div></div>`);
    }), _: 1 }, i2));
  };
} }), ee = Z.setup;
Z.setup = (e2, a2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("src/features/key-binding-modal/ui/KeyBindingModal.vue"), ee ? ee(e2, a2) : void 0;
};
const ae = o(Z, [["__scopeId", "data-v-ab21101d"]]), ie = defineComponent({ __name: "SettingsPanel", __ssrInlineRender: true, props: { modelValue: {} }, emits: ["update:modelValue", "startCalibration"], setup(e2, { emit: l2 }) {
  const s2 = e2, o2 = l2, { speed: c2, withAccidentals: u2, noTimer: r2, showClef: v2, alwaysShowHint: m2, hintDelay: p2, octaveRange: k2, locationRange: h2, trainingMode: x2, instrumentType: V2, midiCalibration: B2, inputMode: M2, enableKeyboardInput: S2 } = (function(e3, a2, i2) {
    const t2 = {};
    for (const l3 of i2) t2[l3] = z(e3, a2, l3);
    return t2;
  })(s2, o2, ["speed", "withAccidentals", "noTimer", "showClef", "alwaysShowHint", "hintDelay", "octaveRange", "locationRange", "trainingMode", "instrumentType", "midiCalibration", "inputMode", "enableKeyboardInput"]);
  function w2() {
    o2("startCalibration");
  }
  const j2 = [{ value: "all", label: "\u0412\u0441\u0435" }, { value: "octave4", label: "\u041F\u0435\u0440\u0432\u0430\u044F \u043E\u043A\u0442\u0430\u0432\u0430" }, { value: "octave5", label: "\u0412\u0442\u043E\u0440\u0430\u044F \u043E\u043A\u0442\u0430\u0432\u0430" }], R2 = [{ value: "all", label: "\u0412\u0441\u0435" }, { value: "on", label: "\u041D\u0430 \u043B\u0438\u043D\u0438\u0438" }, { value: "between", label: "\u041C\u0435\u0436\u0434\u0443 \u043B\u0438\u043D\u0438\u0439" }], T2 = ref(false), { rawBindings: U2 } = c();
  function A2() {
    T2.value = false;
  }
  const q2 = computed(() => Object.keys(U2.value).length > 0), K2 = computed(() => Object.keys(U2.value).length);
  return (e3, a2, i2, l3) => {
    a2(`<div${ssrRenderAttrs(mergeProps({ class: "settings-panel" }, l3))} data-v-4053c131><div class="settings-grid" data-v-4053c131><div class="settings-card medium-card" data-v-4053c131><h2 data-v-4053c131>\u23F1\uFE0F \u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C</h2>`), a2(ssrRenderComponent(unref(G), { modelValue: unref(r2), "onUpdate:modelValue": (e4) => isRef(r2) ? r2.value = e4 : null }, { default: withCtx((e4, a3, i3, t2) => {
      if (!a3) return [createTextVNode("\u0411\u0435\u0437 \u0442\u0430\u0439\u043C\u0435\u0440\u0430")];
      a3("\u0411\u0435\u0437 \u0442\u0430\u0439\u043C\u0435\u0440\u0430");
    }), _: 1 }, i2)), a2(ssrRenderComponent(unref(E), { modelValue: unref(c2), "onUpdate:modelValue": (e4) => isRef(c2) ? c2.value = e4 : null, min: 0.1, max: 5, step: 0.1, label: "\u0412\u0440\u0435\u043C\u044F \u043D\u0430 \u043D\u043E\u0442\u0443 (\u0441\u0435\u043A)", disabled: unref(r2), "value-formatter": (e4) => `${e4}\u0441` }, null, i2)), a2('</div><div class="settings-card small-card" data-v-4053c131><h2 data-v-4053c131>\u2699\uFE0F \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E</h2>'), a2(ssrRenderComponent(unref(G), { modelValue: unref(u2), "onUpdate:modelValue": (e4) => isRef(u2) ? u2.value = e4 : null }, { default: withCtx((e4, a3, i3, t2) => {
      if (!a3) return [createTextVNode("\u041F\u043E\u043B\u0443\u0442\u043E\u043D\u044B")];
      a3("\u041F\u043E\u043B\u0443\u0442\u043E\u043D\u044B");
    }), _: 1 }, i2)), a2(ssrRenderComponent(unref(G), { modelValue: unref(v2), "onUpdate:modelValue": (e4) => isRef(v2) ? v2.value = e4 : null }, { default: withCtx((e4, a3, i3, t2) => {
      if (!a3) return [createTextVNode("\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043A\u043B\u044E\u0447")];
      a3("\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043A\u043B\u044E\u0447");
    }), _: 1 }, i2)), a2('</div><div class="settings-card small-card" data-v-4053c131><h2 data-v-4053c131>\u{1F3B9} \u041D\u043E\u0442\u044B</h2>'), a2(ssrRenderComponent(unref(O), { modelValue: unref(k2), "onUpdate:modelValue": (e4) => isRef(k2) ? k2.value = e4 : null, label: "\u041E\u043A\u0442\u0430\u0432\u0430", options: j2, inline: true }, null, i2)), a2(ssrRenderComponent(unref(O), { modelValue: unref(h2), "onUpdate:modelValue": (e4) => isRef(h2) ? h2.value = e4 : null, label: "\u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435", options: R2, inline: true }, null, i2)), a2('</div><div class="settings-card small-card" data-v-4053c131>'), a2(ssrRenderComponent(unref(J), { modelValue: unref(V2), "onUpdate:modelValue": (e4) => isRef(V2) ? V2.value = e4 : null }, null, i2)), a2('</div><div class="settings-card medium-card" data-v-4053c131><h2 data-v-4053c131>\u{1F4A1} \u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438</h2>'), a2(ssrRenderComponent(unref(G), { modelValue: unref(m2), "onUpdate:modelValue": (e4) => isRef(m2) ? m2.value = e4 : null }, { default: withCtx((e4, a3, i3, t2) => {
      if (!a3) return [createTextVNode("\u0412\u0441\u0435\u0433\u0434\u0430 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C")];
      a3("\u0412\u0441\u0435\u0433\u0434\u0430 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C");
    }), _: 1 }, i2)), a2(ssrRenderComponent(unref(E), { modelValue: unref(p2), "onUpdate:modelValue": (e4) => isRef(p2) ? p2.value = e4 : null, min: 0, max: 10, step: 0.5, label: "\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 (\u0441\u0435\u043A)", disabled: unref(m2), "value-formatter": (e4) => 0 === e4 ? "\u041D\u0435\u0442" : `${e4}\u0441` }, null, i2)), a2('</div><div class="settings-card full-width" data-v-4053c131>'), a2(ssrRenderComponent(unref(Y), { modelValue: unref(M2), "onUpdate:modelValue": (e4) => isRef(M2) ? M2.value = e4 : null, "midi-calibration": unref(B2), "enable-keyboard-input": unref(S2), onStartCalibration: w2 }, null, i2)), a2('<div class="section-divider" data-v-4053c131></div><div class="key-binding-section" data-v-4053c131><h2 data-v-4053c131>\u2328\uFE0F \u041F\u0440\u0438\u0432\u044F\u0437\u043A\u0430 \u043A\u043B\u0430\u0432\u0438\u0448</h2><p class="hint-text" data-v-4053c131>\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438 \u043A\u043B\u0430\u0432\u0438\u0448 \u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u044B \u043A \u043D\u043E\u0442\u0430\u043C</p><button class="open-binding-btn" data-v-4053c131> \u{1F3B9} \u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u043F\u0440\u0438\u0432\u044F\u0437\u043E\u043A </button>'), q2.value ? a2(`<div class="bindings-summary" data-v-4053c131><span class="summary-text" data-v-4053c131>\u2713 \u041D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u043E \u043F\u0440\u0438\u0432\u044F\u0437\u043E\u043A: ${ssrInterpolate(K2.value)}</span></div>`) : a2("<!---->"), a2(`</div></div><div class="settings-card full-width" data-v-4053c131><h2 data-v-4053c131>\u{1F3AE} \u0420\u0435\u0436\u0438\u043C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438</h2><div class="mode-selector" role="radiogroup" aria-label="\u0420\u0435\u0436\u0438\u043C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438" data-v-4053c131><label class="${ssrRenderClass([{ active: "infinite" === unref(x2) }, "mode-option"])}" data-v-4053c131><input type="radio" name="training-mode" value="infinite"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(x2), "infinite")) ? " checked" : ""} aria-label="\u0411\u0435\u0441\u043A\u043E\u043D\u0435\u0447\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C" data-v-4053c131><div class="mode-content" data-v-4053c131><div class="mode-icon" data-v-4053c131>\u221E</div><div class="mode-name" data-v-4053c131>\u0411\u0435\u0441\u043A\u043E\u043D\u0435\u0447\u043D\u044B\u0439</div><div class="mode-description" data-v-4053c131>\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430 \u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439</div></div></label><label class="${ssrRenderClass([{ active: "exam" === unref(x2) }, "mode-option"])}" data-v-4053c131><input type="radio" name="training-mode" value="exam"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(x2), "exam")) ? " checked" : ""} aria-label="\u042D\u043A\u0437\u0430\u043C\u0435\u043D" data-v-4053c131><div class="mode-content" data-v-4053c131><div class="mode-icon" data-v-4053c131>\u{1F4DD}</div><div class="mode-name" data-v-4053c131>\u042D\u043A\u0437\u0430\u043C\u0435\u043D</div><div class="mode-description" data-v-4053c131>20 \u043D\u043E\u0442, \u043E\u0446\u0435\u043D\u043A\u0430 \u0432 \u043A\u043E\u043D\u0446\u0435</div></div></label><label class="${ssrRenderClass([{ active: "timed" === unref(x2) }, "mode-option"])}" data-v-4053c131><input type="radio" name="training-mode" value="timed"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(x2), "timed")) ? " checked" : ""} aria-label="\u041D\u0430 \u0432\u0440\u0435\u043C\u044F" data-v-4053c131><div class="mode-content" data-v-4053c131><div class="mode-icon" data-v-4053c131>\u23F1\uFE0F</div><div class="mode-name" data-v-4053c131>\u041D\u0430 \u0432\u0440\u0435\u043C\u044F</div><div class="mode-description" data-v-4053c131>60 \u0441\u0435\u043A\u0443\u043D\u0434 \u0438\u0441\u043F\u044B\u0442\u0430\u043D\u0438\u0435</div></div></label><label class="${ssrRenderClass([{ active: "survival" === unref(x2) }, "mode-option"])}" data-v-4053c131><input type="radio" name="training-mode" value="survival"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(x2), "survival")) ? " checked" : ""} aria-label="\u0412\u044B\u0436\u0438\u0432\u0430\u043D\u0438\u0435" data-v-4053c131><div class="mode-content" data-v-4053c131><div class="mode-icon" data-v-4053c131>\u2764\uFE0F</div><div class="mode-name" data-v-4053c131>\u0412\u044B\u0436\u0438\u0432\u0430\u043D\u0438\u0435</div><div class="mode-description" data-v-4053c131>3 \u0436\u0438\u0437\u043D\u0438, \u043D\u0435 \u043E\u0448\u0438\u0431\u0438\u0441\u044C!</div></div></label></div></div></div>`), a2(ssrRenderComponent(unref(ae), { modelValue: T2.value, "onUpdate:modelValue": (e4) => T2.value = e4, onClose: A2 }, null, i2)), a2("</div>");
  };
} }), te = ie.setup;
ie.setup = (e2, a2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("src/widgets/settings-panel/ui/SettingsPanel.vue"), te ? te(e2, a2) : void 0;
};
const le = o(ie, [["__scopeId", "data-v-4053c131"]]), de = defineComponent({ __name: "SettingsPage", __ssrInlineRender: true, props: { modelValue: {} }, emits: ["update:modelValue", "start", "start-calibration"], setup(e2, { emit: a2 }) {
  const l2 = e2, s2 = a2, o2 = computed({ get: () => l2.modelValue, set: (e3) => s2("update:modelValue", e3) });
  return (e3, a3, i2, l3) => {
    a3(`<div${ssrRenderAttrs(mergeProps({ class: "settings-page" }, l3))} data-v-56c48e28><div class="settings-header" data-v-56c48e28><h1 data-v-56c48e28>\u2699\uFE0F \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438</h1><p data-v-56c48e28>\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0434\u043B\u044F \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u043E\u0439 \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438</p></div>`), a3(ssrRenderComponent(unref(le), { modelValue: o2.value, "onUpdate:modelValue": (e4) => o2.value = e4, onStartCalibration: (e4) => s2("start-calibration") }, null, i2)), a3('<div class="settings-footer" data-v-56c48e28>'), a3(ssrRenderComponent(unref(b), { variant: "primary", size: "large", onClick: (e4) => s2("start") }, { default: withCtx((e4, a4, i3, t2) => {
      if (!a4) return [createTextVNode(" \u{1F3B5} \u041D\u0430\u0447\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443 ")];
      a4(" \u{1F3B5} \u041D\u0430\u0447\u0430\u0442\u044C \u0442\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0443 ");
    }), _: 1 }, i2)), a3("</div></div>");
  };
} }), se = de.setup;
de.setup = (e2, a2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("src/pages/settings/ui/SettingsPage.vue"), se ? se(e2, a2) : void 0;
};
const ne = o(de, [["__scopeId", "data-v-56c48e28"]]), oe = defineComponent({ __name: "index", __ssrInlineRender: true, setup(e2) {
  s({ title: "\u041C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0440\u0435\u043D\u0430\u0436\u0451\u0440 - \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438", meta: [{ name: "description", content: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0442\u0440\u0435\u043D\u0430\u0436\u0435\u0440\u0430 \u0434\u043B\u044F \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u044F \u043D\u043E\u0442" }], link: [] });
  const i2 = ref({ speed: 1, withAccidentals: false, noTimer: true, showClef: true, alwaysShowHint: false, hintDelay: 0, octaveRange: "all", locationRange: "all", trainingMode: "infinite", instrumentType: "piano", midiCalibration: 0, inputMode: "virtual-piano", enableKeyboardInput: true });
  x(), r();
  const { startCalibration: l2 } = (function() {
    const e3 = ref(false), i3 = ref(""), t2 = ref(0);
    function l3(a2, l4) {
      if (!a2.data || false === e3.value) return;
      const [d3, s3] = a2.data;
      if (144 === d3 && s3 > 0) {
        const a3 = 60 - s3;
        t2.value = a3, e3.value = false, i3.value = `\u041A\u0430\u043B\u0438\u0431\u0440\u043E\u0432\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430! \u0421\u043C\u0435\u0449\u0435\u043D\u0438\u0435: ${a3 > 0 ? "+" : ""}${a3}`, (void 0).requestMIDIAccess && (void 0).requestMIDIAccess().then((e4) => {
          const a4 = e4.inputs.values();
          for (const i4 of a4) i4.onmidimessage = null;
        }), l4 && l4(a3), setTimeout(() => {
          i3.value = "";
        }, 3e3);
      }
    }
    return { calibrationMode: e3, calibrationMessage: i3, calibrationOffset: t2, startCalibration: function(a2) {
      e3.value = true, i3.value = '\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0432\u0430\u0448\u0435\u0439 MIDI-\u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0435 \u043D\u043E\u0442\u0443 "\u0414\u043E" (C) \u043C\u043B\u0430\u0434\u0448\u0435\u0439 \u043E\u043A\u0442\u0430\u0432\u044B...', (void 0).requestMIDIAccess ? (void 0).requestMIDIAccess().then((e4) => {
        const i4 = e4.inputs.values();
        for (const t3 of i4) t3.onmidimessage = (e5) => l3(e5, a2);
      }).catch((a3) => {
        i3.value = "\u041E\u0448\u0438\u0431\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A MIDI \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0443", e3.value = false;
      }) : (i3.value = "MIDI \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0432\u0430\u0448\u0438\u043C \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u043E\u043C", e3.value = false);
    }, stopCalibration: function() {
      e3.value = false, i3.value = "", (void 0).requestMIDIAccess && (void 0).requestMIDIAccess().then((e4) => {
        const a2 = e4.inputs.values();
        for (const i4 of a2) i4.onmidimessage = null;
      });
    } };
  })();
  function d2() {
    ge({ path: "/training", state: { settings: i2.value } });
  }
  function s2() {
    l2((e3) => {
      i2.value.midiCalibration = e3;
    });
  }
  return provide("settings", i2), (e3, a2, l3, n2) => {
    a2(`<div${ssrRenderAttrs(mergeProps({ class: "settings-page-wrapper" }, n2))} data-v-1e037105>`), a2(ssrRenderComponent(ne, { modelValue: i2.value, "onUpdate:modelValue": (e4) => i2.value = e4, onStart: d2, onStartCalibration: s2 }, null, l3)), a2("</div>");
  };
} }), ce = oe.setup;
oe.setup = (e2, a2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("pages/index.vue"), ce ? ce(e2, a2) : void 0;
};
const ue = o(oe, [["__scopeId", "data-v-1e037105"]]);

export { ue as default };
