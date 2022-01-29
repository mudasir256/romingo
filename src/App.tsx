import { FC, useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { GetCities } from "./constants/constants";
import { setList } from "./store/cityListReducer";
import routes from "./routes";
import { authService } from "./services/authService.js";
import ErrorPage from "./pages/ErrorPage";
import TagManager from "react-gtm-module";

const AuthGuards = (props: any) => {
  const token = authService.getToken();
  if (token && props.children) {
    return props.children;
  }

  return <Redirect to={"/login"} />;
};

const randomNumber = (max: number) => Math.floor(Math.random() * max);

const App: FC = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(
    gql`
      ${GetCities}
    `
  );
  const [variant] = useState(
    localStorage.getItem("ROMINGO_EXPERIMENT_VAR") || randomNumber(3)
  );

  useEffect(() => {
    localStorage.setItem("ROMINGO_EXPERIMENT_VAR", variant.toString());
    TagManager.initialize({
      gtmId: "GTM-MQC9J5B",
      dataLayer: { experimentVar: variant },
    });
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setList([...data?.cities]));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      dispatch(setList([...data?.cities]));
    }
  }, [data]);

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
