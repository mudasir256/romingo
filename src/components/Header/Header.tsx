import Box from "@mui/material/Box";
import { FC } from "react";
import { CSSObject } from "@mui/material";
import Typography from "@mui/material/Typography";

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
        ...sx,
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
          sx={{
            objectFit: "cover",
            width: "100%",
            height: { xs: 620, md: "100vh" },
            position: "relative",
            "&::before": {
              content: '""',
              backgroundImage: `url("/images/test3.jpeg")`,
              opacity: 0.85,
              backgroundSize: "cover",
              position: "absolute",
              backgroundPosition: "center",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            borderRadius: { xs: 0, md: 3 },
            zIndex: 100,
            backgroundColor: "rgba(255,255,255, .8)",
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
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            Welcome to Dog Friendly Travel
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              fontSize: { xs: "1.25rem", md: "2rem" },
              margin: "0 auto",
              px: 2,
              mt: 1,
            }}
          >
            Book dog friendly hotels with Romingo and pay $0 in pet fees
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
              home={true}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
