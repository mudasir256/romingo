import Box from "@material-ui/core/Box";
import { FC } from "react";
import { CSSObject } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Header from "../../components/Header";

interface Props {
  sx?: CSSObject;
  nearCities: {
    img: string;
    city: string;
    state: string;
  }[];
}

const HomePage: FC<Props> = ({ sx, nearCities }) => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Grid container sx={{ py: 6 }}>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: {
                  xs: "1.5rem",
                  sm: "2.5rem",
                  md: "3rem",
                },
              }}
            >
              Seriously, No Pet Fees?
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: {
                  xs: "1rem",
                  sm: "1.5rem",
                },
                textAlign: "center",
                mb: 5,
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
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: "secondary.main",
                        textAlign: "center",
                        fontSize: {
                          md: "1.2rem",
                          sm: "1rem",
                        },
                      }}
                    >
                      We partner with dog friendly hotels
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        fontSize: {
                          md: "1rem",
                          sm: "0.875rem",
                        },
                      }}
                    >
                      Lorem ipsum dolor sit amet et delectus accommodare his
                      consul copiosae legendos at vix ad putent delectus
                      delicata usu. Vidit dissentiet eos cu eum an brute
                      copiosae hendrerit. Eos erant dolorum an. Per facer affert
                      ut.
                      <br />
                      Dicat falli consulatu at vis. Te facilisis mnesarchum qui
                      posse omnium mediocritatem est cu. Modus argumentum ne qui
                      tation efficiendi in eos. Ei orem ipsum dolor sit amet et
                      delectus accommodare his consul copiosae legendos at
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
                    src={
                      "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium"
                    }
                    alt="background"
                    draggable="false"
                    sx={{
                      width: "100%",
                      borderRadius: 1,
                      boxShadow: 4,
                      margin: "auto 0",
                    }}
                  ></Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={{ sm: 3, md: 5 }} sx={{ pt: 6 }}>
              <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <Box
                    component="img"
                    src={
                      "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium"
                    }
                    alt="background"
                    draggable="false"
                    sx={{
                      width: "100%",
                      borderRadius: 1,
                      boxShadow: 4,
                      margin: "auto 0",
                    }}
                  ></Box>
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
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: "secondary.main",
                        textAlign: "center",
                        fontSize: {
                          md: "1.2rem",
                          sm: "1rem",
                        },
                      }}
                    >
                      And pass the savings onto you
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        fontSize: {
                          md: "1rem",
                          sm: "0.875rem",
                        },
                      }}
                    >
                      Lorem ipsum dolor sit amet et delectus accommodare his
                      consul copiosae legendos at vix ad putent delectus
                      delicata usu. Vidit dissentiet eos cu eum an brute
                      copiosae hendrerit. Eos erant dolorum an. Per facer affert
                      ut.
                      <br />
                      Dicat falli consulatu at vis. Te facilisis mnesarchum qui
                      posse omnium mediocritatem est cu. Modus argumentum ne qui
                      tation efficiendi in eos. Ei orem ipsum dolor sit amet et
                      delectus accommodare his consul copiosae legendos at
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            backgroundColor: "#fafafa",
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
                variant="body1"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "2.5rem",
                    md: "3rem",
                  },
                }}
              >
                Explore a Romingo City
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.5rem",
                  },
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
                {nearCities.map((nearCity, key) => {
                  return (
                    <Grid item xs={12} sm={6} lg={3} key={key}>
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
                              border: "1px solid #DDDDDD",
                              borderRadius: 1,
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
                                borderRadius: 1,
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                mt: 2,
                                textAlign: "center",
                                textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              {nearCity.city}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                textAlign: "center",
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
      </Container>
    </>
  );
};

export default HomePage;
