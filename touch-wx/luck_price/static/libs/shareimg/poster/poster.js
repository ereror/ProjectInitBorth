'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultOptions = {
  selector: '#poster'
};

function Poster() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  options = Object.assign(defaultOptions, options);
  var pages = getCurrentPages();
  var ctx = pages[pages.length - 1];
  var poster = ctx.selectComponent(options.selector);
  delete options.selector;
  return poster;
};

Poster.create = function () {
  var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var poster = Poster();
  if (!poster) {
    console.error('请设置组件的id="poster"!!!');
  } else {
    return Poster().onCreate(reset);
  }
};

exports.default = Poster;