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
import Loader from "../UI/Loader";
import ErrorDog from "../UI/ErrorDog";

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
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    check: "",
    card: "",
  });
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

  const submitStripe = async () => {
    setPaymentLoading(true);
    setFormError({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      check: "",
      card: "",
    });

    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      check: "",
      card: "",
    };

    if (checkoutForm.firstName.length === 0) {
      errors.firstName = "*Primary traveller first name is required";
    }
    if (checkoutForm.lastName.length === 0) {
      errors.lastName = "*Primary traveller last name is required";
    }
    if (checkoutForm.email.length === 0) {
      errors.email = "*Primary traveller email is required";
    }
    if (checkoutForm.phone.length === 0) {
      errors.phone = "*Primary traveller phone is required";
    }
    if (!checkState) {
      errors.check = "*Required for booking";
    }

    setFormError(errors);

    Object.keys(formError).forEach((err) => {
      if (err.length > 0) {
        setPaymentLoading(false);
        return;
      }
    });

    if (!stripe || !elements) {
      setPaymentLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setPaymentLoading(false);
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
        setFormError({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          check: "",
          card: error?.message
            ? error.message
            : "We were unable to process this transaction. Please try again.",
        });
        console.log(error);
        setPaymentLoading(false);
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

      if (occupants.children > 0) {
        Array.from(Array(occupants?.childrenAge?.length)).forEach((x_, i) => {
          children.push({
            firstName: checkoutForm.firstName,
            lastName: checkoutForm.lastName,
            age: occupants.childrenAge[i],
          });
        });
      }

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
      errors.card =
        "*We were unable to process this transaction. Please try again.";
      setFormError(errors);
      setPaymentLoading(false);
    }
    setPaymentLoading(false);
  };

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
          border: "none",
          minHeight: "550px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 3,
          pt: 2,
          pb: 2.5,
          px: 2,
        }}
      >
        {createLoading || piLoading || paymentLoading ? (
          <Loader size="200px" />
        ) : createData ? (
          <Box sx={{ display: "flex", px: 5, flexDirection: "column" }}>
            {!createData?.createBooking?.booking?.sabreConfirmationId &&
            !createData?.createBooking?.booking?.propertyConfirmationId ? (
              <Box sx={{ mt: -5 }}>
                <ErrorDog size="150px" />
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ textAlign: "center", mb: 2 }}
                >
                  Whoops! We caught our own tail while booking
                </Typography>
                <Typography variant="body1">
                  This could happen for one or more of the following reasons:
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1">
                      The room you were trying to book is no longer available
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      The hotel&apos;s booking server is down{" "}
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Our payment processor is down{" "}
                    </Typography>
                  </li>
                </ul>
                <Typography variant="body1">
                  If this behavior continues, please contact support with the
                  following reference #:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", my: 2, fontWeight: "bold" }}
                >
                  {createData?.createBooking?.booking?.faunaDocId}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  Note: your credit card may have been authorized, but not
                  charged. If your card was authorized, authorization should
                  automatically fall off in a few days.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ mt: -5 }}>
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ textAlign: "center", mb: 2 }}
                >
                  You&apos;re booked!
                </Typography>

                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  Your confirmation number is:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", my: 2, fontWeight: "bold" }}
                >
                  {createData?.createBooking?.booking?.propertyConfirmationId
                    ? createData?.createBooking?.booking?.propertyConfirmationId
                    : createData?.createBooking?.booking?.sabreConfirmationId}
                </Typography>
                <Typography variant="body1">
                  We&apos;ve sent you an email with all of the details of your
                  booking.
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <>
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
                  error={formError.firstName.length > 0}
                  helperText={formError.firstName}
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
                  error={formError.lastName.length > 0}
                  helperText={formError.lastName}
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
                  error={formError.email.length > 0}
                  required
                  helperText={formError.email}
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
                  error={formError.phone.length > 0}
                  helperText={formError.phone}
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
              <Typography variant="caption" color="error">
                {formError.card}
              </Typography>
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
                }}
              >
                <Checkbox
                  checked={checkState}
                  color="primary"
                  onChange={handleCheck}
                />
                <Typography variant="body2">
                  I agree to the booking{" "}
                  <Link
                    target="_blank"
                    rel="noopener noreffer"
                    href="/terms-of-use"
                  >
                    terms of use
                  </Link>{" "}
                  and cancellation policy.
                </Typography>
              </Box>
              <Typography variant="caption" color="error">
                {formError.check}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth={true}
                size="large"
                color="primary"
                onClick={submitStripe}
                sx={{ mt: 3 }}
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default CheckoutInformation;
