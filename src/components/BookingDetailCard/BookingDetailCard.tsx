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
        py: 2,
        pb: { xs: "2rem", sm: "2rem" },
        px: { xs: "0rem", sm: "1rem" },
        borderBottom: "1px solid #ddd",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#222",
          textAlign: "left",
          mb: '1rem',
        }}
      >
        Booking Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          mb: '1rem'
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mt: 0,
              textTransform: "capitalize",
              color: "#222",
              textIndent: "-8px",
              paddingLeft: "8px",
              fontWeight: 600,
            }}
          >
            Check In
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
            {DateTime.fromISO(details.checkIn).toFormat("MMM dd, yyyy")}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              mt: 0,
              textTransform: "capitalize",
              color: "#222",
              textIndent: "-8px",
              paddingLeft: "8px",
              fontWeight: 600,
            }}
          >
            Check Out
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
            {DateTime.fromISO(details.checkOut).toFormat("MMM dd, yyyy")}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 1,
          mb: '1rem'
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mt: 0,
            textTransform: "capitalize",
            color: "#222",
            textIndent: "-8px",
            paddingLeft: "8px",
            fontWeight: 600,
          }}
        >
          Guests
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
      <Box
        sx={{
          mt: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mt: 0,
            textTransform: "capitalize",
            color: "#222",
            textIndent: "-8px",
            fontWeight: 600,
            paddingLeft: "8px",
          }}
        >
          Room Type
        </Typography>
        <Box mb="0.5rem">
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
