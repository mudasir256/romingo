import React, { FC, useState, MouseEventHandler, useEffect } from "react";
import { connect, useStore, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import { Breakpoint, Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import LocationCityIcon from "@mui/icons-material/LocationCity";

import BookingCard from "../../components/BookingCard";
import MobileBookingBar from "../../components/MobileBookingBar";
import RomingoGuarantee from "../../components/RomingoGuarantee";
import RomingoScore from "../../components/RomingoScore";
import AmenitiesCard from "../../components/AmenitiesCard";
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
  const hotelList = useSelector((state: any) => state.hotelListReducer.hotels);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    for (let i = 0; i < hotelList.length; i++) {
      if (hotelList[i].id === hotelId) {
        dispatch(
          setHotel({
            ...hotelList[i],
          })
        );
      }
    }
  }, [hotelList]);

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
  const [location, setLocation] = useState({
    address: "",
    lat: "",
    lon: "",
  });
  const [gallery, setGallery] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [defaultDescription, setDefaultDescription] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [otherAmenities, setOtherAmenities] = useState<string[]>([]);
  const [neighborhood, setNeighborhood] = useState("");
  const [nearby, setNearby] = useState([]);

  const [rooms, setRooms] = useState<RoomInfo[]>([]);

  const [roomDropDown, setRoomDropDown] = useState<
    {
      value: number;
      description: string;
      room: RoomInfo;
    }[]
  >([]);

  const [city, setCity] = useState({
    center: {
      latitude: "",
      longitude: "",
    },
    id: "",
    name: "",
  });

  const [markers, setMarkers] = useState<
    { lat: number; lng: number; type: string; label: string }[]
  >([]);

  useEffect(() => {
    if (data && data?.property) {
      setName(data.property.name);
      setLocation({
        address: data.property.addressLine1,
        lat: data.property.location.latitude,
        lon: data.property.location.longitude,
      });

      setCity({ ...data.property.city });
      setNeighborhood(data.property.neighborhood);

      let tmp: any[] = [];
      data.property.sabreImageURLs.map((image: string) => {
        tmp.push(image);
      });
      data.property.imageURLs.map((image: string) => {
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
    <>
      <ScrollToTop />
      <Hidden mdDown>
        <Box
          sx={{
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
              src={"/images/Romingo_Logo_Black.svg"}
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
            width: "100%",
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
        <Grid
          container
          spacing={2}
          sx={{
            position: "relative",
          }}
        >
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
                  borderRadius: 3,
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
                            borderRadius: 3,
                            cursor: "pointer",
                          }}
                        ></Box>
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
                "&:hover": {
                  backgroundColor: "#fff",
                },
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

            <FilterBar zoomed />
            <Box
              component="img"
              src="/images/balcony-dog.jpeg"
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
        )}
        {!loading && data && (
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12} md={7} lg={8}>
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "90%", sm: "125%" },
                  mt: 0,
                }}
              >
                {location.address}, {city?.name}
              </Typography>
              <Chip icon={<LocationCityIcon />} label={neighborhood} />
              <RomingoScore score={score} />
              <ReadMore text={defaultDescription} length={200} />
              <Grid container spacing={2} sx={{ mt: 0 }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box
                    sx={{ display: "flex", flex: 1, height: "100%", px: 0.5 }}
                  >
                    <AmenitiesCard
                      title={"Pet-Friendly Amenities"}
                      amenities={amenities}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box
                    sx={{ display: "flex", flex: 1, height: "100%", px: 0.5 }}
                  >
                    <AmenitiesCard
                      title={"Other Amenities"}
                      amenities={otherAmenities}
                      viewAll
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ width: "100%", overflow: "hidden" }}>
                <RomingoGuarantee sx={{ mt: 2 }} />
              </Box>
              <Grid container>
                <Box
                  sx={{
                    display: "flex",
                    my: 2,
                    width: "100%",
                  }}
                >
                  <Map
                    center={{
                      lat: parseFloat(location.lat),
                      lng: parseFloat(location.lon),
                    }}
                    height={300}
                    markers={markers}
                    zoom={14}
                    selectedMarker={0}
                  />
                </Box>
              </Grid>
              <ActivitiesNearby
                nearby={nearby}
                title={"Pet-Friendly Activities Nearby"}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Hidden mdDown>
                <BookingCard
                  sx={{
                    position: "sticky",
                    top: "1rem",
                  }}
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
          <Grid container sx={{ mt: 0, maxWidth: "100%" }} ref={RateCardRef}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{
                  color: "warning.main",
                  my: 5,
                  textAlign: "center",
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
                          boxShadow: 3,
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
              Photos
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
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
    </>
  );
};

export default DetailsPage;
