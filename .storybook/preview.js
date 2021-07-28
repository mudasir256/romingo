import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { addDecorator } from "@storybook/react";
import { theme } from "../src/theme";

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
  <ThemeProvider theme={muTheme}>{story()}</ThemeProvider>
));
