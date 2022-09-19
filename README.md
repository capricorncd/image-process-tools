# image-process

<p align="left">
<a href="https://npmcharts.com/compare/image-process?minimal=true"><img src="https://img.shields.io/npm/dm/image-process.svg?sanitize=true" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/image-process"><img src="https://img.shields.io/npm/v/image-process.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/image-process"><img src="https://img.shields.io/npm/l/image-process.svg?sanitize=true" alt="License"></a>
</p>

A Image clipping or scaling, support local or same domain video file screenshot. It's implemented  in canvas.

- Image cropping: Just set valid cropping options (See [ImageHandlerOptions](#ImageHandlerOptions)), or set valid width and height, the image will be centered and cropped.
- Proportional scaling: Just set the width or height.
- Video screenshot: Take a picture according to the set `currentTime` of the [VideoHandlerOptions](#VideoHandlerOptions).

[简体中文](./docs) | [日本語](./docs/ja_JP.md)

## Demo

https://capricorncd.github.io/image-process-tools/demo

## Usage

```js
import { handleMediaFile } from 'image-process'

const options = {
  mimeType: 'image/jpeg',
  width: 600,
  height: 400,
  quality: 0.8
}

// Crop image or video screenshot
handleMediaFile(file, options)
  .then(res => {
    console.log(res)
  })
  .catch (err => {
    console.error(err)
  })
```

Use in html

```html
<script>
imageProcess.handleMediaFile(file, options)
  .then(res => console.log(res))
  .catch (err => console.error(err))
</script>
```

## Installation

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

## Methods

### handleImageFile(file, options)

Image file compression or cropping function.

Param|Types|Required|Description
:--|:--|:--|:--
file|`File`/`Blob`/`string`|yes|It's string can only be base64 data.
options|`ImageHandlerOptions`|no|See [ImageHandlerOptions](#ImageHandlerOptions).

- @returns `Promise<ImageHandlerResult>` See [ImageHandlerResult](#ImageHandlerResult).

### handleMediaFile(file, options)

Image processing or video screenshot processing function.

Param|Types|Required|Description
:--|:--|:--|:--
file|`File`|yes|Image or video file.
options|`Partial<MediaFileHandlerOptions>`|no|See [MediaFileHandlerOptions](#MediaFileHandlerOptions).

- @returns `Promise<MediaFileHandlerResult>` See [MediaFileHandlerResult](#MediaFileHandlerResult).

### handleVideoFile(file, options)

Video file screenshot processing function.

Param|Types|Required|Description
:--|:--|:--|:--
file|`File`|yes|-
options|`VideoHandlerOptions`|no|See [VideoHandlerOptions](#VideoHandlerOptions).

- @returns `Promise<VideoHandlerResult>` See [VideoHandlerResult](#VideoHandlerResult).

## Types

### ImageHandlerOptions

An options of the [handleImageFile](#handleimagefilefile-options) function.

Prop|Types|Required|Description
:--|:--|:--|:--
enableDevicePixelRatio|`boolean`|no|Whether to enable the device pixel ratio, when 2 times, the size of the returned image is x2. Default is `false`.
mimeType|`string`|no|Multipurpose Internet Mail Extensions. Default is `image/jpeg`. https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
isForce|`boolean`|no|When the image width or height is less than the set value, force the target image width or height to be adjusted to the set value. Default is `false`.
perResize|`number`|no|Reduce the width each time. To prevent jagged edges when scaling an image. Default is `500`.
quality|`number`|no|A Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp. If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored. See [toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL). Default is `0.9`.
width|`number`|no|The `width` of the processed image. Default is `0`.
height|`number`|no|The `height` of the processed image. Default is `0`.
longestSide|`number`|no|The size of the longest side. Valid when width and height are `0`. Default is `0`.
cropInfo|`OptionsCropInfo`|no|See [OptionsCropInfo](#OptionsCropInfo).

<details>
<summary>Source Code</summary>

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
  // The size of the longest side. Valid when width and height are `0`. Default is `0`.
  longestSide?: number
  // See [OptionsCropInfo](#OptionsCropInfo).
  cropInfo?: OptionsCropInfo
}
```

</details>

### ImageHandlerResult

Data returned of the [handleImageFile](#handleimagefilefile-options) function.

Prop|Types|Required|Description
:--|:--|:--|:--
blob|`Blob`|yes|Image blob data.
data|`string`|yes|Image base64 data.
width|`number`|yes|The width of the image.
height|`number`|yes|The height of the image.
type|`string`|yes|The type of the image.
size|`SizeInfo`|yes|The size information of the image. See [SizeInfo](#SizeInfo).
url|`string`|yes|A blob url of the image.
element|`HTMLImageElement`/`HTMLCanvasElement`|yes|`HTMLImageElement` or `HTMLCanvasElement`.
raw|`MediaFileHandlerRawData`|yes|Raw information of the image file being processed. See [MediaFileHandlerRawData].(#MediaFileHandlerRawData).

<details>
<summary>Source Code</summary>

```ts
interface ImageHandlerResult extends MediaHandlerResultBase {
  // `HTMLImageElement` or `HTMLCanvasElement`.
  element: HTMLImageElement | HTMLCanvasElement
  // Raw information of the image file being processed. See [MediaFileHandlerRawData].(#MediaFileHandlerRawData).
  raw: MediaFileHandlerRawData
}
```

</details>

### MediaFileHandlerOptions

An options of the [handleMediaFile](#handlemediafilefile-options) function.
See [VideoHandlerOptions](#VideoHandlerOptions).

```ts
type MediaFileHandlerOptions = VideoHandlerOptions
```

### MediaFileHandlerRawData

Raw information of the image file being processed.

Prop|Types|Required|Description
:--|:--|:--|:--
blob|`Blob`|yes|Image blob data.
data|`string`|yes|Image base64 data.
width|`number`|yes|The width of the image.
height|`number`|yes|The height of the image.
type|`string`|yes|The type of the image.
size|`SizeInfo`|yes|The size information of the image. See [SizeInfo](#SizeInfo).
url|`string`|yes|A blob url of the image.
element|`HTMLImageElement`|yes|`HTMLImageElement`

<details>
<summary>Source Code</summary>

```ts
interface MediaFileHandlerRawData extends MediaHandlerResultBase {
  // `HTMLImageElement`
  element: HTMLImageElement
}
```

</details>

### MediaFileHandlerResult

Data returned of the [handleMediaFile](#handlemediafilefile-options) function.

Prop|Types|Required|Description
:--|:--|:--|:--
blob|`Blob`|yes|Image blob data.
data|`string`|yes|Image base64 data.
width|`number`|yes|The width of the image.
height|`number`|yes|The height of the image.
type|`string`|yes|The type of the image.
size|`SizeInfo`|yes|The size information of the image. See [SizeInfo](#SizeInfo).
url|`string`|yes|A blob url of the image.
element|`HTMLImageElement`/`HTMLCanvasElement`|yes|`HTMLImageElement` or `HTMLCanvasElement`.
raw|`MediaFileHandlerRawData`|yes|Raw information of the image file being processed. See [MediaFileHandlerRawData].(#MediaFileHandlerRawData).
videoInfo|`VideoInfo`|no|Video file information. See [VideoInfo](#videoinfo).

<details>
<summary>Source Code</summary>

```ts
interface MediaFileHandlerResult extends ImageHandlerResult {
  // Video file information. See [VideoInfo](#videoinfo).
  videoInfo?: VideoInfo
}
```

</details>

### MediaHandlerResultBase

Prop|Types|Required|Description
:--|:--|:--|:--
blob|`Blob`|yes|Image blob data.
data|`string`|yes|Image base64 data.
width|`number`|yes|The width of the image.
height|`number`|yes|The height of the image.
type|`string`|yes|The type of the image.
size|`SizeInfo`|yes|The size information of the image. See [SizeInfo](#SizeInfo).
url|`string`|yes|A blob url of the image.

<details>
<summary>Source Code</summary>

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

> It will be ignored when the value is invalid.

![canvas-drawimage](./docs/canvas-drawimage.jpg)

Prop|Types|Required|Description
:--|:--|:--|:--
sx|`number`|yes|The x-axis coordinate of the top left corner of the sub-rectangle of the source `image` to draw into the destination context. Use the 3- or 5-argument syntax to omit this argument.
sy|`number`|yes|The y-axis coordinate of the top left corner of the sub-rectangle of the source `image` to draw into the destination context. Use the 3- or 5-argument syntax to omit this argument.
sw|`number`|yes|The width of the sub-rectangle of the source `image` to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by `sx` and `sy` to the bottom-right corner of the image is used. Use the 3- or 5-argument syntax to omit this argument.
sh|`number`|yes|The height of the sub-rectangle of the source `image` to draw into the destination context. Use the 3- or 5-argument syntax to omit this argument.

<details>
<summary>Source Code</summary>

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

File size information.

Prop|Types|Required|Description
:--|:--|:--|:--
text|`string`|yes|File size as a string, `1.23MiB` etc.
unit|`string`|yes|Unit of file size, `MiB` etc.
value|`number`|yes|The size of the file as a suitable number, without units, `1.23` etc.
bytes|`number`|yes|What is the size of the image in bytes.

<details>
<summary>Source Code</summary>

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

An options of the [handleVideoFile](#handlevideofilefile-options) function.

Prop|Types|Required|Description
:--|:--|:--|:--
enableDevicePixelRatio|`boolean`|no|Whether to enable the device pixel ratio, when 2 times, the size of the returned image is x2. Default is `false`.
mimeType|`string`|no|Multipurpose Internet Mail Extensions. Default is `image/jpeg`. https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
isForce|`boolean`|no|When the image width or height is less than the set value, force the target image width or height to be adjusted to the set value. Default is `false`.
perResize|`number`|no|Reduce the width each time. To prevent jagged edges when scaling an image. Default is `500`.
quality|`number`|no|A Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp. If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored. See [toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL). Default is `0.9`.
width|`number`|no|The `width` of the processed image. Default is `0`.
height|`number`|no|The `height` of the processed image. Default is `0`.
longestSide|`number`|no|The size of the longest side. Valid when width and height are `0`. Default is `0`.
cropInfo|`OptionsCropInfo`|no|See [OptionsCropInfo](#OptionsCropInfo).
currentTime|`number`|no|The `HTMLMediaElement` interface's `currentTime` property specifies the current playback time in seconds. If it is longer than the video duration, the last frame will be captured. The default is a `random` timestamp in the video duration.

<details>
<summary>Source Code</summary>

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

Data returned of the [handleVideoFile](#handlevideofilefile-options) function.

Prop|Types|Required|Description
:--|:--|:--|:--
blob|`Blob`|yes|Image blob data.
data|`string`|yes|Image base64 data.
width|`number`|yes|The width of the image.
height|`number`|yes|The height of the image.
type|`string`|yes|The type of the image.
size|`SizeInfo`|yes|The size information of the image. See [SizeInfo](#SizeInfo).
url|`string`|yes|A blob url of the image.
element|`HTMLImageElement`/`HTMLCanvasElement`|yes|`HTMLImageElement` or `HTMLCanvasElement`.
raw|`MediaFileHandlerRawData`|yes|Raw information of the image file being processed. See [MediaFileHandlerRawData].(#MediaFileHandlerRawData).
videoInfo|`VideoInfo`|yes|When taking a screenshot of the video, the original video file information. See [VideoInfo](#VideoInfo).

<details>
<summary>Source Code</summary>

```ts
interface VideoHandlerResult extends ImageHandlerResult {
  // When taking a screenshot of the video, the original video file information.
  // See [VideoInfo](#VideoInfo).
  videoInfo: VideoInfo
}
```

</details>

### VideoInfo

The original video file information.

Prop|Types|Required|Description
:--|:--|:--|:--
url|`string`|yes|A blob url of the video file.
videoFile|`File`|yes|The video file object.
videoWidth|`number`|yes|The width of the video.
videoHeight|`number`|yes|The height of the video.
duration|`number`|yes|The duration of the video.
currentTime|`number`|yes|The time point of the video screenshot.

<details>
<summary>Source Code</summary>

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

## Other methods

These methods's documentation see https://github.com/capricorncd/zx-sml

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
