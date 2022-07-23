/*!
 * image-process version 4.2.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/image-process-tools
 * Released on: 2022-07-23 14:44:58 (GMT+0900)
 */
/*!
 * zx-sml version 0.2.0
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-13 22:46:38 (GMT+0900)
 */
var N = Object.defineProperty, T = Object.getOwnPropertySymbols, k = Object.prototype.hasOwnProperty, W = Object.prototype.propertyIsEnumerable, S = (t, e, i) => e in t ? N(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, _ = (t, e) => {
  for (var i in e || (e = {}))
    k.call(e, i) && S(t, i, e[i]);
  if (T)
    for (var i of T(e))
      W.call(e, i) && S(t, i, e[i]);
  return t;
};
function V(t) {
  return Array.isArray(t);
}
function O(t) {
  return t !== null && !V(t) && typeof t == "object";
}
var Y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, f = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(i, r) {
    t.exports = r();
  })(typeof self < "u" ? self : Y, function() {
    return (() => {
      var i = { 949: (n, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 }), a.toTwoDigits = void 0, a.toTwoDigits = function(h) {
          return h[1] ? h : "0" + h;
        };
      }, 607: (n, a, h) => {
        Object.defineProperty(a, "__esModule", { value: !0 }), a.toTwoDigits = a.toDate = a.formatDate = void 0;
        var d = h(949);
        Object.defineProperty(a, "toTwoDigits", { enumerable: !0, get: function() {
          return d.toTwoDigits;
        } });
        var l = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function w(u) {
          if (u instanceof Date)
            return u;
          if (typeof u == "number")
            return new Date(u);
          if (typeof u == "string") {
            var s = u.trim();
            if (/^\d+$/.test(s)) {
              var g = s.length;
              return g === 8 ? new Date([s.substr(0, 4), s.substr(4, 2), s.substr(6, 2)].join("/")) : g === 6 ? new Date([s.substr(0, 4), s.substr(4, 2), "01"].join("/")) : g === 4 ? new Date(s + "/01/01") : new Date(parseInt(u));
            }
            if (s = s.replace(/[年月日]/g, function(c) {
              return c === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(s))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(s))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var o = new Date(s);
            return isNaN(o.getFullYear()) ? null : o;
          }
          return null;
        }
        a.formatDate = function(u, s, g) {
          var o, c = w(u);
          if (!c || !s)
            return u + "";
          if (s === "timestamp")
            return c.getTime().toString();
          /(y+)/i.test(s) && (o = RegExp.$1, s = s.replace(o, (c.getFullYear() + "").substr(4 - o.length))), g && Array.isArray(g.weeks) || (g = l);
          var b = { "M+": c.getMonth() + 1, "d+": c.getDate(), "h+": c.getHours(), "m+": c.getMinutes(), "s+": c.getSeconds(), "w+": c.getDay(), "W+": g.weeks[c.getDay()], "a+": c.getHours() < 12 ? "am" : "pm", "A+": c.getHours() < 12 ? "AM" : "PM" };
          for (var R in b)
            if (new RegExp("(" + R + ")").test(s)) {
              o = RegExp.$1;
              var D = b[R] + "";
              s = s.replace(o, o.length === 1 ? D : d.toTwoDigits(D));
            }
          if (/(g)/i.test(s)) {
            var P = c.toString().split(/\s+/).slice(5), z = s.includes("g");
            s = s.replace(/g/i, z ? P[0] : P.join(" "));
          }
          return s;
        }, a.toDate = w;
      } }, r = {};
      return function n(a) {
        if (r[a])
          return r[a].exports;
        var h = r[a] = { exports: {} };
        return i[a](h, h.exports, n), h.exports;
      }(607);
    })();
  });
})(f);
function p(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, r) => `${r > 0 ? e : ""}${i.toLowerCase()}`);
}
function Z(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (r, n) => n.toUpperCase());
  return e ? i.replace(/^\w/, (r) => r.toUpperCase()) : i;
}
function q(t) {
  return t.replace(/^-?[1-9]\d{0,2}(,\d{3})+/, (e) => e.replace(/,/g, ""));
}
function B(t, e = !1) {
  if (typeof t == "number")
    return t;
  if (typeof t == "string") {
    if (!e && /^(-?\d+(?:\.\d+)?)\D*/.test(q(t)))
      return B(RegExp.$1, !0);
    const i = Number(t);
    return isNaN(i) ? 0 : i;
  }
  return 0;
}
function F(t = {}, e = !1) {
  const i = e ? Z : p, r = {};
  for (const [n, a] of Object.entries(t))
    r[i(n)] = O(a) ? F(a, e) : a;
  return r;
}
function U(t, e = !1, i = 2) {
  const r = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], n = e ? 1e3 : 1024;
  let a = String(t), h = "Byte";
  for (let d = 0, l = t / n; l > 1; l /= n, d++)
    a = l.toFixed(i), h = r[d];
  return e && (h = h.replace("i", "")), {
    text: a.replace(/\.0+$/, "") + h,
    value: +a,
    unit: h,
    bytes: t
  };
}
function m(t, e = {}, i) {
  const r = document.createElement(t);
  for (const [n, a] of Object.entries(e))
    r.setAttribute(p(n), n === "style" && O(a) ? G(a) : a);
  return i && (typeof i == "string" ? r.innerHTML = i : r.append(i)), r;
}
function G(...t) {
  const e = t.reduce((r, n) => _(_({}, r), F(n)), {}), i = [];
  for (const [r, n] of Object.entries(e))
    n === "" || typeof n > "u" || n === null || i.push(`${r}:${n}`);
  return i.join(";");
}
function K(t) {
  return new Promise((e, i) => {
    const r = new FileReader();
    r.onload = (n) => {
      var a;
      const h = (a = n.target) == null ? void 0 : a.result;
      h ? e(h) : i(new Error(`FileReader's result is null, ${n.target}`));
    }, r.onerror = i, r.readAsDataURL(t);
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
function A(t, e) {
  const i = M(t), r = window.atob(i.data);
  e = e || i.type;
  const n = new Uint8Array(r.length);
  for (let a = 0; a < r.length; a++)
    n[a] = r.charCodeAt(a);
  return new Blob([n], { type: e });
}
f.exports.formatDate;
f.exports.toDate;
f.exports.toTwoDigits;
const L = {
  enableDevicePixelRatio: !1,
  isForce: !1,
  mimeType: "image/jpeg",
  perResize: 500,
  quality: 0.9,
  width: 0,
  height: 0,
  longestSide: 0
}, J = /^data:(.+?);base64/, Q = /^image\/.+/;
function C(t, e) {
  return new Promise((i, r) => {
    const n = {
      ...L,
      ...e
    };
    typeof t == "string" && J.test(t) ? E(t, n, i, r) : (t instanceof File || t instanceof Blob) && Q.test(t.type) ? K(t).then((a) => {
      E(a, n, i, r);
    }).catch(r) : r(new Error(`Invalid file, ${t}`));
  });
}
function E(t, e, i, r) {
  const { type: n } = M(t), a = A(t, n), h = new Image();
  h.onload = () => {
    const d = {
      element: h,
      blob: a,
      data: t,
      url: x(a),
      width: h.naturalWidth || h.width,
      height: h.naturalHeight || h.height,
      type: n,
      size: U(a.size)
    };
    e.cropInfo && e.cropInfo.sw && e.cropInfo.sh ? $(d, e, i, r, {
      ...e.cropInfo,
      dx: 0,
      dy: 0,
      dw: e.cropInfo.sw,
      dh: e.cropInfo.sh
    }) : e.width > 0 && e.height > 0 ? $(d, e, i, r, I(d, e)) : e.width > 0 || e.height > 0 || e.longestSide > 0 ? X(d, e, i, r) : y({ ...d, raw: d }, e, i);
  }, h.onerror = r, h.src = t;
}
function $(t, e, i, r, n) {
  try {
    Object.prototype.hasOwnProperty.call(n, "enableDevicePixelRatio") || (n.enableDevicePixelRatio = e.enableDevicePixelRatio);
    const a = v(t.element, {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: n.sx,
      sy: n.sy,
      sw: n.sw,
      sh: n.sh,
      dx: 0,
      dy: 0,
      dw: n.sw,
      dh: n.sh
    });
    !e.width && !e.height ? e.longestSide ? n.sw > n.sh ? (e.width = e.longestSide, e.height = n.sh * e.width / n.sw) : (e.height = e.longestSide, e.width = n.sw * e.height / n.sh) : (e.width = n.sw, e.height = n.sh) : e.width ? e.height = n.sh * e.width / n.sw : e.width = n.sw * e.height / n.sh, j(a, t, e, {
      ...n,
      sx: 0,
      sy: 0,
      sw: a.width,
      sh: a.height
    }, i);
  } catch (a) {
    r(a);
  }
}
function X(t, e, i, r) {
  try {
    e.longestSide > 0 && !e.width && !e.height && (t.width >= t.height ? e.width = e.longestSide : e.height = e.longestSide);
    const n = {
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
    if (e.width > 0) {
      if (t.width < e.width && !e.isForce) {
        y({ ...t, raw: t }, e, i);
        return;
      }
      n.dh = t.height * e.width / t.width, e.height = n.dh;
    } else {
      if (t.height < e.height && !e.isForce) {
        y({ ...t, raw: t }, e, i);
        return;
      }
      n.dw = t.width * e.height / t.height, e.width = n.dw;
    }
    j(t.element, t, e, n, i);
  } catch (n) {
    r(n);
  }
}
function y(t, e, i) {
  t.type !== e.mimeType ? (t.type = e.mimeType, H(t.element, t.raw, e, {
    enableDevicePixelRatio: e.enableDevicePixelRatio,
    sx: 0,
    sy: 0,
    sw: t.width,
    sh: t.height,
    dx: 0,
    dy: 0,
    dw: t.width,
    dh: t.height
  }, i)) : i(t);
}
function j(t, e, i, r, n) {
  let a = e.width > e.height ? e.width - r.dw : e.height - r.dh;
  if (a > i.perResize) {
    const h = e.height / e.width;
    for (; a > i.perResize; )
      a -= i.perResize, r.sw = t.width, r.sh = t.height, r.dw = i.width + a, r.dh = r.dw * h, t = v(t, r);
  }
  r.sw = t.width, r.sh = t.height, r.dw = i.width, r.dh = i.height, H(t, e, i, r, n);
}
function H(t, e, i, r, n) {
  const a = v(t, r), h = i.mimeType, d = a.toDataURL(h, i.quality), l = A(d, h);
  n({
    element: a,
    type: h,
    width: a.width,
    height: a.height,
    blob: l,
    data: d,
    url: x(l),
    size: U(l.size),
    raw: e
  });
}
function I(t, e) {
  const { width: i, height: r } = t, { width: n, height: a } = e;
  let h;
  const d = r * n / a;
  if (i > d)
    h = {
      sx: (i - d) / 2,
      sy: 0,
      sw: d,
      sh: r
    };
  else {
    const l = i * a / n;
    h = {
      sx: 0,
      sy: (r - l) / 2,
      sw: i,
      sh: l
    };
  }
  return {
    ...h,
    dx: 0,
    dy: 0,
    dw: n,
    dh: a
  };
}
function v(t, e) {
  const i = e.enableDevicePixelRatio && window.devicePixelRatio || 1, r = m("canvas");
  r.width = e.dw * i, r.height = e.dh * i;
  const n = r.getContext("2d");
  return n.scale(i, i), n.drawImage(t, e.sx, e.sy, e.sw, e.sh, e.dx, e.dy, e.dw, e.dh), r;
}
function ee(t, e) {
  return new Promise((i, r) => {
    const n = {
      ...L,
      ...e
    }, a = x(t);
    let h = m("video", {
      src: a,
      autoplay: !0
    }), d = !1;
    h.onerror = r, h.oncanplay = () => {
      if (d)
        return;
      d = !0;
      const l = h.duration, w = typeof n.currentTime > "u" ? l * Math.random() : B(n.currentTime), u = {
        url: a,
        videoFile: t,
        videoWidth: h.videoWidth,
        videoHeight: h.videoHeight,
        duration: l,
        currentTime: Math.min(w, l)
      };
      te(h, u).then((s) => {
        !n.width && !n.height && (n.width = u.videoWidth, n.height = u.videoHeight), C(s, e).then((g) => {
          i({
            videoInfo: u,
            ...g
          }), h = null;
        }).catch(r);
      }).catch(r);
    };
  });
}
function te(t, { currentTime: e, videoWidth: i, videoHeight: r }) {
  return new Promise((n) => {
    t.currentTime = e, t.pause();
    const a = "image/jpeg", h = m("canvas"), d = h.getContext("2d");
    h.width = i, h.height = r, setTimeout(() => {
      d.drawImage(t, 0, 0, h.width, h.height), n(h.toDataURL(a));
    }, 500);
  });
}
function ie(t, e) {
  return new Promise((i, r) => {
    const n = t.type;
    /^(image|video)/.test(n) ? RegExp.$1 === "image" ? C(t, e).then(i).catch(r) : ee(t, e).then(i).catch(r) : r(new Error(`File type[${n}] not supported`));
  });
}
export {
  A as base64ToBlob,
  x as createBlobURL,
  m as createElement,
  K as fileToBase64,
  U as formatBytes,
  C as handleImageFile,
  ie as handleMediaFile,
  ee as handleVideoFile,
  M as splitBase64
};
