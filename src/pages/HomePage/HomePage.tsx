import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Carousel } from "react-responsive-carousel";
import {
  Popover,
  Box,
  CSSObject,
  Container,
  Link,
  Button,
  TextField,
  Paper,
  Grid,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Cancel } from "@mui/icons-material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
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
    img: "https://storage.googleapis.com/romingo-development-public/images/front-end/sf-hero-sm.jpeg",
    city: "San Francisco",
    state: "California",
    route: "/san-francisco",
  },
  {
    img: "https://storage.googleapis.com/romingo-development-public/images/front-end/la-hero-sm.jpeg",
    city: "Los Angeles",
    state: "California",
    route: "/los-angeles",
  },
  {
    img: "https://storage.googleapis.com/romingo-development-public/images/front-end/sd-hero-sm.jpeg",
    city: "San Diego",
    state: "California",
    route: "/san-diego",
  },
  {
    img: "https://storage.googleapis.com/romingo-development-public/images/front-end/oc-hero-sm.jpeg",
    city: "Orange County",
    state: "California",
    route: "/orange-county",
  },
  {
    img: "https://storage.googleapis.com/romingo-development-public/images/front-end/ps-hero-sm.jpeg",
    city: "Palm Springs",
    state: "California",
    route: "/palm-springs",
  },
  {
    img: "https://storage.googleapis.com/romingo-development-public/images/front-end/sb-hero-sm.jpeg",
    city: "Santa Barbara",
    state: "California",
    route: "/santa-barbara",
  },
];

const FeatureHotels = [
  {
    img: "https://storage.googleapis.com/romingo-development-public/images/Marina%20del%20Rey/marinadelrey-gallery-02-5ee3cef09b03e.jpeg",
    name: "Manchester Grand Hyatt",
    city: "San Diego, CA",
    cityId: "6f2cf61f-c769-47d9-9e46-90c5664b60b1",
    description:
      "Explore Southern California’s vibrant culture and natural beauty from our waterfront hotel in downtown San Diego. ",
    id: "fe1300a4-a06f-4347-8d7f-f271b3657ba9",
  },
  {
    img: "https://storage.googleapis.com/romingo-development-public/images/Hilton%20Union%20Square/Exterior%201.jpg",
    name: "Hilton Union Square",
    city: "San Franciso, CA",
    cityId: "82145909-13b4-4aab-be20-e0db474021c1",
    description:
      "Our hotel is steps from the Curran and ACT theaters and just two blocks from Union Square and Westfield shopping center.",
    id: "ba772c6c-7fae-492a-85c0-6232eff50852",
  },
  {
    img: "https://storage.googleapis.com/romingo-development-public/images/Marina%20del%20Rey/marinadelrey-gallery-02-5ee3cef09b03e.jpeg",
    name: "Marina Del Rey Hotel",
    city: "Los Angeles, CA",
    cityId: "ba12d364-9b1f-48c5-9ddc-7e68b40df076",
    description:
      "Welcome to picturesque Marina del Rey—Enjoy a dip in the pool, then dine over calming waterfront views—front and center for that West Coast sunset. ",
    id: "862ad750-83c0-4260-8f20-91db6d8b6db3",
  },
];

const HomePage: FC<Props> = ({
  nearCities = NearCities,
  featureHotels = FeatureHotels,
}) => {
  const history = useHistory();
  const search = useSelector((state: any) => state.searchReducer.search);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch: Dispatch<any> = useDispatch();
  const matches = useMediaQuery("(max-width:800px)");
  const { loading, error, data } = useQuery(
    gql`
      ${GetCities}
    `
  );

  useEffect(() => {
    window.Intercom("boot", {
      app_id: "qa6datd3",
      alignment: "right",
    });
    window.Intercom("update");
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setList([...data?.cities]));
    }
  }, [data]);

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

      <Box>
        <Container>
          <Grid container spacing={{ sm: 3, md: 5 }} sx={{ pt: 4, pb: 6 }}>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src={
                  "https://storage.googleapis.com/romingo-development-public/images/front-end/icons/bestAvailableRate.svg"
                }
                draggable="false"
                sx={{ width: { xs: "35%", sm: "50%" } }}
              />
              <Typography variant="h6" color="text.secondary">
                Lowest rates
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Romingo negotiates the lowest rates and pass the savings onto you.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src={
                  "https://storage.googleapis.com/romingo-development-public/images/front-end/icons/noPetFees.svg"
                }
                draggable="false"
                sx={{ width: { xs: "35%", sm: "50%" } }}
              />
              <Typography variant="h6" color="text.secondary">
                No pet fees
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                You will always pay $0 in pet fees by booking on Romingo.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src={
                  "https://storage.googleapis.com/romingo-development-public/images/front-end/icons/dog_paws_tall.svg"
                }
                draggable="false"
                sx={{ width: { xs: "35%", sm: "50%" } }}
              />
              <Typography variant="h6" color="text.secondary">
                All pets welcome
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Romingo hotels welcome (2) pets, 75 lbs. each, no breed restrictions, ever.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src={
                  "https://storage.googleapis.com/romingo-development-public/images/front-end/icons/colored_dog_bowl_tall.svg"
                }
                draggable="false"
                sx={{ width: { xs: "35%", sm: "50%" } }}
              />
              <Typography variant="h6" color="text.secondary">
                Beds & bowls provided
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Every Romingo reservation includes free pet beds & bowls in your room!
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
              variant="h4"
              sx={{
                color: "primary.main",
                textAlign: "center",
                maxWidth: "80%",
                margin: "0px auto",
              }}
            >
              Explore a Romingo City
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                mb: 5,
                mt: "1rem",
                ml: 'auto', mr: 'auto',
                maxWidth: '80%'
              }}
            >
              Romingo currently features pet-friendly hotels across 6 beautiful California destinations
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={3}
              sx={{
                display: { xs: "grid", xl: "flex" },
                gridAutoFlow: { xs: "column", lg: "column" },
                overflow: "auto hidden",
                pb: 4,
                px: 4,
                scrollSnapType: "x",
              }}
            >
              {nearCities.map((nearCity, key) => {
                return (
                  <Grid item xs={12} sm={6} lg={4} xl={2} key={key}>
                    <Box sx={{ minWidth: { xs: "250px", xl: "200px" } }}>
                      <Link
                        href=""
                        onClick={() => history.push(nearCity.route)}
                        sx={{ textDecoration: "none" }}
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
                            sx={{ mt: 2, textAlign: "center" }}
                          >
                            {nearCity.city}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ textAlign: "center", pb: 2, mb: 2 }}
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
          <Grid item xs={12}>
          <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                mb: 5,
                mt: "1rem",
                maxWidth: '90%',
                ml: 'auto', mr: 'auto'
              }}
            >
            <Link sx={{ cursor: 'pointer' }}><EmailSignup /></Link> to be the first to experience our 15 new destinations arriving in Spring 2022
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <HotelCarousel />

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
                variant="h4"
                sx={{ color: "primary.main", textAlign: "center" }}
              >
                Your travel experts
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  textAlign: "center",
                  mb: { xs: 0, sm: 5 },
                  mt: "1rem",
                }}
              >
                Reinventing pet-friendly travel
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ px: { md: 8, sm: 0 } }}>
              <Grid container spacing={{ sm: 3, md: 5 }}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ height: "100%", display: "flex" }}>
                    <Box sx={{ margin: "auto 0", padding: "10px" }}>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          mb: { xs: 3 },
                          mt: 3,
                          fontWeight: 400,
                          fontSize: "115%",
                          textAlign: "justify",
                        }}
                      >
                        Ready to getaway? When you plan your next trip with
                        Romingo you&lsquo;ll receive...
                        <ul>
                          <li>The best deals on rates</li>
                          <li>
                            Zero pet fees for up to 2 pets, weighing 75 lbs.
                            each
                          </li>
                          <li>Pet beds, bowls, and treats upon arrival</li>
                        </ul>
                        Plus, your reservations are backed by the Romingo
                        Guarantee. Meaning if you aren&lsquo;t completely
                        satisfied with your Romingo experience, our dedicated
                        customer support team will do what it takes to make it
                        right.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ height: "100%", display: "flex" }}>
                    <Box
                      component="img"
                      src="https://storage.googleapis.com/romingo-development-public/images/front-end/Relaxing_pup_windows%20(1).jpg"
                      alt="Golden Retriever Under Covers"
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
            </Grid>
          </Grid>
        </Container>
      </Box>


      <CustomerTestimonials />

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
              variant="h4"
              sx={{ color: "primary.main", textAlign: "center", mb: 4 }}
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
                gridAutoFlow: { xs: "column" },
                overflow: "auto hidden",
                pb: 4,
                px: 4,
                scrollSnapType: "x",
              }}
            >
              {featureHotels.map((hotel, key) => {
                return (
                  <Grid item xs={12} lg={4} key={key}>
                    <Box sx={{ minWidth: "300px", px: 3 }}>
                      <Link
                        onClick={() => toFeatured(hotel.id, hotel.cityId)}
                        href="#"
                        sx={{ textDecoration: "none" }}
                      >
                        <Box
                          sx={{
                            border: "1px solid #DDDDDD",
                            borderRadius: 3,
                            boxShadow: 2,
                            pb: 10,
                            minHeight: "320px",
                            backgroundColor: "white",
                            position: "relative",
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
                              height: "240px",
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
                              fontWeight: 400,
                            }}
                          >
                            {hotel.city}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "text.secondary",
                              textAlign: "center",
                              px: 2,
                              pb: 2,
                              pt: "1rem",
                              fontWeight: 400,
                            }}
                          >
                            {hotel.description}
                          </Typography>
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 20,
                              left: 0,
                              right: 0,
                              mx: "auto",
                              textAlign: "center",
                            }}
                          >
                            <Button
                              disableElevation
                              color="primary"
                              variant="contained"
                              sx={{ fontWeight: 600 }}
                            >
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
      <Box
        sx={{
          position: "relative",
          "&::before": {
            content: '""',
            backgroundColor: "secondary.lighter",
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
                variant="h4"
                sx={{
                  color: "primary.main",
                  textAlign: "center",
                  maxWidth: "100%",
                  margin: "0px auto",
                }}
              >
                Save Money &amp; Travel More
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  textAlign: "center",
                  mb: { sm: "1rem", xs: "2rem" },
                  mt: { sm: "1rem", xs: "1rem" },
                  fontSize: { xs: "95%", sm: "100%" },
                }}
              >
                Sign up for Romingo Insiders and get access to exclusive rates
                and deals
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "350px",
                mx: "auto",
              }}
            >
              {subscribed ? (
                <Typography variant="body1" color="text.secondary">
                  Awesome! You&apos;re subscribed to deals, tips, guides, and
                  all the other great content from Romingo Insiders!
                </Typography>
              ) : (
                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                    fetch(
                      `https://romingo.us6.list-manage.com/subscribe/post-json?u=585083137c3540a7371e3a74f&id=d4d3932414&EMAIL=${encodeURIComponent(
                        email
                      )}&c=?`,
                      {
                        mode: "no-cors",
                        method: "POST",
                      }
                    );
                  }}
                >
                  <input
                    type="hidden"
                    name="u"
                    value="585083137c3540a7371e3a74f"
                  />
                  <input type="hidden" name="id" value="d4d3932414" />
                  <div
                    className="field-shift"
                    style={{ position: "absolute", left: "-5000px" }}
                    aria-label="Please leave the following three fields empty"
                  >
                    <label htmlFor="b_name">Name: </label>
                    <input
                      type="text"
                      name="b_name"
                      tabIndex={-1}
                      value=""
                      placeholder="Freddie"
                      id="b_name"
                    />
                    <label htmlFor="b_email">Email: </label>
                    <input
                      type="email"
                      name="b_email"
                      tabIndex={-1}
                      value=""
                      placeholder="youremail@gmail.com"
                      id="b_email"
                    />
                    <label htmlFor="b_comment">Comment: </label>
                    <textarea
                      name="b_comment"
                      tabIndex={-1}
                      placeholder="Please comment"
                      id="b_comment"
                    ></textarea>
                  </div>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      variant="outlined"
                      type="email"
                      name="email"
                      id="MERGE0"
                      label={"Email Address"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      size="medium"
                      autoCapitalize="off"
                      autoCorrect="off"
                      sx={{ width: "calc(100% - 100px)", background: "#fff" }}
                    />
                    <Button
                      sx={{
                        fontWeight: 600,
                        ml: ".5rem",
                        maxWidth: "120px",
                        mb: "0",
                        py: 1.45,
                        fontSize: "18px",
                        textTransform: "none",
                      }}
                      variant="contained"
                      size="small"
                      type="submit"
                      color="primary"
                    >
                      Sign Up
                    </Button>
                  </Box>
                  <Box sx={{ textAlign: "center", mt: "1rem" }}>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary", mb: "1rem" }}
                    >
                      Travel ideas, destination guides, special rates and
                      promotions. We promise you and your dog will
                      <FavoriteIcon
                        sx={{ fontSize: "12px", mx: 0.2, mb: -0.3 }}
                      />
                      it!
                    </Typography>
                  </Box>
                </form>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

const CustomerTestimonials = () => {
  const matches = useMediaQuery("(max-width:800px)");
  const lg = useMediaQuery("(max-width:1160px)");
  const [currentCard, setCurrentCard] = useState(0);

  return (
    <Box
      sx={{
        backgroundColor: "secondary.lighter",
        py: 6,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          "& .carousel .control-dots": {
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              color: "primary.main",
              textAlign: "center",
              mb: matches ? "3rem" : lg ? "3rem" : "9rem",
            }}
          >
            Our Customer Reviews
          </Typography>
        </Grid>
        {!lg && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              cursor: "pointer",
              justifyContent: "space-between",
              minWidth: "125%",
              mb: "-15%",
              ml: "-12.5%",
              zIndex: 1400,
            }}
          >
            <Grid
              onClick={() => setCurrentCard((prev) => prev - 1)}
              sx={{
                color: "#fff",
                cursor: "pointer",
                background: "#03989E",
                width: "42px",
                height: "42px",
                borderRadius: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": { background: "#086f73" },
              }}
            >
              <ChevronLeft sx={{ fontSize: "30px", zIndex: 1111 }} />
            </Grid>
            <Grid
              onClick={() => setCurrentCard((prev) => prev + 1)}
              sx={{
                color: "#fff",
                cursor: "pointer",
                background: "#03989E",
                width: "42px",
                height: "42px",
                borderRadius: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": { background: "#086f73" },
              }}
            >
              <ChevronRight sx={{ fontSize: "30px" }} />
            </Grid>
          </Grid>
        )}
        <Carousel
          showThumbs={false}
          interval={2000}
          showArrows={false}
          showStatus={false}
          infiniteLoop={true}
          onChange={(e) => setCurrentCard(e)}
          autoPlay
          selectedItem={currentCard}
          renderIndicator={(
            onClickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
            isSelected: boolean,
            index: number,
            label: string
          ) => (
            <li
              style={{
                cursor: "pointer",
                opacity: isSelected ? "1" : "0.27",
                margin: "0rem .5rem",
                background: "#333",
                display: "flex",
                width: "15px",
                height: "15px",
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
          <Paper
            elevation={3}
            sx={{
              padding: matches ? "1.5rem 1rem" : "1.5rem",
              minHeight: "210px",
              display: "flex",
              flexDirection: "column",
              width: "95%",
              margin: "0px auto 5rem auto",
              borderRadius: "12px",
              fontFamily: "Montserrat",
              fontSize: "1.5rem",
            }}
          >
            <Typography
              variant={matches ? "h6" : "h6"}
              sx={{
                fontWeight: 500,
                color: "#11111199",
                mb: "1.5rem",
                lineHeight: 1.4,
              }}
            >
              “My husband and I stayed at the Hilton San Francisco and booked
              our room through Romingo. We brought our pup Lilly with us, and
              she loved the tennis ball that was waiting for her in our room. We
              will definitely use Romingo in the future!”
            </Typography>
            <Typography
              variant={matches ? "h6" : "h6"}
              sx={{
                mt: "auto",
                color: "#11111199",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                fontWeight: 600,
              }}
            >
              Hannah S., Sacramento, C
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: matches ? "1.5rem 1rem" : "1.5rem",
              minHeight: "210px",
              display: "flex",
              flexDirection: "column",
              width: "95%",
              margin: "0px auto 2rem auto",
              borderRadius: "12px",
              fontFamily: "Montserrat",
              fontSize: "1.5rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: "#11111199",
                mb: "1.5rem",
                lineHeight: 1.4,
              }}
            >
              “Their customer service team was so helpful. We had to cancel our
              plans very last minute, and the person who helped us (I think her
              name was Amanda) was so responsive and polite.”
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: "auto",
                color: "#11111199",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                fontWeight: 700,
              }}
            >
              Stephanie & Nate W., Denver, CO
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: matches ? "1.5rem 1rem" : "1.5rem",
              minHeight: "210px",
              display: "flex",
              flexDirection: "column",
              width: "95%",
              margin: "0px auto 4rem auto",
              borderRadius: "12px",
              fontFamily: "Montserrat",
              fontSize: "1.5rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: "#11111199",
                mb: "1.5rem",
                lineHeight: 1.4,
              }}
            >
              “I love bringing my golden retriever, Milo, with me on road trips.
              I booked on Romingo and reserved the Grand Hyatt San Diego and
              they were very welcoming. I ended up saving like $100 in pet fees
              by using Romingo.”
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: "auto",
                color: "#11111199",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                fontWeight: 700,
              }}
            >
              Jason L., Los Angeles, CA
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: matches ? "1.5rem 1rem" : "1.5rem",
              minHeight: "210px",
              display: "flex",
              flexDirection: "column",
              width: "95%",
              margin: "0px auto 2rem auto",
              borderRadius: "12px",
              fontFamily: "Montserrat",
              fontSize: "1.5rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: "#11111199",
                mb: "1.5rem",
                lineHeight: 1.4,
              }}
            >
              “We took a trip to LA recently, and even though we do not have a
              pet, we still booked on Romingo because they had the best deal
              compared to other sites. We stayed in West Hollywood for only
              $190/night.”
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: "auto",
                color: "#11111199",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                fontWeight: 700,
              }}
            >
              Jim & Patty N., Fresno, CA
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: matches ? "1.5rem 1rem" : "1.5rem",
              minHeight: "210px",
              display: "flex",
              flexDirection: "column",
              width: "95%",
              margin: "0px auto 4rem auto",
              borderRadius: "12px",
              fontFamily: "Montserrat",
              fontSize: "1.5rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: "#11111199",
                mb: "1.5rem",
                lineHeight: 1.4,
              }}
            >
              “My family and I took a trip to Santa Barbara, and we didnt want
              to leave our Golden Doodle, Chickpea, back home. We reserved an
              oceanfront room at the Mar Monte Hotel, and Romingo even sent me
              recommendations of places to eat and things to do. We ended up
              just ordering room service and lounging on the beach, but it was a
              great trip!”
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: "auto",
                color: "#11111199",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                fontWeight: 700,
              }}
            >
              Kendall M., San Diego, CA
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: matches ? "1.5rem 1rem" : "1.5rem",
              minHeight: "210px",
              display: "flex",
              flexDirection: "column",
              width: "95%",
              margin: "0px auto 4rem auto",
              borderRadius: "12px",
              fontFamily: "Montserrat",
              fontSize: "1.5rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: "#11111199",
                mb: "1.5rem",
                lineHeight: 1.4,
              }}
            >
              “Romingo is easy to use, their hotels do not have hidden fees, and
              I found their customer service to be very accessible. We will use
              Romingo again for our trips this next Summer.”
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: "auto",
                color: "#11111199",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                fontWeight: 700,
              }}
            >
              Mindy N., San Francisco, CA
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: matches ? "1.5rem 1rem" : "1.5rem",
              minHeight: "210px",
              display: "flex",
              flexDirection: "column",
              width: "95%",
              margin: "0px auto 4rem auto",
              borderRadius: "12px",
              fontFamily: "Montserrat",
              fontSize: "1.5rem",
            }}
          >
            <Typography
              variant={matches ? "h6" : "h6"}
              sx={{
                fontWeight: 500,
                color: "#11111199",
                mb: "1.5rem",
                lineHeight: 1.4,
              }}
            >
              “We road-tripped between SF and LA with our French bulldog, Mason.
              Romingo made it easy to find and book pet-friendly hotels”
            </Typography>
            <Typography
              variant={matches ? "h6" : "h6"}
              sx={{
                mt: "auto",
                color: "#11111199",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                fontWeight: 700,
              }}
            >
              Lynn M., Las Vegas, NV
            </Typography>
          </Paper>
        </Carousel>
      </Container>
    </Box>
  );
};

const HotelCarousel = () => {
  const matches = useMediaQuery("(max-width:800px)");
  const hotelLogos = [
    "Ace%20Hotel.jpg",
    "Curator.png",
    "Double%20Tree.jpg",
    "Grand%20Hyatt.png",
    "Hilton.png",
    "Hyatt%20Regency.png",
    "Mondrian.png",
    "Noble%20House.png",
    "Pendry.png",
    "Sonesta.png",
    "Trademark.png",
    "Viceroy.jpg",
    "Virgin.png",
  ].map((picture, index) => {
    return (
      <Grid
        key={index}
        sx={{
          overflow: "hidden",
          height: "60px",
          m: "0rem 1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt="hotel logo"
          style={{ display: "block", maxWidth: "100%", maxHeight: "60px" }}
          src={`https://storage.googleapis.com/romingo-development-public/images/front-end/hotel-logos/${picture}`}
        />
      </Grid>
    );
  });

  const responsive = {
    0: { items: 3 },
    650: { items: 6 },
    750: { items: 6 },
    1024: { items: 9 },
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        py: 6,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        "& .carousel .slide": { minWidth: "15%" },
        "& .carousel .control-dots": {
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          sx={{
            color: "primary.main",
            textAlign: "center",
            m: "0rem auto 1rem auto",
            maxWidth: "90%",
          }}
        >
          Proudly Partnered With
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: "text.secondary", textAlign: "center", mb: 5 }}
        >
          Your Favorite Hotels
        </Typography>
      </Grid>

      <AliceCarousel
        items={hotelLogos}
        responsive={responsive}
        autoPlay
        autoPlayDirection="ltr"
        mouseTracking
        infinite
        autoPlayInterval={500}
        animationDuration={800}
        disableButtonsControls
        disableDotsControls
      />
    </Box>
  );
};

const EmailSignup = () => {
  const [showDealsPopup, setShowDealsPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  useEffect(() => {
    setEmailIsValid(/^\S+@\S+\.\S+$/.test(email));
  }, [email]);

  useEffect(() => {
    emailSubmitted && setIsSubmitting(false);
    !emailSubmitted && setEmail("");
  }, [emailSubmitted]);

  useEffect(() => {
    if (!showDealsPopup)
      setTimeout(() => {
        setEmailSubmitted(false);
      }, 250);
  }, [showDealsPopup]);

  const submitEmail = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      fetch(
        `https://romingo.us6.list-manage.com/subscribe/post-json?u=585083137c3540a7371e3a74f&id=d4d3932414&EMAIL=${encodeURIComponent(
          email
        )}&c=?`,
        { mode: "no-cors", method: "POST" }
      ).then((res) => {
        setEmailSubmitted(true);
      });
    }, 500);
  };

  return (
    <>
      <Popover
        onClose={() => setShowDealsPopup(false)}
        open={showDealsPopup}
        anchorEl={anchorEl}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            marginTop: "48px",
            border: "1px solid #ddd",
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Grid
          container
          sx={{
            width: { xs: "100%", sm: "393px" },
            minHeight: "100px",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#00000099",
              p: ".5rem .5rem",
              pb: ".125rem",
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: ".9rem",
            }}
          >
            Sign up with your email below to access exclusive deals and more:
            <Cancel
              onClick={() => setShowDealsPopup(false)}
              sx={{
                cursor: "pointer",
                transition: "all .15s linear",
                marginBottom: "auto",
                "&:hover": { color: "#03989E" },
              }}
            />
          </Grid>
          {emailSubmitted ? (
            <Grid
              item
              xs={12}
              sx={{
                p: ".5rem .5rem .5rem .5rem",
                fontFamily: "Work Sans",
                color: "#03989E",
                textAlign: "center",
              }}
            >
              Awesome! You&lsquo;re subscribed to deals, tips, guides, and all
              the other great content from Romingo Insiders!
            </Grid>
          ) : (
            <>
              {isSubmitting && (
                <Grid
                  sx={{
                    position: "absolute",
                    zIndex: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "0px",
                    right: "0",
                    left: "0",
                    bottom: "0px",
                    background: "#ffffff80",
                    backdropFilter: "blur(1px)",
                  }}
                >
                  <CircularProgress />
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  p: ".25rem .5rem .5rem .5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  variant="outlined"
                  color="primary"
                  placeholder="enter email"
                  size="small"
                  value={email}
                  sx={{
                    outline: "none",
                    fontSize: ".8rem",
                    input: { fontFamily: "Montserrat" },
                  }}
                  InputProps={{
                    sx: {
                      fontSize: ".5rem",
                      maxHeight: "30px",
                      fontFamily: "Montserrat",
                      width: { xs: "calc(100vw - 140px)", sm: "290px" },
                      outline: "none",
                    },
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={submitEmail}
                  disabled={!emailIsValid || isSubmitting}
                  size="small"
                  variant="contained"
                  sx={{
                    fontWeight: 600,
                    textTransform: "none",
                    fontFamily: "Montserrat",
                  }}
                >
                  Sign up!
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Popover>
      <span
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          setShowDealsPopup(true);
          setAnchorEl(e.currentTarget);
        }}
      >
        Sign up for our email
      </span>
    </>
  );
};


export default HomePage;
