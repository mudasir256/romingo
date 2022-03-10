import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import { FC, useEffect } from "react";
import { Container, Divider, Grid, Typography, Link } from "@mui/material";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";
import { ChatBubble, Email, Send } from "@mui/icons-material";

const Contact: FC = () => {
  const startChat = () => {
    window.Intercom("boot", {
      app_id: "qa6datd3",
    });
    window.Intercom("update");
    window.Intercom("show");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://paperform.co/__embed.min.js";
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2" color="text.primary" sx={{ mt: 2 }}>
            Contact Us
          </Typography>
        </Box>
        <Divider variant="middle" light sx={{ my: 2 }}>
          <Typography variant="body1" color="text.secondary">
            We&apos;re always here to help
          </Typography>
        </Divider>
        <>
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 6,
            }}
          >
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "justify", lineHeight: 2 }}
              >
                Our support team is here for you 24/7! Please get in touch with
                us using one of the below methods. If you require immediate
                assistance, we recommend using our chat feature.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                mt: 4,
                mb: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Link href="mailto:hello@romingo.com" target="_blank">
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{
                    mb: ".5rem",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Email sx={{ mb: "1rem" }} />
                  Email us
                </Typography>
              </Link>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                hello@romingo.com
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ mt: 4, mb: 8, textAlign: "center" }}
            >
              <Link
                onClick={() =>
                  window.scrollTo({ top: 500, left: 0, behavior: "smooth" })
                }
              >
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{
                    mb: ".5rem",
                    cursor: "pointer",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Send sx={{ mb: "1rem" }} />
                  Contact us
                </Typography>
              </Link>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                Please complete the form below
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ mt: 4, mb: 8 }}>
              <Link href="#" onClick={startChat}>
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{
                    mb: ".5rem",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <ChatBubble sx={{ mb: ".5rem" }} />
                  Start a Chat
                </Typography>
              </Link>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                During business hours
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div data-paperform-id="5rnusmd7"></div>
            </Grid>
            <Hidden mdDown>
              <Box
                component="img"
                src="https://storage.googleapis.com/romingo-development-public/images/front-end/romingo_ball.jpeg"
                alt={"Romingo Tennis Ball"}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  height: "350px",
                  borderRadius: 5,
                }}
              />
            </Hidden>
          </Grid>
        </>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
