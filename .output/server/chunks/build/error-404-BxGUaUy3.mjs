import { mergeProps, withCtx, createTextVNode, toDisplayString, defineComponent, shallowRef, h, resolveComponent, computed, useSSRContext } from 'vue';
import { y as parseQuery, k as hasProtocol, m as joinURL, z as withTrailingSlash, A as withoutTrailingSlash } from '../_/nitro.mjs';
import { u as he, a as le, b as ce, r as xe, n as ge, c as te } from './server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { o } from './_plugin-vue_export-helper-BCo6x5W8.mjs';
import { s } from './v3-_2QdYnGM.mjs';
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
import 'vue-router';

function _(o2) {
  const i2 = o2.componentName || "NuxtLink";
  function s2(e2) {
    return "string" == typeof e2 && e2.startsWith("#");
  }
  function u2(e2) {
    var _a, _b, _c;
    const t2 = he(), r2 = ce(), i3 = computed(() => !!e2.target && "_self" !== e2.target), u3 = computed(() => {
      const t3 = e2.to || e2.href || "";
      return "string" == typeof t3 && hasProtocol(t3, { acceptRelative: true });
    }), l2 = resolveComponent("RouterLink"), d2 = l2 && "string" != typeof l2 ? l2.useLink : void 0, f2 = computed(() => {
      if (e2.external) return true;
      const t3 = e2.to || e2.href || "";
      return "object" != typeof t3 && ("" === t3 || u3.value);
    }), v2 = computed(() => {
      const r3 = e2.to || e2.href || "";
      return f2.value ? r3 : (function(e3, t3, r4) {
        const a2 = r4 != null ? r4 : o2.trailingSlash;
        if (!e3 || "append" !== a2 && "remove" !== a2) return e3;
        if ("string" == typeof e3) return A(e3, a2);
        const n2 = "path" in e3 && void 0 !== e3.path ? e3.path : t3(e3).path;
        return { ...e3, name: void 0, path: A(n2, a2) };
      })(r3, t2.resolve, e2.trailingSlash);
    }), h2 = f2.value ? void 0 : d2 == null ? void 0 : d2({ ...e2, to: v2 }), b2 = computed(() => {
      var _a2, _b2, _c2;
      const a2 = (_a2 = e2.trailingSlash) != null ? _a2 : o2.trailingSlash;
      if (!v2.value || u3.value || s2(v2.value)) return v2.value;
      if (f2.value) {
        const e3 = "object" == typeof v2.value && "path" in v2.value ? xe(v2.value) : v2.value;
        return A("object" == typeof e3 ? t2.resolve(e3).href : e3, a2);
      }
      return "object" == typeof v2.value ? (_c2 = (_b2 = t2.resolve(v2.value)) == null ? void 0 : _b2.href) != null ? _c2 : null : A(joinURL(r2.app.baseURL, v2.value), a2);
    });
    return { to: v2, hasTarget: i3, isAbsoluteUrl: u3, isExternal: f2, href: b2, isActive: (_a = h2 == null ? void 0 : h2.isActive) != null ? _a : computed(() => v2.value === t2.currentRoute.value.path), isExactActive: (_b = h2 == null ? void 0 : h2.isExactActive) != null ? _b : computed(() => v2.value === t2.currentRoute.value.path), route: (_c = h2 == null ? void 0 : h2.route) != null ? _c : computed(() => t2.resolve(v2.value)), async navigate(t3) {
      await ge(b2.value, { replace: e2.replace, external: f2.value || i3.value });
    } };
  }
  return defineComponent({ name: i2, props: { to: { type: [String, Object], default: void 0, required: false }, href: { type: [String, Object], default: void 0, required: false }, target: { type: String, default: void 0, required: false }, rel: { type: String, default: void 0, required: false }, noRel: { type: Boolean, default: void 0, required: false }, prefetch: { type: Boolean, default: void 0, required: false }, prefetchOn: { type: [String, Object], default: void 0, required: false }, noPrefetch: { type: Boolean, default: void 0, required: false }, activeClass: { type: String, default: void 0, required: false }, exactActiveClass: { type: String, default: void 0, required: false }, prefetchedClass: { type: String, default: void 0, required: false }, replace: { type: Boolean, default: void 0, required: false }, ariaCurrentValue: { type: String, default: void 0, required: false }, external: { type: Boolean, default: void 0, required: false }, custom: { type: Boolean, default: void 0, required: false }, trailingSlash: { type: String, default: void 0, required: false } }, useLink: u2, setup(e2, { slots: n2 }) {
    const i3 = he(), { to: l2, href: c2, navigate: p2, isExternal: f2, hasTarget: v2, isAbsoluteUrl: g2 } = u2(e2);
    shallowRef(false);
    async function x2(e3 = le()) {
    }
    return () => {
      var _a;
      if (!f2.value && !v2.value && !s2(l2.value)) {
        const t3 = { ref: void 0, to: l2.value, activeClass: e2.activeClass || o2.activeClass, exactActiveClass: e2.exactActiveClass || o2.exactActiveClass, replace: e2.replace, ariaCurrentValue: e2.ariaCurrentValue, custom: e2.custom };
        return e2.custom || (t3.rel = e2.rel || void 0), h(resolveComponent("RouterLink"), t3, n2.default);
      }
      const t2 = e2.target || null, u3 = ((...e3) => e3.find((e4) => void 0 !== e4))(e2.noRel ? "" : e2.rel, o2.externalRelAttribute, g2.value || v2.value ? "noopener noreferrer" : "") || null;
      return e2.custom ? n2.default ? n2.default({ href: c2.value, navigate: p2, prefetch: x2, get route() {
        if (!c2.value) return;
        const e3 = new URL(c2.value, "http://localhost");
        return { path: e3.pathname, fullPath: e3.pathname, get query() {
          return parseQuery(e3.search);
        }, hash: e3.hash, params: {}, name: void 0, matched: [], redirectedFrom: void 0, meta: {}, href: c2.value };
      }, rel: u3, target: t2, isExternal: f2.value || v2.value, isActive: false, isExactActive: false }) : null : h("a", { ref: void 0, href: c2.value || null, rel: u3, target: t2, onClick: (t3) => {
        if (!f2.value && !v2.value) return t3.preventDefault(), e2.replace ? i3.replace(c2.value) : i3.push(c2.value);
      } }, (_a = n2.default) == null ? void 0 : _a.call(n2));
    };
  } });
}
const q = _(te);
function A(e2, t2) {
  const r2 = "append" === t2 ? withTrailingSlash : withoutTrailingSlash;
  return hasProtocol(e2) && !e2.startsWith("http") ? e2 : r2(e2, true);
}
const z = { __name: "error-404", __ssrInlineRender: true, props: { appName: { type: String, default: "Nuxt" }, version: { type: String, default: "" }, statusCode: { type: Number, default: 404 }, statusMessage: { type: String, default: "Not Found" }, description: { type: String, default: "Sorry, the page you are looking for could not be found." }, backHome: { type: String, default: "Go back home" } }, setup(e2) {
  const t2 = e2;
  return s({ title: `${t2.statusCode} - ${t2.statusMessage} | ${t2.appName}`, script: [{ innerHTML: `!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();` }], style: [{ innerHTML: '*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }' }] }), (t3, r2, a2, n2) => {
    const l2 = q;
    r2(`<div${ssrRenderAttrs(mergeProps({ class: "antialiased bg-white dark:bg-black dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-black" }, n2))} data-v-edacca8d><div class="fixed left-0 right-0 spotlight z-10" data-v-edacca8d></div><div class="max-w-520px text-center z-20" data-v-edacca8d><h1 class="font-medium mb-8 sm:text-10xl text-8xl" data-v-edacca8d>${ssrInterpolate(e2.statusCode)}</h1><p class="font-light leading-tight mb-16 px-8 sm:px-0 sm:text-4xl text-xl" data-v-edacca8d>${ssrInterpolate(e2.description)}</p><div class="flex items-center justify-center w-full" data-v-edacca8d>`), r2(ssrRenderComponent(l2, { to: "/", class: "cursor-pointer gradient-border px-4 py-2 sm:px-6 sm:py-3 sm:text-xl text-md" }, { default: withCtx((t4, r3, a3, n3) => {
      if (!r3) return [createTextVNode(toDisplayString(e2.backHome), 1)];
      r3(`${ssrInterpolate(e2.backHome)}`);
    }), _: 1 }, a2)), r2("</div></div></div>");
  };
} }, L = z.setup;
z.setup = (e2, t2) => {
  const r2 = useSSRContext();
  return (r2.modules || (r2.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/error-404.vue"), L ? L(e2, t2) : void 0;
};
const M = o(z, [["__scopeId", "data-v-edacca8d"]]);

export { M as default };
