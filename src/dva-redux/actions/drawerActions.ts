import { actionsFactory } from "@dva-redux";
import { DRAWER_NAMESPACE } from "@dva-redux/namespace";

export const actions = {
  setState: "setState",
  changeGridSize: "changeGridSize",
  selectGridSpan: "selectGridSpan",
};

export interface ChangeGridSizePayloadType {
  resizedX: number;
  resizedY: number;
  initWidth: number;
  initHeight: number;
  currDom: HTMLElement;
}

export default actionsFactory(actions, DRAWER_NAMESPACE);
