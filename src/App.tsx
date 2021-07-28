import { FC } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

const muTheme = createTheme(theme);

const App: FC = () => {
  return (
    <ThemeProvider theme={muTheme}>
      <div />
    </ThemeProvider>
  );
};

export default App;
