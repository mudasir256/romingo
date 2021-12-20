import { FC } from "react";
import { Container, Divider, Grid, Typography } from "@mui/material";
import { Widget } from "@typeform/embed-react";
import { useEffect } from 'react'
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useWindowSize from "../../hooks/UseWindowSize";

import ScrollToTop from "../../components/ScrollToTop";

const ListYourProperty: FC = () => {
  const { height } = useWindowSize()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Container sx={{ mt: 10, mb: 5 }}>
        <Widget id="zdVrRtxT" style={{ display: 'block', padding: 0, cursor: "pointer", margin: 0, width: '100%', height: `${height-160}px`}} />
      </Container>
      <Footer />
    </>
  );
};

export default ListYourProperty;
