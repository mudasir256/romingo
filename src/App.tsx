import { FC, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { GetCities } from "./constants/constants";
import { setList } from "./store/cityListReducer";
import { authService } from "./services/authService.js";
import ErrorPage from "./pages/ErrorPage";
import TagManager from "react-gtm-module";
import { Message } from "@mui/icons-material";
import Routes from "./routes";

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
      events: {
        search: "Search",
        selectProperty: "Select Property",
        selectRoom: "Select Room",
        checkoutSuccess: "Checkout Success",
        checkoutFail: "Checkout Failure",
      },
    });
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setList([...data?.cities]));
    }
  }, [data]);


  return (
    <>
      <Routes />
      {screen.height > 700 && (
        <div
          id="CUSTOM"
          style={{
            padding: ".5rem 1rem .5rem .5rem",
            fontFamily: "Roboto",
            zIndex: 1501,
            position: "fixed",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            bottom: "1.25rem",
            right: "1.25rem",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
            background: "#03989Ebf",
            border: "1px solid #a6dbe5",
            WebkitBackdropFilter: "blur(12px)",
            backdropFilter: "blur(12px)",
            fontSize: "14px",
            color: "#fff",
          }}
        >
          <Message sx={{ fontSize: "18px", color: "#fff", mr: ".5rem" }} />
          Chat with us
        </div>
      )}
    </>
  );
};

export default App;
