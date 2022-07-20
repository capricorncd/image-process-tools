/*!
 * image-process version 4.2.0
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/image-process-tools
 * Released on: 2022-07-20 22:09:05 (GMT+0900)
 */
/*!
 * zx-sml version 0.2.0
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-13 22:46:38 (GMT+0900)
 */
var N = Object.defineProperty, P = Object.getOwnPropertySymbols, k = Object.prototype.hasOwnProperty, W = Object.prototype.propertyIsEnumerable, T = (t, e, i) => e in t ? N(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, _ = (t, e) => {
  for (var i in e || (e = {}))
    k.call(e, i) && T(t, i, e[i]);
  if (P)
    for (var i of P(e))
      W.call(e, i) && T(t, i, e[i]);
  return t;
};
function V(t) {
  return Array.isArray(t);
}
function O(t) {
  return t !== null && !V(t) && typeof t == "object";
}
var Y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, w = { exports: {} };
/*! For license information please see date-utils-2020.js.LICENSE.txt */
(function(t, e) {
  (function(i, n) {
    t.exports = n();
  })(typeof self < "u" ? self : Y, function() {
    return (() => {
      var i = { 949: (r, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 }), a.toTwoDigits = void 0, a.toTwoDigits = function(s) {
          return s[1] ? s : "0" + s;
        };
      }, 607: (r, a, s) => {
        Object.defineProperty(a, "__esModule", { value: !0 }), a.toTwoDigits = a.toDate = a.formatDate = void 0;
        var d = s(949);
        Object.defineProperty(a, "toTwoDigits", { enumerable: !0, get: function() {
          return d.toTwoDigits;
        } });
        var l = { weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
        function f(u) {
          if (u instanceof Date)
            return u;
          if (typeof u == "number")
            return new Date(u);
          if (typeof u == "string") {
            var h = u.trim();
            if (/^\d+$/.test(h)) {
              var o = h.length;
              return o === 8 ? new Date([h.substr(0, 4), h.substr(4, 2), h.substr(6, 2)].join("/")) : o === 6 ? new Date([h.substr(0, 4), h.substr(4, 2), "01"].join("/")) : o === 4 ? new Date(h + "/01/01") : new Date(parseInt(u));
            }
            if (h = h.replace(/[年月日]/g, function(c) {
              return c === "\u65E5" ? "" : "/";
            }).replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/gi, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(h))
              return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/"));
            if (/^(\d{4})[-/](\d{1,2})$/.test(h))
              return new Date([RegExp.$1, RegExp.$2, "01"].join("/"));
            var g = new Date(h);
            return isNaN(g.getFullYear()) ? null : g;
          }
          return null;
        }
        a.formatDate = function(u, h, o) {
          var g, c = f(u);
          if (!c || !h)
            return u + "";
          if (h === "timestamp")
            return c.getTime().toString();
          /(y+)/i.test(h) && (g = RegExp.$1, h = h.replace(g, (c.getFullYear() + "").substr(4 - g.length))), o && Array.isArray(o.weeks) || (o = l);
          var b = { "M+": c.getMonth() + 1, "d+": c.getDate(), "h+": c.getHours(), "m+": c.getMinutes(), "s+": c.getSeconds(), "w+": c.getDay(), "W+": o.weeks[c.getDay()], "a+": c.getHours() < 12 ? "am" : "pm", "A+": c.getHours() < 12 ? "AM" : "PM" };
          for (var R in b)
            if (new RegExp("(" + R + ")").test(h)) {
              g = RegExp.$1;
              var D = b[R] + "";
              h = h.replace(g, g.length === 1 ? D : d.toTwoDigits(D));
            }
          if (/(g)/i.test(h)) {
            var p = c.toString().split(/\s+/).slice(5), z = h.includes("g");
            h = h.replace(/g/i, z ? p[0] : p.join(" "));
          }
          return h;
        }, a.toDate = f;
      } }, n = {};
      return function r(a) {
        if (n[a])
          return n[a].exports;
        var s = n[a] = { exports: {} };
        return i[a](s, s.exports, r), s.exports;
      }(607);
    })();
  });
})(w);
function S(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, n) => `${n > 0 ? e : ""}${i.toLowerCase()}`);
}
function Z(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (n, r) => r.toUpperCase());
  return e ? i.replace(/^\w/, (n) => n.toUpperCase()) : i;
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
  const i = e ? Z : S, n = {};
  for (const [r, a] of Object.entries(t))
    n[i(r)] = O(a) ? F(a, e) : a;
  return n;
}
function U(t, e = !1, i = 2) {
  const n = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], r = e ? 1e3 : 1024;
  let a = String(t), s = "Byte";
  for (let d = 0, l = t / r; l > 1; l /= r, d++)
    a = l.toFixed(i), s = n[d];
  return e && (s = s.replace("i", "")), {
    text: a.replace(/\.0+$/, "") + s,
    value: +a,
    unit: s,
    bytes: t
  };
}
function m(t, e = {}, i) {
  const n = document.createElement(t);
  for (const [r, a] of Object.entries(e))
    n.setAttribute(S(r), r === "style" && O(a) ? G(a) : a);
  return i && (typeof i == "string" ? n.innerHTML = i : n.append(i)), n;
}
function G(...t) {
  const e = t.reduce((n, r) => _(_({}, n), F(r)), {}), i = [];
  for (const [n, r] of Object.entries(e))
    r === "" || typeof r > "u" || r === null || i.push(`${n}:${r}`);
  return i.join(";");
}
function K(t) {
  return new Promise((e, i) => {
    const n = new FileReader();
    n.onload = (r) => {
      var a;
      const s = (a = r.target) == null ? void 0 : a.result;
      s ? e(s) : i(new Error(`FileReader's result is null, ${r.target}`));
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
function A(t, e) {
  const i = M(t), n = window.atob(i.data);
  e = e || i.type;
  const r = new Uint8Array(n.length);
  for (let a = 0; a < n.length; a++)
    r[a] = n.charCodeAt(a);
  return new Blob([r], { type: e });
}
w.exports.formatDate;
w.exports.toDate;
w.exports.toTwoDigits;
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
  return new Promise((i, n) => {
    const r = {
      ...L,
      ...e
    };
    typeof t == "string" && J.test(t) ? E(t, r, i, n) : (t instanceof File || t instanceof Blob) && Q.test(t.type) ? K(t).then((a) => {
      E(a, r, i, n);
    }).catch(n) : n(new Error(`Invalid file, ${t}`));
  });
}
function E(t, e, i, n) {
  const { type: r } = M(t), a = A(t, r), s = new Image();
  s.onload = () => {
    const d = {
      element: s,
      blob: a,
      data: t,
      url: x(a),
      width: s.naturalWidth || s.width,
      height: s.naturalHeight || s.height,
      type: r,
      size: U(a.size)
    };
    e.cropInfo && e.cropInfo.sw && e.cropInfo.sh ? $(d, e, i, n, {
      ...e.cropInfo,
      dx: 0,
      dy: 0,
      dw: e.cropInfo.sw,
      dh: e.cropInfo.sh
    }) : e.width > 0 && e.height > 0 ? $(d, e, i, n, I(d, e)) : e.width > 0 || e.height > 0 || e.longestSide > 0 ? X(d, e, i, n) : y({ ...d, raw: d }, e, i);
  }, s.onerror = n, s.src = t;
}
function $(t, e, i, n, r) {
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
    !e.width && !e.height ? (e.width = r.sw, e.height = r.sh) : e.width ? e.height = r.sh * e.width / r.sw : e.width = r.sw * e.height / r.sh, j(a, t, e, {
      ...r,
      sx: 0,
      sy: 0,
      sw: a.width,
      sh: a.height
    }, i);
  } catch (a) {
    n(a);
  }
}
function X(t, e, i, n) {
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
function j(t, e, i, n, r) {
  let a = e.width > e.height ? e.width - n.dw : e.height - n.dh;
  if (a > i.perResize) {
    const s = e.height / e.width;
    for (; a > i.perResize; )
      a -= i.perResize, n.sw = t.width, n.sh = t.height, n.dw = i.width + a, n.dh = n.dw * s, t = v(t, n);
    n.sw = t.width, n.sh = t.height, n.dw = i.width, n.dh = i.height;
  }
  H(t, e, i, n, r);
}
function H(t, e, i, n, r) {
  const a = v(t, n), s = i.mimeType, d = a.toDataURL(s, i.quality), l = A(d, s);
  r({
    element: a,
    type: s,
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
  const { width: i, height: n } = t, { width: r, height: a } = e;
  let s;
  const d = n * r / a;
  if (i > d)
    s = {
      sx: (i - d) / 2,
      sy: 0,
      sw: d,
      sh: n
    };
  else {
    const l = i * a / r;
    s = {
      sx: 0,
      sy: (n - l) / 2,
      sw: i,
      sh: l
    };
  }
  return {
    ...s,
    dx: 0,
    dy: 0,
    dw: r,
    dh: a
  };
}
function v(t, e) {
  const i = e.enableDevicePixelRatio && window.devicePixelRatio || 1, n = m("canvas");
  n.width = e.dw * i, n.height = e.dh * i;
  const r = n.getContext("2d");
  return r.scale(i, i), r.drawImage(t, e.sx, e.sy, e.sw, e.sh, e.dx, e.dy, e.dw, e.dh), n;
}
function ee(t, e) {
  return new Promise((i, n) => {
    const r = {
      ...L,
      ...e
    }, a = x(t);
    let s = m("video", {
      src: a,
      autoplay: !0
    }), d = !1;
    s.onerror = n, s.oncanplay = () => {
      if (d)
        return;
      d = !0;
      const l = s.duration, f = typeof r.currentTime > "u" ? l * Math.random() : B(r.currentTime), u = {
        url: a,
        videoFile: t,
        videoWidth: s.videoWidth,
        videoHeight: s.videoHeight,
        duration: l,
        currentTime: Math.min(f, l)
      };
      te(s, u).then((h) => {
        !r.width && !r.height && (r.width = u.videoWidth, r.height = u.videoHeight), C(h, e).then((o) => {
          i({
            videoInfo: u,
            ...o
          }), s = null;
        }).catch(n);
      }).catch(n);
    };
  });
}
function te(t, { currentTime: e, videoWidth: i, videoHeight: n }) {
  return new Promise((r) => {
    t.currentTime = e, t.pause();
    const a = "image/jpeg", s = m("canvas"), d = s.getContext("2d");
    s.width = i, s.height = n, setTimeout(() => {
      d.drawImage(t, 0, 0, s.width, s.height), r(s.toDataURL(a));
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
