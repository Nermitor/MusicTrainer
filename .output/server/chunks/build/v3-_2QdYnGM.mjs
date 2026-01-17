import { hasInjectionContext, inject } from 'vue';
import { t as ue } from './server.mjs';
import { h as headSymbol, u as useHead } from '../routes/renderer.mjs';

function s(s2, u = {}) {
  const i = (function(r2) {
    var _a;
    const s3 = r2 || ue();
    return ((_a = s3 == null ? void 0 : s3.ssrContext) == null ? void 0 : _a.head) || (s3 == null ? void 0 : s3.runWithContext(() => {
      if (hasInjectionContext()) return inject(headSymbol);
    }));
  })(u.nuxt);
  if (i) return useHead(s2, { head: i, ...u });
}

export { s };
