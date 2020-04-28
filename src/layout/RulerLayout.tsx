import React from "react";
import Resizable from "xy-resizable";
import Ruler from "@components/ruler";
import GridBuilder from "@components/gridBuilder";

export default class RulerLayout extends React.PureComponent {
  rulerRefCom = React.createRef<Ruler>();

  render() {
    return (
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
            <div className="ruler-placeholder last" />
          </Resizable>
        </div>

        <div className="ruler-layout-contianer">
          <div className="ruler-y-wrap">
            <Ruler direction="y" />
          </div>

          <div className="stage-wrap">
            <div className="drawer-wrap">
              <GridBuilder />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
