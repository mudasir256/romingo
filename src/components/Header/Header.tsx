import Box from "@material-ui/core/Box";
import { FC } from "react";
import { CSSObject } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
            src="/images/background.webp"
            alt="background"
            draggable="false"
            sx={{
              objectFit: "cover",
              width: "100%",
              height: { xs: 600, sm: 640, md: "100vh" },
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
            backgroundColor: "rgba(250, 250, 250, 0.95)",
            borderRadius: 1,
            boxShadow: 6,
            zIndex: 100,
            pt: 6,
            pb: { xs: 0, md: 6 },
            px: 1,
            mx: 1,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "primary.main",
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
              color: "text.secondary",
              textAlign: "center",
              fontSize: {
                xs: "1rem",
                sm: "1.25rem",
              },
              maxWidth: { xs: "100%", sm: "60%" },
              margin: "0 auto",
            }}
          >
            Book with Romingo and pay $0 on pet fees at the most dog-friendly
            hotels in the world
          </Typography>
          <FilterBar
            sx={{
              width: "100%",
              margin: "0 auto",
              mb: 2,
              mt: 4,
              display: "flex",
              justifyContent: "center",
            }}
            zoomed
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
