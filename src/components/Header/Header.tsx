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
          sm: 640
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
              height: { xs: 600, sm: 640 },
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
            width: {
              lg: "70%",
              md: "85%",
              sm: "90%",
              xs: "90%"
            },
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "10px",
            padding: "10px",
            zIndex: 100
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "secondary.main",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: {
                xs: "2rem",
                sm: "3rem",
                md: "3.75rem"
              }
            }}
          >
            Goodbye Pet Fees
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mt: 1,
              color: "text.primary",
              textAlign: "center",
              fontSize: {
                xs: "1rem",
                sm: "1.5rem"
              },
              width: {
                md: "70%",
                sm: "90%"
              },
              margin: "0 auto"
            }}
          >
            Book with Romingo and pay $0 on pet fees at the most dog-friendly hotels in the world
          </Typography>
          <FilterBar 
            sx={{
              width: "100%",
              margin: "0 auto",
              my: 1,
              display: "flex",
              justifyContent: "center"
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
