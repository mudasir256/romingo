import { FC } from "react";
import { CSSObject } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid"
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
          border: "1px solid #F9C171",
          borderRadius: 5,
          pt: 2,
          pb: 2.5,
          px: 2,
          mt: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "text.primary",
            textAlign: "center",
          }}
        >
          The Romingo Guarantee
        </Typography>
        <Box
          sx={{
            mt: 0.5,
            px: 0.5,
            mx: "auto",
          }}
        >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "bottom",
                justifyContent: "start",
                mt: 1,
              }}
            >
              <Icon
                sx={{
                  marginRight: "10px"
                }}
              >
                <img src="/images/icons/guarantee/no_pet_fees.svg" />
              </Icon>
              <Typography
                variant="body1"
                sx={{
                  mt: 0,
                  color: "text.primary",
                }}
              > 
                Zero pet fees
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "bottom",
                justifyContent: "start",
                mt: 1,
              }}
            >
              <Icon
                sx={{
                  marginRight: "10px"
                }}
              >
                <img src="/images/icons/guarantee/upto_2_dogs.svg" />
              </Icon>
              <Typography
                variant="body1"
                sx={{
                  mt: 0,
                  color: "text.primary",
                }}
              >
                Up to 2 dogs
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "bottom",
                justifyContent: "start",
                mt: 1,
              }}
            >
              <Icon
                sx={{
                  marginRight: "10px"
                }}
              >
                <img src="/images/icons/guarantee/75_lbs.svg" />
              </Icon>
              <Typography
                variant="body1"
                sx={{
                  mt: 0,
                  color: "text.primary",
                }}
              >
                75 lbs. each
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "bottom",
                justifyContent: "start",
                mt: 1,
              }}
            >
              <Icon
                sx={{
                  marginRight: "10px"
                }}
              >
                <img src="/images/icons/guarantee/beds_bowls_treats.svg" />
              </Icon>
              <Typography
                variant="body1"
                sx={{
                  mt: 0,
                  color: "text.primary",
                }}
              >
                Bed, bowl and treats included
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
