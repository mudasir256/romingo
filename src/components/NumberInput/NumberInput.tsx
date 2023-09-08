import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import { FC } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  minimum?: number;
}

const NumberInput: FC<Props> = ({ value, onChange, minimum = 0 }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent='flex-end'>
      <IconButton onClick={() => onChange(Math.max(value - 1, minimum))} size="large">
        <RemoveCircleOutline style={{fontSize: 20}}/>
      </IconButton>
      <Typography variant="body1" sx={{ width: 16, textAlign: "center" }}>
        {value}
      </Typography>
      <IconButton onClick={() => onChange(value + 1)} size="large">
        <AddCircleOutline style={{fontSize: 20}}/>
      </IconButton>
    </Stack>
  );
};

export default NumberInput;
