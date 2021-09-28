import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

interface Props {
  details: {
    checkIn: string;
    checkOut: string;
    occupants: {
      adults: number;
      dogs: number;
      children: number;
    };
    roomType: string;
  };
}

const BookingDetailCard: FC = () => {

  const details = useSelector((state: any) => state.searchReducer.search);

  const roomType = useSelector((state: any) => state.hotelCheckoutReducer.checkout.room.room.type);

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
            {details.checkIn.substring(0, 10)}
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
            {details.checkOut.substring(0, 10)}
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
          {roomType}
        </Typography>
      </Box>
    </Box>
  );
};

export default BookingDetailCard;
