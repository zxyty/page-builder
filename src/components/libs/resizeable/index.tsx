/* eslint-disable react/no-find-dom-node */
import React from "react";
import ReactDom from "react-dom";

import "./index.less";

type DirectionType = "left" | "top" | "right" | "bottom";

interface ResizeableProps {
  direction?: DirectionType | Array<DirectionType>;
  // 显示resize指导线
  showGuideLine?: boolean;
  // 指定resize指导线挂载的dom元素
  getGuideLineParent?: (currDom: HTMLElement) => any;
  onResizeEnd?: (
    resizedX: number,
    resizedY: number,
    initWidth: number,
    initHeight: number,
    currDom: HTMLElement
  ) => void;
  // 是否resize的同时修改dom size
  enableResizing?: boolean;

  children?: React.ReactNode;
}
export default class Resizeable extends React.PureComponent<ResizeableProps> {
  resizeStartX = 0;

  resizeStartY = 0;

  currDom: HTMLElement;

  domInitWidth = 0;

  domInitHieght = 0;

  guideLineId = "resize-guide-line";

  guideLineDom: HTMLElement | null;

  static defaultProps = {
    direction: "bottom"
  };

  componentDidMount() {
    const dom = ReactDom.findDOMNode(this);
    if (!dom || dom.nodeType !== 1) {
      // type === 1 -> reference Element
      return;
    }

    this.currDom = dom as HTMLElement;

    this._resetDomBoundary();

    this.appendDragActions();
  }

  _resetDomBoundary = () => {
    const { width, height } = this.currDom.getBoundingClientRect();
    this.domInitWidth = width;
    this.domInitHieght = height;
  };

  _getGuideLineParent = () => {
    return this.currDom;
  };

  appendDragActions = () => {
    const { position = "" } = getComputedStyle(this.currDom) || {};
    if (position !== "absolute" && position !== "relative") {
      this._addPosition();
    }

    this._appendActionDom();
  };

  _addPosition = () => {
    this.currDom.style.position = "relative";
  };

  _appendActionDom = () => {
    const { direction = "right" } = this.props;

    const directions = typeof direction === "object" ? direction : [direction];

    directions.forEach(d => {
      const dragDom = document.createElement("i");
      dragDom.setAttribute("class", `resize-bar ${d}`);
      dragDom.onmousedown = this._handleDragDomMouseDown.bind(this, d);

      this.currDom.appendChild(dragDom);
    });
  };

  _handleDragDomMouseDown = (direction: DirectionType, ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();

    const { clientX: initX, clientY: initY } = ev;
    this.resizeStartX = initX;
    this.resizeStartY = initY;

    if (!this.guideLineDom) {
      const newGuideLineDom = document.createElement("div");
      newGuideLineDom.setAttribute("id", this.guideLineId);
      document.body.appendChild(newGuideLineDom);
      this.guideLineDom = newGuideLineDom;
    }

    const moveHandler = e => {
      this._handleDragDomMouseMove(direction, e);
    };

    const upHander = e => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHander);
      this._handleDragDomMouseUp(direction, e);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHander);
  };

  _handleDragDomMouseMove = (direction: DirectionType, ev: MouseEvent) => {
    this._triggerResize(direction, ev, "mouseMove");
  };

  _handleDragDomMouseUp = (direction: DirectionType, ev: MouseEvent) => {
    this._triggerResize(direction, ev, "mouseUp");

    if (this.guideLineDom) {
      document.body.removeChild(this.guideLineDom);
      this.guideLineDom = null;
    }
    this._resetDomBoundary();
  };

  _triggerResize = (
    direction: DirectionType,
    ev: MouseEvent,
    type: "mouseMove" | "mouseUp"
  ) => {
    const { clientX: endX, clientY: endY } = ev;
    const { showGuideLine, onResizeEnd, enableResizing } = this.props;

    if (showGuideLine) {
      this._showGuideLine(direction, endX, endY);
    }

    let changeX = 0;
    let changeY = 0;
    if (direction === "left") {
      changeX = -(endX - this.resizeStartX);
    } else if (direction === "right") {
      changeX = endX - this.resizeStartX;
    } else if (direction === "bottom") {
      changeY = endY - this.resizeStartY;
    } else if (direction === "top") {
      changeY = -(endY - this.resizeStartY);
    }

    if (type === "mouseMove") {
      if (enableResizing) {
        this._resizeDom(changeX, changeY);
      }
    } else {
      this._resizeDom(changeX, changeY);
      if (onResizeEnd) {
        onResizeEnd(
          changeX,
          changeY,
          this.domInitWidth,
          this.domInitHieght,
          this.currDom
        );
      }
    }
  };

  _resizeDom = (changeX, changeY) => {
    this.currDom.style.width = `${this.domInitWidth + changeX}px`;
    this.currDom.style.height = `${this.domInitHieght + changeY}px`;
  };

  _showGuideLine = (direction: DirectionType, x, y) => {
    if (!this.guideLineDom) {
      return;
    }

    const { getGuideLineParent = this._getGuideLineParent } = this.props;
    const guideLineParent = getGuideLineParent(this.currDom);

    const {
      width,
      height,
      left,
      top
    } = guideLineParent.getBoundingClientRect();

    if (direction === "left" || direction === "right") {
      this.guideLineDom.style.position = "fixed";
      this.guideLineDom.style.width = `1px`;
      this.guideLineDom.style.height = `${height}px`;
      this.guideLineDom.style.left = `${x}px`;
      this.guideLineDom.style.top = `${top}px`;
    } else if (direction === "bottom" || direction === "top") {
      this.guideLineDom.style.position = "fixed";
      this.guideLineDom.style.width = `${width}px`;
      this.guideLineDom.style.height = `1px`;
      this.guideLineDom.style.left = `${left}px`;
      this.guideLineDom.style.top = `${y}px`;
    }
  };

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}
