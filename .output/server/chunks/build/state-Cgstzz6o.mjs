import { toRef, isRef, ref } from 'vue';
import { a as le } from './server.mjs';

function r(n2, t2, e2 = false) {
}
function s(n2, t2) {
  return void 0 !== t2 ? t2 : null;
}
const o = { PROFILES: "musicTrainerProfiles", STATISTICS: "musicTrainerStatistics" }, u = ref({}), a = ref({});
function f() {
}
function c() {
  return { keyboardMapping: u, rawBindings: a, refresh: f, saveKeyBindings: function(n2) {
  }, loadRawBindings: function() {
    return { ...a.value };
  }, clearKeyBindings: function() {
  }, hasBindings: function() {
    return Object.keys(a.value).length > 0;
  }, getBindingsCount: function() {
    return Object.keys(a.value).length;
  } };
}
function l(...n2) {
  const r2 = "string" == typeof n2[n2.length - 1] ? n2.pop() : void 0;
  "string" != typeof n2[0] && n2.unshift(r2);
  const [s2, o2] = n2;
  if (!s2 || "string" != typeof s2) throw new TypeError("[nuxt] [useState] key must be a string: " + s2);
  if (void 0 !== o2 && "function" != typeof o2) throw new Error("[nuxt] [useState] init must be a function: " + o2);
  const u2 = "$s" + s2, a2 = le(), f2 = toRef(a2.payload.state, u2);
  if (void 0 === f2.value && o2) {
    const n3 = o2();
    if (isRef(n3)) return a2.payload.state[u2] = n3, n3;
    f2.value = n3;
  }
  return f2;
}

export { c, l, o, r, s };
