export const actionCreatorFactory = (type, ...argNames) => (...args) => {
  const action = {
    type
  };
  const defaultArg = "payload";
  if (!argNames.length) {
    [action[defaultArg]] = args;
  } else {
    argNames.forEach((arg, index) => {
      action[arg] = args[index];
    });
  }
  return action;
};

type DispatchFunType = (payload?: any) => void;
type ActionType<T> = { [P in keyof T]: string };
type ActionCreateType<T> = {
  [P in keyof T]: DispatchFunType & {
    model: DispatchFunType;
  };
};

export function actionsFactory<T extends ActionType<T>>(
  actions: ActionType<T>,
  ns: string
): ActionCreateType<T> {
  actions = Object.assign({}, actions);
  Object.values(actions).forEach((value: string) => {
    actions[value] = actionCreatorFactory(`${ns}/${value}`, "payload", "extra");
    actions[value].model = actionCreatorFactory(`${value}`, "payload", "extra");
  });
  return actions as any;
}
