import React from "react";
import Controls from "@components/controls";
import Ruler from "@components/ruler";
import Resizable from "xy-resizable";
import "./index.less";

interface HomeProps {}

export default class Home extends React.PureComponent<HomeProps> {
  rulerRefCom = React.createRef<Ruler>();

  render() {
    return (
      <div className="page-layout">
        <Controls />

        <div className="ruler-layout">
          <div className="ruler-layout-header">
            <Resizable
              onResizeEnd={() => {
                this.rulerRefCom.current?.resetCanvas();
              }}
              showGuideLine
              direction="right"
            >
              <div className="ruler-placeholder" />
            </Resizable>
            <div className="ruler-x-wrap">
              <Ruler direction="x" ref={this.rulerRefCom} />
            </div>
            <Resizable
              onResizeEnd={() => {
                this.rulerRefCom.current?.resetCanvas();
              }}
              showGuideLine
              direction="left"
            >
              <div className="ruler-placeholder" />
            </Resizable>
          </div>

          <div className="ruler-y-wrap">
            <Ruler direction="y" />
          </div>
        </div>
      </div>
    );
  }
}
