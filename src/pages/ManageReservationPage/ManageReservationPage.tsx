import React, { FC, useState } from "react";
import { useHistory } from 'react-router-dom';
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
  DialogProps,
} from "@mui/material";
import { Occupant } from "../../components/OccupantSelector/OccupantSelector";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";
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
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [list, setList] = useState<BookingInterface[]>([]);
  const buttonEnabled =
    emailAddress.length > 2 && confirmationNumber.length > 8;

  const data = {}

  const handleFindReservation = () => {
    history.push({
      pathname: '/reservation/details',
      state: { emailAddress, confirmationNumber }
    })
  }

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
      <Footer />
    </>
  );
};

export default ManageReservationPage;
