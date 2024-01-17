import { FC, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingDetailCard from "../../components/BookingDetailCard";
import CancelPolicy from "../../components/CancelPolicy";
import PriceDetailCard from "../../components/PriceDetailCard";
import CheckoutInformation from "../../components/CheckoutInformation";
import { RoomInfo } from "../../components/RoomCard/RoomCard";
import { Button, useMediaQuery } from "@mui/material";
import ScrollToTop from "../../components/ScrollToTop";
import ImageSlider from "../../components/ImageSlider";
import { Star } from "@mui/icons-material";
import RomingoScore from "../../components/RomingoScore";
import { useNavigate, useLocation } from "react-router-dom";
import { ModifyBookingDetails, GetBookingDetails } from '../../constants/constants'
import { gql, useMutation, useQuery } from "@apollo/client";
import Loader from "../../components/UI/Loader";

declare global {
  interface Window {
    Intercom: any;
  }
}

interface ModifyBookingProps {
  hotel: any;
  bookingDetails: any;
  priceDetails: any;
  checkinDescription: any;
  finePrint: any;
  room: RoomInfo;
}

const ModifyBooking: FC<ModifyBookingProps> = () => {
  const [payLater, setPayLater] = useState(false);
  const search = useSelector((state: any) => state.searchReducer.search);
  const { finePrint, room } = useSelector(
    (state: any) => state.hotelCheckoutReducer.checkout
  );
  const navigate = useNavigate();
  const pageLocation = useLocation<any>();
  const detail = useSelector(
    (state: any) => state.hotelCheckoutReducer.checkout
  );
  const [list, setList] = useState<any>([]);
  const { occupants } = useSelector((state: any) => state.searchReducer.search);
  const hotel = useSelector((state: any) => {
    return state.hotelDetailReducer.detail;
  });

  const [
    modifyBookingDetails,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(gql`${ModifyBookingDetails}`);

  const { data: bookingDetails } = useQuery(
    gql`${GetBookingDetails}`, {
    fetchPolicy: "network-only",
    variables: {
      id: pageLocation.state?.bookingId,
    }
  });

  useEffect(() => {
    if (bookingDetails) {
      setList(bookingDetails.getBookingDetails[0])
    }
  }, [bookingDetails])

  const mobile = useMediaQuery("(max-width:800px)");

  // set payLater to true if check-in is more than 3 days in the future
  useEffect(() => {
    const dateNow = new Date();
    const checkinDate = new Date(search.checkIn);
    const hours = Math.abs(checkinDate.getTime() - dateNow.getTime()) / 36e5;
    if (hours > 72) {
      setPayLater(true);
    }
  }, [search]);

  useEffect(() => {
    if (screen.height > 700) {
      window.Intercom("boot", {
        app_id: "qa6datd3",
        alignment: "right",
        custom_launcher_selector: "#CUSTOM",
      });
      window.Intercom("update");
    }
  }, []);

  const handleCancelReservation = () => {
    if (list.sabreConfirmationId) {
      const adults: { firstName: string; lastName: string }[] = [];
      const children: {
        firstName: string;
        lastName: string;
        age: number;
      }[] = [];

      Array.from(Array(occupants.adults)).forEach((_, i) => {
        if (i === 0) {
          adults.push({
            firstName: list.firstName.trim(),
            lastName: list.lastName.trim(),
          });
        } else {
          const guestId = String.fromCharCode(64 + i);
          adults.push({
            firstName: `Adult${guestId}`,
            lastName: list.lastName.trim(),
          });
        }
      });

      if (occupants.children > 0) {
        Array.from(Array(occupants?.childrenAge?.length)).forEach(
          (x_, i) => {
            const childId = String.fromCharCode(65 + i);
            children.push({
              firstName: `Child${childId}`,
              lastName: list.lastName.trim(),
              age: occupants.childrenAge[i],
            });
          }
        );
      }

      modifyBookingDetails({
        variables: {
          cancelBookingInput: {
            confirmationId: list.sabreConfirmationId,
            cancelAll: true
          },
          createBooking2Input: {
            priceKey: detail?.room?.room?.priceKey,
            customerId: list?.customerId,
            paymentIntentId: list.paymentIntentId,
            email: list.email,
            mobile: {
              countryCallingCode: parseInt(list.mobileCountryCallingCode),
              number: list.mobileNumber.toString(),
            },
            adults: adults,
            children: children,
            noOfDogs: occupants.dogs,
            intentType: list.setupIntent ? 'setup Intent' : 'payment Intent',
            setupIntentObject: list.setupIntent,
            cardId: list.cardId,
          }
        }
      }).then((status) => {
        if (status.data.cancelBooking.status) {
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      })
    }
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#feffff",
          pt: { sm: "64px", xs: "56px" },
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            sx={{
              py: 3,
            }}
          >
            {!mobile && (
              <Grid item xs={12} md={8} order={{ xs: 2, sm: 1 }}>
                <CheckoutPageListingCard
                  {...hotel}
                  showPrice={false}
                  noLink
                  small
                />
                {mutationLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      right: 0,
                      left: 0,
                    }}
                  >
                    <Loader size="300px" />
                  </Box>
                ) :
                  mutationData !== undefined ? (
                    <Box sx={{ mt: 5 }}>
                      <Typography
                        variant="h5"
                        color="primary"
                        sx={{ textAlign: "left", mb: 2 }}
                      >
                        You&apos;re booked!
                      </Typography>

                      <Typography variant="body1" sx={{ textAlign: "left" }}>
                        Your confirmation number is:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ textAlign: "left", my: 2, fontWeight: "bold" }}
                      >
                        {mutationData?.createBooking2?.booking?.propertyConfirmationId
                          ? mutationData?.createBooking2?.booking
                            ?.propertyConfirmationId
                          : mutationData?.createBooking2?.booking
                            ?.sabreConfirmationId}
                      </Typography>
                      <Typography variant="body1">
                        We&apos;ve sent you an email with all of the details of
                        your booking.
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Typography
                        variant="h5"
                        sx={{
                          mt: 3
                        }}
                      >
                        Modification Confirmation
                      </Typography>
                      <Box
                        sx={{
                          mt: 2,
                          mb: "1rem",
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "90px"
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="success"
                          size="large"
                          onClick={handleCancelReservation}
                        >
                          Modify
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="large"
                          onClick={() => navigate('/reservation/manage')}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </>
                  )}
              </Grid>
            )}
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Grid container spacing={2}>
                {mobile && (
                  <Grid item xs={12}>
                    <CheckoutPageListingCard
                      {...hotel}
                      showPrice={false}
                      noLink
                      small
                    />
                  </Grid>
                )}
                <Grid item xs={12} order={{ xs: 1, md: 1 }}>
                  <BookingDetailCard />
                </Grid>
                <Grid item xs={12} order={{ xs: 2, md: 2 }}>
                  <PriceDetailCard payLater={payLater} />
                </Grid>
                {mobile && (
                  <Grid item xs={12} order={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#222",
                        fontFamily: "Montserrat",
                        textAlign: "left",
                        mb: 1,
                      }}
                    >
                      Finish Your Reservation
                    </Typography>
                    <CheckoutInformation
                      sx={{ mt: 2, mb: "1rem" }}
                      finePrint={finePrint}
                      price={detail?.room?.room?.totalPriceAfterTax}
                      priceKey={detail?.room?.room?.priceKey}
                      payLater={payLater}
                      policy={room?.room?.cancelationPolicy}
                    />
                  </Grid>
                )}
                <Grid item xs={12} order={{ xs: 3, md: 3 }}>
                  <CancelPolicy policy={room?.room?.cancelationPolicy} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export interface ListingCardProps {
  id: string;
  imageURLs: string[];
  name: string;
  addressLine1: string;
  romingoScore: number;
  cancellation?: boolean;
  lowestAveragePrice: number;
  currency?: string;
  dogAmenities?: string[];
  showAmenities?: boolean;
  highlighted?: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  city: {
    id: string;
    name: string;
  };
  neighborhood: string;
  showPrice?: boolean;
  noLink?: boolean;
  petFeePolicy: {
    maxPets: number;
    maxWeightPerPetInLBS: number;
    desc: string;
    perPet: boolean;
    perNight: boolean;
    breakup: JSON;
    totalFees: number;
  };
}

const CheckoutPageListingCard: FC<ListingCardProps> = ({
  imageURLs,
  name,
  addressLine1,
  romingoScore,
  city,
  lowestAveragePrice,
  currency = "$",
  highlighted = false,
  showPrice = true,
  ...props
}) => {
  return (
    <Box
      sx={{
        color: "text.primary",
        boxShadow: 0,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        maxWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: highlighted ? "lightBackground.main" : "white",
        borderBottom: "1px solid #ddd",
        pb: "1rem",
      }}
      {...props}
    >
      <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: 0 }, maxWidth: "100%" }}>
        <Box
          sx={{
            pt: 3,
            px: { xs: 0, sm: 1.8 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 275,
            }}
          >
            <ImageSlider
              images={imageURLs}
              name={name}
              sx={{
                width: "100%",
                height: 275,
                borderRadius: "10px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
              justifyContent: "center",
              mt: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#222",
                fontFamily: "Montserrat",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontSize: "140%",
                flex: 1,
                fontWeight: 800,
              }}
            >
              {name}
            </Typography>
            <RomingoScore score={romingoScore} />
          </Box>

          <Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "95%", sm: "100%" },
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontFamily: "Roboto",
                textOverflow: "ellipsis",
                color: "#999",
                mb: { xs: 0, md: -1 },
              }}
            >
              {addressLine1}, {city?.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  textAlign: "right",
                  justifyContent: "end",
                  flexDirection: "column",
                }}
              >
                {showPrice && (
                  <>
                    <Typography
                      variant="h5"
                      sx={{
                        mr: 0.45,
                        letterSpacing: 1,
                        color: "text.secondary",
                        fontSize: "190%",
                      }}
                    >
                      {currency}
                      {Math.round(lowestAveragePrice)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      / night
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default ModifyBooking;
