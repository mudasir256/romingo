import { FC, useState, MouseEventHandler } from "react";
import { connect, useStore, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import IconButton from "@material-ui/core/IconButton";
import { Breakpoint, Theme, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "@material-ui/core/Link";

import BookingCard from "../../components/BookingCard";
import MobileBookingBar from "../../components/MobileBookingBar";
import RomingoGuarantee from "../../components/RomingoGuarantee";
import RomingoScore from "../../components/RomingoScore";
import AmenitiesCard from "../../components/AmenitiesCard";
import Map from "../../components/UI/Map/Map";
import ReadMore from "../../components/UI/ReadMore/ReadMore";
import ActivitiesNearby from "../../components/ActivitiesNearby";
import CancelPolicy from "../../components/CancelPolicy";
import FilterBar from "../../components/FilterBar";
import RoomCard from "../../components/RoomCard";
import { RoomInfo } from "../../components/RoomCard/RoomCard";

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
  amenities?: {
    Code: number;
    Description: string;
    Value: string;
  }[];
  nearby: { text: string; distance: number }[];
  rooms: RoomInfo[];
}

const DetailsPage: FC<Props> = ({ ...props }) => {
  const {
    name,
    location,
    mainImg,
    gallery,
    score,
    defaultDescription,
    cancellation,
    cancelPenalty,
    dogAmenitiesTitle,
    roomList,
    amenitiesTitle,
    amenities,
    nearby,
    rooms,
  } = useSelector((state: any) => state.hotelDetailReducer.detail);
  // const DetailsPage: FC<Props> = ({
  //   name,
  //   location,
  //   mainImg,
  //   gallery,
  //   score,
  //   defaultDescription,
  //   cancellation,
  //   cancelPenalty,
  //   dogAmenitiesTitle,
  //   roomList,
  //   amenitiesTitle,
  //   amenities,
  //   nearby,
  //   rooms,
  // }) => {
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

  return (
    <>
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
          <FilterBar />
        </Box>
      </Hidden>
      <Box
        component="img"
        src={mainImg}
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
      <Container sx={{ mt: { xs: 0, md: 3 }, mb: { xs: 10, lg: 3 } }}>
        <Grid
          container
          spacing={2}
          sx={{
            position: "relative",
          }}
        >
          <Grid item xs={12} sm={6}>
            <Box
              onClick={handleOpen}
              component="img"
              src={mainImg}
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
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                {gallery.slice(0, 4).map((img: any) => {
                  return (
                    <Grid item sm={6} key={img}>
                      <Box
                        onClick={handleOpen}
                        boxShadow={2}
                        component="img"
                        src={img}
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
              {location.address}
            </Typography>
            <RomingoScore score={score} />
            <ReadMore text={defaultDescription} length={200} />
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box sx={{ display: "flex", flex: 1, height: "100%" }}>
                  <AmenitiesCard
                    title={dogAmenitiesTitle}
                    amenities={amenities}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box sx={{ display: "flex", flex: 1, height: "100%" }}>
                  <AmenitiesCard
                    title={amenitiesTitle}
                    amenities={amenities}
                    viewAll
                  />
                </Box>
              </Grid>
            </Grid>
            <RomingoGuarantee sx={{ mt: 2 }} />
            <Typography
              variant="h6"
              sx={{
                color: "secondary.main",
                mt: 2,
              }}
            >
              Room Types
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: "grid",
                gridAutoFlow: "column",
                overflow: "auto",
                py: 1,
              }}
            >
              {rooms.map((room: any, key: number) => {
                return (
                  <RoomCard
                    key={key}
                    HotelName={name}
                    sx={{
                      minWidth: "250px",
                      marginRight: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      boxShadow: 2,
                      px: 1,
                      py: 1,
                    }}
                    {...room}
                  />
                );
              })}
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
                />
              </Box>
            </Grid>
            <ActivitiesNearby
              nearby={nearby}
              title={"Dog-Friendly Activities Nearby"}
            />
            <CancelPolicy sx={{ mt: 2 }} />
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Hidden mdDown>
              <BookingCard
                sx={{
                  position: "sticky",
                  top: "1rem",
                }}
                roomList={roomList}
              />
            </Hidden>
            <Hidden mdUp>
              <Fab
                color="default"
                size="small"
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
                <ArrowBackIcon
                  onClick={() => history.goBack()}
                  sx={{ fontSize: 16 }}
                />
              </Fab>
              <MobileBookingBar roomList={roomList} />
            </Hidden>
          </Grid>
        </Grid>
        <SimpleReactLightbox>
          <Dialog
            open={showGallery}
            keepMounted
            fullScreen
            onClose={handleClose}
            scroll="body"
            aria-labelledby="photo-dialog-slide-title"
            aria-describedby="photo-dialog-slide-description"
            sx={{ maxWidth: "xl" }}
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
              }}
            >
              <Typography variant="h6" color="primary">
                Photos
              </Typography>
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
              <Container sx={{ mt: { xs: 0, md: 2 } }}>
                <SRLWrapper options={lightBoxOptions}>
                  <ImageList variant="masonry" cols={getImageCols()} gap={8}>
                    {gallery.map((item: any) => (
                      <ImageListItem key={item} cols={1} rows={1}>
                        <img
                          srcSet={`${item}?w=161&fit=crop&auto=format 1x,
${item}?w=161&fit=crop&auto=format&dpr=2 2x`}
                          alt={name}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </SRLWrapper>
              </Container>
            </DialogContent>
          </Dialog>
        </SimpleReactLightbox>
      </Container>
    </>
  );
};

export default DetailsPage;
