import { FC, useState, MouseEventHandler } from "react";
import { CSSObject } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
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

interface ChangeRoom {
  (roomType: string): void;
}

interface Props {
  sx?: CSSObject;
  roomList: {
    value: number;
    description: string;
  }[];
  handleRoomChange: ChangeRoom;
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
  pricePerNight: number;
  handleClose: () => void;
}

const MobileBookingForm: FC<Props> = ({
  sx,
  roomList,
  initialValue,
  handleChange,
  handleRoomChange,
  pricePerNight,
  handleClose,
}) => {
  const [value, setValue] = useState(initialValue.value);
  const [roomType, setRoomType] = useState(initialValue.roomType);
  const [occupants, setOccupants] = useState(initialValue.occupants);

  const onOccupantChange = (value: Occupant) => {
    setOccupants(value);
  };

  const updateSearch = () => {
    handleChange(roomType, value, occupants);
  };

  return (
    <Box sx={{ ...sx, borderRadius: 3, boxShadow: 3, px: 3, pt: 1, pb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateRangePicker
              startText="Check-in"
              endText="Check-out"
              calendars={1}
              value={value}
              minDate={new Date()}
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
        </Grid>
        <Grid item xs={12}>
          <OccupantSelector
            value={occupants}
            onChange={(value) => {
              onOccupantChange(value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Room Type</InputLabel>
            <Select
              value={roomType}
              onChange={(e) => {
                setRoomType(e.target.value);
                handleRoomChange(e.target.value);
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">${pricePerNight.toFixed(2)}</Typography>
          <Typography variant="body1" sx={{ ml: 0.75, fontSize: "90%" }}>
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
          onClick={() => {
            updateSearch();
            handleClose();
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default MobileBookingForm;
