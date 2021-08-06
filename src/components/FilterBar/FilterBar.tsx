import Box from "@material-ui/core/Box";
import { FC, useState, MouseEventHandler } from "react";
import { CSSObject } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
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
}

const FilterBar: FC<Props> = ({ sx }) => {
  const [zoomIn, setZoomIn] = useState(false);
  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([
    null,
    null,
  ]);

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

  const handleFilterInClick: MouseEventHandler<Element> = (e) => {
    setZoomIn(true);
  };

  const handleFilterOutClick: MouseEventHandler<Element> = (e) => {
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
              borderRadius: "19px",
              backgroundColor: "white",
              py: 0.125,
              px: 0.5,
            }}
          >
            <Button onClick={handleFilterInClick}>
              <Typography
                sx={{
                  textTransform: "none",
                  fontSize: {
                    xs: "85%",
                  },
                }}
              >
                Map Area
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
            <Button onClick={handleFilterInClick}>
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
            <Button onClick={handleFilterInClick}>
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
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: { xs: 4, md: 0 },
            p: { xs: 2, md: 0 },
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
                py: { xs: 0.5, sm: 0.25 },
                px: 0.5,
              }}
            >
              <Box
                sx={{
                  display: {
                    sm: "flex",
                    xs: "block",
                  },
                  alignItems: "center",
                }}
              >
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
                              sm: "flex",
                            },
                          }}
                        >
                          <TextField
                            {...startProps}
                            fullWidth={true}
                            size="small"
                            sx={{ minWidth: "120px" }}
                          />
                          <TextField
                            {...endProps}
                            fullWidth={true}
                            size="small"
                            sx={{
                              minWidth: "120px",
                              mt: {
                                xs: 2,
                                sm: 0,
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
                    fullWidth={true}
                    size="small"
                    sx={{
                      mt: {
                        xs: 2,
                        sm: 0,
                      },
                      minWidth: "300px",
                    }}
                  />
                </Box>
                <Box sx={{ textAlign: "center", mt: { xs: 2, sm: 0 } }}>
                  <Button onClick={handleFilterOutClick}>
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
