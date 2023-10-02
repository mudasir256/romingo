import React, { FC, useState, MouseEventHandler, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CSSObject, FormControl, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import { SvgIcon } from "@mui/material";
import SingleBedOutlinedIcon from "@mui/icons-material/SingleBedOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import RoomPreferencesOutlinedIcon from "@mui/icons-material/RoomPreferencesOutlined";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { setCheckout } from "../../store/hotelCheckoutReducer";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import PeopleIcon from '@mui/icons-material/People';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
} from "@mui/material";
import {
  Bathtub,
  FreeBreakfast,
  InfoOutlined,
  KingBed,
  LocalBar,
  Vrpano,
  SingleBed,
  SquareFoot,
} from "@mui/icons-material";
import {
  Casino,
  AccountBalanceWallet,
  MeetingRoom,
  Work,
  ChildCare,
  Weekend,
  Bed,
  SportsGolf,
  SportsTennis,
  Wifi,
  SmokeFree,
  Accessible,
  CarRental,
  Crib,
  Chair,
  AcUnit,
  Tv,
  Kitchen,
  LocalMovies,
  CleaningServices,
  Coffee,
  Phone,
  Microwave,
} from "@mui/icons-material";
import ImageSlider from "../ImageSlider";
interface Props {
  sx?: CSSObject;
  room: any;
  beds: {
    code: number;
    count: number;
    desc: string;
    __typename: string;
  }[];
  desc: string;
  amenities: {
    code: number;
    desc: string;
    value: string;
  }[];
  averagePrice: number;
  averagePriceAfterTax: number;
  breakfastIncluded: boolean;
  dinnerIncluded: boolean;
  totalFees?: number;
  fees?: {
    amount: number;
    desc: string;
  }[];
  lunchIncluded: boolean;
  maxOccupants: number;
  nonSmoking: boolean;
  priceKey: string;
  totalPrice: number;
  totalPriceAfterTax: number;
  type: string;
  bestRate?: boolean;
  cancelationPolicy: {
    deadlineLocal: string | null;
    cancelable: boolean;
  };
  feesIncluded: boolean;
  romingoMatch: boolean;
  areaInSquareFeet: number;
  featuredImageURL: string;
  imageURLs: Array<string>;
  name?: string;
  flag?: string;
  bookingId?: string;
}

export interface RoomInfo {
  beds: {
    code: number;
    count: number;
    desc: string;
    __typename: string;
  }[]; //no
  desc: string; //no
  amenities: {
    code: number;
    desc: string;
    value: string;
  }[]; //no
  averagePrice: number; //final price is there if we can use original price we can use that field
  averagePriceAfterTax: number; //Final price after tax is there 
  breakfastIncluded: boolean; //no breakfast details
  dinnerIncluded: boolean; //no dinner details
  totalFees?: number; //we have array of fees
  fees?: {
    amount: number;
    desc: string;
  }[]; //we have amount and title so we can use title in place of desc
  lunchIncluded: boolean;//not there
  maxOccupants: number; //if adultCounts is there it will be fine
  nonSmoking: boolean;// not there
  priceKey: string;//not there but there is a room key
  totalPrice: number; //its there
  totalPriceAfterTax: number; //its there
  type: string;//i think we can use room name
  bestRate?: boolean;// only price is there
  cancelationPolicy: {
    deadlineLocal: string | null;
    cancelable: boolean;
  };//not there
  feesIncluded: boolean; //i think we can calculate
  romingoMatch: boolean; //i am not sure
  areaInSquareFeet: number; //no
  featuredImageURL: string; //no
  imageURLs: Array<string>; //no
  name?: string; //its there
}

const RoomCard: FC<Props> = ({
  sx,
  room,
  hotel,
  sessionId,
  beds,
  desc,
  amenities,
  averagePrice,
  averagePriceAfterTax,
  fees,
  totalFees,
  totalPrice,
  totalPriceAfterTax,
  feesIncluded,
  romingoMatch,
  areaInSquareFeet,
  featuredImageURL,
  imageURLs,
  name,
  type,
  flag,
  bookingId,
  pricePerNight,
  roomTitle,
  isRefundable,
  nights = 1,
  hasCombinedRate,
  altFinalPrice,
  normalFinalPrice,
  refundableRoom,
  markup,
  removeNonRefundableOption = false,
  refundPolicy,
  ...props
}) => {


  const history = useHistory();
  const [showDialog, setShowDialog] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [refundAnchorEl, setRefundAnchorEl] = useState<null | Element>(null);
  const [selectedRadio, setSelectedRadio] = useState(removeNonRefundableOption ? 'refundable' : 'non')

  const handleOpenPrice: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleOpenRefundData: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRefundAnchorEl(refundAnchorEl ? null : e.currentTarget);
  };

  const handleClose = () => {
    setShowDialog(false);
    setAnchorEl(null);
  };


  const handleBook: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // if (removeNonRefundableOption) {

    // }

    if (selectedRadio === 'refundable') {

       dispatch(
        setCheckout({
          finalPrice: (refundableRoom?.PackagePrice?.FinalPrice + markup),
          room: { ...refundableRoom, imageURLs },
          hotel: hotel,
          sessionId: sessionId
        })
      );
      history.push("/checkout")
      return 
    }
     dispatch(
      setCheckout({
        finalPrice: totalPriceAfterTax,
        room: { ...room, imageURLs },
        hotel: hotel,
        sessionId: sessionId
      })
    );
    history.push("/checkout")
  };

  const open = Boolean(anchorEl);
  const id = open ? "transitions-popper" : undefined;

  const refundOpen = Boolean(refundAnchorEl);
  const refundId = refundOpen ? "transitions-popper" : undefined;


  const AmenitiesList = {
    'pet-friendly room': CheckCircleOutlineIcon,
    'WIFI': Wifi,
    'Air conditioning': AcUnit,
    'In-room climate control (air conditioning)': AcUnit,
    'TV': Tv,
    'Refrigerator': Kitchen,
    'KITCHEN': Kitchen,
    'Pay movies': LocalMovies,
    'Daily housekeeping': CleaningServices,
    'COFFEE': Coffee,
    'Premium bedding': Bed,
    'TELEPHONE': Phone,
    'MICROWAVE': Microwave,
    'BAR': LocalBar,

    //Bed types
    'KING bed': LocalHotelIcon,
    'DOUBLE bed': LocalHotelIcon,
    '2 DOUBLE beds': LocalHotelIcon,
    '2 DOUBLE KING 2 QUEEN bed': LocalHotelIcon,
    'KING 2 QUEEN bed': LocalHotelIcon,
    '2 QUEEN KING 2 bed': LocalHotelIcon, 
    'QUEEN bed': LocalHotelIcon,
    '2 QUEEN beds': LocalHotelIcon,
    'Sleeps 3': PeopleIcon,
    'Sleeps 5': PeopleIcon,
  }

  const SLEEP_AMOUNT = {
    'KING': 3,
    'DOUBLE': 3,
    '2 DOUBLE': 5,
    'QUEEN': 3,
    '2 QUEEN': 5
  }

  const bedType = room?.Rooms[0].BedType
  const sleeps = SLEEP_AMOUNT[bedType]
  
  let matchingAmenities = []
  if (bedType && sleeps) {
    matchingAmenities = ['pet-friendly room', `${bedType} ${bedType.charAt(0) == '2' ? 'beds' : 'bed'}`, `Sleeps ${sleeps}`, ...Object.keys(AmenitiesList).filter(key => amenities.indexOf(key) > -1), ...amenities.filter(key => Object.keys(AmenitiesList).indexOf(key) === -1)]
  } else {
    matchingAmenities = ['pet-friendly room', ...Object.keys(AmenitiesList).filter(key => amenities.indexOf(key) > -1), ...amenities.filter(key => Object.keys(AmenitiesList).indexOf(key) === -1)]
  }

  const getTimestamp = (timestamp) => {
    if (!timestamp) {
      return ''
    }

    const regex = /\b\d+\b/;
    const timestampMatch = timestamp.match(regex);

    if (timestampMatch) {
      const timestamp = parseInt(timestampMatch[0], 10);
      return timestamp
    } else {
      console.log("No timestamp found in the string.");
    }
    return ""
  }

  console.log('refund policy')
  console.log(refundPolicy)
  const refundablePrice = Math.abs(altFinalPrice - normalFinalPrice).toFixed(0)
  const formatCancelPolicy = new Date(getTimestamp(refundPolicy?.CancellationPolicy?.CancellationPolicies?.find(item => true)?.DateFrom)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        flexWrap: "wrap",
        minHeight: "200px",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {featuredImageURL ? (
            <Box
              sx={{
                margin: {
                  xs: "0rem -1rem 1rem -1rem",
                  sm: "0rem -1rem 1rem -1rem",
                },
              }}
            >
              <ImageSlider
                images={imageURLs}
                name={roomTitle ? roomTitle : "Room Image"}
                sx={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "50px",
                  borderBottom: "1px solid #ddd",
                  borderRadius: "6px 6px 0px 0px",
                  minHeight: { xs: "200px", sm: "200px", md: "220px" },
                  color: "#03989e",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                fontSize: "50px",
                borderBottom: "1px solid #ddd",
                margin: {
                  xs: "0rem -1rem 1rem -1rem",
                  sm: "0rem -1rem 1rem -1rem",
                },
                borderRadius: "6px 6px 0px 0px",
                color: "#03989e",
              }}
            >
        
              {beds && beds?.map((bed, key) => {
                return Array.from({ length: bed.count }, (_, i: number) => (
                  <React.Fragment key={key + "_" + i +bed.code}>
                    {bed.code === 5 && (
                      <KingBedOutlinedIcon
                        sx={{
                          fontSize: { xs: "25px", md: "28px" },
                          p: 0.5,
                        }}
                      />
                    )}
                    {bed.code === 3 && (
                      <KingBedOutlinedIcon
                        sx={{
                          fontSize: { xs: "25px", md: "28px" },
                          transform: "scale(1.25, 1)",
                          p: 0.5,
                        }}
                      />
                    )}
                    {bed.code === 9 && (
                      <SingleBedOutlinedIcon
                        sx={{
                          fontSize: { xs: "25px", md: "28px" },
                          p: 0.5,
                        }}
                      />
                    )}
                    {bed.code === 1 && (
                      <KingBedOutlinedIcon
                        sx={{
                          fontSize: { xs: "25px", md: "28px" },
                          transform: "scale(0.85, 0.9)",
                          p: 0.5,
                        }}
                      />
                    )}
                    {bed.code === 6 && (
                      <WeekendOutlinedIcon
                        sx={{
                          fontSize: { xs: "25px", md: "28px" },
                          p: 0.5,
                        }}
                      />
                    )}
                    {(!beds || beds.length == 0) && (
                      <React.Fragment>
                        <RoomPreferencesOutlinedIcon
                          sx={{
                            fontSize: { xs: "25px", md: "28px" },
                            p: 0.5,
                          }}
                        />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ));
              })}
            </Box>
          )}
          <Typography
            variant="h6"
            sx={{
              mb: "0rem",
              mt: "0rem",
              display: "flex",
              fontWeight: 800,
              lineHeight: 1.25,
              alignItems: "center",
              color: "#222",
              textAlign: "left",
              fontSize: "120%",
              letterSpacing: 0,
              textTransform: "capitalize",
              cursor: "pointer",
            }}
            onClick={handleBook}
          >
            {name ? name : roomTitle} &nbsp;
          </Typography>
       
          {matchingAmenities.slice(0, imageURLs.length === 0 ? 9: 4).map((amenity, index) => {
            // console.log(amenity)
            const AmenityIcon = AmenitiesList[amenity]
            return (
              <Box
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mt: ".5rem",
                }}
                key={index}
              >
                <SvgIcon
                  sx={{ color: (amenity === 'pet-friendly room' ? 'green' : "#666"), mr: "1rem", fontSize: "18px" }}
                  component={AmenityIcon || Check}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: ".9rem",
                    fontWeight: 500,
                    mt: 0,
                    color: "#666",
                    textIndent: "-8px",
                    paddingLeft: "8px",
                    letterSpacing: ".015rem",
                    fontFamily: "Roboto",
                    textTransform: "capitalize",
                  }}
                >
                  {amenity?.toLowerCase()}
                </Typography>
              </Box>
            );
            
          })}

          {amenities && amenities.length > 0 && (
            <Box
              sx={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                mt: ".5rem",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: ".9rem",
                  fontWeight: 500,
                  mt: 0,
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#666",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                  letterSpacing: ".015rem",
                  fontFamily: "Roboto",
                  textTransform: "capitalize",
                }}
                onClick={() => setShowDialog(true)}
              >
                View More Amenities
              </Typography>
            </Box>
          )}

          <Backdrop
            open={open}
            onClick={() => {
              setAnchorEl(null);
            }}
            invisible={true}
          >
            <Popper
              id={id}
              open={open}
              placement="bottom"
              anchorEl={anchorEl}
              transition
              style={{ zIndex: 9999 }}
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps} timeout={350}>
                  <Box
                    sx={{
                      border: "1px solid #DDD",
                      borderRadius: "5px",
                      mt: ".5rem",
                      boxShadow: 2,
                      padding: "8px",
                      backgroundColor: "#fff",
                      minWidth: "250px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        mb: ".5rem",
                        fontSize: "80%",
                        textAlign: "center",
                      }}
                    >
                      Price Details
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 2,
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ textAlign: "left", fontSize: "80%" }}
                      >
                        Per Night:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textAlign: "right", fontSize: "80%" }}
                      >
                        ${parseFloat(pricePerNight) + (selectedRadio === 'refundable' ? (parseFloat(refundablePrice) / nights) : 0)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 2,
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ textAlign: "left", fontSize: "80%" }}
                      >
                        Taxes:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textAlign: "right", fontSize: "80%" }}
                      >

                        ${(totalPriceAfterTax - totalPrice).toFixed(2)}
                      </Typography>
                    </Box>
                    {fees && fees.length > 0 && (
                      <Box sx={{ px: 2, mb: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{ textAlign: "center", fontSize: "80%" }}
                        >
                          Fees:
                        </Typography>
                      </Box>
                    )}
                    {fees &&
                      fees?.map((fee) => (
                        <Box
                          key={fee.desc}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            px: 2,
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ textAlign: "left", fontSize: "80%" }}
                          >
                            {fee?.desc}:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ textAlign: "right", fontSize: "80%" }}
                          >
                            ${fee?.amount.toFixed(2)}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Grow>
              )}
            </Popper>
          </Backdrop>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            textAlign: { md: "left", lg: "right" },
            flexDirection: "column",
            mt: { xs: "0rem", sm: "1rem" },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", margin: "0px" }}>
            <Box
              sx={{
                height: "100%",
                textAlign: { md: "left", lg: "right" },
                display: "flex",
                flexDirection: "column",
                mt: { xs: ".25rem", sm: "0" },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Roboto",
                  opacity: 0.75,
                  overflow: "visible",
                  textAlign: "left",
                  fontSize: "80%",
                  lineHeight: 1,
                  fontWeight: 600,
                  marginTop: "0",
                  mb: { md: "1rem" },
                }}
              >
                {isRefundable && (
                  <>
                    <b
                      style={{
                        fontWeight: 600,
                        color: "#5B8D3E",
                        marginBottom: ".5rem",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      Refundable
                      <InfoOutlined
                        onClick={handleOpenRefundData}
                        sx={{
                          cursor: "pointer",
                          fontSize: "12px",
                          ml: ".125rem",
                        }}
                      />
                    </b>
                    <br />
                    {/*
                    Before{" "}
                    {DateTime.fromISO(
                      cancelationPolicy.deadlineLocal ||
                        new Date().toISOString()
                    ).toFormat("DD")}{" "}
                    */}
                  </>
                )}
                {!isRefundable && !hasCombinedRate && <Box color="red">Non-Refundable</Box>}
                {(hasCombinedRate && !removeNonRefundableOption) &&
                  <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="non"
                        name="radio-buttons-group"
                        value={selectedRadio}
                        onChange={(e) => setSelectedRadio(e.target?.value)}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center" mr="1rem">
                          <FormControlLabel value="non" control={<Radio />} label="Non-Refundable" />
                          <Typography variant="base">$0</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mr="1rem">
                          <FormControlLabel value="refundable" control={<Radio />} label={`Cancel before ${refundPolicy? formatCancelPolicy : '...'}`} />
                          <Typography variant="base">+${refundablePrice}</Typography>
                        </Box>
                      </RadioGroup>
                    </FormControl>

                  </Box>
                }
                {(hasCombinedRate && removeNonRefundableOption) &&
                  <Box color="#5B8D3E">
                    Refundable
                  </Box>
                }
              </Typography>
            </Box>
          </Box>

          <Backdrop
            open={refundOpen}
            onClick={() => {
              setRefundAnchorEl(null);
            }}
            invisible={true}
          >
            <Popper
              id={refundId}
              open={refundOpen}
              placement="bottom"
              anchorEl={refundAnchorEl}
              transition
              style={{ zIndex: 9999 }}
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps} timeout={350}>
                  <Box
                    sx={{
                      border: "1px solid #DDD",
                      maxWidth: "350px",
                      borderRadius: "5px",
                      mt: ".5rem",
                      boxShadow: 2,
                      padding: "8px",
                      backgroundColor: "#fff",
                      minWidth: "250px",
                      paddingTop: "1rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 2,
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ textAlign: "left", fontSize: "80%" }}
                      >
                        By reserving on Romingo, you may cancel your reservation
                        without incurring cancellation fees on or before the
                        date listed for some hotels. Please check the policy of the specific hotel by going to checkout.
                        <br /> <br /> All cancellations after this
                        date and time are subject to cancellation fee(s) in
                        accordance with hotel policy and Romingo&lsquo;s terms.
                      </Typography>
                    </Box>
                  </Box>
                </Grow>
              )}
            </Popper>
          </Backdrop>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mr: 0.45,
                fontWeight: 800,
                alignItems: "center",
                color: "#222",
                textAlign: "left",
                fontSize: "1.30em",
                letterSpacing: 0,
                textTransform: "capitalize",
              }}
            >
              ${parseFloat(pricePerNight) + (selectedRadio === 'refundable' ? (parseFloat(refundablePrice) / nights) : 0) }
            </Typography>
        {/*    <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                opacity: 0.8,
                fontWeight: 400,
                fontSize: "70%",
              }}
            >
              per night
            </Typography>*/}
          </Box>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              display: "inline-block",
              lineHeight: '16px',
              fontSize: "12px",
              fontWeight: "bold",
              color: "#666",
            }}
          >
            ${(parseFloat(totalPriceAfterTax) + (selectedRadio === 'refundable' ? parseFloat(refundablePrice) : 0)).toFixed(0) } total
          </Typography>
          <Typography variant="base" sx={{
            fontSize: "80%",
            color: '#666',
            fontSize: '12px',
            lineHeight: '16px'
          }}>includes taxes & fees</Typography>
          <Typography variant="base" sx={{
            mt: '0.5rem',
            fontSize: "80%" 
          }}>
          <u
            onClick={handleOpenPrice}
            style={{
              cursor: "pointer",
              display: "block",
              color: "#666",

            }}
          >
            Price details
          </u>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex" }}>
          <Button
            disableElevation
            variant="contained"
            size="small"
            color="primary"
            sx={{
              ml: "auto",
              mt: "auto",
              py: 1,
              px: 1,
              mb: 0.5,
              textTransform: "capitalize",
              width: { sm: "50%", md: "50%", lg: "60%", xs: "100%" },
            }}
            onClick={handleBook}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                textTransform: "capitalize",
                fontSize: { xs: "14px" },
              }}
            >
              Reserve
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={showDialog}
        keepMounted
        fullWidth
        onClose={handleClose}
        scroll="body"
        maxWidth="xs"
      >
        <DialogTitle
          sx={{ textAlign: "center", color: "primary.main", pt: 1.5, pb: 0.5 }}
        >
          {name ? name : roomTitle}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            size="large">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "primary.main", mt: 2 }}
            >
              Amenities
            </Typography>
            {amenities && amenities.map((amenity, key) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "bottom",
                    mt: 0.4,
                  }}
                  key={key}
                >
                  <Check sx={{ fontSize: 16, color: "#666", mt: 0.4 }} />
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 0,
                      textTransform: "capitalize",
                      color: "#666",
                      textIndent: "-8px",
                      paddingLeft: "12px",
                    }}
                  >
                    {amenity}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

interface ReadMoreProps {
  text: string;
  length: number;
  small?: boolean;
  justify?: boolean;
}

const ReadMore: FC<ReadMoreProps> = ({
  text,
  length,
  small = false,
  justify = false,
}) => {
  const [showLess, setShowLess] = useState(true);

  if (text.length < length) {
    return (
      <Typography
        variant="body2"
        sx={{
          lineHeight: small ? 1 : 2,
          mt: ".25rem",
          mb: ".5rem",
          fontWeight: 600,
          opacity: 0.75,
          fontSize: "12px",
          textAlign: justify ? "justify" : "left",
          textTransform: "lowercase",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
        }}
      >
        {text.toLowerCase()}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography
        variant="body2"
        dangerouslySetInnerHTML={{
          __html: showLess ? `${text.slice(0, length)}... ` : text + " ",
        }}
        sx={{
          textTransform: "none",
          lineHeight: small ? 1 : 2,
          display: "inline",
          my: 0,
          fontSize: "12px",
          textAlign: justify ? "justify" : "left",
        }}
      />
      <Box
        sx={{ display: "inline", p: small ? 0 : 2 }}
        onClick={() => setShowLess(!showLess)}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "12px",
            lineHeight: small ? 1 : 2,
            display: "inline",
            color: "primary.main",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {showLess ? "Read More" : "Show Less"}
        </Typography>
      </Box>
    </Box>
  );
};

export default RoomCard;
