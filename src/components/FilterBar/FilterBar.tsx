import Box from "@material-ui/core/Box";
import { FC, useState, MouseEventHandler } from "react";
import { CSSObject } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
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
  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([null, null]);

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
        color: "text.primary",
        borderRadius: 0,
        p: 0,
        m: 0,
        boxShadow: 4,
        width: "100%",
        height: "100%",
        textAlign: "center"
      }}
    >
      {!zoomIn && 
        (<Box
          sx={{
            display: "inline-block"
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid #DDDDDD",
              borderRadius: "19px",
              py: 0.125,
              px: 0.5
            }}
          >
            <Button
              onClick={handleFilterInClick}>
              <Typography
                sx={{
                  textTransform: "none"
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
                width: "1px"
              }}
            >
            </Box>
            <Button
              onClick={handleFilterInClick}>
              <Typography>
                {checkDate[0] ? dateToString(checkDate[0]) : "8/6/2021"} - {checkDate[1] ? dateToString(checkDate[1]) : "8/10/2021"}
              </Typography>
            </Button>
            <Box
              sx={{
                backgroundColor: "#DDDDDD",
                flex: "0 0 1px",
                height: "24px",
                width: "1px"
              }}
            >
            </Box>
            <Button
              onClick={handleFilterInClick}>
              <Typography
                sx={{
                  textTransform: "none"
                }}
              >
                {occupants.adults} guests
              </Typography>
            </Button>
            <IconButton
              onClick={handleFilterInClick}>
              <SearchOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      {zoomIn && (
        <Box>
          <Zoom 
            in={zoomIn}
            timeout={{
              enter: 200
            }}
          >
            <Box
              sx={{
                py: 0.5,
                px: 0.5
              }}
            >
              <Box
                sx={{
                  display: {
                    sm: "inline-flex",
                    xs: "block"
                  },
                  alignItems: "center"
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
                              sm: "flex"
                            }
                          }}
                        >
                          <TextField 
                            {...startProps} 
                            fullWidth={true} 
                          />
                          <TextField 
                            {...endProps} 
                            fullWidth={true} 
                            sx={{
                              mt: {
                                xs: 1,
                                sm: 0
                              }
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
                    sx={{
                      mt: {
                        xs: 1,
                        sm: 0
                      }
                    }}
                  />
                </Box>
                <Box>
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
