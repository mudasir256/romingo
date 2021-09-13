import { FC, useState, MouseEventHandler } from "react";
import { CSSObject } from "@mui/material";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import MobileBookingForm from "./MobileBookingForm";

interface Props {
  sx?: CSSObject;
  roomList: {
    value: number;
    description: string;
  }[];
}

const MobileBookingBar: FC<Props> = ({ sx, roomList }) => {
  const history = useHistory();
  const [value, setValue] = useState<RangeInput<Date | null>>([null, null]);
  const [roomType, setRoomType] = useState("0");
  const [occupants, setOccupants] = useState({
    adults: 2,
    children: 0,
    dogs: 1,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleClick: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleBook: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push("/checkout");
  };

  const handleChange = (
    roomValue: string,
    dateRange: RangeInput<Date | null>,
    occupantsValue: {
      adults: number;
      children: number;
      dogs: number;
    }
  ) => {
    setValue(dateRange);
    setRoomType(roomValue);
    setOccupants(occupantsValue);
    setShowPopup(false);
  };

  const dateToString = (isoString: string | Date | number) => {
    const date = new Date(isoString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <Box
      sx={{
        ...sx,
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        boxShadow: 6,
        backgroundColor: "white",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            onClick={handleClick}
            sx={{
              py: 1.25,
              px: 1.25,
              display: "flex",
              flexDirection: "column",
              minWidth: "100px",
              cursor: "pointer",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "80%",
                  color: "text.secondary",
                  textDecoration: "underline",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {value[0] ? dateToString(value[0]) : "07/22/2021"} -{" "}
                {value[1] ? dateToString(value[1]) : "07/24/2021"}
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 0.5,
              }}
            >
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "85%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {roomList[parseInt(roomType)].description}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                height: "100%",
                whiteSpace: "nowrap",
                minWidth: "150px",
                py: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                boxShadow: 6,
                lineHeight: 1.35,
              }}
            >
              <Box onClick={handleBook}>
                <Typography
                  variant="h5"
                  sx={{
                    display: "inline-block",
                    my: 0,
                    fontSize: "125%",
                  }}
                >
                  Book Now
                </Typography>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "inline-block",
                      my: 0,
                      lineHeight: 0,
                    }}
                  >
                    $139.99
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      ml: 0.25,
                      fontSize: "75%",
                      display: "inline-block",
                      textTransform: "none",
                    }}
                  >
                    / night
                  </Typography>
                </Box>
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={showPopup}
        keepMounted
        fullWidth
        fullScreen
        onClose={handleClose}
        scroll="body"
        aria-labelledby="booking-dialog-slide-title"
        aria-describedby="booking-dialog-slide-description"
        sx={{
          height: "auto",
          width: "100%",
          position: "fixed",
          bottom: 0,
          top: "auto",
          alignItems: "end",
        }}
      >
        <DialogTitle
          id="booking-dialog-slide-title"
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h5" color="primary">
            Edit Your Booking
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            p: 0,
          }}
        >
          <MobileBookingForm
            roomList={roomList}
            handleChange={handleChange}
            initialValue={{
              value,
              roomType,
              occupants,
            }}
          ></MobileBookingForm>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MobileBookingBar;
