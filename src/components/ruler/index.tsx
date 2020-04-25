/* eslint-disable no-nested-ternary */
import React from "react";

import "./index.less";

interface RulerProps {
  direction: "x" | "y";

  unit?: number; // 50,
  backgroundColor?: string; // "#333333",
  lineColor?: string; // "#777777"
}

export default class Ruler extends React.PureComponent<RulerProps> {
  canvasRef: InstanceType<typeof HTMLCanvasElement>;

  static defaultProps = {
    unit: 50,
    backgroundColor: "#333",
    lineColor: "#777"
  };

  componentDidMount() {
    this.resetCanvas();
  }

  resetCanvas = () => {
    const { width, height } = this.canvasRef.getBoundingClientRect();

    this.canvasRef.width = width;
    this.canvasRef.height = height;

    this.draw();
  };

  saveCanvasRef = ref => {
    this.canvasRef = ref;
  };

  draw = () => {
    const { width, height } = this.canvasRef.getBoundingClientRect();
    const canvasContext = this.canvasRef.getContext("2d");

    if (!canvasContext) {
      return;
    }

    const { direction, backgroundColor, lineColor, unit } = this.props;
    canvasContext.fillStyle = backgroundColor!;
    canvasContext.fillRect(0, 0, width, height);

    canvasContext.strokeStyle = lineColor!;
    canvasContext.lineWidth = 1;
    canvasContext.font = "10px sans-serif";
    canvasContext.fillStyle = "#fff";

    // 绘制区间
    const maxAreaLen =
      direction === "x" ? Math.ceil(width / unit!) : Math.ceil(height / unit!);

    const smallSplitLen = 10;
    const smallSplitPx = unit! / smallSplitLen;
    // 绘制区间
    if (direction === "x") {
      for (let i = 0; i < maxAreaLen; i += 1) {
        const currOffset = i * unit!;

        for (let j = 0; j < smallSplitLen; j += 1) {
          canvasContext.save();
          canvasContext.translate(0.5, 0);
          canvasContext.beginPath();
          const moveTo = [currOffset + j * smallSplitPx, height];
          const lineTo =
            j === 0
              ? [currOffset, 0]
              : (j + 1) % 2 === 0
              ? [currOffset + j * smallSplitPx, height - 10]
              : [currOffset + j * smallSplitPx, height - 15];

          canvasContext.moveTo(moveTo[0], moveTo[1]);
          canvasContext.lineTo(lineTo[0], lineTo[1]);
          canvasContext.stroke();
          canvasContext.restore();
        }

        canvasContext.fillText(String(currOffset), currOffset + 2, 12);
      }
    } else if (direction === "y") {
      for (let i = 0; i < maxAreaLen; i += 1) {
        const currOffset = i * unit!;

        for (let j = 0; j < smallSplitLen; j += 1) {
          canvasContext.save();
          canvasContext.translate(0, 0.5);
          canvasContext.beginPath();
          const moveTo = [width, currOffset + j * smallSplitPx];

          const lineTo =
            j === 0
              ? [0, currOffset]
              : (j + 1) % 2 === 0
              ? [width - 10, currOffset + j * smallSplitPx]
              : [width - 15, currOffset + j * smallSplitPx];
          canvasContext.moveTo(moveTo[0], moveTo[1]);
          canvasContext.lineTo(lineTo[0], lineTo[1]);

          canvasContext.stroke();
          canvasContext.restore();
        }

        canvasContext.save();
        canvasContext.translate(10, currOffset - 2);
        canvasContext.rotate(-Math.PI / 2);
        canvasContext.fillText(String(currOffset), 0, 0);
        canvasContext.restore();
      }
    }
  };

  render() {
    const { direction } = this.props;
    return (
      <div className={`ruler ${direction}`}>
        <canvas ref={this.saveCanvasRef} />
      </div>
    );
  }
}
