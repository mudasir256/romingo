import React, { FC, useState, MouseEventHandler, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CSSObject } from "@mui/material";
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
import { utils } from "../../services/utils";
import { setCheckout } from "../../store/hotelCheckoutReducer";
import {
  Link,
  Dialog,
  DialogContent,
  DialogTitle,
  Chip,
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
import { useMediaQuery } from "@mui/material";
import {
  Casino,
  ExpandMore,
  LocationCity,
  Shuffle,
  Event,
  RemoveCircleOutline,
  AddCircleOutline,
  AccountBalanceWallet,
  FiberManualRecord,
  MeetingRoom,
  HotTub,
  Work,
  ChildCare,
  Weekend,
  PersonAddAlt,
  Star,
  ArrowDownward,
  Deck,
  Nightlife,
  Soap,
  DirectionsRun,
  Bed,
  ShoppingBasket,
  LocalCafe,
  MoneyOff,
  Label,
  Pool,
  SportsGolf,
  SportsTennis,
  DryCleaning,
  RoomService,
  FitnessCenter,
  Wifi,
  Pets,
  SmokeFree,
  BusinessCenter,
  Accessible,
  SvgIconComponent,
  CarRental,
  Crib,
  Restaurant,
  Chair,
  Launch,
  ArrowBackIos,
  Close,
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
}

export interface RoomInfo {
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
}

const popularAmenities = [
  {
    icon: Chair,
    text: ["sofa", "couch"],
    not: ["meeting rooms"],
    prettyText: "sofa",
  },
  {
    icon: Wifi,
    text: ["wifi", "wireless internet"],
    not: ["meeting rooms"],
    prettyText: "wifi",
  },
  {
    icon: LocalBar,
    text: ["minibar", "mini bar"],
    not: ["meeting rooms"],
    prettyText: "mini bar in room",
  },
  {
    icon: KingBed,
    text: ["king bed", "king size bed", "KING BEDS", "KING SIZE BED"],
    not: ["meeting rooms"],
    prettyText: "King size bed",
  },
  {
    icon: SingleBed,
    text: [
      "double bed",
      "dbl bed",
      "dbl",
      "twin size bed",
      "double size bed",
      "twin bed",
    ],
    not: ["meeting rooms"],
    prettyText: "Double size bed",
  },
  {
    icon: Bed,
    text: ["queen bed", "queen size bed", "QUEEN BEDS", "QUEEN SIZE BED"],
    not: ["meeting rooms"],
    prettyText: "Queen size bed",
  },
  {
    icon: FreeBreakfast,
    text: ["free breakfast", "breakfast"],
    not: ["meeting rooms"],
    prettyText: "Breakfast included",
  },
  {
    icon: Vrpano,
    text: ["panoramic view", "panorama view"],
    not: ["meeting rooms"],
    prettyText: "Panaoramic view",
  },
  {
    icon: Bathtub,
    text: ["bath tub", "bathtub"],
    not: ["meeting rooms"],
    prettyText: "bath tub",
  },
  // { icon: HotTub, text: ["hot tub"], not: ["meeting rooms"] },
  // { icon: DryCleaning, text: ["dry cleaning"], not: ["meeting rooms"] },
  // { icon: BusinessCenter, text: ["business center"], not: ["meeting rooms"] },
  // { icon: RoomService, text: ["room service"], not: ["meeting rooms"] },
  // { icon: Restaurant, text: ["restaurant"], not: ["meeting rooms"] },
  // { icon: LocalCafe, text: ["coffee"], not: ["meeting rooms"] },
];

const otherAmenities = [
  { icon: Casino, text: ["game room"] },
  { icon: MeetingRoom, text: ["meeting", "convention"] },
  { icon: Crib, text: ["crib", "crib rental"] },
  { icon: Accessible, text: ["wheelchair access", "wheelchair accessible"] },
  { icon: SportsGolf, text: ["golf"] },
  { icon: SportsTennis, text: ["tennis"] },
  { icon: CarRental, text: ["car rental", "rental"] },
  { icon: Weekend, text: ["family room"] },
  { icon: SmokeFree, text: ["non-smoking"] },
  { icon: ChildCare, text: ["children programs"] },
  { icon: Work, text: ["executive"] },
  { icon: AccountBalanceWallet, text: ["in room safe"] },
];

const RoomCard: FC<Props> = ({
  sx,
  room,
  beds,
  desc,
  amenities,
  averagePrice,
  averagePriceAfterTax,
  fees,
  totalFees,
  totalPrice,
  totalPriceAfterTax,
  bestRate = false,
  cancelationPolicy,
  feesIncluded,
  romingoMatch,
  areaInSquareFeet,
  featuredImageURL,
  imageURLs,
  name,
  type,
  ...props
}) => {
  const history = useHistory();
  const [showDialog, setShowDialog] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [refundAnchorEl, setRefundAnchorEl] = useState<null | Element>(null);

  const mobile = useMediaQuery("(max-width: 900px)");

  const handleClick: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDialog(true);
  };

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
    dispatch(
      setCheckout({
        room: { value: 1, room: room, description: room.desc },
      })
    );
    history.push("/checkout");
  };

  const open = Boolean(anchorEl);
  const id = open ? "transitions-popper" : undefined;

  const refundOpen = Boolean(refundAnchorEl);
  const refundId = refundOpen ? "transitions-popper" : undefined;

  const [roomTitle, setRoomTitle] = useState("");

  useEffect(() => {
    let roomDescription = "";

    beds.map((bed) => {
      if (roomDescription !== "") roomDescription += " + ";

      roomDescription += `${bed.count} ${bed.desc}${bed.count > 1 ? "s" : ""}`;
    });

    roomDescription = (type ? type + "\n" : "") + roomDescription;
    if (roomDescription.length === 0) {
      roomDescription = "Room";
    }
    setRoomTitle(roomDescription);
  }, []);

  const includedPopular = popularAmenities.reduce(
    (acc: Array<any>, item: any) => {
      if (item.text.find((pop: any) => desc.toLowerCase().includes(pop))) {
        return [
          ...acc,
          {
            receivedText: item.prettyText,
            icon: item.icon,
          },
        ];
      } else {
        return [...acc];
      }
    },
    []
  );

  // .sort((a: any, b: any) => (a.receivedText > b.receivedText ? 1 : -1));

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
                minHeight: { xs: "200px", sm: "200px", md: "220px" },
                background: featuredImageURL
                  ? `url(${featuredImageURL})`
                  : "#f3f5f6",
                backgroundSize: "cover",
                color: "#03989e",
              }}
            >
              {beds?.map((bed, key) => {
                return Array.from({ length: bed.count }, (_, i: number) => (
                  <React.Fragment key={key + "_" + i}>
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
              fontWeight: 700,
              lineHeight: 1.25,
              fontFamily: "Montserrat",
              alignItems: "center",
              color: "#111111bf",
              textAlign: "left",
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              letterSpacing: 0,
              textTransform: "capitalize",
            }}
          >
            {name ? name : roomTitle} &nbsp;
          </Typography>

          {includedPopular.map((amenity, index) => {
            const AmenityIcon = amenity.icon;
            if (index < (areaInSquareFeet ? 3 : 4)) {
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
                    sx={{ color: "#666", mr: "1rem", fontSize: "18px" }}
                    component={AmenityIcon}
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
                    {amenity.receivedText.toLowerCase()}
                  </Typography>
                </Box>
              );
            }
          })}

          {areaInSquareFeet && (
            <Box
              sx={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                mt: ".5rem",
              }}
            >
              <SvgIcon
                sx={{ color: "#666", mr: "1rem", fontSize: "18px" }}
                component={SquareFoot}
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
                {areaInSquareFeet} Sq ft
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
                        ${averagePrice.toFixed(2)}
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
                {cancelationPolicy.cancelable && (
                  <>
                    {" "}
                    <b
                      style={{
                        fontWeight: 600,
                        color: "#5B8D3E",
                        marginBottom: ".5rem",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      Fully refundable{" "}
                      <InfoOutlined
                        onClick={handleOpenRefundData}
                        sx={{
                          cursor: "pointer",
                          fontSize: "12px",
                          ml: ".125rem",
                        }}
                      />{" "}
                    </b>{" "}
                    <br />
                    Before{" "}
                    {DateTime.fromISO(
                      cancelationPolicy.deadlineLocal ||
                        new Date().toISOString()
                    ).toFormat("DD")}{" "}
                  </>
                )}
                {!cancelationPolicy.cancelable && "Non-Refundable"}
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
                        with a full refund on or before the date listed. <br />{" "}
                        <br /> Your reservation must be cancelled by the
                        check-in time of the property&lsquo;s local time. <br />{" "}
                        <br /> All cancellations after this date and time are
                        subject to cancellation fee(s) in accordance with hotel
                        policy and Romingo&lsquo;s terms.
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
                fontWeight: 700,
                fontFamily: "Montserrat",
                alignItems: "center",
                color: "#111111bf",
                textAlign: "left",
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                letterSpacing: 0,
                textTransform: "capitalize",
              }}
            >
              ${room.averagePrice.toString().split(".")[0]}
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
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              display: "inline-block",
              mt: ".5rem",
              fontSize: "80%",
              fontWeight: "bold",
              color: "#11111199",
            }}
          >
            ${totalPriceAfterTax.toFixed(2)} TOTAL
            <br />
            incl. all taxes and fees
            <u
              onClick={handleOpenPrice}
              style={{
                cursor: "pointer",
                display: "block",
                color: "#11111180",
              }}
            >
              See Details
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
        sx={{ maxWidth: "xl" }}
      >
        <DialogTitle
          sx={{ textAlign: "center", color: "primary.main", pt: 1.5, pb: 0.5 }}
        >
          {roomTitle}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "secondary.main", mt: 2 }}
            >
              Amenities
            </Typography>
            {amenities.map((amenity, key) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "bottom",
                    mt: 0.4,
                  }}
                  key={key}
                >
                  <Check
                    sx={{ fontSize: 15, color: "primary.main", mt: 0.4 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0,
                      textTransform: "capitalize",
                      color: "text.primary",
                      textIndent: "-8px",
                      paddingLeft: "8px",
                    }}
                  >
                    {amenity.desc}
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
