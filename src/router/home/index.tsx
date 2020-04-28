import React from "react";
import Controls from "@components/controls";
import "./index.less";
import RulerLayout from "@layout/RulerLayout";

interface HomeProps {}

export default class Home extends React.PureComponent<HomeProps> {
  render() {
    return (
      <div className="page-layout">
        <Controls />

        <RulerLayout />
      </div>
    );
  }
}
