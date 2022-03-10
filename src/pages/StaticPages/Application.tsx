import { FC } from "react";
import { Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

const Application: FC = () => {
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
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{ margin: "0px auto 2rem auto" }}
        justifyContent="center"
      >
        <div style={{ marginTop: "-1rem" }} data-paperform-id="f0uprxbv"></div>
      </Grid>
    </Grid>
  );
};

export default Application;
