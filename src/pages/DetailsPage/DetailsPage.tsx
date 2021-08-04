import { FC, useState } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import { useTheme } from "@material-ui/core/styles";
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from "simple-react-lightbox";

import BookingCard from "../../components/BookingCard/BookingCard";
import RomingoScore from "../../components/UI/RomingoScore/RomingoScore";
import AmenitiesCard from "../../components/AmenitiesCard/AmenitiesCard";
import Map from "../../components/UI/Map/Map";
import ReadMore from "../../components/UI/ReadMore/ReadMore";

interface Props {
  name: string;
  location: {
    lat: string;
    lon: string;
    address: string;
  };
  mainImg: string;
  gallery: string[];
  moreGallery: string[],
  score: number;
  defaultDescription?: string;
  cancellation?: boolean;
  cancelPenalty?: {
    refundable: boolean;
    deadline: { absoluteDeadline: date };
    amountPercent: { amount: number; currencyCode: string };
  }[];
  dogAmenitiesTitle: string;
  amenitiesTitle: string;
  amenities?: {
    Code: number;
    Description: string;
    Value: string;
  }[];
  nearby?: { text: string; distance: number }[];
}

const DetailsPage: FC<Props> = ({
  name,
  location,
  mainImg,
  gallery,
  moreGallery,
  score,
  defaultDescription = "",
  cancellation = false,
  dogAmenitiesTitle,
  amenitiesTitle,
  amenities = [],
  ...props
}) => {

  const [showGallery, setShowGallery] = useState(false);
  const theme = useTheme();

  const lightBoxOptions = {
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false,
      showThumbnailsButton: false,
      backgroundColor: "rgba(3, 152, 158, .7)",
    },
    settings: {
      boxShadow:
        "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
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
  }

  const handleClose = () => {
    setShowGallery(false);
  }

  return (
    <>
      <Box
        component="img"
        src={mainImg}
        alt={name}
        boxShadow={2}
        display={{ xs: "block", sm: "none" }}
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: 1,
          mx: 0,
          cursor: "pointer",
        }}
      />
      <Container sx={{ mt: { xs: 0, md: 4 } }}>
        <SRLWrapper
          options={lightBoxOptions}
        >
          <Grid container spacing={2} sx={{
            position: "relative"
          }}>
            <Grid item xs={12} sm={6}>
              <Box
                component="img"
                src={mainImg}
                alt={name}
                draggable="false"
                boxShadow={2}
                display={{ xs: "none", sm: "block" }}
                sx={{
                  width: "100%",
                  height: { xs: "150px", sm: "375px" },
                  objectFit: "cover",
                  borderRadius: 1,
                  cursor: "pointer",
                }}
              />
            </Grid>
            <Hidden smDown>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  {gallery.map((img) => {
                    return (
                      <Grid item sm={6} key={img}>
                        <Box
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
            <Box sx={{
              position: "absolute",
              right: "24px",
              bottom: "24px",
              textAlign: "right"
            }}>
              <Button 
                variant="outlined"
                sx={{
                  backgroundColor: "white"
                }}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowGallery(true);
                }}>
                More Photos
              </Button>
            </Box>
          </Grid>
        </SRLWrapper>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid item xs={12} md={7} lg={8} sx={{ minHeight: "2000px" }}>
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
                <Box>
                  <AmenitiesCard
                    title={dogAmenitiesTitle}
                    amenities={amenities}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box>
                  <AmenitiesCard title={amenitiesTitle} amenities={amenities} />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12}>
                <Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      color: "text.primary",
                      borderRadius: 1,
                      boxShadow: 4,
                      py: 1,
                      px: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "primary.main",
                        fontWeight: "bold",
                        textAlign: "center"
                      }}
                    >
                      The Romingo Guarantee
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "light",
                        mt: 0.3,
                        overflow: "hidden",
                        color: "text.primary",
                        textAlign: "center"
                      }}
                    >
                      Rooms booked through Romingo always include:
                    </Typography>
                    <Box 
                      sx={{
                        mt: 0.5,
                        px: 0.5
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <Check
                          sx={{
                            fontSize: 20,
                            color: "primary.main",
                            mt: 0.3,
                            mr: 0.5
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "light",
                            mt: 0,
                            overflow: "hidden",
                            color: "text.light"
                          }}
                        >
                          {"No pet fees, ever"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <Check
                          sx={{
                            fontSize: 20,
                            color: "primary.main",
                            mt: 0.3,
                            mr: 0.5
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "light",
                            mt: 0,
                            overflow: "hidden",
                            color: "text.light"
                          }}
                        >
                          {"Up to 2 dogs <75 lbs each"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <Check
                          sx={{
                            fontSize: 20,
                            color: "primary.main",
                            mt: 0.3,
                            mr: 0.5
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "light",
                            mt: 0,
                            overflow: "hidden",
                            color: "text.light"
                          }}
                        >
                          {"Bedding & bowls in your room"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Box
                sx={{
                  display: "flex",
                  mt: 2,
                  width: "100%",
                }}
              >
                <Map
                  center={{
                    lat: parseFloat(location.lat),
                    lng: parseFloat(location.lon),
                  }}
                />
              </Box>
            </Grid>
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
              <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
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
            <DialogContent>
              <Container sx={{ mt: { xs: 0, md: 4 } }}>
                <SRLWrapper options={lightBoxOptions}
                >
                  <Grid container spacing={2} sx={{
                    position: "relative"
                  }}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        {moreGallery.map((img) => {
                          return (
                            <Grid item sm={6} key={img}>
                              <Box
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
                  </Grid>
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
