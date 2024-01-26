import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { createBrowserHistory } from "history";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./theme";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

import "./index.scss";
import { onError } from "@apollo/client/link/error";

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

declare module '@mui/styles' {
  interface DefaultTheme extends Theme {}
}


if(!window.location.host.startsWith('www')) {
  window.location = window.location.protocol 
    + "//"
    + "www."
    + window.location.host
    + window.location.pathname;
}

const hist = createBrowserHistory();

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
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {/* <Elements stripe={stripePromise}> */}              
                <Router>
                  <App />
                </Router>
                {/* </Elements> */}
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
