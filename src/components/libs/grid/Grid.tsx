import React from "react";
import classNames from "classnames";

interface GridItemProps {
  row:
    | number
    | {
        pos: number;
        span: number;
      };
  col:
    | number
    | {
        pos: number;
        span: number;
      };
  style?: React.CSSProperties & {
    msGridColumn?: string | number;
    msGridColumnSpan?: string | number;
    msGridRowSpan?: string | number;
    msGridRow?: string | number;
  };
  className?: string;
}

export default class GridItem extends React.PureComponent<
  GridItemProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> {
  render() {
    const { className, children, style = {}, col, row, ...reset } = this.props;
    const classes = classNames(`xy-grid-item`, className);

    if (typeof col === "object") {
      style.gridColumn = `${col.pos}${col.span ? `/ span ${col.span}` : ""}`;
      style.msGridColumn = `${col.pos}`;
      style.msGridColumnSpan = `${col.span}`;
    }
    if (typeof col === "number") {
      style.gridColumn = col;
      style.msGridColumn = col;
    }
    if (typeof row === "object") {
      style.gridRow = `${row.pos}${row.span ? `/ span ${row.span}` : ""}`;
      style.msGridRow = `${row.pos}`;
      style.msGridRowSpan = `${row.span}`;
    }
    if (typeof row === "number") {
      style.gridRow = row;
      style.msGridRow = row;
    }

    return (
      <div className={classes} style={style} {...reset}>
        {children}
      </div>
    );
  }
}
