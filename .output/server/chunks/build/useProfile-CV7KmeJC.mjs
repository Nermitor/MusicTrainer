import { computed, defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderTeleport, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { o as o$1 } from './_plugin-vue_export-helper-BCo6x5W8.mjs';
import { l, s, r, o } from './state-Cgstzz6o.mjs';

const p = defineComponent({ __name: "BaseButton", __ssrInlineRender: true, props: { variant: { default: "secondary" }, disabled: { type: Boolean, default: false } }, emits: ["click"], setup: (e2, { emit: t2 }) => (t3, d2, o2, i2) => {
  d2(`<button${ssrRenderAttrs(mergeProps({ class: ["base-button", e2.variant, { disabled: e2.disabled }], disabled: e2.disabled }, i2))} data-v-cc1e0245>`), ssrRenderSlot(t3.$slots, "default", {}, null, d2, o2), d2("</button>");
} }), f = p.setup;
p.setup = (e2, a2) => {
  const d2 = useSSRContext();
  return (d2.modules || (d2.modules = /* @__PURE__ */ new Set())).add("src/shared/ui/button/ui/BaseButton.vue"), f ? f(e2, a2) : void 0;
};
const b = o$1(p, [["__scopeId", "data-v-cc1e0245"]]), _ = defineComponent({ __name: "BaseModal", __ssrInlineRender: true, props: { modelValue: { type: Boolean }, title: {}, closable: { type: Boolean, default: true }, closeOnOverlay: { type: Boolean, default: true }, size: { default: "medium" } }, emits: ["update:modelValue", "close"], setup: (e2, { emit: a2 }) => (a3, t2, d2, s2) => {
  ssrRenderTeleport(t2, (t3) => {
    e2.modelValue ? (t3(`<div class="modal-overlay" data-v-dd10e456><div class="modal-content"${ssrRenderAttr("data-size", e2.size)} data-v-dd10e456>`), e2.title ? (t3(`<div class="modal-header" data-v-dd10e456><h2 class="modal-title" data-v-dd10e456>${ssrInterpolate(e2.title)}</h2>`), e2.closable ? t3('<button class="modal-close" data-v-dd10e456>\xD7</button>') : t3("<!---->"), t3("</div>")) : t3("<!---->"), t3('<div class="modal-body" data-v-dd10e456>'), ssrRenderSlot(a3.$slots, "default", {}, null, t3, d2), t3("</div>"), a3.$slots.footer ? (t3('<div class="modal-footer" data-v-dd10e456>'), ssrRenderSlot(a3.$slots, "footer", {}, null, t3, d2), t3("</div>")) : t3("<!---->"), t3("</div></div>")) : t3("<!---->");
  }, "body", false, d2);
} }), B = _.setup;
_.setup = (e2, a2) => {
  const d2 = useSSRContext();
  return (d2.modules || (d2.modules = /* @__PURE__ */ new Set())).add("src/shared/ui/modal/ui/BaseModal.vue"), B ? B(e2, a2) : void 0;
};
const h = o$1(_, [["__scopeId", "data-v-dd10e456"]]), x = () => {
  const e2 = l("profiles", () => []), a2 = (a3 = false) => {
    r(o.PROFILES, e2.value, a3);
  }, t2 = computed(() => e2.value.length);
  return { profiles: e2, profileCount: t2, loadProfiles: () => {
    var _a;
    0 === e2.value.length && (e2.value = (_a = s(o.PROFILES, [])) != null ? _a : []);
  }, saveProfiles: a2, createProfile: (t3, d2) => {
    const s2 = { id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, name: t3.trim(), ...d2 };
    return e2.value.push(s2), a2(true), s2;
  }, deleteProfile: (t3) => {
    e2.value = e2.value.filter((e3) => e3.id !== t3), a2(true);
  }, getProfileById: (a3) => e2.value.find((e3) => e3.id === a3) };
};

export { b, h, x };
