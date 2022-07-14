/*!
 * image-process version 4.2.0
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/image-process-tools
 * Released on: 2022-07-14 22:01:42 (GMT+0900)
 */
/*!
 * zx-sml version 0.2.0
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-13 22:46:38 (GMT+0900)
 */
var z = Object.defineProperty, T = Object.getOwnPropertySymbols, I = Object.prototype.hasOwnProperty, N = Object.prototype.propertyIsEnumerable, _ = (t, e, i) => e in t ? z(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, E = (t, e) => {
  for (var i in e || (e = {}))
    I.call(e, i) && _(t, i, e[i]);
  if (T)
    for (var i of T(e))
      N.call(e, i) && _(t, i, e[i]);
  return t;
};
function k(t) {
  return Array.isArray(t);
}
function m(t) {
  return t !== null && !k(t) && typeof t == "object";
}
var W = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, w = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(i, n) {
    t.exports = n();
  })(typeof self < "u" ? self : W, function() {
    return (() => {
      var i = { 949: (r, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 }), a.toTwoDigits = void 0, a.toTwoDigits = function(o) {
          return o[1] ? o : "0" + o;
        };
      }, 607: (r, a, o) => {
        Object.defineProperty(a, "__esModule", { value: !0 }), a.toTwoDigits = a.toDate = a.formatDate = void 0;
        var d = o(949);
        Object.defineProperty(a, "toTwoDigits", { enumerable: !0, get: function() {
          return d.toTwoDigits;
        } });
        var h = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function f(l) {
          if (l instanceof Date)
            return l;
          if (typeof l == "number")
            return new Date(l);
          if (typeof l == "string") {
            var s = l.trim();
            if (/^\d+$/.test(s)) {
              var u = s.length;
              return u === 8 ? new Date([s.substr(0, 4), s.substr(4, 2), s.substr(6, 2)].join("/")) : u === 6 ? new Date([s.substr(0, 4), s.substr(4, 2), "01"].join("/")) : u === 4 ? new Date(s + "/01/01") : new Date(parseInt(l));
            }
            if (s = s.replace(/[年月日]/g, function(c) {
              return c === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(s))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(s))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var g = new Date(s);
            return isNaN(g.getFullYear()) ? null : g;
          }
          return null;
        }
        a.formatDate = function(l, s, u) {
          var g, c = f(l);
          if (!c || !s)
            return l + "";
          if (s === "timestamp")
            return c.getTime().toString();
          /(y+)/i.test(s) && (g = RegExp.$1, s = s.replace(g, (c.getFullYear() + "").substr(4 - g.length))), u && Array.isArray(u.weeks) || (u = h);
          var b = { "M+": c.getMonth() + 1, "d+": c.getDate(), "h+": c.getHours(), "m+": c.getMinutes(), "s+": c.getSeconds(), "w+": c.getDay(), "W+": u.weeks[c.getDay()], "a+": c.getHours() < 12 ? "am" : "pm", "A+": c.getHours() < 12 ? "AM" : "PM" };
          for (var R in b)
            if (new RegExp("(" + R + ")").test(s)) {
              g = RegExp.$1;
              var D = b[R] + "";
              s = s.replace(g, g.length === 1 ? D : d.toTwoDigits(D));
            }
          if (/(g)/i.test(s)) {
            var P = c.toString().split(/\s+/).slice(5), H = s.includes("g");
            s = s.replace(/g/i, H ? P[0] : P.join(" "));
          }
          return s;
        }, a.toDate = f;
      } }, n = {};
      return function r(a) {
        if (n[a])
          return n[a].exports;
        var o = n[a] = { exports: {} };
        return i[a](o, o.exports, r), o.exports;
      }(607);
    })();
  });
})(w);
function O(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, n) => `${n > 0 ? e : ""}${i.toLowerCase()}`);
}
function V(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (n, r) => r.toUpperCase());
  return e ? i.replace(/^\w/, (n) => n.toUpperCase()) : i;
}
function Y(t) {
  return t.replace(/^-?[1-9]\d{0,2}(,\d{3})+/, (e) => e.replace(/,/g, ""));
}
function S(t, e = !1) {
  if (typeof t == "number")
    return t;
  if (typeof t == "string") {
    if (!e && /^(-?\d+(?:\.\d+)?)\D*/.test(Y(t)))
      return S(RegExp.$1, !0);
    const i = Number(t);
    return isNaN(i) ? 0 : i;
  }
  return 0;
}
function B(t = {}, e = !1) {
  const i = e ? V : O, n = {};
  for (const [r, a] of Object.entries(t))
    n[i(r)] = m(a) ? B(a, e) : a;
  return n;
}
function F(t, e = !1, i = 2) {
  const n = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], r = e ? 1e3 : 1024;
  let a = String(t), o = "Byte";
  for (let d = 0, h = t / r; h > 1; h /= r, d++)
    a = h.toFixed(i), o = n[d];
  return e && (o = o.replace("i", "")), {
    text: a.replace(/\.0+$/, "") + o,
    value: +a,
    unit: o,
    bytes: t
  };
}
function x(t, e = {}, i) {
  const n = document.createElement(t);
  for (const [r, a] of Object.entries(e))
    n.setAttribute(O(r), r === "style" && m(a) ? Z(a) : a);
  return i && (typeof i == "string" ? n.innerHTML = i : n.append(i)), n;
}
function Z(...t) {
  const e = t.reduce((n, r) => E(E({}, n), B(r)), {}), i = [];
  for (const [n, r] of Object.entries(e))
    r === "" || typeof r > "u" || r === null || i.push(`${n}:${r}`);
  return i.join(";");
}
function q(t) {
  return new Promise((e, i) => {
    const n = new FileReader();
    n.onload = (r) => {
      var a;
      const o = (a = r.target) == null ? void 0 : a.result;
      o ? e(o) : i(new Error(`FileReader's result is null, ${r.target}`));
    }, n.onerror = i, n.readAsDataURL(t);
  });
}
function p(t) {
  return (window.URL || window.webkitURL).createObjectURL(t);
}
function U(t) {
  const e = t.split(",");
  let i = "";
  return /data:(\w+\/\w+);base64/.test(e[0]) && (i = RegExp.$1), {
    type: i,
    data: e[1]
  };
}
function M(t, e) {
  const i = U(t), n = window.atob(i.data);
  e = e || i.type;
  const r = new Uint8Array(n.length);
  for (let a = 0; a < n.length; a++)
    r[a] = n.charCodeAt(a);
  return new Blob([r], { type: e });
}
w.exports.formatDate;
w.exports.toDate;
w.exports.toTwoDigits;
const A = {
  enableDevicePixelRatio: !1,
  isForce: !1,
  mimeType: "image/jpeg",
  perResize: 500,
  quality: 0.9,
  width: 0,
  height: 0,
  longestSide: 0
}, G = /^data:(.+?);base64/, K = /^image\/.+/;
function v(t, e) {
  const i = e.enableDevicePixelRatio && window.devicePixelRatio || 1, n = x("canvas");
  n.width = e.dw * i, n.height = e.dh * i;
  const r = n.getContext("2d");
  return r.scale(i, i), r.drawImage(t, e.sx, e.sy, e.sw, e.sh, e.dx, e.dy, e.dw, e.dh), n;
}
function L(t, e) {
  return new Promise((i, n) => {
    const r = {
      ...A,
      ...e
    };
    typeof t == "string" && G.test(t) ? $(t, r, i, n) : t instanceof File && K.test(t.type) ? q(t).then((a) => {
      $(a, r, i, n);
    }).catch(n) : n(new Error(`Invalid file, ${t}`));
  });
}
function $(t, e, i, n) {
  const { type: r } = U(t), a = M(t, r), o = new Image();
  o.onload = () => {
    const d = {
      element: o,
      blob: a,
      data: t,
      url: p(a),
      width: o.naturalWidth || o.width,
      height: o.naturalHeight || o.height,
      type: r,
      size: F(a.size)
    };
    e.width > 0 && e.height > 0 ? J(d, e, i, n) : e.width > 0 || e.height > 0 || e.longestSide > 0 ? Q(d, e, i, n) : y({ ...d, raw: d }, e, i);
  }, o.onerror = n, o.src = t;
}
function J(t, e, i, n) {
  try {
    const r = m(e.cropInfo) ? {
      ...e.cropInfo,
      dx: 0,
      dy: 0,
      dw: e.width,
      dh: e.height
    } : X(t, e);
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
    j(a, t, e, {
      ...r,
      sx: 0,
      sy: 0,
      sw: a.width,
      sh: a.height
    }, i);
  } catch (r) {
    n(r);
  }
}
function Q(t, e, i, n) {
  try {
    e.longestSide > 0 && !e.width && !e.height && (t.width >= t.height ? e.width = e.longestSide : e.height = e.longestSide);
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
    if (e.width > 0) {
      if (t.width < e.width && !e.isForce) {
        y({ ...t, raw: t }, e, i);
        return;
      }
      r.dh = t.height * e.width / t.width, e.height = r.dh;
    } else {
      if (t.height < e.height && !e.isForce) {
        y({ ...t, raw: t }, e, i);
        return;
      }
      r.dw = t.width * e.height / t.height, e.width = r.dw;
    }
    j(t.element, t, e, r, i);
  } catch (r) {
    n(r);
  }
}
function y(t, e, i) {
  t.type !== e.mimeType ? (t.type = e.mimeType, C(t.element, t.raw, e, {
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
function j(t, e, i, n, r) {
  let a = e.width > e.height ? e.width - n.dw : e.height - n.dh;
  if (a > i.perResize) {
    const o = e.height / e.width;
    for (; a > i.perResize; )
      a -= i.perResize, n.sw = t.width, n.sh = t.height, n.dw = i.width + a, n.dh = n.dw * o, t = v(t, n);
    n.sw = t.width, n.sh = t.height, n.dw = i.width, n.dh = i.height;
  }
  C(t, e, i, n, r);
}
function C(t, e, i, n, r) {
  const a = v(t, n), o = i.mimeType, d = a.toDataURL(o, i.quality), h = M(d, o);
  r({
    element: a,
    type: o,
    width: a.width,
    height: a.height,
    blob: h,
    data: d,
    url: p(h),
    size: F(h.size),
    raw: e
  });
}
function X(t, e) {
  const { width: i, height: n } = t, { width: r, height: a } = e;
  let o;
  const d = n * r / a;
  if (i > d)
    o = {
      sx: (i - d) / 2,
      sy: 0,
      sw: d,
      sh: n
    };
  else {
    const h = i * a / r;
    o = {
      sx: 0,
      sy: (n - h) / 2,
      sw: i,
      sh: h
    };
  }
  return {
    ...o,
    dx: 0,
    dy: 0,
    dw: r,
    dh: a
  };
}
function ee(t, e) {
  return new Promise((i, n) => {
    const r = {
      ...A,
      ...e
    }, a = p(t);
    let o = x("video", {
      src: a,
      autoplay: !0
    }), d = !1;
    o.onerror = n, o.oncanplay = () => {
      if (d)
        return;
      d = !0;
      const h = o.duration, f = typeof r.currentTime > "u" ? h * Math.random() : S(r.currentTime), l = {
        videoFile: t,
        videoWidth: o.videoWidth,
        videoHeight: o.videoHeight,
        duration: h,
        currentTime: Math.min(f, h)
      };
      te(o, l).then((s) => {
        !r.width && !r.height && (r.width = l.videoWidth, r.height = l.videoHeight), L(s, e).then((u) => {
          i({
            videoInfo: l,
            ...u
          }), o = null;
        }).catch(n);
      }).catch(n);
    };
  });
}
function te(t, { currentTime: e, videoWidth: i, videoHeight: n }) {
  return new Promise((r) => {
    t.currentTime = e, t.pause();
    const a = "image/jpeg", o = x("canvas"), d = o.getContext("2d");
    o.width = i, o.height = n, setTimeout(() => {
      d.drawImage(t, 0, 0, o.width, o.height), r(o.toDataURL(a));
    }, 500);
  });
}
function ie(t, e) {
  return new Promise((i, n) => {
    const r = t.type;
    /^(image|video)/.test(r) ? RegExp.$1 === "image" ? L(t, e).then(i).catch(n) : ee(t, e).then(i).catch(n) : n(new Error(`File type[${r}] not supported`));
  });
}
export {
  x as createElement,
  L as handleImageFile,
  ie as handleMediaFile,
  ee as handleVideoFile
};
