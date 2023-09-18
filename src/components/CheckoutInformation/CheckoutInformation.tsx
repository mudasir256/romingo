import React, { FC, useState, useEffect } from "react";
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
  CreateBooking2,
  CreateSetupIntent,
  CreatePaymentIntent,
  createBookingTravolutionary,
} from "../../constants/constants";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Loader from "../UI/Loader";
import ErrorDog from "../UI/ErrorDog";
import { utils } from "../../services/utils";
import { subscribeToNewsletter, createAccount, addNameToAccount } from '../../services/endpoints'
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { authService } from "../../services/authService.js"
import StarsIcon from '@mui/icons-material/Stars';
import PetsIcon from '@mui/icons-material/Pets';
import WorkHistoryIcon from '@mui/icons-material/Work';
import * as uuid from 'uuid'
import moment from "moment";


interface Props {
  sx?: CSSObject;
  finePrint?: {
    title: string;
    description: string;
  };
  priceKey: string;
  price: number;
  policy: {
    cancelable: boolean;
    deadlineLocal: string | null;
  };
  finalPrice: number;
}

const CheckoutInformation: FC<Props> = ({
  sx,
  price,
  priceKey,
  policy,
  finalPrice,
  discountAmount,
}) => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
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
  const [checkAccountState, setCheckAccountState] = useState(false);
  const { occupants } = useSelector((state: any) => state.searchReducer.search);
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    email: authService.getUser()?.email || "",
    countryCode: 1,
    phone: "",
  });

  const [bookingSuccess, setBookingSuccess] = useState(-1)
  const [bookingData, setBookingData] = useState(null)
  const search = useSelector((state: any) => state.searchReducer.search);

  const detail = useSelector(
    (state: any) => state.hotelCheckoutReducer.checkout
  );

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", () => {
      if (confirmPassword !== password) {
        return false;
      }
      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [confirmPassword]);

  const [createBooking2, { data: bnplData, loading: bnplLoading }] =
    useMutation(
      gql`
        ${CreateBooking2}
      `
    );

  const handleCheck = () => {
    setCheckState(!checkState);
  };

  const handleCheckAccount = () => {
    setCheckAccountState(!checkAccountState)
  }

  const updateForm = (e: any) => {
    setCheckoutForm({
      ...checkoutForm,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const getTimestamp = (timestamp) => {
    const regex = /\b\d+\b/;
    const timestampMatch = timestamp.match(regex);

    if (timestampMatch) {
      const timestamp = parseInt(timestampMatch[0], 10);
      return timestamp
    } else {
      console.log("No timestamp found in the string.");
    }
    return ""
  }

  let isRefundable = false
  let isFullRefund = false

  if (policy && policy.length === 1 && policy[0].CancellationFee?.FinalPrice === finalPrice) {
    const dateFrom = policy[0].DateFrom

    const date1 = new Date(getTimestamp(dateFrom)).getTime();
    const date2 = new Date().getTime();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(diffDays)
    if (diffDays < 2) {
      isRefundable = false

    } else {
      isRefundable = true
      isFullRefund = true
    }
    
  } else if (policy && policy.length === 2) {
    isRefundable = true
    isFullRefund = false
  } else {
    //TODO: flag this, we haven't covered this case
  }



  const [createPI, { data: piData, loading: piLoading }] = useMutation(
    gql`
      ${CreatePaymentIntent}
    `,
    {
      async onCompleted(data) {
        setPaymentLoading(true);
        if (!stripe || !elements) {
          console.log("Stripe or Elements not loaded");
          setPaymentLoading(false);
          return;
        }

        const cardElement = elements.getElement(CardElement);
        console.log(cardElement)
        if (!cardElement) {
          setPaymentLoading(false);
          return;
        }

        try {
          const { error, paymentIntent } = await stripe.confirmCardPayment(
            data?.createPaymentIntent?.paymentIntent?.clientSecret,
            {
              payment_method: {
                card: cardElement,
                billing_details: {
                  name: `${checkoutForm.firstName.trim()} ${checkoutForm.lastName.trim()}`,
                },
              },
            }
          );
          console.log('payment intent')
          console.log(error)
          if (paymentIntent) {
        
            const passengers = []
            const passengerObj = {
              "Allocation": detail.room.Rooms[0].Id,
              "Email": { "Value": checkoutForm.email },
              "Telephone": {
                "PhoneNumber": checkoutForm.phone
              },
              "PersonDetails": {
                "Name": {
                  "GivenName": checkoutForm.firstName,
                  "NamePrefix": "Mr",
                  "Surname": checkoutForm.lastName
                },
                "Type": 0
              }
            }

            for (let i = 0; i < occupants.adults ; i++) {
              if (i === 0) {
                passengers.push({ 
                  "Id": uuid.v4(),
                  "Allocation": detail.room.Rooms[0].Id,
                  "Email": { "Value": checkoutForm.email },
                  "Telephone": {
                    "PhoneNumber": checkoutForm.phone
                  },
                  "PersonDetails": {
                    "Name": {
                      "GivenName": checkoutForm.firstName,
                      "NamePrefix": "Mr",
                      "Surname": checkoutForm.lastName
                    },
                    "Type": 0
                  }
                })
              } else {
                const guestId = String.fromCharCode(64 + i);
                passengers.push({
                  "Id": uuid.v4(),
                  "Allocation": detail.room.Rooms[0].Id,
                  "Email": { "Value": checkoutForm.email },
                  "Telephone": {
                    "PhoneNumber": checkoutForm.phone
                  },
                  "PersonDetails": {
                    "Name": {
                      "GivenName": `Adult${guestId}`,
                      "NamePrefix": "Mr",
                      "Surname": checkoutForm.lastName
                    },
                    "Type": 0
                  }
                })
              }
            } 

            if (occupants.children > 0) {
              for (let x = 0; x < occupants?.childrenAge?.length; x++) {
                const childId = String.fromCharCode(65 + x);
                passengers.push({
                  "Id": uuid.v4(),
                  "Allocation": detail.room.Rooms[0].Id,
                  "PersonDetails": {
                    "Name": {
                      "GivenName": `Child${childId}`,
                      "Surname": checkoutForm.lastName,
                      "NamePrefix": "Mr",
                    },
                    "Age": occupants.childrenAge[x],
                    "Type": 1
                  }
                })
              }
            }

            console.log(passengers)



            createBookingInTravolutionary({
              variables: { 
                createBookingInputTravolutionary: { 
                  passengers: passengers, 
                  roomDetails: { ...detail, discountAmount }, 
                  sessionId: detail.sessionId, 
                  stripeIntent: paymentIntent, 
                  checkoutForm: checkoutForm, 
                  search  
                } 
              }
            })
            // subscribeToNewsletter(checkoutForm.email)



            // createBooking2({
            //   variables: {
            //     createBooking2Input: {
            //       priceKey: priceKey,
            //       customerId: paymentIntent.id,
            //       paymentIntentId: paymentIntent.id,
            //       email: checkoutForm.email,
            //       mobile: {
            //         countryCallingCode: checkoutForm.countryCode,
            //         number: checkoutForm.phone,
            //       },
            //       adults,
            //       children,
            //       noOfDogs: occupants.dogs,
            //       intentType: 'payment_intent',
            //       setupIntentObject: {
            //         created: parseInt((new Date().getTime() / 1000).toFixed(0))
            //       },
            //       utmSource: localStorage.getItem('utm_source') || '',
            //       utmMedium: localStorage.getItem('utm_medium') || ''
            //     },
            //   },
            // });
            // subscribeToNewsletter(checkoutForm.email)
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
      }
    }
  );

  const [createBookingInTravolutionary, { data, loading }] = useMutation(
    gql`
    ${createBookingTravolutionary}
    `, {
    async onCompleted(data) {
      console.log('completed')
      console.log(data)
      if (data?.createBookingUsingTravolutionary?.response === null) {
        setBookingSuccess(0)
        return
      }
      setBookingSuccess(1)
      setBookingData(data.createBookingUsingTravolutionary.response)
    },
    async onError(error) {
      console.log(error)
      setBookingSuccess(0)

    }
    //TODO: add error, setBookingSuccess(0)
  }
  )

  // const [createSI, { data: siData, loading: siLoading }] = useMutation(
  //   gql`
  //     ${CreateSetupIntent}
  //   `,
  //   {
  //     async onCompleted(data) {
  //       setPaymentLoading(true);
  //       try {
  //         if (!stripe || !elements) {
  //           setPaymentLoading(false);
  //           return;
  //         }
  //         const cardElement = await elements.getElement(CardElement);
  //         if (!cardElement) {
  //           setPaymentLoading(false);
  //           return;
  //         }

  //         const { error, setupIntent } = await stripe.confirmCardSetup(
  //           data?.createSetupIntent?.clientSecret,
  //           {
  //             payment_method: {
  //               card: cardElement,
  //               billing_details: {
  //                 name: `${checkoutForm.firstName.trim()} ${checkoutForm.lastName.trim()}`,
  //               },
  //             },
  //           }
  //         );
  //         if (setupIntent) {
  //           const adults: { firstName: string; lastName: string }[] = [];
  //           const children: {
  //             firstName: string;
  //             lastName: string;
  //             age: number;
  //           }[] = [];

  //           Array.from(Array(occupants.adults)).forEach((_, i) => {
  //             if (i === 0) {
  //               adults.push({
  //                 firstName: checkoutForm.firstName.trim(),
  //                 lastName: checkoutForm.lastName.trim(),
  //               });
  //             } else {
  //               const guestId = String.fromCharCode(64 + i);
  //               adults.push({
  //                 firstName: `Adult${guestId}`,
  //                 lastName: checkoutForm.lastName.trim(),
  //               });
  //             }
  //           });

  //           if (occupants.children > 0) {
  //             Array.from(Array(occupants?.childrenAge?.length)).forEach(
  //               (x_, i) => {
  //                 const childId = String.fromCharCode(65 + i);
  //                 children.push({
  //                   firstName: `Child${childId}`,
  //                   lastName: checkoutForm.lastName.trim(),
  //                   age: occupants.childrenAge[i],
  //                 });
  //               }
  //             );
  //           }

  //           createBooking2({
  //             variables: {
  //               createBooking2Input: {
  //                 priceKey: priceKey,
  //                 customerId: data?.createSetupIntent?.customerId,
  //                 paymentIntentId: '',
  //                 email: checkoutForm.email,
  //                 mobile: {
  //                   countryCallingCode: checkoutForm.countryCode,
  //                   number: checkoutForm.phone,
  //                 },
  //                 adults,
  //                 children,
  //                 noOfDogs: occupants.dogs,
  //                 intentType: 'setup_intent',
  //                 setupIntentObject: setupIntent,
  //                 utmSource: localStorage.getItem('utm_source') || '',
  //                 utmMedium: localStorage.getItem('utm_medium') || ''
  //               },
  //             },
  //           });
  //           subscribeToNewsletter(checkoutForm.email)

  //         }
  //         setPaymentLoading(false);
  //       } catch (err) {
  //         console.log(err);
  //         setFormError({
  //           firstName: "",
  //           lastName: "",
  //           email: "",
  //           phone: "",
  //           check: "",
  //           card: "*We were unable to process this transaction. Please try again.",
  //         });
  //         setPaymentLoading(false);
  //       }
  //     },
  //   }
  // );

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

    try {

      // if (policy.cancelable) {
      //   createSI({
      //     variables: { createSetupIntentInput: { email: checkoutForm.email } },
      //   });
      // } else {
      createPI({
        variables: { createPaymentIntentInput: { price: finalPrice } },
      });
      // }


      if (password && confirmPassword) {
        const data = await createAccount(checkoutForm.email, password)
        if (data.data.createUser?.id) {
          const data2 = await addNameToAccount(data.data.createUser.id, `${checkoutForm.firstName.trim()} ${checkoutForm.lastName.trim()}`)
          console.log(data2)
        }
      }

    } catch (err) {
      console.log(err);
      errors.card =
        "*We were unable to process this transaction. Please try again.";
      setFormError(errors);
      setPaymentLoading(false);
    }


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

  useEffect(() => {
    if (bnplData?.createBooking2?.priceChanged) {
      setPriceChanged(true);
    }
    if (
      bnplData?.createBooking2?.booking?.sabreConfirmationId &&
      bnplData?.createBooking2?.booking?.propertyConfirmationId
    ) {
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
            pt: 0,
            pb: 2.5,
            px: 2,
          }}
        >
          <>
            {(loading ||
              piLoading ||
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
            {bookingSuccess > -1 ? (
              <Box sx={{ display: "flex", px: 5, flexDirection: "column" }}>
                { bookingSuccess == 0 ? (
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
                      If this behavior continues, please contact support. 
                    </Typography>
                      {/* with
                      the following reference #:
                    <Typography
                      variant="body1"
                      sx={{ textAlign: "left", my: 2, fontWeight: "bold" }}
                    >
                      {bnplData?.createBooking2?.booking?.faunaDocId}
                    </Typography>
                    */}
              
                  
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
                      Your confirmation number is: <b>{bookingData ? bookingData?.bookingId?.toUpperCase() : ''}</b>
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      We&apos;ve sent you an email with all of the details of
                      your booking.
                    </Typography>
                    <Typography variant="body1"><Link href="/create-account">Create an account</Link> with Romingo to earn rewards, manage reservations, and receive special deals and offers.</Typography>
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  display:
                    loading ||
                      piLoading ||
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
                      defaultValue={checkoutForm.email}
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
                    pr="1rem"
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

                <Divider light sx={{ my: 2 }} />

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#222",
                      textAlign: "left",
                    }}
                  >
                    Create an account (optional)
                  </Typography>
                  <Box mt="0.5rem" mb="1.5rem" ml="0.5rem">
                    <Typography component="p" mb="0.75rem" variant="base" display="flex" alignItems="center" gap="0.5rem"><StarsIcon /> Earn rewards towards free travel</Typography>
                    <Typography component="p" mb="0.75rem" variant="base" display="flex" alignItems="center" gap="0.5rem"><WorkHistoryIcon /> Easily manage your trips</Typography>
                    <Typography component="p" variant="base" display="flex" alignItems="center" gap="0.5rem"><PetsIcon /> Receive pet-friendly tips & tricks</Typography>
                  </Box>
                  <Typography component="p" mb="1rem" variant="base">Enter a password to create an account based on the email address above.</Typography>
                  <ValidatorForm onSubmit={() => updateForm()}>
                    <TextValidator
                      fullWidth={true}
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      value={password}
                      validators={["minStringLength:8", "maxStringLength:52"]}
                      errorMessages={[
                        "Minimum 8 characters",
                        "Maxium 52 characters",
                      ]}
                      onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setPassword(e.currentTarget.value);
                      }}
                      sx={{
                        mt: 1,
                      }}
                      FormHelperTextProps={{}}
                    />
                    <TextValidator
                      fullWidth={true}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      value={confirmPassword}
                      validators={["isPasswordMatch"]}
                      errorMessages={["Passwords must match"]}
                      onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setConfirmPassword(e.currentTarget.value);
                      }}
                      sx={{
                        mt: 1,
                      }}
                      FormHelperTextProps={{}}
                    />
                  </ValidatorForm>
                </Grid>

                <Divider light sx={{ my: 2 }} />


                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#222",
                      textAlign: "left",
                      mb: 2,
                    }}
                  >
                    Important Information
                  </Typography>
                  <Typography
                    variant="base"
                    color="text.secondary"
                    sx={{ mt: 0, textAlign: "left" }}
                  >
                    <ul>

                      <li>Please make sure that you have reviewed the cancellation and refund policy.</li>

                      {(policy && isRefundable) && (
                        <li>
                          <Typography variant="base">Cancellations or changes made to your reservation after <span style={{ color: 'red'}}>{moment(getTimestamp(policy[0].DateFrom)).format('h:mm A')}</span> on <span style={{ color: 'red'}}>{new Date(getTimestamp(policy[0].DateFrom)).toLocaleDateString()}</span> or no-shows are subject to a cancellation fee that is listed under the cancellation policy.</Typography>
                        </li>          
                      )}
                      {(policy && !isRefundable) && (
                        <li>This rate is non-refundable.</li>
                      )}

                     
                      {/*
                      {policy.cancelable ? (
                        <li>
                          Cancellations or changes made to your reservation
                          after 11:59pm (local property time) on{" "}
                          <span style={{ fontWeight: "bold", color: 'black' }}>
                            {utils.getDateFull(policy?.deadlineLocal)}
                          </span>{" "}
                          or no-shows are subject to a cancellation fee equal to
                          100% of the total amount paid for the reservation.
                        </li>
                      ) : (
                        <li>This rate is non-refundable.</li>
                      )}
                      */}
              
                      <li>You and your pet(s) will be greeted by front desk staff upon arrival.</li>
                      <li>Your card will be charged immediately on a successful booking.</li>
                      <li>If the Hotel charges a pet fee, this will be paid to the Hotel upon arrival.</li>
                      <li>*A fully refundable pet deposit and/or signed pet waiver may be requested by the Hotel upon check-in.</li>
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
                    disabled={!checkState}
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
