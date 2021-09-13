import Box from "@mui/material/Box";
import { FC, useEffect } from "react";
import { connect, useStore, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";
import { CSSObject, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { gql, useQuery } from "@apollo/client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { initialState } from "../../store/searchReducer";
import { GetCities } from "../../constants/constants";
import { setList } from "../../store/cityListReducer";

interface Props {
  sx?: CSSObject;
  nearCities: {
    img: string;
    city: string;
    state: string;
  }[];
  featureHotels: {
    img: string;
    name: string;
    description: string;
  }[];
  footerMenus: {
    about: {
      text: string;
      link: string;
    }[];
    contact: {
      text: string;
      link: string;
    }[];
    blog: {
      text: string;
      link: string;
    }[];
    sitemap: {
      text: string;
      link: string;
    }[];
  };
}

const NearCities = [
  {
    img: "/images/sanfrancisco.jpg",
    city: "San Francisco",
    state: "California",
  },
  {
    img: "/images/losangeles.jpg",
    city: "Los Angeles",
    state: "California",
  },
  {
    img: "/images/orangecounty.jpg",
    city: "Orange County",
    state: "California",
  },
  {
    img: "/images/palmsprings.jpg",
    city: "Palm Springs",
    state: "California",
  },
  {
    img: "/images/santabarbara.jpg",
    city: "Santa Barbara",
    state: "California",
  },
];

const FeatureHotels = [
  {
    img:
      "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    name: "Hotel 1",
    description:
      "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata",
  },
  {
    img:
      "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    name: "Hotel 2",
    description:
      "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata",
  },
  {
    img:
      "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    name: "Hotel 3",
    description:
      "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata",
  },
];

const HomePage: FC<Props> = ({
  sx,
  nearCities = NearCities,
  featureHotels = FeatureHotels,
}) => {
  const { loading, error, data } = useQuery(
    gql`
      ${GetCities}
    `
  );

  if (data) {
    const dispatch: Dispatch<any> = useDispatch();

    dispatch(setList([...data.cities]));
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          position: "relative",
          "&::before": {
            content: '""',
            backgroundImage: `url("/images/4049458.jpg")`,
            opacity: 0.1,
            backgroundSize: "cover",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Grid container sx={{ py: 6 }}>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                sx={{
                  color: "primary.main",
                  textAlign: "center",
                }}
              >
                Seriously, No Pet Fees?
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "text.secondary",
                  textAlign: "center",
                  mb: { xs: 2, md: 5 },
                }}
              >
                {"Here's how..."}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                px: {
                  md: 8,
                  sm: 0,
                },
              }}
            >
              <Grid container spacing={{ sm: 3, md: 5 }}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        margin: "auto 0",
                        padding: "10px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          color: "text.secondary",
                          textAlign: "center",
                        }}
                      >
                        We partner with dog friendly hotels
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                        }}
                      >
                        Lorem ipsum dolor sit amet et delectus accommodare his
                        consul copiosae legendos at vix ad putent delectus
                        delicata usu. Vidit dissentiet eos cu eum an brute
                        copiosae hendrerit. Eos erant dolorum an. Per facer
                        affert ut.
                        <br />
                        Dicat falli consulatu at vis. Te facilisis mnesarchum
                        qui posse omnium mediocritatem est cu. Modus argumentum
                        ne qui tation efficiendi in eos. Ei orem ipsum dolor sit
                        amet et delectus accommodare his consul copiosae
                        legendos at
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/frenchy_tape.png"
                      alt="french bulldog w/ coffee"
                      draggable="false"
                      sx={{
                        width: "100%",
                        maxHeight: "320px",
                        objectFit: "cover",
                        borderRadius: 0,
                        margin: "auto 0",
                        position: "relative",
                        textAlign: "center",
                        display: "inline-block",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={{ sm: 3, md: 5 }}
                sx={{ pt: { xs: 2, md: 6 } }}
              >
                <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/window_dog_tape.png"
                      alt="dog head out window"
                      draggable="false"
                      sx={{
                        width: "100%",
                        maxHeight: "320px",
                        objectFit: "cover",
                        borderRadius: 0,
                        margin: "auto 0",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        margin: {
                          sm: "auto 0",
                        },
                        padding: "10px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          color: "text.secondary",
                          textAlign: "center",
                        }}
                      >
                        And pass the savings onto you
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                        }}
                      >
                        Lorem ipsum dolor sit amet et delectus accommodare his
                        consul copiosae legendos at vix ad putent delectus
                        delicata usu. Vidit dissentiet eos cu eum an brute
                        copiosae hendrerit. Eos erant dolorum an. Per facer
                        affert ut.
                        <br />
                        Dicat falli consulatu at vis. Te facilisis mnesarchum
                        qui posse omnium mediocritatem est cu. Modus argumentum
                        ne qui tation efficiendi in eos. Ei orem ipsum dolor sit
                        amet et delectus accommodare his consul copiosae
                        legendos at
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container>
        <Box
          sx={{
            backgroundColor: "warning.main",
            py: 6,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            position: "relative",
            marginLeft: "-50vw",
            left: "50%",
          }}
        >
          <Grid container maxWidth="lg" sx={{ mx: "auto" }}>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                sx={{
                  color: "primary.main",
                  textAlign: "center",
                }}
              >
                Explore a Romingo City
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "text.secondary",
                  textAlign: "center",
                  mb: 5,
                }}
              >
                Near (or far) from you
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={3}
                sx={{
                  display: { xs: "grid", lg: "grid" },
                  gridAutoFlow: {
                    xs: "column",
                    lg: "column",
                  },
                  overflow: "auto hidden",
                  pb: 4,
                  px: 4,
                  scrollSnapType: "x",
                }}
              >
                {nearCities.map((nearCity, key) => {
                  return (
                    <Grid item xs={12} sm={6} lg={4} key={key}>
                      <Box
                        sx={{
                          minWidth: "250px",
                        }}
                      >
                        <Link
                          href="#"
                          sx={{
                            textDecoration: "none",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: 3,
                              boxShadow: 2,
                              backgroundColor: "white",
                            }}
                          >
                            <Box
                              component="img"
                              src={nearCity.img}
                              alt="background"
                              draggable="false"
                              sx={{
                                objectFit: "cover",
                                width: "100%",
                                height: "240px",
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                              }}
                            />
                            <Typography
                              variant="h6"
                              sx={{
                                mt: 2,
                                textAlign: "center",
                              }}
                            >
                              {nearCity.city}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                textAlign: "center",
                                pb: 2,
                                mb: 2,
                              }}
                            >
                              {nearCity.state}
                            </Typography>
                          </Box>
                        </Link>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            py: 6,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            position: "relative",
            marginLeft: "-50vw",
            left: "50%",
          }}
        >
          <Grid container maxWidth="lg" sx={{ mx: "auto" }}>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                sx={{
                  color: "primary.main",
                  textAlign: "center",
                  mb: 4,
                }}
              >
                Stay at a Romingo Favorite
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                sx={{
                  display: { xs: "grid", lg: "flex" },
                  gridAutoFlow: {
                    xs: "column",
                  },
                  overflow: "auto hidden",
                  pb: 4,
                  px: 4,
                  scrollSnapType: "x",
                }}
              >
                {featureHotels.map((hotel, key) => {
                  return (
                    <Grid item xs={12} lg={4} key={key}>
                      <Box
                        sx={{
                          minWidth: "250px",
                          px: 3,
                        }}
                      >
                        <Link
                          href="#"
                          sx={{
                            textDecoration: "none",
                          }}
                        >
                          <Box
                            sx={{
                              border: "1px solid #DDDDDD",
                              borderRadius: 3,
                              boxShadow: 2,
                              backgroundColor: "white",
                            }}
                          >
                            <Box
                              component="img"
                              src={hotel.img}
                              alt="background"
                              draggable="false"
                              sx={{
                                objectFit: "cover",
                                width: "100%",
                                height: "200px",
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                py: 1,
                                textAlign: "center",
                                color: "text.secondary",
                                fontSize: "125%",
                                width: "100%",
                              }}
                            >
                              {hotel.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.secondary",
                                px: 2.5,
                                pb: 2,
                              }}
                            >
                              {hotel.description}
                            </Typography>
                          </Box>
                        </Link>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
