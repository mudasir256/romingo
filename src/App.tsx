import { FC } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import routes from "./routes";
import { authService } from "./services/authService.js";

const muTheme = createTheme(theme);

const hist = createBrowserHistory();

const AuthGuards = (props: any) => {
	
	const token = authService.getToken();
	if (token && props.children) {
		return props.children;
	}

	return <Redirect to={"/login"} />
}

const App: FC = () => {
	return (
		<ThemeProvider theme={muTheme}>
			<Router history={hist}>
				<Switch>
					{routes.map((route, key) => {
						if (!route.requireAuth)
							return (
								<Route exact path={route.path} component={route.component} key={key} />
							)
						else
							return (
								<AuthGuards key={key}>
									<Route exact path={route.path} component={route.component} />
								</AuthGuards>
							)
					})}
				</Switch>
			</Router>
		</ThemeProvider>
	);
};

export default App;
