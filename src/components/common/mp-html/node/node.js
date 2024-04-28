"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @fileoverview 递归子组件，用于显示节点树
 */
Component({
  data: {
    ctrl: {},
    // 控制信号
    // #ifdef MP-WEIXIN
    isiOS: wx.getSystemInfoSync().system.includes('iOS')
    // #endif
  },
  properties: {
    childs: Array,
    // 子节点列表
    opts: Array // 设置 [是否开启懒加载, 加载中占位图, 错误占位图, 是否使用长按菜单]
  },
  options: {
    addGlobalClass: true
  },
  // #ifndef MP-TOUTIAO
  attached: function attached() {
    // #ifndef MP-ALIPAY
    this.triggerEvent('add', this, {
      bubbles: true,
      composed: true
    });
    // #endif
    // #ifdef MP-ALIPAY

    // #endif
  },
  // #endif
  methods: {
    noop: function noop() {},
    /**
     * @description 获取标签
     * @param {String} path 路径
     */
    getNode: function getNode(path) {
      try {
        var nums = path.split('_');
        var node = this.data.childs[nums[0]];
        for (var i = 1; i < nums.length; i++) {
          node = node.children[nums[i]];
        }
        return node;
      } catch (_unused) {
        return {
          text: '',
          attrs: {},
          children: []
        };
      }
    },
    /**
     * @description 播放视频事件
     * @param {Event} e
     */
    play: function play(e) {
      this.root.triggerEvent('play');
      if (this.root.data.pauseVideo) {
        var flag = false;
        var id = e.target.id;
        for (var i = this.root._videos.length; i--;) {
          if (this.root._videos[i].id === id) {
            flag = true;
          } else {
            this.root._videos[i].pause(); // 自动暂停其他视频
          }
        }
        // 将自己加入列表
        if (!flag) {
          var ctx = wx.createVideoContext(id
          // #ifndef MP-BAIDU
          , this
          // #endif
          );
          ctx.id = id;
          if (this.root.playbackRate) {
            ctx.playbackRate(this.root.playbackRate);
          }
          this.root._videos.push(ctx);
        }
      }
    },
    /**
     * @description 图片点击事件
     * @param {Event} e
     */
    imgTap: function imgTap(e) {
      var node = this.getNode(e.target.dataset.i);
      // 父级中有链接
      if (node.a) return this.linkTap(node.a);
      if (node.attrs.ignore) return;
      this.root.triggerEvent('imgtap', node.attrs);
      if (this.root.data.previewImg) {
        var current =
        // #ifndef MP-ALIPAY
        this.root.imgList[node.i];
        // #endif
        // #ifdef MP-ALIPAY

        // #endif
        // 自动预览图片
        wx.previewImage({
          // #ifdef MP-WEIXIN
          showmenu: this.root.data.showImgMenu,
          // #endif
          // #ifdef MP-ALIPAY

          // #endif
          current: current,
          urls: this.root.imgList
        });
      }
    },
    /**
     * @description 图片加载完成事件
     * @param {Event} e
     */
    imgLoad: function imgLoad(e) {
      var i = e.target.dataset.i;
      var node = this.getNode(i);
      var val;
      if (!node.w) {
        val = e.detail.width;
      } else if (this.data.opts[1] && !this.data.ctrl[i] || this.data.ctrl[i] === -1) {
        // 加载完毕，取消加载中占位图
        val = 1;
      }
      if (val
      // #ifdef MP-TOUTIAO

      // #endif
      ) {
        this.setData(_defineProperty({}, 'ctrl.' + i, val));
      }
      this.checkReady();
    },
    /**
     * @description 检查是否所有图片加载完毕
     */
    checkReady: function checkReady() {
      var _this = this;
      if (!this.root.data.lazyLoad) {
        this.root.imgList._unloadimgs -= 1;
        if (!this.root.imgList._unloadimgs) {
          setTimeout(function () {
            _this.root.getRect().then(function (rect) {
              _this.root.triggerEvent('ready', rect);
            })["catch"](function () {
              _this.root.triggerEvent('ready', {});
            });
          }, 350);
        }
      }
    },
    /**
     * @description 链接点击事件
     * @param {Event} e
     */
    linkTap: function linkTap(e) {
      var node = e.currentTarget ? this.getNode(e.currentTarget.dataset.i) : {};
      var attrs = node.attrs || e;
      var href = attrs.href;
      this.root.triggerEvent('linktap', Object.assign({
        innerText: this.root.getText(node.children || []) // 链接内的文本内容
      }, attrs));
      if (href) {
        if (href[0] === '#') {
          // 跳转锚点
          this.root.navigateTo(href.substring(1))["catch"](function () {});
        } else if (href.split('?')[0].includes('://')) {
          // 复制外部链接
          if (this.root.data.copyLink) {
            wx.setClipboardData({
              data: href,
              success: function success() {
                return wx.showToast({
                  title: '链接已复制'
                });
              }
            });
          }
        } else {
          // 跳转页面
          wx.navigateTo({
            url: href,
            fail: function fail() {
              wx.switchTab({
                url: href,
                fail: function fail() {}
              });
            }
          });
        }
      }
    },
    /**
     * @description 错误事件
     * @param {Event} e
     */
    mediaError: function mediaError(e) {
      var i = e.target.dataset.i;
      var node = this.getNode(i);
      if (node.name === 'video' || node.name === 'audio') {
        // 加载其他源
        var index = (this.data.ctrl[i] || 0) + 1;
        if (index > node.src.length) {
          index = 0;
        }
        if (index < node.src.length) {
          return this.setData(_defineProperty({}, 'ctrl.' + i, index));
        }
      } else if (node.name === 'img') {
        // 显示错误占位图
        if (this.data.opts[2]) {
          this.setData(_defineProperty({}, 'ctrl.' + i, -1));
        }
        this.checkReady();
      }
      if (this.root) {
        this.root.triggerEvent('error', {
          source: node.name,
          attrs: node.attrs,
          errMsg: e.detail.errMsg
        });
      }
    }
  }
});