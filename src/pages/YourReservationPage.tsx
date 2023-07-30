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
} from "@mui/material";
import { GetReservationDetails, CancelBooking } from '../constants/constants';
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useHistory } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loader from "../components/UI/Loader";
import MobileSearchBar from '../components/MobileHomePageFilterBar';

const YourReservationPage: FC<Props> = () => {
  const history = useHistory();
  let emailAddress = history.location.state?.emailAddress;
  let confirmationNumber = history.location.state?.confirmationNumber;

  const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false);
  const [succesAlert, setSuccesAlert] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const [confirmationId, setConfirmationId] = useState("");
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false)

  if (!emailAddress && !confirmationNumber) {
    const email = new URLSearchParams(history.location.search).get('email')
    const confirmation = new URLSearchParams(history.location.search).get('id')
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

  ///Modify
  // const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
  //   setModifyDialogOpen(true);
  //   setScroll(scrollType);
  // };

  const [cancellableText, setCancellableText] = useState<any>("")
  const formatUnixLong = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }
  const formatUnix = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US')
  }

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
    // let cancellationPolicyString = 'Refundable. Cancellation fees as follows: ';
    const oneDay = (24*60*60*1000);
    // console.log(data?.getReservationDetails?.response)

    if (data){
      const cancellationPolicy = JSON.parse(data?.getReservationDetails?.response[0].cancellation_meta);
      console.log('cancel policy')
      console.log(cancellationPolicy)

      let isRefundable = false
      if (cancellationPolicy && cancellationPolicy.length === 1 && cancellationPolicy[0].CancellationFee?.FinalPrice === data?.getReservationDetails.response.find(item => true)?.bookingPrice) {
        isRefundable = false
      } else if (cancellationPolicy && cancellationPolicy.length === 2) {
        isRefundable = true
      } else {
        //TODO: flag this, we haven't covered this case
      }

      let cancellationPolicyString = ''
      if (isRefundable) {
        cancellationPolicyString = `Cancel before ${new Date(getTimestamp(cancellationPolicy[0].DateFrom)).toLocaleDateString()} ${new Date(getTimestamp(cancellationPolicy[0].DateFrom)).toLocaleTimeString('en-US')} for a partial refund. You will be charged a cancellation fee of $${cancellationPolicy[0].CancellationFee?.FinalPrice}. Cancellations after will be considered a no-show and you will be charged the full reservation price.`
      } else {
        cancellationPolicyString = 'This rate is non-refundable.'
      }

      // const search = JSON.parse(data?.getReservationDetails?.response[0].searchData)
      // for (let i = 0; i< cancellationPolicy.length ;i++){
      //   cancellationPolicyString += `(${new Date(getTimestamp(cancellationPolicy[i].DateFrom)).toLocaleDateString()} - ${cancellationPolicy[i + 1] ? new Date(getTimestamp(cancellationPolicy[i + 1].DateFrom) - oneDay).toLocaleDateString() : new Date(search.checkOut).toLocaleDateString()} - ${cancellationPolicy[i].CancellationFee.FinalPrice}) `
      // }
      setCancellableText(cancellationPolicyString)
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
        if (status?.data?.cancelBooking?.status) {
          setSuccesAlert(true)
          setOpenCancelConfirmation(false)
          setIsAlertOpen(true)
          history.push('/listings')
        }
      })
    }
  }


  const headerStyle = {
    fontSize: '1.5em',
    fontFamily: "overpass-regular",
    textAlign: "center"
  }

  return (
    <Box>
      <Navbar />
      {loading ? <p>Loading...</p>
        :
        <Box sx={{ mx: 'auto', maxWidth: '660px' }}>
          {!data?.getReservationDetails?.response?.length &&
            <Box sx={{ ml: '2em', mt: '3em' }}>
              <Typography sx={headerStyle}>We couldn&apos;t find a reservation for that email and confirmation number.</Typography>
              <Button sx={{ mt: '0.5em' }} variant="contained" onClick={() => history.replace('/reservation/manage')}>Back</Button>
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
                <Typography>Check In Time</Typography>
              </Grid>
              <Grid item xs={9} md={8} >
                <Typography>{formatUnix(reservation.checkInTime)}</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Check Out Time</Typography>
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
                <Typography>Adults: {JSON.parse(reservation.searchData).occupants.adults}, Children: {JSON.parse(reservation.searchData).occupants.children}, Dogs: {JSON.parse(reservation.searchData).occupants.dogs}</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Total Price</Typography>
              </Grid>
              <Grid item xs={9} md={8} >
                <Typography>${reservation.bookingPrice}</Typography>
              </Grid>
              <Grid item xs={3} md={4}
              >
                <Typography>Cancellation Policy</Typography>
              </Grid>
              <Grid item xs={9} md={8} >
                <Typography>{cancellableText}</Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  mt: { xs: 3, sm: 5 }
                }}
                xs={12}
                md={12}
              >
                {reservation.reservationStatus == 'upcoming' && reservation.status !== 'cancelled' ? (
                  <>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mr: 2 }}
                      onClick={() => handleCancelBooking(reservation.bookingId)}
                    >
                      Cancel
                    </Button>
                    {/* 
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={handleClickOpen('body')}
                    >
                      Modify
                    </Button>
                    */}
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => history.push('/reservation/manage')}
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
      }
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