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
import { ChevronLeft, ChevronRight, Cancel, Star } from "@mui/icons-material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
    img: "https://storage.googleapis.com/romingo-development-public/images/Grand%20Hyatt%20San%20Diego/Manchester-Grand-Hyatt-San-Diego-P508-Exterior-Marina.4x3.webp",
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

  useEffect(() => {
    window.Intercom("boot", {
      app_id: "qa6datd3",
      alignment: "right",
    });
    window.Intercom("update");
  }, []);

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
                Romingo negotiates the lowest rates and pass the savings onto
                you.
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
                Romingo hotels welcome (2) pets, 75 lbs. each, no breed
                restrictions, ever.
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
                Every Romingo reservation includes free pet beds & bowls in your
                room!
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
                ml: "auto",
                mr: "auto",
                maxWidth: "80%",
              }}
            >
              Romingo currently features pet-friendly hotels across 6 beautiful
              California destinations
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
                maxWidth: "90%",
                ml: "auto",
                mr: "auto",
              }}
            >
              <Link sx={{ cursor: "pointer" }}>
                <EmailSignup />
              </Link>{" "}
              to be the first to experience our 15 new destinations arriving in
              Spring 2022
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
          background: '#fcf5f0'
        }}
      >
        <Grid container maxWidth="lg" sx={{ mx: "auto" }}>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Typography
              variant="h4"
              sx={{ color: "primary.main", maxWidth: '90%', textAlign: "center", mb: 4, ml: 'auto', mr: 'auto' }}
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

  useEffect(() => {
    if (currentCard === 0) {
      document.getElementById('scroll-container')!.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }
    else {
     document.getElementById('scroll-container')!.scrollTo({ left: 0, top: currentCard*75, behavior: 'smooth' })
    }
  }, [currentCard])


  return (
    <Box
      sx={{
        background: { xs: '#fff', sm: '#fff', md: '#fff'},
        py: 6,
        pb: { xs: '0rem', sm: '2rem', md: '4rem', lg: '4rem'},
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        overflow: 'hidden'
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          "& .carousel .control-dots": {
            display: "flex",
            justifyContent: "center",
          },
          background: { xs: '#fff', sm: '#fff', md: '#fff'},
          padding: '2rem 0rem 4rem 0rem ', borderRadius: '6px',
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{
                color: "primary.main",
                textAlign: "center",
                mb: matches ? "3rem" : lg ? "3rem" : "3rem",
              }}
            >
              What our travelers are saying...
            </Typography>
          </Grid>
            <Grid id="scroll-container" item xs={3} sx={{
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
              maxHeight: '300px', overflowY: 'auto', borderRight: '1px solid #ccc', pr: '0rem', pt: '0', display: { xs: 'none', sm: 'none', md: 'flex'}, flexDirection: 'column', cursor: "pointer",  }}>
              {[
                 {name: 'Hannah S.', loc: 'Sacramento CA'},
                 {name: 'Kendall M.', loc: 'Austin, TX'},
                 {name: 'Mindy S.', loc: 'San Francisco, CA'},
                 {name: 'Jamie J.', loc: 'Los Angeles, CA'},
                 {name: 'Kara C.', loc: 'San Diego, CA'},
                 {name: 'Cedric C.', loc: 'Seattle, WA'},
                 {name: 'Eric S.', loc: 'Portland, OR'},
                 {name: 'Jake B.', loc: 'Olympia, WA'},
                 {name: 'Alex W.', loc: 'Lodi, CA'},
                  {name: 'Luke W.', loc: 'San Franciso, CA'},
                 ]
                .map((item, index) => {
                  return <Grid container key={item.name} onClick={() => setCurrentCard((prev) => index)} sx={{  transition: 'all .25s ease-in-out', border: index === currentCard ? '1px solid #ccc' : '1px solid transparent',  color: "#fff", cursor: "pointer", background: index === currentCard ? "#efefef" : '#fff', padding: '1rem .5rem', borderRadius: index === currentCard ? "6px" : '0px', display: "flex", alignItems: "center", justifyContent: "center", "&:hover": { background: "#efefef", border: '1px solid #ddd', }, borderRight: '0px', borderTopRightRadius: 0, borderBottomRightRadius: 0, zIndex: index === currentCard ? 2 : 1, }}>
                 <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pl: '.25rem'}}>
                    <img style={{ borderRadius: '6px', maxHeight: '100%', maxWidth: '100%'}} src={ index%2 === 0 ? 'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg' : "https://image.shutterstock.com/image-vector/cartoon-character-jack-russell-terrier-260nw-579387331.jpg"} />
                  </Grid>
                  <Grid item xs={10} sx={{ pl: '1rem'}}>
                    <Typography variant="h6" sx={{ color: "#11111199", fontSize: "1rem", fontFamily: "Montserrat", fontWeight: 700, textAlign: 'left' }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ textAlign: 'left', color: "#11111199", mt: '-.25rem', fontWeight: 500, fontSize: '13px'  }}>
                      {item.loc}
                    </Typography>
                  </Grid>
                </Grid>
                })}
            </Grid>

         <Grid item xs={12} sm={12} md={9} sx={{ '& .slider-wrapper': { maxWidth: { xs: '100%', sm: '100%', md: 'calc(100vw - 293px)', lg: 'calc(100vw - 500px)', xl: 'calc(100vw - 1000px)'}, minHeight: { xs: '400px', sm: '450px', md: '300px' }, overflow: 'hidden' }, '& .slide': { display: { xs: 'flex', sm: 'flex', md: 'flex' } }, pl: { xs: 0, sm: 0, md: '1rem' }, mt: 'auto', mb: 'auto', display: { xs: 'block', sm: 'block', md: 'flex'}, alignItems: 'center' }}>
          <Carousel
              showThumbs={false}
              interval={matches ? 3000 : 6000 }
              showArrows={false}
              showIndicators={matches ? true : false}
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
                    margin: "1rem .5rem 0rem .5rem",
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

          <Paper elevation={1} sx={{ border: '1px solid #ddd', padding: matches ? "1rem 1rem" : "1rem", minHeight: { xs: "0px", sm: "0px", md: "215px"}, display: "flex", flexDirection: "column", width: "95%", margin: "auto auto auto auto", borderRadius: "12px", fontFamily: "Montserrat", fontSize: "1.5rem",}}>
            <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
              <Grid item xs={2} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd' }}>
                <img style={{ borderRadius: '6px', maxHeight: '90%', maxWidth: '90%'}} src="https://image.shutterstock.com/image-vector/cartoon-character-jack-russell-terrier-260nw-579387331.jpg" />
              </Grid>
              <Grid item xs={10} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd', pl: '.5rem', pb: '.5rem' }}>
                <Typography variant="h6" sx={{ mt: "auto", color: "#11111199", fontSize: "1rem", fontFamily: "Montserrat", fontWeight: 700, textAlign: 'left' }}>
                  Hannah S.
                </Typography>
                <Typography sx={{ textAlign: 'left' }}>
                  Sacramento, CA
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ pt: '.5rem' }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.5rem'},  pb: { xs: '0rem', sm: '0rem', md: '1rem' }, pt: { xs: '0rem', sm: '0rem', md: '1rem' }, borderTop: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, borderBottom: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, mt: { xs: '0', sm: '0', md: '.75rem' }, fontFamily: 'Montserrat', letterSpacing: '0px', textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontWeight: 500, color: "#11111199", mb: { xs: ".25rem", sm: ".25rem", md: '1rem' }, lineHeight: 1.64, minHeight: { xs: '100px', sm: '100px', md: '175px'}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  “Their customer service exceeded my expectations” <br />
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, mt: 'auto', color: '#f9c171' }}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontSize: '14px', fontWeight: 500 }}>
                5 / 5 stars verified user
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={1} sx={{ border: '1px solid #ddd', padding: matches ? "1rem 1rem" : "1rem", minHeight: { xs: "0px", sm: "0px", md: "215px"}, display: "flex", flexDirection: "column", width: "95%", margin: "auto auto auto auto", borderRadius: "12px", fontFamily: "Montserrat", fontSize: "1.5rem",}}>
          <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
              <Grid item xs={2} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd' }}>
                <img style={{ borderRadius: '6px', maxHeight: '90%', maxWidth: '90%'}} src="https://image.shutterstock.com/image-vector/cartoon-character-jack-russell-terrier-260nw-579387331.jpg" />
              </Grid>
              <Grid item xs={10} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd', pl: '.5rem', pb: '.5rem' }}>
                <Typography variant="h6" sx={{ mt: "auto", color: "#11111199", fontSize: "1rem", fontFamily: "Montserrat", fontWeight: 700, textAlign: 'left' }}>
                  Kendall M.
                </Typography>
                <Typography sx={{ textAlign: 'left' }}>
                  Austin, TX
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ pt: '.5rem' }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.5rem'},  pb: { xs: '0rem', sm: '0rem', md: '1rem' }, pt: { xs: '0rem', sm: '0rem', md: '1rem' }, borderTop: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, borderBottom: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, mt: { xs: '0', sm: '0', md: '.75rem' }, fontFamily: 'Montserrat', letterSpacing: '0px', textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontWeight: 500, color: "#11111199", mb: { xs: ".25rem", sm: ".25rem", md: '1rem' }, lineHeight: 1.64, minHeight: { xs: '100px', sm: '100px', md: '175px'}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  “So easy to use and they have beautiful pet-friendly hotels” <br />
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, mt: 'auto', color: '#f9c171' }}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontSize: '14px', fontWeight: 500 }}>
                5 / 5 stars verified user
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={1} sx={{ border: '1px solid #ddd',  maxWidth: '90%', padding: matches ? "1rem 1rem" : "1rem", minHeight: { xs: "210px", sm: "210px", md: "215px"}, display: "flex", flexDirection: "column", width: "95%",  margin: "auto auto auto auto", borderRadius: "12px", fontFamily: "Montserrat", fontSize: "1.5rem",}}>
          <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
              <Grid item xs={2} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd' }}>
                <img style={{ borderRadius: '6px', maxHeight: '90%', maxWidth: '90%'}} src="https://image.shutterstock.com/image-vector/cartoon-character-jack-russell-terrier-260nw-579387331.jpg" />
              </Grid>
              <Grid item xs={10} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd', pl: '.5rem', pb: '.5rem' }}>
                <Typography variant="h6" sx={{ mt: "auto", color: "#11111199", fontSize: "1rem", fontFamily: "Montserrat", fontWeight: 700, textAlign: 'left' }}>
                  Mindy S.
                </Typography>
                <Typography sx={{ textAlign: 'left' }}>
                  San Francisco, CA
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ pt: '.5rem' }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.5rem'},  pb: { xs: '0rem', sm: '0rem', md: '1rem' }, pt: { xs: '0rem', sm: '0rem', md: '1rem' }, borderTop: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, borderBottom: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, mt: { xs: '0', sm: '0', md: '.75rem' }, fontFamily: 'Montserrat', letterSpacing: '0px', textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontWeight: 500, color: "#11111199", mb: { xs: ".25rem", sm: ".25rem", md: '1rem' }, lineHeight: 1.64, minHeight: { xs: '100px', sm: '100px', md: '175px'}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  “I saved $250 by booking through Romingo. Their rates were actually lower than the brand websites, plus there were no pet fees”
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'},  color: '#f9c171' }}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontSize: '14px', fontWeight: 500 }}>
                5 / 5 stars verified user
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={1} sx={{ border: '1px solid #ddd',  padding: matches ? "1rem 1rem" : "1rem", minHeight: { xs: "210px", sm: "210px", md: "215px"}, display: "flex", flexDirection: "column", width: "95%",  margin: "auto auto auto auto", borderRadius: "12px", fontFamily: "Montserrat", fontSize: "1.5rem",}}>
            <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
              <Grid item xs={2} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd' }}>
                <img style={{ borderRadius: '6px', maxHeight: '90%', maxWidth: '90%'}} src="https://image.shutterstock.com/image-vector/cartoon-character-jack-russell-terrier-260nw-579387331.jpg" />
              </Grid>
              <Grid item xs={10} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd', pl: '.5rem', pb: '.5rem' }}>
                <Typography variant="h6" sx={{ mt: "auto", color: "#11111199", fontSize: "1rem", fontFamily: "Montserrat", fontWeight: 700, textAlign: 'left' }}>
                  Jamie J
                </Typography>
                <Typography sx={{ textAlign: 'left' }}>
                  Los Angeles, CA
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ pt: '.5rem' }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.5rem'},  pb: { xs: '0rem', sm: '0rem', md: '1rem' }, pt: { xs: '0rem', sm: '0rem', md: '1rem' }, borderTop: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, borderBottom: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, mt: { xs: '0', sm: '0', md: '.75rem' }, fontFamily: 'Montserrat', letterSpacing: '0px', textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontWeight: 500, color: "#11111199", mb: { xs: ".25rem", sm: ".25rem", md: '1rem' }, lineHeight: 1.64, minHeight: { xs: '100px', sm: '100px', md: '175px'}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  “Romingo had a dog bed, water bowls, and a cute tennis ball for my pup Midas when we arrived at our hotel”
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'},  color: '#f9c171' }}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontSize: '14px', fontWeight: 500 }}>
                5 / 5 stars verified user
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={1} sx={{ border: '1px solid #ddd',  padding: matches ? "1rem 1rem" : "1rem", minHeight: { xs: "210px", sm: "210px", md: "215px"}, display: "flex", flexDirection: "column", width: "95%", margin: "auto auto auto auto", borderRadius: "12px", fontFamily: "Montserrat", fontSize: "1.5rem",}}>
            <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
              <Grid item xs={2} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd' }}>
                <img style={{ borderRadius: '6px', maxHeight: '90%', maxWidth: '90%'}} src="https://image.shutterstock.com/image-vector/cartoon-character-jack-russell-terrier-260nw-579387331.jpg" />
              </Grid>
              <Grid item xs={10} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd', pl: '.5rem', pb: '.5rem' }}>
                <Typography variant="h6" sx={{ mt: "auto", color: "#11111199", fontSize: "1rem", fontFamily: "Montserrat", fontWeight: 700, textAlign: 'left' }}>
                  Kara C.
                </Typography>
                <Typography sx={{ textAlign: 'left' }}>
                  San Diego, CA
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ pt: '.5rem' }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.5rem'},  pb: { xs: '0rem', sm: '0rem', md: '1rem' }, pt: { xs: '0rem', sm: '0rem', md: '1rem' }, borderTop: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, borderBottom: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, mt: { xs: '0', sm: '0', md: '.75rem' }, fontFamily: 'Montserrat', letterSpacing: '0px', textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontWeight: 500, color: "#11111199", mb: { xs: ".25rem", sm: ".25rem", md: '1rem' }, lineHeight: 1.64, minHeight: { xs: '100px', sm: '100px', md: '175px'}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  “My pup Archie had the time of his life when we visited Santa Monica. Life&#39;s a breeze with Romingo, and we paid ZERO pet fees”
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'},  color: '#f9c171' }}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontSize: '14px', fontWeight: 500 }}>
                5 / 5 stars verified user
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={1} sx={{ border: '1px solid #ddd', padding: matches ? "1rem 1rem" : "1rem", minHeight: { xs: "0px", sm: "0px", md: "215px"}, display: "flex", flexDirection: "column", width: "95%", margin: "auto auto auto auto", borderRadius: "12px", fontFamily: "Montserrat", fontSize: "1.5rem",}}>
            <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
                <Grid item xs={2} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd' }}>
                  <img style={{ borderRadius: '6px', maxHeight: '90%', maxWidth: '90%'}} src="https://image.shutterstock.com/image-vector/cartoon-character-jack-russell-terrier-260nw-579387331.jpg" />
                </Grid>
                <Grid item xs={10} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd', pl: '.5rem', pb: '.5rem' }}>
                  <Typography variant="h6" sx={{ mt: "auto", color: "#11111199", fontSize: "1rem", fontFamily: "Montserrat", fontWeight: 700, textAlign: 'left' }}>
                    Cedric C.
                  </Typography>
                  <Typography sx={{ textAlign: 'left' }}>
                    Seattle, WA
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ pt: '.5rem' }}>
                  <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.5rem'},  pb: { xs: '0rem', sm: '0rem', md: '1rem' }, pt: { xs: '0rem', sm: '0rem', md: '1rem' }, borderTop: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, borderBottom: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, mt: { xs: '0', sm: '0', md: '.75rem' }, fontFamily: 'Montserrat', letterSpacing: '0px', textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontWeight: 500, color: "#11111199", mb: { xs: ".25rem", sm: ".25rem", md: '1rem' }, lineHeight: 1.64, minHeight: { xs: '100px', sm: '100px', md: '175px'}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    “The UI was extremely user friendly and easy to navigate” <br />
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, mt: 'auto', color: '#f9c171' }}>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontSize: '14px', fontWeight: 500 }}>
                  5 / 5 stars verified user
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={1} sx={{ border: '1px solid #ddd', padding: matches ? "1rem 1rem" : "1rem", minHeight: { xs: "0px", sm: "0px", md: "215px"}, display: "flex", flexDirection: "column", width: "95%", margin: "auto auto auto auto", borderRadius: "12px", fontFamily: "Montserrat", fontSize: "1.5rem",}}>
              <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
                  <Grid item xs={2} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd' }}>
                    <img style={{ borderRadius: '6px', maxHeight: '90%', maxWidth: '90%'}} src="https://image.shutterstock.com/image-vector/cartoon-character-jack-russell-terrier-260nw-579387331.jpg" />
                  </Grid>
                  <Grid item xs={10} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd', pl: '.5rem', pb: '.5rem' }}>
                    <Typography variant="h6" sx={{ mt: "auto", color: "#11111199", fontSize: "1rem", fontFamily: "Montserrat", fontWeight: 700, textAlign: 'left' }}>
                      Eric S.
                    </Typography>
                    <Typography sx={{ textAlign: 'left' }}>
                      Portland, OR
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ pt: '.5rem' }}>
                    <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.5rem'},  pb: { xs: '0rem', sm: '0rem', md: '1rem' }, pt: { xs: '0rem', sm: '0rem', md: '1rem' }, borderTop: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, borderBottom: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, mt: { xs: '0', sm: '0', md: '.75rem' }, fontFamily: 'Montserrat', letterSpacing: '0px', textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontWeight: 500, color: "#11111199", mb: { xs: ".25rem", sm: ".25rem", md: '1rem' }, lineHeight: 1.64, minHeight: { xs: '100px', sm: '100px', md: '175px'}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      “Saved over $200 in hotel pet fees by booking on Romingo” <br />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, mt: 'auto', color: '#f9c171' }}>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontSize: '14px', fontWeight: 500 }}>
                    5 / 5 stars verified user
                  </Grid>
                </Grid>
              </Paper>
              <Paper elevation={1} sx={{ border: '1px solid #ddd', padding: matches ? "1rem 1rem" : "1rem", minHeight: { xs: "0px", sm: "0px", md: "215px"}, display: "flex", flexDirection: "column", width: "95%", margin: "auto auto auto auto", borderRadius: "12px", fontFamily: "Montserrat", fontSize: "1.5rem",}}>
              <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
                  <Grid item xs={2} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd' }}>
                    <img style={{ borderRadius: '6px', maxHeight: '90%', maxWidth: '90%'}} src="https://image.shutterstock.com/image-vector/cartoon-character-jack-russell-terrier-260nw-579387331.jpg" />
                  </Grid>
                  <Grid item xs={10} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd', pl: '.5rem', pb: '.5rem' }}>
                    <Typography variant="h6" sx={{ mt: "auto", color: "#11111199", fontSize: "1rem", fontFamily: "Montserrat", fontWeight: 700, textAlign: 'left' }}>
                      Jake B.
                    </Typography>
                    <Typography sx={{ textAlign: 'left' }}>
                      Olympia, WA
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ pt: '.5rem' }}>
                    <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.5rem'},  pb: { xs: '0rem', sm: '0rem', md: '1rem' }, pt: { xs: '0rem', sm: '0rem', md: '1rem' }, borderTop: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, borderBottom: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, mt: { xs: '0', sm: '0', md: '.75rem' }, fontFamily: 'Montserrat', letterSpacing: '0px', textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontWeight: 500, color: "#11111199", mb: { xs: ".25rem", sm: ".25rem", md: '1rem' }, lineHeight: 1.64, minHeight: { xs: '100px', sm: '100px', md: '175px'}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      “No pet fees, and they even had  a little welcome basket for our golden retriever, Max. Romingo is the only way to go!” <br />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, mt: 'auto', color: '#f9c171' }}>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontSize: '14px', fontWeight: 500 }}>
                    5 / 5 stars verified user
                  </Grid>
                </Grid>
              </Paper>
              <Paper elevation={1} sx={{ border: '1px solid #ddd', padding: matches ? "1rem 1rem" : "1rem", minHeight: { xs: "0px", sm: "0px", md: "215px"}, display: "flex", flexDirection: "column", width: "95%", margin: "auto auto auto auto", borderRadius: "12px", fontFamily: "Montserrat", fontSize: "1.5rem",}}>
              <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
                  <Grid item xs={2} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd' }}>
                    <img style={{ borderRadius: '6px', maxHeight: '90%', maxWidth: '90%'}} src="https://image.shutterstock.com/image-vector/cartoon-character-jack-russell-terrier-260nw-579387331.jpg" />
                  </Grid>
                  <Grid item xs={10} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd', pl: '.5rem', pb: '.5rem' }}>
                    <Typography variant="h6" sx={{ mt: "auto", color: "#11111199", fontSize: "1rem", fontFamily: "Montserrat", fontWeight: 700, textAlign: 'left' }}>
                      Alex W.
                    </Typography>
                    <Typography sx={{ textAlign: 'left' }}>
                      Lodi, CA
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ pt: '.5rem' }}>
                    <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.5rem'},  pb: { xs: '0rem', sm: '0rem', md: '1rem' }, pt: { xs: '0rem', sm: '0rem', md: '1rem' }, borderTop: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, borderBottom: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, mt: { xs: '0', sm: '0', md: '.75rem' }, fontFamily: 'Montserrat', letterSpacing: '0px', textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontWeight: 500, color: "#11111199", mb: { xs: ".25rem", sm: ".25rem", md: '1rem' }, lineHeight: 1.64, minHeight: { xs: '100px', sm: '100px', md: '175px'}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      “I saved a lot of money and time by booking my trip to San Diego with Romingo” <br />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, mt: 'auto', color: '#f9c171' }}>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontSize: '14px', fontWeight: 500 }}>
                    5 / 5 stars verified user
                  </Grid>
                </Grid>
              </Paper>
              <Paper elevation={1} sx={{ border: '1px solid #ddd', padding: matches ? "1rem 1rem" : "1rem", minHeight: { xs: "0px", sm: "0px", md: "215px"}, display: "flex", flexDirection: "column", width: "95%", margin: "auto auto auto auto", borderRadius: "12px", fontFamily: "Montserrat", fontSize: "1.5rem",}}>
              <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
                  <Grid item xs={2} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd' }}>
                    <img style={{ borderRadius: '6px', maxHeight: '90%', maxWidth: '90%'}} src="https://image.shutterstock.com/image-vector/cartoon-character-jack-russell-terrier-260nw-579387331.jpg" />
                  </Grid>
                  <Grid item xs={10} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, borderBottom: '1px solid #ddd', pl: '.5rem', pb: '.5rem' }}>
                    <Typography variant="h6" sx={{ mt: "auto", color: "#11111199", fontSize: "1rem", fontFamily: "Montserrat", fontWeight: 700, textAlign: 'left' }}>
                      Luke W.
                    </Typography>
                    <Typography sx={{ textAlign: 'left' }}>
                      San Franciso, CA
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ pt: '.5rem' }}>
                    <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.5rem'},  pb: { xs: '0rem', sm: '0rem', md: '1rem' }, pt: { xs: '0rem', sm: '0rem', md: '1rem' }, borderTop: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, borderBottom: { xs: 'none', sm: 'none', md: '1px solid #ddd' }, mt: { xs: '0', sm: '0', md: '.75rem' }, fontFamily: 'Montserrat', letterSpacing: '0px', textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontWeight: 500, color: "#11111199", mb: { xs: ".25rem", sm: ".25rem", md: '1rem' }, lineHeight: 1.64, minHeight: { xs: '100px', sm: '100px', md: '175px'}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      “Finding hotels that will take our friendly pitbull Zoey has always been difficult. When we booked with Romingo, Zoey was welcomed and we had a great time” <br />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, mt: 'auto', color: '#f9c171' }}>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: { xs: 'left', sm: 'left', md: 'center'}, fontSize: '14px', fontWeight: 500 }}>
                    5 / 5 stars verified user
                  </Grid>
                </Grid>
              </Paper>
            </Carousel>
         </Grid>
        </Grid>
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
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
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
