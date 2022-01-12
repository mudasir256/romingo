import React, { FC, useState } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Hidden from "@mui/material/Hidden";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Occupant } from "../../components/OccupantSelector/OccupantSelector";
import Navbar from "../../components/Navbar";
import BookingManageCard from "../../components/BookingManageCard";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

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

const ManageReservationPage: FC<Props> = ({ booking, faq = [] }) => {
  const [confirmedReservation, setConfirmedReservation] = useState(false);
  const [email, setEmail] = useState("");
  const [reservationNumber, setReservationNumber] = useState("");

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
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h2"
              color="text.primary"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Change or Cancel a Booking
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} sx={{ my: 2, textAlign: "center" }}>
            <Button
              onClick={startChat}
              variant="contained"
              color="primary"
              size="large"
            >
              Chat With Booking Support
            </Button>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "center", mt: 1 }}
            >
              during business hours
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2, mb: 3 }}
            >
              Please reach out to our reservation support team if you would like to
              modify or cancel your reservation. To manage a reservation made through
              Romingo, you will need the original email address used to make the
              reservation and the confirmation number from your confirmation
              email. Please review the cancellation policy for your reservation
              prior to cancelling your reservation. The policy was provided on
              the reservation checkout page as well as your confirmation email.
            </Typography>
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
