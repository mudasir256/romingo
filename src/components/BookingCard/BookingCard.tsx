import { FC, useState, Fragment, MouseEventHandler } from "react";
import Box from "@material-ui/core/Box";
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [dogs, setDogs] = useState(0);

  const handleClick: MouseEventHandler = (event) => {
    setAnchorEl(event.target);
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
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <Fragment>
              <TextField {...startProps} sx={{ flex: 1 }} />
              <TextField {...endProps} sx={{ flex: 1, ml: 3 }} />
            </Fragment>
          )}
        />
      </LocalizationProvider>
      <TextField
        fullWidth
        sx={{ mt: 3, textAlign: "center" }}
        value={`Adults: ${adults} - Children: ${children} - Dogs: ${dogs}`}
        inputProps={{ readOnly: true, style: { textAlign: "center" } }}
        onClick={handleClick}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack sx={{ p: 3 }} spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={12}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="h6">Adults</Typography>
            <Stack spacing={2} direction="row" alignItems="center">
              <IconButton onClick={() => setAdults(Math.max(adults - 1, 0))}>
                <RemoveCircleOutline />
              </IconButton>
              <Typography
                variant="body1"
                sx={{ width: 16, textAlign: "center" }}
              >
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
            spacing={16}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="h6">Children</Typography>
            <Stack spacing={2} direction="row" alignItems="center">
              <IconButton
                onClick={() => setChildren(Math.max(children - 1, 0))}
              >
                <RemoveCircleOutline />
              </IconButton>
              <Typography
                variant="body1"
                sx={{ width: 16, textAlign: "center" }}
              >
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
            spacing={12}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="h6">Dogs</Typography>
            <Stack spacing={2} direction="row" alignItems="center">
              <IconButton onClick={() => setDogs(Math.max(dogs - 1, 0))}>
                <RemoveCircleOutline />
              </IconButton>
              <Typography
                variant="body1"
                sx={{ width: 16, textAlign: "center" }}
              >
                {dogs}
              </Typography>
              <IconButton onClick={() => setDogs(dogs + 1)}>
                <AddCircleOutline />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Popover>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Room Type</InputLabel>
        <Select label="Room Type">
          <MenuItem value={1}>Room TWO DOUBLE BEDS</MenuItem>
          <MenuItem value={2}>Two Double Beds - Non-refundable</MenuItem>
          <MenuItem value={3}>SUITE TWO BEDROOMS</MenuItem>
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
