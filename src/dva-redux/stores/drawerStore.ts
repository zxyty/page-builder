import { getGridConfig, testData } from "@layout/utils";

export interface DrawerLayoutGridType {
  key: string;
  colIndex?: number;
  rowIndex?: number;
  rowSpan?: number;
  colSpan?: number;

  width?: number;
  height?: number;

  colsTemplate?: string[];
  rowsTemplate?: string[];

  component?: any;

  children?: string[]; // key
  parentKey?: string;
}

export interface DrawerStoreType {
  layouts: DrawerLayoutGridType[];
}
const defaultChildGrid = getGridConfig("init");

const initStore: DrawerStoreType = {
  layouts: [
    {
      key: "init",
      children: defaultChildGrid.map(c => c.key),
      colsTemplate: ["1fr", "1fr", "1fr"],
      rowsTemplate: ["1fr", "1fr", "1fr"]
    },
    ...defaultChildGrid,
    ...testData
  ]
};

export default initStore;
