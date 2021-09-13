import { FC, useState, MouseEventHandler } from "react";
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

interface Props {
  sx?: CSSObject;
  roomList: {
    value: number;
    description: string;
  }[];
}

const BookingCard: FC<Props> = ({ sx, roomList }) => {
  const history = useHistory();
  const [value, setValue] = useState<RangeInput<Date | null>>([null, null]);
  const [roomType, setRoomType] = useState("0");
  const [occupants, setOccupants] = useState({
    adults: 2,
    children: 0,
    dogs: 1,
  });

  const onOccupantChange = (value: Occupant) => {
    setOccupants(value);
  };

  const handleBook: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push("/checkout");
  };

  return (
    <Box sx={{ ...sx, borderRadius: 3, boxShadow: 3, p: 3 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Check-in"
          endText="Check-out"
          calendars={1}
          allowSameDateSelection={false}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField {...startProps} fullWidth={true} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField {...endProps} fullWidth={true} />
              </Grid>
            </Grid>
          )}
        />
      </LocalizationProvider>
      <OccupantSelector
        value={occupants}
        onChange={onOccupantChange}
        sx={{ mt: 3 }}
      />
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Room Type</InputLabel>
        <Select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
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
      <Box sx={{ my: 3, borderTop: 1, borderColor: "primary.main" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5">$139.99</Typography>
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
      </Box>
    </Box>
  );
};

export default BookingCard;
