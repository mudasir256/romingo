import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

interface Props {
  details: {
    checkIn: string;
    checkOut: string;
    guests: {
      adults: number;
      dogs: number;
      children: number;
    };
    roomType: string;
  };
}

const BookingDetailCard: FC<Props> = ({ details }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderRadius: 3,
        boxShadow: 4,
        py: 2,
        px: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "secondary.main",
          textAlign: "center",
          mb: 1,
        }}
      >
        Booking Details
      </Typography>
      <Box
        sx={{
          display: "flex",
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
              color: "text.primary",
              textIndent: "-8px",
              paddingLeft: "8px",
            }}
          >
            Check In
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              mt: 0.5,
              textTransform: "capitalize",
              color: "text.primary",
              textIndent: "-8px",
              paddingLeft: "8px",
            }}
          >
            {details.checkIn}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              mt: 0,
              textTransform: "capitalize",
              color: "text.primary",
              textIndent: "-8px",
              paddingLeft: "8px",
            }}
          >
            Check Out
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              mt: 0.5,
              textTransform: "capitalize",
              color: "text.primary",
              textIndent: "-8px",
              paddingLeft: "8px",
            }}
          >
            {details.checkOut}
          </Typography>
        </Box>
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
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
          }}
        >
          Guests
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            mt: 0.5,
            textTransform: "capitalize",
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
          }}
        >
          {`${details.guests.adults} Adults - ${details.guests.children} Children - ${details.guests.dogs} Dogs`}
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
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
          }}
        >
          Room Type
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            mt: 0.5,
            textTransform: "capitalize",
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
          }}
        >
          {details.roomType}
        </Typography>
      </Box>
    </Box>
  );
};

export default BookingDetailCard;
