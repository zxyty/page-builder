export const getGridConfig = (parentKey = "init") => {
  return [
    {
      key: `${parentKey}-1-1`,
      colIndex: 1,
      rowIndex: 1,
      parentKey
    },
    {
      key: `${parentKey}-1-2`,
      rowIndex: 1,
      colIndex: 2,
      parentKey,
      children: testData.map(c => c.key),
      colsTemplate: ["1fr", "1fr", "1fr"],
      rowsTemplate: ["1fr", "1fr", "1fr"]
    },
    {
      key: `${parentKey}-1-3`,
      rowIndex: 1,
      colIndex: 3,
      parentKey
    },
    {
      key: `${parentKey}-2-1`,
      rowIndex: 2,
      colIndex: 1,
      parentKey
    },
    {
      key: `${parentKey}-2-2`,
      colIndex: 2,
      rowIndex: 2,
      parentKey
    },
    {
      key: `${parentKey}-2-3`,
      rowIndex: 2,
      colIndex: 3,
      parentKey
    },
    {
      key: `${parentKey}-3-1`,
      rowIndex: 3,
      colIndex: 1,
      parentKey
    },
    {
      key: `${parentKey}-3-2`,
      rowIndex: 3,
      colIndex: 2,
      parentKey
    },
    {
      key: `${parentKey}-3-3`,
      colIndex: 3,
      rowIndex: 3,
      parentKey
    }
  ];
};
export const testData = [
  {
    key: `init-1-2-1-1`,
    colIndex: 1,
    rowIndex: 1,
    parentKey: "init-1-2"
  },
  {
    key: `init-1-2-1-2`,
    rowIndex: 1,
    colIndex: 2,
    parentKey: "init-1-2"
  },
  {
    key: `init-1-2-1-3`,
    rowIndex: 1,
    colIndex: 3,
    parentKey: "init-1-2"
  },
  {
    key: `init-1-2-2-1`,
    rowIndex: 2,
    colIndex: 1,
    parentKey: "init-1-2"
  },
  {
    key: `init-1-2-2-2`,
    colIndex: 2,
    rowIndex: 2,
    parentKey: "init-1-2"
  },
  {
    key: `init-1-2-2-3`,
    rowIndex: 2,
    colIndex: 3,
    parentKey: "init-1-2"
  },
  {
    key: `init-1-2-3-1`,
    rowIndex: 3,
    colIndex: 1,
    parentKey: "init-1-2"
  },
  {
    key: `init-1-2-3-2`,
    rowIndex: 3,
    colIndex: 2,
    parentKey: "init-1-2"
  },
  {
    key: `init-1-2-3-3`,
    colIndex: 3,
    rowIndex: 3,
    parentKey: "init-1-2"
  }
];
