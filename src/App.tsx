import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import routes from "./routes";
import { authService } from "./services/authService.js";
import ErrorPage from "./pages/ErrorPage";

// eslint-disable-next-line
const AuthGuards = (props: any) => {
  const token = authService.getToken();
  if (token && props.children) {
    return props.children;
  }

  return <Redirect to={"/login"} />;
};

const App: FC = () => {
  return (
    <Switch>
      {routes.map((route, key) => {
        if (!route.requireAuth)
          return (
            <Route
              exact
              path={route.path}
              component={route.component}
              key={key}
            />
          );
        else
          return (
            <AuthGuards key={key}>
              <Route exact path={route.path} component={route.component} />
            </AuthGuards>
          );
      })}
      <Route
        path="/blog"
        component={() => {
          window.location.replace("https://blog.romingo.com/");
          return null;
        }}
      />
      <Route component={ErrorPage} />
    </Switch>
  );
};

export default App;
