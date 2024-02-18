import { FC, useState } from "react";
import { Box, Typography, Link, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../ImageSlider";
import StarIcon from "@mui/icons-material/Star";

import { Pets, Info } from "@mui/icons-material";

import DogIcon from "../../assets/icon/dog.png";
import GiftIcon from "../../assets/icon/gift.svg";
import HotelTags from '../../components/HotelTags'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const stateCodes = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

export interface ListingCardProps {
  id: string;
  imageURLs: string[];
  name: string;
  addressLine1: string;
  romingoScore?: number;
  cancellation?: boolean;
  lowestAveragePrice?: number;
  lowestTotalPriceAfterTax?: number;
  currency?: string;
  dogAmenities?: string[];
  showAmenities?: boolean;
  highlighted?: boolean;
  googlePlaceId?: string;
  duration?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  city?: {
    id: string;
    name: string;
  };
  showPrice?: boolean;
  noLink?: boolean;
  alias: string;
  petFeePolicy?: {
    maxPets: number;
    maxWeightPerPetInLBS: number;
    desc: string;
    perPet: boolean;
    perNight: boolean;
    breakup: JSON;
    totalFees: number;
  };
  amenities?: {
    code: number;
    desc: string;
    value: string;
    accessible: boolean;
    free: boolean;
  };
  flag?: string;
  bookingId?: string;
  state?: string;
  zipcode?: string;
  numberOfReviews?: number;
  taxRate?: string;
  hotel?: any;
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
  cancellation = false,
  lowestAveragePrice,
  lowestTotalPriceAfterTax,
  totalPrice,
  currency = "$",
  dogAmenities = [],
  showAmenities = true,
  highlighted = false,
  showPrice = true,
  noLink = false,
  petFeePolicy,
  alias,
  amenities,
  limitImages = false,
  sessionId,
  hotel,
  state,
  zipcode,
  page,
  numberOfReviews = 0,
  taxRate,
  distanceFromSearch,
  search,
  petBeds,
  petBowls,
  isRomingoFavorite,
  isTrending,
  isSelect,
  ...props
}) => {
  const navigate = useNavigate();
  const mobileCardPadding = 1;

  const [showRating, setShowRating] = useState(true);

  const PriceDetails = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
      
        {isRomingoFavorite && 
          <Box sx={{ color: 'white', borderRadius: '6px', backgroundColor: '#03989E', fontSize: '14px', px: '0.5rem', py: '0.25rem' }}>
            Romingo Favorite
          </Box>
        }
        {((!isRomingoFavorite && !isSelect && isTrending) &&  
          <Box sx={{ borderRadius: '6px', backgroundColor: '#F4DAC9', fontSize: '14px', px: '0.5rem', py: '0.25rem' }}>
            Popular Hotel
          </Box>
        )}
        
        {(!isRomingoFavorite && lowestAveragePrice && isSelect) &&
          <Box sx={{ borderRadius: '6px', backgroundColor: '#F9C171', fontSize: '14px', px: '0.5rem', py: '0.25rem' }}>
            15% off sale
          </Box>
        } 
        {lowestAveragePrice &&
          <Typography
            variant="body2"
            sx={{
              mr: 0,
              mt: "0.1em",
              fontSize: "1.4em",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              color: "black",
            }}
          >
            {(!isRomingoFavorite && isSelect) && 
              <Typography 
                component="span" 
                sx={{ 
                  fontSize: '16px', 
                  mb: 0, 
                  pb: 0, 
                  textDecoration: 'line-through underline', 
                  fontWeight: 600, 
                  mr: '0.25rem' 
                }}
              >
                ${Math.abs(newPrice).toFixed(0)}
              </Typography>
            }
            {currency}{Math.abs(Number(lowestAveragePrice)).toFixed(0)}
          </Typography>
        }

        {totalPrice == lowestAveragePrice &&
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "95%", md: "90%" },
              fontWeight: 500,
              whiteSpace: "nowrap",
              color: "#999",
            }}
          >
            per night
          </Typography>
        }

        {(totalPrice && totalPrice != lowestAveragePrice)? (
          <Typography
            variant="body2"
            sx={{
              mr: 0,
              mt: "0.1rem",
              fontSize: "12px",
              lineHeight: '14px',
              display: "flex",
              alignItems: "center",
            }}
          >
            {currency}
            {Math.abs(totalPrice).toFixed(0)} total

            {/* 
            <Typography
              sx={{
                fontFamily: "sansita-light",
                ml: "0.25em",
                fontSize: "0.75em",
              }}
            >
              {" "}
              / night
            </Typography>
            */}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            sx={{
              mr: 0,
              mt: "0.1em",
              fontSize: "1.25em",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
            }}
          ></Typography>
        )}

        {totalPrice != lowestAveragePrice && <Typography sx={{ fontSize: '12px', color: '#666', lineHeight: '16px'}}>includes taxes and fees</Typography>}
      </Box>
    )
  };

  function slugify(str) {
    if (!str) {
      return ''
    }
    // Convert all non-word characters to hyphens
    str = str.replace(/[^\w-]/g, '-');

    // Remove all consecutive hyphens
    str = str.replace(/-+/g, '-');

    // Trim leading and trailing hyphens
    str = str.trim('-');

    return str.toLowerCase();
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const twoDays = new Date()
  twoDays.setDate(twoDays.getDate() + 2)


  const newPrice = (Math.abs(lowestAveragePrice) * 117.5) / 100

  const params = new URLSearchParams({
    checkIn: search?.checkIn || tomorrow,
    checkOut: search?.checkOut || twoDays,
    adults: search?.occupants?.adults || 2,
    children: search?.occupants?.childrenAge || [],
    isTrending,
    isRomingoFavorite,
    isSelect,
    sessionId
  });

  const hotelUrl = `/pet-friendly-hotel/${slugify(stateCodes[state])}/${slugify(city)}/${alias}?${params.toString()}`
  let starRatingFormat = romingoScore
  if (romingoScore?.toString().length === 1) {
    starRatingFormat = `${romingoScore}.0`
  }

  const neighborhood = null; // TODO: get this from Google API

  return (
    <>
      {highlighted && <Box sx={{ borderTop: "1px solid #ddd" }} />}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: { xs: "center", md: 'stretch' },
          color: "text.primary",
          borderRadius: 3,
          maxWidth: "100%",
          background: "#fff",
          transition: "all .25s ease-in-out",
          border: "1px solid #ddd",
          boxShadow: highlighted ? 10 : 1,
          paddingBottom: "0px",
          "&:hover": { boxShadow: 7 },
          my: highlighted ? 4 : 0,
          maxHeight: { xs: "auto", md: '300px' },
        }}
        // {...props}
      >
        <Box
          sx={{
            width: { xs: "100%",  md: 460 },
            alignSelf: { xs: "center", md: 'auto' },
          }}
        >
          <ImageSlider
            images={imageURLs}
            name={name}
            setShow={setShowRating}
            imageCount={limitImages ? 3 : 10}
            page={page}
          />
        </Box>

      

        <Box
          onClick={() => {
            window.location.href = hotelUrl;
          }}
          sx={{
            cursor: "pointer",
            px: mobileCardPadding,
            py: mobileCardPadding,
            width: "100%",
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              minHeight: { xs: 160, md: 170 },
              p: {
                xs: ".5rem .25rem 0rem .25rem",
                md: "0rem 0.6rem",
              },
              mx: { xs: "0.4rem", md: 0 },
              my: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: 'flex-start',
              height: '100%',
              maxHeight: '100%',
            }}
          >
            <Box>
              <Box sx={{ position: 'relative' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#222",
                    fontSize: "1.30em",
                    fontWeight: 800,
                    letterSpacing: "0px",
                    width: '100%',
                    maxWidth: '420px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: "ellipsis",
                  }}
                >
                  {name}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "95%", md: "95%" },
                  mt: "0.25rem",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  color: "#999",
                }}
              >
                {
                  neighborhood
                  ? `${addressLine1}, ${city}, ${state} ${zipcode}`
                  : `${city}`
                }
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <HotelTags
                pet_fee={hotel?.pet_fee || hotel?.petFee}
                pet_fee_value={hotel?.pet_fee_value || hotel?.petFeeValue}
                pet_size={hotel?.pet_size || hotel?.petSize}
                pet_allowance={hotel?.pet_allowance || hotel?.petAllowance}
                pet_bowls={hotel?.pet_bowls || hotel?.petBowls}
                pet_beds={hotel?.pet_beds || hotel?.petBeds}
                grid={true}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 1,
                mt: 'auto'
              }}
            >
              <Typography variant="base" sx={{ fontSize: '0.9rem', color: '#3F8825'}}>Free cancellation</Typography>
              <Typography variant="base" sx={{ lineHeight: '12px', fontSize: '0.9rem', color: '#3F8825'}}>Book now, pay later</Typography>
            </Box>
            
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                width: 1,
                marginTop: 'auto',
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: "0.9em",
                }}
              >
                <Box sx={{ color: "black", mt: '0.1rem' }}>
                  <StarIcon fontSize="inherit" />
                </Box>
                <span
                  style={{
                    marginLeft: "0.25em",
                    marginRight: "0.1em",
                    color: "black",
                  }}
                >
                  {starRatingFormat}
                </span>
                <Link
                  href={`${hotelUrl}#reviews`}
                  sx={{
                    color: "#666",
                    textDecoration: "underline",
                    ml: 0.25,
                    fontWeight: 500,
                    opacity: 0.75,
                    fontSize: "70%",
                  }}
                >
                  <u>({numberOfReviews} reviews)</u>
                </Link>
              </Box>
              <Box>
                {showPrice && <PriceDetails /> }
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {highlighted && <Box sx={{ borderTop: "1px solid #ddd" }} />}
    </>
  );
};

export default ListingCard;