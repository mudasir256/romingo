import { FC } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import { SRLWrapper } from "simple-react-lightbox";

import BookingCard from "../../components/BookingCard/BookingCard";
import RomingoScore from "../../components/UI/RomingoScore/RomingoScore";
import AmenitiesCard from "../../components/AmenitiesCard/AmenitiesCard";
import Map from "../../components/UI/Map/Map";

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
  score,
  defaultDescription = "",
  cancellation = false,
  dogAmenitiesTitle,
  amenitiesTitle,
  amenities = [],
  ...props
}) => {
  return (
    <Container>
      <SRLWrapper
        options={{
          buttons: {
            showAutoplayButton: false,
            showDownloadButton: false,
            showThumbnailsButton: false,
            backgroundColor: "rgba(3, 152, 158, .7)",
          },
          settings: {
            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
            overlayColor: "rgba(255, 255, 255, 0.95)",
          },
          caption: {
            captionFontSize: "20px",
            captionColor: "#03989E",
            captionFontFamily: "Montserrat, sans-serif",
          },
          progressBar: {
            backgroundColor: "#03989E",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              src={mainImg}
              alt={name}
              draggable="false"
              boxShadow={2}
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
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "85%", sm: "100%" },
              lineHeight: 2,
              mt: 2,
              overflow: "hidden",
              whiteSpace: "normal",
              textOverflow: "ellipsis",
            }}
          >
            {defaultDescription}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box
                sx={{
                  mt: 2,
                }}
              >
                <AmenitiesCard
                  title={dogAmenitiesTitle}
                  amenities={amenities}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box
                sx={{
                  mt: 2,
                }}
              >
                <AmenitiesCard title={amenitiesTitle} amenities={amenities} />
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
    </Container>
  );
};

export default DetailsPage;
