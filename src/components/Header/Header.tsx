import Box from "@material-ui/core/Box";
import { FC } from "react";
import { CSSObject } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import Navbar from "../Navbar";
import FilterBar from "../../components/FilterBar";

interface Props {
  sx?: CSSObject;
}

const Header: FC<Props> = ({ sx }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: {
          xs: 600,
          sm: 640,
          md: "100vh",
        },
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,
      }}
    >
      <Navbar />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100%",
        }}
      >
        <Box>
          <Box
            component="img"
            src="/images/people-2589544_1920.jpeg"
            alt="background"
            draggable="false"
            sx={{
              objectFit: "cover",
              width: "100%",
              height: { xs: 600, sm: 640, md: "100vh" },
              "& > img": { boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)" },
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            borderRadius: 5,
            zIndex: 100,
            pt: { xs: 2, md: 6 },
            pb: { xs: 0, md: 6 },
            px: 1,
            mx: 1,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: {
                xs: "2rem",
                sm: "3rem",
                md: "3.75rem",
              },
            }}
          >
            Goodbye Pet Fees
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "primary.light",
              textAlign: "center",
              fontSize: {
                xs: "1rem",
                sm: "1.25rem",
              },
              maxWidth: { xs: "100%", sm: "60%" },
              margin: "0 auto",
              mt: 1,
            }}
          >
            Book with Romingo and pay $0 pet fees at dog-friendly hotels
          </Typography>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              p: 2,
              pt: 2,
              mt: 2,
              borderRadius: 5,
            }}
          >
            <FilterBar
              sx={{
                width: "100%",
                margin: "0 auto",
                mb: 2,
                mt: { xs: 2, md: 0 },
                display: "flex",
                justifyContent: "center",
              }}
              zoomed
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
