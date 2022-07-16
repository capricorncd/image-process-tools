# image-process

<p align="left">
  <a href="https://npmcharts.com/compare/image-process?minimal=true"><img src="https://img.shields.io/npm/dm/image-process.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/image-process"><img src="https://img.shields.io/npm/v/image-process.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/image-process"><img src="https://img.shields.io/npm/l/image-process.svg?sanitize=true" alt="License"></a>
</p>

Image pre processing for upload (html5 + canvas), ie10+

解决图片上传前裁剪、等比缩放，压缩，支持本地视频、同域视频文件截图功能等。

* 裁剪图片：同时设置参数width, height

* 等比缩放：按宽度缩放，只设置width; 同理按高度缩放，只需设置height

* 不裁剪、不缩放，直接返回源文件base64数据

* 视频截图返回数据中含有字段`videoInfo: { videoFile, videoWidth, videoHeight, duration }`。其他参数为截图参数

https://capricorncd.github.io/image-process-tools

> v4.x.x 无图片裁剪控制视图

## 旧版（带图片裁剪控制视图功能）

https://github.com/capricorncd/image-process-tools/tree/v3.x.x

## 使用

#### npm

```bash
npm install image-process
```

#### yarn

```bash
yarn add image-process
```

#### ES6+

方法`handleMediaFile(file, options)`，返回`promise对象`

- handleMediaFile(file, options)
- handleImageFile(file/base64String, options)
- handleVideoFile(file, options)

```javascript
import { handleMediaFile } from 'image-process'

const options = {
  mimeType: 'image/jpeg',
  width: 600,
  height: 400,
  quality: 0.8
}

// 处理图片或视频文件
handleMediaFile(file, options)
  .then(res => {
    console.log(res)
  })
  .catch (err => {
    console.error(err)
  })
```

browser

```html
<script src="./dist/image-process.umd.js"></script>

imageProcess.handleMediaFile(file, options)
```

## Options 参数

|name|type|default|remark|
|:--|:--|:--|:--|
|width|number|0|返回裁剪图片的宽度|
|height|number|0|返回裁剪图片高度|
|isForce|boolean|false|图片小于目标尺寸时，强制放大或裁剪|
|enableDevicePixelRatio|boolean|false|是否启用设备像素比，2倍时，返回的图片尺寸x2|
|mimeType|string|image/jpeg|返回截图文件类型|
|perResize|number|500|大图缩小时，为防止出现锯齿，每次缩小像素|
|quality|number|0.9|可选值范围0-1|
|longestSide|number|0|调整长边尺寸，短边等比缩放。设置了width/height时无效|
|cropInfo|object|undefined|图片裁剪参数|
|*currentTime|number|undefined|视频截图位置，大于视频时长，则截取最后一帧|

<details>
  <summary>Default Options 默认参数</summary>

```ts
const DEFAULT_OPTIONS: MediaFileHandlerOptions = {
  // Process images according to device pixel ratio
  enableDevicePixelRatio: false,
  // When the image width or height is less than the set value,
  // force the target image width or height to be adjusted to the set value
  isForce: false,
  // Multipurpose Internet Mail Extensions
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  mimeType: 'image/jpeg',
  // When large images are reduced several times,
  // the pixels are reduced each time
  perResize: 500,
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  // A Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp.
  // If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored.
  quality: 0.9,
  // The width of the processed image
  width: 0,
  height: 0,
  // The size of the longest side. Valid when width and height are `0`.
  longestSide: 0,
  // cropInfo: {}
}
```

</details>

### cropInfo

裁剪图片时，以下参数为必须项：

|名称|类型|默认|说明|
|:--|:--|:--|:--|
|sx|number|undefined|原始图片相对于左上角的x坐标|
|sy|number|undefined|原始图片相对于左上角的y坐标|
|sw|number|undefined|从sx开始需要截取的宽度|
|sh|number|undefined|从sy开始需要截取的高度|

![canvas-drawimage](./canvas-drawimage.jpg)

```ts
{
  sx: number
  sy: number
  sw: number
  sh: number
  dx: number
  dy: number
  dw: number
  dh: number
}
```

参数说明：

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

* width: `640` 裁剪或缩放宽度为640px(可选)

  > 1.限制宽度缩放，则只需设置width值。

  > 2.限制高度缩放，则只需设置height值。

  > 3.同时设置了width、height值，则会对图片按尺寸裁剪

* height: `640` 裁剪或缩放高度为640px(可选)

## 返回数据结构

`MediaFileHandlerData`

|名称|类型|说明|
|:--|:--|:--|
|data| `base64 string` | 图片base64数据|
|blob| `Blob` | 处理成功的图片数据，可直接上传至服务器，或赋值给input利用form表单提交。|
|element| `canvas` | canvas节点对象|
|height| `number`  | 处理完成的图片宽度|
|width| `number` | 处理完成的图片宽度|
|url| `blob:url`| |
|size| `object` | 处理完成的图片文件大小，`{text: '66.32KiB', value: 66.32, unit: 'KiB', bytes: 67911}`|
|type| `image/jpeg` | 处理完成的图片类型|
|raw| `MediaFileHandlerRawData` | 原图片相关属性(宽高/文件大小/Base64编码数据/类型/元素节点)|
|videoInfo| `VideoInfo` | 视频信息 |

视频文件还会返回以下数据

```ts
// VideoInfo
{
  "videoInfo": {
    "videoFile": "File",
    "videoWidth": 1920, 
    "videoHeight": 804,
    "duration": 107.477,
    "currentTime": 84.77857628097256
  },
  ...
}
```

## 其他方法

[zx-sml](https://github.com/capricorncd/zx-sml)

## Copyright and license

Code and documentation copyright 2018-Present. [Capricorncd](https://github.com/capricorncd). Code released under the MIT License.
