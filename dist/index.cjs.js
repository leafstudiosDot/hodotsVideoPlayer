'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

/**
 * hodots. Video Player
 * 
 * @param {string} src Source of the video
 * @param {string} placeholder Placeholder of the video, Thumbnail is the default one
 * @param {Number} maxHeight Maximum height of the video viewport
 */

var AppVideoPlayer = /*#__PURE__*/function (_Component) {
  _inherits(AppVideoPlayer, _Component);

  var _super = _createSuper(AppVideoPlayer);

  function AppVideoPlayer(props) {
    var _this;

    _classCallCheck(this, AppVideoPlayer);

    _this = _super.call(this, props);
    _this.videoPause = _this.videoPause.bind(_assertThisInitialized(_this));
    _this.state = {
      xPos: "0px",
      yPos: "0px",
      showMenu: false
    };
    return _this;
  }

  _createClass(AppVideoPlayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('keydown', this.KeySettingVideo);
      var Seekbar = document.getElementById("videoprogress-bar");
      Seekbar.addEventListener("mousedown", function (e) {
        document.addEventListener("mousemove", this.ResizeSeeking, false);
      }, false);
      document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", this.ResizeSeeking, false);
      }, false);
      var Viewport = document.getElementById("VideoViewport");
      Viewport.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        event.pageX + "px";
        event.pageY + "px"; //console.log(xPos + ", " + yPos)
      });
    }
  }, {
    key: "ResizeSeeking",
    value: function ResizeSeeking(e) {
      console.log(e.clientX);
      /*const LocatedToSize = e.clientX / this.refs.videoProgScrub.offsetWidth
      this.refs.videoProgScrub.offsetWidth = LocatedToSize*/
    }
  }, {
    key: "KeySettingVideo",
    value: function KeySettingVideo(event) {
      if (!this.props.keysDisabled) {
        if (event.keyCode === 37) {
          this.refs.videoRefer.currentTime -= 5;
        }

        if (event.keyCode === 39) {
          this.refs.videoRefer.currentTime += 5;
        }

        if (event.keyCode === 32) {
          //event.preventDefault();
          this.videotogglePlay();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.KeySettingVideo);
    } //Video

  }, {
    key: "videotogglePlay",
    value: function videotogglePlay() {
      if (this.refs.videoRefer.paused) {
        this.refs.playbtn.className = 'pause';
        this.refs.videoRefer.play();
      } else {
        this.refs.playbtn.className = 'play';
        this.refs.videoRefer.pause();
      }
    }
  }, {
    key: "videoPause",
    value: function videoPause() {
      this.refs.playbtn.className = 'play';
      this.refs.videoRefer.pause();
    }
  }, {
    key: "videotimeUpdate",
    value: function videotimeUpdate() {
      var progpos = this.refs.videoRefer.currentTime / this.refs.videoRefer.duration;
      this.refs.videoprogressfilled.style.width = progpos * 100 + "%";

      if (this.refs.videoRefer.ended) {
        this.refs.playbtn.className = 'play';
      }

      var cursecs = parseInt(this.refs.videoRefer.currentTime % 60);
      var curmins = parseInt(this.refs.videoRefer.currentTime / 60, 10);
      var dursecs = parseInt(this.refs.videoRefer.duration % 60);
      var durmins = parseInt(this.refs.videoRefer.duration / 60, 10);

      if (cursecs < 10) {
        cursecs = "0" + cursecs;
      }

      if (dursecs < 10) {
        dursecs = "0" + dursecs;
      }

      if (curmins < 10) {
        curmins = "0" + curmins;
      }

      if (durmins < 10) {
        durmins = "0" + durmins;
      }

      this.refs.videoCurrent.innerHTML = curmins + ":" + cursecs;
      this.refs.videoDuration.innerHTML = durmins + ":" + dursecs;
    }
  }, {
    key: "videoProgScrub",
    value: function videoProgScrub(e) {
      var scrubTime = e.clientX / this.refs.videoProgScrub.offsetWidth * this.refs.videoRefer.duration;
      this.refs.videoRefer.currentTime = scrubTime;
    }
  }, {
    key: "videoTimeReturnCurrent",
    value: function videoTimeReturnCurrent() {
      return this.refs.videoRefer.currentTime;
    }
  }, {
    key: "PostVideo",
    value: function PostVideo(src, thumbplace) {
      var _this2 = this;

      var videoSrc = src;
      var thumb = thumbplace;
      /*var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
        xhr.onload = function () {
          var reader = new FileReader();
          reader.onloadend = function () {
              var byteCharacters = atob(reader.result.slice(reader.result.indexOf(',') + 1));
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
              var blob = new Blob([byteArray], { type: 'video/mov' });
              var url = URL.createObjectURL(blob);
                document.getElementById('videoviewport').src = url;
          }
          reader.readAsDataURL(xhr.response);
      }
      xhr.open('GET', videoSrc);
      xhr.send();*/

      /*function toggleFlash() {
          if (localStorage.flashvideo) {
              localStorage.removeItem('flashvideo')
              window.location.reload();
          } else {
              localStorage.setItem('flashvideo', true)
              window.location.reload();
          }
      }*/

      if (this.props.keysDisabled) {
        this.videoPause();
      }

      var mousedown = false;
      document.getElementById("VideoViewport");

      function FullscreenOn() {//videoViewportFullTarget.requestFullscreen()
      }

      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "Media"
      }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "VideoPost",
        id: "VideoViewport"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "c-video"
      }, /*#__PURE__*/React__default['default'].createElement("video", {
        ref: "videoRefer",
        id: "videoviewport",
        src: videoSrc,
        placeholder: thumb,
        onClick: this.videotogglePlay.bind(this),
        onTimeUpdate: this.videotimeUpdate.bind(this),
        preload: 'none',
        style: {
          maxHeight: this.props.maxHeight
        },
        loop: true,
        autoPlay: true
      }), /*#__PURE__*/React__default['default'].createElement("div", {
        className: "controls"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        ref: "videoProgScrub",
        onMouseMove: function onMouseMove(e) {
          return mousedown && _this2.videoProgScrub.bind(_this2);
        },
        onMouseDown: function onMouseDown() {
          return mousedown = true;
        },
        onMouseUp: function onMouseUp() {
          return mousedown = false;
        },
        onClick: this.videoProgScrub.bind(this),
        id: "videoprogress-bar"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        id: "videoprogress-loaded"
      }), /*#__PURE__*/React__default['default'].createElement("div", {
        ref: "videoprogressfilled",
        id: "videoprogress-filled"
      })), /*#__PURE__*/React__default['default'].createElement("div", {
        id: "videobuttons"
      }, /*#__PURE__*/React__default['default'].createElement("button", {
        ref: "playbtn",
        id: "play-pause",
        className: "pause",
        onClick: this.videotogglePlay.bind(this)
      }), /*#__PURE__*/React__default['default'].createElement("span", {
        id: "videoTime"
      }, /*#__PURE__*/React__default['default'].createElement("span", {
        ref: "videoCurrent"
      }), " / ", /*#__PURE__*/React__default['default'].createElement("span", {
        ref: "videoDuration"
      })), /*#__PURE__*/React__default['default'].createElement("span", {
        id: "fullScreenVideo",
        onClick: function onClick() {
          return FullscreenOn();
        }
      }, "\u2195")))))));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement("div", null, this.PostVideo(this.props.src, this.props.placeholder));
    }
  }]);

  return AppVideoPlayer;
}(React.Component);

exports.VideoPlayer = AppVideoPlayer;
