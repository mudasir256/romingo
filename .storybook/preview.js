import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { addDecorator } from "@storybook/react";
import { theme } from "../src/theme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../src/redux/store";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const muTheme = createTheme(theme);

addDecorator((story) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={muTheme}>{story()}</ThemeProvider>
    </PersistGate>
  </Provider>
));
