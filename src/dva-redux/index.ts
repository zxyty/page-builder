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

export const actionsFactory = (actions: Record<string, any>, ns: string) => {
  actions = Object.assign({}, actions);
  Object.values(actions).forEach((value: string) => {
    actions[value] = actionCreatorFactory(`${ns}/${value}`, "payload", "extra");
    actions[value].model = actionCreatorFactory(`${value}`, "payload", "extra");
  });
  return actions;
};
