import React from "react";
import Controls from "@components/controls";
import Ruler from "@components/ruler";

import "./index.less";
import Resizeable from "@components/libs/resizeable";

interface HomeProps {}

export default class Home extends React.PureComponent<HomeProps> {
  rulerRefCom = React.createRef<Ruler>();

  render() {
    return (
      <div className="page-layout">
        <Controls />

        <div className="ruler-layout">
          <div className="ruler-layout-header">
            <Resizeable
              onResizeEnd={() => {
                this.rulerRefCom.current?.resetCanvas();
              }}
              showGuideLine
              direction="right"
            >
              <div className="ruler-placeholder" />
            </Resizeable>
            <div className="ruler-x-wrap">
              <Ruler direction="x" ref={this.rulerRefCom} />
            </div>
            <Resizeable
              onResizeEnd={() => {
                this.rulerRefCom.current?.resetCanvas();
              }}
              showGuideLine
              direction="left"
            >
              <div className="ruler-placeholder" />
            </Resizeable>
          </div>

          <div className="ruler-y-wrap">
            <Ruler direction="y" />
          </div>
        </div>
      </div>
    );
  }
}
