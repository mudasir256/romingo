import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { createBrowserHistory } from "history";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Router } from "react-router-dom";
import { theme } from "./theme";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./index.scss";

const hist = createBrowserHistory();

const muTheme = createTheme(theme);

const client = new ApolloClient({
  uri: process.env.REACT_APP_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Property: {
        keyFields: ["id", "lowestAveragePrice"],
      },
    },
  }),
  connectToDevTools: true,
});

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_CLIENT_KEY as string
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={muTheme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Elements stripe={stripePromise}>
              <Router history={hist}>
                <App />
              </Router>
            </Elements>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
