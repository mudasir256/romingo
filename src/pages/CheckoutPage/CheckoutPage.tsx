import { FC, useEffect } from "react";

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
import { useMediaQuery } from "@mui/material";
import ScrollToTop from "../../components/ScrollToTop";
import ImageSlider from "../../components/ImageSlider";
import { Star } from "@mui/icons-material";
import RomingoScore from "../../components/RomingoScore";

declare global {
  interface Window {
    Intercom: any;
  }
}

interface Props {
  hotel: any;
  bookingDetails: any;
  priceDetails: any;
  checkinDescription: any;
  finePrint: any;
  room: RoomInfo;
}

const CheckoutPage: FC<Props> = () => {
  const { finePrint, room } = useSelector(
    (state: any) => state.hotelCheckoutReducer.checkout
  );

  const detail = useSelector(
    (state: any) => state.hotelCheckoutReducer.checkout
  );

  const hotel = useSelector((state: any) => {
    return state.hotelDetailReducer.detail;
  });

  const mobile = useMediaQuery("(max-width:800px)");

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
                <CheckoutInformation
                  sx={{ mt: 2, mb: "1rem" }}
                  finePrint={finePrint}
                  price={detail?.room?.room?.totalPriceAfterTax}
                  priceKey={detail?.room?.room?.priceKey}
                />
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
                  <PriceDetailCard />
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
  );
};

export default CheckoutPage;
