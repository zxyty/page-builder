import React from "react";
import { DrawerLayoutGridType } from "@dva-redux/stores/drawerStore";
import GridLayout from "@components/libs/grid";
import Resizable from "xy-resizable";
import GridBuilder from "@components/gridBuilder";

const getGridLayoutTpl = (curr: DrawerLayoutGridType) => {
  return {
    rows: curr.rowsTemplate!,
    cols: curr.colsTemplate!,
  };
};

function gridRender(
  curr: DrawerLayoutGridType,
  allLayouts: DrawerLayoutGridType[]
) {
  const _this = this as InstanceType<typeof GridBuilder>;

  const childrenKeys = curr.children || [];

  const children = allLayouts.filter((c) => childrenKeys.includes(c.key));

  if (children.length) {
    const { rows, cols } = getGridLayoutTpl(curr);
    return (
      <GridLayout id={curr.key} rows={rows} cols={cols}>
        {children.map((c) => {
          return (
            <React.Fragment key={c.key}>
              {gridRender.call(this, c, allLayouts)}
            </React.Fragment>
          );
        })}
      </GridLayout>
    );
  }

  const rowConfig: any = curr.rowSpan
    ? { pos: curr.rowIndex, span: curr.rowSpan }
    : curr.rowIndex;
  const colConfig: any = curr.colSpan
    ? { pos: curr.colIndex, span: curr.colSpan }
    : curr.colIndex;

  // const resizeDireactions = [];

  // if (curr?.rowIndex! + (curr.rowSpan || 0) < parentRows?.length!) {
  //   resizeDireactions.push("bottom");
  // }
  // if (curr?.colIndex! + (curr.colSpan || 0) < parentCols?.length!) {
  //   resizeDireactions.push("right");
  // }

  return (
    <Resizable
      showGuideLine
      direction={["right", "bottom"]}
      enableAutoResize={false}
      onResizeEnd={_this.handleResizeEndGrid}
    >
      <GridLayout.Item
        className="builder-grid-item"
        row={rowConfig}
        col={colConfig}
        id={curr.key}
      >
        {curr.component || null}
      </GridLayout.Item>
    </Resizable>
  );
}

export default gridRender;
