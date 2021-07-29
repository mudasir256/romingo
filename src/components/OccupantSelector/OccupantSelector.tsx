import { CSSObject } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Stack from "@material-ui/core/Stack";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { FC, MouseEventHandler, useState } from "react";
import { useMeasure } from "react-use";
import NumberInput from "../NumberInput";

export interface Occupant {
  adults: number;
  children: number;
  dogs: number;
}

interface Props {
  value: Occupant;
  onChange: (value: Occupant) => void;
  sx?: CSSObject;
}

const OccupantSelector: FC<Props> = ({ value, onChange, sx }) => {
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
        fullWidth
        sx={sx}
        value={`Adults: ${value.adults} - Children: ${value.children} - Dogs: ${value.dogs}`}
        inputProps={{ readOnly: true, style: { textAlign: "center" } }}
        onClick={handleClick}
        ref={ref}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ ".MuiPopover-paper": { width } }}
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
            <NumberInput
              value={value.adults}
              onChange={(adults) => onChange({ ...value, adults })}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={12}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="h6">Children</Typography>
            <NumberInput
              value={value.children}
              onChange={(children) => onChange({ ...value, children })}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={12}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="h6">Dogs</Typography>
            <NumberInput
              value={value.dogs}
              onChange={(dogs) => onChange({ ...value, dogs })}
            />
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

export default OccupantSelector;
