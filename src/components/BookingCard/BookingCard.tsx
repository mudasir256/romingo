import { FC, useState, MouseEventHandler, useEffect } from "react";
import { CSSObject } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import OccupantSelector, { Occupant, } from "../OccupantSelector/OccupantSelector";
import Link from "@mui/material/Link";
import { RoomInfo } from "../../components/RoomCard/RoomCard";
import { setCheckout } from "../../store/hotelCheckoutReducer";
import { ArrowDownward } from '@mui/icons-material'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { saveSearch } from "../../store/searchReducer";
import RomingoGuarantee from "../../components/RomingoGuarantee"

interface Props {
  sx?: CSSObject;
  roomList: {
    value: number;
    description: string;
    room: RoomInfo;
  }[];
  goToRate?: () => void;
}

const BookingCard: FC<Props> = ({ sx, roomList, goToRate }) => {
  const history = useHistory();
  const [roomType, setRoomType] = useState("0");
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [isTextField, setIsTextField] = useState(false);
  // eslint-disable-next-line
  const dispatch: Dispatch<any> = useDispatch();

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

  const search = useSelector(
    // eslint-disable-next-line
    (state: any) => state.searchReducer.search,
    shallowEqual
  );

  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([
    search.checkIn ? search.checkIn : null,
    search.checkOut ? search.checkOut : null,
  ]);

  const [occupants, setOccupants] = useState(search.occupants);

  const onOccupantChange = (value: Occupant) => {
    setOccupants(value);
  };

  const handleOccupantsClose = () => {
    dispatch(saveSearch({ ...search, occupants }));
  };

  const [selectedRoom, setSelectedRoom] = useState<{
    value: number;
    description: string;
    room: RoomInfo;
  }>(roomList[0]);

  useEffect(() => {
    for (let i = 0; i < roomList.length; i++) {
      if (roomList[i].value === parseInt(roomType)) {
        setSelectedRoom(roomList[i]);
      }
    }
  }, [roomType]);

  useEffect(() => {
    if (
      checkDate[0] &&
      new Date(checkDate[0]) >=
        new Date(new Date().setDate(new Date().getDate() - 1)) &&
      checkDate[1] &&
      new Date(checkDate[1]) >= new Date()
    ) {
      dispatch(
        saveSearch({
          ...search,
          checkIn: checkDate[0] && new Date(checkDate[0]).toISOString(),
          checkOut: checkDate[1] && new Date(checkDate[1]).toISOString(),
        })
      );
    }
  }, [checkDate]);

  return <Grid sx={{ position: 'sticky', top: '2rem', width: '95%', ml: 'auto'}}>
    <Box sx={{ ...sx, borderRadius: 2, boxShadow: 3, p: '1rem',}}>
      {/* <Box sx={{ display: "flex", mb: '1rem', alignItems: "center", justifyContent: 'space-between', pb: '1rem'}}>
        <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: 'Montserrat' }}>
          ${selectedRoom?.room?.averagePrice.toFixed(2)}  <span style={{fontSize: '16px', fontWeight: 500}}>/ night</span>
        </Typography>
        <Button disableElevation onClick={handleBook} variant="contained" size="small" color="primary" sx={{ ml: 'auto', py: '.75rem', px: '2rem' }}>
          <Typography variant="body2" sx={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Book Now</Typography>
        </Button>
      </Box> */}

      <Grid container spacing={2}>
        <Grid item xs={12}>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              open={open}
              startText="Check-in"
              endText="Check-out"
              calendars={1}
              onAccept={() => {
                setIsAccept(true);
              }}
              onChange={(newValue) => {
                setCheckDate(newValue);
              }}
              onClose={() => {
                setIsAccept(false);
                if (!isTextField) {
                  setOpen(false);
                  setIsTextField(false);
                }
              }}
              onOpen={() => {
                if (!isAccept) {
                  setOpen(true);
                }
              }}
              value={checkDate}
              minDate={new Date()}
              renderInput={(startProps, endProps) => (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField sx={{ input: { fontWeight: 500 } }} size='small'{...startProps} InputLabelProps={{ style: { fontWeight: 500 }}} onFocus={() => { setIsTextField(true); }} onBlur={() => { setIsTextField(false); }} fullWidth={true} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField sx={{ input: { fontWeight: 500 } }} InputLabelProps={{ style: { fontWeight: 500 }}} size='small' {...endProps} onFocus={() => { setIsTextField(true); }} onBlur={() => { setIsTextField(false); }} fullWidth={true} />
                  </Grid>
                </Grid>
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <OccupantSelector size="small" value={occupants} onChange={(value) => { onOccupantChange(value); }} onClose={handleOccupantsClose} />
        </Grid>
        <Grid item xs={12}>
          <Link href='#rooms' sx={{ textDecoration: 'none' }}>
            <Button disableElevation fullWidth  variant='contained' sx={{ fontFamily: "Montserrat", fontWeight: 600, mb: '0rem', display: { md: 'flex', xs: 'none' }}}> Select a room </Button>
          </Link>
        </Grid>
        {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Room Type</InputLabel>
            <Select size="small" value={roomType} onChange={(e) => { setRoomType(e.target.value); }} label="Room Type">
              {roomList.map((room, key) => {
                return (
                  <MenuItem value={room.value} key={key}>
                    {room?.description.length > 0 ? room.description : "Room"}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid> */}
      </Grid>
      {/* <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
        <Link href="#rooms" >
          <Typography variant="body1" sx={{ fontSize: '1rem', mt: 2, display: 'flex', alignItems: 'center' }}>
            Go To Rooms &amp; Rates <ArrowDownward sx={{ ml: '.5rem', fontSize: '1rem' }} />
          </Typography>
        </Link>
      </Box> */}
    </Box>
    {/* <RomingoGuarantee sx={{ mt: 5 }} /> */}
  </Grid>
};

export default BookingCard;
