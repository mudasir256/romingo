import { FC } from "react";
import {
 Box,
 Grid,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";

const BookingDetailCard: FC = ({ roomImages }) => {
  // eslint-disable-next-line
  const details = useSelector((state: any) => state.searchReducer.search);
  const room = useSelector(
    // eslint-disable-next-line
    (state: any) => state.hotelCheckoutReducer?.checkout?.room?.Rooms.find(item => true)
  );

  return (
    <Box
      sx={{
        color: "text.primary",
        py: { xs: 0, sm: 0, md: 1 },
        pb: { xs: "1rem", sm: "1rem" },
        px: { xs: "0rem", sm: "1rem" },
        boxShadow: { xs: 0, sm: 0, md: 1 },
        borderRadius: 2
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "left",
        }}
      >
        Booking Details
      </Typography>

      <Grid container spacing={0.25}>
        <Grid xs={4} item>
          <Typography
            variant="base"
            sx={{
              color: "#222",
              textIndent: "-8px",
              fontWeight: 600,
            }}
          >
            Check-in:&nbsp;
          </Typography>
        </Grid>
        <Grid xs={5} item>
          <Typography
            variant="base"
            sx={{
              fontWeight: 500,
              mt: 0.5,
              color: "text.primary",
              opacity: 0.75,
          
            }}
          >
            {DateTime.fromISO(details.checkIn).toFormat("ccc, MMM dd")}
          </Typography>
        </Grid>
        <Grid xs={4} item>
          <Typography
            variant="base"
            sx={{
              mt: 0,
              color: "#222",
              textIndent: "-8px",
              fontWeight: 600,
            }}
          >
            Check-out:&nbsp;
          </Typography>
        </Grid>
        <Grid xs={5} item>
          <Typography
            variant="base"
            sx={{
              fontWeight: 500,
              mt: 0.5,
              textTransform: "capitalize",
              color: "text.primary",
              opacity: 0.75,
            }}
          >
            {DateTime.fromISO(details.checkOut).toFormat("ccc, MMM dd")}
          </Typography>
        </Grid>
        <Grid xs={4} item>
          <Typography
            variant="base"
          
            sx={{
              mt: 0,
              textTransform: "capitalize",
              color: "#222",
              textIndent: "-8px",
              fontWeight: 600,
            }}
          >
            Guests:&nbsp;
          </Typography>
        </Grid>

        <Grid xs={5} item>
          <Typography
            variant="base"
            sx={{
              fontWeight: 500,
              mt: 0.5,
              textTransform: "capitalize",
              opacity: 0.75,
              color: "text.primary",

            }}
          >
            {`${details.occupants.adults} Adults - ${details.occupants.children ?  `${details.occupants.children} Children -` : ''} ${details.occupants.dogs} Pets`}
          </Typography>
        </Grid>

        <Grid xs={4} item>
          <Typography
            variant="base"
            sx={{
              mt: 0,
              textTransform: "capitalize",
              color: "#222",
              textIndent: "-8px",
              fontWeight: 600,
            }}
          >
            Room Type:&nbsp;
          </Typography>
        </Grid>

        <Grid xs={5} item>
          <Typography
            variant="base"
            sx={{
              fontWeight: 500,
              mt: 0.5,
              textTransform: "capitalize",
              color: "text.primary",
              opacity: 0.75,
            }}
          >
            {room?.RoomName || room?.BedType || "Standard Room"}
          </Typography>
        </Grid>
      </Grid>

    </Box>
  );
};

export default BookingDetailCard;
