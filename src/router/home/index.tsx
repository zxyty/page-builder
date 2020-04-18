import React from "react";
import { History } from "history";
import { HistoryContext } from "@components/context/HistoryContext";
import { connect } from "dva";
import { DispatchType } from "@components/Types";

interface HomeProps {
  history: History;
}

@connect()
export default class Home extends React.PureComponent<
  HomeProps & DispatchType
> {
  render() {
    const { history } = this.props;
    return (
      <HistoryContext.Provider value={{ history }}>
        <div>home</div>
      </HistoryContext.Provider>
    );
  }
}
