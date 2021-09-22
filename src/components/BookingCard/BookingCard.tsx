import { FC, useState, MouseEventHandler, useEffect } from "react";
import { CSSObject } from "@mui/material";
import { useHistory } from "react-router-dom";
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
import OccupantSelector, {
  Occupant,
} from "../OccupantSelector/OccupantSelector";
import Link from "@mui/material/Link";

import {
  useSelector,
  shallowEqual,
} from "react-redux";
import { Dispatch } from "redux";

interface Props {
  sx?: CSSObject;
  roomList: {
    value: number;
    description: string;
    price: number;
  }[];
  goToRate?: () => void;
}

const BookingCard: FC<Props> = ({ sx, roomList, goToRate }) => {
  const history = useHistory();
  const [roomType, setRoomType] = useState("0");
  const [pricePerNight, setPricePerNight] = useState(roomList[0].price);

  const handleBook: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push("/checkout");
  };

  const search = useSelector(
    (state: any) => state.searchReducer.search,
    shallowEqual
  );

  const [value, setValue] = useState<RangeInput<Date | null>>([
    search.checkIn ? search.checkIn : null,
    search.checkOut ? search.checkOut : null,
  ]);

  const occupants = {...search.occupants};

  useEffect(() => {
    for (let i = 0; i < roomList.length; i ++) {
      if (roomList[i].value === parseInt(roomType)) {
        setPricePerNight(roomList[i].price);
      }
    }
  }, [roomType])

  return (
    <Box sx={{ ...sx, borderRadius: 3, boxShadow: 3, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Check-in"
              endText="Check-out"
              calendars={1}
              allowSameDateSelection={false}
              value={value}
              renderInput={(startProps, endProps) => (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField {...startProps} fullWidth={true} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField {...endProps} fullWidth={true} />
                  </Grid>
                </Grid>
              )}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              disabled
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <OccupantSelector value={occupants} onChange={() => {
            return;
          }} disabled={true} />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Room Type</InputLabel>
            <Select
              value={roomType}
              onChange={(e) => {
                setRoomType(e.target.value);
              }}
              label="Room Type"
            >
              {roomList.map((room, key) => {
                return (
                  <MenuItem value={room.value} key={key}>
                    {room.description}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ my: 3, borderTop: 1, borderColor: "primary.main" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5">${pricePerNight}</Typography>
          <Typography variant="body1" sx={{ ml: 1 }}>
            / night
          </Typography>
        </Box>
        <Button
          onClick={handleBook}
          variant="contained"
          size="large"
          color="primary"
          sx={{ mt: 2, py: 1.5, px: 3.5 }}
        >
          <Typography variant="h6">Book Now</Typography>
        </Button>
        <Link href="#" onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          if (goToRate)
            goToRate();
        }}>
          <Typography
            variant="body1"
            sx={{
              mt: 1
            }}
          >
            View All Rates
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default BookingCard;
