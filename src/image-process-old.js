/**
 * Create by Capricorncd 2017-05-26
 * https://github.com/capricorncd/image-process-tools
 */
'use strict';

/**
 * 实现功能：
 * 1.点击图片选择按钮,选择上传文件(这里需模拟input[type="file"]点击事件)
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

// 成功代码
var CODE_SUC = {
  0: '成功，程序正常完成整套流程，并返回最终结果',
  1: '选中的文件非图片文件，返回选中文件数据data'
}

// 错误代码
var CODE_ERR = {
  1: '配置参数未配置或有误',
  2: '请配置图片选择按钮#id或.class',
  3: '浏览器不支持addEventListener()',
  4: '浏览器不支持FileReader接口！\n需升级或更换高版本的浏览器',
  5: '未选中文件',
  6: '选中的文件不是图片文件',
  7: '文件读取错误',
  8: '图片数据加载错误',
  9: '当前图片文件尺寸小于裁剪尺寸'
}

/**
 * 图片上传预处理
 * IPTS: imageProcessTools
 * @param {Object} opts 配置数据
 * @param {Object} opts.success.data 处理成功后的文件数据
 */
function IPTS(opts) {

  var self = this

  // 配置参数
  if (!opts instanceof Object) {
    opts.error && opts.error({
      code: 1,
      msg: CODE_ERR[1]
    })
    return
  }

  // 按钮id
  if (!opts.elm || !query(opts.elm)) {
    opts.error && opts.error({
      code: 2,
      msg: CODE_ERR[2]
    })
    return
  }

  this.opts = opts

  // input[type="file"] id
  var inputTempId = 'IPTS_' + (new Date()).getTime()

  // 将input节点添加至按钮后面
  this._createFileInput(opts.elm, inputTempId)

  // 读取图片文件数据
  // 并显示在指定wrapper内
  // 将图片写入容器
  this.readImageFileData(inputTempId, function (imgInfo) {
    // 处理图片
    self.handleImageData(imgInfo, function (result) {
      // 是否在targetWrapper容器内显示处理后的图片(canvas)
      var targetWrapper = opts.target;
      if (targetWrapper) {
        query(targetWrapper).innerHTML = ''
        query(targetWrapper).appendChild(result.element)
      }

      // 返回处理完成的数据
      opts.success && opts.success(result)
    })
  })

}


var fn = IPTS.prototype

/**
 * 创建input[type="file"]
 * @param {Object} elm 按钮元素节点
 * @param {String} inputId input[type="file"] id
 * return input元素节点
 */
fn._createFileInput = function (elm, inputId) {
  var btnNode = query(elm)
  // 创建input节点
  var input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.style.display = 'none'
  input.id = inputId

  btnNode.parentNode.appendChild(input)

  // 选择上传文件
  this._selectFile(btnNode, input)
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
      })
      inputNode.dispatchEvent(evt)
    }, false)
  } else {
    this.opts.error && this.opts.error({
      code: 3,
      msg: CODE_ERR[3]
    })
  }
}

/**
 * 读取本地文件并渲染视图
 * @param {String} inputTempId input[type="file"]的id
 * @param {Object} callback 返回img及文件名称对象
 */
fn.readImageFileData = function (inputTempId, callback) {

  var self = this

  if (typeof FileReader === 'undefined' ) {
    this.opts.error && this.opts.error({
      code: 4,
      msg: CODE_ERR[4]
    })
    return
  }

  // 监听input[type="file"]变化，读取文件数据
  if (query(inputTempId).addEventListener) {
    query(inputTempId).addEventListener('change', function (e) {
      // 选中的图片文件
      var file = this.files[0]

      if (!file) {
        self.opts.error && self.opts.error({
          code: 5,
          msg: CODE_ERR[5]
        })
        return
      }

      // 判断文件类型
      if (!self.isImage(file.name)) {
        // 返回上传文件信息
        self.opts.success && self.opts.success({
          code: 1,
          msg: CODE_SUC[1],
          data: file
        })

        self.opts.error && self.opts.error({
          code: 6,
          msg: CODE_ERR[6]
        });
        return
      }

      // 实例化FileReader
      var READER = new FileReader()
      var img = new Image()

      // readAsDataURL方法用于读取指定Blob或File的内容。
      // 当读操作完成，readyState变为DONE, loadend被触发，
      // 此时result属性包含数据：URL以base64编码的字符串表示文件的数据。
      READER.readAsDataURL(file)
      READER.onload = function (e) {
        img.src = this.result;
        img.setAttribute('alt', file.name)
        // 获取图片信息
        self._getImageInfo(img, callback)
      }

      READER.onerror = function (e) {
        self.opts.error && self.opts.error({
          code: 7,
          msg: CODE_ERR[7]
        });
      }

    }, false)
  } else {
    self.opts.error && self.opts.error({
      code: 3,
      msg: CODE_ERR[3]
    })
  }
}

/**
 * 处理图片数据
 * @param img image对象
 * @param callback
 */
fn.handleImageData = function (imageInfo, callback) {
  // 文件类型
  var setType = this.opts.type ? this.opts.type.toLowerCase() : null
  var dataType = (setType && TYPES[setType]) ? TYPES[setType] : imageInfo.type

  this.opts.progress && this.opts.progress(0)

  // 计算图片缩放或裁剪位置、尺寸
  var res = this.calculateCropInfo(imageInfo.width, imageInfo.height)

  var canvas = imageInfo.element

  var scaling = 2;
  var sw = res.sw, sh = res.sh;
  var sx = res.sx, sy = res.sy;
  if (res.scaling > scaling) {
    scaling = res.scaling;
    do {
      this.opts.progress && this.opts.progress(2/scaling);
      canvas = this.createCanvas(canvas, {
        cw: res.cw * scaling,
        ch: res.ch * scaling,
        sx: sx,
        sy: sy,
        sw: sw,
        sh: sh
      });
      sw = canvas.width;
      sh = canvas.height;
      sx = sy = 0;
      scaling -= 1;
    } while (scaling > 2)
  }
  canvas = this.createCanvas(canvas, {
    cw: res.cw,
    ch: res.ch,
    sx: sx,
    sy: sy,
    sw: sw,
    sh: sh
  })

  var data = canvas.toDataURL(dataType)
  data = this.toBlobData(data, dataType)

  this.opts.progress && this.opts.progress(1)

  callback && callback({
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
}

/**
 * 创建Canvas
 * @param elm Image对象或Canvas元素
 * @param p 裁剪参数
 * @returns {Element}
 */
fn.createCanvas = function (elm, p) {
  var canvas = document.createElement('canvas')
  canvas.width = p.cw
  canvas.height = p.ch
  var ctx = canvas.getContext('2d');
  ctx.drawImage(elm, p.sx, p.sy, p.sw, p.sh, 0, 0, canvas.width, canvas.height);
  return canvas
}

/**
 * 获取图片信息
 * @param img image对象
 * @param callback
 * @private
 */
fn._getImageInfo = function (img, callback) {
  var self = this
  // 加载图片
  img.onload = function (e) {
    var data = img.src;
    callback && callback({
      element: img,
      width: img.width,
      height: img.height,
      type: self.getBase64Info(data).type,
      data: data,
      size: self.toBlobData(data).size
    })
  }

  img.onerror = function (e) {
    self.opts.error && self.opts.error({
      code: 8,
      msg: CODE_ERR[8]
    })
  }
}

/**
 * 计算生成图片裁剪位置及尺寸
 * @param {Number} iw // 原图宽
 * @param {Number} ih // 原图高
 * @param {Object} callback 生成图片尺寸、坐标数据
 */
fn.calculateCropInfo = function (iw, ih) {

  var opts = this.opts
  // 是否对图片进行裁剪
  var IS_CROP = typeof opts.crop === 'boolean' ? opts.crop : false
  // 目标图片尺寸
  var targetWidth = toNumber(opts.width)
  var targetHeight = toNumber(opts.height)

  // 提示：图片实际尺寸，小于目标尺寸
  if (iw < targetWidth || ih < targetHeight) {
    this.opts.error && this.opts.error({
      code: 9,
      msg: CODE_ERR[9]
    })
  }

  // 缩放比列
  var scaling = 1

  // 图片开始裁剪位置 x,y坐标
  var sx = 0, sy = 0
  // canvas 尺寸
  var canvasWidth = iw, canvasHieght = ih
  // 等比缩放后的图片尺寸
  var sw = 0, sh = 0

  // 裁剪图片代码 **********************************
  // 等比缩放到合适大小，在居中裁剪
  if (IS_CROP && targetWidth > 0 && targetHeight > 0) {
    // canvas的尺寸即为裁剪设置尺寸
    canvasWidth = targetWidth
    canvasHieght = targetHeight

    // 按目标宽度调整图片尺寸：图片宽度 === 裁剪框宽
    sw = targetWidth;
    sh = Math.floor(targetWidth*ih/iw)

    scaling = this._ratio(iw, targetWidth)

    // 图片高度超出裁剪框，能正常裁剪
    if (sh >= targetHeight) {
      sx = 0
      sy = toNumber((sh - targetHeight)/2*scaling)
    }
    // 不满足裁剪需求，需重新缩放：图片高度 === 裁剪框高度
    else {
      sw = Math.floor(targetHeight*iw/ih)
      sh = targetHeight
      sx = toNumber((sw - targetWidth)/2*scaling)
      sy = 0;
      scaling = this._ratio(ih, targetHeight)
    }

  }
  // 缩放图片代码 **********************************
  // 只设置了宽度
  else if (targetWidth > 0) {
    canvasWidth = targetWidth;
    canvasHieght = Math.floor(targetWidth*ih/iw)
    scaling = this._ratio(iw, targetWidth);
  }
  // 只设置了宽度
  else if (targetHeight > 0) {
    canvasWidth = Math.floor(targetHeight*iw/ih)
    canvasHieght = targetHeight
    scaling = this._ratio(ih, targetHeight)
  }
  // 不处理图片
  // if (targetWidth === 0 && targetHeight === 0)
  // else {
  // 	canvasWidth = iw;
  // 	canvasHieght = ih;
  // }

  return {
    sx: sx, // 裁剪开始x坐标
    sy: sy, // 裁剪开始y坐标
    sw: toNumber(canvasWidth*scaling),
    sh: toNumber(canvasHieght*scaling),
    scaling: scaling,
    cw: canvasWidth,
    ch: canvasHieght
  }
}

/**
 * 缩放比列
 * @param {Number} numerator 分子
 * @param {Number} denominator 分母
 */
fn._ratio = function (numerator, denominator) {
  return parseInt(numerator/denominator*10000)/10000
}

/**
 * 将数据转换为可上传用数据
 * @param {String} data
 * @param {String} type 生成文件类型
 * @return blob数据
 */
fn.toBlobData = function (data, type) {
  // 获取base64数据
  // data = data.split(',')[1]
  var dataInfo = this.getBase64Info(data)

  data = window.atob(dataInfo.data)

  type = type || dataInfo.type

  var ia = new Uint8Array(data.length);
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }

  // canvas.toDataURL 返回的默认格式是 image/png
  var blob = new Blob([ia], {type: type});

  return blob
}

/**
 * 获取base64字符串的数据及类型
 * @param data
 */
fn.getBase64Info = function (data) {
  // base64数据格式:
  // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k="
  var arr = data.split(',')
  var type = ''
  if (/data:(\w+\/\w+);base64/.test(arr[0])) {
    type = RegExp.$1;
  }
  return {
    type: type,
    data: arr[1]
  }
}

/**
 * 判断文件是否为图片格式
 * @param file 图片文件名称
 * @return {boolean}
 */
fn.isImage = function (file) {
  // 图片类型
  var imageType = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp']
  // 文件后缀
  var suf = this.getFileSuffix(file)
  // 判断文件名是否带有?search
  if (/(\w+)\?/.test(suf)) suf = RegExp.$1
  return imageType.indexOf(suf) > -1 ? true : false
}


/**
 * 获取selector元素节点
 * @param {String} id 元素id
 */
function query(selector) {
  return document.querySelector(selector) || null
}

/**
 * 转换为数字
 * @param n
 * @return {*}
 */
function toNumber (n) {
  var num = parseInt(n)
  return isNaN(num) ? 0 : num
}

/**
 * 获取文件后缀名
 * @param {String} fileName 文件名称(带后缀的)
 */
fn.getFileSuffix = function (fileName) {
  return fileName.toString().split('.').pop().toLowerCase()
}

/**
 * 将文件大小B转换为KB或M
 * @param size
 * @return {string}
 */
fn.conversion = function (size) {
  // 计算文件大小多少kb
  var kb = toNumber((toNumber(size)/1024)*100)/100;
  return kb >= 1024 ? toNumber((kb/1024)*100)/100 + 'M' : kb + 'KB'
}

module.exports = IPTS
