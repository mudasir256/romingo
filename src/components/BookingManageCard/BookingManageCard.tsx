import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FC } from "react";
import { CSSObject } from "@mui/material";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import { Occupant } from "../OccupantSelector/OccupantSelector";

export interface BookingCardProps {
  image: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  occupants: Occupant;
  roomType: string;
  confirmId: string;
  status: string;
  boxShadow?: number;
  sx?: CSSObject;
}

const BookingManageCard: FC<BookingCardProps> = ({
  image,
  name,
  location,
  checkIn,
  checkOut,
  occupants,
  roomType,
  confirmId,
  status,
  boxShadow = 4,
  sx,
  ...props
}) => {
  let mobileCardPadding = 1.8;
  if (boxShadow === 0) {
    mobileCardPadding = 0;
  }
  return (
    <Box
      sx={{
        color: "text.primary",
        display: "flex",
        borderRadius: 3,
        boxShadow,
        flexDirection: { xs: "column", sm: "row" },
        maxWidth: "100%",
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          draggable="false"
          sx={{
            objectFit: "cover",
            maxWidth: { sm: 280, xs: 100 },
            maxHeight: { xs: 180, sm: "100%" },
            borderRadius: 3,
            boxShadow: 0,
          }}
        />
        <Hidden smUp>
          <Box
            sx={{
              mt: 1,
              px: 1,
              textAlign: "right",
            }}
          >
            <Typography variant="body2">Status</Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
              }}
            >
              {status}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              px: 1,
              textAlign: "right",
            }}
          >
            <Typography variant="body2">Confirmation #</Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
              }}
            >
              {confirmId}
            </Typography>
          </Box>
        </Hidden>
      </Box>
      <Box
        sx={{
          pt: 1.8,
          px: { xs: mobileCardPadding, sm: 1.8 },
          pb: { xs: mobileCardPadding, sm: 1.8 },
          flex: 1,
          minWidth: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>

        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "95%", sm: "100%" },
              mt: 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {location}
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 1,
              px: {
                sm: 1,
                xs: 0,
              },
            }}
          >
            <Box
              sx={{
                mr: 1,
              }}
            >
              <Typography variant="body2">Check In</Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  mt: 0.5,
                }}
              >
                {checkIn}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  mt: 0,
                }}
              >
                Check Out
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  mt: 0.5,
                }}
              >
                {checkOut}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 1,
              px: {
                sm: 1,
                xs: 0,
              },
            }}
          >
            <Typography variant="body2">Guests</Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
              }}
            >
              {`${occupants.adults} Adults - ${occupants.children} Children - ${occupants.dogs} Dogs`}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              px: {
                sm: 1,
                xs: 0,
              },
            }}
          >
            <Typography variant="body2">Room Type</Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
              }}
            >
              {roomType ? roomType : "Room"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          pt: 1.8,
          px: { xs: mobileCardPadding, sm: 1.8 },
          pb: { xs: mobileCardPadding, sm: 1.8 },
          display: "grid",
        }}
      >
        <Hidden smDown>
          <Box
            sx={{
              px: {
                sm: 1,
                xs: 0,
              },
              textAlign: "right",
            }}
          >
            <Typography variant="body2">Confirmation #</Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
              }}
            >
              {confirmId}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              px: {
                sm: 1,
                xs: 0,
              },
              textAlign: "right",
            }}
          >
            <Typography variant="body2">Status</Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
              }}
            >
              {status}
            </Typography>
          </Box>
        </Hidden>
        <Box
          sx={{
            px: 1,
            margin: "auto",
          }}
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
          >
            <Typography variant="h6">Manage Booking</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingManageCard;
