import { DRAWER_NAMESPACE } from "@dva-redux/namespace";
import initStore, {
  DrawerStoreType,
  DrawerLayoutGridType
} from "@dva-redux/stores/drawerStore";
import drawerActions, {
  actions,
  ChangeGridSizePayloadType
} from "@dva-redux/actions/drawerActions";

const model = {
  namespace: DRAWER_NAMESPACE,
  state: initStore,
  subscriptions: {},
  reducers: {
    [actions.setState](state, { payload }) {
      return Object.assign({}, state, payload);
    }
  },
  effects: {
    *[actions.changeGridSize]({ payload }, { put, select }) {
      // ChangeGridSizePPayloadType
      const {
        resizedX,
        resizedY,
        currDom
      } = payload as ChangeGridSizePayloadType;
      const { id: currDomKey } = currDom;

      const { layouts } = (yield select(
        state => state[DRAWER_NAMESPACE]
      )) as DrawerStoreType;

      // 获取parents
      // 从子节点往父节点查询容器进行resize
      const parents: DrawerLayoutGridType[] = [];
      let currentGridItem: DrawerLayoutGridType | undefined = layouts.find(
        c => c.key === currDomKey
      );
      parents.push(currentGridItem!);

      while (currentGridItem) {
        const parentItem = currentGridItem!.parentKey
          ? // eslint-disable-next-line no-loop-func
            layouts.find(c => c.key === currentGridItem!.parentKey)
          : undefined;
        if (parentItem) {
          parents.push(parentItem);
        }
        currentGridItem = parentItem;
      }

      parents.forEach((c, i) => {
        if (i >= parents.length - 1) {
          return;
        }

        const allChildren = layouts.filter(
          d => d.parentKey === parents[i + 1].key
        );

        // eslint-disable-next-line prettier/prettier
        const matrix = [
          [0, 0, 0], // col
          [0, 0, 0] // row
        ];

        // Todo 高度自适应情况 保留 1fr
        allChildren.forEach(d => {
          const { width: cWidth, height: cHeight } = document
            .querySelector(`#${d.key}`)
            ?.getBoundingClientRect()!;

          if (!d.colSpan || d.colSpan <= 1) {
            matrix[0][d.colIndex! - 1] = cWidth;
          }
          if (!d.rowSpan || d.rowSpan <= 1) {
            matrix[1][d.rowIndex! - 1] = cHeight!;
          }
        });

        const colsTemplate = matrix[0].filter(d => d).map(d => `${d}px`);
        const rowsTemplate = matrix[1].filter(d => d).map(d => `${d}px`);

        if (resizedX) {
          const shouldIndex = c.colIndex! + (c.colSpan || 0) - 1;
          const newWidth = parseInt(colsTemplate[shouldIndex]!, 10) + resizedX;
          colsTemplate[shouldIndex] = newWidth <= 0 ? "0px" : `${newWidth}px`;

          parents[i + 1].colsTemplate = colsTemplate;
        } else {
          const shouldIndex = c.rowIndex! + (c.rowSpan || 0) - 1;
          const newHeight = parseInt(rowsTemplate[shouldIndex]!, 10) + resizedY;
          rowsTemplate[shouldIndex] = newHeight <= 0 ? "0px" : `${newHeight}px`;

          parents[i + 1].rowsTemplate = rowsTemplate;
        }
      });

      // Todo 从父节点往子节点查询容器进行resize

      yield put(
        drawerActions.setState.model({
          layouts: [...layouts]
        })
      );
    }
  }
};

export default model;
