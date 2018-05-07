"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jwCanvas = require("jw-canvas");

var _jwCanvas2 = _interopRequireDefault(_jwCanvas);

var _jwAnimator = require("jw-animator");

var _jwAnimator2 = _interopRequireDefault(_jwAnimator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*eslint no-unused-vars: ["warn", { "ignoreRestSiblings": true }]*/

var AnimateCanvas = function (_Canvas) {
  _inherits(AnimateCanvas, _Canvas);

  function AnimateCanvas(props) {
    _classCallCheck(this, AnimateCanvas);

    var _this = _possibleConstructorReturn(this, (AnimateCanvas.__proto__ || Object.getPrototypeOf(AnimateCanvas)).call(this, props));

    _this.removeAnimation = function () {};
    return _this;
  }

  _createClass(AnimateCanvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this._mount();

      var props = this.props;
      var animator = props.animator;


      this.animator = animator || new _jwAnimator2.default();

      if (props.animate) {
        this.removeAnimation = this.animator.add(function (timeDiff) {
          var element = _this2.getCanvasElement();
          var context = _this2.getContext();
          var width = element.width,
              height = element.height;


          props.animate(context, width, height, timeDiff);
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unmount();

      this.removeAnimation();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          maintainPixelSize = _props.maintainPixelSize,
          onResize = _props.onResize,
          animator = _props.animator,
          contextType = _props.contextType,
          animate = _props.animate,
          rest = _objectWithoutProperties(_props, ["maintainPixelSize", "onResize", "animator", "contextType", "animate"]);

      return _react2.default.createElement("canvas", _extends({ ref: function ref(c) {
          return _this3.canvas = c;
        } }, rest));
    }
  }]);

  return AnimateCanvas;
}(_jwCanvas2.default);

AnimateCanvas.propTypes = {
  maintainPixelSize: _propTypes2.default.bool,
  onResize: _propTypes2.default.func,
  contextType: _propTypes2.default.string,
  animator: _propTypes2.default.instanceOf(_jwAnimator2.default),
  animate: _propTypes2.default.func
};

AnimateCanvas.defaultProps = {
  maintainPixelSize: true,
  contextType: "2d"
};

exports.default = AnimateCanvas;