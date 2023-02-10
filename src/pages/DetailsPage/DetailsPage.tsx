import loadable from '@loadable/component'
import {Helmet} from 'react-helmet';
import React, { FC, useState, MouseEventHandler, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { DateTime } from "luxon";
import { Dispatch } from "redux";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import { saveSearch } from "../../store/searchReducer";
import { useJsApiLoader } from "@react-google-maps/api";
import { utils } from '../../services/utils';
import {
  SvgIcon,
  Link,
  Divider,
  Skeleton,
  CSSObject,
  Container,
  Fab,
  Box,
  Button,
  Grid,
  Hidden,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  ImageList,
  InputLabel,
  FormControl,
  Stack,
  Popover,
  ImageListItem,
  Select,
  MenuItem,
  IconButton,
  Drawer,
  CircularProgress,
} from "@mui/material";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Breakpoint, Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import SimpleReactLightbox from "simple-react-lightbox";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import {
  Casino,
  ExpandMore,
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
  Deck,
  Nightlife,
  Soap,
  DirectionsRun,
  Bed,
  ShoppingBasket,
  LocalCafe,
  MoneyOff,
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
  CarRental,
  Crib,
  Restaurant,
  Launch,
  ArrowBackIos,
  Close,
  Circle,
} from "@mui/icons-material";
import BookingCard from "../../components/BookingCard";

const Map = loadable(() => import('../../components/UI/Map/Map'))

import ReadMore from "../../components/UI/ReadMore/ReadMore";
import RoomCard from "../../components/RoomCard";
import FilterBar from "../../components/FilterBar";
import { RoomInfo } from "../../components/RoomCard/RoomCard";

import { gql, useQuery } from "@apollo/client";
import { 
  GetPropertyDetails, 
  GetSabreRoomReservations,
  GetSabrePropertyDetails,
} from "../../constants/constants";

import { setHotel } from "../../store/hotelDetailReducer";
import { useWindowSize } from "react-use";

import ScrollToTop from "../../components/ScrollToTop";
import Loader from "../../components/UI/Loader";
import { DesktopFilterBar } from "../Cities/DesktopFilterBar";
import Footer from "../../components/Footer";
import RomingoScore from "../../components/RomingoScore";
import Navbar from "../../components/Navbar";
import HotelTags from '../../components/HotelTags';
import googleImage from '../../assets/images/google_on_white.png'

type BreakpointOrNull = Breakpoint | null;

const useWidth = () => {
  const theme: Theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
};

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

const libraries: Libraries = ["places"];

interface Props {
  name: string;
  location: {
    address: string;
  };
  locationCoordinates: {
    lat: string;
    lon: string;
  };
  mainImg: string;
  gallery: string[];
  score: number;
  defaultDescription: string;
  detailsPagePromoText: string;
  checkoutPagePromoText: string;
  cancellation?: boolean;
  cancelPenalty?: {
    refundable: boolean;
    deadline: { absoluteDeadline: Date };
    amountPercent: { amount: number; currencyCode: string };
  }[];
  dogAmenitiesTitle: string;
  roomList: {
    value: number;
    description: string;
  }[];
  amenitiesTitle: string;
  amenities: string[];
  nearby: {
    name: string;
    distanceInMeters: number;
  }[];
  petFeePolicy: {
    maxPets: number;
    maxWeightPerPetInLBS: number;
    desc: string;
    perPet: boolean;
    perNight: boolean;
    breakup: JSON;
    totalFees: number;
  };
  rooms: RoomInfo[];
  match: any;
  googlePlaceId: string;
  allows_big_dogs: number;
}

const isIdPage = (path:string) => {
    if (path.match(/\/details\/.*$/gm)) return true
    return false
}

const DetailsPage: FC<Props> = ({ ...props }) => {
  const hotelId = props?.match?.params?.id || "undefined";
  const hotelAlias = props?.match?.params?.alias || "undefined";
  const pageLocation = useLocation();
  const search = useSelector((state: any) => state.searchReducer.search);
  const locationState = useLocation<any>();
  const dispatch: Dispatch<any> = useDispatch();

  const ageParam = search.occupants.childrenAge
    ? search.occupants.childrenAge.map((x: number) => {
      if (x === 0) {
        return {
          age: 1,
        };
      }
      return {
        age: x,
      };
    })
    : [];

  const removeHttpLink = function (str: string) {
    return str?.replace("http:", "");
  };


  const { data, loading, error } = useQuery(
    gql`
      ${GetPropertyDetails}
    `,
    {
      variables: {
        alias:hotelAlias,
      },
    }
  );


  const { data: detailInfo } = useQuery(
    gql`
      ${GetSabrePropertyDetails}
    `,
    {
      variables: {
        alias: hotelAlias,
      },
    }
  );

  const { data: roomInfo, loading: roomsLoading, refetch } = useQuery(
    gql`
      ${GetSabreRoomReservations}
    `,
    {
      variables: {
        checkIn: search?.checkIn.substring(0, 10),
        checkOut: search?.checkOut.substring(0, 10),
        adults: search?.occupants?.adults,
        children: ageParam,
        dogs: search.occupants.dogs,
        alias:hotelAlias,
      },
      fetchPolicy: "no-cache",
    }
  );

  const start = search?.checkIn.substring(0, 10)
  const end = search?.checkOut.substring(0, 10)
  
  const date1 = new Date(start).getTime();
  const date2 = new Date(end).getTime();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 


  const [reviewData, setReviewData] = useState<any>();
  const [name, setName] = useState("");
  const [location, setLocation] = useState({ address: "" });
  const [locationCoordinates, setLocationCoordinates] = useState({ lat: "", lon: "" });
  const [gallery, setGallery] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [defaultDescription, setDefaultDescription] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [otherAmenities, setOtherAmenities] = useState<string[]>([]);
  const [neighborhood, setNeighborhood] = useState("");
  const [nearby, setNearby] = useState([]);
  const [allowsBigDogs, setAllowsBigDogs] = useState(0);
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [accessibleRooms, setAccessibleRooms] = useState<RoomInfo[]>([]);

  const [roomDropDown, setRoomDropDown] = useState<
    { value: number; description: string; room: RoomInfo }[]
  >([]);

  const [city, setCity] = useState({
    center: { latitude: "", longitude: "" },
    id: "",
    name: "",
  });

  const [markers, setMarkers] = useState<
    { lat: number; lng: number; type: string; label: string }[]
  >([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery("(max-width: 800px)");

  useEffect(() => {
    if (pageLocation.hash && reviewData?.reviews.length > 0) {
      if (pageLocation.hash.slice(1) === "reviews") {
        setReviewDialog(true);
      }
    } else {
      // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pageLocation, reviewData]);

  useEffect(() => {

     if (data && data?.getPropertyDetails) {
      if (isIdPage(pageLocation.pathname)) {
         if (data?.getPropertyDetails?.alias) {
           history.push(`/hotel/${data?.getPropertyDetails?.alias}`)
           return;
         }
      }
      dispatch(setHotel({
        ...data.getPropertyDetails,
        petFeePolicy: {
          ...data.getPropertyDetails.petFeePolicy,
          totalFees: utils.computePetFeePolicyTotalFees(diffDays, search.occupants.dogs || 1, data?.getPropertyDetails?.petFeePolicy || {})
        }
      }));
      setName(data.getPropertyDetails.name);

      setLocation({ address: data.getPropertyDetails.addressLine1 });

      setCity({ ...data.getPropertyDetails.city });
      setNeighborhood(data.getPropertyDetails.neighborhood);
      setAllowsBigDogs(data.getPropertyDetails.allows_big_dogs);

      const tmp: any[] = [];
      data.getPropertyDetails.imageURLs.map((image: string) => {
        tmp.push(image);
      });
      // data.getPropertyDetails.sabreImageURLs.map((image: string) => {
      //   tmp.push(image);
      // });
      setGallery([...tmp]);
      setDefaultDescription(data.getPropertyDetails.desc);
      setAmenities(data.getPropertyDetails.dogAmenities);
      setScore(data.getPropertyDetails.romingoScore);


      //setNearby(data.getPropertyDetails.nearbyActivities);

      markers.push({
        lat: 0, //data.getPropertyDetails.location.latitude,
        lng: 0, //data.getPropertyDetails.location.longitude,
        type: "hotel",
        label: data.getPropertyDetails.name,
      });

   
      setMarkers([...markers]);
    }
  }, [data]);

  useEffect(() => {
    if (detailInfo && detailInfo.getSabrePropertyDetails) {
      setLocationCoordinates({
        lat: detailInfo.getSabrePropertyDetails.location.latitude,
        lon: detailInfo.getSabrePropertyDetails.location.longitude,
      });

      const tmpAmenities: string[] = [];
      detailInfo.getSabrePropertyDetails.amenities.map((amenity: any) => {
        tmpAmenities.push(amenity.desc);
      }); 
      setOtherAmenities([...tmpAmenities]);

      const tmpMarkers = [];
      tmpMarkers.push({
        lat: detailInfo.getSabrePropertyDetails.location.latitude,
        lng: detailInfo.getSabrePropertyDetails.location.longitude,
        type: "hotel",
        label: name || '',
      });
      detailInfo.getSabrePropertyDetails.nearbyActivities.map((activity: any) => {
         tmpMarkers.push({
           lat: activity.location.latitude,
           lng: activity.location.longitude,
           type: activity?.activityType?.name,
           label: activity.name,
         });
      });
      setMarkers([...tmpMarkers]);
      setNearby(detailInfo.getSabrePropertyDetails.nearbyActivities);

    }
  }, [detailInfo])

  useEffect(() => {
    if (roomInfo && roomInfo.getSabreRoomReservationAvailabilty) {
      const romingoMatch = roomInfo.getSabreRoomReservationAvailabilty.rooms.filter(
        (r: RoomInfo) => r.romingoMatch
      );

      if (romingoMatch && romingoMatch.length > 0) {

        const uniqueRoomTypes = [... new Set(romingoMatch.map(room => room.name))]
        const roomsTmp = []
        uniqueRoomTypes.forEach(name => {
          const comparisons = romingoMatch.filter(room => room.name === name).map(room => room.averagePrice)
          const lowestPrice = Math.min(...comparisons)
          roomsTmp.push(romingoMatch.find(room => (room.name === name && room.averagePrice === lowestPrice) ))
        })

        const accessibleArr: RoomInfo[] = [];
        const nonAccessibleArr: RoomInfo[] = [];
        roomsTmp.forEach((r: RoomInfo) =>
          ((r.type && r.type.toLowerCase().startsWith("accessible")) ||
            (r.name && r.name.toLowerCase().includes("accessible"))
            ? accessibleArr
            : nonAccessibleArr
          ).push(r)
        );

        setAccessibleRooms(accessibleArr);
        setRooms(nonAccessibleArr);
      } else {
        setRooms([...roomInfo.getSabreRoomReservationAvailabilty.rooms])
      }

      const tmp = [];
      roomInfo.getSabreRoomReservationAvailabilty.rooms.map((room: any, key: number) => {
        let roomDescription = "";

        room.beds.map((bed: any) => {
          roomDescription += `${bed.count} ${bed.desc}${bed.count > 1 ? "s" : ""
            }`;
        });

        roomDescription =
          (room.type && room.type !== null ? room.type : "") +
          (roomDescription && room.type !== null && room.type ? " - " : "") +
          roomDescription;

        tmp.push({
          value: key,
          description: roomDescription,
          room: room,
        });
      });

      setRoomDropDown([...tmp]);
    }
  }, [roomInfo])

  useEffect(() => {
    window.Intercom("boot", {
      app_id: "qa6datd3",
      alignment: "right",
      custom_launcher_selector: "#CUSTOM",
    });
    window.Intercom("update");
  }, []);

  const [showGallery, setShowGallery] = useState(false);
  const lightBoxOptions = {
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false,
      showThumbnailsButton: false,
      backgroundColor: "rgba(3, 152, 158, .7)",
    },
    settings: {
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      overlayColor: "rgba(255, 255, 255, 0.95)",
      slideAnimationType: "slide",
      slideSpringValues: [20000, 100],
      slideTransitionSpeed: 0.2,
      lightboxTransitionSpeed: 0.1,
    },
    caption: {
      captionFontSize: "20px",
      captionColor: "#03989E",
      captionFontFamily: "sans-serif",
    },
    progressBar: {
      backgroundColor: "#03989E",
    },
  };

  const handleOpen: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowGallery(true);
  };

  const handleClose = () => {
    setShowGallery(false);
  };

  const getImageCols = () => {
    const width = useWidth();
    if (width === "xs") {
      return 1;
    }
    if (width === "md" || width === "sm") {
      return 2;
    }
    return 3;
  };

  const history = useHistory();

  const RateCardRef = React.createRef<HTMLDivElement>();

  const goToRateScroll = () => {
    RateCardRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { height } = useWindowSize();

  const [reviewDialog, setReviewDialog] = useState<boolean>(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAnlMeQQ072sRw22U6aG0zLTHbyh0g8TB0",
    libraries,
  });

  const getReviewData = () => {
    const request = {
      placeId: data.getPropertyDetails.googlePlaceId,
      fields: ["reviews", "rating", "user_ratings_total"],
    };
    if (google) {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails(request, (a) => {
        setReviewData(a);
      });
    }
  };

  useEffect(() => {
    if (data && data.getPropertyDetails && data.getPropertyDetails.googlePlaceId && isLoaded) {
      if (process.env.NODE_ENV === 'production') {
        getReviewData();
      }
    }
  }, [data, isLoaded]);

  const [showFullImage, setShowFullImage] = useState<string>('');

  const title = `${name} Pet Policy - Romingo`
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <description>{defaultDescription}</description>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:url" content={`https://www.romingo.com/hotel/${hotelAlias}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={data?.getPropertyDetails?.featuredImageURL} />
        <meta property="og:site_name" content="Romingo" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={data?.getPropertyDetails?.featuredImageURL} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Grid sx={{ background: "#feffff", scrollBehavior: "smooth" }}>
        {" "}
        {/* fcf5f0 */}
        <ScrollToTop />
        <Navbar />
        {!loading && data && (
          <Box
            component="img"
            src={removeHttpLink(data?.getPropertyDetails?.featuredImageURL)}
            alt={name}
            boxShadow={2}
            onClick={handleOpen}
            display={{ xs: "block", md: "none" }}
            sx={{
              background: "#fff",
              width: "100%",
              boxShadow: 0,
              borderBottom: "2px solid #ddd",
              height: { xs: "200px", sm: "300px" },
              objectFit: "cover",
              borderRadius: 0,
              mx: 0,
              cursor: "pointer",
            }}
          />
        )}
        {loading && (
          <Hidden mdUp>
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                height: { xs: "200px", sm: "300px" },
                objectFit: "cover",
                mx: "0px",
                px: 0,
                width: "100%",
              }}
            />
          </Hidden>
        )}
        <Container sx={{ mt: { xs: 0, md: 3 }, mb: { xs: 10, lg: 3 } }}>
          <Typography variant="h5" sx={{mb: 3}}>{locationState.state?.flag}</Typography>
          <Grid container spacing={2} sx={{ position: "relative" }}>
            <Grid item xs={12} sm={6}>
              {loading && (
                <Hidden mdDown>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                      height: { xs: "150px", sm: "375px" },
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </Hidden>
              )}
              {!loading && data && (
                <Box
                  onClick={handleOpen}
                  component="img"
                  src={removeHttpLink(gallery[0])}
                  alt={name}
                  draggable="false"
                  boxShadow={2}
                  display={{ xs: "none", md: "block" }}
                  sx={{
                    width: "100%",
                    height: { xs: "150px", sm: "375px" },
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                  }}
                />
              )}
            </Grid>
            <Hidden mdDown>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  {!loading &&
                    data &&
                    gallery.slice(1, 5).map((img: any) => {
                      return (
                        <Grid item sm={6} key={img}>
                          <Box
                            onClick={handleOpen}
                            boxShadow={2}
                            component="img"
                            src={img.replace(/^http(s?):/i, "")}
                            alt={name}
                            sx={{
                              width: "100%",
                              height: "178px",
                              objectFit: "cover",
                              borderRadius: 1,
                              cursor: "pointer",
                            }}
                          />
                        </Grid>
                      );
                    })}
                  {loading &&
                    Array.from({ length: 4 }, (_, i: number) => (
                      <Grid item sm={6} key={i}>
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          height="178px"
                          width="100%"
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Hidden>
            <Box
              sx={{
                position: "absolute",
                right: { xs: "-10px", md: "20px" },
                bottom: { xs: "8px", md: "20px" },
                textAlign: "right",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "#fff" },
                }}
                onClick={handleOpen}
              >
                <PhotoCameraIcon sx={{ fontSize: 15, mr: 0.5 }} />
                View Photos
              </Button>
            </Box>
          </Grid>
          {loading && (
            <>
              <Skeleton
                animation="wave"
                width={250}
                height={55}
                sx={{ mt: 2, mb: 0 }}
              />
              <Skeleton
                animation="wave"
                width={330}
                height={80}
                sx={{ mt: -2 }}
              />
              <Loader size="300px" />
              <Skeleton
                animation="wave"
                width="100%"
                height={800}
                sx={{ mt: -2 }}
              />
            </>
          )}
          {!loading && !data && (
            <Container maxWidth="md">
              <Box sx={{ textAlign: "center", mt: 10 }}>
                <Typography variant="h5" color="primary">
                  This property does not have any rooms available that meet your
                  search criteria
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1, mb: 3 }}
                >
                  Search other great Romingo rooms below
                </Typography>
                <Hidden mdDown>
                  <DesktopFilterBar />
                </Hidden>
                <Hidden mdUp>
                  <FilterBar />
                </Hidden>
                <Box
                  component="img"
                  src="https://storage.googleapis.com/romingo-development-public/images/front-end/balcony-dog.jpeg"
                  alt={"No Properties Found"}
                  sx={{
                    objectFit: "cover",
                    height: 400,
                    width: 900,
                    maxWidth: "100%",
                    boxShadow: 5,
                    borderRadius: 5,
                    mt: 4,
                  }}
                />
              </Box>
            </Container>
          )}
          {!loading && data && (
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} md={7} lg={8}>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                      color: "#222",
                      display: { sm: "block", md: "flex" },
                      justifyContent: "space-between",
                    }}
                  >
                    {name}
                  </Typography>
                  {reviewData ? (
                    <Typography
                      variant="h6"
                      sx={{
                        mr: { sm: "0rem", xs: "auto" },
                        ml: { sm: "auto", xs: "0px" },
                        textAlign: { sm: "right", xs: "left" },
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <RomingoScore score={reviewData && reviewData.rating} />
                      <Circle
                        sx={{
                          fontWeight: 500,
                          mx: 0.5,
                          opacity: 0.75,
                          color: "#BC4749",
                          fontSize: "20%",
                        }}
                      />
                      <Link
                        onClick={() => setReviewDialog(true)}
                        sx={{
                          cursor: "pointer",
                          color: "#666",
                          textDecoration: "underline",
                          display: { xs: "inline", sm: "inline", md: "block" },
                          fontWeight: 500,
                          opacity: 0.75,
                          fontSize: "70%",
                        }}
                      >
                        ({reviewData && reviewData.user_ratings_total} reviews)
                      </Link>
                      {!isMobile && (
                        <Dialog
                          PaperProps={{
                            sx: {
                              borderRadius: "12px",
                              overflow: "hidden",
                              maxHeight: {
                                xs: "100vh",
                                sm: "100vh",
                                md: "85vh",
                              },
                              maxWidth: "1000px",
                              padding: "2rem 1.5rem",
                            },
                          }}
                          open={reviewDialog}
                          onClose={() => setReviewDialog(false)}
                        >
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              sm={4}
                              md={4}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                pr: "1rem",
                                pb: { xs: "1rem", sm: "1rem", md: "0rem" },
                              }}
                            >
                              <Close
                                onClick={() => setReviewDialog(false)}
                                sx={{
                                  "&:hover": { background: "#eee" },
                                  padding: ".25rem",
                                  borderRadius: "30px",
                                  cursor: "pointer",
                                  mt: "0rem",
                                  mb: "1rem",
                                }}
                              />
                              <Typography
                                variant="h6"
                                component="h1"
                                sx={{
                                  color: "#666",
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  textAlign: "left",
                                  mr: "1rem",
                                  mb: { xs: "1rem", sm: "1rem", md: "0rem" },
                                }}
                              >
                                {data.getPropertyDetails.name}
                              </Typography>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: "#666",
                                  fontSize: "1.25rem",
                                  display: "flex",
                                  alignItems: "center",
                                  mt: { xs: ".5rem", sm: ".5rem", md: "0rem" },
                                  mb: ".5rem",
                                  textAlign: "left",
                                }}
                              >
                                <RomingoScore
                                  left
                                  score={reviewData && reviewData.rating}
                                />
                                &nbsp;&bull;&nbsp;
                                <span
                                  style={{
                                    fontSize: "80%",
                                    fontWeight: 500,
                                    color: "#666",
                                  }}
                                >
                                  {reviewData.user_ratings_total} reviews
                                </span>
                              </Typography>

                              {/* <Typography
                          variant="h6"
                          sx={{
                            color: "#222",
                            fontFamily: "Montserrat",
                            mb: "1rem",
                            textAlign: "left",
                          }}
                        >
                          {data.property.name}
                      </Typography> */}

                              <img
                                style={{ marginTop: "auto", maxWidth: "125px" }}
                                src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={8}
                              sx={{
                                paddingLeft: { xs: "0", sm: "0", md: "3rem" },
                                paddingTop: {
                                  xs: "2rem",
                                  sm: "2rem",
                                  md: "1rem",
                                },
                                maxHeight: {
                                  xs: `calc(${height}px - 100px)`,
                                  sm: `${height}px`,
                                  md: "70vh",
                                },
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: {
                                  xs: "column-reverse",
                                  sm: "column-reverse",
                                  md: "column",
                                },
                                "&::-webkit-scrollbar": {
                                  width: "0.4em",
                                },
                                "&::-webkit-scrollbar-track": {
                                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                                  borderRadius: "0.3em",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                  backgroundColor: "rgba(0,0,0,.25)",
                                  borderRadius: "0.3em",
                                },
                              }}
                            >
                              {reviewData &&
                                reviewData?.reviews &&
                                reviewData.reviews.map((review: any) => (
                                  <Grid
                                    container
                                    key={review.author_name}
                                    sx={{ paddingBottom: "2rem" }}
                                  >
                                    <Grid item xs={1}>
                                      <img
                                        style={{ maxHeight: "50px" }}
                                        src={review.profile_photo_url}
                                      />
                                    </Grid>
                                    <Grid
                                      item
                                      xs={11}
                                      sx={{
                                        paddingLeft: {
                                          xs: "2.25rem",
                                          sm: "2.25rem",
                                          md: "1.5rem",
                                        },
                                        color: "#222",
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: 500,
                                        flexDirection: "column",
                                      }}
                                    >
                                      <span style={{ display: "block" }}>
                                        {" "}
                                        {review.author_name}{" "}
                                      </span>
                                      <span
                                        style={{
                                          display: "block",
                                          marginTop: ".25rem",
                                        }}
                                      >
                                        {" "}
                                        {review.relative_time_description}{" "}
                                      </span>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      sx={{
                                        paddingTop: "1rem",
                                        color: "#222",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        fontWeight: 500,
                                        flexDirection: "row",

                                      }}
                                    >
                                      <Star
                                        sx={{
                                          fontSize: "1.5rem",
                                          mr: ".5rem",
                                          color: "#BC4749",
                                        }}
                                      />
                                      <span
                                        style={{
                                          display: "block",
                                          marginTop: ".25rem",
                                          letterSpacing: 2,
                                        }}
                                      >
                                        {review.rating}/5
                                      </span>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      sx={{
                                        letterSpacing: "0.011rem",
                                        mt: ".5rem",
                                        padding: ".5rem 0rem",
                                        lineHeight: 1.75,
                                      }}
                                    >
                                      {review.text}
                                    </Grid>
                                  </Grid>
                                ))}

                              <Grid
                                sx={{
                                  mt: { md: "2rem", xs: ".5rem", sm: ".5rem" },
                                  mb: { xs: "2rem", sm: "2rem", md: "0" },
                                  display: "flex",
                                  alignItems: "center",
                                  pt: { md: "1.5rem", xs: "1rem", sm: "1rem" },
                                  pb: { xs: "1.5rem", sm: "1.5rem", md: "0" },
                                  position: "sticky",
                                  bottom: { xs: "", sm: "", md: "0px" },
                                  background: "#fff",
                                  borderBottom: {
                                    md: "0",
                                    xs: "2px solid #ddd",
                                    sm: "2px solid #ddd",
                                  },
                                  borderTop: {
                                    xs: "0",
                                    sm: "0",
                                    md: "2px solid #ddd",
                                  },
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: "#666",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    textAlign: "left",
                                    ml: "1rem",
                                  }}
                                >
                                  5 of {reviewData.user_ratings_total}
                                </Typography>

                                <Button
                                  onClick={() =>
                                    window.open(
                                      `https://www.google.com/maps/search/?api=1&query=${data.getPropertyDetails.name}&query_place_id=${data.getPropertyDetails.googlePlaceId}`
                                    )
                                  }
                                  variant="outlined"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    ml: "auto",
                                    mr: "1rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  See all reviews
                                  <Launch
                                    sx={{ ml: "1rem", fontSize: "16px" }}
                                  />
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Dialog>
                      )}
                      {isMobile && (
                        <Drawer
                          PaperProps={{
                            sx: {
                              height: "100%",
                              borderRadius: "0px",
                              overflow: "hidden",
                              padding: "2rem 1.5rem",
                            },
                          }}
                          anchor="bottom"
                          open={reviewDialog}
                          onClose={() => setReviewDialog(false)}
                        >
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              sm={4}
                              md={4}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                pr: "1rem",
                                pb: { xs: "1rem", sm: "1rem", md: "0rem" },
                              }}
                            >
                              <ArrowBackIos
                                onClick={() => setReviewDialog(false)}
                                sx={{ mt: "4rem" }}
                              />
                              <Typography
                                variant="h6"
                                sx={{
                                  color: "#222",
                                  fontSize: "2rem",
                                  textAlign: "left",
                                  display: "flex",
                                  alignItems: "center",
                                  mt: { xs: ".5rem", sm: ".5rem", md: "0rem" },
                                  mb: { xs: ".5rem", sm: ".5rem", md: "2rem" },
                                }}
                              >
                                <RomingoScore
                                  score={reviewData && reviewData.rating}
                                />
                                <span
                                  style={{
                                    fontSize: "60%",
                                    fontWeight: 500,
                                    color: "#666",
                                  }}
                                >
                                  {" "}
                                  {reviewData.user_ratings_total} reviews{" "}
                                </span>
                              </Typography>

                              <Typography
                                variant="h6"
                                component="h1"
                                sx={{
                                  color: "#666",
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  textAlign: "left",
                                  mr: "1rem",
                                  mb: { xs: "1rem", sm: "1rem", md: "0rem" },
                                }}
                              >
                                {data.getPropertyDetails.name}
                              </Typography>

                              {/* <Typography
                          variant="h6"
                          sx={{
                            color: "#222",
                            fontFamily: "Montserrat",
                            mb: "1rem",
                            textAlign: "left",
                          }}
                        >
                          {data.property.name}
                      </Typography> */}

                              <img
                                style={{ marginTop: "auto", maxWidth: "125px" }}
                                src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={8}
                              sx={{
                                paddingLeft: { xs: "0", sm: "0", md: "3rem" },
                                paddingTop: {
                                  xs: "0rem",
                                  sm: "0rem",
                                  md: "1rem",
                                },
                                maxHeight: {
                                  xs: `calc(${height}px - 100px)`,
                                  sm: `${height}px`,
                                  md: "70vh",
                                },
                                overflowY: "auto",
                                paddingBottom: "2rem",
                              }}
                            >
                              <Grid
                                sx={{
                                  mt: { md: "2rem", xs: ".5rem", sm: ".5rem" },
                                  mb: { xs: "2rem", sm: "2rem", md: "0" },
                                  display: "flex",
                                  alignItems: "center",
                                  pt: { md: "1.5rem", xs: "0rem", sm: "0rem" },
                                  pb: { xs: "1.5rem", sm: "1.5rem", md: "0" },
                                  background: "#fff",
                                  borderBottom: {
                                    md: "0",
                                    xs: "2px solid #ddd",
                                    sm: "2px solid #ddd",
                                  },
                                  borderTop: {
                                    xs: "0",
                                    sm: "0",
                                    md: "2px solid #ddd",
                                  },
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: "#666",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    textAlign: "left",
                                    ml: "1rem",
                                  }}
                                >
                                  5 of {reviewData.user_ratings_total}
                                </Typography>

                                <Button
                                  onClick={() =>
                                    window.open(
                                      `https://www.google.com/maps/search/?api=1&query=${data.getPropertyDetails.name}&query_place_id=${data.getPropertyDetails.googlePlaceId}`
                                    )
                                  }
                                  variant="outlined"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    ml: "auto",
                                    mr: "1rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  See all reviews
                                  <Launch
                                    sx={{ ml: "1rem", fontSize: "16px" }}
                                  />
                                </Button>
                              </Grid>

                              {reviewData &&
                                reviewData?.reviews &&
                                reviewData.reviews.map((review: any) => (
                                  <Grid
                                    container
                                    key={review.author_name}
                                    sx={{ paddingBottom: "6rem" }}
                                  >
                                    <Grid item xs={1}>
                                      <img
                                        style={{ maxHeight: "50px" }}
                                        src={review.profile_photo_url}
                                      />
                                    </Grid>
                                    <Grid
                                      item
                                      xs={11}
                                      sx={{
                                        paddingLeft: {
                                          xs: "2.25rem",
                                          sm: "2.25rem",
                                          md: "1.5rem",
                                        },
                                        color: "#222",
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: 500,
                                        flexDirection: "column",
                                      }}
                                    >
                                      <span style={{ display: "block" }}>
                                        {" "}
                                        {review.author_name}{" "}
                                      </span>
                                      <span
                                        style={{
                                          display: "block",
                                          marginTop: ".25rem",
                                        }}
                                      >
                                        {" "}
                                        {review.relative_time_description}{" "}
                                      </span>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      sx={{
                                        paddingTop: "1rem",
                                        color: "#222",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        fontWeight: 500,
                                        flexDirection: "row",
                                      }}
                                    >
                                      <Star
                                        sx={{
                                          fontSize: "1.5rem",
                                          mr: ".5rem",
                                          color: "#BC4749",
                                        }}
                                      />
                                      <span
                                        style={{
                                          display: "block",
                                          marginTop: ".25rem",
                                          letterSpacing: 2,
                                        }}
                                      >
                                        {review.rating}/5
                                      </span>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      sx={{
                                        letterSpacing: "0.011rem",
                                        mt: ".5rem",
                                        padding: ".5rem 0rem",
                                        lineHeight: 1.75,
                                      }}
                                    >
                                      {review.text}
                                    </Grid>
                                  </Grid>
                                ))}
                            </Grid>
                          </Grid>
                        </Drawer>
                      )}
                    </Typography>
                  ) : (
                    <RomingoScore score={reviewData && reviewData.rating} />
                  )}
                </Grid>

                <Typography
                  variant="body1"
                  sx={{
                    letterSpacing: ".015rem",
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "#999",
                    mt: ".25rem",
                  }}
                >
                  {location.address}, {city?.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    letterSpacing: ".015rem",
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "#999",
                    mt: ".25rem",
                  }}
                >
                  {neighborhood}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    my: "1rem",
                  }}
                >                 
                  <HotelTags 
                    petFeePolicy={{ ...data?.getPropertyDetails?.petFeePolicy, totalFees: utils.computePetFeePolicyTotalFees(diffDays || 1, search.occupants.dogs || 1, data?.getPropertyDetails?.petFeePolicy || {}) }} 
                    allows_big_dogs={allowsBigDogs} 
                  />
                </Box>
                <ReadMore small text={defaultDescription} length={200} />
                <Button
                  onClick={goToRateScroll}
                  fullWidth
                  disableElevation
                  variant="contained"
                  sx={{
                    fontWeight: 600,
                    mt: "1rem",
                    display: { xs: "flex", md: "none" },
                  }}
                >
                  Select a room
                </Button>
                <Grid container spacing={2} sx={{ mt: 0 }}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box
                      sx={{ display: "flex", flex: 1, height: "100%", px: 0.5 }}
                    >
                      <AmenitiesCard
                        title={"Hotel Amenities"}
                        amenities={otherAmenities}
                        viewAll
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid sx={{ pb: ".5rem" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: "1rem",
                      color: "#222222",
                      fontWeight: 600,
                      display: "block",
                    }}
                  >
                    Where You&lsquo;ll Be
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      letterSpacing: ".015rem",
                      mt: ".5rem",
          
                      color: "#999",
                      fontWeight: 400,
                    }}
                  >
                    {location.address}, {city?.name}, United States
                  </Typography>
                  <Box sx={{ display: "flex", my: 2, width: "100%" }}>
                    <Map
                      center={{
                        lat: parseFloat(locationCoordinates.lat || 0),
                        lng: parseFloat(locationCoordinates.lon || 0),
                      }}
                      height={fullScreen ? 200 : 300}
                      markers={markers}
                      zoom={14}
                      selectedMarker={0}
                    />
                  </Box>
                </Grid>
                <Grid
                  container
                  sx={{
                    borderTop: "1px solid #ddd",
                    borderBottom: "1px solid #ddd",
                    pb: "2rem",
                    mt: "1rem",
                  }}
                >
                  <Grid item xs={12}>
                     <Typography
                       variant="h6"
                       sx={{
                         color: "#222",
                         mt: { xs: 1, sm: 5 },
                         mb: "1rem",
                         textAlign: "left",
                       }}
                     >Hotel Description</Typography>
                    <ReadMore small text={data?.getPropertyDetails?.petFeePolicy?.desc} length={200} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={5} lg={4}>
                <Hidden mdDown>
                  <BookingCard
                    sx={{ background: "#fff" }}
                    roomList={roomDropDown}
                    goToRate={goToRateScroll}
                  />
                </Hidden>
                <Hidden mdUp>
                  <Fab
                    color="default"
                    size="small"
                    onClick={() => history.goBack()}
                    aria-label="back"
                    sx={{
                      backgroundColor: "white",
                      color: "text.secondary",
                      position: "absolute",
                      width: 35,
                      height: 35,
                      top: 70,
                      left: 15,
                    }}
                  >
                    <ArrowBackIcon sx={{ fontSize: 16 }} />
                  </Fab>
                  {/* <MobileBookingBar roomList={roomDropDown} /> */}
                </Hidden>
              </Grid>
            </Grid>
          )}
          {!loading && data && (
            <>
              <Grid
                container
                sx={{
                  mt: 0,
                  maxWidth: "100%",
                  paddingBottom: { xs: "2rem", sm: "2rem" },
                  borderBottom: "1px solid #ddd",
                }}
                id="rooms"
                ref={RateCardRef}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#222",
                      mt: { xs: 1, sm: 5 },
                      mb: "1rem",
                      textAlign: "left",
                    }}
                  >
                    Choose your room
                  </Typography>
                  <RoomsFilterBar refetch={refetch} />
                  {roomsLoading ? <Box sx={{ mx: 'auto', textAlign: 'center'}}><CircularProgress /></Box> 
                     : rooms.length > 0 ?
                     <Grid container columnSpacing={6} rowSpacing={6}>
                       {rooms.map((room: any, key: number) => {
                         return (
                           <Grid
                             item
                             md={4}
                             lg={4}
                             sm={6}
                             xs={12}
                             key={key}
                             sx={{ display: "flex", flex: 1 }}
                           >
                             <RoomCard
                               key={key}
                               bestRate={key === 0 ? true : false}
                               HotelName={name}
                               room={room}
                               flag={locationState.state?.flag}
                               bookingId={locationState.state?.bookingId}
                               sx={{
                                 minWidth: "260px",
                                 borderRadius: "8px",
                                 p: " 0rem 1rem 1rem 1rem",
                                 border: "1px solid #ddd",
                                 transition: "all .15s ease-in-out",
                                 boxShadow: 1,
                                 "&:hover": { boxShadow: 3 },
                               }}
                               {...room}
                             />
                           </Grid>
                         );
                       })}
                     </Grid>
                     : <Typography sx={{ textAlign: 'center'}}>No rooms found in this date range.</Typography>
                   }
                   {!roomsLoading && accessibleRooms && accessibleRooms.length > 0 && (
                     <>
                       <Divider variant="middle" light sx={{ mt: 6, mb: 2 }}>
                         <Typography variant="h6">Accessible Rooms</Typography>
                       </Divider>

                       <Grid container columnSpacing={6} rowSpacing={6}>
                         {accessibleRooms.map((room: any, key: number) => {
                           return (
                             <Grid
                               item
                               md={4}
                               lg={4}
                               sm={6}
                               xs={12}
                               key={key}
                               sx={{ display: "flex", flex: 1 }}
                             >
                               <RoomCard
                                 key={key}
                                 bestRate={key === 0 ? true : false}
                                 HotelName={name}
                                 room={room}
                                 sx={{
                                   minWidth: "260px",
                                   borderRadius: "8px",
                                   p: " 0rem 1rem 1rem 1rem",
                                   border: "1px solid #ddd",
                                   transition: "all .15s ease-in-out",
                                   boxShadow: 1,
                                   "&:hover": { boxShadow: 3 },
                                 }}
                                 flag={locationState.state?.flag}
                                 bookingId={locationState.state?.bookingId}
                                 {...room}
                               />
                             </Grid>
                           );
                         })}
                       </Grid>
                     </>
                   )}
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 4 }} id="reviews">
                <Grid sx={{ pb: ".5rem" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: "1rem",
                      color: "#222222",
                      fontWeight: 600,
                      display: "block",
                    }}
                  >
                    What People Are Saying
                  </Typography>
                  <Box display="flex" alignItems="center" gap="0.25rem">
                    <Typography variant="base">Powered By</Typography>
                    <img
                      style={{
                        marginTop: "auto",
                        maxWidth: "100px",
                        marginLeft: "2px",
                        width: '80px'
                      }}
                      src={googleImage}
                    />
                  </Box>
                  <Grid container spacing={4} mt={2}>
                    {reviewData &&
                      reviewData.reviews &&
                      reviewData?.reviews.map((review: any) => (
                        <Grid item xs={12} sm={6} key={review.author_name}>
                          <Grid container sx={{ paddingBottom: "2rem" }}>
                            <Grid item xs={1}>
                              <img
                                style={{ maxHeight: "45px" }}
                                src={review.profile_photo_url}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={11}
                              sx={{
                                paddingLeft: {
                                  xs: "2.25rem",
                                  sm: "2.25rem",
                                  md: "1.5rem",
                                },
                                color: "#222",
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 500,
                                flexDirection: "column",
                                fontSize: "14px",
                              }}
                            >
                              <span style={{ display: "block" }}>
                                {" "}
                                {review.author_name}{" "}
                              </span>
                              <span
                                style={{
                                  display: "block",
                                  marginTop: ".25rem",
                                }}
                              >
                                {" "}
                                {review.relative_time_description}{" "}
                              </span>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                paddingTop: "1rem",
                                color: "#222",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                fontWeight: 500,
                                flexDirection: "row",
                              }}
                            >
                              <Star
                                sx={{
                                  fontSize: "1.5rem",
                                  mr: ".5rem",
                                  color: "#BC4749",
                                }}
                              />
                              <span
                                style={{
                                  display: "block",
                                  marginTop: ".25rem",
                                  letterSpacing: 2,
                                }}
                              >
                                {review.rating}/5
                              </span>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                letterSpacing: "0.011rem",
                                mt: ".5rem",
                                padding: ".5rem 0rem",
                                lineHeight: 1.75,
                                color: "#444",
                                fontSize: "14px",
                              }}
                            >
                              {review.text}
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                  </Grid>
                  {reviewData && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${data.getPropertyDetails.name}&query_place_id=${data.getPropertyDetails.googlePlaceId}`
                          )
                        }
                        variant="outlined"
                        size="small"
                        sx={{
                          alignItems: "center",
                          mr: "auto",
                          fontWeight: 600,
                        }}
                      >
                        See all reviews
                        <Launch sx={{ ml: "1rem", fontSize: "16px" }} />
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </>
          )}

          {showFullImage && 
            <Dialog maxWidth="xl" sx={{ p: '2rem',  }} open={true} onClick={() => setShowFullImage('')}>
              <img src={showFullImage}  style={{ maxHeight: '80vh', objectFit: 'contain' }} />
            </Dialog>
          }

          <SimpleReactLightbox>
            <Dialog
              open={showGallery}
              keepMounted
              fullScreen
              onClose={handleClose}
              scroll="paper"
              aria-labelledby="photo-dialog-slide-title"
              aria-describedby="photo-dialog-slide-description"
            >
              <DialogTitle
                id="photo-dialog-slide-title"
                sx={{
                  position: "sticky",
                  backgroundColor: "white",
                  display: "flex",
                  height: "30px",
                  justifyContent: "space-between",
                  alignItems: "bottom",
                  top: 0,
                  zIndex: 10000,
                  color: "primary.main",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#222222",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  Photos
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ px: 0 }}>

                <Container maxWidth="xl" sx={{ mt: { xs: 0, md: 2 } }}>
                  <ImageList variant="standard" cols={getImageCols()} gap={8}>
                      {gallery.map((item: any, index: Integer) => (
                        <ImageListItem key={item} onClick={() => {
                          if (!isMobile) {
                            setShowFullImage(item)
                          }
                        }}>
                          <img
                            srcSet={`${item.replace(
                              /^http(s?):/i,
                              ""
                            )}?w=161&fit=crop&auto=format 1x,
${item.replace(/^http(s?):/i, "")}?w=161&fit=crop&auto=format&dpr=2 2x`}
                            alt={name}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                  </ImageList>
                </Container>
              </DialogContent>
            </Dialog>

          {/* <SRLWrapper options={lightBoxOptions} /> */}

          </SimpleReactLightbox>
        </Container>
      </Grid>
      <Footer />
    </>
  );
};

interface PetAmenitiesProps {
  title: string;
  amenities: string[];
}

const PetAmmenities: FC<PetAmenitiesProps> = ({ amenities, title }) => {
  const petAmenities = [
    { text: ["potty"], icon: Pets },
    { icon: Bed, text: ["bed"] },
    { icon: ShoppingBasket, text: ["shop"] },
    { icon: LocalCafe, text: ["cafe"] },
    { icon: MoneyOff, text: ["deposit"] },
    { icon: RoomService, text: ["concierge"] },
    { icon: DirectionsRun, text: ["run"] },
    { icon: Soap, text: ["grooming"] },
    { icon: Restaurant, text: ["food"] },
    { icon: Deck, text: ["patio", "deck"] },
    { icon: Nightlife, text: ["happy hour"] },
  ];

  const includedPet = amenities
    .reduce((acc: Array<any>, item: string) => {
      if (
        petAmenities.find((pop) =>
          pop.text.some((i) => item.toLowerCase().includes(i)) ? pop : ""
        )
      ) {
        return [
          ...acc,
          {
            ...petAmenities.find((pop) =>
              pop.text.some((i) => item.toLowerCase().includes(i)) ? pop : ""
            ),
            receivedText: item,
          },
        ];
      } else {
        return [...acc];
      }
    }, [])
    .sort((a, b) => (a.receivedText > b.receivedText ? 1 : -1));

  return (
    <Box sx={{ color: "text.primary", width: "100%", pl: { sm: "1rem" } }}>
      <Typography
        variant="h6"
        sx={{ color: "#222222", fontWeight: 600 }}
      >
        {title}
      </Typography>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
        >
          {includedPet.map((amenity, key) => {
            const AmenityIcon = amenity.icon;
            if (key < 7) {
              return (
                <Box
                  sx={{
                    display: "inline-flex",
                    flexDirection: "row",
                    mt: "0.9rem",
                  }}
                  key={key}
                >
                  <SvgIcon
                    sx={{ color: "#999", mr: "1rem" }}
                    component={AmenityIcon}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: ".9rem",
                      fontWeight: 400,
                      mt: 0,
                      textTransform: "capitalize",
                      color: "text.primary",
                      textIndent: "-8px",
                      paddingLeft: "8px",
                      letterSpacing: ".015rem",
                    }}
                  >
                    {amenity.receivedText}
                  </Typography>
                </Box>
              );
            }
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

interface AmenitiesProps {
  title: string;
  amenities: string[];
  rowNumber?: number;
  viewAll?: boolean;
}

const AmenitiesCard: FC<AmenitiesProps> = ({ title, amenities, viewAll }) => {
  const [showDialog, setShowDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const popularAmenities = [
    { icon: Pool, text: ["pool"], not: ["meeting rooms"] },
    {
      icon: FitnessCenter,
      text: ["gym", "fitness center", "health club"],
      not: ["meeting rooms"],
    },
    {
      icon: Wifi,
      text: ["high speed internet", "high speed wireless", "wifi", "internet"],
      not: ["meeting rooms", "public area"],
    },
    { icon: Pets, text: ["pets allowed", "pets"], not: ["meeting rooms"] },
    { icon: PersonAddAlt, text: ["extra person"], not: ["meeting rooms"] },
    { icon: HotTub, text: ["hot tub"], not: ["meeting rooms"] },
    { icon: DryCleaning, text: ["dry cleaning"], not: ["meeting rooms"] },
    { icon: BusinessCenter, text: ["business center"], not: ["meeting rooms"] },
    { icon: RoomService, text: ["room service"], not: ["meeting rooms"] },
    { icon: Restaurant, text: ["restaurant"], not: ["meeting rooms"] },
    { icon: LocalCafe, text: ["coffee"], not: ["meeting rooms"] },
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

  const includedPopular = amenities
    .reduce((acc: Array<any>, item: string) => {
      if (
        popularAmenities.find((pop) =>
          pop.text.some((i) => item.toLowerCase().includes(i)) ? pop : ""
        )
      ) {
        if (
          popularAmenities.find((pop) =>
            pop.not.some((i) => item.toLowerCase().includes(i)) ? pop : ""
          )
        ) {
          return [...acc];
        } else {
          return [
            ...acc,
            {
              ...popularAmenities.find((pop) =>
                pop.text.some((i) => item.toLowerCase().includes(i)) ? pop : ""
              ),
              receivedText: item,
            },
          ];
        }
      } else {
        return [...acc];
      }
    }, [])
    .sort((a, b) => (a.receivedText > b.receivedText ? 1 : -1));

  const includedOther = amenities
    .reduce((acc: Array<any>, item: string) => {
      if (
        otherAmenities.find((pop) =>
          pop.text.some((i) => item.toLowerCase().includes(i)) ? pop : ""
        )
      ) {
        return [
          ...acc,
          {
            ...otherAmenities.find((pop) =>
              pop.text.some((i) => item.toLowerCase().includes(i)) ? pop : ""
            ),
            receivedText: item,
          },
        ];
      } else {
        return [...acc];
      }
    }, [])
    .sort((a, b) => (a.receivedText > b.receivedText ? 1 : -1));

  const noIconAmenities = amenities
    .reduce((acc: Array<any>, item: string) => {
      if (
        !popularAmenities.find((pop) =>
          pop.text.some((i) => item.toLowerCase().includes(i)) ? pop : ""
        )
      ) {
        return [...acc, item];
      } else {
        return [...acc];
      }
    }, [])
    .reduce((acc: Array<any>, item: string) => {
      if (
        !otherAmenities.find((pop) =>
          pop.text.some((i) => item.toLowerCase().includes(i)) ? pop : ""
        )
      ) {
        return [...acc, item];
      } else {
        return [...acc];
      }
    }, [])
    .sort((a: string, b: string) => (a > b ? 1 : -1));

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleOpen: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDialog(true);
  };

  return (
    <Box
      sx={{
        color: "text.primary",
        py: 2,
        pb: 3,
        width: "100%",
        borderBottom: "1px solid #ddd",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#222222",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {title}

        {viewAll && amenities && amenities.length > 13 && (
          <>
            <Box sx={{ textAlign: "right" }}>
              <Link
                href="#"
                sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                onClick={handleOpen}
              >
                <Typography
                  variant="body2"
                  sx={{ ml: "1rem", fontWeight: 500 }}
                >
                  See All{" "}
                </Typography>
              </Link>
            </Box>
            <Dialog
              PaperProps={{ sx: { borderRadius: "8px" } }}
              open={showDialog}
              keepMounted
              fullWidth
              fullScreen={fullScreen}
              onClose={handleClose}
            >
              <DialogTitle
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "primary.main",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#222222",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  All Amenities
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ overflowY: "auto" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "90%",
                    color: "#222222",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  Most Popular
                </Typography>
                {includedPopular.concat(includedOther).map((amenity, index) => {
                  const AmenityIcon = amenity.icon;
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mt: ".9rem",
                      }}
                      key={index}
                    >
                      <SvgIcon
                        sx={{ color: "#999", mr: "1rem" }}
                        component={AmenityIcon}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: ".9rem",
                          fontWeight: 400,
                          mt: 0,
                          textTransform: "capitalize",
                          color: "text.primary",
                          textIndent: "-8px",
                          paddingLeft: "8px",
                          letterSpacing: ".015rem",
                        }}
                      >
                        {amenity.receivedText}
                      </Typography>
                    </Box>
                  );
                })}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "90%",
                    color: "#222222",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    mt: "1rem",
                  }}
                >
                  Other Amenities
                </Typography>
                {noIconAmenities.map((item: string) => (
                  <Box
                    key={item}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: ".9rem",
                      alignItems: "center",
                    }}
                  >
                    <SvgIcon
                      sx={{ color: "#999", mr: "1rem", fontSize: "12px" }}
                      component={FiberManualRecord}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: ".9rem",
                        fontWeight: 400,
                        mt: 0,
                        textTransform: "capitalize",
                        color: "text.primary",
                        textIndent: "-8px",
                        paddingLeft: "8px",
                        letterSpacing: ".015rem",
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </DialogContent>
            </Dialog>
          </>
        )}
      </Typography>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          {includedPopular.map((amenity, index) => {
            if (index < 6) {
              const AmenityIcon = amenity.icon;
              return (
                <Box
                  sx={{
                    display: "inline-flex",
                    flexDirection: "row",
                    mt: ".9rem",
                  }}
                  key={index}
                >
                  <SvgIcon
                    sx={{ color: "#999", mr: "1rem" }}
                    component={AmenityIcon}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: ".9rem",
                      fontWeight: 400,
                      mt: 0,
                      textTransform: "capitalize",
                      color: "text.primary",
                      textIndent: "-8px",
                      paddingLeft: "8px",
                      letterSpacing: ".015rem",
                    }}
                  >
                    {amenity.receivedText}
                  </Typography>
                </Box>
              );
            }
          })}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          {includedPopular && includedPopular.length < 6
            ? includedOther.map((amenity, index) => {
              if (index < 6) {
                const AmenityIcon = amenity.icon;
                return (
                  <Box
                    sx={{
                      display: "inline-flex",
                      flexDirection: "row",
                      mt: ".9rem",
                    }}
                    key={index}
                  >
                    <SvgIcon
                      sx={{ color: "#999", mr: "1rem" }}
                      component={AmenityIcon}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: ".9rem",
                        fontWeight: 400,
                        mt: 0,
                        textTransform: "capitalize",
                        color: "text.primary",
                        textIndent: "-8px",
                        paddingLeft: "8px",
                        letterSpacing: ".015rem",
                      }}
                    >
                      {amenity.receivedText}
                    </Typography>
                  </Box>
                );
              }
            })
            : includedPopular.map((amenity, index) => {
              if (index > 5 && index < 13) {
                const AmenityIcon = amenity.icon;
                return (
                  <Box
                    sx={{
                      display: "inline-flex",
                      flexDirection: "row",
                      mt: ".9rem",
                    }}
                    key={index}
                  >
                    <SvgIcon
                      sx={{ color: "#999", mr: "1rem" }}
                      component={AmenityIcon}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: ".9rem",
                        fontWeight: 400,
                        mt: 0,
                        textTransform: "capitalize",
                        color: "text.primary",
                        textIndent: "-8px",
                        paddingLeft: "8px",
                        letterSpacing: ".015rem",
                      }}
                    >
                      {amenity.receivedText}
                    </Typography>
                  </Box>
                );
              }
            })}
        </Grid>
      </Grid>
    </Box>
  );
};

interface FilterBarProps {
  sx?: CSSObject;
  zoomed?: boolean;
  home?: boolean;
  city?: string;
  refetch: any;
}

const RoomsFilterBar: FC<FilterBarProps> = ({ city = "", refetch }) => {
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [isTextField, setIsTextField] = useState(false);
  const search = useSelector((state: any) => state.searchReducer.search);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const [selectedCity, setSelectedCity] = useState(
    search.city ? search.city : null
  );
  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([
    search.checkIn ? search.checkIn : new Date(),
    search.checkOut
      ? search.checkOut
      : DateTime.local().plus({ days: 1 }).toJSDate(),
  ]);
  const [occupants, setOccupants] = useState(
    search.occupants.dogs > 0
      ? search.occupants
      : { adults: 2, children: 0, dogs: 1 }
  );
  const biggerThanTenForty = useMediaQuery("(min-width:1040px)");
  const below900 = useMediaQuery("(max-width:900px)");

  const dispatch: Dispatch<any> = useDispatch();

  const onOccupantChange = (value: Occupant) => setOccupants(value);

  const handleDateRangeClose = () => {
    setIsAccept(false);
    if (!isTextField) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) setIsTextField(false);
  }, [open]);

  useEffect(() => {
    console.log({search})  
  },[])

  useEffect(() => {
    if (city && city.length > 0 && cities.length > 0) {
      setSelectedCity(city);
    }
  }, [cities]);

  function getAgeParam(childrenAge) {
    if (childrenAge) {
      return childrenAge.map((x: number) => {
        if (x === 0) {
          return {
            age: 1,
          };
        }
        return {
          age: x,
        };
      })
    }
    return []
  }

  const handleFilterOutClick: MouseEventHandler<Element> = () => {
    // TagManager.dataLayer({ dataLayer: { event: "clicked_search" } });
    console.log(occupants)
    console.log(checkDate)
    if (
      occupants.adults !== 0 &&
      checkDate[0] &&
      checkDate[1]
    ) {
      dispatch(
        saveSearch({
          checkIn: new Date(checkDate[0]).toISOString(),
          checkOut: new Date(checkDate[1]).toISOString(),
          occupants,
        })
      );

 
      if (refetch) {
        const checkIn = new Date(checkDate[0]).toISOString()
        const checkOut = new Date(checkDate[1]).toISOString()
        refetch({
          checkIn: checkIn.substring(0, 10),
          checkOut: checkOut.substring(0, 10),
          adults: occupants.adults,
          children: getAgeParam(occupants.childrenAge),
          dogs: occupants.dogs,
        })
      }
    } else {
      alert("error");
    }
  };

  return (
    <>
      {below900 ? (
        <Box
          sx={{
            zIndex: 2,
            margin: "0px auto 12px auto",
            paddingBottom: "12px",
            borderBottom: "1px solid #ddd",
            width: "90vw",
            background: "#fff",
          }}
        >
          <OccupantSelector
            value={occupants}
            onChange={onOccupantChange}
            variant="standard"
            size="small"
          />
          <Box
            sx={{
              display: "flex",
              padding: ".5rem .125rem",
              flexDirection: "column",
              alignItems: "center",
              mb: ".5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                transition: "all .15s ease-in-out",
                alignItems: "center",
                maxHeight: "47px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  inputFormat="MMM dd"
                  disableMaskedInput={true}
                  open={open}
                  onAccept={() => setIsAccept(true)}
                  onClose={handleDateRangeClose}
                  onOpen={() => {
                    if (!isAccept) {
                      setOpen(true);
                    }
                  }}
                  allowSameDateSelection
                  calendars={1}
                  clearable={true}
                  value={checkDate || null}
                  minDate={new Date()}
                  onChange={(newValue) => {
                    setCheckDate(newValue);
                  }}
                  renderInput={() => <Grid sx={{ display: "none" }}></Grid>}
                />
              </LocalizationProvider>

              <Grid
                container
                onClick={() => setOpen(true)}
                sx={{
                  width: "100%",
                  mt: "1.125rem",
                }}
              >
                <Grid item xs={6} sx={{ pr: ".25rem" }}>
                  <Grid
                    container
                    sx={{
                      border: "2px solid #343B5380",
                      borderRadius: "6px",
                      padding: ".25rem .25rem .25rem 1rem",
                    }}
                  >
                    <Grid
                      item
                      xs={3}
                      sx={{
                        pr: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Event sx={{ height: "24px", color: "#666" }} />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              color: "#666",
                              fontFamily: "Roboto",
                              mb: "-.125rem",
                              textTransform: "none",
                              fontWeight: 600,
                              fontSize: { xs: "11px" },
                            }}
                          >
                            Check-in
                          </Typography>
                          <Typography
                            sx={{
                              color: "#666",
                              fontFamily: "Roboto",
                              textTransform: "none",
                              fontWeight: 600,
                              fontSize: { xs: "14px" },
                            }}
                          >
                            {checkDate[0]
                              ? DateTime.fromJSDate(
                                new Date(checkDate[0])
                              ).toFormat("MMM dd")
                              : ""}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sx={{ pl: " .25rem" }}>
                  <Grid
                    container
                    sx={{
                      border: "2px solid #343B5380",
                      borderRadius: "6px",
                      padding: ".25rem .25rem .25rem 1rem",
                    }}
                  >
                    <Grid
                      item
                      xs={3}
                      sx={{
                        pr: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Event sx={{ height: "24px", color: "#666" }} />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography
                        sx={{
                          color: "#666",
                          fontFamily: "Roboto",
                          mb: "-.125rem",
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: { xs: "11px" },
                        }}
                      >
                        Check-out
                      </Typography>
                      <Typography
                        sx={{
                          color: "#666",
                          fontFamily: "Roboto",
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: { xs: "14px" },
                        }}
                      >
                        {checkDate[1]
                          ? DateTime.fromJSDate(
                            new Date(checkDate[1])
                          ).toFormat("MMM dd")
                          : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Button
                fullWidth
                onClick={handleFilterOutClick}
                disableElevation
                type="submit"
                variant="contained"
                sx={{
                  height: "47px",
                  width: "47px",
                  display: "flex",
                  alignItems: "center",
                  padding: ".25rem 0rem",
                  justifyContent: "center",
                  mt: "1rem",
                  ml: ".5rem",
                  fontWeight: 500,
                  borderRadius: "6px",
                  textTransform: "none",
                  pointerEvents: "auto",
                }}
              >
                <SearchIcon
                  sx={{
                    height: "32px",
                    fontSize: "28px",
                    pointerEvents: "auto",
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ margin: "0px auto 24px auto", userSelect: "none" }}>
          <Box
            sx={{
              display: "flex",
              background: "#fff",
              flexDirection: below900 ? "column" : "row",
              alignItems: "center",
              mb: "1rem",
              borderRadius: "12px",
              mt: "1rem",
              width: biggerThanTenForty ? "975px" : "837px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                cursor: "pointer",
                transition: "all .15s ease-in-out",
                alignItems: "center",
                maxHeight: "47px",
                mr: ".5rem",
                border: "2px solid #343B5380",
                padding: ".25rem .5rem",
                "&:hover": { background: "#efefef" },
                borderRadius: "6px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  PaperProps={{
                    sx: {
                      fontWeight: 700,
                      "& .MuiTypography-root": { fontWeight: 500 },
                    },
                  }}
                  inputFormat="MMM dd"
                  disableMaskedInput={true}
                  open={open}
                  onAccept={() => setIsAccept(true)}
                  onClose={handleDateRangeClose}
                  onOpen={() => {
                    if (!isAccept) {
                      setOpen(true);
                    }
                  }}
                  allowSameDateSelection
                  calendars={1}
                  clearable={true}
                  value={checkDate || null}
                  minDate={new Date()}
                  onChange={(newValue) => {
                    setCheckDate(newValue);
                  }}
                  renderInput={() => (
                    <Grid
                      container
                      onClick={() => setOpen(true)}
                      sx={{
                        minWidth: "275px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Grid
                        item
                        xs={2}
                        sx={{
                          pr: "1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Event sx={{ height: "20px", color: "#444" }} />
                      </Grid>
                      <Grid item xs={8}>
                        <Grid
                          container
                          sx={{ justifyContent: "center", display: "flex" }}
                        >
                          <Grid item xs={5}>
                            <Typography
                              sx={{
                                color: "#666",
                                fontFamily: "Roboto",
                                mb: "-.125rem",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: "11px" },
                              }}
                            >
                              Check-in
                            </Typography>
                            <Typography
                              sx={{
                                color: "#444",
                                fontFamily: "Roboto",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: "14px" },
                              }}
                            >
                              {checkDate[0]
                                ? DateTime.fromJSDate(
                                  new Date(checkDate[0])
                                ).toFormat("MMM dd")
                                : ""}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sx={{
                              alignItems: "center",
                              fontWeight: 800,
                              fontFamily: "Roboto",
                              display: "flex",
                              justifyContent: "flex-start",
                              color: "#aaa",
                              textAlign: "center",
                            }}
                          >
                            &#8212;
                          </Grid>
                          <Grid item xs={5}>
                            <Typography
                              sx={{
                                color: "#666",
                                fontFamily: "Roboto",
                                mb: "-.125rem",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: "11px" },
                              }}
                            >
                              Check-out
                            </Typography>
                            <Typography
                              sx={{
                                color: "#444",
                                fontFamily: "Roboto",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: "14px" },
                              }}
                            >
                              {checkDate[1]
                                ? DateTime.fromJSDate(
                                  new Date(checkDate[1])
                                ).toFormat("MMM dd")
                                : ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        sx={{
                          ml: "auto",
                          mr: ".5rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ExpandMore sx={{ height: "20px", color: "#444" }} />
                      </Grid>
                    </Grid>
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                "&:hover": { background: "#efefef" },
                transition: "all .15s ease-in-out",
                mt: { xs: 1, md: 0 },
                mr: ".5rem",
                display: "flex",
                cursor: "pointer",
                alignItems: "top",
                border: "2px solid #343B5380",
                borderRadius: "6px",
                padding: ".25rem .5rem",
                maxHeight: "47px",
              }}
            >
              <OccupantSelector
                value={occupants}
                onChange={onOccupantChange}
                variant="standard"
                size="small"
              />
            </Box>
            {biggerThanTenForty && (
              <Box>
                <Button
                  fullWidth
                  onClick={handleFilterOutClick}
                  disableElevation
                  type="submit"
                  variant="contained"
                  sx={{
                    height: "47px",
                    width: "207px",
                    display: "flex",
                    alignItems: "center",
                    padding: ".25rem 0rem",
                    justifyContent: "center",
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    borderRadius: "6px",
                    textTransform: "none",
                  }}
                >
                  Check rates
                </Button>
              </Box>
            )}
          </Box>

          {!biggerThanTenForty && (
            <Box
              sx={{
                margin: "1rem auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                fullWidth
                onClick={handleFilterOutClick}
                disableElevation
                type="submit"
                variant="contained"
                sx={{
                  height: "47px",
                  width: "137px",
                  display: "flex",
                  alignItems: "center",
                  padding: ".25rem 0rem",
                  justifyContent: "center",
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  borderRadius: "6px",
                  textTransform: "none",
                }}
              >
                Check rates
              </Button>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export interface Occupant {
  adults: number;
  children: number;
  dogs: number;
  childrenAge?: number[];
  disabled?: boolean;
}

interface OccupantSelectorProps {
  value: Occupant;
  onChange: (value: Occupant) => void;
  onClose?: () => void;
  fullWidth?: boolean;
  size?: "small" | "medium" | undefined;
  variant?: "filled" | "outlined" | "standard" | undefined;
  disabled?: boolean;
}

const OccupantSelector: FC<OccupantSelectorProps> = ({
  value,
  onChange,
  onClose,
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [error, setError] = useState("");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setError("");
    if (value.adults === 0) {
      setError("At least 1 adult is required");
      return;
    }
    if (onClose) {
      onClose();
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        container
        onClick={handleClick}
        sx={{
          minWidth: { xs: "174px", sm: "174px", md: "275px" },
          display: { xs: "none", md: "flex" },
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={2}
          sx={{
            pr: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PersonIcon sx={{ height: "20px", color: "#444", ml: ".25rem" }} />
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            sx={{
              justifyContent: "center",
              display: "flex",
              textAlign: "left",
            }}
          >
            <Grid item xs={12}>
              <Typography
                sx={{
                  color: "#666",
                  fontFamily: "Roboto",
                  mb: "-.125rem",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "11px" },
                }}
              >
                Guests
              </Typography>
              <Typography
                sx={{
                  color: "#444",
                  fontFamily: "Roboto",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "14px" },
                }}
              >
                {value.adults + value.children} Guests, {value.dogs} Pets
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            ml: "auto",
            mr: ".5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ExpandMore sx={{ height: "20px", color: "#666" }} />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          marginBottom: "-2px",
          height: "30px",
          display: { md: "none", xs: "flex" },
          alignItems: "center",
        }}
      >
        <Grid
          item
          onClick={handleClick}
          sx={{ display: "flex", textAlign: "left", mr: "auto", ml: "0rem" }}
        >
          <Typography
            sx={{
              color: "#03989E",
              textShadow: "0px 0px 1px rgba(0, 0, 0, 0.15)",
              fontFamily: "Roboto",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "12px" },
            }}
          >
            {value.adults + value.children} Guests, {value.dogs} Pet
            {value.dogs === 1 ? "" : "s"}
          </Typography>
          <ExpandMore sx={{ height: "20px", color: "#03989E" }} />
        </Grid>
      </Grid>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ ".MuiPopover-paper": { width: "250px", mt: ".5rem" } }}
      >
        <Stack sx={{ px: 2, pt: 2 }} spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Adults</Typography>
            <NumberInput
              value={value.adults}
              onChange={(adults) => {
                if (adults > 5) return;
                onChange({ ...value, adults });
              }}
              minimum={1}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">Children</Typography>
            <NumberInput
              value={value.children}
              onChange={(children) => {
                if (children > 6) return;
                if (value.childrenAge && value.childrenAge.length > children) {
                  value.childrenAge = value.childrenAge.slice(0, children);
                } else if (
                  value.childrenAge &&
                  value.childrenAge.length <= children
                ) {
                  while (value.childrenAge.length !== children) {
                    value.childrenAge.push(0);
                  }
                }
                onChange({ ...value, children });
              }}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">Dogs</Typography>
            <NumberInput
              value={value.dogs}
              onChange={(dogs) => {
                if (dogs > 2) return;
                onChange({ ...value, dogs });
              }}
            />
          </Stack>
          <Box
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {Array.from({ length: value.children }, (_, i: number) => {
              return (
                <Box
                  sx={{
                    mx: "5px",
                    mt: "0px",
                    mb: "15px",
                    width: "calc(50% - 10px)",
                    display: "inline-block",
                  }}
                  key={i}
                >
                  <FormControl variant="standard" fullWidth>
                    <InputLabel sx={{ textAlign: "center" }}>
                      Child {i + 1} Age
                    </InputLabel>
                    <Select
                      key={i}
                      color="primary"
                      sx={{ textAlign: "center" }}
                      value={
                        value.childrenAge && value.childrenAge[i]
                          ? value.childrenAge[i].toString()
                          : "1"
                      }
                      onChange={(e: any) => {
                        if (value.childrenAge === undefined) {
                          value.childrenAge = [];
                        }
                        value.childrenAge[i] = parseInt(e.target.value);
                        onChange({ ...value });
                      }}
                    >
                      {Array.from({ length: 17 }, (_, k: number) => {
                        return (
                          <MenuItem value={k + 1} key={k + 1}>
                            {k + 1}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              );
            })}
          </Box>
        </Stack>
        <Button
          sx={{ pt: 1.5, pb: 1.5, width: "100%", mt: -1.25 }}
          onClick={handleClose}
        >
          Done
        </Button>
      </Popover>
    </>
  );
};

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  minimum?: number;
}

const NumberInput: FC<NumberInputProps> = ({
  value,
  onChange,
  minimum = 0,
}) => {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <IconButton onClick={() => onChange(Math.max(value - 1, minimum))}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography variant="body1" sx={{ width: 16, textAlign: "center" }}>
        {value}
      </Typography>
      <IconButton onClick={() => onChange(value + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Stack>
  );
};

export default DetailsPage;
