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
          xs: 620,
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
        <Box
          component="img"
          src="/images/Adobe_6.jpeg"
          alt="background"
          draggable="false"
          sx={{
            objectFit: "cover",
            width: "100%",
            height: { xs: 620, md: "100vh" },
          }}
        />
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
            borderRadius: { xs: 0, md: 10 },
            zIndex: 100,
            backgroundColor: "#eceff1D9",
            maxWidth: { xs: "100%", md: "90%", xl: "80%" },
            pt: { xs: 2, md: 3.5 },
            pb: { xs: 0, md: 3.5 },
            px: { xs: 0, md: 5 },
            mx: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "primary.main",
              textAlign: "center",
              fontSize: { xs: "3rem", md: "6rem" },
            }}
          >
            Goodbye Pet Fees
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              fontSize: { xs: "1.5rem", md: "3rem" },
              margin: "0 auto",
              px: 2,
              mt: 1,
            }}
          >
            Book with Romingo and pay $0 pet fees at dog-friendly hotels
          </Typography>
          <Box
            sx={{
              maxWidth: "830px",
              margin: "0 auto",
              backgroundColor: "white",
              py: { xs: 0, md: 1.75 },
              mt: { xs: 2, md: 4 },
              borderRadius: { xs: 1, md: 25 },
              boxShadow: 5,
            }}
          >
            <FilterBar
              sx={{
                width: "100%",
                margin: "0 auto",
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
