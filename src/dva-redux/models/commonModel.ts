import { COMMON_NAMESPACE } from "@dva-redux/namespace";

const model = {
  namespace: COMMON_NAMESPACE,
  state: {},
  subscriptions: {},
  reducers: {},
  effects: {
    *init(_, __) {}
  }
};

export default model;
