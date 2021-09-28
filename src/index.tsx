import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
// import persistor from './redux/store'
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const muTheme = createTheme(theme);

const client = new ApolloClient({
  uri: "https://graphql-dot-eminent-helix-324520.ue.r.appspot.com/graphql",
  cache: new InMemoryCache(),
});

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_KEY as string);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={muTheme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
