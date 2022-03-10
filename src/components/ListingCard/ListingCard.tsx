import { FC, useEffect, useState } from "react";
import { Check } from "@mui/icons-material";
import { Grid, Chip, Link, Box, Stack, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import ImageSlider from "../ImageSlider";
import RomingoScore from "../RomingoScore/RomingoScore";
import { MoneyOffRounded, VerifiedUser } from "@mui/icons-material";
import LocationCityIcon from "@mui/icons-material/LocationCity";

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
  googlePlaceId?: string;
  duration?: number;
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
const ListingCard: FC<ListingCardProps> = ({
  id,
  duration,
  imageURLs,
  name,
  addressLine1,
  googlePlaceId,
  romingoScore,
  city,
  neighborhood,
  cancellation = false,
  lowestAveragePrice,
  currency = "$",
  dogAmenities = [],
  showAmenities = true,
  highlighted = false,
  showPrice = true,
  noLink = false,
  ...props
}) => {
  const history = useHistory();
  const mobileCardPadding = 1.8;

  // const [reviewData, setReviewData] = useState<any>()
  // const [reviewDialog, setReviewDialog] = useState<boolean>(false)

  // const getReviewData = () => {
  //   if (window.google) {
  //     const service = new window.google.maps.places.PlacesService(document.createElement('div'));
  //     if (googlePlaceId !== undefined) {
  //       service.getDetails({ placeId: googlePlaceId, fields: ['reviews', 'rating', 'user_ratings_total'] }, (a ,b) => { setReviewData(a)} );
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (googlePlaceId) {
  //     const script = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.addEventListener('load', function(event) {
  //       getReviewData()
  //     });
  //     script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAnlMeQQ072sRw22U6aG0zLTHbyh0g8TB0&libraries=places';
  //     setTimeout(() => {
  //       document.getElementsByTagName('head')[0].appendChild(script);
  //     }, 200)
  //   }
  // }, [googlePlaceId])

  return (
    <Box
      sx={{
        color: "text.primary",
        boxShadow: 1,
        display: "flex",
        borderRadius: 3,
        flexDirection: { xs: "column", sm: "row" },
        maxWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
        transition: "all .25s ease-in-out",
        border: "1px solid #ddd",
        "&:hover": { boxShadow: 7 },
        paddingBottom: "0px",
      }}
      {...props}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 400, md: 350, lg: 350 },
          height: { xs: "auto", sm: 211, md: 186 },
        }}
      >
        <ImageSlider
          images={imageURLs}
          name={name}
          sx={{
            width: { xs: "100%", sm: 250, md: 200, lg: 200 },
            height: { xs: 250, sm: 212, md: 187 },
            borderTopRightRadius: { xs: "6px", sm: 0 },
            borderBottomRightRadius: { xs: 0, sm: 0 },
            borderBottomLeftRadius: { xs: 0, sm: "6px" },
            borderTopLeftRadius: { xs: "6px", sm: "6px" },
            boxShadow: 0,
          }}
        />
      </Box>

      <Box
        onClick={() => history.push("/details/" + id)}
        sx={{
          cursor: "pointer",
          px: { xs: mobileCardPadding, sm: 0 },
          pb: { xs: mobileCardPadding, sm: "0" },
          width: "100%",
        }}
      >
        <Grid
          container
          sx={{
            minHeight: { xs: 200, sm: 162 },
            p: {
              xs: ".5rem .75rem 0rem .75rem",
              sm: ".5rem .5rem .5rem 1rem",
              md: "0rem 1rem",
            },
          }}
        >
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            lg={8}
            xl={9}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: {
                xs: ".5rem",
                sm: ".5rem .5rem .5rem 1rem",
                md: ".75rem 0rem",
              },
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
                fontSize: "120%",
                fontWeight: 800,
              }}
            >
              {name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "95%", sm: "90%" },
                mt: { xs: ".25rem", sm: ".125rem" },
                overflow: "hidden",
                fontWeight: 500,
                whiteSpace: "nowrap",
                fontFamily: "Roboto",
                textOverflow: "ellipsis",
                color: "#999",
                mb: { xs: ".5rem", md: "0" },
              }}
            >
              {addressLine1}, {city?.name}
            </Typography>

            <Chip
              sx={{
                fontSize: "12px",
                mt: { xs: ".125rem", md: ".5rem" },
                mb: { xs: ".125rem", md: "auto" },
                mr: "auto",
              }}
              icon={<LocationCityIcon />}
              label={neighborhood}
            />

            <Box
              sx={{
                pb: { xs: "0rem", sm: "0rem" },
                pt: { xs: ".5rem", sm: "1rem" },
                mt: { md: "0px", sm: "1rem" },
                ml: { sm: "0px", xs: "0px" },
              }}
            >
              <Box sx={{ mb: 1, display: "flex" }}>
                <Check
                  sx={{
                    fontSize: 15,
                    color: "#5b8d3e",
                    mt: ".25rem",
                    mr: ".5rem",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    pr: 0.15,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontFamily: "Roboto",
                    fontSize: "80%",
                    color: "#5b8d3e",
                  }}
                >
                  No hidden fees
                </Typography>
              </Box>
              <Box sx={{ mt: 1, mb: "auto", display: "flex" }}>
                <Check
                  sx={{
                    fontSize: 15,
                    color: "#5b8d3e",
                    mt: ".25rem",
                    mr: ".5rem",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    pr: 0.15,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontFamily: "Roboto",
                    fontSize: "80%",
                    color: "#5b8d3e",
                  }}
                >
                  Fully refundable, free cancellation
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            lg={4}
            xl={3}
            sx={{
              display: "flex",
              flexDirection: { sm: "column", xs: "row" },
              minHeight: { xs: 60, sm: 162 },
              p: {
                xs: "0rem .5rem",
                sm: ".5rem .5rem 0rem 1rem",
                md: ".75rem 0rem",
              },
              alignItems: "end",
              justifyContent: { xs: "space-between", sm: "center" },
            }}
          >
            <RomingoScore score={romingoScore} />
            <Box
              sx={{
                mt: { xs: "0px", sm: "auto" },
                ml: { sm: "auto", xs: "0px" },
                mb: "0px",
                alignItems: "center",
                display: "flex",
                textAlign: { sm: "right", xs: "left" },
                justifyContent: { xs: "start", sm: "end" },
                flexDirection: { sm: "row", xs: "column" },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mr: 0.45,
                  color: "#222",
                  fontFamily: "Montserrat",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  fontSize: "120%",
                  fontWeight: 800,
                }}
              >
                {currency}
                {Math.round(lowestAveragePrice)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  opacity: 0.8,
                  fontWeight: 400,
                  fontSize: "70%",
                }}
              >
                per night
              </Typography>
            </Box>
            {/* <Typography variant="h5" sx={{ fontWeight: 500, mt: '.5rem', mr: 0.45, ml: 'auto',  color: "text.secondary", fontSize: "85%", }}>
                      { duration ? `$${lowestAveragePrice*duration} for ${duration} nights` : 'duration'}
                  </Typography> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ListingCard;
