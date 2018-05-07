/*eslint no-unused-vars: ["warn", { "ignoreRestSiblings": true }]*/

import React from "react";
import PropTypes from "prop-types";
import Canvas from "jw-canvas";
import Animator from "jw-animator";

class AnimateCanvas extends Canvas {
  constructor(props) {
    super(props);

    this.removeAnimation = () => {};
  }

  componentDidMount() {
    this._mount();

    const { props } = this;
    const { animator } = props;

    this.animator = animator || new Animator();

    if (props.animate) {
      this.removeAnimation = this.animator.add(timeDiff => {
        const element = this.getCanvasElement();
        const context = this.getContext();
        const { width, height } = element;

        props.animate(context, width, height, timeDiff);
      });
    }
  }

  componentWillUnmount() {
    this._unmount();

    this.removeAnimation();
  }

  render() {
    const {
      maintainPixelSize,
      onResize,
      animator,
      contextType,
      animate,
      ...rest
    } = this.props;
    return <canvas ref={c => (this.canvas = c)} {...rest} />;
  }
}

AnimateCanvas.propTypes = {
  maintainPixelSize: PropTypes.bool,
  onResize: PropTypes.func,
  contextType: PropTypes.string,
  animator: PropTypes.instanceOf(Animator),
  animate: PropTypes.func
};

AnimateCanvas.defaultProps = {
  maintainPixelSize: true,
  contextType: "2d"
};

export default AnimateCanvas;
