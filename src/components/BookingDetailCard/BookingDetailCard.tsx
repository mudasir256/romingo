import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { DateTime } from 'luxon'

// interface Props {
//   details: {
//     checkIn: string;
//     checkOut: string;
//     occupants: {
//       adults: number;
//       dogs: number;
//       children: number;
//     };
//     roomType: string;
//   };
// }

const BookingDetailCard: FC = () => {
  // eslint-disable-next-line
  const details = useSelector((state: any) => state.searchReducer.search);

  const roomType = useSelector(
    // eslint-disable-next-line
    (state: any) => state.hotelCheckoutReducer?.checkout?.room?.room?.type
  );

  return (
    <Box sx={{
        color: "text.primary",
        py: 2,
        pb: { xs: '2rem', sm: '2rem' },
        px: { xs: '0rem', sm: '1rem' },
        borderBottom: '1px solid #ddd'
      }}
    >
      <Typography variant="h6"
        sx={{
          color: "#222",
          fontFamily: 'Montserrat',
          textAlign: "left",
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
              color: "#222",
              textIndent: "-8px",
              paddingLeft: "8px",
              fontFamily: "Montserrat",
              fontWeight: 600,
            }}
          >
            Check In
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              mt: 0.5,
              textTransform: "capitalize",
              color: "text.primary",
              opacity: .75,
              textIndent: "-8px",
              paddingLeft: "8px",
              fontFamily: "Roboto",
            }}
          >
            {DateTime.fromISO(details.checkIn).toFormat('MMM dd, yyyy')}
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
              fontFamily: "Montserrat",
              fontWeight: 600,
            }}
          >
            Check Out
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              mt: 0.5,
              textTransform: "capitalize",
              color: "text.primary",
              opacity: .75,
              textIndent: "-8px",
              fontFamily: "Roboto",
              paddingLeft: "8px",
            }}
          >
            {DateTime.fromISO(details.checkOut).toFormat('MMM dd, yyyy')}
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
            color: "#222",
            textIndent: "-8px",
            paddingLeft: "8px",
            fontFamily: "Montserrat",
            fontWeight: 600,
          }}
        >
          Guests
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            mt: 0.5,
            textTransform: "capitalize",
            opacity: .75,
            color: "text.primary",
            textIndent: "-8px",
            paddingLeft: "8px",
            fontFamily: "Roboto",
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
            fontFamily: "Montserrat",
            fontWeight: 600,
            paddingLeft: "8px",
          }}
        >
          Room Type
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            mt: 0.5,
            textTransform: "capitalize",
            color: "text.primary",
            opacity: .75,
            textIndent: "-8px",
            paddingLeft: "8px",
            fontFamily: "Roboto",
          }}
        >
          {roomType ? roomType : "Room"}
        </Typography>
      </Box>
    </Box>
  );
};

export default BookingDetailCard;
