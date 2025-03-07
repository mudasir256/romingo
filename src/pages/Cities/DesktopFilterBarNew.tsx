import {
  IconButton,
  Popover,
  InputLabel,
  FormControl,
  Autocomplete,
  Box,
  Stack,
  Typography,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import { saveSearch } from "../../store/searchReducer";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTime } from "luxon";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import GooglePlaceAutoComplete from "../../components/GooglePlaceAutoComplete";

interface Props {
  city?: string;
}

export const DesktopFilterBarNew: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const isTextField = false;
  const city = "";
  // eslint-disable-next-line
  const search = useSelector((state: any) => state.searchReducer.search);
  // eslint-disable-next-line
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const [newValue, setNewValue] = useState(null);


  const [selectedCity, setSelectedCity] = useState(
    search.city ? search.city : ""
  );
  const [formError, setFormError] = useState("");

  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([
    search.checkIn ? search.checkIn : null,
    search.checkOut ? search.checkOut : null,
  ]);

  const [occupants, setOccupants] = useState(search.occupants);

  const handleDateRangeClose = () => {
    setIsAccept(false);
    if (!isTextField) {
      setOpen(false);
    }
  };

  const getCity = (cityId: string) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].id === cityId) return cities[i];
    }
  };

  const onOccupantChange = (value: Occupant) => {
    setOccupants(value);
  };

  useEffect(() => {
    if (city && cities.length > 0) {
      setSelectedCity(city);
    }
  }, [cities]);

  // eslint-disable-next-line
  const dispatch: Dispatch<any> = useDispatch();

  const handleFilterOutClick = () => {
    if (
      occupants.adults !== 0 &&
      selectedCity &&
      checkDate[0] &&
      new Date(checkDate[0]) >=
      new Date(new Date().setDate(new Date().getDate() - 1)) &&
      checkDate[1] &&
      new Date(checkDate[1]) >= new Date()
    ) {
      setFormError("");
      dispatch(
        saveSearch({
          city: newValue.city,
          checkIn: new Date(checkDate[0]).toISOString(),
          checkOut: new Date(checkDate[1]).toISOString(),
          occupants,
          lat: newValue.lat,
          lng: newValue.lng,
        })
      );
      // refetch({
      //   variables: {
      //     adults: search.occupants.adults,
      //     cityId: search.city,
      //     checkIn: search.checkIn.substring(0, 10),
      //     checkOut: search.checkOut.substring(0, 10),
      //     children: ageParam,
      //     dogs: search.occupants.dogs,
      //     allows_big_dogs: allowBigDogs
      //   }
      // })

      navigate("/listings");
    } else {
      if (!selectedCity) {
        setFormError("Location required");
      }
      if (!checkDate[0]) {
        setFormError("Check-in date required");
      }
      if (
        checkDate[0] &&
        new Date(checkDate[0]) <= new Date(new Date().setHours(23, 59, 59, 0))
      ) {
        setFormError("Check-in date must be today at the earliest");
      }
      if (!checkDate[1]) {
        setFormError("Check-out date required");
      }
      if (
        checkDate[1] &&
        new Date(checkDate[1]) <= new Date(new Date().setHours(23, 59, 59, 0))
      ) {
        setFormError("Check-out date must be after today");
      }
      if (occupants.adults === 0) {
        setFormError("Search must include at least 1 adult guest");
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          background: "#f5f3f3",
          alignItems: "center",
          border: "3px solid",
          mb: "1rem",
          padding: "6px",
          fontFamily: 'overpass-light',
          width: { xs: "100%", sm: '50%' },
          margin: 'auto'
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: '40%',  border: '1px solid #aaabab' }}>
          <GooglePlaceAutoComplete setSelectedCity={setSelectedCity} setValue={setNewValue} value={newValue} />
        </Box>
        <Box
          sx={{
            fontFamily: "overpass-light",
            fontSize: "8px",
            fontWeight: 400,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              format="MMM dd"
              // disableMaskedInput={true}
              open={open}
              onAccept={() => setIsAccept(true)}
              onClose={handleDateRangeClose}
              onOpen={() => {
                if (!isAccept) {
                  setOpen(true);
                }
              }}
              // allowSameDateSelection
              calendars={2}
              // clearable={true}
              value={checkDate || null}
              minDate={new Date()}
              onChange={(newValue) => {
                setFormError("");
                setCheckDate(newValue);
              }}
              // renderInput={() => (
              //   <Button
              //     onClick={() => setOpen(true)}
              //     sx={{ px: { xs: 1, md: 1 }, fontSize: 10 }}
              //   >
                  
              //       {checkDate[0]
              //         ? DateTime.fromJSDate(new Date(checkDate[0])).toFormat(
              //           "MMM dd"
              //         )
              //         : ""}
              //       &nbsp;&#8212;&nbsp;
              //       {checkDate[1]
              //         ? DateTime.fromJSDate(new Date(checkDate[1])).toFormat(
              //           "MMM dd"
              //         )
              //         : ""}
              //   </Button>
              // )}
              slotProps={{ textField: { variant: 'outlined' } }}
            />
          </LocalizationProvider> */}
        </Box>
        <Box sx={{ display: "flex", alignItems: "top" }}>
          <OccupantSelector
            value={occupants}
            onChange={onOccupantChange}
            variant="standard"
            size="small"
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button
            onClick={handleFilterOutClick}
            disableElevation
            type="submit"
            variant="text"
            sx={{
              ml: ".25rem",
              display: "flex",
              minWidth: "30px",
              alignItems: "center",
              padding: ".25rem 0rem",
              justifyContent: "center",
            }}
          >
            <SearchIcon sx={{ height: "20px" }} />
          </Button>
        </Box>
      </Box>
      {formError.length > 0 && (
        <Typography
          variant="body2"
          color="error"
          sx={{ textAlign: "center", mt: 1 }}
        >
          {formError}
        </Typography>
      )}
    </Box>
  );
};

export interface Occupant {
  adults: number;
  children: number;
  dogs: number;
  childrenAge?: number[];
  disabled?: boolean;
}

interface OccupantSelectorProps {
  value: Occupant;
  onChange: (value: Occupant) => void;
  onClose?: () => void;
  fullWidth?: boolean;
  size?: "small" | "medium" | undefined;
  variant?: "filled" | "outlined" | "standard" | undefined;
  disabled?: boolean;
}

const OccupantSelector: FC<OccupantSelectorProps> = ({
  value,
  onChange,
  onClose,
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [error, setError] = useState("");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setError("");
    if (value.adults === 0) {
      setError("At least 1 adult is required");
      return;
    }
    if (onClose) {
      onClose();
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: ".5rem", maxHeight: "75%" }}
      />
      <Button onClick={handleClick} sx={{ fontSize: 15, padding: 0 }}>
        <Typography variant="inherit"
        >
          {value.adults + value.children}
        </Typography>
        <PersonIcon style={{fontSize: 20}}
        />
        {/* <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <Typography
          sx={{
            textTransform: "none",
            fontSize: { xs: "87%" },
            fontWeight: 600,
          }}
        >
          {value.dogs}
        </Typography>
        <PetsIcon
          sx={{ color: "primary.main", fontSize: "100%", mb: 0.2, ml: 0.3 }}
        /> */}
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ ".MuiPopover-paper": { width: "250px" } }}
      >
        <Stack sx={{ px: 2, pt: 2 }} spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Adults</Typography>
            <NumberInput
              value={value.adults}
              onChange={(adults) => {
                if (adults > 5) return;
                onChange({ ...value, adults });
              }}
              minimum={1}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">Children</Typography>
            <NumberInput
              value={value.children}
              onChange={(children) => {
                if (children > 6) return;
                if (value.childrenAge && value.childrenAge.length > children) {
                  value.childrenAge = value.childrenAge.slice(0, children);
                } else if (
                  value.childrenAge &&
                  value.childrenAge.length <= children
                ) {
                  while (value.childrenAge.length !== children) {
                    value.childrenAge.push(0);
                  }
                }
                onChange({ ...value, children });
              }}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">Dogs</Typography>
            <NumberInput
              value={value.dogs}
              onChange={(dogs) => {
                if (dogs > 2) return;
                onChange({ ...value, dogs });
              }}
            />
          </Stack>
          {error.length > 0 && (
            <Typography
              variant="body2"
              color="error"
              sx={{ textAlign: "center", fontSize: "80%" }}
            >
              {error}
            </Typography>
          )}
          <Box
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {Array.from({ length: value.children }, (_, i: number) => {
              return (
                <Box
                  sx={{
                    mx: "5px",
                    mt: "0px",
                    mb: "15px",
                    width: "calc(50% - 10px)",
                    display: "inline-block",
                  }}
                  key={i}
                >
                  <FormControl variant="standard" fullWidth>
                    <InputLabel sx={{ textAlign: "center" }}>
                      Child {i + 1} Age
                    </InputLabel>
                    <Select
                      key={i}
                      color="primary"
                      sx={{ textAlign: "center" }}
                      value={
                        value.childrenAge && value.childrenAge[i]
                          ? value.childrenAge[i].toString()
                          : "1"
                      }
                      onChange={(e: any) => {
                        if (value.childrenAge === undefined) {
                          value.childrenAge = [];
                        }
                        value.childrenAge[i] = parseInt(e.target.value);
                        onChange({ ...value });
                      }}
                    >
                      {Array.from({ length: 17 }, (_, k: number) => {
                        return (
                          <MenuItem value={k + 1} key={k + 1}>
                            {k + 1}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              );
            })}
          </Box>
        </Stack>
        <Button
          sx={{ pt: 1.5, pb: 1.5, width: "100%", mt: -1.25 }}
          onClick={handleClose}
        >
          Done
        </Button>
      </Popover>
    </>
  );
};

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  minimum?: number;
}

const NumberInput: FC<NumberInputProps> = ({
  value,
  onChange,
  minimum = 0,
}) => {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <IconButton onClick={() => onChange(Math.max(value - 1, minimum))} size="large">
        <RemoveCircleOutline />
      </IconButton>
      <Typography variant="body1" sx={{ width: 16, textAlign: "center" }}>
        {value}
      </Typography>
      <IconButton onClick={() => onChange(value + 1)} size="large">
        <AddCircleOutline />
      </IconButton>
    </Stack>
  );
};