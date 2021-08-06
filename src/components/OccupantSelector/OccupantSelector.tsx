import { CSSObject } from "@material-ui/core";
import Button from "@material-ui/core/Button";
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
  fullWidth?: boolean;
  size?: "small" | "medium" | undefined;
}

const OccupantSelector: FC<Props> = ({
  value,
  onChange,
  sx,
  fullWidth = true,
  size = "medium",
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
        value={`Adults: ${value.adults} - Children: ${value.children} - Dogs: ${value.dogs}`}
        inputProps={{
          readOnly: true,
          style: { textAlign: "center" },
          sx: { fontSize: { xs: "85%", sm: "100%" } },
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
        <Stack sx={{ p: 3 }} spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Adults</Typography>
            <NumberInput
              value={value.adults}
              onChange={(adults) => onChange({ ...value, adults })}
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
              onChange={(children) => onChange({ ...value, children })}
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
              onChange={(dogs) => onChange({ ...value, dogs })}
            />
          </Stack>
          <Button onClick={handleClose}>Done</Button>
        </Stack>
      </Popover>
    </>
  );
};

export default OccupantSelector;
