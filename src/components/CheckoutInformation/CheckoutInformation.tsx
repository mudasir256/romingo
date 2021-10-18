import React, { FC, useState } from "react";
import { CSSObject } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import MuiPhoneNumber from "material-ui-phone-number";
import { gql, useLazyQuery } from "@apollo/client";
import { GetStripeClientSecret } from "../../constants/constants";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

interface Props {
  sx?: CSSObject;
  finePrint?: {
    title: string;
    description: string;
  };
  price?: number;
}

const CheckoutInformation: FC<Props> = ({ sx, finePrint = null, price }) => {
  const [checkState, setCheckState] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [getClientSecret, { data, loading }] = useLazyQuery(
    gql`
      ${GetStripeClientSecret}
    `
  );

  const [clientSecret, setClientSecret] = useState("");

  const handleCheck = () => {
    setCheckState(!checkState);
  };

  React.useEffect(() => {
    if (data && data.stripePaymentIntentClientSecret) {
      setClientSecret(data.stripePaymentIntentClientSecret);
    }
  }, [getClientSecret, data, loading]);

  const submitStripe = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    // eslint-disable-next-line
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    console.log(paymentIntent);
  };

  React.useEffect(() => {
    if (clientSecret) {
      submitStripe();
    }
  }, [clientSecret]);

  const handleSubmit = async () => {
    getClientSecret({ variables: { amount: price } });
    // if (!stripe || !elements) {
    //   return;
    // }

    // const cardElement = elements.getElement(CardElement);

    // if (!cardElement) {
    //   return;
    // }

    // console.log(paymentIntent);
  };

  const handleOnChange = () => {
    console.log("Phone changed");
  };

  return (
    <Box sx={sx}>
      <Box
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          borderRadius: 3,
          border: "1px solid #DDD",
          pt: 2,
          pb: 2.5,
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            textAlign: "center",
          }}
        >
          Traveller Information
        </Typography>
        <Grid container spacing={2} sx={{ py: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              type="text"
              label={"Traveller's Full Name"}
              placeholder="Full Name"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              type="email"
              label={"Email Address"}
              placeholder="Email"
              fullWidth={true}
              sx={{
                mt: {
                  sm: 0,
                  xs: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPhoneNumber
              defaultCountry={"us"}
              onChange={handleOnChange}
              variant="outlined"
              label={"Phone Number"}
              fullWidth={true}
              disableAreaCodes
              sx={{
                mt: {
                  sm: 0,
                  xs: 1,
                },
              }}
            />
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            textAlign: "center",
            mb: 2,
          }}
        >
          Payment Information
        </Typography>
        <Grid item xs={12}>
          <Box
            className="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1hy0p19-MuiInputBase-root-MuiOutlinedInput-root"
            sx={{ border: "1px solid rgba(0, 0, 0, 0.2)" }}
          >
            <CardElement
              options={{
                iconStyle: "solid",
                classes: {
                  base:
                    "MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input",
                },
                style: {
                  base: {
                    fontFamily: `"Work Sans", "Montserrat", sans-serif`,
                    iconColor: "#03989E",
                    fontSize: "16px",
                    color: "rgba(0, 0, 0, 0.78)",
                    "::placeholder": {
                      color: "rgba(0, 0, 0, 0.58)",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src="/images/safe-checkout.jpeg"
              draggable="false"
              sx={{
                width: "400px",
                maxWidth: "100%",
                mt: 2,
                mb: 1,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              mb: 2,
            }}
          >
            <Checkbox
              checked={checkState}
              color="primary"
              onChange={handleCheck}
            />
            <Typography variant="body2">
              I agree to the booking <Link href="#">terms of service</Link> and
              cancellation policy.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth={true}
            size="large"
            color="primary"
            onClick={handleSubmit}
          >
            <Typography variant="h6">Book It</Typography>
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckoutInformation;
