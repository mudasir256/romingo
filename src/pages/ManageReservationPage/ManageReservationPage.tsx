import Box from "@material-ui/core/Box";
import React, { FC, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  }[]
}

const ManageReservationPage: FC<Props> = ({ booking, faq }) => {

  const [confirmedReservation, setConfirmedReservation] = useState(false);
  const [email, setEmail] = useState("");
  const [reservationNumber, setReservationNumber] = useState("");

  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: {
            sm: "64px",
            xs: "56px",
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
            <Grid item sm={false} md={3}>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: "primary.main",
                    mb: 1
                  }}
                >
                  Manage Your Reservation
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.primary",
                    my: 2
                  }}
                >
                  For the fastest and most convenient service use our Manage Reservation feature below to receive a copy of your reservation confirmation email or to cancel your reservation. Please review your cancellation policy prior to cancelling your reservation, which was provided on the reservation confirmation page as well as your confirmation email.
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={false} md={3}>
            </Grid>
          </Grid>
          {confirmedReservation && 
            (<Box
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
            <Grid container>
              <Grid item sm={false} md={3}>
              </Grid>
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
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1
                        }}
                      >
                        Your Email (must match the email provided at the time of reservation)
                      </Typography>
                      <TextValidator
                        fullWidth={true}
                        name="email"
                        label="Email Address"
                        variant="outlined"
                        value={email}
                        validators={["required", "isEmail"]}
                        errorMessages={["This field is required", "Email is not valid"]}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setEmail(e.currentTarget.value);
                        }}
                        FormHelperTextProps={{}}
                      />
                    </Box>
                    <Box
                      sx={{
                        mt: 1
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1
                        }}
                      >
                        Your Reservation Itinerary Number
                      </Typography>
                      <TextValidator
                        fullWidth={true}
                        name="reservation"
                        label="Confirmation Number"
                        variant="outlined"
                        value={reservationNumber}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setReservationNumber(e.currentTarget.value);
                        }}
                        FormHelperTextProps={{}}
                      />
                    </Box>
                    <Box
                      sx={{
                        mt: 1,
                        textAlign: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                      >
                        Continue
                      </Button>
                    </Box>
                  </ValidatorForm>
                </Box>
              </Grid>
            </Grid>
          )}
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  my: 2,
                  fontSize: "125%"
                }}
              >
                MANAGE YOUR RESERVATION FREQUENTLY ASKED QUESTIONS
              </Typography>
              {faq.map((item, key) => {
                return (
                  <Box 
                    key={key}
                    sx={{
                      mb: 2
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
                            fontWeight: "bold"
                          }}
                        >
                          Q: {item.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="body2"
                        >
                          A: {item.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                )
              })}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ManageReservationPage;
