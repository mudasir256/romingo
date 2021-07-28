import { FC, useState, Fragment } from "react";
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

const BookingCard: FC = () => {
  const [value, setValue] = useState<RangeInput<Date | null>>([null, null]);

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

      <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Adults</InputLabel>
          <Select label="Adults">
            {Array.from({ length: 5 }, (_, i) => (
              <MenuItem value={i} key={i}>
                {i} Adults
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Children</InputLabel>
          <Select label="Children">
            {Array.from({ length: 5 }, (_, i) => (
              <MenuItem value={i} key={i}>
                {i} Children
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Dogs</InputLabel>
          <Select label="Dogs">
            {Array.from({ length: 5 }, (_, i) => (
              <MenuItem value={i} key={i}>
                {i} Dogs
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Room Type</InputLabel>
        <Select label="Adults">
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
