import React, { FC, useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import {
  FormControl,
  CircularProgress,
  InputLabel,
  InputBase,
  Typography,
  Button,
  Grid,
  Container,
  Box,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
  DialogContentText,
} from "@mui/material";
import { Occupant } from "../../components/OccupantSelector/OccupantSelector";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ReservationDetails from "../../components/ReservationDetails";
import ScrollToTop from "../../components/ScrollToTop";
import { Error } from "@mui/icons-material";
import { GetReservationDetails, CancelBooking } from '../../constants/constants';
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import moment from "moment";
interface BookingManage {
  image: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  occupants: Occupant;
  roomType: string;
  confirmId: string;
  status: string;
}

interface BookingInterface {
  id: string,
  propertyId: string,
  paymentIntentId: string,
  cardId: string,
  sabreConfirmationId: string,
  propertyConfirmationId: string,
  faunaDocId: string,
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string,
  checkInAtLocal: string,
  checkOutAtLocal: string,
  deadlineLocal: string,
  data: any,
  hotel: any,
  cancellationFeePrice: any,
  captured: number,
  intentType: string,
  setupIntentObject: any,
  customerId: string,
  reservationStatus: string
}

interface Props {
  booking: BookingManage;
  faq?: {
    question: string;
    answer: string;
  }[];
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    color: "#03989E",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ManageReservationPage: FC<Props> = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [list, setList] = useState<BookingInterface[]>([]);
  const buttonEnabled =
    emailAddress.length > 2 && confirmationNumber.length > 8;

  const [
    handleFindReservation,
    { called, loading: reservationLoading, data }
  ] = useLazyQuery(gql`
    ${GetReservationDetails}
    `,
    {
      variables: {
        email: emailAddress,
        propertyConfirmationId: confirmationNumber
      },
    }
  );

  const [
    cancelBooking,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(gql`${CancelBooking}`);

  useEffect(() => {
    if (data) {      
      if (Object.keys(data?.getReservationDetails).length > 0) {
        setList(data?.getReservationDetails)
        setBookingStatus(data?.getReservationDetails[0].reservationStatus)
        setSuccess(false)
      }
    }
  }, [data])

  useEffect(() => {
    if (called && !data) setSuccess(true);
  }, [called])

  const startChat = () => {
    window.Intercom("boot", {
      app_id: "qa6datd3",
    });
    window.Intercom("update");
    window.Intercom("show");
  };
  const formatUnix = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US')
  }

  const formatUnixLong = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelBooking = (confirmationId: any) => {
    setOpenCancelConfirmation(true);
    setConfirmationId(confirmationId);
  }
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleCancelReservation = () => {
    if (confirmationId) {
      cancelBooking({
        variables: {
          cancelBookingInput: {
            confirmationId: confirmationId,
            cancelAll: true
          }
        }
      }).then((status) => {
        setOpenCancelConfirmation(false)
      })
    }
  }

  const columns: any = [
    {
      name: 'Confirmation Id',
      selector: (row: BookingInterface) => row.propertyConfirmationId,
      width: '130px'
    },
    {
      name: 'firstName',
      selector: (row: BookingInterface) => row.firstName,
    },
    {
      name: 'lastName',
      selector: (row: BookingInterface) => row.lastName,
    },
    {
      name: 'Check-in',
      selector: (row: BookingInterface) => formatUnix(parseInt(row.checkInAtLocal)),
    },
    {
      name: 'Check-out',
      selector: (row: BookingInterface) => formatUnix(parseInt(row.checkOutAtLocal)),
    },
    {
      name: 'Total $ + Tax',
      selector: (row: BookingInterface) => `$${row.data.totalPriceAfterTax}`,
    },
    {
      name: 'Can cancel?',
      selector: (row: BookingInterface) => row.data.cancelationPolicy.cancelable ? 'Yes' : 'No',
    },
    {
      name: 'Cancel by time',
      selector: (row: BookingInterface) => formatUnixLong(parseInt(row.deadlineLocal)),
      width: '180px',
    },
    {
      name: 'Booking Status',
      selector: (row: BookingInterface) => row.reservationStatus?.toUpperCase()
    },
    bookingStatus === "upcoming" && (
      {
        name: 'Action',
        selector: (row: BookingInterface) =>
          <>
            {
              <Button variant="contained" onClick={handleClickOpen('body')}>Modify</Button>
            },
            {
              <Button variant="contained" onClick={() => handleCancelBooking(row.sabreConfirmationId)}>Cancel</Button>
            }
          </>,
      })

  ];

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 8, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              color="text.primary"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Manage your reservation
            </Typography>
            <Divider variant="middle" light sx={{ my: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Modify, cancel, or rebook your reservation below
              </Typography>
            </Divider>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{ margin: "0px auto 2rem auto" }}
            justifyContent="center"
          >
            {success && (
              <Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: success ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: success ? "1rem 2rem" : "1rem 6rem 2rem 2rem",
                    minWidth: "100%",
                  }}
                >
                  {success ? (
                    <>
                      <Error sx={{ fontSize: "32px", color: "#9e0303" }} />
                      <Typography
                        variant="body1"
                        color="#9e0303"
                        sx={{
                          textAlign: "center",
                          mt: "1rem",
                          fontWeight: 500,
                          fontSize: "16px",
                        }}
                      >
                        Reservation not found. Please contact our support staff
                        for further assistance
                      </Typography>
                    </>
                  ) : (
                    <>
                      <CircularProgress
                        sx={{
                          fontSize: "16px",
                          maxWidth: "32px",
                          maxHeight: "32px",
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ ml: "1rem", fontWeight: 500 }}
                      >
                        Finding your reservation...
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>
            )}

            {!loading && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mt: "1rem",
                  textAlign: "center",
                  fontWeight: 500,
                  mb: "2rem",
                }}
              >
                Have an existing reservation?
              </Typography>
            )}
            <Grid container>
              <Grid item xs={12} sx={{ mb: "1rem" }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Email address
                  </InputLabel>
                  <BootstrapInput
                    defaultValue=""
                    onChange={(e) => setEmailAddress(e.target.value)}
                    value={emailAddress}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mb: "1rem" }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Confirmation Number
                  </InputLabel>
                  <BootstrapInput
                    defaultValue=""
                    onChange={(e) => setConfirmationNumber(e.target.value)}
                    value={confirmationNumber}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                  disabled={!buttonEnabled || loading}
                  onClick={() => handleFindReservation()}
                  variant="contained"
                  sx={{
                    margin: "0px auto",
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                >
                  Find Reservation
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {data &&
        <><Grid>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: "#666",
              display: { sm: "block", md: "flex" },
              justifyContent: "space-between",
              fontFamily: "Montserrat",
              marginLeft: "15px"
            }}
          >
            {bookingStatus}
          </Typography>
          <Grid
            sx={{
              boxShadow: 3,
              transition: "all .25s ease-in-out",
              "&:hover": { boxShadow: 5 },
              display: "flex",
              borderRadius: "12px",
              border: "1px solid #ddd",
              flexDirection: { xs: "row", sm: "row" },
              p: "1rem",
              margin: '15px 45px 45px 45px',
            }}
          >
            <Box
              sx={{
                width: '100%'
              }}
            >
              <DataTable
                columns={columns}
                data={list}
                paginationPerPage={10}
                pagination
              />
            </Box>
          </Grid>

          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">You are Modifying Boooking</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <Grid
                container
              >
                {data?.getReservationDetails && (
                  <ReservationDetails flag={"You are Modifying Boooking"} bookingId={data?.getReservationDetails[0].id} />
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </Grid>

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
                Are you sure want to cancel Booking?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCancelConfirmation(false)}>No</Button>
              <Button onClick={handleCancelReservation} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog></>
      }
      <Container>
        <Grid item xs={12} md={12} sx={{ my: 2, textAlign: "center" }}>
          <Button
            onClick={startChat}
            variant="contained"
            color="primary"
            sx={{ fontWeight: 500, textTransform: "none" }}
          >
            Chat with Support
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box
            component="img"
            src="https://storage.googleapis.com/romingo-development-public/images/front-end/romingo_ball.jpeg"
            alt={"Romingo Tennis Ball"}
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "260px",
              borderRadius: 5,
            }}
          />
        </Grid>
      </Container>
      {/*

      <Box
        sx={{
          pt: {
            md: "40px",
            xs: "70px",
          },
        }}
      ><Container
          maxWidth="lg"
          sx={{
            py: 3,
            minHeight: "calc(100vh - 382px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Box sx={{ maxWidth: "600px" }}>
            <Typography
              variant="h4"
              sx={{
                color: "primary.main",
                mb: 1,
                textAlign: "center",
              }}
            >
              Manage Your Reservation
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                my: 2,
                textAlign: "center",
              }}
            >
              To manage a booking made through Romingo, you will need the
              original email address used to make the reservation and the
              confirmation number from your confirmation email. Please review
              the cancellation policy for your reservation prior to cancelling
              your reservation. The policy was provided on the reservation
              checkout page as well as your confirmation email.
            </Typography>
          </Box>
          {confirmedReservation && (
            <Box
              id="simple-tabpanel-0"
              aria-labelledby={`simple-tab-0`}
              sx={{
                py: 3,
                px: 1,
              }}
            >
              <BookingManageCard
                {...booking}
                sx={{
                  mb: 3,
                }}
              />
            </Box>
          )}
          {!confirmedReservation && (
            <Box>
              <ValidatorForm
                onSubmit={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  setConfirmedReservation(true);
                }}
              >
                <Box>
                  <TextValidator
                    fullWidth
                    name="email"
                    label="Email Address"
                    variant="outlined"
                    value={email}
                    validators={["required", "isEmail"]}
                    helperText="The email address used to create the reservation"
                    errorMessages={[
                      "This field is required",
                      "Email is not valid",
                    ]}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setEmail(e.currentTarget.value);
                    }}
                    FormHelperTextProps={{}}
                  />
                </Box>
                <Box
                  sx={{
                    mt: 1,
                  }}
                >
                  <TextValidator
                    fullWidth
                    name="reservation"
                    label="Confirmation Number"
                    variant="outlined"
                    value={reservationNumber}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    helperText="Found in your confirmation email"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setReservationNumber(e.currentTarget.value);
                    }}
                    FormHelperTextProps={{}}
                  />
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    type="submit"
                  >
                    Retrieve Reservation
                  </Button>
                </Box>
              </ValidatorForm>
            </Box>
          )}
        </Container> */}
      <Footer />
    </>
  );
};

export default ManageReservationPage;
