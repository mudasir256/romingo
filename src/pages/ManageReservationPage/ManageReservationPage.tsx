import React, { FC, useEffect, useState } from "react";
import { alpha, styled } from '@mui/material/styles';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { FormControl, CircularProgress, InputLabel, InputBase, Typography, Button, Grid, Container, Box, TextField, Divider } from '@mui/material'
import { Occupant } from "../../components/OccupantSelector/OccupantSelector";
import Navbar from "../../components/Navbar";
import BookingManageCard from "../../components/BookingManageCard";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { DateTime } from "luxon";
import { Error } from "@mui/icons-material";

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

interface Props {
  booking: BookingManage;
  faq?: {
    question: string;
    answer: string;
  }[];
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ManageReservationPage: FC<Props> = ({ booking, faq = [] }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [confirmationNumber, setConfirmationNumber] = useState('')
  const [dateRangeOpen, setDateRangeOpen] = useState(false)
  const [checkinDate, setCheckinDate] = useState<any>(new Date())
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const buttonEnabled = ((firstName.length > 2) && (lastName.length > 2) && (confirmationNumber.length > 10))

  useEffect(() => {
    if (!anchorEl)
      setDateRangeOpen(false);
    else
      setDateRangeOpen(true);
  }, [anchorEl])

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setSuccess(true)
      }, 2500)
    }
    else {
      setSuccess(false)
    }
  }, [loading])

  const startChat = () => {
    window.Intercom("boot", {
      app_id: "qa6datd3",
    });
    window.Intercom("update");
    window.Intercom("show");
  };

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Container
        maxWidth="md"
        sx={{ mt: 10, mb: 5, minHeight: "calc(100vh - 290px)" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Manage your reservation
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, textAlign: "center", fontWeight: 500 }}
            >
              Modify, cancel, or rebook your reservation below
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <hr style={{ margin: '1rem auto 0rem auto', display: 'block', border: '0px', height: '1px', width: '50%', background: '#ddd' }} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} sx={{ margin: '0px auto 2rem auto' }} justifyContent='center'>

            {loading &&
              <Grid>
                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 6rem 2rem 2rem', minWidth: '100%' }}>
                  {success ? <>
                    <Error sx={{ fontSize: '32px', color: '#9e0303' }} />
                    <Typography variant="body1" color="#9e0303" sx={{ ml: '1rem', fontWeight: 500 }}>
                      Reservation not found
                    </Typography>
                    </> :
                    <>
                    <CircularProgress sx={{ fontSize: '16px', maxWidth: '32px', maxHeight: '32px' }} />
                    <Typography variant="body1" color="text.secondary" sx={{ ml: '1rem', fontWeight: 500 }}>
                      Finding your reservation...
                    </Typography>
                    </>
                  }
              </Grid>
            </Grid>
          }


          {!loading && <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: '1rem', textAlign: "center", fontWeight: 500, mb: '2rem' }}
            >
              Have an existing reservation?
            </Typography>}
            <Grid container>
              <Grid item xs={12} sx={{ mb: '1rem'}}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    First Name / Given Name
                  </InputLabel>
                  <BootstrapInput defaultValue="" onChange={e => setFirstName(e.target.value)} value={firstName} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mb: '1rem'}}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Last Name / Surname
                  </InputLabel>
                  <BootstrapInput defaultValue="" onChange={e => setLastName(e.target.value)} value={lastName} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mb: '1rem'}}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Confirmation Number
                  </InputLabel>
                  <BootstrapInput defaultValue="" onChange={e => setConfirmationNumber(e.target.value)} value={confirmationNumber} />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ mb: '1rem'}}>
                <FormControl onClick={(e) => anchorEl ? setAnchorEl(null) : setAnchorEl(e.currentTarget) }  variant="standard" fullWidth sx={{ cursor: 'pointer' }}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Check-in date
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      open={dateRangeOpen}
                      onClose={() => setDateRangeOpen(false)}
                      inputFormat="MMM dd"
                      disableMaskedInput={true}
                      PopperProps={{ anchorEl: anchorEl, placement: 'bottom' }}
                      value={checkinDate || new Date()}
                      onChange={(e:any) => setCheckinDate(e)}
                      renderInput={() => <BootstrapInput value={DateTime.fromJSDate(checkinDate).toFormat('MMM dd, yyyy')} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button disabled={!buttonEnabled || loading} onClick={() => setLoading(true)} variant='contained'  sx={{ margin: '0px auto', fontWeight: 500, textTransform: 'none' }}> Find Reservation </Button>
              </Grid>
            </Grid>
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
          <Grid item xs={12} md={12} sx={{ my: 2, textAlign: "center" }}>
            <Button
              onClick={startChat}
              variant="contained"
              color="primary"
              sx={{ fontWeight: 500, textTransform: 'none' }}
            >
              Chat with Booking Support
            </Button>
          </Grid>
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
