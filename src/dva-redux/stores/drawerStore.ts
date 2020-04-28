import { getGridConfig, testData } from "@layout/utils";

export interface DrawerLayoutGridType {
  key: string;
  colIndex?: number;
  rowIndex?: number;
  rowSpan?: number;
  colSpan?: number;

  width?: number;
  height?: number;

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
      children: defaultChildGrid.map(c => c.key)
    },
    ...defaultChildGrid,
    ...testData
  ]
};

export default initStore;
