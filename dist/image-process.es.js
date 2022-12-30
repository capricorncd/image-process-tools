/*!
 * image-process version 4.3.1
 * Author: Xing Zhong <capricorncd@qq.com, zx198401@gmail.com>
 * Repository: https://github.com/capricorncd/image-process-tools
 * Released on: 2022-12-30 14:17:09 (GMT+0900)
 */
/*!
 * zx-sml version 0.6.0
 * Author: Xing Zhong<zx198401@gmail.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-09-09 21:21:26 (GMT+0900)
 */
var z = Object.defineProperty, P = Object.getOwnPropertySymbols, k = Object.prototype.hasOwnProperty, W = Object.prototype.propertyIsEnumerable, E = (t, e, i) => e in t ? z(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, _ = (t, e) => {
  for (var i in e || (e = {}))
    k.call(e, i) && E(t, i, e[i]);
  if (P)
    for (var i of P(e))
      W.call(e, i) && E(t, i, e[i]);
  return t;
};
function V(t) {
  return Array.isArray(t);
}
function B(t) {
  return t !== null && !V(t) && typeof t == "object";
}
var Y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, o = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(i, n) {
    t.exports = n();
  })(typeof self < "u" ? self : Y, function() {
    return (() => {
      var i = { 949: (r, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 }), a.toTwoDigits = void 0, a.toTwoDigits = function(h) {
          return h[1] ? h : "0" + h;
        };
      }, 607: (r, a, h) => {
        Object.defineProperty(a, "__esModule", { value: !0 }), a.toTwoDigits = a.toDate = a.formatDate = void 0;
        var s = h(949);
        Object.defineProperty(a, "toTwoDigits", { enumerable: !0, get: function() {
          return s.toTwoDigits;
        } });
        var l = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function f(u) {
          if (u instanceof Date)
            return u;
          if (typeof u == "number")
            return new Date(u);
          if (typeof u == "string") {
            var d = u.trim();
            if (/^\d+$/.test(d)) {
              var c = d.length;
              return c === 8 ? new Date([d.substr(0, 4), d.substr(4, 2), d.substr(6, 2)].join("/")) : c === 6 ? new Date([d.substr(0, 4), d.substr(4, 2), "01"].join("/")) : c === 4 ? new Date(d + "/01/01") : new Date(parseInt(u));
            }
            if (d = d.replace(/[年月日]/g, function(g) {
              return g === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(d))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(d))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var w = new Date(d);
            return isNaN(w.getFullYear()) ? null : w;
          }
          return null;
        }
        a.formatDate = function(u, d, c) {
          var w, g = f(u);
          if (!g || !d)
            return u + "";
          if (d === "timestamp")
            return g.getTime().toString();
          /(y+)/i.test(d) && (w = RegExp.$1, d = d.replace(w, (g.getFullYear() + "").substr(4 - w.length))), c && Array.isArray(c.weeks) || (c = l);
          var b = { "M+": g.getMonth() + 1, "d+": g.getDate(), "h+": g.getHours(), "m+": g.getMinutes(), "s+": g.getSeconds(), "w+": g.getDay(), "W+": c.weeks[g.getDay()], "a+": g.getHours() < 12 ? "am" : "pm", "A+": g.getHours() < 12 ? "AM" : "PM" };
          for (var R in b)
            if (new RegExp("(" + R + ")").test(d)) {
              w = RegExp.$1;
              var D = b[R] + "";
              d = d.replace(w, w.length === 1 ? D : s.toTwoDigits(D));
            }
          if (/(g)/i.test(d)) {
            var T = g.toString().split(/\s+/).slice(5), N = d.includes("g");
            d = d.replace(/g/i, N ? T[0] : T.join(" "));
          }
          return d;
        }, a.toDate = f;
      } }, n = {};
      return function r(a) {
        if (n[a])
          return n[a].exports;
        var h = n[a] = { exports: {} };
        return i[a](h, h.exports, r), h.exports;
      }(607);
    })();
  });
})(o);
function A(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, n) => `${n > 0 ? e : ""}${i.toLowerCase()}`);
}
function Z(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (n, r) => r.toUpperCase());
  return e ? i.replace(/^\w/, (n) => n.toUpperCase()) : i;
}
function q(t) {
  return t.replace(/^-?[1-9]\d{0,2}(,\d{3})+/, (e) => e.replace(/,/g, ""));
}
function F(t, e = !1) {
  if (typeof t == "number")
    return t;
  if (typeof t == "string") {
    if (!e && /^(-?\d+(?:\.\d+)?)\D*/.test(q(t)))
      return F(RegExp.$1, !0);
    const i = Number(t);
    return isNaN(i) ? 0 : i;
  }
  return 0;
}
function S(t = {}, e = !1) {
  const i = e ? Z : A, n = {};
  for (const [r, a] of Object.entries(t))
    n[i(r)] = B(a) ? S(a, e) : a;
  return n;
}
function U(t, e = !1, i = 2) {
  const n = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], r = e ? 1e3 : 1024;
  let a = String(t), h = "Byte";
  for (let s = 0, l = t / r; l > 1; l /= r, s++)
    a = l.toFixed(i), h = n[s];
  return e && (h = h.replace("i", "")), {
    text: a.replace(/\.0+$/, "") + h,
    value: +a,
    unit: h,
    bytes: t
  };
}
function y(t, e = {}, i) {
  const n = document.createElement(t);
  for (const [r, a] of Object.entries(e))
    n.setAttribute(A(r), r === "style" && B(a) ? G(a) : a);
  return i && (Array.isArray(i) || (i = [i]), i.forEach((r) => {
    if (typeof r == "string") {
      const a = y("div");
      a.innerHTML = r, n.append(...a.childNodes);
    } else
      n.append(r);
  })), n;
}
function G(...t) {
  const e = t.reduce((n, r) => _(_({}, n), S(r)), {}), i = [];
  for (const [n, r] of Object.entries(e))
    r === "" || typeof r > "u" || r === null || i.push(`${n}:${r}`);
  return i.join(";");
}
function K(t) {
  return new Promise((e, i) => {
    const n = new FileReader();
    n.onload = (r) => {
      var a;
      const h = (a = r.target) == null ? void 0 : a.result;
      h ? e(h) : i(new Error(`FileReader's result is null, ${r.target}`));
    }, n.onerror = i, n.readAsDataURL(t);
  });
}
function x(t) {
  return (window.URL || window.webkitURL).createObjectURL(t);
}
function M(t) {
  const e = t.split(",");
  let i = "";
  return /data:(\w+\/\w+);base64/.test(e[0]) && (i = RegExp.$1), {
    type: i,
    data: e[1]
  };
}
function L(t, e) {
  const i = M(t), n = window.atob(i.data);
  e = e || i.type;
  const r = new Uint8Array(n.length);
  for (let a = 0; a < n.length; a++)
    r[a] = n.charCodeAt(a);
  return new Blob([r], { type: e });
}
o.exports.formatDate;
o.exports.toDate;
o.exports.toTwoDigits;
const p = {
  enableDevicePixelRatio: !1,
  isForce: !1,
  mimeType: "image/jpeg",
  perResize: 500,
  quality: 0.9,
  width: 0,
  height: 0,
  longEdge: 0
}, J = /^data:(.+?);base64/, Q = /^image\/.+/;
function C(t, e) {
  return new Promise((i, n) => {
    var a;
    const r = {
      ...p,
      ...e,
      longEdge: (a = e == null ? void 0 : e.longEdge) != null ? a : e == null ? void 0 : e.longestSide
    };
    typeof t == "string" && J.test(t) ? $(t, r, i, n) : (t instanceof File || t instanceof Blob) && Q.test(t.type) ? K(t).then((h) => {
      $(h, r, i, n);
    }).catch(n) : n(new Error(`Invalid file, ${t}`));
  });
}
function $(t, e, i, n) {
  const { type: r } = M(t), a = L(t, r), h = new Image();
  h.onload = () => {
    const s = {
      element: h,
      blob: a,
      data: t,
      url: x(a),
      width: h.naturalWidth || h.width,
      height: h.naturalHeight || h.height,
      type: r,
      size: U(a.size)
    };
    e.cropInfo && e.cropInfo.sw && e.cropInfo.sh ? O(s, e, i, n, {
      ...e.cropInfo,
      dx: 0,
      dy: 0,
      dw: e.cropInfo.sw,
      dh: e.cropInfo.sh
    }) : e.width && e.height ? O(s, e, i, n, I(s, e)) : e.width || e.height || e.longEdge ? X(s, e, i, n) : m({ ...s, raw: s }, e, i);
  }, h.onerror = n, h.src = t;
}
function O(t, e, i, n, r) {
  try {
    Object.prototype.hasOwnProperty.call(r, "enableDevicePixelRatio") || (r.enableDevicePixelRatio = e.enableDevicePixelRatio);
    const a = v(t.element, {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: r.sx,
      sy: r.sy,
      sw: r.sw,
      sh: r.sh,
      dx: 0,
      dy: 0,
      dw: r.sw,
      dh: r.sh
    });
    !e.width && !e.height ? e.longEdge ? r.sw > r.sh ? (e.width = e.longEdge, e.height = r.sh * e.width / r.sw) : (e.height = e.longEdge, e.width = r.sw * e.height / r.sh) : (e.width = r.sw, e.height = r.sh) : e.width ? e.height = r.sh * e.width / r.sw : e.width = r.sw * e.height / r.sh, j(
      a,
      t,
      e,
      {
        ...r,
        sx: 0,
        sy: 0,
        sw: a.width,
        sh: a.height
      },
      i
    );
  } catch (a) {
    n(a);
  }
}
function X(t, e, i, n) {
  try {
    e.longEdge && !e.width && !e.height && (t.width >= t.height ? e.width = e.longEdge : e.height = e.longEdge);
    const r = {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: 0,
      sy: 0,
      sw: t.width,
      sh: t.height,
      dx: 0,
      dy: 0,
      dw: e.width,
      dh: e.height
    };
    if (e.width) {
      if (t.width < e.width && !e.isForce) {
        m({ ...t, raw: t }, e, i);
        return;
      }
      r.dh = t.height * e.width / t.width, e.height = r.dh;
    } else {
      if (t.height < e.height && !e.isForce) {
        m({ ...t, raw: t }, e, i);
        return;
      }
      r.dw = t.width * e.height / t.height, e.width = r.dw;
    }
    j(t.element, t, e, r, i);
  } catch (r) {
    n(r);
  }
}
function m(t, e, i) {
  t.type !== e.mimeType ? (t.type = e.mimeType, H(
    t.element,
    t.raw,
    e,
    {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: 0,
      sy: 0,
      sw: t.width,
      sh: t.height,
      dx: 0,
      dy: 0,
      dw: t.width,
      dh: t.height
    },
    i
  )) : i(t);
}
function j(t, e, i, n, r) {
  let a = e.width > e.height ? e.width - n.dw : e.height - n.dh;
  if (a > i.perResize) {
    const h = e.height / e.width;
    for (; a > i.perResize; )
      a -= i.perResize, n.sw = t.width, n.sh = t.height, n.dw = i.width + a, n.dh = n.dw * h, t = v(t, n);
  }
  n.sw = t.width, n.sh = t.height, n.dw = i.width, n.dh = i.height, H(t, e, i, n, r);
}
function H(t, e, i, n, r) {
  const a = v(t, n), h = /^\w+\/\*$/.test(i.mimeType) || !i.mimeType ? e.type : i.mimeType, s = a.toDataURL(h, i.quality), l = L(s, h);
  r({
    element: a,
    type: h,
    width: a.width,
    height: a.height,
    blob: l,
    data: s,
    url: x(l),
    size: U(l.size),
    raw: e
  });
}
function I(t, e) {
  const { width: i, height: n } = t, { width: r, height: a } = e;
  let h;
  const s = n * r / a;
  if (i > s)
    h = {
      sx: (i - s) / 2,
      sy: 0,
      sw: s,
      sh: n
    };
  else {
    const l = i * a / r;
    h = {
      sx: 0,
      sy: (n - l) / 2,
      sw: i,
      sh: l
    };
  }
  return {
    ...h,
    dx: 0,
    dy: 0,
    dw: r,
    dh: a
  };
}
function v(t, e) {
  const i = e.enableDevicePixelRatio && window.devicePixelRatio || 1, n = y("canvas");
  n.width = e.dw * i, n.height = e.dh * i;
  const r = n.getContext("2d");
  return r.scale(i, i), r.drawImage(
    t,
    e.sx,
    e.sy,
    e.sw,
    e.sh,
    e.dx,
    e.dy,
    e.dw,
    e.dh
  ), n;
}
function ee(t, e) {
  return new Promise((i, n) => {
    const r = {
      ...p,
      ...e
    }, a = x(t);
    let h = y("video", {
      src: a,
      autoplay: !0
    }), s = !1;
    h.onerror = n, h.oncanplay = () => {
      if (s)
        return;
      s = !0;
      const l = h.duration, f = typeof r.currentTime > "u" ? l * Math.random() : F(r.currentTime), u = {
        url: a,
        videoFile: t,
        videoWidth: h.videoWidth,
        videoHeight: h.videoHeight,
        duration: l,
        currentTime: Math.min(f, l)
      };
      te(h, u).then((d) => {
        !r.width && !r.height && (r.width = u.videoWidth, r.height = u.videoHeight), C(d, e).then((c) => {
          i({
            videoInfo: u,
            ...c
          }), h = null;
        }).catch(n);
      }).catch(n);
    };
  });
}
function te(t, { currentTime: e, videoWidth: i, videoHeight: n }) {
  return new Promise((r) => {
    t.currentTime = e, t.pause();
    const a = "image/jpeg", h = y("canvas"), s = h.getContext("2d");
    h.width = i, h.height = n, setTimeout(() => {
      s.drawImage(t, 0, 0, h.width, h.height), r(h.toDataURL(a));
    }, 500);
  });
}
function ie(t, e) {
  return new Promise((i, n) => {
    const r = t.type;
    /^(image|video)/.test(r) ? RegExp.$1 === "image" ? C(t, e).then(i).catch(n) : ee(t, e).then(i).catch(n) : n(new Error(`File type[${r}] not supported`));
  });
}
export {
  L as base64ToBlob,
  x as createBlobURL,
  y as createElement,
  K as fileToBase64,
  U as formatBytes,
  C as handleImageFile,
  ie as handleMediaFile,
  ee as handleVideoFile,
  M as splitBase64
};
