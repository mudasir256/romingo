import Box from "@material-ui/core/Box";
import React, { FC, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
          <Grid container>
            <Grid
              item
              xs={12}
              sm={8}
              sx={{
                mx: "auto",
                mt: 3,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  my: 2,
                  fontSize: "125%",
                  textAlign: "center",
                }}
              >
                MANAGE YOUR RESERVATION FREQUENTLY ASKED QUESTIONS
              </Typography>
              {faq.map((item, key) => {
                return (
                  <Box
                    key={key}
                    sx={{
                      mb: 2,
                    }}
                  >
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          Q: {item.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2">
                          A: {item.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ManageReservationPage;
