import React, { FC, useState, useEffect } from "react";
import { CSSObject } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import MuiPhoneNumber from "material-ui-phone-number";
import { gql, useMutation } from "@apollo/client";
import { CreateBooking, CreatePaymentIntent } from "../../constants/constants";
import { useSelector } from "react-redux";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

interface Props {
  sx?: CSSObject;
  finePrint?: {
    title: string;
    description: string;
  };
  priceKey: string;
  price: number;
}

const CheckoutInformation: FC<Props> = ({
  sx,
  finePrint = null,
  price,
  priceKey,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [formError, setFormError] = useState("");
  const [checkState, setCheckState] = useState(false);
  const { occupants } = useSelector((state: any) => state.searchReducer.search);
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: 1,
    phone: "",
  });

  const [
    createPI,
    { data: piData, error: piError, loading: piLoading },
  ] = useMutation(
    gql`
      ${CreatePaymentIntent}
    `
  );

  const [
    createBooking,
    { data: createData, error: createError, loading: createLoading },
  ] = useMutation(
    gql`
      ${CreateBooking}
    `
  );

  const handleCheck = () => {
    setCheckState(!checkState);
  };

  const updateForm = (e: any) => {
    setCheckoutForm({
      ...checkoutForm,
      [e?.target?.name]: e?.target?.value,
    });
  };

  console.log(occupants);

  const submitStripe = async () => {
    setFormError("");
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }
    if (checkoutForm.firstName.length === 0) {
      setFormError("*Primary traveller first name is required");
      return;
    }
    if (checkoutForm.lastName.length === 0) {
      setFormError("*Primary traveller last name is required");
      return;
    }
    if (checkoutForm.email.length === 0) {
      setFormError("*Primary traveller email is required");
      return;
    }
    if (checkoutForm.phone.length === 0) {
      setFormError("*Primary traveller phone is required");
      return;
    }
    if (!checkState) {
      setFormError(
        "*Agreement to the terms of service and cancellation policy is required for booking"
      );
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );
      if (error) {
        console.log(error);
        return;
      }
      const adults: { firstName: string; lastName: string }[] = [];
      const children: {
        firstName: string;
        lastName: string;
        age: number;
      }[] = [];

      Array.from(Array(occupants.adults)).forEach(() => {
        adults.push({
          firstName: checkoutForm.firstName,
          lastName: checkoutForm.lastName,
        });
      });

      Array.from(Array(occupants.childrenAge.length)).forEach((x_, i) => {
        children.push({
          firstName: checkoutForm.firstName,
          lastName: checkoutForm.lastName,
          age: occupants.childrenAge[i],
        });
      });

      if (paymentIntent) {
        createBooking({
          variables: {
            createBookingInput: {
              paymentIntentId: paymentIntent.id,
              email: checkoutForm.email,
              mobile: {
                countryCallingCode: 1,
                number: checkoutForm.phone,
              },
              adults,
              children,
              noOfDogs: occupants.dogs,
            },
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(createError);

  const updatePhone = (e: any) => {
    setCheckoutForm({
      ...checkoutForm,
      phone: e.replace(/\s+/g, "-").replace(/[{()}]/g, ""),
    });
  };

  useEffect(() => {
    createPI({
      variables: { createPaymentIntentInput: { priceKey } },
    });
  }, []);

  useEffect(() => {
    if (piData?.createPaymentIntent) {
      setClientSecret(piData?.createPaymentIntent?.paymentIntent?.clientSecret);
    }
  }, [piData]);

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
          Primary Traveller Information
        </Typography>
        <Grid container spacing={2} sx={{ py: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              type="text"
              name="firstName"
              label={"Traveller's First Name"}
              placeholder="First Name"
              onChange={updateForm}
              fullWidth={true}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              type="text"
              name="lastName"
              label={"Traveller's Last Name"}
              placeholder="Last Name"
              onChange={updateForm}
              fullWidth={true}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              type="email"
              name="email"
              label={"Email Address"}
              placeholder="Email"
              fullWidth={true}
              onChange={updateForm}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPhoneNumber
              defaultCountry={"us"}
              name="phone"
              onChange={updatePhone}
              variant="outlined"
              label={"Phone Number"}
              fullWidth={true}
              disableAreaCodes
              autoFormat={true}
              required
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
        <Typography variant="body2" color="error" sx={{ fontWeight: "bold" }}>
          {formError}
        </Typography>

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth={true}
            size="large"
            color="primary"
            onClick={submitStripe}
          >
            <Typography variant="h6">Book It</Typography>
          </Button>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ mt: 2, textAlign: "center" }}
          >
            Your card will be charged{" "}
            <span style={{ fontWeight: "bold" }}>${price.toFixed(2)}</span>
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckoutInformation;
