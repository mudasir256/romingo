import { LicenseInfo } from '@mui/x-license-pro';
import { FC, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { GetCities } from "./constants/constants";
import { setList } from "./store/cityListReducer";
import { authService } from "./services/authService.js";
import TagManager from "react-gtm-module";
import Routes from "./routes";

LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE);

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
  const sp = new URLSearchParams(window.location.search);

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
    if (sp.get('utm_source')) {
      localStorage.setItem('utm_source', sp.get('utm_source'))
    }
    if (sp.get('utm_medium')) {
      localStorage.setItem('utm_medium', sp.get('utm_medium'))
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setList([...data?.cities]));
    }
  }, [data]);


  return (
    <>
      <Routes />
    </>
  );
};

export default App;
