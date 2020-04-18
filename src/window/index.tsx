import dva from "dva";
import createLoading from "dva-loading";
import * as models from "@dva-redux/models";
import { createBrowserHistory } from "history";
import { AppIndexRouter } from "../router/_window";

const app = dva({
  history: createBrowserHistory()
});

// 2. Plugins
app.use(createLoading());

// 3. Model
Object.values(models).forEach(m => {
  app.model(m);
});

// 4. Router
app.router(AppIndexRouter);

// 5. Start
app.start("#root");
