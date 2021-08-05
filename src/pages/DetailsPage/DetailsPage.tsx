import { FC, useState, MouseEventHandler } from "react";
import Container from "@material-ui/core/Container";
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

import BookingCard from "../../components/BookingCard";
import RomingoGuarantee from "../../components/RomingoGuarantee";
import RomingoScore from "../../components/UI/RomingoScore";
import AmenitiesCard from "../../components/AmenitiesCard";
import Map from "../../components/UI/Map/Map";
import ReadMore from "../../components/UI/ReadMore/ReadMore";
import ActivitiesNearby from "../../components/ActivitiesNearby";
import CancelPolicy from "../../components/CancelPolicy";

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
  defaultDescription?: string;
  cancellation?: boolean;
  cancelPenalty?: {
    refundable: boolean;
    deadline: { absoluteDeadline: Date };
    amountPercent: { amount: number; currencyCode: string };
  }[];
  dogAmenitiesTitle: string;
  amenitiesTitle: string;
  amenities?: {
    Code: number;
    Description: string;
    Value: string;
  }[];
  nearby: { text: string; distance: number }[];
}

const DetailsPage: FC<Props> = ({
  name,
  location,
  mainImg,
  gallery,
  score,
  defaultDescription = "",
  dogAmenitiesTitle,
  amenitiesTitle,
  amenities = [],
  nearby,
}) => {
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

  return (
    <>
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
          borderRadius: 1,
          mx: 0,
          cursor: "pointer",
        }}
      />
      <Container sx={{ mt: { xs: 0, md: 3 }, mb: 3 }}>
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
                borderRadius: 1,
                cursor: "pointer",
              }}
            />
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                {gallery.slice(0, 4).map((img) => {
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
                          borderRadius: 1,
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
              variant="h6"
              sx={{
                fontSize: { xs: "95%", sm: "125%" },
                color: "primary.main",
                fontWeight: "bold",
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
                fontWeight: "light",
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
            <BookingCard sx={{ position: "sticky", top: "1rem" }} />
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
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                Photos
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
            <DialogContent sx={{ px: 0 }}>
              <Container sx={{ mt: { xs: 0, md: 2 } }}>
                <SRLWrapper options={lightBoxOptions}>
                  <ImageList variant="masonry" cols={getImageCols()} gap={8}>
                    {gallery.map((item) => (
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
