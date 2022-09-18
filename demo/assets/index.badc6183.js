import{o as T,c as P,a as r,t as y,u as a,b as w,r as q,d as B,e as v,f as M,w as g,g as o,h as G,p as J,i as Q,j as Y,s as ee,k as I,l as z,m as W,n as C,q as te,v as ie,x as k,y as le,F as se,z as ne,A as ae}from"./vendor.0333cf4c.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))t(l);new MutationObserver(l=>{for(const n of l)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&t(d)}).observe(document,{childList:!0,subtree:!0});function s(l){const n={};return l.integrity&&(n.integrity=l.integrity),l.referrerpolicy&&(n.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?n.credentials="include":l.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(l){if(l.ep)return;l.ep=!0;const n=s(l);fetch(l.href,n)}})();const de="image-process",oe="4.3.0",re="A Image clipping or scaling, support local or same domain video file screenshot. It's implemented  in canvas.",ce="dist/image-process.umd.js",he="dist/image-process.es.js",ue="types",me={".":{import:"./dist/image-process.es.js",require:"./dist/image-process.umd.js"}},pe=["image","crop","Video screenshot","Image Compression","html5","canvas"],ge=["dist","types"],_e="pnpm@7.5.1",fe={build:"cd packages/core && pnpm run build",preview:"vite preview",test:"vitest",coverage:"vitest run --coverage",docs:"cd packages/core && pnpm run docs",lint:"eslint . --fix --ext .js,.cjs,.ts"},we={"@types/jsdom":"^16.2.14","@types/node":"^17.0.42","@typescript-eslint/eslint-plugin":"^5.27.1","@typescript-eslint/parser":"^5.27.1",eslint:"^8.17.0","eslint-config-prettier":"^8.5.0","eslint-import-resolver-typescript":"^2.7.1","eslint-plugin-import":"^2.26.0","eslint-plugin-prettier":"^4.0.0",inquirer:"^8.2.4",jsdom:"^19.0.0",pnpm:"^7.5.1",prettier:"^2.6.2",typescript:"^4.7.3",vite:"^3.1.2",vitest:"^0.23.4"},ye="https://github.com/capricorncd/image-process-tools",xe="Xing Zhong <capricorncd@qq.com, zx198401@gmail.com>",ve="MIT",be={"zx-sml":"^0.6.0"},Ve={name:de,version:oe,description:re,main:ce,module:he,types:ue,exports:me,keywords:pe,files:ge,packageManager:_e,scripts:fe,devDependencies:we,repository:ye,author:xe,license:ve,dependencies:be};const Te=w(" image-process "),Re=r("a",{href:"https://github.com/capricorncd/image-process-tools",target:"_blank"},[r("svg",{height:"24",class:"octicon octicon-mark-github",viewBox:"0 0 16 16",version:"1.1",width:"24","aria-hidden":"true"},[r("path",{"fill-rule":"evenodd",fill:"currentColor",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"})])],-1),Pe={__name:"HeaderWrapper",setup(i){return(e,s)=>(T(),P("header",null,[r("h1",null,[Te,r("span",null,"v "+y(a(Ve).version),1)]),Re]))}},$={mimeType:"image/jpeg",perResize:500,quality:.9,width:0,height:0,longestSide:1e3,enableDevicePixelRatio:!1,isForce:!1,cropInfo:{sx:0,sy:0,sw:0,sh:0},currentTime:0},c=q({form:{...$,cropInfo:{...$.cropInfo}},result:null,file:null,setValue(i,e){this[i]=e}}),x=i=>(J("data-v-80c6a67d"),i=i(),Q(),i),$e=x(()=>r("label",{for:"fileInput",class:"el-button el-button--danger is-round"},"Choose File",-1)),De={class:"file-name"},ze={class:"img-wrapper"},Ce={key:0,class:"info"},Se=x(()=>r("dt",null,"Current",-1)),Fe=x(()=>r("span",null,"width: ",-1)),ke=x(()=>r("span",null,"height: ",-1)),Ue=x(()=>r("span",null,"size: ",-1)),Oe=x(()=>r("span",null,"type: ",-1)),qe=x(()=>r("dt",null,"Raw",-1)),Be=x(()=>r("span",null,"width: ",-1)),Me=x(()=>r("span",null,"height: ",-1)),Ie=x(()=>r("span",null,"size: ",-1)),We=x(()=>r("span",null,"type: ",-1)),Ae=["src"],Le=B({__name:"MainWrapper",setup(i){const e=s=>{var n;const l=(n=s.target.files)==null?void 0:n[0];c.setValue("file",l)};return(s,t)=>{const l=v("el-form-item"),n=v("el-main");return T(),M(n,null,{default:g(()=>{var d;return[o(l,null,{default:g(()=>{var h;return[$e,r("input",{id:"fileInput",class:"file-input",type:"file",onChange:e},null,32),r("span",De,y((h=a(c).file)==null?void 0:h.name),1)]}),_:1}),r("div",ze,[a(c).result?(T(),P("dl",Ce,[Se,r("dd",null,[Fe,w(y(a(c).result.width),1)]),r("dd",null,[ke,w(y(a(c).result.height),1)]),r("dd",null,[Ue,w(y(a(c).result.size.text),1)]),r("dd",null,[Oe,w(y(a(c).result.type),1)]),qe,r("dd",null,[Be,w(y(a(c).result.raw.width),1)]),r("dd",null,[Me,w(y(a(c).result.raw.height),1)]),r("dd",null,[Ie,w(y(a(c).result.raw.size.text),1)]),r("dd",null,[We,w(y(a(c).result.raw.type),1)])])):G("",!0),r("img",{src:(d=a(c).result)==null?void 0:d.url,alt:""},null,8,Ae)])]}),_:1})}}});const A=(i,e)=>{const s=i.__vccOpts||i;for(const[t,l]of e)s[t]=l;return s},Ne=A(Le,[["__scopeId","data-v-80c6a67d"]]),L={enableDevicePixelRatio:!1,isForce:!1,mimeType:"image/jpeg",perResize:500,quality:.9,width:0,height:0,longestSide:0},Ee=/^data:(.+?);base64/,je=/^image\/.+/;function N(i,e){return new Promise((s,t)=>{const l={...L,...e};typeof i=="string"&&Ee.test(i)?U(i,l,s,t):(i instanceof File||i instanceof Blob)&&je.test(i.type)?Y(i).then(n=>{U(n,l,s,t)}).catch(t):t(new Error(`Invalid file, ${i}`))})}function U(i,e,s,t){const{type:l}=ee(i),n=I(i,l),d=new Image;d.onload=()=>{const h={element:d,blob:n,data:i,url:z(n),width:d.naturalWidth||d.width,height:d.naturalHeight||d.height,type:l,size:W(n.size)};e.cropInfo&&e.cropInfo.sw&&e.cropInfo.sh?O(h,e,s,t,{...e.cropInfo,dx:0,dy:0,dw:e.cropInfo.sw,dh:e.cropInfo.sh}):e.width&&e.height?O(h,e,s,t,Ke(h,e)):e.width||e.height||e.longestSide?He(h,e,s,t):D({...h,raw:h},e,s)},d.onerror=t,d.src=i}function O(i,e,s,t,l){try{Object.prototype.hasOwnProperty.call(l,"enableDevicePixelRatio")||(l.enableDevicePixelRatio=e.enableDevicePixelRatio);const n=S(i.element,{enableDevicePixelRatio:e.enableDevicePixelRatio,sx:l.sx,sy:l.sy,sw:l.sw,sh:l.sh,dx:0,dy:0,dw:l.sw,dh:l.sh});!e.width&&!e.height?e.longestSide?l.sw>l.sh?(e.width=e.longestSide,e.height=l.sh*e.width/l.sw):(e.height=e.longestSide,e.width=l.sw*e.height/l.sh):(e.width=l.sw,e.height=l.sh):e.width?e.height=l.sh*e.width/l.sw:e.width=l.sw*e.height/l.sh,E(n,i,e,{...l,sx:0,sy:0,sw:n.width,sh:n.height},s)}catch(n){t(n)}}function He(i,e,s,t){try{e.longestSide&&!e.width&&!e.height&&(i.width>=i.height?e.width=e.longestSide:e.height=e.longestSide);const l={enableDevicePixelRatio:e.enableDevicePixelRatio,sx:0,sy:0,sw:i.width,sh:i.height,dx:0,dy:0,dw:e.width,dh:e.height};if(e.width){if(i.width<e.width&&!e.isForce){D({...i,raw:i},e,s);return}l.dh=i.height*e.width/i.width,e.height=l.dh}else{if(i.height<e.height&&!e.isForce){D({...i,raw:i},e,s);return}l.dw=i.width*e.height/i.height,e.width=l.dw}E(i.element,i,e,l,s)}catch(l){t(l)}}function D(i,e,s){i.type!==e.mimeType?(i.type=e.mimeType,j(i.element,i.raw,e,{enableDevicePixelRatio:e.enableDevicePixelRatio,sx:0,sy:0,sw:i.width,sh:i.height,dx:0,dy:0,dw:i.width,dh:i.height},s)):s(i)}function E(i,e,s,t,l){let n=e.width>e.height?e.width-t.dw:e.height-t.dh;if(n>s.perResize){const d=e.height/e.width;for(;n>s.perResize;)n-=s.perResize,t.sw=i.width,t.sh=i.height,t.dw=s.width+n,t.dh=t.dw*d,i=S(i,t)}t.sw=i.width,t.sh=i.height,t.dw=s.width,t.dh=s.height,j(i,e,s,t,l)}function j(i,e,s,t,l){const n=S(i,t),d=/^\w+\/\*$/.test(s.mimeType)||!s.mimeType?e.type:s.mimeType,h=n.toDataURL(d,s.quality),u=I(h,d);l({element:n,type:d,width:n.width,height:n.height,blob:u,data:h,url:z(u),size:W(u.size),raw:e})}function Ke(i,e){const{width:s,height:t}=i,{width:l,height:n}=e;let d;const h=t*l/n;if(s>h)d={sx:(s-h)/2,sy:0,sw:h,sh:t};else{const u=s*n/l;d={sx:0,sy:(t-u)/2,sw:s,sh:u}}return{...d,dx:0,dy:0,dw:l,dh:n}}function S(i,e){const s=e.enableDevicePixelRatio&&window.devicePixelRatio||1,t=C("canvas");t.width=e.dw*s,t.height=e.dh*s;const l=t.getContext("2d");return l.scale(s,s),l.drawImage(i,e.sx,e.sy,e.sw,e.sh,e.dx,e.dy,e.dw,e.dh),t}function Ze(i,e){return new Promise((s,t)=>{const l={...L,...e},n=z(i);let d=C("video",{src:n,autoplay:!0}),h=!1;d.onerror=t,d.oncanplay=()=>{if(h)return;h=!0;const u=d.duration,p=typeof l.currentTime>"u"?u*Math.random():te(l.currentTime),f={url:n,videoFile:i,videoWidth:d.videoWidth,videoHeight:d.videoHeight,duration:u,currentTime:Math.min(p,u)};Xe(d,f).then(_=>{!l.width&&!l.height&&(l.width=f.videoWidth,l.height=f.videoHeight),N(_,e).then(b=>{s({videoInfo:f,...b}),d=null}).catch(t)}).catch(t)}})}function Xe(i,{currentTime:e,videoWidth:s,videoHeight:t}){return new Promise(l=>{i.currentTime=e,i.pause();const n="image/jpeg",d=C("canvas"),h=d.getContext("2d");d.width=s,d.height=t,setTimeout(()=>{h.drawImage(i,0,0,d.width,d.height),l(d.toDataURL(n))},500)})}function Ge(i,e){return new Promise((s,t)=>{const l=i.type;/^(image|video)/.test(l)?RegExp.$1==="image"?N(i,e).then(s).catch(t):Ze(i,e).then(s).catch(t):t(new Error(`File type[${l}] not supported`))})}const Je=w(" OK "),Qe=w(" Reset "),Ye=w("image"),et=B({__name:"AsideWrapper",setup(i){ie(()=>c.file,()=>{h()});const e=k(()=>{var u;return(u=c.result)!=null&&u.videoInfo?c.result.videoInfo.duration:0}),s=k(()=>{var b;const{width:u=0,height:p=0}=((b=c.result)==null?void 0:b.raw)||{},{sx:f,sy:_}=c.form.cropInfo;return{sx:u,sy:p,sw:u-f,sh:p-_}}),t=c.form,l=()=>{console.log("submit!"),t.mimeType=`image/${d.mimeTypeValue.replace(/\s/g,"")}`,h()},n=()=>{Object.keys($).forEach(u=>{t[u]=$[u]}),d.mimeTypeValue="jpeg",h()},d=q({mimeTypeValue:"jpeg"}),h=()=>{!c.file||Ge(c.file,t).then(u=>{console.log(u),c.setValue("result",u)}).catch(u=>{console.error(u)})};return(u,p)=>{const f=v("el-slider"),_=v("el-form-item"),b=v("el-button"),K=v("el-input"),F=v("el-switch"),Z=v("el-form"),X=v("el-aside");return T(),M(X,{width:"320px"},{default:g(()=>[o(Z,{model:a(t),"label-position":"top"},{default:g(()=>[o(_,{label:`width: ${a(t).width}`},{default:g(()=>{var m,V;return[o(f,{modelValue:a(t).width,"onUpdate:modelValue":p[0]||(p[0]=R=>a(t).width=R),max:((V=(m=a(c).result)==null?void 0:m.raw)==null?void 0:V.width)||2e3,step:1},null,8,["modelValue","max"])]}),_:1},8,["label"]),o(_,{label:`height: ${a(t).height}`},{default:g(()=>{var m,V;return[o(f,{modelValue:a(t).height,"onUpdate:modelValue":p[1]||(p[1]=R=>a(t).height=R),max:((V=(m=a(c).result)==null?void 0:m.raw)==null?void 0:V.height)||2e3,step:1},null,8,["modelValue","max"])]}),_:1},8,["label"]),o(_,{label:`longestSide: ${a(t).longestSide}`},{default:g(()=>[o(f,{modelValue:a(t).longestSide,"onUpdate:modelValue":p[2]||(p[2]=m=>a(t).longestSide=m),max:a(c).result?Math.max(a(c).result.raw.width,a(c).result.raw.height):2e3,step:1},null,8,["modelValue","max"])]),_:1},8,["label"]),o(_,{label:"cropInfo"},{default:g(()=>[(T(!0),P(se,null,le(Object.keys(a(t).cropInfo),(m,V)=>(T(),P("div",{key:V,class:"crop-info-item"},[r("span",null,y(`${m}: ${a(t).cropInfo[m]}`),1),o(f,{modelValue:a(t).cropInfo[m],"onUpdate:modelValue":R=>a(t).cropInfo[m]=R,max:a(s)[m],step:1},null,8,["modelValue","onUpdate:modelValue","max"])]))),128))]),_:1}),o(_,{class:"button-wrapper"},{default:g(()=>[o(b,{type:"primary",onClick:l},{default:g(()=>[Je]),_:1}),o(b,{onClick:n},{default:g(()=>[Qe]),_:1})]),_:1}),o(_,{label:`Video currentTime: ${a(t).currentTime}`},{default:g(()=>[o(f,{modelValue:a(t).currentTime,"onUpdate:modelValue":p[3]||(p[3]=m=>a(t).currentTime=m),disabled:!a(e),max:a(e),step:.01},null,8,["modelValue","disabled","max","step"])]),_:1},8,["label"]),o(_,{label:"mimeType: Output picture mimeType"},{default:g(()=>[o(K,{modelValue:d.mimeTypeValue,"onUpdate:modelValue":p[4]||(p[4]=m=>d.mimeTypeValue=m)},{prepend:g(()=>[Ye]),_:1},8,["modelValue"])]),_:1}),o(_,{label:`quality: ${a(t).quality}`},{default:g(()=>[o(f,{modelValue:a(t).quality,"onUpdate:modelValue":p[5]||(p[5]=m=>a(t).quality=m),max:1,step:.01},null,8,["modelValue","step"])]),_:1},8,["label"]),o(_,{label:`perResize: ${a(t).perResize}`},{default:g(()=>[o(f,{modelValue:a(t).perResize,"onUpdate:modelValue":p[6]||(p[6]=m=>a(t).perResize=m),min:10,max:1e3,step:10},null,8,["modelValue"])]),_:1},8,["label"]),o(_,{label:`enableDevicePixelRatio: ${a(t).enableDevicePixelRatio}`},{default:g(()=>[o(F,{modelValue:a(t).enableDevicePixelRatio,"onUpdate:modelValue":p[7]||(p[7]=m=>a(t).enableDevicePixelRatio=m)},null,8,["modelValue"])]),_:1},8,["label"]),o(_,{label:`isForce: ${a(t).isForce}`},{default:g(()=>[o(F,{modelValue:a(t).isForce,"onUpdate:modelValue":p[8]||(p[8]=m=>a(t).isForce=m)},null,8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["model"])]),_:1})}}});const tt=A(et,[["__scopeId","data-v-65ac40da"]]),it={__name:"App",setup(i){return(e,s)=>{const t=v("el-container");return T(),P("div",null,[o(Pe),o(t,null,{default:g(()=>[o(Ne),o(tt)]),_:1})])}}};const H=ne(it);H.use(ae);H.mount("#app");
