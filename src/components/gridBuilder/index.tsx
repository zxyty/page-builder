/* eslint-disable no-nested-ternary */
import React from "react";
import { connect } from "dva";
import { DRAWER_NAMESPACE } from "@dva-redux/namespace";
import { DispatchType } from "@components/Type";
import { DrawerStoreType } from "@dva-redux/stores/drawerStore";
import drawerActions from "@dva-redux/actions/drawerActions";
import gridRender from "./gridRender";

import "./index.less";

interface GridBuilderProps {
  drawerModel?: DrawerStoreType;
}

@connect((state) => ({
  drawerModel: state[DRAWER_NAMESPACE],
}))
export default class GridBuilder extends React.PureComponent<
  GridBuilderProps & DispatchType
> {
  componentDidMount() {
    window.document.addEventListener("mousedown", this.handleOnMouseDown);
  }

  componentWillUnmount() {
    window.document.removeEventListener("mousedown", this.handleOnMouseDown);
  }

  handleOnMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { clientX: initX, clientY: initY } = e;

    const startGrid = e.target;
    let endGrid;

    const box = document.createElement("div");
    box.id = "xy-grid-span-box";
    box.style.position = "fixed";
    box.style.background = "rgba(45,123,39,0.4)";
    document.body.appendChild(box);

    const moveHandler = (evt: MouseEvent) => {
      const { left, top, width, height } = getBoundary(evt);
      box.style.left = `${left}px`;
      box.style.top = `${top}px`;
      box.style.width = `${width}px`;
      box.style.height = `${height}px`;
    };
    const upHandler = (evt: MouseEvent) => {
      getBoundary(evt);
      const { left, top, width, height } = getBoundary(evt);
      box.style.left = `${left}px`;
      box.style.top = `${top}px`;
      box.style.width = `${width}px`;
      box.style.height = `${height}px`;

      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
      document.body.removeChild(box);

      endGrid = evt.target;
      this.handleSelectAreaGrid(startGrid as HTMLElement, endGrid);
    };

    const getBoundary = (evt: MouseEvent) => {
      const { clientX, clientY } = evt;
      let left = initX;
      let top = initY;
      const width = Math.abs(clientX - initX);
      const height = Math.abs(clientY - initY);
      if (initX > clientX) {
        left = clientX;
      }
      if (initY > clientY) {
        top = clientY;
      }

      return {
        left,
        top,
        width,
        height,
      };
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  };

  handleSelectAreaGrid = (startTarget: HTMLElement, endTarget: HTMLElement) => {
    const { dispatch } = this.props;
    dispatch!(
      drawerActions.selectGridSpan({
        startTarget,
        endTarget,
      })
    );
  };

  handleResizeEndGrid = (
    resizedX: number,
    resizedY: number,
    initWidth: number,
    initHeight: number,
    currDom: HTMLElement
  ) => {
    const { dispatch } = this.props;
    dispatch!(
      drawerActions.changeGridSize({
        resizedX,
        resizedY,
        initWidth,
        initHeight,
        currDom,
      })
    );
  };

  render() {
    const { drawerModel } = this.props;
    return gridRender.call(this, drawerModel?.layouts[0], drawerModel?.layouts);
  }
}
