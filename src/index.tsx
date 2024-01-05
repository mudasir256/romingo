import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { createBrowserHistory } from "history";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";
import { createTheme, ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from "@mui/material/styles";
import { Router } from "react-router-dom";
import { theme } from "./theme";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

import "./index.scss";
import { onError } from "@apollo/client/link/error";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

// const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

if(!window.location.host.startsWith('www')) {
  window.location = window.location.protocol 
    + "//"
    + "www."
    + window.location.host
    + window.location.pathname;
}

const hist = createBrowserHistory();

const muTheme = createTheme(adaptV4Theme(theme));

const client = new ApolloClient({
  uri: process.env.REACT_APP_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Property: {
        keyFields: ["id", "lowestAveragePrice"],
      },
    },
  }),
  // link: from([errorLink, httpLink]),
  shouldBatch: true,
  connectToDevTools: true,
});

// const stripePromise = loadStripe(
//   process.env.REACT_APP_STRIPE_CLIENT_KEY as string
// );

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muTheme}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
  {/*            <Elements stripe={stripePromise}>
  */}              <Router history={hist}>
                  <App />
                </Router>
  {/*            </Elements>*/}
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
