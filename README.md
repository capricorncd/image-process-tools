# image-process

<p align="left">
  <a href="https://npmcharts.com/compare/image-process?minimal=true"><img src="https://img.shields.io/npm/dm/image-process.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/image-process"><img src="https://img.shields.io/npm/v/image-process.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/image-process"><img src="https://img.shields.io/npm/l/image-process.svg?sanitize=true" alt="License"></a>
</p>

Image clipping / scaling, support local / same domain video file screenshot function (HTML5 + canvas). 

[中文文档](./docs)

* Image cropping: Just set valid cropping parameters. or set valid width and height, the image will be centered and cropped.

* Proportional scaling: set width or height.

* Video screenshot: Take a picture according to the set currentTime.

https://capricorncd.github.io/image-process-tools/demo

## Usage

#### npm

```bash
npm install image-process
```

#### yarn

```bash
yarn add image-process
```

## Methods

### handleMediaFile(file, options)

- @param: file `File | Blob` Image or Video file.

- @param: options `MediaFileHandlerOptions`

- @returns: `Promise<MediaFileHandlerData>`

```javascript
import { handleMediaFile } from 'image-process'

const options = {
  mimeType: 'image/jpeg',
  width: 600,
  height: 400,
  quality: 0.8
}

// Image crop or video screenshot
handleMediaFile(file, options)
  .then(res => {
    console.log(res)
  })
  .catch (err => {
    console.error(err)
  })
```

umd

```html
<script src="./dist/image-process.umd.js"></script>

imageProcess.handleMediaFile(file, options)
```

### handleImageFile(file, options)

- @param: file `File | Blob | string` Image, Image Blob or Image base64 string.

- @param: options `MediaFileHandlerOptions`

- @returns: `Promise<MediaFileHandlerData>`

### handleVideoFile(file, options)

- @param: file `File | Blob` Video, Video Blob.

- @param: options `MediaFileHandlerOptions`

- @returns: `Promise<MediaFileHandlerData>`


## Options: MediaFileHandlerOptions

|Name|Type|Default|Description|
|:--|:--|:--|:--|
|width|`number`|`0`|target width for image cropping|
|height|`number`|`0`|target height for image cropping|
|longestSide|`number`|`0`|target long side width for image cropping, invalid when width or height is set.|
|isForce|`boolean`|`false`|force enlargement or cropping, when the image is smaller than the target size|
|enableDevicePixelRatio|`boolean`|`false`|Whether to enable the device pixel ratio, when 2 times, the size of the returned image is x2|
|mimeType|`string`|`image/jpeg`|return data file type|
|perResize|`number`|`500`|Reduce the width each time. To prevent jagged edges when scaling an image|
|quality|`number`|`0.9`|A `Number` between `0` and `1` indicating the image quality to be used when creating images using file formats that support lossy compression (such as `image/jpeg` or `image/webp`). |
|cropInfo|`object`|`undefined`|`OptionsCropInfo`|
|*currentTime|`number`|`undefined`|The `HTMLMediaElement` interface's `currentTime` property specifies the current playback time in seconds. If it is longer than the video duration, the last frame will be captured|

<details>
  <summary>Default Options</summary>

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

### cropInfo: OptionsCropInfo

|Name|Type|Description|
|:--|:--|:--|
|sx|`number`|The `x-axis` coordinate of the top left corner of the sub-rectangle of the source `image` to draw into the destination context.|
|sy|`number`|The `y-axis` coordinate of the top left corner of the sub-rectangle of the source `image` to draw into the destination context.|
|sw|`number`|The `width` of the sub-rectangle of the source `image` to draw into the destination context.|
|sh|`number`|The `height` of the sub-rectangle of the source `image` to draw into the destination context.|

> It will be ignored when the value is invalid.

![canvas-drawimage](./docs/canvas-drawimage.jpg)

## Returns

`MediaFileHandlerData`

|Name|Type|Description|
|:--|:--|:--|
|data| `string` | base64 image data |
|blob| `Blob` | The processed image data can be directly uploaded to the server, or assigned to input and submitted using form |
|element| `HTMLImageElement`/`HTMLCanvasElement` | `canvas` or `image` element |
|width| `number`  | The width of the processed image |
|height| `number`  | The height of the processed image |
|url| `string` | `blob:url` |
|size| `object` | Processed image file size, `{text: '66.32KiB', value: 66.32, unit: 'KiB', bytes: 67911}`|
|type| `string` | etc. `image/jpeg`|
|raw| `MediaFileHandlerRawData` | Original image related attributes (width and height/file size/Base64 encoded data/type/element node) |
|videoInfo| `VideoInfo` | video information |

VideoInfo

```ts
{
  "videoInfo": {
    "videoFile": File,
    "videoWidth": 1920, 
    "videoHeight": 804,
    "duration": 107.477,
    "currentTime": 84.77857628097256
  },
  ...
}
```

## Other methods

```js
import {
  fileToBase64,
  createElement,
  formatBytes,
  splitBase64,
  createBlobURL,
  base64ToBlob
} from 'image-process'
```

[zx-sml docs](https://github.com/capricorncd/zx-sml)

## Copyright and license

Code and documentation copyright 2018-Present. [Capricorncd](https://github.com/capricorncd). Code released under the MIT License.
