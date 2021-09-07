import { CSSObject } from "@material-ui/core";
import Button from "@material-ui/core/Button";
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
                if (dogs > 2)
                  return;
                onChange({ ...value, dogs })
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
                if (adults > 5)
                  return;
                onChange({ ...value, adults })
              }}
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
                if (children > 6)
                  return;
                onChange({ ...value, children })
              }}
            />
          </Stack>
          {(Array.from({length: value.children}, (_, i: number) => {
            return (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
                key={i}
              >
                <Typography variant="body1">Age of Child {(i + 1)}</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={(value.childrenAge && value.childrenAge[i]) ? value.childrenAge[i].toString() : "0"}
                  label="Age"
                  onChange={(e: SelectChangeEvent) => {
                    if (value.childrenAge === undefined) {
                      value.childrenAge = [];
                    }
                    value.childrenAge[i] = parseInt(e.target.value);

                    onChange({...value});
                  }}
                >
                  {Array.from({ length: 18 }, (_, k: number) => {
                    return <MenuItem value={k} key={k}>{k}</MenuItem>
                  })}
                </Select>
              </Stack>
            )
          })) }
          <Button sx={{ py: 1.5 }} onClick={handleClose}>
            Done
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default OccupantSelector;
