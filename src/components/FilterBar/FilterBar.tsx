import Box from "@material-ui/core/Box";
import { FC, useState, MouseEventHandler } from "react";
import { CSSObject } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select, { SelectChangeEvent } from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import DateRangePicker from "@material-ui/lab/DateRangePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { RangeInput } from "@material-ui/lab/DateRangePicker/RangeTypes";

import OccupantSelector, {
  Occupant,
} from "../OccupantSelector/OccupantSelector";

interface Props {
  sx?: CSSObject;
  zoomed?: boolean;
}

const FilterBar: FC<Props> = ({ sx, zoomed = false }) => {
  const [zoomIn, setZoomIn] = useState(zoomed);
  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([
    null,
    null,
  ]);
  const [location, setLocation] = useState("");

  const [occupants, setOccupants] = useState({
    adults: 2,
    children: 0,
    dogs: 0,
  });

  const dateToString = (isoString: string | Date | number) => {
    const date = new Date(isoString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const onOccupantChange = (value: Occupant) => {
    setOccupants(value);
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };

  const handleFilterInClick: MouseEventHandler<Element> = () => {
    setZoomIn(true);
  };

  const handleFilterOutClick: MouseEventHandler<Element> = () => {
    setZoomIn(false);
  };

  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      {!zoomIn && (
        <Box
          sx={{
            display: "inline-block",
            minWidth: "300px",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid #DDDDDD",
              borderRadius: 1,
              backgroundColor: "white",
            }}
          >
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 } }}>
              <Typography
                sx={{
                  textTransform: "none",
                  fontSize: {
                    xs: "85%",
                  },
                }}
              >
                San Francisco, CA
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
                sx={{
                  fontSize: {
                    xs: "85%",
                  },
                }}
              >
                {checkDate[0] ? dateToString(checkDate[0]) : "8/6/2021"} -{" "}
                {checkDate[1] ? dateToString(checkDate[1]) : "8/10/2021"}
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
                sx={{
                  textTransform: "none",
                  fontSize: {
                    xs: "85%",
                  },
                }}
              >
                {occupants.adults} guests
              </Typography>
            </Button>
            <IconButton onClick={handleFilterInClick}>
              <SearchOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      {zoomIn && (
        <Box
          sx={{
            borderRadius: 1,
            backgroundColor: {
              xs: "rgba(255,255,255,.95)",
              md: "transparent",
            },
          }}
        >
          <Zoom
            in={zoomIn}
            timeout={{
              enter: 200,
            }}
          >
            <Box
              sx={{
                pt: { xs: 1, md: 0 },
                pb: 0,
                px: 1,
                my: { xs: 0, md: -0.35 },
              }}
            >
              <Box
                sx={{
                  display: {
                    md: "flex",
                    xs: "block",
                  },
                  alignItems: "center",
                }}
              >
                <Box sx={{ minWidth: "180px" }}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="demo-simple-select-label">
                      Location
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      size="small"
                      value={location}
                      label="Location"
                      onChange={handleSelect}
                      sx={{
                        color: "primary.main",
                        my: { xs: 0.5, md: 0 },
                      }}
                    >
                      <MenuItem value={"Tucson, AZ"}>Tucson, AZ</MenuItem>
                      <MenuItem value={"San Francisco, CA"}>
                        San Francisco, CA
                      </MenuItem>
                      <MenuItem value={"San Diego, CA"}>San Diego, CA</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      startText="Check-in"
                      endText="Check-out"
                      calendars={1}
                      value={checkDate}
                      onChange={(newValue) => {
                        setCheckDate(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <Box
                          sx={{
                            display: {
                              xs: "block",
                              md: "flex",
                            },
                          }}
                        >
                          <TextField
                            {...startProps}
                            fullWidth={true}
                            size="small"
                            color="primary"
                            variant="standard"
                            sx={{
                              width: { xs: "50%", md: "105px" },
                              my: { xs: 0.5, md: 0 },
                              input: {
                                color: "primary.main",
                                border: "none",
                              },
                            }}
                          />
                          <TextField
                            {...endProps}
                            fullWidth={true}
                            size="small"
                            color="primary"
                            variant="standard"
                            sx={{
                              width: { xs: "50%", md: "105px" },
                              my: { xs: 0.5, md: 0 },
                              input: {
                                color: "primary.main",
                              },
                            }}
                          />
                        </Box>
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <OccupantSelector
                    value={occupants}
                    onChange={onOccupantChange}
                    variant="standard"
                    fullWidth={true}
                    size="small"
                    sx={{
                      minWidth: "240px",
                      input: {
                        color: "primary.main",
                      },
                      my: { xs: 0.5, md: 0 },
                    }}
                  />
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    onClick={handleFilterOutClick}
                    color="primary"
                    sx={{
                      py: 1.5,
                      px: 2,
                      my: { xs: 0.5, md: 0 },
                      width: { xs: "100%" },
                      fontWeight: "bold",
                    }}
                  >
                    <SearchIcon /> Search
                  </Button>
                </Box>
              </Box>
            </Box>
          </Zoom>
        </Box>
      )}
    </Box>
  );
};

export default FilterBar;
