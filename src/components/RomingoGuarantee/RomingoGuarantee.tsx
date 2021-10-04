import { FC } from "react";
import { CSSObject } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import PetsIcon from "@mui/icons-material/Pets";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import RoomServiceIcon from "@mui/icons-material/RoomService";

interface Props {
  sx?: CSSObject;
}

const RomingoGuarantee: FC<Props> = ({ sx }) => {
  return (
    <Box sx={sx}>
      <Box
        sx={{
          color: "text.primary",
          backgroundColor: "#f2fdff",
          borderRadius: 3,
          pt: 2.5,
          pb: 2.5,
          px: 2,
          mt: 1,
          boxShadow: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            color: "primary.main",
          }}
        >
          The Romingo Guarantee
        </Typography>
        <Box
          sx={{
            mt: 0.5,
            px: 0.5,
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <Grid container spacing={2} sx={{ alignItems: "baseline" }}>
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "start", lg: "center" },
                  mt: 0.5,
                  mx: { xs: 0, md: 2, lg: 1 },
                }}
              >
                <Icon
                  sx={{
                    marginRight: "15px",
                  }}
                  fontSize="large"
                >
                  <img src="/images/icons/guarantee/no_pet_fees.svg" />
                </Icon>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 0,
                    fontSize: "100%",
                    maxWidth: "400px",
                    color: "text.primary",
                  }}
                >
                  Zero Pet Fees
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "start", lg: "center" },
                  mt: 0.5,
                  mx: { xs: 0, md: 2, lg: 0 },
                }}
              >
                <Icon
                  sx={{
                    marginRight: "15px",
                  }}
                  fontSize="large"
                >
                  <img src="/images/icons/guarantee/upto_2_dogs.svg" />
                </Icon>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 0,
                    fontSize: "100%",
                    color: "text.primary",
                    maxWidth: "400px",
                  }}
                >
                  Up to 2 Dogs
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "start", lg: "center" },
                  mt: 0.5,
                  mx: { xs: 0, md: 2, lg: 1 },
                }}
              >
                <Icon
                  sx={{
                    marginRight: "15px",
                  }}
                  fontSize="large"
                >
                  <img src="/images/icons/guarantee/75_lbs.svg" />
                </Icon>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 0,
                    fontSize: "100%",
                    color: "text.primary",
                    maxWidth: "400px",
                  }}
                >
                  75 Lbs. Each
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "start", lg: "center" },
                  mt: 0.5,
                  mx: { xs: 0, md: 2, lg: 1 },
                }}
              >
                <Icon
                  sx={{
                    marginRight: "15px",
                  }}
                  fontSize="large"
                >
                  <img src="/images/icons/guarantee/beds_bowls_treats.svg" />
                </Icon>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 0,
                    fontSize: "100%",
                    color: "text.primary",
                    maxWidth: "400px",
                  }}
                >
                  Bed, Bowl &amp; Treats Provided
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default RomingoGuarantee;
