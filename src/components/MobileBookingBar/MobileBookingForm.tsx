import { FC, useState, MouseEventHandler } from "react";
import { CSSObject } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MobileDateRangePicker from "@material-ui/lab/MobileDateRangePicker";
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

interface ChangeFunc {
  (
    roomType: string,
    dateRange: RangeInput<Date | null>,
    occupantsValue: {
      adults: number;
      children: number;
      dogs: number;
    }
  ): void;
}

interface Props {
  sx?: CSSObject;
  roomList: {
    value: number;
    description: string;
  }[];
  handleChange: ChangeFunc;
  initialValue: {
    value: RangeInput<Date | null>;
    roomType: string;
    occupants: {
      adults: number;
      children: number;
      dogs: number;
    };
  };
}

const MobileBookingForm: FC<Props> = ({
  sx,
  roomList,
  initialValue,
  handleChange,
}) => {
  const [value, setValue] = useState(initialValue.value);
  const [roomType, setRoomType] = useState(initialValue.roomType);
  const [occupants, setOccupants] = useState(initialValue.occupants);

  const onOccupantChange = (value: Occupant) => {
    setOccupants(value);
  };

  const handleClick: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleChange(roomType, value, occupants);
  };

  return (
    <Box sx={{ ...sx, borderRadius: 1, boxShadow: 3, px: 3, pt: 1, pb: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDateRangePicker
          startText="Check-in"
          endText="Check-out"
          calendars={1}
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
      <Box
        sx={{
          position: "fixed",
          bottom: "61px",
          left: 0,
          width: "100%",
          borderBottom: 1,
          borderColor: "primary.main",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          mt: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">$139.99</Typography>
          <Typography variant="body1" sx={{ ml: 0.5, fontSize: "90%" }}>
            / night
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            whiteSpace: "nowrap",
            minWidth: "150px",
            py: 0,
            position: "fixed",
            bottom: 0,
            right: 0,
            height: "62px",
            boxShadow: 2,
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default MobileBookingForm;
