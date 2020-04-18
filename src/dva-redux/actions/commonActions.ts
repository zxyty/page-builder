import { actionsFactory } from "@dva-redux";
import { COMMON_NAMESPACE } from "@dva-redux/namespace";

export const actions = {
  setState: "setState",
};

export default actionsFactory(actions, COMMON_NAMESPACE);
