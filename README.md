# image-process-tools

Image pre processing for upload (html5 + canvas), ie10+

解决图片上传前裁剪、等比缩放，压缩，支持本地视频、同域视频文件截图功能等。

* 裁剪图片：同时设置参数width, height

* 等比缩放：按宽度缩放，只设置width; 同理按高度缩放，只需设置height

* 不裁剪、不缩放，直接返回源文件base64数据

* 视频截图返回数据中含有字段`videoFile`, `videoWidth`, `videoHeight`, `duration`。其他参数为截图参数

## npm

```
npm install image-process --save-dev
```

## 使用方法

#### ES6+

```
import { ZxImageProcess } from 'image-process'

const zxImageProcess = new ZxImageProcess({
    // 默认为空，图片和视频文件，前提是浏览器支持input[accept=]
    accept: 'video/*',
    // 自动裁剪
    auto: false,
    // 触发文件选择的元素
    selector: '#buttonId',
    // 限制宽度等比缩放，则只需设置width值
    // 限制高度等比缩放，则只需设置height值
    // 同时设置了width、height值，则会对图片按尺寸裁剪
    width: 600,
    height: 400,
    // 裁剪按钮名称
    submitText: '确 定',
    // 裁剪容器按钮样式
    submitStyle： '',
    cancelStyle: 'color: red',
    // 旋转按钮名称
    rotateText: '旋转90度',
    // 最大文件限制
    maxSize: 50,
    success: function (result) {
      // 返回数据
      console.log(result);
    },
    error: function (err) {
      console.error(err);
    }
  })
```

#### 不实例化

不实例化ZxImageProcess，直接使用期内部方法`handleMediaFile(file, options)`，返回`promise对象`

```
import { handleMediaFile } from 'image-process'

const options = {
  // 默认为空，图片和视频文件，前提是浏览器支持input[accept=]
  accept: 'video/*',
  // 自动裁剪
  auto: false,
  width: 600,
  height: 400,
  // 文件大小限制50M
  maxSize: 50
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
<script src="./dist/image-process-tools.min.js"></script>
```

## 使用效果

https://capricorncd.github.io/image-process-tools/dist

## Options 参数

* auto `true|false` 自动处理图片，裁剪时不弹出手动位置调整框。默认为false。

* selector: `#buttonId` 选择图片按钮id，支持id、class选择器，或者`HTMLElement`对象（仅ZxImageProcess实例化时有效）

* width: `640` 裁剪或缩放宽度为640px(可选)

  > 1.限制宽度缩放，则只需设置width值。

  > 2.限制高度缩放，则只需设置height值。

  > 3.同时设置了width、height值，则会对图片按尺寸裁剪

* height: `640` 裁剪或缩放高度为640px(可选)

* maxSize: `50` 文件大小最大限制，单位M（兆）。默认50M

* success: `function(result){ console.log(result) }` 图片处理完成后的回调函数（仅ZxImageProcess实例化时有效）

  > base64: `base64` 图片base64数据

  > blob: `blobData`  处理成功的图片数据，可直接上传至服务器，或赋值给input利用form表单提交。

  > element: `canvas` canvas节点对象

  > height: `640`  处理完成的图片宽度

  > width: `640` 处理完成的图片宽度

  > url: `blob:url`

  > raw: `Object` 原图片相关属性(宽高/文件大小/Base64编码数据/类型/元素节点)

  > size: `21100` 处理完成的图片文件大小

  > type: `image/png`  处理完成的图片类型

* error: `function(err){ alert(err.message); }` 处理过程中的错误或警告回调函数（仅ZxImageProcess实例化时有效）

* submitText '确 定' 裁剪框`确定`按钮名称

* rotateText: '旋转90度' 裁剪框`旋转90度`按钮名称

* submitStyle: `color: #f00` 裁剪框确认按钮样式（仅ZxImageProcess实例化时有效）

* cancelStyle: `color: #f00` 裁剪框取消按钮样式（仅ZxImageProcess实例化时有效）

## 方法

- conversion(size) 将size单位B转换为KB或M(大于1024KB则返回M)

- toBlobData(base64) base64转blob

- toBlobUrl(file|blob) 文件数据转blob url

- reCrop() 重新显示图片裁剪窗口，重新调整裁剪图片

## Error

|code|message说明|
|:--:|:--|
|1|初始化参数`selector`不合法，非有效字符串或DOM元素|
|2|未获取到body元素|
|3|未获取到`selector`对应DOM元素|
|4|未选中任何文件|
|5|调用方法`reCrop()`时，未获取到之前的文件数据|
|7|处理的file非图片或视频文件|
|8|读取file文件数据出错|
|11|预加载图片数据出错|
|12|文件太大，超过了最大限制|
|13|视频截图失败，视频资源可能不在同域中|
|21|图片手动裁剪，设置预览图片src失败|
|22|用户取消了裁剪位置设置|

## Copyright and license

Code and documentation copyright 2018. capricorncd. Code released under the MIT License.
