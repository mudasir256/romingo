import Box from "@mui/material/Box";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";
import { CSSObject } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import { gql, useQuery } from "@apollo/client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { GetCities } from "../../constants/constants";
import { setList } from "../../store/cityListReducer";
import ScrollToTop from "../../components/ScrollToTop";

import { saveSearch } from "../../store/searchReducer";

interface Props {
  sx?: CSSObject;
  nearCities: {
    img: string;
    city: string;
    state: string;
    route: string;
  }[];
  featureHotels: {
    img: string;
    name: string;
    description: string;
    city: string;
    cityId: string;
    id: string;
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
    img: "/images/sf-hero.jpeg",
    city: "San Francisco",
    state: "California",
    route: "/san-francisco",
  },
  {
    img: "/images/la-hero.jpeg",
    city: "Los Angeles",
    state: "California",
    route: "/los-angeles",
  },
  {
    img: "/images/sd-hero.jpeg",
    city: "San Diego",
    state: "California",
    route: "/san-diego",
  },
  {
    img: "/images/oc-hero.jpeg",
    city: "Orange County",
    state: "California",
    route: "/orange-county",
  },
  {
    img: "/images/ps-hero.jpeg",
    city: "Palm Springs",
    state: "California",
    route: "/palm-springs",
  },
  {
    img: "/images/sb-hero.jpeg",
    city: "Santa Barbara",
    state: "California",
    route: "/santa-barbara",
  },
];

const FeatureHotels = [
  {
    img:
      "https://storage.googleapis.com/romingo-development-public/images/Intercon%20San%20Diego/Intercontinental-san-diego-gallery-31-5c0831a0e6ed6.jpg",
    name: "Intercontinental San Diego",
    city: "San Diego, CA",
    cityId: "6f2cf61f-c769-47d9-9e46-90c5664b60b1",
    description:
      "Sophistication has arrived on the downtown waterfront, bringing together the best of the city and the bay.",
    id: "8f17db8f-b07a-430c-91a0-0221204e53e7",
  },
  {
    img:
      "https://storage.googleapis.com/romingo-development-public/images/Kimpton%20La%20Peer/la-peer-terrace-king-room-view-9037a986.jpg",
    name: "Kimpton La Peer",
    city: "Los Angeles, CA",
    cityId: "ba12d364-9b1f-48c5-9ddc-7e68b40df076",
    description:
      "A West Hollywood Hotel Hideaway just steps from the vibrant intersection of Melrose Avenue and Santa Monica Boulevard",
    id: "fd37e867-8164-4a9c-8240-ac3cedbbb774",
  },
  {
    img:
      "https://storage.googleapis.com/romingo-development-public/images/Marriott%20Fisherman's%20Wharf/sfofw-cochere-0073-hor-clsc.jpeg",
    name: "Marriott Fisherman’s Wharf",
    city: "San Francisco, CA",
    cityId: "82145909-13b4-4aab-be20-e0db474021c1",
    description:
      "A truly dog friendly experience at San Francisco Marriott Fisherman's Wharf near the Golden Gate Bridge, Oracle Park and Pier 39.",
    id: "3440f807-f383-437c-8923-71b7e45853bd",
  },
];

const HomePage: FC<Props> = ({
  nearCities = NearCities,
  featureHotels = FeatureHotels,
}) => {
  const history = useHistory();
  const search = useSelector((state: any) => state.searchReducer.search);
  const dispatch: Dispatch<any> = useDispatch();
  const { loading, error, data } = useQuery(
    gql`
      ${GetCities}
    `
  );

  useEffect(() => {
    if (data) {
      dispatch(setList([...data?.cities]));
    }
  }, [data]);

  console.log(search);

  const toFeatured = (id: string, cityId: string) => {
    let city = search.city;
    let checkIn = search.checkIn;
    let checkOut = search.checkOut;
    let occupants = search.occupants;
    const today = new Date();
    if (!search.city) {
      city = cityId;
    }
    if (~checkIn) {
      checkIn = checkOut = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      ).toISOString();
    }
    if (!checkOut) {
      checkOut = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 9
      ).toISOString();
    }
    if (occupants.adults === 0) {
      occupants = { adults: 2, dogs: 1, children: 0 };
    }
    dispatch(
      saveSearch({
        city,
        checkIn,
        checkOut,
        occupants,
      })
    );
    history.push(`/details/${id}`);
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <Box
        sx={{
          position: "relative",
          "&::before": {
            content: '""',
            background: "#fcf5f0",
            opacity: 1,
            backgroundSize: "cover",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container sx={{ py: 6 }}>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                sx={{
                  color: "primary.main",
                  textAlign: "center",
                }}
              >
                Book the lowest room rates
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "text.secondary",
                  textAlign: "center",
                  mb: 5,
                }}
              >
                And never pay another pet fee again
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
                        variant="h4"
                        sx={{
                          color: "text.secondary",
                          textAlign: "center",
                        }}
                      >
                        Romingo hotels allow two dogs, up to 75 pounds each
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 3, fontSize: "115%", textAlign: "justify" }}
                      >
                        Don&apos;t leave your dogs at home. When you book with
                        Romingo, your dogs are included for free and you will
                        never be asked to pay a non-refundable pet fee during
                        booking or at the hotel.
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
                      src="/images/Young_Couple_Driving_Dog.webp"
                      alt="french bulldog w/ coffee"
                      draggable="false"
                      sx={{
                        width: "100%",
                        maxHeight: "275px",
                        borderRadius: 3,
                        boxShadow: 5,
                        objectFit: "cover",
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
                      src="/images/balcony-dog.jpeg"
                      alt="dog head out window"
                      draggable="false"
                      sx={{
                        width: "100%",
                        maxHeight: "275px",
                        objectFit: "cover",
                        borderRadius: 3,
                        boxShadow: 5,
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
                        variant="h4"
                        sx={{
                          color: "text.secondary",
                          textAlign: "center",
                        }}
                      >
                        Romingo hotels provide beds &amp; bowls for your pup
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 3, fontSize: "115%", textAlign: "justify" }}
                      >
                        Romingo partners with hotels to make travelling with
                        dogs more comfortable. Romingo bookings include the
                        amenities they need for a comfortable and exciting trip,
                        at no extra cost.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Container>
          <Grid container spacing={{ sm: 3, md: 5 }} sx={{ pt: 4, pb: 6 }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                component="img"
                src={"./images/icons/bestAvailableRate.svg"}
                draggable="false"
                sx={{
                  width: "50%",
                }}
              />
              <Typography variant="h6" color="text.secondary">
                Best Available Rates
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                We work hard to bring you the best room rates from our hotel
                partners
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                component="img"
                src={"./images/icons/noPetFees.svg"}
                draggable="false"
                sx={{
                  width: "50%",
                }}
              />
              <Typography variant="h6" color="text.secondary">
                No Hidden Pet Fees
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                Unlike other sites, Romingo has no pet fees, online or at the
                front desk
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                component="img"
                src={"./images/icons/customService.svg"}
                draggable="false"
                sx={{
                  width: "50%",
                }}
              />
              <Typography variant="h6" color="text.secondary">
                Happy Customer Service
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                We’re here for you and your canine companion via chat, email,
                and social
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                component="img"
                src={"./images/icons/romingoScore.svg"}
                draggable="false"
                sx={{
                  width: "50%",
                }}
              />
              <Typography variant="h6" color="text.secondary">
                Helpful Romingo Scores
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                Based on “paw-forward” pet amenities and nearby pet-friendly
                activities
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: "lightBackground.main",
          py: 6,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <Grid container sx={{ ml: "calc(50% - 50vw)", mr: "calc(50% - 50vw)" }}>
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
                        href=""
                        onClick={() => history.push(nearCity.route)}
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
          width: "100%",
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
                        onClick={() => toFeatured(hotel.id, hotel.cityId)}
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
                            pb: 3,
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
                            variant="h6"
                            sx={{
                              pt: 1,
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
                              pb: 1,
                              textAlign: "center",
                              color: "text.secondary",
                              width: "100%",
                            }}
                          >
                            {hotel.city}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "text.secondary",
                              textAlign: "left",
                              px: 2.5,
                              pb: 2,
                            }}
                          >
                            {hotel.description}
                          </Typography>
                          <Box sx={{ textAlign: "center" }}>
                            <Button color="primary" variant="contained">
                              Book Now
                            </Button>
                          </Box>
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
      <Footer />
    </>
  );
};

export default HomePage;
