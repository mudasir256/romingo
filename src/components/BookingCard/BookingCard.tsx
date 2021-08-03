import { FC, useState, MouseEventHandler } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateRangePicker from "@material-ui/lab/DateRangePicker";

import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { RangeInput } from "@material-ui/lab/DateRangePicker/RangeTypes";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Stack from "@material-ui/core/Stack";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";

const BookingCard: FC = () => {
  const [value, setValue] = useState<RangeInput<Date | null>>([null, null]);
  const [roomType, setRoomType] = useState("0");

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [dogs, setDogs] = useState(0);

  const handleClick: MouseEventHandler<Element> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ borderRadius: 3, boxShadow: 1, p: 3 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
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
      <TextField
        label="Occupants"
        fullWidth
        sx={{ mt: 3 }}
        color="primary"
        value={`Adults: ${adults} - Children: ${children} - Dogs: ${dogs}`}
        inputProps={{
          readOnly: true,
          style: { textAlign: "center", fontSize: "85%" },
        }}
        onClick={handleClick}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: { width: "350px", maxWidth: "80%" },
        }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Stack sx={{ p: 2 }} spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">Adults</Typography>
            <Stack spacing={1} direction="row" alignItems="center">
              <IconButton onClick={() => setAdults(Math.max(adults - 1, 0))}>
                <RemoveCircleOutline />
              </IconButton>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {adults}
              </Typography>
              <IconButton onClick={() => setAdults(adults + 1)}>
                <AddCircleOutline />
              </IconButton>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">Children</Typography>
            <Stack spacing={1} direction="row" alignItems="center">
              <IconButton
                onClick={() => setChildren(Math.max(children - 1, 0))}
              >
                <RemoveCircleOutline />
              </IconButton>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {children}
              </Typography>
              <IconButton onClick={() => setChildren(children + 1)}>
                <AddCircleOutline />
              </IconButton>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">Dogs</Typography>
            <Stack spacing={1} direction="row" alignItems="center">
              <IconButton onClick={() => setDogs(Math.max(dogs - 1, 0))}>
                <RemoveCircleOutline />
              </IconButton>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {dogs}
              </Typography>
              <IconButton onClick={() => setDogs(dogs + 1)}>
                <AddCircleOutline />
              </IconButton>
            </Stack>
          </Stack>
          <Button onClick={handleClose}>Done</Button>
        </Stack>
      </Popover>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Room Type</InputLabel>
        <Select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          label="Room Type"
        >
          <MenuItem value="0">Room TWO DOUBLE BEDS</MenuItem>
          <MenuItem value="1">Two Double Beds - Non-refundable</MenuItem>
          <MenuItem value="2">SUITE TWO BEDROOMS</MenuItem>
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
