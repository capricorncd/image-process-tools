(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["IPTS"] = factory();
	else
		root["IPTS"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** Create by capricorncd 2017-05-26 */


/**
 * 实现功能：
 * 1.点击图片选择按钮,选择上传文件(这里需模拟input[type="fiel"]点击事件)
 * 2.图片数据转换html5 FileReader接口
 * 3.图片预览或Canvas处理(等比缩放、自动裁剪、手动裁剪)
 * 4.转换为可上传文件数据canvas.toDataURL('image/jpeg')
 * 5.转换为blob数据: new Blob([ia], {type:"image/jpeg"}), 并返回
 */

// 图片文件类型
var TYPES = {
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	webp: 'image/jaeg',
	// HTMLCanvasElement.toDataURL() 只支持jpeg、png
	// gif: 'image/gif',
	// bmp: 'image/bmp'
	gif: 'image/png',
	bmp: 'image/jpeg'
};

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
		return false;
	}
	
	// 按钮id
	if (!options.elm || typeof options.elm !== 'string') {
		options.error && options.error({
			code: 1,
			msg: '请配置图片选择按钮id！'
		});
		return false;
	}

    this.options = options;
	
	// input[type="file"] id
	var inputTempId = 'IPTS_' + Date.parse(new Date());
	
	// 将input节点添加至按钮后面
	this._createFileInput(options.elm, inputTempId);
	
	// 读取图片文件数据
	// 并显示在指定wrapper内
	// 将图片写入容器
	this.readImageFileData(inputTempId, function (imageInfo) {

		// 获取裁剪后的图像数据
		me.getCropImageData(imageInfo, function (result) {
			// 是否在targetWrapper容器内显示处理后的图片(canvas)
			var targetWrapper = options.target;
            if (targetWrapper) {
                $(targetWrapper).innerHTML = '';
                $(targetWrapper).appendChild(result.element);
            }

            // 返回处理完成的数据
            options.success && options.success(result);
        });

	});

};


var fn = IPTS.prototype;

/**
 * 创建input[type="file"]
 * @param {Object} elm 按钮元素节点
 * @param {String} inputId input[type="file"] id
 * return input元素节点
 */
fn._createFileInput = function (elm, inputId) {
	var btnNode = $(elm);
	// 创建input节点
	var input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.style.display = 'none';
		input.id = inputId;
		
	btnNode.parentNode.appendChild(input);

	// 选择上传文件
	this._selectFile(btnNode, input);
}

/**
 * 模拟input[type="file"]点击事件
 * @param {Object} btnNode 按钮元素节点
 * @param {Object} inputNode input[type="file"]节点
 */
fn._selectFile = function (btnNode, inputNode) {
    	
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
		this.options.error && this.options.error({
			code: 1,
			msg: '您的浏览器不支持addEventListener！'
		});
	}
};

/**
 * 读取本地文件并渲染视图
 * @param {String} inputTempId input[type="file"]的id
 * @param {Object} callback 返回img及文件名称对象
 */
fn.readImageFileData = function (inputTempId, callback) {

	var me = this;
	
	if (typeof FileReader === 'undefined' ) {
		this.options.error && this.options.error({
			code: 1,
			msg: '您的浏览器不支持FileReader接口！\n请升级或更换高版本浏览器！'
		});
		return false;
	}

	// 监听input[type="file"]变化，读取文件数据
	if ($(inputTempId).addEventListener) {
		$(inputTempId).addEventListener('change', function (e) {
			// 选中的图片文件
			var file = e.target.files[0];
			
			if (!file) {
				me.options.error && me.options.error({
					code: 1,
					msg: '未选中文件'
				});
				return;
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
			var READ = new FileReader();
			var img = new Image();

			// readAsDataURL方法用于读取指定Blob或File的内容。
			// 当读操作完成，readyState变为DONE, loadend被触发，
			// 此时result属性包含数据：URL以base64编码的字符串表示文件的数据。
            READ.readAsDataURL(file);
            READ.onload = function (e) {

				img.src = e.target.result;
				img.setAttribute('alt', file.name);

				// 获取图片信息
                me._getImageInfo(img, function (imageInfo) {
                    callback && callback(imageInfo);
                });
			}

            READ.onerror = function (e) {
                me.options.error && me.options.error({
                    code: 1,
                    msg: '文件读取错误'
                });
            }
	
		}, false);
	} else {
        me.options.error && me.options.error({
			code: 1,
			msg: '浏览器版本过低，不支持addEventListener'
		});
		return false;
	}
	
};

/**
 * 获取图片信息
 * @param img image对象
 * @param callback
 * @private
 */
fn._getImageInfo = function (img, callback) {

	var me = this;

	// 加载图片
    img.onload = function (e) {

    	var data = img.src;

        callback && callback({
            element: img,
			width: img.width,
			height: img.height,
			type: me.getBase64Info(data).type,
			data: data,
			size: me.toBlobData(data).size
		});

    }

    img.onerror = function (e) {
        me.options.error && me.options.error({
            code: 1,
            msg: '图片数据加载错误'
        });
    }
};

/**
 * 获取裁剪后图片(canvas)数据
 * @param imageInfo
 * @param callback
 */
fn.getCropImageData = function (imageInfo, callback) {

    // 文件类型
	var setType = this.options.type ? this.options.type.toLowerCase() : null;
    var dataType = (setType && TYPES[setType]) ? TYPES[setType] : imageInfo.type;

    // 图片缩放或裁剪位置、尺寸计算
    var res = this._calculateNewData({
        width: imageInfo.width,
        height: imageInfo.height
	});

    // 创建canvas图片容器
    var canvas = document.createElement('canvas');
		canvas.width = res.cw;
		canvas.height = res.ch;

    var ctx = canvas.getContext('2d');
    	ctx.drawImage(imageInfo.element, res.sx, res.sy, res.sw, res.sh, 0, 0, res.cw, res.ch);

    var data = canvas.toDataURL(dataType);

    	data = this.toBlobData(data, dataType);

    callback({
        code: 0,
        msg: 'Completed',
        element: canvas,
        type: dataType,
		width: res.cw,
		height: res.ch,
		data: data,
		size: data.size,
        // 原始图片数据
        rawdata: imageInfo
    });

};

/**
 * 计算生成新图片的尺寸
 * @param {Object} params
 * @param {Object} callback 生成图片尺寸、坐标数据
 */
fn._calculateNewData = function (params) {

	var opts = this.options;

    // 原图尺寸
    var iw = params.width;
    var ih = params.height;

    // 目标图片尺寸
    var targetWidth = toNumber(opts.width);
    var targetHeight = toNumber(opts.height);

    // 提示：图片实际尺寸，小于目标尺寸
	if (iw < targetWidth || ih < targetHeight) {
		this.options.error && this.options.error({
			code: 2,
			msg: '当前图片文件尺寸小于裁剪尺寸'
		});
	}

    // 如果图片尺寸与设置尺寸相同时，则不需计算及canvas渲染
    // if (iw === targetWidth && ih === targetHeight) {
    //     return {
    //         sx: 0, // 裁剪起始位置x
    //         sy: 0, // 裁剪起始位置y
    //         sw: iw,
    //         sh: ih,
    //         cw: targetWidth,
    //         ch: targetHeight
    //     }
    // }

    // 是否对图片进行裁剪
    var IS_CROP = typeof opts.crop === 'boolean' ? opts.crop : false;
	
	// 缩放比列
	var ratio = 1;
		
	// 图片开始裁剪位置
	var sx = 0,
		sy = 0;
	// canvas 尺寸
	var cw = iw,
		ch = ih;

    // 等比缩放后的图片尺寸
    var sw = 0, sh = 0;
	
	// 裁剪图片代码 **********************************
	// 等比缩放到合适大小，在居中裁剪
	if (IS_CROP && targetWidth > 0 && targetHeight > 0) {
		// canvas的尺寸即为裁剪设置尺寸
		cw = targetWidth;
		ch = targetHeight;
		
		// 按目标宽度调整图片尺寸：图片宽度 === 裁剪框宽
		sw = targetWidth;
		sh = Math.floor(targetWidth*ih/iw);
		
		ratio = this._ratio(iw, targetWidth);
		
		// 图片高度超出裁剪框，能正常裁剪
		if (sh >= targetHeight) {
			sx = 0;
			sy = toNumber((sh - targetHeight)/2*ratio);
		}
		// 不满足裁剪需求，需重新缩放：图片高度 === 裁剪框高度
		else {
			sw = Math.floor(targetHeight*iw/ih);
			sh = targetHeight;
			sx = toNumber((sw - targetWidth)/2*ratio);
			sy = 0;
			ratio = this._ratio(ih, targetHeight);
		}
		
	}
	// 缩放图片代码 **********************************
	// 只设置了宽度
	else if (targetWidth > 0) {
		cw = targetWidth;
		ch = Math.floor(targetWidth*ih/iw);
		ratio = this._ratio(iw, targetWidth);
	}
	// 只设置了宽度
	else if (targetHeight > 0) {
		cw = Math.floor(targetHeight*iw/ih);
		ch = targetHeight;
		ratio = this._ratio(ih, targetHeight);
	}
	// 不处理图片
	// if (targetWidth === 0 && targetHeight === 0)
	else {
		cw = iw;
		ch = ih;
	};
	
	return {
		sx: sx,
		sy: sy,
		sw: toNumber(cw*ratio),
		sh: toNumber(ch*ratio),
		cw: cw,
		ch: ch
	};
}

/**
 * 缩放比列
 * @param {Number} numerator 分子
 * @param {Number} denominator 分母
 */
fn._ratio = function (numerator, denominator) {
	return parseInt(numerator/denominator*10000)/10000;
}

/**
 * 将数据转换为可上传用数据
 * @param {String} data
 * @param {String} type 生成文件类型  
 * @return blob数据
 */
fn.toBlobData = function (data, type) {
	// 获取base64数据
	// data = data.split(',')[1];
	var dataInfo = this.getBase64Info(data);
	
	data = window.atob(dataInfo.data);

	type = type || dataInfo.type;
	
	var ia = new Uint8Array(data.length);
	for (var i = 0; i < data.length; i++) {
	    ia[i] = data.charCodeAt(i);
	};
	
	// canvas.toDataURL 返回的默认格式是 image/png
	var blob = new Blob([ia], {type: type});
	
	return blob;
};

/**
 * 获取base64字符串的数据及类型
 * @param data
 */
fn.getBase64Info = function (data) {
	// base64数据格式:
	// "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k="
	var arr = data.split(',');
	var type = '';
	if (/data:(\w+\/\w+);base64/.test(arr[0])) {
		type = RegExp.$1;
	}

	return {
		type: type,
		data: arr[1]
	};
};

/**
 * 判断文件是否为图片格式
 * @param file 图片文件名称
 * @return {boolean}
 */
fn.isImage = function (file) {
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
};

/**
 * 转换为数字
 * @param n
 * @return {*}
 */
function toNumber (n) {
	var num = parseInt(n);
	if (isNaN(num)) {
		return 0;
	}
	return num;
};

/**
 * 获取文件后缀名
 * @param {String} fileName 文件名称(带后缀的)
 */
fn.getFileSuffix = function (fileName) {
	return fileName.toString().split('.').pop().toLowerCase();
};

/**
 * 将文件大小B转换为KB或M
 * @param size
 * @return {string}
 */
fn.conversion = function (size) {
	size = toNumber(size);
	// 计算文件大小多少kb
	var kb = toNumber((size/1024)*100)/100;
	if (kb >= 1024) {
		return toNumber((kb/1024)*100)/100 + 'M';
	} else {
		return kb + 'KB';
	}
};

module.exports = IPTS;


/***/ })
/******/ ]);
});