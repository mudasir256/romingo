import { FC, useState, useEffect } from "react";
import { CSSObject } from "@mui/material";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import MuiPhoneNumber from "material-ui-phone-number";
import { gql, useMutation } from "@apollo/client";
import {
  CreateBooking,
  CreateBooking2,
  CreatePaymentIntent,
  CreateSetupIntent,
} from "../../constants/constants";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Loader from "../UI/Loader";
import ErrorDog from "../UI/ErrorDog";
import { utils } from "../../services/utils";
import TagManager from "react-gtm-module";

interface Props {
  sx?: CSSObject;
  finePrint?: {
    title: string;
    description: string;
  };
  priceKey: string;
  price: number;
  payLater: boolean;
  policy: {
    cancelable: boolean;
    deadlineLocal: string | null;
  };
}

const CheckoutInformation: FC<Props> = ({
  sx,
  price,
  priceKey,
  payLater,
  policy,
}) => {
  const history = useHistory();
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
  const [priceChanged, setPriceChanged] = useState(false);
  const [checkState, setCheckState] = useState(false);
  const { occupants } = useSelector((state: any) => state.searchReducer.search);
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: 1,
    phone: "",
  });

  const [createPI, { data: piData, loading: piLoading }] = useMutation(
    gql`
      ${CreatePaymentIntent}
    `
  );

  const [createBooking, { data: createData, loading: createLoading }] =
    useMutation(
      gql`
        ${CreateBooking}
      `
    );

  const [createBooking2, { data: bnplData, loading: bnplLoading }] =
    useMutation(
      gql`
        ${CreateBooking2}
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

  const [createSI, { data: siData, loading: siLoading }] = useMutation(
    gql`
      ${CreateSetupIntent}
    `,
    {
      async onCompleted(data) {
        setPaymentLoading(true);
        try {
          if (!stripe || !elements) {
            setPaymentLoading(false);
            return;
          }
          const cardElement = await elements.getElement(CardElement);
          if (!cardElement) {
            setPaymentLoading(false);
            return;
          }

          const { error, setupIntent } = await stripe.confirmCardSetup(
            data?.createSetupIntent?.clientSecret,
            {
              payment_method: {
                card: cardElement,
                billing_details: {
                  name: `${checkoutForm.firstName.trim()} ${checkoutForm.lastName.trim()}`,
                },
              },
            }
          );
          if (setupIntent) {
            const adults: { firstName: string; lastName: string }[] = [];
            const children: {
              firstName: string;
              lastName: string;
              age: number;
            }[] = [];

            Array.from(Array(occupants.adults)).forEach((_, i) => {
              if (i === 0) {
                adults.push({
                  firstName: checkoutForm.firstName.trim(),
                  lastName: checkoutForm.lastName.trim(),
                });
              } else {
                const guestId = String.fromCharCode(64 + i);
                adults.push({
                  firstName: `Adult${guestId}`,
                  lastName: checkoutForm.lastName.trim(),
                });
              }
            });

            if (occupants.children > 0) {
              Array.from(Array(occupants?.childrenAge?.length)).forEach(
                (x_, i) => {
                  const childId = String.fromCharCode(65 + i);
                  children.push({
                    firstName: `Child${childId}`,
                    lastName: checkoutForm.lastName.trim(),
                    age: occupants.childrenAge[i],
                  });
                }
              );
            }
            // const { error, paymentIntent } = await stripe.confirmCardPayment(
            //   clientSecret,
            //   {
            //     payment_method: {
            //       card: cardElement,
            //     },
            //   }
            // );

            createBooking2({
              variables: {
                createBooking2Input: {
                  priceKey: priceKey,
                  customerId: data?.createSetupIntent?.customerId,
                  paymentIntentId: '',
                  email: checkoutForm.email,
                  mobile: {
                    countryCallingCode: checkoutForm.countryCode,
                    number: checkoutForm.phone,
                  },
                  adults,
                  children,
                  noOfDogs: occupants.dogs,
                  intentType: setupIntent ? 'setup Intent' : 'payment Intent',
                  setupIntentObject: setupIntent
                },
              },
            });
          }
          setPaymentLoading(false);
        } catch (err) {
          console.log(err);
          setFormError({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            check: "",
            card: "*We were unable to process this transaction. Please try again.",
          });
          setPaymentLoading(false);
        }
      },
    }
  );

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
    if (/[^a-z A-Z]/.test(checkoutForm.firstName)) {
      errors.firstName = "*Numbers and/or special characters are not allowed";
    }
    if (checkoutForm.lastName.length === 0) {
      errors.lastName = "*Primary traveller last name is required";
    }
    if (/[^a-z A-Z]/.test(checkoutForm.lastName)) {
      errors.lastName = "*Numbers and/or special characters are not allowed";
    }
    if (checkoutForm.email.length === 0) {
      errors.email = "*Primary traveller email is required";
    }
    //validate email
    if (
      /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(
        checkoutForm.email
      )
    ) {
      errors.email = "*Please enter a valid email";
    }
    if (checkoutForm.phone.length === 0 || !checkoutForm.countryCode) {
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

    // check if check-in date is greater than 72 hours in the future. If so, provide Buy Now Pay Later (BNPL) checkout flow.
    // if (payLater) {
      try {
        createSI({
          variables: { createSetupIntentInput: { email: checkoutForm.email } },
        });
      } catch (err) {
        console.log(err);
        errors.card =
          "*We were unable to process this transaction. Please try again.";
        setFormError(errors);
        setPaymentLoading(false);
      }
    // } else {
    //   if (!stripe || !elements) {
    //     console.log("Stripe or Elements not loaded");
    //     setPaymentLoading(false);
    //     return;
    //   }

    //   const cardElement = elements.getElement(CardElement);
    //   if (!cardElement) {
    //     setPaymentLoading(false);
    //     return;
    //   }

    //   try {
    //     const { error, paymentIntent } = await stripe.confirmCardPayment(
    //       clientSecret,
    //       {
    //         payment_method: {
    //           card: cardElement,
    //         },
    //       }
    //     );
    //     if (error) {
    //       setFormError({
    //         ...errors,
    //         card: error?.message
    //           ? error.message
    //           : "We were unable to process this transaction. Please try again.",
    //       });
    //       console.log(error);
    //       setPaymentLoading(false);
    //       return;
    //     }
    //     const adults: { firstName: string; lastName: string }[] = [];
    //     const children: {
    //       firstName: string;
    //       lastName: string;
    //       age: number;
    //     }[] = [];

    //     Array.from(Array(occupants.adults)).forEach((_, i) => {
    //       if (i === 0) {
    //         adults.push({
    //           firstName: checkoutForm.firstName.trim(),
    //           lastName: checkoutForm.lastName.trim(),
    //         });
    //       } else {
    //         const guestId = String.fromCharCode(64 + i);
    //         adults.push({
    //           firstName: `Adult${guestId}`,
    //           lastName: checkoutForm.lastName.trim(),
    //         });
    //       }
    //     });

    //     if (occupants.children > 0) {
    //       Array.from(Array(occupants?.childrenAge?.length)).forEach((x_, i) => {
    //         const childId = String.fromCharCode(65 + i);
    //         children.push({
    //           firstName: `Child${childId}`,
    //           lastName: checkoutForm.lastName.trim(),
    //           age: occupants.childrenAge[i],
    //         });
    //       });
    //     }

    //     if (paymentIntent) {
    //       createBooking({
    //         variables: {
    //           createBookingInput: {
    //             paymentIntentId: paymentIntent.id,
    //             email: checkoutForm.email,
    //             mobile: {
    //               countryCallingCode: checkoutForm.countryCode,
    //               number: checkoutForm.phone,
    //             },
    //             adults,
    //             children,
    //             noOfDogs: occupants.dogs,
    //           },
    //         },
    //       });
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     errors.card =
    //       "*We were unable to process this transaction. Please try again.";
    //     setFormError(errors);
    //     setPaymentLoading(false);
    //     TagManager.dataLayer({
    //       dataLayer: {
    //         event: "checkoutFail",
    //       },
    //     });
    //   }
    // }

    // setPaymentLoading(false);
  };

  const updatePhone = (e: any) => {
    const numeric = e.replace(/\D/g, "");
    const countryCodeLength = numeric.length - 10;
    setCheckoutForm({
      ...checkoutForm,
      countryCode: parseInt(numeric.substr(0, countryCodeLength)),
      phone: numeric.substr(countryCodeLength, numeric.length),
    });
  };

  // useEffect(() => {
  //   createPI({
  //     variables: { createPaymentIntentInput: { priceKey } },
  //   });
  // }, []);

  useEffect(() => {
    if (piData?.priceChanged) {
      setPriceChanged(true);
    }
    if (piData?.createPaymentIntent) {
      setClientSecret(piData?.createPaymentIntent?.paymentIntent?.clientSecret);
    }
  }, [piData]);

  useEffect(() => {
    if (createData?.createBooking?.priceChanged) {
      setPriceChanged(true);
    }
    if (
      createData?.createBooking2?.booking?.sabreConfirmationId &&
      createData?.createBooking2?.booking?.propertyConfirmationId
    ) {
      TagManager.dataLayer({
        dataLayer: {
          event: "checkoutSuccess",
          bnpl: false,
        },
      });
      history.push("?success=true", []);
    }
  }, [createData]);

  useEffect(() => {
    if (bnplData?.createBooking2?.priceChanged) {
      setPriceChanged(true);
    }
    if (
      bnplData?.createBooking2?.booking?.sabreConfirmationId &&
      bnplData?.createBooking2?.booking?.propertyConfirmationId
    ) {
      TagManager.dataLayer({
        dataLayer: {
          event: "checkoutSuccess",
          bnpl: true,
        },
      });
      history.push("?success=true", []);
    }
  }, [bnplData]);

  return (
    <>
      <Dialog
        open={priceChanged}
        keepMounted
        fullWidth
        scroll="body"
        aria-labelledby="amenities-dialog-slide-title"
        aria-describedby="amenities-dialog-slide-description"
        sx={{ maxWidth: "xl" }}
      >
        <DialogTitle
          id="amenities-dialog-slide-title"
          sx={{
            textAlign: "left",
            color: "primary.main",
            py: 1,
          }}
        >
          Whoops, this price isn&apos;t available anymore
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              textAlign: "justify",
            }}
          >
            Romingo has access to real-time pricing, which means sometimes rates
            are available one moment and gone the next. But we have many other
            great rates available for you and your pup!
          </Typography>
          <Box sx={{ textAlign: "left", pt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/listings")}
            >
              Back to Search
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
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
            pt: 3,
            pb: 2.5,
            px: 2,
          }}
        >
          <>
            {(createLoading ||
              piLoading ||
              siLoading ||
              paymentLoading ||
              bnplLoading) && (
              <>
                <Box sx={{ zIndex: 30000 }}>
                  <Loader size="200px" />
                  <Typography variant="body2" color="text.secondary">
                    Loading...please don&apos;t refresh or close the page
                  </Typography>
                </Box>
              </>
            )}
            {bnplData ? (
              <Box sx={{ display: "flex", px: 5, flexDirection: "column" }}>
                {!bnplData?.createBooking2?.booking?.sabreConfirmationId &&
                !bnplData?.createBooking2?.booking?.propertyConfirmationId ? (
                  <Box sx={{ mt: -5 }}>
                    <ErrorDog size="150px" />
                    <Typography
                      variant="h5"
                      color="primary"
                      sx={{ textAlign: "left", mb: 2 }}
                    >
                      Whoops! We caught our own tail while booking
                    </Typography>
                    <Typography variant="body1">
                      This could happen for one or more of the following
                      reasons:
                    </Typography>
                    <ul>
                      <li>
                        <Typography variant="body1">
                          The room you were trying to book is no longer
                          available
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
                      If this behavior continues, please contact support with
                      the following reference #:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ textAlign: "left", my: 2, fontWeight: "bold" }}
                    >
                      {bnplData?.createBooking2?.booking?.faunaDocId}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
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
                      sx={{ textAlign: "left", mb: 2 }}
                    >
                      You&apos;re booked!
                    </Typography>

                    <Typography variant="body1" sx={{ textAlign: "left" }}>
                      Your confirmation number is:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ textAlign: "left", my: 2, fontWeight: "bold" }}
                    >
                      {bnplData?.createBooking2?.booking?.propertyConfirmationId
                        ? bnplData?.createBooking2?.booking
                            ?.propertyConfirmationId
                        : bnplData?.createBooking2?.booking
                            ?.sabreConfirmationId}
                    </Typography>
                    <Typography variant="body1">
                      We&apos;ve sent you an email with all of the details of
                      your booking.
                    </Typography>
                  </Box>
                )}
              </Box>
            ) : createData ? (
              <Box sx={{ display: "flex", px: 5, flexDirection: "column" }}>
                {!createData?.createBooking?.booking?.sabreConfirmationId &&
                !createData?.createBooking?.booking?.propertyConfirmationId ? (
                  <Box sx={{ mt: -5 }}>
                    <ErrorDog size="150px" />
                    <Typography
                      variant="h5"
                      color="primary"
                      sx={{ textAlign: "left", mb: 2 }}
                    >
                      Whoops! We caught our own tail while booking
                    </Typography>
                    <Typography variant="body1">
                      This could happen for one or more of the following
                      reasons:
                    </Typography>
                    <ul>
                      <li>
                        <Typography variant="body1">
                          The room you were trying to book is no longer
                          available
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
                      If this behavior continues, please contact support with
                      the following reference #:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ textAlign: "left", my: 2, fontWeight: "bold" }}
                    >
                      {createData?.createBooking?.booking?.faunaDocId}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
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
                      sx={{ textAlign: "left", mb: 2 }}
                    >
                      You&apos;re booked!
                    </Typography>

                    <Typography variant="body1" sx={{ textAlign: "left" }}>
                      Your confirmation number is:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ textAlign: "left", my: 2, fontWeight: "bold" }}
                    >
                      {createData?.createBooking?.booking
                        ?.propertyConfirmationId
                        ? createData?.createBooking?.booking
                            ?.propertyConfirmationId
                        : createData?.createBooking?.booking
                            ?.sabreConfirmationId}
                    </Typography>
                    <Typography variant="body1">
                      We&apos;ve sent you an email with all of the details of
                      your booking.
                    </Typography>
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  display:
                    createLoading ||
                    piLoading ||
                    siLoading ||
                    paymentLoading ||
                    bnplLoading
                      ? "none"
                      : "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#222",
                    textAlign: "left",
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                  }}
                >
                  Guest Information
                </Typography>
                <Grid container spacing={2} sx={{ py: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      type="text"
                      name="firstName"
                      label={"First Name"}
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
                      label={"Last Name"}
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
                      autoCapitalize="off"
                      autoCorrect="off"
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
                <Divider light sx={{ my: 2 }} />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#222",
                    fontFamily: "Montserrat",
                    textAlign: "left",
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
                          base: "MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input",
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
                  <Box sx={{ textAlign: "left" }}>
                    <Box
                      component="img"
                      src="https://storage.googleapis.com/romingo-development-public/images/front-end/safe-checkout.jpeg"
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
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#222",
                      fontFamily: "Montserrat",
                      textAlign: "left",
                      mb: 2,
                    }}
                  >
                    Important Information
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0, textAlign: "left" }}
                  >
                    <ul>
                      {policy.cancelable ? (
                        <li>
                          Cancellations or changes made to your reservation
                          after 11:59pm (local property time) on{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {utils.getDateFull(policy?.deadlineLocal)}
                          </span>{" "}
                          or no-shows are subject to a cancellation fee equal to
                          100% of the total amount paid for the reservation.
                        </li>
                      ) : (
                        <li>This rate is non-refundable.</li>
                      )}

                      <li>
                        You and your pet will be greeted by front desk staff
                        upon arrival.
                      </li>
                      <li>
                        Your card will be charged{" "}
                        <span style={{ fontWeight: "bold" }}>
                          ${price.toFixed(2)}
                        </span>
                        {payLater ? " three (3) days before check-in." : "."}
                      </li>
                    </ul>
                  </Typography>
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
                    <Typography variant="h6">Complete Booking</Typography>
                  </Button>
                </Grid>
              </Box>
            )}
          </>
        </Box>
      </Box>
    </>
  );
};

export default CheckoutInformation;
