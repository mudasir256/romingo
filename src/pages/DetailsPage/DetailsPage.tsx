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
import { Dispatch } from "redux";
import {
  SvgIcon,
  Link,
  Divider,
  Skeleton,
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
  ImageListItem,
  IconButton,
  Drawer,
} from "@mui/material";
import { Breakpoint, Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import {
  Casino,
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
      }, 2500)
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
                Available Rooms
              </Typography>
              <Grid container columnSpacing={4} rowSpacing={4}>
                {rooms.map((room: any, key: number) => {
                  return (
                    <Grid
                      item
                      md={6}
                      sm={12}
                      key={key}
                      sx={{ minWidth: "300px", display: "flex", flex: 1 }}
                    >
                      <RoomCard
                        key={key}
                        bestRate={key === 0 ? true : false}
                        HotelName={name}
                        room={room}
                        sx={{
                          minWidth: "260px",
                          borderRadius: "5px",
                          p: 1.75,
                          border: "1px solid #ddd",
                          transition: "all .15s ease-in-out",
                          boxShadow: 1,
                          "&:hover": { boxShadow: 7 },
                          height: "calc(100% - 32px)",
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



const CustomerTestimonials = ({ reviews }: { reviews: any }) => {
  const matches = useMediaQuery("(max-width:800px)");
  const lg = useMediaQuery("(max-width:1160px)");
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    if (currentCard === 0) {
      document
        .getElementById("scroll-container")!
        .scrollTo({ left: 0, top: 0, behavior: "smooth" });
    } else {
      document
        .getElementById("scroll-container")!
        .scrollTo({ left: 0, top: currentCard * 75, behavior: "smooth" });
    }
  }, [currentCard]);

  return (
    <Box
      sx={{
        background: { xs: "#fff", sm: "#fff", md: "#fff" },
        py: 6,
        pb: { xs: "0rem", sm: "2rem", md: "4rem", lg: "4rem" },
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          "& .carousel .control-dots": {
            display: "flex",
            justifyContent: "center",
          },
          background: { xs: "#fff", sm: "#fff", md: "#fff" },
          padding: "0rem 0rem 4rem 0rem ",
          borderRadius: "6px",
        }}
      >
        <Grid container>
          <Grid
            id="scroll-container"
            item
            xs={3}
            sx={{
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                borderRadius: "0.3em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
                borderRadius: "0.3em",
              },
              maxHeight: "400px",
              overflowY: "auto",
              borderRight: "1px solid #ccc",
              pr: "0rem",
              pt: "0",
              display: { xs: "none", sm: "none", md: "flex" },
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            {reviews.map((item: any, index: number) => {
              return (
                <Grid
                  container
                  key={item.name}
                  onClick={() => setCurrentCard(() => index)}
                  sx={{
                    transition: "all .25s ease-in-out",
                    border:
                      index === currentCard
                        ? "1px solid #ccc"
                        : "1px solid transparent",
                    color: "#fff",
                    cursor: "pointer",
                    background: index === currentCard ? "#efefef" : "#fff",
                    padding: "1rem .5rem",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      background: "#efefef",
                      border: "1px solid #ddd",
                    },
                    borderRight: "0px",
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    zIndex: index === currentCard ? 2 : 1,
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pl: ".25rem",
                    }}
                  >
                    <img
                      style={{
                        borderRadius: "6px",
                        maxHeight: "100%",
                        maxWidth: "100%",
                      }}
                      src={item.profile_photo_url}
                    />
                  </Grid>
                  <Grid item xs={10} sx={{ pl: "1rem" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#11111199",
                        fontSize: "1rem",
                        fontFamily: "Montserrat",
                        fontWeight: 700,
                        textAlign: "left",
                      }}
                    >
                      {item.author_name}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "left",
                        color: "#11111199",
                        mt: "-.25rem",
                        fontWeight: 500,
                        fontSize: "13px",
                      }}
                    >
                      {item.relative_time_description}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={9}
            sx={{
              "& .slider-wrapper": {
                maxWidth: {
                  xs: "100%",
                  sm: "100%",
                  md: "calc(100vw - 293px)",
                  lg: "calc(100vw - 500px)",
                  xl: "calc(100vw - 1000px)",
                },
                minHeight: { xs: "550px", sm: "450px", md: "375px" },
                overflow: "hidden",
              },
              "& .slide": { display: { xs: "flex", sm: "flex", md: "flex" } },
              pl: { xs: 0, sm: 0, md: "2rem" },
              mt: "auto",
              mb: "auto", pb: '1rem',
              display: { xs: "block", sm: "block", md: "flex" },
              alignItems: "center",
            }}
          >
            <Carousel
              showThumbs={false}
              interval={matches ? 3000 : 9000}
              showArrows={false}
              showIndicators={matches ? true : false}
              showStatus={false}
              infiniteLoop={true}
              onChange={(e) => setCurrentCard(e)}
              autoPlay
              selectedItem={currentCard}
              renderIndicator={(
                onClickHandler: (
                  e: React.MouseEvent | React.KeyboardEvent
                ) => void,
                isSelected: boolean,
                index: number,
                label: string
              ) => (
                <li
                  style={{
                    cursor: "pointer",
                    opacity: isSelected ? "1" : "0.27",
                    margin: "1rem .5rem 0rem .5rem",
                    background: "#333",
                    display: "flex",
                    width: "10px",
                    height: "10px",
                    borderRadius: "25px",
                  }}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  value={index}
                  key={index}
                  role="button"
                  tabIndex={0}
                >
                  {/* render the number instead of a box*/}
                </li>
              )}
            >
              {reviews.map((review: any) => (
                <Paper
                  key={review.author_name}
                  elevation={1}
                  sx={{
                    border: "1px solid #ddd",
                    padding: matches ? "1rem 1rem" : "1rem",
                    minHeight: { xs: "0px", sm: "0px", md: "400px" },
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "85%",
                    margin: { xs: "auto auto auto auto", sm: '0px auto auto 1rem' },
                    mt: 0,
                    mb: 5,
                    borderRadius: "12px",
                    fontFamily: "Montserrat",
                    fontSize: "1.5rem",

                  }}
                >
                  <Grid
                    container
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <Grid
                      item
                      xs={2}
                      sx={{
                        display: { xs: "block", sm: "block", md: "none" },
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <img
                        style={{
                          borderRadius: "6px",
                          maxHeight: "90%",
                          maxWidth: "90%",
                        }}
                        src={review.profile_photo_url}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      sx={{
                        display: { xs: "block", sm: "block", md: "none" },
                        borderBottom: "1px solid #ddd",
                        pl: ".5rem",
                        pb: ".5rem",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          mt: "auto",
                          color: "#11111199",
                          fontSize: "1rem",
                          fontFamily: "Montserrat",
                          fontWeight: 700,
                          textAlign: "left",
                        }}
                      >
                        {review.author_name}
                      </Typography>
                      <Typography sx={{ textAlign: "left" }}>
                        {review.relative_time_description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: {
                            xs: "1.25rem",
                            sm: "1.25rem",
                            md: "1.15rem",
                          },
                          pb: { xs: "0rem", sm: "0rem", md: "1.5rem" },
                          pt: { xs: "0rem", sm: "0rem", md: "1.5rem" },
                          borderTop: {
                            xs: "none",
                            sm: "none",
                            md: "1px solid #ddd",
                          },
                          borderBottom: {
                            xs: "none",
                            sm: "none",
                            md: "1px solid #ddd",
                          },
                          mt: { xs: "0", sm: "0", md: ".75rem" },
                          fontFamily: "Montserrat",
                          letterSpacing: "0px",
                          display: 'inline-block',
                          textAlign: { xs: "left", sm: "left", md: "center" },
                          fontWeight: 500,
                          color: "#11111199",
                          mb: { xs: ".25rem", sm: ".25rem", md: "1rem" },
                          minHeight: { xs: "100px", sm: "100px", md: "175px" },
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          maxHeight: '280px',
                          overflowY: 'auto',
                          "&::-webkit-scrollbar": {
                            width: "0.4em",
                          },
                          "&::-webkit-scrollbar-track": {
                            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                            borderRadius: "0.3em",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(0,0,0,.1)",
                            borderRadius: "0.3em",
                          },
                        }}
                      >
                        &quot;{review.text}&quot;
                      </Typography>
                    </Grid>

                    <Grid container sx={{ marginTop: 'auto' }}>
                      <Grid item xs={6}>
                         <Grid
                          sx={{
                            mt: { xs: 0, sm: 0, md: ".5rem" },
                            ml: "auto",
                            mr: "auto",
                            textAlign: "center",
                            justifyContent: "center",
                            display: { xs: "none", sm: "none", md: "flex" },
                          }}
                        >
                          <Grid
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              style={{
                                borderRadius: "6px",
                                maxHeight: "40px",
                                maxWidth: "40px",
                              }}
                              src={review.profile_photo_url}
                            />
                          </Grid>
                          <Grid sx={{ pl: "1rem" }}>
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#11111199",
                                fontSize: "1rem",
                                fontFamily: "Montserrat",
                                fontWeight: 700,
                                textAlign: "left",
                              }}
                            >
                              {review.author_name}
                            </Typography>
                            <Typography
                              sx={{
                                textAlign: "left",
                                color: "#11111199",
                                mt: "-.25rem",
                                fontWeight: 500,
                                fontSize: "13px",
                              }}
                            >
                              {review.relative_time_description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            textAlign: { xs: "left", sm: "left", md: "center" },
                            mt: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: "#f9c171",
                          }}
                        >
                          <Star sx={{ fontSize: '18px' }} />  <span style={{ fontSize: '80%' , marginLeft: '.5rem' }}>{review.rating} / 5</span>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            mt: "1rem",
                            textAlign: { xs: "left", sm: "left", md: "center" },
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          <img style={{ maxWidth: '125px' }} src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png" />
                        </Grid>
                      </Grid>
                    </Grid>



                  </Grid>
                </Paper>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DetailsPage;
