import { CSSObject } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FC, MouseEventHandler, useState } from "react";
import { useMeasure } from "react-use";
import NumberInput from "../NumberInput";
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export interface Occupant {
  adults: number;
  children: number;
  dogs: number;
  childrenAge?: number[];
  disabled?: boolean;
}

interface Props {
  value: Occupant;
  onChange: (value: Occupant) => void;
  onClose?: () => void;
  sx?: CSSObject;
  fullWidth?: boolean;
  size?: "small" | "medium" | undefined;
  variant?: "filled" | "outlined" | "standard" | undefined;
  disabled?: boolean;
  label?: string
}

const popOverLabelText = {
  fontSize: '1em', 
  fontFamily: 'overpass-light', 
  color: 'black',
}

const OccupantSelector: FC<Props> = ({
  value,
  onChange,
  onClose,
  sx,
  fullWidth = true,
  size = "medium",
  variant = "outlined",
  disabled = false,
  label
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [error, setError] = useState("");

  const handleClick: MouseEventHandler<Element> = (event) => {
    if (disabled) return;
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
      <TextField
        fullWidth={fullWidth}
        label={label ? label : ""}
        sx={sx}
        variant='outlined'
        size='small'
        value={
          value.adults === 0 && value.dogs === 0 && value.children === 0
            ? ""
            : `${value.adults} ${(value.adults === 1) ? 'Adult' : 'Adults'}, ${value.children == 0 ? '' : value.children} ${(value.children == 0 ? '' : value.children == 1 ? 'Child, ' : 'Children, ')}${value.dogs} ${(value.dogs === 1) ? 'Pet' : 'Pets'}  `
        }
        inputProps={{
          readOnly: true,
        }}
        onClick={handleClick}
        ref={ref}
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{marginRight: '0.5rem'}}>
              <PersonOutlineIcon fontSize="small" />
            </InputAdornment>
          ),
        }} 
      />
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
        sx={{ ".MuiPopover-paper": { width } }}
      >
        <Stack sx={{ px: 2, pt: 2 }} spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography sx={popOverLabelText}>Adults</Typography>
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
            <Typography sx={popOverLabelText}>Children</Typography>
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
            <Typography sx={popOverLabelText}>Pets</Typography>
            <NumberInput
              value={value.dogs}
              onChange={(dogs) => {
                if (dogs > 9) return;
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
                      <Typography sx={popOverLabelText}>Child {i + 1} Age</Typography>
                    </InputLabel>
                    <Select
                      key={i}
                      color="primary"
                      sx={{ textAlign: "center", mt: '20px' }}
                      variant='outlined'
                      size="small"
                      value={
                        value.childrenAge && value.childrenAge[i]
                          ? value.childrenAge[i].toString()
                          : "1"
                      }
                      onChange={(e: SelectChangeEvent) => {
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

export default OccupantSelector;
