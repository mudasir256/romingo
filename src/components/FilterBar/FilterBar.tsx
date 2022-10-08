import Box from "@mui/material/Box";
import { FC, useState, MouseEventHandler, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { Dialog, CSSObject, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Typography from "@mui/material/Typography";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import { DateTime } from "luxon";

import MobileFilterBar from '../MobileHomePageFilterBar'

import OccupantSelector, {
  Occupant,
} from "../OccupantSelector/OccupantSelector";

import { saveSearch } from "../../store/searchReducer";

interface Props {
  sx?: CSSObject;
  zoomed?: boolean;
  home?: boolean;
  city?: string;
  searchOnClose?: boolean;
}

const FilterBar: FC<Props> = ({
  sx,
  zoomed = false,
  city = "",
  searchOnClose = true,
}) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isTextField, setIsTextField] = useState(false);

  const [zoomIn, setZoomIn] = useState(zoomed);
  // eslint-disable-next-line
  const search = useSelector((state: any) => state.searchReducer.search);
  // eslint-disable-next-line
  const cities = useSelector((state: any) => state.cityListReducer.cities);

  const [selectedCity, setSelectedCity] = useState(
    search.city ? search.city : ""
  );
  const [formError, setFormError] = useState("");

  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([
    search.checkIn ? search.checkIn : null,
    search.checkOut ? search.checkOut : null,
  ]);

  const [occupants, setOccupants] = useState(search.occupants);

  const getCityName = (cityId: string) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].id === cityId) return cities[i].name;
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

  const handleFilterInClick: MouseEventHandler<Element> = () => {
    setFormError("");
    setZoomIn(true);
  };

  useEffect(() => {
    if (city && city.length > 0 && cities.length > 0) {
      setSelectedCity(city);
    }
  }, [cities]);

  // eslint-disable-next-line
  const dispatch: Dispatch<any> = useDispatch();

  const handleFilterOutClick = (_event: any, reason: string) => {
    if (!searchOnClose || reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setZoomIn(false);
      return;
    }
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
      setZoomIn(false);
      dispatch(
        saveSearch({
          city: selectedCity,
          checkIn: new Date(checkDate[0]).toISOString(),
          checkOut: new Date(checkDate[1]).toISOString(),
          occupants,
        })
      );

      history.push("/listings");
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

  const handleSearch: any = (newSelectedCity, newCheckIn, newCheckOut, newOccupants) => {
    setFormError("");
    setZoomIn(false);
    setSelectedCity(newSelectedCity)
    setOccupants(newOccupants)
    setCheckDate([newCheckIn, newCheckOut])
    dispatch(
      saveSearch({
        city: newSelectedCity,
        checkIn: new Date(newCheckIn).toISOString(),
        checkOut: new Date(newCheckOut).toISOString(),
        occupants: newOccupants,
      })
    );
    history.push("/listings");
  };

  const fontStyle = {
    fontFamily: "overpass-light",
    textTransform: "none",
    fontSize: '.9em'
  }

  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", sm: "auto" },
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            minWidth: { xs: "95%" },
            margin: "0px auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              minHeight: "45px",
              boxShadow: { xs: "1px 2px 2px rgba(0, 0, 0, 0.15)", sm: "0" },
              justifyContent: "space-evenly",
              alignItems: "center",
              border: "1px solid #DDDDDD",
              borderRadius: 3,
              backgroundColor: "white",
              pr: { xs: "0", sm: ".5rem" },
            }}
          >
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 } }}>
              <Typography sx={fontStyle}>
                {getCityName(selectedCity) || "Choose City"}
              </Typography>
            </Button>
            <Box
              sx={{
                backgroundColor: "#DDDDDD",
                flex: "0 0 1px",
                height: "24px",
                width: "1px",
              }}
            ></Box>
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 } }}>
              <Typography
                sx={fontStyle}
              >
                {checkDate[0]
                  ? DateTime.fromJSDate(new Date(checkDate[0])).toFormat(
                    "MMM dd"
                  )
                  : ""}
                &nbsp;&#8212;&nbsp;
                {checkDate[1]
                  ? DateTime.fromJSDate(new Date(checkDate[1])).toFormat(
                    "MMM dd"
                  )
                  : ""}
              </Typography>
            </Button>
            <Box
              sx={{
                backgroundColor: "#DDDDDD",
                flex: "0 0 1px",
                height: "24px",
                width: "1px",
              }}
            ></Box>
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 } }}>
              <Typography sx={fontStyle}>{occupants.adults + occupants.children}</Typography>
              <PersonIcon sx={{ color: "primary.main", fontSize: "100%", mb: 0, ml: 0.1 }}/>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              <Typography sx={fontStyle}>{occupants.dogs}</Typography>
              <PetsIcon
                sx={{
                  color: "primary.main",
                  fontSize: "100%",
                  mb: 0.2,
                  ml: 0.3,
                }}
              />
            </Button>
            <IconButton onClick={handleFilterInClick}>
              <SearchOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={zoomIn}
        onClose={() => setZoomIn(false)}
        BackdropProps={{
          style: {
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          },
        }}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 'none',
            color: 'inherit',
            opacity: 1
          }
        }}
      >
        <MobileFilterBar home={false} onSearch={handleSearch} />

        {formError.length > 0 && (
          <Typography
            variant="body2"
            color="error"
            sx={{ textAlign: "center", mt: 1 }}
          >
            {formError}
          </Typography>
        )}
      </Dialog>
    </>
  );
};

export default FilterBar;
