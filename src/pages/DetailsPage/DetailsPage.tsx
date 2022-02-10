import React, {
  FC,
  useState,
  MouseEventHandler,
  useEffect,
  ReactComponentElement,
} from "react";
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
                <Typography
                  variant="h6"
                  sx={{
                    color: "warning.main",
                    mr: { sm: "0rem", xs: "auto" },
                    ml: { sm: "auto", xs: "0px" },
                  }}
                >
                  {score}{" "}
                  {new Array(Math.round(score)).fill(undefined).map((item) => (
                    <Star
                      key={item}
                      sx={{
                        color: "warning.main",
                        fontSize: "1rem",
                        mt: -0.2,
                        mr: ".25rem",
                      }}
                    />
                  ))}
                </Typography>
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
                <MobileBookingBar roomList={roomDropDown} />
              </Hidden>
            </Grid>
          </Grid>
        )}
        {!loading && data && (
          <Grid
            container
            sx={{ mt: 0, maxWidth: "100%" }}
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

export default DetailsPage;
