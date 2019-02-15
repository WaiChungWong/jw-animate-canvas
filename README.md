# jw-animate-canvas

A react component for canvas integrated with animation feature.
It is a combination of [canvas](https://nodei.co/npm/jw-canvas) and [animator](https://nodei.co/npm/jw-animator).

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/jw-animate-canvas.svg
[npm-url]: http://npmjs.org/package/jw-animate-canvas
[travis-image]: https://img.shields.io/travis/WaiChungWong/jw-animate-canvas.svg
[travis-url]: https://travis-ci.org/WaiChungWong/jw-animate-canvas
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/jw-animate-canvas.svg
[download-url]: https://npmjs.org/package/jw-animate-canvas

[Demo](http://waichungwong.github.io/jw-animate-canvas/build)

## Install

[![NPM](https://nodei.co/npm/jw-animate-canvas.png)](https://nodei.co/npm/jw-animate-canvas)

## Props

| Prop                          | Description                                                                                                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maintainPixelSize`(optional) | whether the canvas should keep dimension from the moment it was created. Default: `true`                                                                                                                |
| `onResize`(optional)          | event handler when the canvas is being resized.                                                                                                                                                         |
| `contextType`(optional)       | canvas context type. Default: `"2d"`                                                                                                                                                                    |
| `animator`(optional)          | the animator object for controlling the animation. If not provided, it will be created from within.                                                                                                     |
| `animate`(optional)           | animation method. Parameters:<br> - `context`: canvas context<br> - `width`: context width<br> - `height`: context height<br> - `timeDiff`: time difference between the last animate time (in seconds). |

## Usage

```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnimateCanvas from "jw-animate-canvas";

class Example extends Component {
  constructor(props) {
    super(props);

    this.resizeHandler = this.resizeHandler.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    const canvas = this.myCanvas;
    const { animator } = canvas;
    /** Start the animation. */
    animator.start();

    /** Pause the animation. */
    animator.pause();

    /** Resume the animation. */
    animator.resume();
  }

  resizeHandler(width, height) {
    /** ... **/
  }

  animate(context, width, height, timeDiff) {
    /** ... **/
  }

  render() {
    return (
      <AnimateCanvas
        ref={myCanvas => (this.myCanvas = myCanvas)}
        onResize={this.resizeHandler}
        animate={this.animate}
      />
    );
  }
}

ReactDOM.render(<Example />, document.getElementById("root"));
```
