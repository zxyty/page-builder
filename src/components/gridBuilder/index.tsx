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

@connect(state => ({
  drawerModel: state[DRAWER_NAMESPACE]
}))
export default class GridBuilder extends React.PureComponent<
  GridBuilderProps & DispatchType
> {
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
        currDom
      })
    );
    // if resized x?
    // if (resizedX) {
    //   const changeWidth = resizedX + initWidth;
    //   const maxWidth = currDom.parentElement?.getBoundingClientRect().width!;
    //   const currWidth =
    //     changeWidth >= maxWidth ? maxWidth : changeWidth <= 0 ? 0 : changeWidth;
    //   currDom.style.width = `${currWidth}px`;
    // }
    // if (resizedY) {
    //   const changeHeight = resizedY + initHeight;
    //   const currHeight = changeHeight <= 0 ? 0 : changeHeight;
    //   currDom.style.height = `${currHeight}px`;
    // }
  };

  render() {
    const { drawerModel } = this.props;
    return gridRender.call(this, drawerModel?.layouts[0], drawerModel?.layouts);
  }
}
