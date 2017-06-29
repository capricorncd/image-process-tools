/** Create by capricorncd 2017-05-26 */
'use strict';

/**
 * 实现功能：
 * 1.点击图片选择按钮,选择上传文件(这里需模拟input[type="fiel"]点击事件)
 * 2.图片数据转换html5 FileReader接口
 * 3.图片预览或Canvas处理(等比缩放、自动裁剪、手动裁剪)
 * 4.转换为可上传文件数据canvas.toDataURL('image/jpeg')
 * 5.转换为blob数据: new Blob([ia], {type:"image/jpeg"}), 并返回
 */

// 图片文件类型
var TYPE = {
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	// HTMLCanvasElement.toDataURL() 只支持jpeg、png
	// gif: 'image/gif',
	// bmp: 'image/bmp'
	gif: 'image/png',
	bmp: 'image/jpeg'
}

/**
 * 图片上传预处理
 * IPTS: imageProcessTools
 * @param {Object} options 配置数据
 * @param {Object} options.success.data 处理成功后的文件数据
 */
function IPTS(options) {
	
	var me = this;
	
	// 配置参数
	if (!options instanceof Object) {
		options.error && options.error({
			code: 1,
			msg: '配置参数未配置或有误！'
		});
		alert('配置参数未配置或有误！');
		return false;
	}
	
	this.options = options;
	
	var elm = null, // 按钮id
		wrapper = null, // 图片预览容器id
		crop = false,
		scaleWidth = 0, scaleHeight = 0, // 目标图尺寸
		type = null; // 输出文件类型不限制，同原文件为准
	
	// 按钮id
	if (options.elm) {
		elm = options.elm;
	} else {
		options.error && options.error({
			code: 1,
			msg: '请配置图片选择按钮id！'
		});
		alert('请配置图片选择按钮id！');
		return false;
	}
	
	// 显示图片目标div的id
	if (options.target) {
		wrapper = options.target;
	}
	
	// 是否有设置裁剪图片
	if (options.crop) {
		crop = true;
	}
	
	// 图片缩放尺寸
	// 目标图片宽度
	if (options.width) {
		scaleWidth = parseInt(options.width);
		scaleWidth = isNaN(scaleWidth) ? 0 : scaleWidth;
	}
	
	// 目标图片高度
	if (options.height) {
		scaleHeight = parseInt(options.height);
		scaleHeight = isNaN(scaleHeight) ? 0 : scaleHeight;
	}
	
	// 输出图片类型
	if (options.type) {
		if (TYPE[options.type]) {
			// 转换格式 'image/图片类型'
			type = TYPE[options.type];
		}
	}
	
	// input[type="file"] id
	var inputId = 'IPTS_' + new Date().getTime();
	
	// 将input节点添加至按钮后面
	this.createFileInput(elm, inputId);
	
	// 读取图片文件数据
	// 并显示在指定wrapper内
	// 将图片写入容器
	this.readImageFileData(inputId, function (img) {
		
		var params = {
			isCrop: crop,
			width: scaleWidth,
			height: scaleHeight,
			// wrapper: wrapper,
			type: type
		}
		
		me.resize(img, params, function (res) {
			
			// 是否在wrapper容器内显示处理后的图片
			if (wrapper) {
				$(wrapper).innerHTML = '';
				$(wrapper).appendChild(res.node);
			}
						
			options.success && options.success({
				code: 0,
				data: me.toBlobData(res.data, res.type)
			});
			
		});
		
	});

};

/**
 * 创建input[type="file"]
 * @param {Object} elm 按钮元素节点
 * @param {String} inputId input[type="file"] id
 * return input元素节点
 */
IPTS.prototype.createFileInput = function (elm, inputId) {
	var btnNode = $(elm);
	// 创建input节点
	var input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.style.display = 'none';
		input.id = inputId;
		
	btnNode.parentNode.appendChild(input);
	
	// 选择上传文件
	this.selectFile(btnNode, input);
}

/**
 * 模拟input[type="file"]点击事件
 * @param {Object} btnNode 按钮元素节点
 * @param {Object} inputNode input[type="file"]节点
 */
IPTS.prototype.selectFile = function (btnNode, inputNode) {
    	
    if (btnNode.addEventListener) {
		btnNode.addEventListener('click', function (e) {
			// 模拟input点击事件
			var evt = new MouseEvent("click", {
				bubbles: false,
				cancelable: true,
				view: window
			});
			inputNode.dispatchEvent(evt);
		}, false);
	} else {
		options.error && options.error({
			code: 1,
			msg: '您的浏览器不支持addEventListener！'
		});
		alert('您的浏览器不支持addEventListener！');
		return false;
	}
    
}

/**
 * 读取本地文件并渲染视图
 * @param {String} inputId input[type="file"]的id
 * @param {Object} callback 返回img及文件名称对象
 */
IPTS.prototype.readImageFileData = function (inputId, callback) {

	var me = this;
	
	if (typeof FileReader === undefined ) {
		alert('您的浏览器不支持FileReader接口！\n请升级或更换高版本浏览器！');
		return false;
	}
	
	if ($(inputId).addEventListener) {
		$(inputId).addEventListener('change', function (e) {
			// 选中的图片文件
			var file = e.target.files[0];
			
			if (!file) {
				console.log('未选中文件！');
				return false;
			}

			// 判断文件类型
			if (!me.isImage(file.name)) {
                me.options.error && me.options.error({
                    code: 1,
                    msg: '只支持图片文件，请重新选择'
                });
				return;
			}
			
			// 实例化FileReader
			var read = new FileReader();
			var img = new Image();
			
			read.readAsDataURL(file);
			read.onload = function (e) {
				img.src = e.target.result;
				img.setAttribute('alt', file.name);
				callback(img);
			}

			read.onerror = function (e) {
                me.options.error && me.options.error({
                    code: 1,
                    msg: '文件读取错误'
                });
            }
	
		}, false);
	} else {
		alert('浏览器版本过低！');
		return false;
	}
	
}

/**
 * 等比缩放图片
 * @param {Object} img 图片元素节点
 * @param {Object} toSize 目标尺寸对象
 * @param {Object} callback 回调canvas.toDataURL('image/jpeg')数据
 */
IPTS.prototype.resize = function (img, params, callback) {
	
	var me = this;
	
	var IS_OVERTIME = true;
	
	if (!params instanceof Object) {
		this.options.error && this.options.error({
			code: 1,
			msg: 'resize(img, params, callback)参数错误！'
		});
		return false;
	}

	img.onload = function (e) {
		
		IS_OVERTIME = false;
		
		// 图片原始尺寸,文件名称
		var iw = img.width,
			ih = img.height;
		
		// 追加属性
		params.iw = iw;
		params.ih = ih;
		
		// 文件类型
		var dataType = '';
		
		if (params.type) {
			dataType = params.type;
		} else {
			// 获取文件后缀
			var suf = me.getFileSuffix(img.alt);
			if (TYPE[suf]) {
				dataType = TYPE[suf];
			} else {
				dataType = 'image/jpeg';
			}
		}
		
		// 如果图片尺寸与设置尺寸相同时，则不从小计算及canvas渲染
		if (iw === params.width && ih === params.height) {
			callback({
				code: 0,
				msg: 'img尺寸与裁剪目标尺寸相同',
				node: img,
				data: img.src,
				type: dataType
			});
			return false;
		}
		
		// 图片缩放或裁剪位置、尺寸计算
		var res = me.calculateNewData(params);
			
		// 创建canvas图片容器		
		var canvas = document.createElement('canvas');
			canvas.width = res.cw;
			canvas.height = res.ch;
			
		var ctx = canvas.getContext('2d');
			ctx.drawImage(img, res.sx, res.sy, res.sw, res.sh, 0, 0, res.cw, res.ch);
		
		var data = canvas.toDataURL(dataType);

		callback({
			code: 0,
			msg: 'success',
			node: canvas,
			data: data,
			type: dataType
		});
		
	}

    img.onerror = function (e) {
        me.options.error && me.options.error({
            code: 1,
            msg: '图片数据加载错误'
        });
    }
	
	// 超时操作
	var timer = setTimeout(function() {
		if (IS_OVERTIME) {			
			me.options.error && me.options.error({
				code: 1,
				msg: 'resize()超时, img.onload()未执行！',
				node: img,
				data: null,
				type: null
			});
		}
		clearTimeout(timer);
	}, 5000);
	
}

/**
 * 计算生成新图片的尺寸
 * @param {Object} params
 * @param {Object} callback 生成图片尺寸、坐标数据
 */
IPTS.prototype.calculateNewData = function (params) {
	
//	console.log(params);
	
	// 是否裁剪图片
	var IS_CROP = params.isCrop;
	
	// 缩放比列
	var ratio = 1;
	
	// 设置的宽高
	var a = params.width,
		b = params.height,
		iw = params.iw,
		ih = params.ih;
		
	// 图片开始裁剪位置
	var sx = 0,
		sy = 0;
	// canvas 尺寸
	var cw = iw,
		ch = ih;
	
	// 裁剪图片代码 **********************************
	// 等比缩放到合适大小，在居中裁剪
	if (IS_CROP && a > 0 && b > 0) {
		// canvas的尺寸即为裁剪设置尺寸
		cw = a;
		ch = b;
		
		// 等比缩放后的图片尺寸
		var sw, sh;
		
		// 先调整图片尺寸：图片宽度 === 裁剪框宽
		sw = a;
		sh = Math.floor(a*ih/iw);
		
		ratio = this._ratio(iw, a);
		
		// 图片高度超出裁剪框，能正常裁剪
		if (sh > b) {
			sx = 0;
			sy = parseInt((sh - b)/2*ratio);
		}
		// 不满足裁剪需求，需重新缩放图片高度至裁剪框高度
		else {
			sw = Math.floor(b*iw/ih);
			sh = b;
			sx = parseInt((sw - a)/2*ratio);
			sy = 0;
			ratio = this._ratio(ih, b);
		}
		
	}
	// 缩放图片代码 **********************************
	// 只设置了宽度
	else if (a > 0) {
		cw = a;
		ch = Math.floor(a*ih/iw);
		ratio = this._ratio(iw, a);
	}
	// 只设置了宽度
	else if (b > 0) {
		cw = Math.floor(b*iw/ih);
		ch = b;
		ratio = this._ratio(ih, b);
	}
	// 不处理图片
	// if (a === 0 && b === 0) 
	else {
		cw = iw;
		ch = ih;
	};
	
	return {
		sx: sx,
		sy: sy,
		sw: parseInt(cw*ratio),
		sh: parseInt(ch*ratio),
		cw: cw,
		ch: ch
	};
}

/**
 * 缩放比列
 * @param {Number} numerator 分子
 * @param {Number} denominator 分母
 */
IPTS.prototype._ratio = function (numerator, denominator) {
	return parseInt(numerator/denominator*10000)/10000;
}

/**
 * 将数据转换为可上传用数据
 * @param {String} data
 * @param {String} type 生成文件类型  
 * @return blob数据
 */
IPTS.prototype.toBlobData = function (data, type) {	
	// 获取base64数据
	data = data.split(',')[1];
	
	data = window.atob(data);
	
	var ia = new Uint8Array(data.length);
	for (var i = 0; i < data.length; i++) {
	    ia[i] = data.charCodeAt(i);
	};
	
	// canvas.toDataURL 返回的默认格式是 image/png
	var blob = new Blob([ia], {type: type});
	
	return blob;
};

/**
 * 判断文件是否为图片格式
 * @param file
 * @return {boolean}
 */
IPTS.prototype.isImage = function (file) {
	// 图片类型
    var imageType = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'];
    // 文件后缀
    var suf = this.getFileSuffix(file);

    if (imageType.join(',').indexOf(suf) > -1) {
        return true;
    }
	return false;
};


/**
 * 获取id为id的元素节点
 * @param {String} id 元素id
 */
function $(id) {
	return document.getElementById(id);
}

/**
 * 获取文件后缀名
 * @param {String} fileName 文件名称(带后缀的)
 */
IPTS.prototype.getFileSuffix = function (fileName) {
	return fileName.toString().split('.').pop().toLowerCase();
}

module.exports = IPTS;
