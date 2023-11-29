/*!
 * image-process version 4.3.2
 * Author: Xing Zhong <capricorncd@qq.com, zx198401@gmail.com>
 * Repository: https://github.com/capricorncd/image-process-tools
 * Released on: 2023-11-29 14:17:18 (GMT+0900)
 */
/*!
 * zx-sml version 0.7.5
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2023-05-17 20:41:58 (GMT+0900)
 */
var S = Object.defineProperty, f = Object.getOwnPropertySymbols, $ = Object.prototype.hasOwnProperty, C = Object.prototype.propertyIsEnumerable, y = (t, e, i) => e in t ? S(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, m = (t, e) => {
  for (var i in e || (e = {}))
    $.call(e, i) && y(t, i, e[i]);
  if (f)
    for (var i of f(e))
      C.call(e, i) && y(t, i, e[i]);
  return t;
};
function z(t) {
  return Array.isArray(t);
}
function b(t) {
  return typeof t == "object" && t !== null && !z(t);
}
function R(t = "", e = "-") {
  return t.replace(/[A-Z]/g, (i, n) => `${n > 0 ? e : ""}${i.toLowerCase()}`);
}
function M(t = "", e = !1) {
  const i = t.replace(/[-_\s](\w)/g, (n, h) => h.toUpperCase());
  return e ? i.replace(/^\w/, (n) => n.toUpperCase()) : i;
}
function N(t) {
  return t.replace(/^-?[1-9]\d{0,2}(,\d{3})+/, (e) => e.replace(/,/g, ""));
}
function P(t, e = !1) {
  if (typeof t == "number")
    return t;
  if (typeof t == "string") {
    if (!e && /^(-?\d+(?:\.\d+)?)\D*/.test(N(t)))
      return P(RegExp.$1, !0);
    const i = Number(t);
    return isNaN(i) ? 0 : i;
  }
  return 0;
}
function o(t = {}, e = !1) {
  const i = e ? M : R, n = {};
  for (const [h, d] of Object.entries(t))
    n[i(h)] = b(d) ? o(d, e) : d;
  return n;
}
function E(t, e = !1, i = 2) {
  const n = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], h = e ? 1e3 : 1024;
  let d = String(t), r = "Byte";
  for (let a = 0, l = t / h; l > 1; l /= h, a++)
    d = l.toFixed(i), r = n[a];
  return e && (r = r.replace("i", "")), {
    text: d.replace(/\.0+$/, "") + r,
    value: +d,
    unit: r,
    bytes: t
  };
}
function s(t, e = {}, i) {
  const n = document.createElement(t);
  for (const [h, d] of Object.entries(e))
    n.setAttribute(R(h), h === "style" && b(d) ? H(d) : String(d));
  return i && (Array.isArray(i) || (i = [i]), i.forEach((h) => {
    if (typeof h == "string") {
      const d = s("div");
      d.innerHTML = h, n.append(...d.childNodes);
    } else
      n.append(h);
  })), n;
}
function H(...t) {
  const e = t.reduce((n, h) => m(m({}, n), o(h)), {}), i = [];
  for (const [n, h] of Object.entries(e))
    h === "" || typeof h > "u" || h === null || i.push(`${n}:${h}`);
  return i.join(";");
}
function W(t) {
  return new Promise((e, i) => {
    const n = new FileReader();
    n.onload = (h) => {
      var d;
      const r = (d = h.target) == null ? void 0 : d.result;
      r ? e(r) : i(new Error(`FileReader's result is null, ${h.target}`));
    }, n.onerror = i, n.readAsDataURL(t);
  });
}
function u(t) {
  return (window.URL || window.webkitURL).createObjectURL(t);
}
function T(t) {
  const e = t.split(",");
  let i = "";
  return /data:(\w+\/\w+);base64/.test(e[0]) && (i = RegExp.$1), {
    type: i,
    data: e[1]
  };
}
function _(t, e) {
  const i = T(t), n = window.atob(i.data);
  e = e || i.type;
  const h = new Uint8Array(n.length);
  for (let d = 0; d < n.length; d++)
    h[d] = n.charCodeAt(d);
  return new Blob([h], { type: e });
}
const B = {
  enableDevicePixelRatio: !1,
  isForce: !1,
  mimeType: "image/jpeg",
  perResize: 500,
  quality: 0.9,
  width: 0,
  height: 0,
  longEdge: 0
}, k = /^data:(.+?);base64/, V = /^image\/.+/;
function O(t, e) {
  return new Promise((i, n) => {
    var d;
    const h = {
      ...B,
      ...e,
      longEdge: (d = e == null ? void 0 : e.longEdge) != null ? d : e == null ? void 0 : e.longestSide
    };
    typeof t == "string" && k.test(t) ? x(t, h, i, n) : (t instanceof File || t instanceof Blob) && V.test(t.type) ? W(t).then((r) => {
      x(r, h, i, n);
    }).catch(n) : n(new Error(`Invalid file, ${t}`));
  });
}
function x(t, e, i, n) {
  const { type: h } = T(t), d = _(t, h), r = new Image();
  r.onload = () => {
    const a = {
      element: r,
      blob: d,
      data: t,
      url: u(d),
      width: r.naturalWidth || r.width,
      height: r.naturalHeight || r.height,
      type: h,
      size: E(d.size)
    };
    e.cropInfo && e.cropInfo.sw && e.cropInfo.sh ? v(a, e, i, n, {
      ...e.cropInfo,
      dx: 0,
      dy: 0,
      dw: e.cropInfo.sw,
      dh: e.cropInfo.sh
    }) : e.width && e.height ? v(a, e, i, n, q(a, e)) : e.width || e.height || e.longEdge ? Z(a, e, i, n) : g({ ...a, raw: a }, e, i);
  }, r.onerror = n, r.src = t;
}
function v(t, e, i, n, h) {
  try {
    Object.prototype.hasOwnProperty.call(h, "enableDevicePixelRatio") || (h.enableDevicePixelRatio = e.enableDevicePixelRatio);
    const d = w(t.element, {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: h.sx,
      sy: h.sy,
      sw: h.sw,
      sh: h.sh,
      dx: 0,
      dy: 0,
      dw: h.sw,
      dh: h.sh
    });
    !e.width && !e.height ? e.longEdge ? h.sw > h.sh ? (e.width = e.longEdge, e.height = h.sh * e.width / h.sw) : (e.height = e.longEdge, e.width = h.sw * e.height / h.sh) : (e.width = h.sw, e.height = h.sh) : e.width ? e.height = h.sh * e.width / h.sw : e.width = h.sw * e.height / h.sh, D(
      d,
      t,
      e,
      {
        ...h,
        sx: 0,
        sy: 0,
        sw: d.width,
        sh: d.height
      },
      i
    );
  } catch (d) {
    n(d);
  }
}
function Z(t, e, i, n) {
  try {
    e.longEdge && !e.width && !e.height && (t.width >= t.height ? e.width = e.longEdge : e.height = e.longEdge);
    const h = {
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
        g({ ...t, raw: t }, e, i);
        return;
      }
      h.dh = t.height * e.width / t.width, e.height = h.dh;
    } else {
      if (t.height < e.height && !e.isForce) {
        g({ ...t, raw: t }, e, i);
        return;
      }
      h.dw = t.width * e.height / t.height, e.width = h.dw;
    }
    D(t.element, t, e, h, i);
  } catch (h) {
    n(h);
  }
}
function g(t, e, i) {
  t.type !== e.mimeType ? (t.type = e.mimeType, U(
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
function D(t, e, i, n, h) {
  let d = e.width > e.height ? e.width - n.dw : e.height - n.dh;
  if (d > i.perResize) {
    const r = e.height / e.width;
    for (; d > i.perResize; )
      d -= i.perResize, n.sw = t.width, n.sh = t.height, n.dw = i.width + d, n.dh = n.dw * r, t = w(t, n);
  }
  n.sw = t.width, n.sh = t.height, n.dw = i.width, n.dh = i.height, U(t, e, i, n, h);
}
function U(t, e, i, n, h) {
  const d = w(t, n), r = /^\w+\/\*$/.test(i.mimeType) || !i.mimeType ? e.type : i.mimeType, a = d.toDataURL(r, i.quality), l = _(a, r);
  h({
    element: d,
    type: r,
    width: d.width,
    height: d.height,
    blob: l,
    data: a,
    url: u(l),
    size: E(l.size),
    raw: e
  });
}
function q(t, e) {
  const { width: i, height: n } = t, { width: h, height: d } = e;
  let r;
  const a = n * h / d;
  if (i > a)
    r = {
      sx: (i - a) / 2,
      sy: 0,
      sw: a,
      sh: n
    };
  else {
    const l = i * d / h;
    r = {
      sx: 0,
      sy: (n - l) / 2,
      sw: i,
      sh: l
    };
  }
  return {
    ...r,
    dx: 0,
    dy: 0,
    dw: h,
    dh: d
  };
}
function w(t, e) {
  const i = e.enableDevicePixelRatio && window.devicePixelRatio || 1, n = s("canvas");
  n.width = e.dw * i, n.height = e.dh * i;
  const h = n.getContext("2d");
  return h.scale(i, i), h.drawImage(
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
function K(t, e) {
  return new Promise((i, n) => {
    const h = {
      ...B,
      ...e
    }, d = u(t);
    let r = s("video", {
      src: d,
      autoplay: !0
    }), a = !1;
    r.onerror = n, r.oncanplay = () => {
      if (a)
        return;
      a = !0;
      const l = r.duration, F = typeof h.currentTime > "u" ? l * Math.random() : P(h.currentTime), c = {
        url: d,
        videoFile: t,
        videoWidth: r.videoWidth,
        videoHeight: r.videoHeight,
        duration: l,
        currentTime: Math.min(F, l)
      };
      j(r, c).then((L) => {
        !h.width && !h.height && (h.width = c.videoWidth, h.height = c.videoHeight), O(L, e).then((A) => {
          i({
            videoInfo: c,
            ...A
          }), r = null;
        }).catch(n);
      }).catch(n);
    };
  });
}
function j(t, { currentTime: e, videoWidth: i, videoHeight: n }) {
  return new Promise((h) => {
    t.currentTime = e, t.pause();
    const d = "image/jpeg", r = s("canvas"), a = r.getContext("2d");
    r.width = i, r.height = n, setTimeout(() => {
      a.drawImage(t, 0, 0, r.width, r.height), h(r.toDataURL(d));
    }, 500);
  });
}
function G(t, e) {
  return new Promise((i, n) => {
    const h = t.type;
    /^(image|video)/.test(h) ? RegExp.$1 === "image" ? O(t, e).then(i).catch(n) : K(t, e).then(i).catch(n) : n(new Error(`File type[${h}] not supported`));
  });
}
export {
  _ as base64ToBlob,
  u as createBlobURL,
  s as createElement,
  W as fileToBase64,
  E as formatBytes,
  O as handleImageFile,
  G as handleMediaFile,
  K as handleVideoFile,
  T as splitBase64
};
