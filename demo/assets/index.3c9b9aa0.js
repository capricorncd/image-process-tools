import {
  o as v,
  c as R,
  a as g,
  t as b,
  u as o,
  b as V,
  r as B,
  d as y,
  e as q,
  w as p,
  f as d,
  g as X,
  p as Y,
  h as ee,
  i as te,
  s as ie,
  j as M,
  k as C,
  l as N,
  m as S,
  n as le,
  q as se,
  v as ne,
  x as k,
  y as ae,
  F as W,
  z as oe,
  A as de,
} from './vendor.38a690b4.js'
const re = function () {
  const e = document.createElement('link').relList
  if (e && e.supports && e.supports('modulepreload')) return
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) t(l)
  new MutationObserver((l) => {
    for (const a of l)
      if (a.type === 'childList')
        for (const n of a.addedNodes)
          n.tagName === 'LINK' && n.rel === 'modulepreload' && t(n)
  }).observe(document, { childList: !0, subtree: !0 })
  function s(l) {
    const a = {}
    return (
      l.integrity && (a.integrity = l.integrity),
      l.referrerpolicy && (a.referrerPolicy = l.referrerpolicy),
      l.crossorigin === 'use-credentials'
        ? (a.credentials = 'include')
        : l.crossorigin === 'anonymous'
        ? (a.credentials = 'omit')
        : (a.credentials = 'same-origin'),
      a
    )
  }
  function t(l) {
    if (l.ep) return
    l.ep = !0
    const a = s(l)
    fetch(l.href, a)
  }
}
re()
const ce = 'image-process',
  ue = '4.2.0',
  he = 'Browser image processing and video screenshots (html5+canvas)',
  me = 'dist/image-process.umd.js',
  pe = 'dist/image-process.es.js',
  ge = 'types',
  _e = [
    'image',
    'crop',
    'Video screenshot',
    'Image Compression',
    'html5',
    'canvas',
  ],
  fe = ['dist', 'packages', 'types'],
  ye = 'pnpm@7.5.1',
  we = {
    build: 'cd packages/core && pnpm run build',
    preview: 'vite preview',
    test: 'vitest',
    coverage: 'vitest run --coverage',
    docs: 'node scripts/create-docs.js',
    lint: 'eslint . --fix --ext .js,.cjs,.ts',
  },
  xe = { 'zx-sml': '^0.2.0' },
  ve = {
    '@types/jsdom': '^16.2.14',
    '@types/node': '^17.0.42',
    '@typescript-eslint/eslint-plugin': '^5.27.1',
    '@typescript-eslint/parser': '^5.27.1',
    eslint: '^8.17.0',
    'eslint-config-prettier': '^8.5.0',
    'eslint-import-resolver-typescript': '^2.7.1',
    'eslint-plugin-prettier': '^4.0.0',
    inquirer: '^8.2.4',
    jsdom: '^19.0.0',
    pnpm: '^7.5.1',
    prettier: '^2.6.2',
    typescript: '^4.7.3',
    vite: '^3.0.0',
    vitest: '^0.18.0',
  },
  be = 'https://github.com/capricorncd/image-process-tools',
  Ve = 'Capricorncd <capricorncd@qq.com>',
  Te = 'MIT',
  Re = {
    name: ce,
    version: ue,
    description: he,
    main: me,
    module: pe,
    types: ge,
    keywords: _e,
    files: fe,
    packageManager: ye,
    scripts: we,
    dependencies: xe,
    devDependencies: ve,
    repository: be,
    author: Ve,
    license: Te,
  }
const Pe = V(' image-process '),
  De = g(
    'a',
    {
      href: 'https://github.com/capricorncd/image-process-tools',
      target: '_blank',
    },
    [
      g(
        'svg',
        {
          height: '24',
          class: 'octicon octicon-mark-github',
          viewBox: '0 0 16 16',
          version: '1.1',
          width: '24',
          'aria-hidden': 'true',
        },
        [
          g('path', {
            'fill-rule': 'evenodd',
            fill: 'currentColor',
            d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',
          }),
        ]
      ),
    ],
    -1
  ),
  $e = {
    __name: 'HeaderWrapper',
    setup(i) {
      return (e, s) => (
        v(),
        R('header', null, [
          g('h1', null, [Pe, g('span', null, 'v ' + b(o(Re).version), 1)]),
          De,
        ])
      )
    },
  },
  D = {
    mimeType: 'image/jpeg',
    perResize: 500,
    quality: 0.9,
    width: 0,
    height: 0,
    longestSide: 1e3,
    enableDevicePixelRatio: !1,
    isForce: !1,
    cropInfo: { sx: 0, sy: 0, sw: 0, sh: 0 },
    currentTime: 0,
  },
  m = B({
    form: JSON.parse(JSON.stringify(D)),
    result: null,
    file: null,
    setValue(i, e) {
      this[i] = e
    },
  })
const L = (i, e) => {
    const s = i.__vccOpts || i
    for (const [t, l] of e) s[t] = l
    return s
  },
  P = (i) => (Y('data-v-c94a9a57'), (i = i()), ee(), i),
  Ce = P(() =>
    g(
      'label',
      { for: 'fileInput', class: 'el-button el-button--danger is-round' },
      'Choose File',
      -1
    )
  ),
  Se = { class: 'file-name' },
  Fe = { class: 'img-wrapper' },
  ze = { key: 0, class: 'info' },
  Ue = P(() => g('dt', null, 'Info', -1)),
  ke = P(() => g('span', null, 'width: ', -1)),
  Oe = P(() => g('span', null, 'height: ', -1)),
  Ie = P(() => g('span', null, 'size: ', -1)),
  Be = ['src'],
  qe = {
    __name: 'MainWrapper',
    setup(i) {
      const e = (s) => {
        const t = s.target.files[0]
        m.setValue('file', t)
      }
      return (s, t) => {
        const l = y('el-form-item'),
          a = y('el-main')
        return (
          v(),
          q(a, null, {
            default: p(() => {
              var n
              return [
                d(l, null, {
                  default: p(() => {
                    var c
                    return [
                      Ce,
                      g(
                        'input',
                        {
                          id: 'fileInput',
                          class: 'file-input',
                          type: 'file',
                          onChange: e,
                        },
                        null,
                        32
                      ),
                      g(
                        'span',
                        Se,
                        b((c = o(m).file) == null ? void 0 : c.name),
                        1
                      ),
                    ]
                  }),
                  _: 1,
                }),
                g('div', Fe, [
                  o(m).result
                    ? (v(),
                      R('dl', ze, [
                        Ue,
                        g('dd', null, [ke, V(b(o(m).result.width), 1)]),
                        g('dd', null, [Oe, V(b(o(m).result.height), 1)]),
                        g('dd', null, [Ie, V(b(o(m).result.size.text), 1)]),
                      ]))
                    : X('', !0),
                  g(
                    'img',
                    {
                      src: (n = o(m).result) == null ? void 0 : n.url,
                      alt: '',
                    },
                    null,
                    8,
                    Be
                  ),
                ]),
              ]
            }),
            _: 1,
          })
        )
      }
    },
  },
  Me = L(qe, [['__scopeId', 'data-v-c94a9a57']]),
  A = {
    enableDevicePixelRatio: !1,
    isForce: !1,
    mimeType: 'image/jpeg',
    perResize: 500,
    quality: 0.9,
    width: 0,
    height: 0,
    longestSide: 0,
  },
  Ne = /^data:(.+?);base64/,
  We = /^image\/.+/
function E(i, e) {
  return new Promise((s, t) => {
    const l = { ...A, ...e }
    typeof i == 'string' && Ne.test(i)
      ? O(i, l, s, t)
      : (i instanceof File || i instanceof Blob) && We.test(i.type)
      ? te(i)
          .then((a) => {
            O(a, l, s, t)
          })
          .catch(t)
      : t(new Error(`Invalid file, ${i}`))
  })
}
function O(i, e, s, t) {
  const { type: l } = ie(i),
    a = M(i, l),
    n = new Image()
  ;(n.onload = () => {
    const c = {
      element: n,
      blob: a,
      data: i,
      url: C(a),
      width: n.naturalWidth || n.width,
      height: n.naturalHeight || n.height,
      type: l,
      size: N(a.size),
    }
    e.cropInfo && e.cropInfo.sw && e.cropInfo.sh
      ? I(c, e, s, t, {
          ...e.cropInfo,
          dx: 0,
          dy: 0,
          dw: e.cropInfo.sw,
          dh: e.cropInfo.sh,
        })
      : e.width > 0 && e.height > 0
      ? I(c, e, s, t, Ae(c, e))
      : e.width > 0 || e.height > 0 || e.longestSide > 0
      ? Le(c, e, s, t)
      : $({ ...c, raw: c }, e, s)
  }),
    (n.onerror = t),
    (n.src = i)
}
function I(i, e, s, t, l) {
  try {
    Object.prototype.hasOwnProperty.call(l, 'enableDevicePixelRatio') ||
      (l.enableDevicePixelRatio = e.enableDevicePixelRatio)
    const a = F(i.element, {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: l.sx,
      sy: l.sy,
      sw: l.sw,
      sh: l.sh,
      dx: 0,
      dy: 0,
      dw: l.sw,
      dh: l.sh,
    })
    !e.width && !e.height
      ? ((e.width = l.sw), (e.height = l.sh))
      : e.width
      ? (e.height = (l.sh * e.width) / l.sw)
      : (e.width = (l.sw * e.height) / l.sh),
      H(a, i, e, { ...l, sx: 0, sy: 0, sw: a.width, sh: a.height }, s)
  } catch (a) {
    t(a)
  }
}
function Le(i, e, s, t) {
  try {
    e.longestSide > 0 &&
      !e.width &&
      !e.height &&
      (i.width >= i.height
        ? (e.width = e.longestSide)
        : (e.height = e.longestSide))
    const l = {
      enableDevicePixelRatio: e.enableDevicePixelRatio,
      sx: 0,
      sy: 0,
      sw: i.width,
      sh: i.height,
      dx: 0,
      dy: 0,
      dw: e.width,
      dh: e.height,
    }
    if (e.width > 0) {
      if (i.width < e.width && !e.isForce) {
        $({ ...i, raw: i }, e, s)
        return
      }
      ;(l.dh = (i.height * e.width) / i.width), (e.height = l.dh)
    } else {
      if (i.height < e.height && !e.isForce) {
        $({ ...i, raw: i }, e, s)
        return
      }
      ;(l.dw = (i.width * e.height) / i.height), (e.width = l.dw)
    }
    H(i.element, i, e, l, s)
  } catch (l) {
    t(l)
  }
}
function $(i, e, s) {
  i.type !== e.mimeType
    ? ((i.type = e.mimeType),
      j(
        i.element,
        i.raw,
        e,
        {
          enableDevicePixelRatio: e.enableDevicePixelRatio,
          sx: 0,
          sy: 0,
          sw: i.width,
          sh: i.height,
          dx: 0,
          dy: 0,
          dw: i.width,
          dh: i.height,
        },
        s
      ))
    : s(i)
}
function H(i, e, s, t, l) {
  let a = e.width > e.height ? e.width - t.dw : e.height - t.dh
  if (a > s.perResize) {
    const n = e.height / e.width
    for (; a > s.perResize; )
      (a -= s.perResize),
        (t.sw = i.width),
        (t.sh = i.height),
        (t.dw = s.width + a),
        (t.dh = t.dw * n),
        (i = F(i, t))
    ;(t.sw = i.width), (t.sh = i.height), (t.dw = s.width), (t.dh = s.height)
  }
  j(i, e, s, t, l)
}
function j(i, e, s, t, l) {
  const a = F(i, t),
    n = s.mimeType,
    c = a.toDataURL(n, s.quality),
    u = M(c, n)
  l({
    element: a,
    type: n,
    width: a.width,
    height: a.height,
    blob: u,
    data: c,
    url: C(u),
    size: N(u.size),
    raw: e,
  })
}
function Ae(i, e) {
  const { width: s, height: t } = i,
    { width: l, height: a } = e
  let n
  const c = (t * l) / a
  if (s > c) n = { sx: (s - c) / 2, sy: 0, sw: c, sh: t }
  else {
    const u = (s * a) / l
    n = { sx: 0, sy: (t - u) / 2, sw: s, sh: u }
  }
  return { ...n, dx: 0, dy: 0, dw: l, dh: a }
}
function F(i, e) {
  const s = (e.enableDevicePixelRatio && window.devicePixelRatio) || 1,
    t = S('canvas')
  ;(t.width = e.dw * s), (t.height = e.dh * s)
  const l = t.getContext('2d')
  return (
    l.scale(s, s),
    l.drawImage(i, e.sx, e.sy, e.sw, e.sh, e.dx, e.dy, e.dw, e.dh),
    t
  )
}
function Ee(i, e) {
  return new Promise((s, t) => {
    const l = { ...A, ...e },
      a = C(i)
    let n = S('video', { src: a, autoplay: !0 }),
      c = !1
    ;(n.onerror = t),
      (n.oncanplay = () => {
        if (c) return
        c = !0
        const u = n.duration,
          h =
            typeof l.currentTime > 'u' ? u * Math.random() : le(l.currentTime),
          f = {
            url: a,
            videoFile: i,
            videoWidth: n.videoWidth,
            videoHeight: n.videoHeight,
            duration: u,
            currentTime: Math.min(h, u),
          }
        He(n, f)
          .then((_) => {
            !l.width &&
              !l.height &&
              ((l.width = f.videoWidth), (l.height = f.videoHeight)),
              E(_, e)
                .then((w) => {
                  s({ videoInfo: f, ...w }), (n = null)
                })
                .catch(t)
          })
          .catch(t)
      })
  })
}
function He(i, { currentTime: e, videoWidth: s, videoHeight: t }) {
  return new Promise((l) => {
    ;(i.currentTime = e), i.pause()
    const a = 'image/jpeg',
      n = S('canvas'),
      c = n.getContext('2d')
    ;(n.width = s),
      (n.height = t),
      setTimeout(() => {
        c.drawImage(i, 0, 0, n.width, n.height), l(n.toDataURL(a))
      }, 500)
  })
}
function je(i, e) {
  return new Promise((s, t) => {
    const l = i.type
    ;/^(image|video)/.test(l)
      ? RegExp.$1 === 'image'
        ? E(i, e).then(s).catch(t)
        : Ee(i, e).then(s).catch(t)
      : t(new Error(`File type[${l}] not supported`))
  })
}
const Je = V(' OK '),
  Ke = V(' Reset '),
  Ze = se({
    __name: 'AsideWrapper',
    setup(i) {
      ne(
        () => m.file,
        () => {
          c()
        }
      )
      const e = k(() => {
          var u
          return (u = m.result) != null && u.videoInfo
            ? m.result.videoInfo.duration
            : 0
        }),
        s = k(() => {
          var w
          const { width: u = 0, height: h = 0 } =
              ((w = m.result) == null ? void 0 : w.raw) || {},
            { sx: f, sy: _ } = m.form.cropInfo
          return { sx: u, sy: h, sw: u - f, sh: h - _ }
        }),
        t = m.form,
        l = () => {
          console.log('submit!'),
            (t.mimeType = `${n.mimeTypePrefix}/${n.mimeTypeValue.replace(
              /\s/g,
              ''
            )}`),
            c()
        },
        a = () => {
          Object.keys(D).forEach((u) => {
            t[u] = D[u]
          }),
            (n.mimeTypePrefix = 'image'),
            (n.mimeTypeValue = 'jpeg'),
            c()
        },
        n = B({ mimeTypePrefix: 'image', mimeTypeValue: 'jpeg' }),
        c = () => {
          !m.file ||
            je(m.file, t)
              .then((u) => {
                console.log(u), m.setValue('result', u)
              })
              .catch((u) => {
                console.error(u)
              })
        }
      return (u, h) => {
        const f = y('el-slider'),
          _ = y('el-form-item'),
          w = y('el-button'),
          z = y('el-option'),
          K = y('el-select'),
          Z = y('el-input'),
          U = y('el-switch'),
          G = y('el-form'),
          Q = y('el-aside')
        return (
          v(),
          q(
            Q,
            { width: '320px' },
            {
              default: p(() => [
                d(
                  G,
                  { model: o(t), 'label-position': 'top' },
                  {
                    default: p(() => [
                      d(
                        _,
                        { label: `width: ${o(t).width}` },
                        {
                          default: p(() => {
                            var r, x
                            return [
                              d(
                                f,
                                {
                                  modelValue: o(t).width,
                                  'onUpdate:modelValue':
                                    h[0] || (h[0] = (T) => (o(t).width = T)),
                                  max:
                                    ((x =
                                      (r = o(m).result) == null
                                        ? void 0
                                        : r.raw) == null
                                      ? void 0
                                      : x.width) || 2e3,
                                  step: 1,
                                },
                                null,
                                8,
                                ['modelValue', 'max']
                              ),
                            ]
                          }),
                          _: 1,
                        },
                        8,
                        ['label']
                      ),
                      d(
                        _,
                        { label: `height: ${o(t).height}` },
                        {
                          default: p(() => {
                            var r, x
                            return [
                              d(
                                f,
                                {
                                  modelValue: o(t).height,
                                  'onUpdate:modelValue':
                                    h[1] || (h[1] = (T) => (o(t).height = T)),
                                  max:
                                    ((x =
                                      (r = o(m).result) == null
                                        ? void 0
                                        : r.raw) == null
                                      ? void 0
                                      : x.height) || 2e3,
                                  step: 1,
                                },
                                null,
                                8,
                                ['modelValue', 'max']
                              ),
                            ]
                          }),
                          _: 1,
                        },
                        8,
                        ['label']
                      ),
                      d(
                        _,
                        { label: `longestSide: ${o(t).longestSide}` },
                        {
                          default: p(() => [
                            d(
                              f,
                              {
                                modelValue: o(t).longestSide,
                                'onUpdate:modelValue':
                                  h[2] ||
                                  (h[2] = (r) => (o(t).longestSide = r)),
                                max: o(m).result
                                  ? Math.max(
                                      o(m).result.raw.width,
                                      o(m).result.raw.height
                                    )
                                  : 2e3,
                                step: 1,
                              },
                              null,
                              8,
                              ['modelValue', 'max']
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['label']
                      ),
                      d(
                        _,
                        { label: 'cropInfo' },
                        {
                          default: p(() => [
                            (v(!0),
                            R(
                              W,
                              null,
                              ae(
                                Object.keys(o(t).cropInfo),
                                (r, x) => (
                                  v(),
                                  R(
                                    'div',
                                    { key: x, class: 'crop-info-item' },
                                    [
                                      g(
                                        'span',
                                        null,
                                        b(`${r}: ${o(t).cropInfo[r]}`),
                                        1
                                      ),
                                      d(
                                        f,
                                        {
                                          modelValue: o(t).cropInfo[r],
                                          'onUpdate:modelValue': (T) =>
                                            (o(t).cropInfo[r] = T),
                                          max: o(s)[r],
                                          step: 1,
                                        },
                                        null,
                                        8,
                                        [
                                          'modelValue',
                                          'onUpdate:modelValue',
                                          'max',
                                        ]
                                      ),
                                    ]
                                  )
                                )
                              ),
                              128
                            )),
                          ]),
                          _: 1,
                        }
                      ),
                      d(
                        _,
                        { class: 'button-wrapper' },
                        {
                          default: p(() => [
                            d(
                              w,
                              { type: 'primary', onClick: l },
                              { default: p(() => [Je]), _: 1 }
                            ),
                            d(
                              w,
                              { onClick: a },
                              { default: p(() => [Ke]), _: 1 }
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                      d(
                        _,
                        { label: `Video currentTime: ${o(t).currentTime}` },
                        {
                          default: p(() => [
                            d(
                              f,
                              {
                                modelValue: o(t).currentTime,
                                'onUpdate:modelValue':
                                  h[3] ||
                                  (h[3] = (r) => (o(t).currentTime = r)),
                                disabled: !o(e),
                                max: o(e),
                                step: 0.01,
                              },
                              null,
                              8,
                              ['modelValue', 'disabled', 'max', 'step']
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['label']
                      ),
                      d(
                        _,
                        { label: 'mimeType: Output picture mimeType' },
                        {
                          default: p(() => [
                            d(
                              Z,
                              {
                                modelValue: n.mimeTypeValue,
                                'onUpdate:modelValue':
                                  h[5] || (h[5] = (r) => (n.mimeTypeValue = r)),
                              },
                              {
                                prepend: p(() => [
                                  d(
                                    K,
                                    {
                                      modelValue: n.mimeTypePrefix,
                                      'onUpdate:modelValue':
                                        h[4] ||
                                        (h[4] = (r) => (n.mimeTypePrefix = r)),
                                      placeholder: 'Select',
                                      style: { width: '90px' },
                                    },
                                    {
                                      default: p(() => [
                                        d(z, {
                                          label: 'image',
                                          value: 'image',
                                        }),
                                        d(z, {
                                          label: 'video',
                                          value: 'video',
                                        }),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ['modelValue']
                                  ),
                                ]),
                                _: 1,
                              },
                              8,
                              ['modelValue']
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                      d(
                        _,
                        { label: `quality: ${o(t).quality}` },
                        {
                          default: p(() => [
                            d(
                              f,
                              {
                                modelValue: o(t).quality,
                                'onUpdate:modelValue':
                                  h[6] || (h[6] = (r) => (o(t).quality = r)),
                                max: 1,
                                step: 0.01,
                              },
                              null,
                              8,
                              ['modelValue', 'step']
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['label']
                      ),
                      d(
                        _,
                        { label: `perResize: ${o(t).perResize}` },
                        {
                          default: p(() => [
                            d(
                              f,
                              {
                                modelValue: o(t).perResize,
                                'onUpdate:modelValue':
                                  h[7] || (h[7] = (r) => (o(t).perResize = r)),
                                min: 10,
                                max: 1e3,
                                step: 10,
                              },
                              null,
                              8,
                              ['modelValue']
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['label']
                      ),
                      d(
                        _,
                        {
                          label: `enableDevicePixelRatio: ${
                            o(t).enableDevicePixelRatio
                          }`,
                        },
                        {
                          default: p(() => [
                            d(
                              U,
                              {
                                modelValue: o(t).enableDevicePixelRatio,
                                'onUpdate:modelValue':
                                  h[8] ||
                                  (h[8] = (r) =>
                                    (o(t).enableDevicePixelRatio = r)),
                              },
                              null,
                              8,
                              ['modelValue']
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['label']
                      ),
                      d(
                        _,
                        { label: `isForce: ${o(t).isForce}` },
                        {
                          default: p(() => [
                            d(
                              U,
                              {
                                modelValue: o(t).isForce,
                                'onUpdate:modelValue':
                                  h[9] || (h[9] = (r) => (o(t).isForce = r)),
                              },
                              null,
                              8,
                              ['modelValue']
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['label']
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ['model']
                ),
              ]),
              _: 1,
            }
          )
        )
      }
    },
  })
const Ge = L(Ze, [['__scopeId', 'data-v-d2dba2c2']]),
  Qe = {
    __name: 'App',
    setup(i) {
      return (e, s) => {
        const t = y('el-container')
        return (
          v(),
          R(
            W,
            null,
            [d($e), d(t, null, { default: p(() => [d(Me), d(Ge)]), _: 1 })],
            64
          )
        )
      }
    },
  }
const J = oe(Qe)
J.use(de)
J.mount('#app')
