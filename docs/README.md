# image-process

<p align="left">
<a href="https://npmcharts.com/compare/image-process?minimal=true"><img src="https://img.shields.io/npm/dm/image-process.svg?sanitize=true" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/image-process"><img src="https://img.shields.io/npm/v/image-process.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/image-process"><img src="https://img.shields.io/npm/l/image-process.svg?sanitize=true" alt="License"></a>
</p>

图片裁剪/等比缩放，支持本地/同域视频文件截图功能 (html5 + canvas)。

- 图片裁剪: 设置裁剪参数即可（见 [MediaFileHandlerOptions](#MediaFileHandlerOptions)）。或者设置有效的`width`和`height`。
- 等比缩放: 只需设置有效的`width`或者`height`.
- 视频截图: 截取指定时间点`currentTime`的帧，参数见[VideoHandlerOptions](#VideoHandlerOptions).

[English](../README.md) | [日本語](./ja_JP.md)

## Demo

https://capricorncd.github.io/image-process-tools/demo

## 用法

```js
import { handleMediaFile } from 'image-process'

const options = {
  mimeType: 'image/jpeg',
  width: 600,
  height: 400,
  quality: 0.8
}

// 图片裁剪或视频截图处理
handleMediaFile(file, options)
  .then(res => {
    console.log(res)
  })
  .catch (err => {
    console.error(err)
  })
```

在HTML文件中使用

```html
<script src="./dist/image-process.umd.js"></script>
<script>
imageProcess.handleMediaFile(file, options)
  .then(res => console.log(res))
  .catch (err => console.error(err))
</script>
```

## 安装

```bash
# npm
npm install image-process
# npm i image-process

# yarn
yarn add image-process

# pnpm
pnpm install image-process
# pnpm i image-process
```

## 方法/函数

### handleImageFile(file, options)

图片文件压缩或裁剪函数。

参数|类型|必须|描述
:--|:--|:--|:--
file|`File`/`Blob`/`string`|yes|为`string`时，必须是base64数据字符串。
options|`ImageHandlerOptions`|no|详情请见[ImageHandlerOptions](#ImageHandlerOptions).

- @returns `Promise<ImageHandlerResult>` 详情请见[ImageHandlerResult](#ImageHandlerResult).

### handleMediaFile(file, options)

图片处理或视频截图处理函数。

参数|类型|必须|描述
:--|:--|:--|:--
file|`File`|yes|图片或视频文件。
options|`MediaFileHandlerOptions`|no|详情请见[MediaFileHandlerOptions](#MediaFileHandlerOptions).

- @returns `Promise<MediaFileHandlerResult>` 详情请见[MediaFileHandlerResult](#MediaFileHandlerResult).

### handleVideoFile(file, options)

视频文件截图处理函数。

参数|类型|必须|描述
:--|:--|:--|:--
file|`File`|yes|视频文件。
options|`VideoHandlerOptions`|no|详情请见[VideoHandlerOptions](#VideoHandlerOptions).

- @returns `Promise<VideoHandlerResult>` 详情请见[VideoHandlerResult](#VideoHandlerResult).

## 类型

### ImageHandlerOptions

[handleImageFile](#handleimagefilefile-options)的参数。

属性|类型|必须|描述
:--|:--|:--|:--
enableDevicePixelRatio|`boolean`|no|是否启用设备的ratio。设备ratio为2时，将会返回2倍宽高的图片。默认为`false`。
mimeType|`string`|no|文件的mime类型，默认为`image/jpeg`。https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
isForce|`boolean`|no|当原始图片宽高小于设置宽高时，是否强制缩放图片。默认为`false`。
perResize|`number`|no|原始图片与目标图片尺寸相差很大时，一次缩放可能会出现锯齿，所以可采用多次缩放处理，防止锯齿出现。该参数为每次缩放的像素值。默认为`500`。
quality|`number`|no|处理后返回的图片质量，取值`0-1`。详情请见[toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)。默认为`0.9`。
width|`number`|no|处理后的图片宽度。默认为`0`。
height|`number`|no|处理后的图片高度。默认为`0`。
longEdge|`number`|no|处理后的图片较长边的像素值，仅在`width`和`height`都为`0`时有效。默认为`0`。
cropInfo|`OptionsCropInfo`|no|详情请见[OptionsCropInfo](#OptionsCropInfo)。

<details>
<summary>源代码</summary>

```ts
interface ImageHandlerOptions {
  // Whether to enable the device pixel ratio, when 2 times, the size of the returned image is x2. Default is `false`.
  enableDevicePixelRatio?: boolean
  // Multipurpose Internet Mail Extensions. Default is `image/jpeg`.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  mimeType?: string
  // When the image width or height is less than the set value,
  // force the target image width or height to be adjusted to the set value.
  // Default is `false`.
  isForce?: boolean
  // Reduce the width each time. To prevent jagged edges when scaling an image.
  // Default is `500`.
  perResize?: number
  // A Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp.
  // If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored.
  // See [toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL).
  // Default is `0.9`.
  quality?: number
  // The `width` of the processed image. Default is `0`.
  width?: number
  // The `height` of the processed image. Default is `0`.
  height?: number
  // The value of long edge. Valid when width and height are `0`. Default is `0`.
  longEdge?: number
  // See [OptionsCropInfo](#OptionsCropInfo).
  cropInfo?: OptionsCropInfo
}
```

</details>

### ImageHandlerResult

[handleImageFile](#handleimagefilefile-options)的返回值。

属性|类型|必须|描述
:--|:--|:--|:--
blob|`Blob`|yes|图片的Blob数据。
data|`string`|yes|图片的base64数据。
width|`number`|yes|图片宽度。
height|`number`|yes|图片高度。
type|`string`|yes|图片mime类型。
size|`SizeInfo`|yes|图片文件大小信息，详情请见[SizeInfo](#SizeInfo)。
url|`string`|yes|图片的Blob本地URL地址。
element|`HTMLImageElement`/`HTMLCanvasElement`|yes|`HTMLImageElement`或`HTMLCanvasElement`.
raw|`MediaFileHandlerRawData`|yes|处理之前的图片的数据信息。详情请见[MediaFileHandlerRawData](#MediaFileHandlerRawData)。

<details>
<summary>源代码</summary>

```ts
interface ImageHandlerResult extends MediaHandlerResultBase {
  // `HTMLImageElement` or `HTMLCanvasElement`.
  element: HTMLImageElement | HTMLCanvasElement
  // Raw information of the image file being processed. See [MediaFileHandlerRawData](#MediaFileHandlerRawData).
  raw: MediaFileHandlerRawData
}
```

</details>

### MediaFileHandlerOptions

[handleMediaFile](#handlemediafilefile-options)的参数。
详情请见[VideoHandlerOptions](#VideoHandlerOptions)。

```ts
type MediaFileHandlerOptions = VideoHandlerOptions
```

### MediaFileHandlerRawData

处理之前的图片的数据信息。

属性|类型|必须|描述
:--|:--|:--|:--
blob|`Blob`|yes|图片的Blob数据。
data|`string`|yes|图片的base64数据。
width|`number`|yes|图片宽度。
height|`number`|yes|图片高度。
type|`string`|yes|图片mime类型。
size|`SizeInfo`|yes|图片文件大小信息，详情请见[SizeInfo](#SizeInfo)。
url|`string`|yes|图片的Blob本地URL地址。
element|`HTMLImageElement`|yes|`HTMLImageElement`

<details>
<summary>源代码</summary>

```ts
interface MediaFileHandlerRawData extends MediaHandlerResultBase {
  // `HTMLImageElement`
  element: HTMLImageElement
}
```

</details>

### MediaFileHandlerResult

[handleMediaFile](#handlemediafilefile-options)的返回值。

属性|类型|必须|描述
:--|:--|:--|:--
blob|`Blob`|yes|图片的Blob数据。
data|`string`|yes|图片的base64数据。
width|`number`|yes|图片宽度。
height|`number`|yes|图片高度。
type|`string`|yes|图片mime类型。
size|`SizeInfo`|yes|图片文件大小信息，详情请见[SizeInfo](#SizeInfo)。
url|`string`|yes|图片的Blob本地URL地址。
element|`HTMLImageElement`/`HTMLCanvasElement`|yes|`HTMLImageElement`或`HTMLCanvasElement`.
raw|`MediaFileHandlerRawData`|yes|处理之前的图片的数据信息。详情请见[MediaFileHandlerRawData](#MediaFileHandlerRawData)。
videoInfo|`VideoInfo`|no|原始视频文件信息。详情请见[VideoInfo](#videoinfo)。

<details>
<summary>源代码</summary>

```ts
interface MediaFileHandlerResult extends ImageHandlerResult {
  // Video file information. See [VideoInfo](#videoinfo).
  videoInfo?: VideoInfo
}
```

</details>

### MediaHandlerResultBase

属性|类型|必须|描述
:--|:--|:--|:--
blob|`Blob`|yes|图片的Blob数据。
data|`string`|yes|图片的base64数据。
width|`number`|yes|图片宽度。
height|`number`|yes|图片高度。
type|`string`|yes|图片mime类型。
size|`SizeInfo`|yes|图片文件大小信息，详情请见[SizeInfo](#SizeInfo)。
url|`string`|yes|图片的Blob本地URL地址。

<details>
<summary>源代码</summary>

```ts
interface MediaHandlerResultBase {
  // Image blob data.
  blob: Blob
  // Image base64 data.
  data: string
  // The width of the image.
  width: number
  // The height of the image.
  height: number
  // The type of the image.
  type: string
  // The size information of the image. See [SizeInfo](#SizeInfo).
  size: SizeInfo
  // A blob url of the image.
  url: string
}
```

</details>

### OptionsCropInfo

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

> 裁剪参数非有效值时将被忽略。

![canvas-drawimage](./canvas-drawimage.jpg)

属性|类型|必须|描述
:--|:--|:--|:--
sx|`number`|yes|x坐标。
sy|`number`|yes|y坐标。
sw|`number`|yes|从`sx`坐标开始沿x轴方向的长度。
sh|`number`|yes|从`sy`坐标开始沿y轴方向的长度。

<details>
<summary>源代码</summary>

```ts
interface OptionsCropInfo {
  // The x-axis coordinate of the top left corner of the sub-rectangle of the source `image` to draw into the destination context. Use the 3- or 5-argument syntax to omit this argument.
  sx: number
  // The y-axis coordinate of the top left corner of the sub-rectangle of the source `image` to draw into the destination context. Use the 3- or 5-argument syntax to omit this argument.
  sy: number
  // The width of the sub-rectangle of the source `image` to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by `sx` and `sy` to the bottom-right corner of the image is used. Use the 3- or 5-argument syntax to omit this argument.
  sw: number
  // The height of the sub-rectangle of the source `image` to draw into the destination context. Use the 3- or 5-argument syntax to omit this argument.
  sh: number
}
```

</details>

### SizeInfo

文件大小信息。

属性|类型|必须|描述
:--|:--|:--|:--
text|`string`|yes|字符串形式的文件大小，比如`1.23MiB`。
unit|`string`|yes|文件大小单位，比如`MiB`。
value|`number`|yes|数值形式的文件大小，比如`1.23`。
bytes|`number`|yes|文件大小字节。

<details>
<summary>源代码</summary>

```ts
interface SizeInfo {
  // File size as a string, `1.23MiB` etc.
  text: string
  // Unit of file size, `MiB` etc.
  unit: string
  // The size of the file as a suitable number, without units, `1.23` etc.
  value: number
  // What is the size of the image in bytes.
  bytes: number
}
```

</details>

### VideoHandlerOptions

[handleVideoFile](#handlevideofilefile-options)函数的参数。

属性|类型|必须|描述
:--|:--|:--|:--
enableDevicePixelRatio|`boolean`|no|是否启用设备的ratio。设备ratio为2时，将会返回2倍宽高的图片。默认为`false`。
mimeType|`string`|no|文件的mime类型，默认为`image/jpeg`。https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
isForce|`boolean`|no|当原始图片宽高小于设置宽高时，是否强制缩放图片。默认为`false`。
perResize|`number`|no|原始图片与目标图片尺寸相差很大时，一次缩放可能会出现锯齿，所以可采用多次缩放处理，防止锯齿出现。该参数为每次缩放的像素值。默认为`500`。
quality|`number`|no|处理后返回的图片质量，取值`0-1`。详情请见[toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)。默认为`0.9`。
width|`number`|no|处理后的图片宽度。默认为`0`。
height|`number`|no|处理后的图片高度。默认为`0`。
longEdge|`number`|no|处理后的图片较长边的像素值，仅在`width`和`height`都为`0`时有效。默认为`0`。
cropInfo|`OptionsCropInfo`|no|详情请见[OptionsCropInfo](#OptionsCropInfo)。
currentTime|`number`|no|视频文件的截图时间点。超出视频播放时间时，将截取最后一帧。默认随机截取某一帧。

<details>
<summary>源代码</summary>

```ts
interface VideoHandlerOptions extends ImageHandlerOptions {
  // The `HTMLMediaElement` interface's `currentTime` property specifies the current playback time in seconds.
  // If it is longer than the video duration, the last frame will be captured.
  // The default is a `random` timestamp in the video duration.
  currentTime?: number
}
```

</details>

### VideoHandlerResult

[handleVideoFile](#handlevideofilefile-options)的返回值。

属性|类型|必须|描述
:--|:--|:--|:--
blob|`Blob`|yes|图片的Blob数据。
data|`string`|yes|图片的base64数据。
width|`number`|yes|图片宽度。
height|`number`|yes|图片高度。
type|`string`|yes|图片mime类型。
size|`SizeInfo`|yes|图片文件大小信息，详情请见[SizeInfo](#SizeInfo)。
url|`string`|yes|图片的Blob本地URL地址。
element|`HTMLImageElement`/`HTMLCanvasElement`|yes|`HTMLImageElement`或`HTMLCanvasElement`.
raw|`MediaFileHandlerRawData`|yes|处理之前的图片的数据信息。详情请见[MediaFileHandlerRawData](#MediaFileHandlerRawData)。
videoInfo|`VideoInfo`|yes|When taking a screenshot of the video, the original video file information. See [VideoInfo](#VideoInfo).

<details>
<summary>源代码</summary>

```ts
interface VideoHandlerResult extends ImageHandlerResult {
  // When taking a screenshot of the video, the original video file information.
  // See [VideoInfo](#VideoInfo).
  videoInfo: VideoInfo
}
```

</details>

### VideoInfo

视频文件信息。

属性|类型|必须|描述
:--|:--|:--|:--
url|`string`|yes|视频文件的blob本地URL。
videoFile|`File`|yes|视频文件File对象。
videoWidth|`number`|yes|视频宽度。
videoHeight|`number`|yes|视频高度。
duration|`number`|yes|视频时长。
currentTime|`number`|yes|截取图片的时间点位置。

<details>
<summary>源代码</summary>

```ts
interface VideoInfo {
  // A blob url of the video file.
  url: string
  // The video file object.
  videoFile: File
  // The width of the video.
  videoWidth: number
  // The height of the video.
  videoHeight: number
  // The duration of the video.
  duration: number
  // The time point of the video screenshot.
  currentTime: number
}
```

</details>

## 其他方法函数

以下方法的文件请见 https://github.com/capricorncd/zx-sml

```js
import {
  fileToBase64,
  createElement,
  formatBytes,
  splitBase64,
  createBlobURL,
  base64ToBlob,
} from 'image-process'
```

## License

Code and documentation copyright 2018-Present. [Capricorncd](https://github.com/capricorncd). Code released under the MIT License.
