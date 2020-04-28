import React from "react";
import classNames from "classnames";
import GridItem from "./Grid";

import "./index.less";

interface GridLayoutProps {
  gap?:
    | number
    | {
        row: number;
        col: number;
      };
  className?: string;
  cols: string | string[];
  rows: string | string[];
  style?: React.CSSProperties;
}

export default class GridLayout extends React.PureComponent<
  GridLayoutProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> {
  static Item = GridItem;

  render() {
    const {
      className,
      children,
      gap,
      style = {},
      cols,
      rows,
      ...rest
    } = this.props;
    const classes = classNames(`xy-grid-wrap`, className);

    if (typeof gap === "object") {
      Object.keys(gap)
        .filter(c => ["col", "row"].includes(c))
        .forEach(v => {
          style[`grid${v.replace(v[0], v[0].toUpperCase())}Gap`] = gap[v];
          // ie 不支持gap
        });
    }

    if (typeof gap === "number") {
      style.gridGap = gap;
    }

    // 生成多少行多少列
    if (Array.isArray(cols)) {
      style.gridTemplateColumns = cols.join(" ");
      style.msGridColumns = cols.join(" ");
    }
    if (typeof cols === "string") {
      style.gridTemplateColumns = cols;
      style.msGridColumns = cols;
    }
    if (Array.isArray(rows)) {
      style.gridTemplateRows = rows.join(" ");
      style.msGridRows = rows.join(" ");
    }
    if (typeof rows === "string") {
      style.msGridRows = rows;
    }

    return (
      <div className={classes} style={style} {...rest}>
        {children}
      </div>
    );
  }
}
