import { FC, useState } from "react";
import { CSSObject } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateRangePicker from "@material-ui/lab/DateRangePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { RangeInput } from "@material-ui/lab/DateRangePicker/RangeTypes";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
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
  const [value, setValue] = useState<RangeInput<Date | null>>([null, null]);
  const [roomType, setRoomType] = useState("0");
  const [occupants, setOccupants] = useState({
    adults: 2,
    children: 0,
    dogs: 0,
  });

  const onOccupantChange = (value: Occupant) => {
    setOccupants(value);
  };

  return (
    <Box sx={{ ...sx, borderRadius: 1, boxShadow: 3, p: 3 }}>
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
        <Button variant="contained" size="large" color="primary" sx={{ mt: 2 }}>
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

export default BookingCard;
