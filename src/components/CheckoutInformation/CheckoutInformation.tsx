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
// import { makeStyles } from "@mui/styles"
import { gql, useQuery, useLazyQuery } from "@apollo/client";
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

  const [getClientSecret, { data, error, loading }] = useLazyQuery(gql`${GetStripeClientSecret}`);

  const [clientSecret, setClientSecret] = useState("");

  const handleCheck = () => {
    setCheckState(!checkState);
  };

  React.useEffect(() => {
    if (data && data.stripePaymentIntentClientSecret) {
      setClientSecret(data.stripePaymentIntentClientSecret);
    }
  }, [getClientSecret, data, loading]);

  const submitStripe = async() => {

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement
      }
    });

    console.log(paymentIntent);
  }

  React.useEffect(() => {
    if (clientSecret) {
      submitStripe();
    }
  }, [clientSecret])

  const handleSubmit = async() => {
    getClientSecret({variables: {amount: price}});
    // if (!stripe || !elements) {
    //   return;
    // }

    // const cardElement = elements.getElement(CardElement);

    // if (!cardElement) {
    //   return;
    // }

    

    // console.log(paymentIntent);
  }

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
              placeholder="John Doe"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 3, sm: 2 }}>
            <TextField
              variant="outlined"
              type="text"
              label={"Email Address"}
              placeholder="John@email.com"
              fullWidth={true}
              sx={{
                mt: {
                  sm: 0,
                  xs: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 2, sm: 3 }}>
            <TextField
              variant="outlined"
              type="text"
              label={"Phone Number"}
              placeholder="xxx-xxx-xxxx"
              fullWidth={true}
              sx={{
                mt: {
                  sm: 0,
                  xs: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 4, sm: 4 }}>
            <TextField
              variant="outlined"
              type="date"
              label={"Estimated Check In Time"}
              defaultValue=""
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
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
          }}
        >
          Payment Information
        </Typography>
        <Grid container spacing={2} sx={{ py: 2 }}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              type="text"
              label={"Name on Credit Card"}
              placeholder="John Doe"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <CardElement 
              options={{
                style: {
                  base: {
                    padding: "18.5px 14px",
                  }
                }
              }} 
            />
          </Grid>
          <Grid item xs={7} sm={6} md={4}>
            <TextField
              variant="outlined"
              type="date"
              label={"Expiration Date"}
              defaultValue={""}
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                mt: {
                  sm: 0,
                  xs: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={5} sm={4} md={3}>
            <TextField
              variant="outlined"
              type="text"
              label={"CVV"}
              fullWidth={true}
              sx={{
                mt: {
                  sm: 0,
                  xs: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox
                checked={checkState}
                color="primary"
                onChange={handleCheck}
              />
              <Typography variant="body2">
                I agree to the booking <Link href="#">terms of service</Link>{" "}
                and cancellation policy.
              </Typography>
            </Box>
            <Hidden smUp>
              {finePrint !== null && (
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "secondary.main",
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: { xs: "85%", sm: "100%" },
                      textTransform: "capitalize",
                      mt: 0.5,
                    }}
                  >
                    {finePrint.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                    }}
                  >
                    {finePrint.description}
                  </Typography>
                </Box>
              )}
            </Hidden>
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
          <Hidden smDown>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "90%",
                  color: "text.primary",
                  textAlign: "center",
                }}
              >
                Your card will be authorized for $470.30, but you will not be
                charged until you check-in.
              </Typography>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckoutInformation;
