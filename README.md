# image-process-tools

Image pre processing for upload (html5 + canvas), ie10+

解决图片上传前裁剪、等比缩放等。

* 裁剪图片：同时设置参数width, height

* 等比缩放：按宽度缩放，只设置width; 同理按高度缩放，只需设置height

* 不裁剪、不缩放，直接返回源文件base64数据

## npm

```
npm install image-process --save-dev
```

## 使用方法

ES6+

```
import { ZxImageProcess } from 'image-process'

const zxImageProcess = new ZxImageProcess({
    // 触发文件选择的元素
    selector: '#buttonId',
    // 限制宽度等比缩放，则只需设置width值
    // 限制高度等比缩放，则只需设置height值
    // 同时设置了width、height值，则会对图片按尺寸裁剪
    width: 600,
    height: 400,
    success: function (result) {
      // 返回数据
      console.log(result);
    },
    error: function (err) {
      console.error(err);
    }
  })
```

browser

```html
<script src="./dist/image-process-tools.min.js"></script>
```

## 使用效果

https://capricorncd.github.io/image-process-tools/dist

## Options 参数

* selector: `#buttonId` 选择图片按钮id，支持id、class选择器，或者`HTMLElement`对象

* width: `640` 裁剪或缩放宽度为640px(可选)

  > 1.限制宽度缩放，则只需设置width值。

  > 2.限制高度缩放，则只需设置height值。

  > 3.同时设置了width、height值，则会对图片按尺寸裁剪

* height: `640` 裁剪或缩放高度为640px(可选)

* success: `function(result){ console.log(result) }` 图片处理完成后的回调函数

  > base64: `base64` 图片base64数据

  > data: `blobData`  处理成功的图片数据，可直接上传至服务器，或赋值给input利用form表单提交。

  > element: `canvas` canvas节点对象

  > height: `640`  处理完成的图片宽度

  > width: `640` 处理完成的图片宽度

  > rawdata: `Object` 原图片相关属性(宽高/文件大小/Base64编码数据/类型/元素节点)

  > size: `21100` 处理完成的图片文件大小

  > type: `image/png`  处理完成的图片类型

* error: `function(err){ alert(err.msg); }` 处理过程中的错误或警告回调函数

## 方法

- blobToUrl(file|blob) 文件数据转blob url

- conversion(size) 将size单位B转换为KB或M(大于1024KB则返回M)

- fileToBase64(file) 文件数据转base64。返回Promise对象实例

- handle(file) 文件处理。处理参数为初始化`ZxImageProcess`时传入的参数。通过初始化参数`success`返回处理结果。

- reCrop() 重新显示图片裁剪窗口，重新调整裁剪图片

- toBlobData(base64) base64数据转为blob文件数据

## Error

|code|说明|
|:--:|:--|
|1|初始化参数`selector`不合法，非有效字符串|
|2|未获取到body元素|
|3|未获取到`selector`对应DOM元素|
|4|未选中任何文件|
|5|调用方法`reCrop()`时，未获取到之前的文件数据|
|6|调用方法`fileToBase64(file)`时，file类型不合法|
|7|处理的file非图片文件|
|8|读取file文件数据出错|
|9|被裁剪的图片尺寸，小于设置尺寸|
|10|`toBlobData(data)`，data非base64数据|
|11|预加载图片数据出错|

## Copyright and license

Code and documentation copyright 2018. capricorncd. Code released under the MIT License.
