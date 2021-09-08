import { CSSObject } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Popover from "@material-ui/core/Popover";
import Stack from "@material-ui/core/Stack";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Select, { SelectChangeEvent } from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { FC, MouseEventHandler, useState, useRef } from "react";
import { useMeasure } from "react-use";
import NumberInput from "../NumberInput";

export interface Occupant {
  adults: number;
  children: number;
  dogs: number;
  childrenAge?: number[];
}

interface Props {
  value: Occupant;
  onChange: (value: Occupant) => void;
  sx?: CSSObject;
  fullWidth?: boolean;
  size?: "small" | "medium" | undefined;
  variant?: "filled" | "outlined" | "standard" | undefined;
}

const OccupantSelector: FC<Props> = ({
  value,
  onChange,
  sx,
  fullWidth = true,
  size = "medium",
  variant = "outlined",
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const handleClick: MouseEventHandler<Element> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TextField
        fullWidth={fullWidth}
        label="Occupants"
        sx={sx}
        size={size}
        variant={variant}
        value={`Dogs: ${value.dogs}  Adults: ${value.adults}  Children: ${value.children}  `}
        inputProps={{
          readOnly: true,
        }}
        onClick={handleClick}
        ref={ref}
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
                } else if (value.childrenAge && value.childrenAge.length <= children) {
                  while (value.childrenAge.length !== children) {
                    value.childrenAge.push(0)
                  }
                }
                onChange({ ...value, children });
              }}
            />
          </Stack>
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
                          : "0"
                      }
                      onChange={(e: SelectChangeEvent) => {
                        if (value.childrenAge === undefined) {
                          value.childrenAge = [];
                        }
                        value.childrenAge[i] = parseInt(e.target.value);
                        onChange({ ...value });
                      }}
                    >
                      {Array.from({ length: 18 }, (_, k: number) => {
                        return (
                          <MenuItem value={k} key={k}>
                            {k}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              );
            })}
          </Box>
          <Button sx={{ py: 1.5 }} onClick={handleClose}>
            Done
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default OccupantSelector;
