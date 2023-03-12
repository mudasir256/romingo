import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import ImageSlider from "../ImageSlider";

const BookingDetailCard: FC = () => {
  // eslint-disable-next-line
  const details = useSelector((state: any) => state.searchReducer.search);
  const room = useSelector(
    // eslint-disable-next-line
    (state: any) => state.hotelCheckoutReducer?.checkout?.room?.room
  );

  return (
    <Box
      sx={{
        color: "text.primary",
        py: { xs: 0, sm: 0, md: 1 },
        mt: { xs: 0, sm: 0, md: '8.75rem' },
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
 
      <Box mt="0.75rem">
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
      </Box>
  
      <Box mb="1rem">
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
      </Box>

      <Box
        sx={{
          mt: 1,
        }}
      >
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
          {`${details.occupants.adults} Adults - ${details.occupants.children} Children - ${details.occupants.dogs} Dogs`}
        </Typography>
      </Box>
      <Box>
        <Box mb="1rem">
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
            {room?.name ? room.name : "Room"}
          </Typography>
        </Box>


        <ImageSlider
          images={room?.imageURLs}
          name={room?.name ? room.name : "Room"}
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            fontSize: "50px",
            borderRadius: "6px",
            minHeight: { xs: "200px", sm: "200px", md: "220px" },
            color: "#03989e",
          }}
        />
      </Box>
    </Box>
  );
};

export default BookingDetailCard;
