import React, { Component } from "react";
import { render } from "react-dom";

import AnimateCanvas from "./module";

import "./style.css";

class ExampleAnimateCanvas extends Component {
  constructor(props) {
    super(props);

    this.x = 0;
    this.secondInterval = 0;

    this.state = {
      FPS: 0,
      actualFPS: 0,
      pauseOnHidden: false,
      resumeOnShown: false
    };
  }

  componentDidMount() {
    const { animator } = this.canvas;
    const { FPS, actualFPS, pauseOnHidden, resumeOnShown } = animator;

    this.setState({
      FPS,
      actualFPS,
      pauseOnHidden,
      resumeOnShown
    });
  }

  draw() {
    const { canvas } = this;
    const context = canvas.getContext();
    const element = canvas.getCanvasElement();
    const { width, height } = element;

    let radius = 40;

    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.arc(this.x, radius + 10, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "green";
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "#003300";
    context.stroke();
  }

  animate(context, width, height, timeDiff) {
    this.x = (this.x + timeDiff * 200) % width;
    this.secondInterval += timeDiff;

    if (this.secondInterval > 0.5) {
      this.setState({ actualFPS: 1 / timeDiff });
      this.secondInterval = 0;
    }

    this.draw();
  }

  setFPS(FPS) {
    this.canvas.animator.setFPS(FPS);
    this.setState({ FPS });
  }

  setResumeOnShown(resumeOnShown) {
    this.canvas.animator.setResumeOnShown(resumeOnShown);
    this.setState({ resumeOnShown });
  }

  setPauseOnHidden(pauseOnHidden) {
    this.canvas.animator.setPauseOnHidden(pauseOnHidden);
    this.setState({ pauseOnHidden });
  }

  start() {
    this.canvas.animator.start();
  }

  pause() {
    this.canvas.animator.pause();
  }

  resume() {
    this.canvas.animator.resume();
  }

  stop() {
    const { canvas } = this;
    const { width, height } = canvas.getCanvasElement();

    canvas.animator.stop();
    this.x = 0;
    canvas.getContext().clearRect(0, 0, width, height);
  }

  render() {
    const { FPS, actualFPS, pauseOnHidden, resumeOnShown } = this.state;
    return (
      <div {...this.props}>
        <AnimateCanvas
          className="animation"
          ref={c => (this.canvas = c)}
          animate={(context, width, height, timeDiff) =>
            this.animate(context, width, height, timeDiff)
          }
          onResize={() => this.draw()}
        />
        <div className="settings">
          <div className="field">
            <label>Actual FPS: </label>
            <input
              type="number"
              value={actualFPS.toFixed(2)}
              disabled={true}
              onChange={() => {}}
            />
          </div>
          <div className="field">
            <label>FPS: </label>
            <input
              type="number"
              value={FPS}
              onChange={e => this.setFPS(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Pause on hidden: </label>
            <input
              type="checkbox"
              checked={pauseOnHidden}
              onChange={e => this.setPauseOnHidden(e.target.checked)}
            />
          </div>
          <div className="field">
            <label>Resume on shown: </label>
            <input
              type="checkbox"
              checked={resumeOnShown}
              onChange={e => this.setResumeOnShown(e.target.checked)}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = { status: "STOPPED" };
  }

  startHandler() {
    this.a1.start();
    this.a2.start();
    this.setState({ status: "PLAYING" });
  }

  pauseHandler() {
    this.a1.pause();
    this.a2.pause();
  }

  resumeHandler() {
    this.a1.resume();
    this.a2.resume();
  }

  stopHandler() {
    this.a1.stop();
    this.a2.stop();
    this.setState({ status: "STOPPED" });
  }

  render() {
    const { status } = this.state;

    return (
      <div>
        <ExampleAnimateCanvas ref={a1 => (this.a1 = a1)} id="animator1" />
        <ExampleAnimateCanvas ref={a2 => (this.a2 = a2)} id="animator2" />
        <div id="controller">
          <button
            id="start"
            onClick={() => this.startHandler()}
            disabled={status !== "STOPPED"}
          >
            start
          </button>
          <button id="pause" onClick={() => this.pauseHandler()}>
            pause
          </button>
          <button id="resume" onClick={() => this.resumeHandler()}>
            resume
          </button>
          <button
            id="stop"
            onClick={() => this.stopHandler()}
            disabled={status === "STOPPED"}
          >
            stop
          </button>
        </div>
      </div>
    );
  }
}

render(<Demo />, document.getElementById("root"));
