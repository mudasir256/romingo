import { FC } from "react";
import {
  CircularProgress,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Check } from "@mui/icons-material";
import ScrollToTop from "../../components/ScrollToTop";

const ListYourProperty: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Container sx={{ mt: 10, mb: 5 }}>
        <StepsContainer />
      </Container>
      <Footer />
    </>
  );
};

const StepsContainer: FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setSuccess(true);
      }, 2500);
    } else {
      setSuccess(false);
    }
  }, [loading]);

  useEffect(() => {
    if (success) {
      setTimeout(() => setLoading(false), 5000);
    }
  }, [success]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://paperform.co/__embed.min.js";
    document.body.appendChild(script);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          List your property on Romingo
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2, textAlign: "center", fontWeight: 500 }}
        >
          <b style={{ display: "block" }}>Welcome to Romingo!</b>
          Interested in listing your property on the pet-friendliest site on the
          web? <br /> Learn more about Romingo partnerships &amp; distribution
          by completing this brief form. Someone from our team will be in touch
          asap!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <hr
          style={{
            margin: "1rem auto 1rem auto",
            display: "block",
            border: "0px",
            height: "1px",
            width: "50%",
            background: "#ddd",
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{ margin: "0px auto 2rem auto" }}
        justifyContent="center"
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ padding: { xs: "0rem", sm: "0rem", md: "0rem 1rem" } }}
          >
            {loading && (
              <Grid
                sx={{
                  zIndex: 1401,
                  display: "flex",
                  position: "fixed",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#11111140",
                  backdropFilter: "blur(12px)",
                  top: "0px",
                  bottom: "0px",
                  left: "0px",
                  right: "0px",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    background: "#fff",
                    justifyContent: "center",
                    maxWidth: "300px",
                    height: "200px",
                    border: "1px solid #ccc",
                    textAlign: "center",
                    borderRadius: "8px",
                    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.15",
                    padding: "0rem 2rem",
                  }}
                >
                  {success ? (
                    <>
                      <Check sx={{ fontSize: "32px", mb: "1rem" }} />
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, maxWidth: "90%" }}
                      >
                        Great! You will be hearing from us shortly
                      </Typography>
                    </>
                  ) : (
                    <>
                      <CircularProgress
                        sx={{
                          fontSize: "16px",
                          mb: "1rem",
                          maxWidth: "32px",
                          maxHeight: "32px",
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: "90%", fontWeight: 500 }}
                      >
                        Submitting your request...
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>

        <div style={{ marginTop: "-1rem" }} data-paperform-id="i5uth4bp"></div>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Box
          component="img"
          src="https://storage.googleapis.com/romingo-development-public/images/front-end/form-header.jpeg"
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "90%",
            mt: { xs: 0, sm: 0, md: ".5rem" },
            borderRadius: 5,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ListYourProperty;
