import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  DialogProps,
  CircularProgress,
} from "@mui/material";
import { GetReservationDetails, CancelBooking } from '../constants/constants';
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loader from "../components/UI/Loader";
import MobileSearchBar from '../components/MobileHomePageFilterBar/MobileHomePageFilterBar';
import moment from 'moment'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const YourReservationPage: FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let emailAddress = location.state?.emailAddress;
  let confirmationNumber = location.state?.confirmationNumber;

  const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const [confirmationId, setConfirmationId] = useState("");
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false)

  if (!emailAddress && !confirmationNumber) {
    const email = new URLSearchParams(location.search).get('email')
    const confirmation = new URLSearchParams(location.search).get('id')
    emailAddress = email
    confirmationNumber = confirmation
  }


  const [
    handleFindReservation,
    { called, loading, data, error }
  ] = useLazyQuery(gql`
    ${GetReservationDetails}
    `,
    {
      variables: {
        email: emailAddress,
        propertyConfirmationId: confirmationNumber
      },
      fetchPolicy: "network-only",
    }
  );

  const [
    cancelBooking,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(gql`${CancelBooking}`);

  useState(() => {
    handleFindReservation()
  }, [])

  const room = useSelector(
    // eslint-disable-next-line
    (state: any) => state.hotelCheckoutReducer?.checkout?.room?.room
  );


  const [showCreditCardForm, setShowCreditCardForm] = useState(false)
  const [loadingUpdateCC, setLoadingUpdateCC] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const elements = useElements();
  const stripe = useStripe();

  const [cancellableText, setCancellableText] = useState<any>("")
  const formatUnixLong = (timestamp: number) => (new Date(timestamp).toLocaleString())
  const formatUnix = (timestamp: number) => (new Date(timestamp).toLocaleDateString('en-US'))

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

  useEffect(() => {
    const oneDay = (24*60*60*1000);
    // console.log(data?.getReservationDetails?.response)

    if (data && data?.getReservationDetails) {

      const cancellationPolicy = JSON.parse(data?.getReservationDetails?.response[0].cancellation_meta);      
      if (data?.getReservationDetails?.response[0].isRefundable) {
        setCancellableText(`Cancel before ${new Date(getTimestamp(cancellationPolicy[0].DateFrom)).toLocaleDateString()} ${new Date(getTimestamp(cancellationPolicy[0].DateFrom)).toLocaleTimeString('en-US')} for a full refund. Please allow 5-7 business days for a refund to process. Cancellations after will be considered a no-show and you will be charged the full reservation price.`)
      } else {
        setCancellableText('This rate is non-refundable.')
      }
    
    }
  }, [data])

  const handleCancelBooking = (confirmationId: any) => {
    setOpenCancelConfirmation(true);
    setConfirmationId(confirmationId);
  }

  const handleCancelReservation = () => {
    if (confirmationId) {
      setOpenCancelConfirmation(false)
      cancelBooking({
        variables: {
          cancelBookingInput: {
            segmentID: confirmationId,
          }
        }
      }).then((status) => {
        console.log(status)
        if (status?.data?.cancelBookingUsingTravolutionary?.response === null) {
          navigate('/listings')
        }
        if (status?.data?.cancelBookingUsingTravolutionary?.response?.Status === 'CX') {
          setOpenCancelConfirmation(false)
          setIsAlertOpen(true)
          navigate('/listings')
        }
      })
    }
  }

  const handleUpdatePaymentMethod = async (bookingId, email, firstName, lastName, bookingPrice) => {
    if (!showCreditCardForm) {
      setShowCreditCardForm(true)
      return
    }

    if (stripe && elements) {
      setLoadingUpdateCC(true)
      const getSetupIntent = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}v2/stripe/setup-intent`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ email }), // b
      })
      const data = await getSetupIntent.json()

      const cardElement = await elements.getElement(CardElement);
      if (!cardElement) {
        throw 'Something unexpected occurred. Please try again.'
      }

      const { error, setupIntent } = await stripe.confirmCardSetup(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${firstName} ${lastName}`,
            },
          },
        }
      )
      console.log(setupIntent)

      const updateCC = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}v2/update-booking/cc`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          bookingId,
          setupIntent: setupIntent,
          customerId: data.customerId,
          finalPrice: bookingPrice
        })
      })
 

      setLoadingUpdateCC(false)
      setShowCreditCardForm(false)
      setSuccessMessage('Your payment information has been updated.')
    }

  }


  const headerStyle = {
    fontSize: '1.5em',
    textAlign: "center"
  }



  if (loading) {
    return (<p>Loading...</p>)
  }

  if (data?.getReservationDetails === null) {
    return (<p>No reservation with this confirmation ID found.</p>)
  }

  return (
    <Box>
      <Navbar />
    
        <Box sx={{ mx: 'auto', maxWidth: '660px' }}>
          {!data?.getReservationDetails?.response?.length &&
            <Box sx={{ ml: '2em', mt: '3em' }}>
              <Typography sx={headerStyle}>We couldn&apos;t find a reservation for that email and confirmation number.</Typography>
              <Button sx={{ mt: '0.5em' }} variant="contained" onClick={() => navigate('/reservation/manage', { replace: true })}>Back</Button>
            </Box>
          }
          {mutationLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: 0,
                left: 0,
                background: "rgba(255, 255, 255, 0.7)"
              }}
            >
              <Loader size="300px" />
            </Box>
          )}
          {data?.getReservationDetails?.response && data?.getReservationDetails.response.map((reservation: any, index: number) => (
            <Grid
              key={index}
              sx={{
                boxShadow: 3,
                transition: "all .25s ease-in-out",
                "&:hover": { boxShadow: 5 },
                borderRadius: "12px",
                border: "1px solid #ddd",
                p: "1rem",
                mt: { xs: 5 }
              }}
              container
              spacing={2}
            >
              <Grid item xs={12} md={12}>
                {console.log(reservation)}
                <Typography sx={headerStyle}>Details for your {reservation.status === 'cancelled' ? 'cancelled' : reservation.reservationStatus} stay:</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Confirmation ID:</Typography>
              </Grid>
              <Grid item xs={9} md={8}
              >
                <Typography>{reservation?.bookingId}</Typography>
              </Grid>

              <Grid item xs={3} md={4}
              >
                <Typography>Hotel Name:</Typography>
              </Grid>
              <Grid item xs={9} md={8}
              >
                <Typography>{reservation?.hotel?.name}</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Address</Typography>
              </Grid>
              <Grid item xs={9} md={8} >
                <Typography>{`${reservation?.hotel?.address}, ${reservation?.hotel?.zipCode}`}</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Check In:</Typography>
              </Grid>
              <Grid item xs={9} md={8} >
                <Typography>{formatUnix(reservation.checkInTime)}</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Check Out:</Typography>
              </Grid>
              <Grid item xs={9} md={8} >
                <Typography>{formatUnix(reservation.checkOutTime)}</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Room Type</Typography>
              </Grid>
              <Grid item xs={9} md={8} >
                <Typography>{reservation?.roomType}</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Occupants</Typography>
              </Grid>
              <Grid item xs={9} md={8} >
                <Typography>Adults: {JSON.parse(reservation.searchData)?.adults}, Children: {JSON.parse(reservation.searchData)?.children?.length}, Dogs: {JSON.parse(reservation.searchData)?.dogs}</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Total Price</Typography>
              </Grid>
              <Grid item xs={9} md={8} >
                <Typography>${parseFloat(reservation.bookingPrice).toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Cancellation Policy</Typography>
              </Grid>
              <Grid item xs={9} md={8} >
                <Typography>{cancellableText}</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Payment Status:</Typography>
              </Grid>
              <Grid item xs={9} md={8} >
                <Typography>{reservation.isPaid 
                  ? 'PAID' 
                  : `Not paid ${reservation.status !== 'cancelled' ? ': your payment method will be charged 1-2 days prior to the cancellation deadline.' : ''}`} {reservation.paymentFailed && ', please update your payment information.'}</Typography>
              </Grid>
              {reservation?.card?.card?.last4 && <>
                <Grid item xs={3} md={4}
                >
                  <Typography>Payment Method on File:</Typography>
                </Grid>
                <Grid item xs={9} md={8} >
                  <Typography>&#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022; {reservation?.card?.card?.last4} | exp: <span style={{fontSize: '0.8rem'}}>{reservation?.card?.card?.exp_month} / {reservation?.card?.card?.exp_year}</span></Typography>
                </Grid>
              </>}
              {reservation.paymentFailed &&
                 <Grid item xs={12}>
                   <Typography sx={{ fontSize: '0.9rem', color: 'red'}}>We couldn&apos;t charge this payment method. Please update this payment method or your reservation will be canceled.</Typography>
                 </Grid>
              }
              {successMessage &&
                <Grid item xs={12}><Typography sx={{ color: 'green' }}>{successMessage}</Typography></Grid>
              }

              {showCreditCardForm && 
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
                </Grid>
              }

              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  mt: { xs: 3, sm: 5 }
                }}
                xs={12}
                md={12}
              >
                {reservation.status !== 'cancelled' ? (
                  <>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleUpdatePaymentMethod(reservation.bookingId, reservation.email, reservation.firstName, reservation.lastName, reservation.bookingPrice)}
                      sx={{ mr: 2 }}
                    >
                      {loadingUpdateCC ? <CircularProgress /> : 'Update payment method'}
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                   
                      onClick={() => handleCancelBooking(reservation.bookingId)}
                    >
                      Cancel
                    </Button>
         
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => navigate('/reservation/manage')}
                  >
                    Go Back
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
          <Dialog
            open={openCancelConfirmation}
            onClose={() => setOpenCancelConfirmation(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirmation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to cancel this stay?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCancelConfirmation(false)}>No</Button>
              <Button onClick={handleCancelReservation} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>


        </Box>
     
      <Dialog
        open={modifyDialogOpen}
        onClose={() => setModifyDialogOpen(false)}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
    {/*<ReservationDetails flag={"You are Modifying Boooking"} bookingId={data?.getReservationDetails[0].id} />*/}
        <DialogTitle id="scroll-dialog-title">Modify this booking</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
     
            {data?.getReservationDetails && (
              <MobileSearchBar home={false} forceWidth="inherit" flag="Modify this booking" bookingId={data?.getReservationDetails.response[0].bookingId} />
            )}
      
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModifyDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default YourReservationPage;