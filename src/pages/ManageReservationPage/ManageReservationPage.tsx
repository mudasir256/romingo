import Box from "@mui/material/Box";
import React, { FC, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Occupant } from "../../components/OccupantSelector/OccupantSelector";
import Navbar from "../../components/Navbar";
import BookingManageCard from "../../components/BookingManageCard";

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

  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: {
            md: "100px",
            xs: "76px",
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 3,
          }}
        >
          <Grid container>
            <Grid item sm={false} md={2}></Grid>
            <Grid item xs={12} md={8}>
              <Box>
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
                  confirmation number from your confirmation email. Please
                  review the cancellation policy for your reservation prior to
                  cancelling your reservation. The policy was provided on the
                  reservation checkout page as well as your confirmation email.
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={false} md={3}></Grid>
          </Grid>
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
            <Grid container sx={{ mt: 2 }}>
              <Grid item sm={false} md={3}></Grid>
              <Grid item sm={12} md={6}>
                <Box>
                  <ValidatorForm
                    onSubmit={(e: React.SyntheticEvent) => {
                      e.preventDefault();
                      // dispatch(loginUser({
                      //   email,
                      //   password
                      // }))
                      setConfirmedReservation(true);
                    }}
                  >
                    <Box>
                      <TextValidator
                        fullWidth={true}
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
                        fullWidth={true}
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
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ManageReservationPage;
