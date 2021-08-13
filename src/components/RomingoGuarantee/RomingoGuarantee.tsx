import { FC } from "react";
import { CSSObject } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PetsIcon from "@material-ui/icons/Pets";
import SingleBedIcon from "@material-ui/icons/SingleBed";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import RoomServiceIcon from "@material-ui/icons/RoomService";

interface Props {
  sx?: CSSObject;
}

const RomingoGuarantee: FC<Props> = ({ sx }) => {
  return (
    <Box sx={sx}>
      <Box
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          borderRadius: 1,
          border: "1px solid #DDD",
          pt: 2,
          pb: 2.5,
          px: 2,
          mt: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "85%", sm: "100%" },
          }}
        >
          The Romingo Guarantee
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "light",
            fontSize: "80%",
            mt: 0.3,
            color: "text.primary",
            textAlign: "center",
          }}
        >
          Rooms booked through Romingo always include:
        </Typography>
        <Box
          sx={{
            mt: 0.5,
            px: 0.5,
            width: "260px",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              justifyContent: "start",
              mt: 1,
            }}
          >
            <MoneyOffIcon
              sx={{
                fontSize: 20,
                mr: 0.75,
                mt: 0.125,
                color: "secondary.main",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontWeight: "light",
                mt: 0,
                color: "text.light",
                fontSize: { xs: "85%", sm: "100%" },
              }}
            >
              Zero pet fees for up to 2 dogs
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              justifyContent: "start",
              mt: 1,
            }}
          >
            <PetsIcon
              sx={{
                fontSize: 18,
                mr: 0.75,
                mt: 0.125,
                color: "secondary.main",
              }}
            />

            <Typography
              variant="body1"
              sx={{
                fontWeight: "light",
                mt: 0,
                color: "text.light",
                fontSize: { xs: "85%", sm: "100%" },
              }}
            >
              75 lb weight limit per dog
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              justifyContent: "start",
              mt: 1,
            }}
          >
            <SingleBedIcon
              sx={{
                fontSize: 20,
                mr: 0.75,
                mt: 0.125,
                color: "secondary.main",
              }}
            />

            <Typography
              variant="body1"
              sx={{
                fontWeight: "light",
                mt: 0,
                color: "text.light",
                fontSize: { xs: "85%", sm: "100%" },
              }}
            >
              Pet bedding in your room
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              mt: 1,
            }}
          >
            <RoomServiceIcon
              sx={{
                fontSize: 20,
                mr: 0.75,
                mt: 0.125,
                color: "secondary.main",
              }}
            />

            <Typography
              variant="body1"
              sx={{
                fontWeight: "light",
                mt: 0,
                color: "text.light",
                fontSize: { xs: "85%", sm: "100%" },
              }}
            >
              Food &amp; water bowls provided
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RomingoGuarantee;
