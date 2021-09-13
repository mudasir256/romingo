import { FC } from "react";
import { CSSObject } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PetsIcon from "@mui/icons-material/Pets";
import SingleBedIcon from "@mui/icons-material/SingleBed";
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
          backgroundColor: "warning.main",
          color: "text.primary",
          borderRadius: 3,
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
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              justifyContent: { xs: "start", md: "center" },
              mt: 1,
            }}
          >
            <MoneyOffIcon
              sx={{
                fontSize: 20,
                mr: 0.75,
                mt: 0.125,
                color: "text.primary",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                mt: 0,
                color: "text.primary",
              }}
            >
              Waived pet fees
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              justifyContent: { xs: "start", md: "center" },
              mt: 1,
            }}
          >
            <PetsIcon
              sx={{
                fontSize: 18,
                mr: 0.75,
                mt: 0.125,
                color: "text.primary",
              }}
            />

            <Typography
              variant="body1"
              sx={{
                mt: 0,
                color: "text.primary",
              }}
            >
              All dogs up to 75lbs. welcomed
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              justifyContent: { xs: "start", md: "center" },
              mt: 1,
            }}
          >
            <RoomServiceIcon
              sx={{
                fontSize: 20,
                mr: 0.75,
                mt: 0.125,
                color: "text.primary",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                mt: 0,
                color: "text.primary",
              }}
            >
              Beds, bowls, and treats provided
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RomingoGuarantee;
