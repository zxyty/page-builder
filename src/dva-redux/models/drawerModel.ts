import { DRAWER_NAMESPACE } from "@dva-redux/namespace";
import initStore from "@dva-redux/stores/drawerStore";

const model = {
  namespace: DRAWER_NAMESPACE,
  state: initStore,
  subscriptions: {},
  reducers: {},
  effects: {
    *init(_, __) {}
  }
};

export default model;
