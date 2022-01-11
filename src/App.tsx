import { FC, useEffect, useState } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import routes from "./routes"
import { authService } from "./services/authService.js"
import ErrorPage from "./pages/ErrorPage"
import TagManager from 'react-gtm-module'

const AuthGuards = (props: any) => {
  const token = authService.getToken();
  if (token && props.children) {
    return props.children;
  }

  return <Redirect to={"/login"} />;
};

const randomNumber = (max: number) => Math.floor(Math.random() * max)

const App: FC = () => {
  const [variant] = useState((localStorage.getItem('ROMINGO_EXPERIMENT_VAR') || randomNumber(3) ))

  useEffect(() => {
    localStorage.setItem('ROMINGO_EXPERIMENT_VAR', variant.toString())
    TagManager.initialize({ gtmId: 'GTM-MQC9J5B', dataLayer: { experimentVar: variant } })
  }, [])

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
      <Route path="/blog" component={() => {
          window.location.replace("https://blog.romingo.com/");
          return null;
        }}
      />
      <Route component={ErrorPage} />
    </Switch>
  );
};

export default App;
