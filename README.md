image-process-tools
====
Image pre processing for upload (html5 + canvas)

> 解决图片上传前缩放到一定比例自动居中裁剪、等比缩放等。后期版本应该会加入手动设置裁剪位置及缩放比例。  

> 处理完成后，将返回处理完成的数据，及原图片文件的大小、宽度、高度和Base64数据。(详见参数说明)

> 非图片文件将不做处理，返回文件数据data(name, lastModified, lastModifiedDate, size, type)等信息

## 使用方法

```html
<div id="imgWrapper">
	<!-- 图片预览容器 -->
</div>
<div>
	<button id="buttonId">选择图片</button>
</div>

<script src="../build/image-process-tools.min.js"></script>

<script>
	var imgTools = new IPTS({
		// 选择按钮id
		elm: 'buttonId',
		// 图片预览容器 id,容器height!=0
		target: 'imgWrapper',
		// 是否裁剪图片。为true时，必须同时设置width、height值大于0
		crop: true,
		// 缩放宽高
		width: 640,
		height: 640,
		// 处理后图片的格式，支持jpg、png格式
		// type: 'jpg',
		// 处理完成回调函数
		success: function (result) {
		
			// 所有返回参数
		    console.log(result);
			
			if (result.code === 0) {
                console.log('裁剪或压缩后的图片数据:');
                console.log(result.data);
                console.log('处理后图片文件大小为：' + imgTools.conversion(result.size));

                console.log('原图片数据:');
                console.log(result.rawdata);
                console.log('原图片文件大小为：' + imgTools.conversion(result.rawdata.size));
			}
			
			/**
			 * result.data //待上传的图像数据
			 * 可将result.data写入input[value]，利用form表单上传
			 * 或直接通过如腾讯云接口直接上传，如下：
			 */
			/**
			 * 腾讯云上传实例，详见腾讯云文件上传文档
			 * https://www.qcloud.com/document/product/436/8095
			 */
			
		},
		// 处理过程中的错误提示
		error: function (err) {
			console.warn(err.msg);
		}
	});
</script>

```

## Vue.js 2.0中使用

> 需异步初始化

```html
<script type="text/ecmascript-6">
  // 文件路径，根据自己的文件修改
  import IPTS from './path/image-process-tools.min';

  export default {
    data () {
      return {
        // 待上传的文件数据
        uploadData: null
      }
    },
    created () {
      this.$nextTick(() => {
        this.initUploadData();
      });
    },
    methods: {

      // 图片选择按钮方法@click="selectImage"
      selectImage () {
        // 模拟 selectorFileBtn 被点击
        let btn = document.getElementById('selectorFileBtn');
        // 模拟input点击事件
        let evt = new MouseEvent("click", {
          bubbles: false,
          cancelable: true,
          view: window
        });
        btn.dispatchEvent(evt);

        return false;
      },


      // 初始化上传数据
      initUploadData () {

        let vm = this;
        
        let imgTools = new IPTS({
        	elm: 'selectorFileBtn',
		    target: 'imgWrapper',
		    crop: true,
		    width: 640,
		    height: 640,
		    success: (res) => {
			    // 存储数据，方便上传时读取
	            vm.uploadData = res.data;
		    },
		    error: (err) => {
		    	console.warn(err.msg);
		    }
        });
        
      }

    }
  }
</script>
```

修改后的文件生成，并压缩：

```bash
npm run build
```

## 使用效果图

> ![github](http://img.mukewang.com/58c77dbb00017d1d06950446.jpg "github")

---

> ![github](http://img.mukewang.com/58c77dd3000158b906950446.jpg "github")

## Options 参数

* elm: `buttonId` 选择图片按钮id(必须)

* target: `imgWrapper` 图片预览容器id(可选)

* crop: `true` 是否裁剪图片(可选)
	
> 为true时，必须同时设置width、height值大于0
	
> 裁剪规则: 图片缩放到一定比列(即一边等于设置值，另一边超出设置值部分裁去)，居中裁剪

* width: `640` 裁剪或缩放宽度为640px(可选)

> 不配置crop，或crop为false时，则为缩放尺寸。

> 1.限制宽度缩放，则只需设置width值。

> 2.限制高度缩放，则只需设置height值。

> 3.若crop为false，同时设置了width/height值，则只按width缩放，忽略height

* height: `640` 裁剪或缩放高度为640px(可选)

* type: `jpg` 上传图片目标格式,默认jpg/png(可选)

> 1.不配置此项，则保留原图片格式(bmp文件会转换成jpg, gif会转换为png)。

> 2.配置后，将所有格式图片转换为配置格式。

> 3.可选值'jpg', 'png'。

> 4.HTMLCanvasElement.toDataURL()不支持'gif', 'bmp'，均输出'png'格式

* success: `function(result){ console.log(result) }` 图片处理完成后的回调函数

> code: `0`  成功代码  

> data: `blobData`  处理成功的图片数据，可直接上传至服务器，或赋值给input利用form表单提交。

> element: `canvas` canvas节点对象

> msg: `success` 成功消息  

> width: `640` 处理完成的图片宽度

> height: `640`  处理完成的图片宽度  

> size: `21100` 处理完成的图片文件大小

> type: `image/png`  处理完成的图片类型

> rawdata: `Object` 原图片相关属性(宽高/文件大小/Base64编码数据/类型/元素节点)

>  > data: `base64Data`, 原图片base64格式数据  
>  > element: `image`, 原图片接到对象  
>  > height: `1200`, 原图片高度   
>  > size: `215444`, 原图片文件大小   
>  > type: `image/png`, 原图片格式  
>  > width: `2000` 原图片宽度    

* error: `function(err){ alert(err.msg); }` 处理过程中的错误或警告回调函数

## 部分接口

* conversion(size) // 将size单位B转换为KB或M(大于1024KB则返回M)

* getFileSuffix(fileName) // 获取文件后缀名

* isImage(fileName) // 判断文件是否为图片格式

* toBlobData(Base64Data, type) // 将图片base64数据转换为blob可上传的数据; type可选,默认与Base64Data类型相同,支持类型`image/png`, `image/jpeg`

## 返回code说明

#### 成功code

| code | msg |
| :---: | --- |
| 0 | 成功，程序正常完成整套流程，并返回最终结果 |
| 1 | 选中的文件非图片文件，返回选中文件数据data |

#### 错误code

| code | msg |
| :---: | --- |
| 1 | 配置参数未配置或有误 |
| 2 | 配置图片选择按钮id |
| 3 | 浏览器不支持addEventListener() |
| 4 | 浏览器不支持FileReader接口，需升级或更换高版本的浏览器 |
| 5 | 未选中文件 |
| 6 | 选中的文件不是图片文件 |
| 7 | 文件读取错误 |
| 8 | 图片数据加载错误 |
| 9 | 当前图片文件尺寸小于裁剪尺寸 |
