import React, {
  FC,
  useState,
  MouseEventHandler,
  useEffect,
  ReactComponentElement,
} from "react";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DateTime } from "luxon";
import { Dispatch } from "redux";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import { randomDate } from "../../tools.js";
import { saveSearch } from "../../store/searchReducer";
import {
  SvgIcon,
  Link,
  Divider,
  Skeleton,
  CSSObject,
  Chip,
  Container,
  Fab,
  Box,
  Paper,
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
  Autocomplete,
  ImageListItem,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Drawer,
} from "@mui/material";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Breakpoint, Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
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
  Launch,
  ArrowBackIos,
  Close,
} from "@mui/icons-material";
import { useMeasure } from "react-use";
import BookingCard from "../../components/BookingCard";
import MobileBookingBar from "../../components/MobileBookingBar";
import RomingoScore from "../../components/RomingoScore";
import Map from "../../components/UI/Map/Map";
import ReadMore from "../../components/UI/ReadMore/ReadMore";
import ActivitiesNearby from "../../components/ActivitiesNearby";
import RoomCard from "../../components/RoomCard";
import FilterBar from "../../components/FilterBar";
import { RoomInfo } from "../../components/RoomCard/RoomCard";

import { gql, useQuery } from "@apollo/client";
import { GetHotelDetail } from "../../constants/constants";

import { setHotel } from "../../store/hotelDetailReducer";
import { useWindowSize } from "react-use";

import ScrollToTop from "../../components/ScrollToTop";
import Loader from "../../components/UI/Loader";
import { DesktopFilterBar } from "../Cities/DesktopFilterBar";

const locationIds = [
  "ba12d364-9b1f-48c5-9ddc-7e68b40df076",
  "2714faad-9ea8-4851-9506-274710cdd51b",
  "d4c10666-addf-47a6-9870-767518d9ebad",
  "6f2cf61f-c769-47d9-9e46-90c5664b60b1",
  "82145909-13b4-4aab-be20-e0db474021c1",
  "58b23325-2016-44ef-886f-67e962dab17f",
];

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

interface Props {
  name: string;
  location: {
    lat: string;
    lon: string;
    address: string;
  };
  mainImg: string;
  gallery: string[];
  score: number;
  defaultDescription: string;
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
  rooms: RoomInfo[];
  match: any;
  googlePlaceId: string
}

const DetailsPage: FC<Props> = ({ ...props }) => {
  const hotelId = props.match.params.id;
  const search = useSelector((state: any) => state.searchReducer.search);

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

  const { loading, error, data } = useQuery(
    gql`
      ${GetHotelDetail}
    `,
    {
      variables: {
        id: hotelId,
        checkIn: search?.checkIn.substring(0, 10),
        checkOut: search?.checkOut.substring(0, 10),
        adults: search?.occupants?.adults,
        children: ageParam,
      },
      fetchPolicy: "no-cache",
    }
  );

  const [name, setName] = useState("");
  const [location, setLocation] = useState({ address: "", lat: "", lon: "" });
  const [gallery, setGallery] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [defaultDescription, setDefaultDescription] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [otherAmenities, setOtherAmenities] = useState<string[]>([]);
  const [neighborhood, setNeighborhood] = useState("");
  const [nearby, setNearby] = useState([]);

  const [rooms, setRooms] = useState<RoomInfo[]>([]);

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
  const isMobile = useMediaQuery('(max-width: 800px)');

  useEffect(() => {
    if (data && data?.property) {
      dispatch(setHotel(data.property));
      setName(data.property.name);
      setLocation({
        address: data.property.addressLine1,
        lat: data.property.location.latitude,
        lon: data.property.location.longitude,
      });

      setCity({ ...data.property.city });
      setNeighborhood(data.property.neighborhood);

      let tmp: any[] = [];
      data.property.imageURLs.map((image: string) => {
        tmp.push(image);
      });
      data.property.sabreImageURLs.map((image: string) => {
        tmp.push(image);
      });
      setGallery([...tmp]);
      setDefaultDescription(data.property.desc);
      setAmenities(data.property.dogAmenities);
      setScore(data.property.romingoScore);

      const tmpAmenities: string[] = [];
      data.property.amenities.map((amenity: any) => {
        tmpAmenities.push(amenity.desc);
      });

      setRooms(data.property.rooms.slice(0, 9));

      setOtherAmenities([...tmpAmenities]);

      setNearby(data.property.nearbyActivities);

      markers.push({
        lat: data.property.location.latitude,
        lng: data.property.location.longitude,
        type: "hotel",
        label: data.property.name,
      });

      data.property.nearbyActivities.map((activity: any) => {
        markers.push({
          lat: activity.location.latitude,
          lng: activity.location.longitude,
          type: activity?.activityType?.name,
          label: activity.name,
        });
      });

      tmp = [];

      data.property.rooms.slice(0, 9).map((room: any, key: number) => {
        let roomDescription = "";

        room.beds.map((bed: any) => {
          roomDescription += `${bed.count} ${bed.desc}${
            bed.count > 1 ? "s" : ""
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

      setMarkers([...markers]);
    }
  }, [data]);

  useEffect(() => {
    if (screen.height > 700) {
      window.Intercom("boot", {
        app_id: "qa6datd3",
        alignment: "right",
        custom_launcher_selector: '#CUSTOM'
      });
      window.Intercom("update");
    }
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
      captionFontFamily: "Montserrat, sans-serif",
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
    const top = RateCardRef?.current?.offsetTop || 0;
    window.scrollTo(0, top);
  };

  const { height } = useWindowSize()

  const [reviewData, setReviewData] = useState<any>()
  const [reviewDialog, setReviewDialog] = useState<boolean>(false)

  const getReviewData = () => {
    const request = {
      placeId: data.property.googlePlaceId,
      fields: ['reviews', 'rating', 'user_ratings_total']
    };
    if(window.google) {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails(request, (a ,b) => { setReviewData(a)} );
    }
  }

  useEffect(() => {
    if (data && data.property && data.property.googlePlaceId) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.addEventListener('load', function(event) {
        getReviewData()
      });
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAnlMeQQ072sRw22U6aG0zLTHbyh0g8TB0&libraries=places';
      setTimeout(() => {
        document.getElementsByTagName('head')[0].appendChild(script);
      }, 0)
    }
  }, [data])

  return (
    <Grid sx={{ background: "#feffff", scrollBehavior: "smooth" }}>
      {" "}
      {/* fcf5f0 */}
      <ScrollToTop />
      <Hidden mdDown>
        <Box
          sx={{
            background: "#fff",
            position: { xs: "fixed", md: "relative" },
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            margin: "0 auto",
            boxShadow: { xs: 0, md: 2 },
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            zIndex: 1000,
            py: { xs: 0, md: 1 },
            overflow: 'hidden'
          }}
        >
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              history.push("/");
            }}
          >
            <Box
              component="img"
              src={
                "https://storage.googleapis.com/romingo-development-public/images/front-end/Romingo_Logo_Black.svg"
              }
              alt="Logo"
              draggable="false"
              sx={{
                display: { xs: "none", md: "block" },
                ml: { xs: 0, md: 4 },
                mr: { xs: 0, md: 8 },
                height: { xs: "0px", md: "42px" },
              }}
            />
          </Link>
        </Box>
      </Hidden>
      {!loading && data && (
        <Box
          component="img"
          src={removeHttpLink(data?.property?.featuredImageURL)}
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
                  sx={{
                    color: "#222",
                    display: { sm: "block", md: "flex" },
                    justifyContent: "space-between",
                    fontFamily: "Montserrat",
                  }}
                >
                  {name}
                </Typography>
                {reviewData ? <Typography
                  variant="h6"
                  sx={{
                    color: "warning.main",
                    mr: { sm: "0rem", xs: "auto" },
                    ml: { sm: "auto", xs: "0px" },
                    marginBottom: { sm: "-1rem", xs: "0px" },
                    textAlign: { sm: 'right', xs: 'left' }
                  }}
                >
                  {reviewData && reviewData.rating}{" "}
                  <Star
                    sx={{
                      color: "warning.main",
                      fontSize: "1rem",
                      mt: -0.2,
                      mr: ".25rem",
                    }}
                  />
                  <Link onClick={() => setReviewDialog(true)} sx={{ cursor: 'pointer', color: '#777', textDecoration: 'underline', display:{ xs: 'inline', sm: 'inline', md: 'block' }, fontWeight: 500, opacity: .75, fontSize: '60%' }}>
                    ({reviewData && reviewData.user_ratings_total} reviews)
                  </Link>

                  {!isMobile && <Dialog PaperProps={{ sx: { borderRadius: '12px', overflow: 'hidden', maxHeight: { xs: '100vh', sm: '100vh', md: '85vh' }, maxWidth: '1000px', padding: '2rem 1.5rem' }}} open={reviewDialog} onClose={() => setReviewDialog(false)}>
                    <Grid container>
                      <Grid item xs={12} sm={4} md={4} sx={{ display: 'flex', flexDirection: 'column', pr: '1rem', pb: { xs: '1rem', sm: '1rem', md: '0rem' } }}>
                        <Close onClick={() => setReviewDialog(false)}  sx={{ '&:hover': { background: '#eee' }, padding: '.25rem', borderRadius: '30px',  cursor: 'pointer', mt: '0rem', mb: '1rem' }} />
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#222",
                            fontFamily: "Montserrat",
                            fontSize: '2rem',
                            textAlign: "left",
                            display: 'flex', alignItems: 'center',
                            mt: { xs: '.5rem', sm: '.5rem', md: '0rem' },
                            mb: { xs: '.5rem', sm: '.5rem', md:  '1rem' },
                          }}
                        >
                        <Star sx={{ fontSize: '2rem', mr: '1rem', color: "warning.main" }} />
                        {reviewData.rating}
                        &nbsp;&bull;&nbsp; <span style={{ fontSize: '80%', fontWeight: 500, color: '#666'}}> {reviewData.user_ratings_total} reviews </span>
                      </Typography>

                        <Typography
                          variant="h6"
                          sx={{
                            color: "#666",
                            fontSize: '16px',
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            textAlign: "left", mr: '1rem',
                            mb: { xs: '1rem', sm: '1rem', md: '0rem' }
                          }}
                        >
                          {data.property.name}
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


                      <img style={{ marginTop: 'auto', maxWidth: '125px' }} src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png" />

                      </Grid>
                      <Grid item xs={12} sm={12} md={8}
                        sx={{
                          paddingLeft: { xs: '0', sm: '0', md: '3rem' },
                          paddingTop:  { xs: '2rem', sm: '2rem', md: '1rem' },
                          maxHeight: { xs: `calc(${height}px - 100px)`, sm: `${height}px`, md: '70vh' },
                          overflowY: 'auto', display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'column'},
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
                        }}>

                        {reviewData.reviews.map((review: any) => <Grid container key={review.author_name} sx={{ paddingBottom: '4rem' }}>
                          <Grid item xs={1}>
                            <img style={{ maxHeight: '50px' }} src={review.profile_photo_url} />
                          </Grid>
                          <Grid item xs={11} sx={{ paddingLeft: { xs: '2.25rem', sm: '2.25rem', md: '1.5rem' }, color: '#222', display: 'flex', justifyContent: 'center', fontWeight: 500, flexDirection: 'column', fontFamily: 'Montserrat' }}>
                            <span style={{ display: 'block'}}> {review.author_name} </span>
                            <span style={{ display: 'block', marginTop: '.25rem' }}> {review.relative_time_description} </span>
                          </Grid>
                          <Grid item xs={12} sx={{ paddingTop: '1rem', color: '#222', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontWeight: 500, flexDirection: 'row', fontFamily: 'Montserrat' }}>
                            <Star sx={{ fontSize: '2rem', mr: '1rem', color: "warning.main" }} />
                            <span style={{ display: 'block', marginTop: '.25rem' }}> {review.rating} /5 </span>
                          </Grid>
                          <Grid item xs={12} sx={{ letterSpacing: '0.011rem', mt: '.5rem', fontFamily: "roboto", padding: '.5rem 0rem', lineHeight: 1.75, color: '#444' }}>
                            {review.text}
                          </Grid>
                        </Grid>)}

                        <Grid
                          sx={{ mt: { md: '2rem', xs: '.5rem', sm: '.5rem' }, mb: { xs: '2rem', sm: '2rem',  md: '0' }, display: 'flex', alignItems: 'center', pt: { md: '1.5rem', xs: '1rem', sm: '1rem' }, pb: { xs: '1.5rem', sm: '1.5rem',  md: '0' }, position: 'sticky', bottom: { xs: '', sm: '', md: '0px'}, background: '#fff', borderBottom: { md: '0', xs: '2px solid #ddd', sm:  '2px solid #ddd' },  borderTop: { xs: '0', sm: '0', md:  '2px solid #ddd' } }}>

                          <Typography
                            variant="h6"
                            sx={{
                              color: "#666",
                              fontSize: '18px',
                              fontWeight: 600,
                              fontFamily: "Montserrat",
                              textAlign: "left", ml: '1rem'
                            }}
                            >
                              5 of {reviewData.user_ratings_total}
                          </Typography>

                          <Button
                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.property.name)}&destination_place_id=${data.property.googlePlaceId}`)}
                            variant='outlined' sx={{ display: 'flex', alignItems: 'center', ml: 'auto', mr: '1rem', fontWeight: 600 }}>
                            See all reviews
                            <Launch sx={{ ml: '1rem', fontSize: '16px' }} />
                          </Button>

                          </Grid>

                      </Grid>
                    </Grid>

                  </Dialog>}

                  {isMobile && <Drawer PaperProps={{ sx: { height: '100%', borderRadius: '0px', overflow: 'hidden', padding: '2rem 1.5rem' }}} anchor='bottom' open={reviewDialog} onClose={() => setReviewDialog(false)}>
                    <Grid container>
                      <Grid item xs={12} sm={4} md={4} sx={{ display: 'flex', flexDirection: 'column', pr: '1rem', pb: { xs: '1rem', sm: '1rem', md: '0rem' } }}>
                        <ArrowBackIos onClick={() => setReviewDialog(false)}  sx={{ mt: '4rem' }} />
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#222",
                            fontFamily: "Montserrat",
                            fontSize: '2rem',
                            textAlign: "left",
                            display: 'flex', alignItems: 'center',
                            mt: { xs: '.5rem', sm: '.5rem', md: '0rem' },
                            mb: { xs: '.5rem', sm: '.5rem', md:  '2rem' },
                          }}
                        >
                        <Star sx={{ fontSize: '2rem', mr: '1rem', color: "warning.main" }} />
                        {reviewData.rating}
                        &nbsp;&bull;&nbsp; <span style={{ fontSize: '80%', fontWeight: 500, color: '#666'}}> {reviewData.user_ratings_total} reviews </span>
                      </Typography>

                          <Typography
                            variant="h6"
                            sx={{
                              color: "#666",
                              fontSize: '16px',
                              fontWeight: 600,
                              fontFamily: "Montserrat",
                              textAlign: "left", mr: '1rem',
                              mb: { xs: '1rem', sm: '1rem', md: '0rem' }
                            }}
                          >
                            {data.property.name}
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


                      <img style={{ marginTop: 'auto', maxWidth: '125px' }} src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png" />

                      </Grid>
                      <Grid item xs={12} sm={12} md={8}
                        sx={{
                          paddingLeft: { xs: '0', sm: '0', md: '3rem' },
                          paddingTop:  { xs: '0rem', sm: '0rem', md: '1rem' },
                          maxHeight: { xs: `calc(${height}px - 100px)`, sm: `${height}px`, md: '70vh' },
                          overflowY: 'auto',
                          paddingBottom: '2rem'
                        }}>


                      <Grid sx={{ mt: { md: '2rem', xs: '.5rem', sm: '.5rem' }, mb: { xs: '2rem', sm: '2rem',  md: '0' }, display: 'flex', alignItems: 'center', pt: { md: '1.5rem', xs: '0rem', sm: '0rem' }, pb: { xs: '1.5rem', sm: '1.5rem',  md: '0' }, background: '#fff', borderBottom: { md: '0', xs: '2px solid #ddd', sm:  '2px solid #ddd' },  borderTop: { xs: '0', sm: '0', md:  '2px solid #ddd' } }}>

                          <Typography
                            variant="h6"
                            sx={{
                              color: "#666",
                              fontSize: '18px',
                              fontWeight: 600,
                              fontFamily: "Montserrat",
                              textAlign: "left", ml: '1rem'
                            }}
                            >
                              5 of {reviewData.user_ratings_total}
                          </Typography>

                          <Button
                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.property.name)}&destination_place_id=${data.property.googlePlaceId}`)}

                            variant='outlined' sx={{ display: 'flex', alignItems: 'center', ml: 'auto', mr: '1rem', fontWeight: 600 }}>
                              See all reviews
                              <Launch sx={{ ml: '1rem', fontSize: '16px' }} />
                            </Button>


                          </Grid>


                        {reviewData.reviews.map((review: any) => <Grid container key={review.author_name} sx={{ paddingBottom: '6rem' }}>
                          <Grid item xs={1}>
                            <img style={{ maxHeight: '50px' }} src={review.profile_photo_url} />
                          </Grid>
                          <Grid item xs={11} sx={{ paddingLeft: { xs: '2.25rem', sm: '2.25rem', md: '1.5rem' }, color: '#222', display: 'flex', justifyContent: 'center', fontWeight: 500, flexDirection: 'column', fontFamily: 'Montserrat' }}>
                            <span style={{ display: 'block'}}> {review.author_name} </span>
                            <span style={{ display: 'block', marginTop: '.25rem' }}> {review.relative_time_description} </span>
                          </Grid>
                          <Grid item xs={12} sx={{ paddingTop: '1rem', color: '#222', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontWeight: 500, flexDirection: 'row', fontFamily: 'Montserrat' }}>
                            <Star sx={{ fontSize: '2rem', mr: '1rem', color: "warning.main" }} />
                            <span style={{ display: 'block', marginTop: '.25rem' }}> {review.rating} /5 </span>
                          </Grid>
                          <Grid item xs={12} sx={{ letterSpacing: '0.011rem', mt: '.5rem', fontFamily: "roboto", padding: '.5rem 0rem', lineHeight: 1.75, color: '#444' }}>
                            {review.text}
                          </Grid>
                        </Grid>)}

                      </Grid>
                    </Grid>

                  </Drawer>}

                </Typography> :
                 <Typography
                  variant="h6"
                  sx={{
                    color: "warning.main",
                    mr: { sm: "0rem", xs: "auto" },
                    ml: { sm: "auto", xs: "0px" },
                  }}
                >
                  {score}{" "}
                  <Star
                    sx={{
                      color: "warning.main",
                      fontSize: "1rem",
                      mt: -0.2,
                      mr: ".25rem",
                    }}
                  />
                </Typography>}
              </Grid>

              <Typography
                variant="body1"
                sx={{
                  letterSpacing: ".015rem",
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  color: "#999",
                  mt: ".25rem",
                }}
              >
                {location.address}, {city?.name}
              </Typography>
              <Chip
                sx={{ my: "1rem" }}
                icon={<LocationCityIcon />}
                label={neighborhood}
              />

              <ReadMore small text={defaultDescription} length={200} />
              <Link href="#rooms">
                <Button
                  fullWidth
                  disableElevation
                  variant="contained"
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    mt: "1rem",
                    display: { xs: "flex", md: "none" },
                  }}
                >
                  {" "}
                  Select a room{" "}
                </Button>
              </Link>
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
                    fontFamily: "Montserrat",
                    display: "block",
                  }}
                >
                  Where You&lsquo;ll Be
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    letterSpacing: ".015rem",
                    mt: ".5rem",
                    fontSize: "1rem",
                    color: "#999",
                    fontWeight: 400,
                    fontFamily: "Roboto",
                  }}
                >
                  {location.address}, {city?.name}, CA, United States
                </Typography>
                <Box sx={{ display: "flex", my: 2, width: "100%" }}>
                  <Map
                    center={{
                      lat: parseFloat(location.lat),
                      lng: parseFloat(location.lon),
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
                <Grid item xs={12} sm={6} md={6} lg={6} sx={{ pt: "1.5rem" }}>
                  <ActivitiesNearby
                    nearby={nearby}
                    title={"Nearby Activities"}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6} sx={{ pt: "1.5rem" }}>
                  <Box sx={{ display: "flex", flex: 1, height: "100%" }}>
                    <PetAmmenities
                      title={"Pet Amenities"}
                      amenities={amenities}
                    />
                  </Box>
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
                    top: 15,
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
          <Grid
            container
            sx={{ mt: 0, maxWidth: "100%", paddingBottom: {xs: '2rem', sm: '4rem' }, borderBottom: '1px solid #ddd' }}
            id="rooms"
            ref={RateCardRef}
          >
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  color: "#222",
                  fontFamily: "Montserrat",
                  mt: { xs: 1, sm: 5 },
                  mb: "1rem",
                  textAlign: "left",
                }}
              >
                Choose your room
              </Typography>
              <RoomsFilterBar />
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
                        sx={{
                          minWidth: "260px",
                          borderRadius: "8px",
                          p: ' 0rem 1rem 1rem 1rem',
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
            </Grid>
          </Grid>
        )}

        {/* {reviewData && <>
          <Typography
            id="reviews"
            variant="h6"
            sx={{
              color: "#222",
              fontFamily: "Montserrat",
              mt: { xs: 1, sm: 5 },
              mb: "1rem",
              textAlign: "left",
            }}
          >
            Reviews for {data.property.name}
          </Typography>
         <CustomerTestimonials reviews={reviewData.reviews} />
         </>} */}

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
                  fontFamily: "Montserrat",
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
                <ImageList variant="masonry" cols={getImageCols()} gap={8}>
                  <SRLWrapper options={lightBoxOptions}>
                    {gallery.map((item: any) => (
                      <ImageListItem key={item} cols={1} rows={1}>
                        <img
                          srcSet={`${item.replace(
                            /^http(s?):/i,
                            ""
                          )}?w=161&fit=crop&auto=format 1x,
${item.replace(/^http(s?):/i, "")}?w=161&fit=crop&auto=format&dpr=2 2x`}
                          alt={name}
                        />
                      </ImageListItem>
                    ))}
                  </SRLWrapper>
                </ImageList>
              </Container>
            </DialogContent>
          </Dialog>
        </SimpleReactLightbox>
      </Container>
    </Grid>
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
        sx={{ color: "#222222", fontWeight: 600, fontFamily: "Montserrat" }}
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
                      fontFamily: "Roboto",
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

const AmenitiesCard: FC<AmenitiesProps> = ({
  title,
  amenities,
  rowNumber = 5,
  viewAll,
}) => {
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
          fontFamily: "Montserrat",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {title}

        {viewAll && amenities.length > 13 && (
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
                    fontFamily: "Montserrat",
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
                    fontFamily: "Montserrat",
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
                          fontFamily: "Roboto",
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
                    fontFamily: "Montserrat",
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
                        fontFamily: "Roboto",
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
                      fontFamily: "Roboto",
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
          {includedPopular.length < 6
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
                          fontFamily: "Roboto",
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
                          fontFamily: "Roboto",
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
}

const RoomsFilterBar: FC<FilterBarProps> = ({ sx, zoomed = false, city = "" }) => {
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [isTextField, setIsTextField] = useState(false);
  const [zoomIn, setZoomIn] = useState(zoomed);
  const search = useSelector((state: any) => state.searchReducer.search);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const [selectedCity, setSelectedCity] = useState(
    search.city ? search.city : null
  );
  const [formError, setFormError] = useState("");
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
  const history = useHistory();
  const biggerThanTenForty = useMediaQuery("(min-width:1040px)");
  const below900 = useMediaQuery("(max-width:900px)");

  const dispatch: Dispatch<any> = useDispatch();

  const getCityName = (cityId: string) => {
    if (cityId) {
      return cities.filter((city: any) => city.id === cityId)[0].name;
    }
  };
  const getCity = (cityId: string) =>
    cities.filter((city: any) => city.id === cityId)[0];
  const onOccupantChange = (value: Occupant) => setOccupants(value);

  const dateToString = (isoString: string | Date | number) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
  };

  const handleFilterInClick: MouseEventHandler<Element> = () => {
    setFormError("");
    setZoomIn(true);
  };

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
    if (city && city.length > 0 && cities.length > 0) {
      setSelectedCity(city);
    }
  }, [cities]);

  const handleFilterOutClick: MouseEventHandler<Element> = () => {
    // TagManager.dataLayer({ dataLayer: { event: "clicked_search" } });

    if (
      occupants.adults !== 0 &&
      selectedCity &&
      checkDate[0] &&
      checkDate[1]
    ) {
      setFormError("");
      dispatch(
        saveSearch({
          city: selectedCity,
          checkIn: new Date(checkDate[0]).toISOString(),
          checkOut: new Date(checkDate[1]).toISOString(),
          occupants,
        })
      );

    } else {
      alert("error");
      if (!selectedCity) {
        setFormError("Location required");
      }
      if (!checkDate[0]) {
        setFormError("Check-in date required");
      }
      if (
        checkDate[0] &&
        new Date(checkDate[0]) <= new Date(new Date().setHours(23, 59, 59, 0))
      ) {
        setFormError("Check-in date must be today at the earliest");
      }
      if (!checkDate[1]) {
        setFormError("Check-out date required");
      }
      if (
        checkDate[1] &&
        new Date(checkDate[1]) <= new Date(new Date().setHours(23, 59, 59, 0))
      ) {
        setFormError("Check-out date must be after today");
      }
      if (occupants.adults === 0) {
        setFormError("Search must include at least 1 adult guest");
      }
    }
  };

  return (
    <>
      {below900 ? (
        <Box
          sx={{
            zIndex: 2,
            margin: "0px auto 12px auto",
            paddingBottom: '12px',
            borderBottom: '1px solid #ddd',
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
                    setFormError("");
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
                  mt: '1.125rem'
                }}
              >
                <Grid item xs={6} sx={{ pr: '.25rem'}}>
                <Grid container sx={{ border: "2px solid #343B5380", borderRadius: '6px', padding: '.25rem .25rem .25rem 1rem' }}>
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
                <Grid item xs={6} sx={{ pl: ' .25rem' }}>
                  <Grid container sx={{ border: "2px solid #343B5380", borderRadius: '6px', padding: '.25rem .25rem .25rem 1rem' }}>
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
                  ml: '.5rem',
                  fontFamily: "Montserrat",
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
        <Box sx={{ margin: "0px auto 24px auto", userSelect: 'none' }}>
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
                  PaperProps={{ sx: { fontWeight: 700, '& .MuiTypography-root': { fontWeight: 500 } }}}
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
                    setFormError("");
                    setCheckDate(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
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
  fullWidth = true,
  size = "medium",
  variant = "outlined",
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [ref, { width }] = useMeasure<HTMLDivElement>();
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
          minWidth: { xs: "174px", sm: '174px', md: "275px" },
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
          marginBottom: '-2px',
          height: "30px",
          display: { md: "none", xs: "flex" },
          alignItems: "center",
        }}
      >
        <Grid
          item
          onClick={handleClick}
          sx={{ display: "flex", textAlign: "left", mr: "auto", ml: '0rem' }}
        >
          <Typography
            sx={{
              color: "#03989E",
              textShadow: "0px 0px 1px rgba(0, 0, 0, 0.15)",
              fontFamily: "Roboto",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "12px",  },
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
          {error.length > 0 && (
            <Typography
              variant="body2"
              color="error"
              sx={{ textAlign: "center", fontSize: "80%" }}
            >
              {error}
            </Typography>
          )}
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
                          : "0"
                      }
                      onChange={(e: any) => {
                        if (value.childrenAge === undefined) {
                          value.childrenAge = [];
                        }
                        value.childrenAge[i] = parseInt(e.target.value);
                        onChange({ ...value });
                      }}
                    >
                      {Array.from({ length: 18 }, (_, k: number) => {
                        return (
                          <MenuItem value={k} key={k}>
                            {k}
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
