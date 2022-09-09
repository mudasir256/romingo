import { FC, useState } from "react";
import { MonetizationOn, VerifiedUser } from "@mui/icons-material";
import { Grid, Chip, Box, Typography, Link } from "@mui/material";
import { useHistory } from "react-router-dom";
import ImageSlider from "../ImageSlider";
import RomingoScore from "../RomingoScore/RomingoScore";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import StarIcon from "@mui/icons-material/Star";

import {
  Pets,
  CreditCardOffTwoTone,
  MoneyOffCsredTwoTone,
} from '@mui/icons-material'

export interface ListingCardProps {
  id: string;
  imageURLs: string[];
  name: string;
  addressLine1: string;
  romingoScore: number;
  allows_big_dogs: number;
  cancellation?: boolean;
  lowestAveragePrice: number;
  listingsPagePromoText?: string;
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
  alias: string;
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
const ListingCard: FC<ListingCardProps> = ({
  id,
  duration,
  imageURLs,
  name,
  allows_big_dogs,
  addressLine1,
  listingsPagePromoText,
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
  petFeePolicy,
  alias,
  ...props
}) => {
  const history = useHistory();
  const mobileCardPadding = 1.8;

  const [showRating, setShowRating] = useState(true)

  const chipIconStyle = {
    fontSize: "0.75em",
    px: '0.3em',
    backgroundColor: '#fffff',
    fontFamily: 'overpass-light',
    mt: '0.35em',
    display: 'flex',
    justifyContent: 'flex-start'
  }
  const hasPetFeeReduction = (!!petFeePolicy?.totalFees && petFeePolicy.totalFees !== -1)

  const HotelDescriptors = () => (
    <>
      {hasPetFeeReduction &&
        <Chip
          size="small"
          sx={chipIconStyle}
          icon={<MoneyOffCsredTwoTone fontSize="small" sx={{mr: '0.5em'}}  />}
          label={<p>Save <span style={{color: 'green', fontSize: '1.1em', fontFamily: 'overpass-bold', fontWeight: 900 }}>${Math.round(petFeePolicy.totalFees)}</span> in pet fees</p>}
        />
      }
      <Chip
        size="small"
        sx={chipIconStyle}
        icon={<Pets fontSize="small"  />}
        label={allows_big_dogs ? "All weights accepted" : "2 dogs, up to 75 lbs. each"}
      />
      <Chip
        size="small"
        sx={chipIconStyle}
        icon={<CreditCardOffTwoTone fontSize="small" sx={{mr: '0.5em'}}  />}
        label="Reserve now, pay later"
      />
    </>
  )

  const PriceDetails = () => (
    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          mr: 0.45,
          color: "#222",
          fontFamily: "overpass-regular",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontSize: "1.5em",
          fontWeight: 800,
        }}
      >
        {currency}
        {Math.round(lowestAveragePrice)} /
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mr: 0.45,
          color: "#222",
          fontFamily: "overpass-light",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontSize: "1.0em",
          fontWeight: 800,
        }}
      >
        per night
      </Typography>
    </Box>
 
    {/*
    {!!petFeePolicy?.totalFees && petFeePolicy.totalFees !== -1 && (
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontFamily: "Montserrat",
          fontSize: "65%",
          opacity: 0.8,
          fontWeight: 600,
        }}
      >
        Save{" "}
        <Typography
          component="span"
          sx={{
            // textDecoration: "line-through",
            // textDecorationColor: "#BC4749AA",
            // textDecorationThickness: "1px",
            color: "#4B7D2F",
            fontFamily: "Montserrat",
            fontSize: "120%",
            position: "relative",
            fontWeight: 600,
          }}
        >
          ${Math.round(petFeePolicy.totalFees)}
        </Typography>{" "}
        in pet fees
      </Typography>
    )}
  */}
    </Box>
  )

  return (
    <>
      {highlighted && <Box sx={{ borderTop: "1px solid #ddd" }} />}
      <Box
        sx={{
          color: "text.primary",
          display: "flex",
          borderRadius: 3,
          flexDirection: { xs: "column", sm: "row" },
          maxWidth: "100%",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          transition: "all .25s ease-in-out",
          border: "1px solid #ddd",
          boxShadow: highlighted ? 10 : 1,
          paddingBottom: "0px",
          "&:hover": { boxShadow: 7 },
          my: highlighted ? 4 : 0,
        }}
        {...props}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: 400, md: 350, lg: 350 },
            height: { xs: "auto", sm: 211, md: 186 },
          }}
        >
          <Box sx={{
            position: 'relative',
          }}>
            {showRating &&
              <Box sx={{ position: 'absolute', right: 8, top: 12, zIndex: 50 }}>
                <Chip
                  size="small"
                  sx={{
                    fontSize: "12px",
                    mt: { xs: ".125rem", md: ".5rem" },
                    mb: { xs: ".125rem", md: "auto" },
                    mr: '0.5em',
                    p: '0.3em',
                    backgroundColor: 'rgba(249, 222, 0, .9)', //'#F9DE00',
                    fontFamily: 'overpass-light',
                    color: 'black',
                  }}
                  icon={<StarIcon fontSize="small" />}
                  label={romingoScore}
                />
              </Box>
            }
          </Box>
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
            setShow={setShowRating}
          />
        </Box>

        <Box
          onClick={() => history.push("/hotel/" + alias)}
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
              minHeight: { xs: 160, sm: 186 },
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
              xl={8}
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
                  fontFamily: "overpass-light",
                  whiteSpace: "nowrap",
                  fontSize: '1.25em',
                  textOverflow: "ellipsis",
                  fontWeight: 800,
                  width: '100%',
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
                  fontFamily: "overpass-light",
                  textOverflow: "ellipsis",
                  color: "#999",
                  mb: { xs: ".5rem", md: "0" },
                }}
              >
                {addressLine1}, {city?.name}
              </Typography>

              <Box sx={{   
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mb: '0.5em',
              }}>
                {/*
                <Link
                  onClick={() => history.push(`/hotel/${alias}#reviews`)}
                  sx={{
                    display: { xs: "block" },
                    color: "#666",
                    fontFamily: "montserrat",
                    textDecoration: "underline",
                    mr: -0.5,
                    ml: { xs: 0.25 },
                    mt: { xs: 0, sm: '0.5em' },
                    fontWeight: 500,
                    opacity: 0.75,
                    fontSize: "70%",
                  }}
                >
                  (see reviews)
                </Link>
                */}
              </Box>
              <Box
                sx={{
                  minWidth: "73px",
                  display: { xs: "none", sm: 'block' },
                  mt: 'auto'
                }}
              >
                <HotelDescriptors />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={5}
              lg={4}
              xl={4}
              sx={{
                display: "flex",
                flexDirection: { sm: "column", xs: "row" },
                minHeight: { xs: 60, sm: 140 },
                p: {
                  xs: "0rem .5rem",
                  sm: ".5rem .5rem 0rem 1rem",
                  md: ".75rem 0rem",
                },
                alignItems: "end",
                justifyContent: { xs: "space-between", sm: "flex-end" },
                textAlign: { xs: "left", md: "right" },
              }}
            >
              <Box
                sx={{
                  display: { xs: "block", sm: 'none' },
              
                  fontFamily: "overpass-light", 
                  letterSpacing: '0.25px', 

                }}
              >
               <HotelDescriptors />
              </Box>
              <PriceDetails />
            </Grid>
          </Grid>
        </Box>
      </Box>
      {highlighted && <Box sx={{ borderTop: "1px solid #ddd" }} />}
    </>
  );
};

export default ListingCard;
