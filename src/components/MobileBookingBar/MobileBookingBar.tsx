import { FC, useState, MouseEventHandler, useEffect } from "react";
import { CSSObject } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Dispatch } from "redux";
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
import { RoomInfo } from "../../components/RoomCard/RoomCard";
import { setCheckout } from "../../store/hotelCheckoutReducer";
import { saveSearch } from "../../store/searchReducer";

interface Props {
  sx?: CSSObject;
  roomList: {
    value: number;
    description: string;
    room: RoomInfo;
  }[];
}

const MobileBookingBar: FC<Props> = ({ sx, roomList }) => {
  const history = useHistory();
  const [roomType, setRoomType] = useState("0");

  const search = useSelector(
    // eslint-disable-next-line
    (state: any) => state.searchReducer.search,
    shallowEqual
  );

  const [value, setValue] = useState<RangeInput<Date | null>>([
    search.checkIn ? search.checkIn : null,
    search.checkOut ? search.checkOut : null,
  ]);

  const occupants = { ...search.occupants };

  // eslint-disable-next-line
  const dispatch: Dispatch<any> = useDispatch();

  const [selectedRoom, setSelectedRoom] = useState<{
    value: number;
    description: string;
    room: RoomInfo;
  }>(roomList[0]);

  const [showPopup, setShowPopup] = useState(false);

  const handleClick: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    for (let i = 0; i < roomList.length; i++) {
      if (roomList[i].value === parseInt(roomType)) {
        setSelectedRoom(roomList[i]);
      }
    }
  }, [roomType]);

  const handleBook: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      setCheckout({
        room: selectedRoom,
      })
    );
    history.push("/checkout");
  };

  const handleRoomChange = (roomValue: string) => {
    setRoomType(roomValue);
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
    dispatch(
      saveSearch({
        ...search,
        occupants: occupantsValue,
        checkIn: dateRange[0] && new Date(dateRange[0]).toISOString(),
        checkOut: dateRange[1] && new Date(dateRange[1]).toISOString(),
      })
    );
    // setShowPopup(false);
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
        borderTop: "1px solid #ddd",
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
              py: 1.5,
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
                  fontWeight: 600,
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
            <Box sx={{ mt: 0.5 }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "1rem",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  fontWeight: 600,
                }}
              >
                ${selectedRoom?.room?.averagePrice.toFixed(2)}
                <Typography
                  variant="body1"
                  sx={{
                    ml: 0.25,
                    fontSize: ".9rem",
                    fontWeight: 500,
                    display: "inline-block",
                    textTransform: "none",
                  }}
                >
                  / night
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              disableElevation
              variant="contained"
              color="primary"
              sx={{
                mr: ".5rem",
                height: "3rem",
                whiteSpace: "nowrap",
                minWidth: "150px",
                py: "1rem",
              }}
            >
              <Box onClick={handleBook}>
                <Typography
                  variant="h5"
                  sx={{
                    display: "inline-block",
                    my: 0,
                    fontSize: "100%",
                    fontWeight: 600,
                  }}
                >
                  Reserve Now
                </Typography>
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
            Edit Booking Variables
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
            size="large">
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
            pricePerNight={selectedRoom?.room?.averagePrice}
            handleClose={handleClose}
            handleRoomChange={handleRoomChange}
          ></MobileBookingForm>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MobileBookingBar;
