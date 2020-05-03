import { actionsFactory } from "@dva-redux";
import { DRAWER_NAMESPACE } from "@dva-redux/namespace";

export const actions = {
  setState: "setState",
  changeGridSize: "changeGridSize"
};

const a = actionsFactory(actions, DRAWER_NAMESPACE);

a.changeGridSize();
