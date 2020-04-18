import { createContext } from "react";
import { History } from "history";

type HistoryContextType = {
  history?: History;
};
export const HistoryContext = createContext<HistoryContextType>({});
