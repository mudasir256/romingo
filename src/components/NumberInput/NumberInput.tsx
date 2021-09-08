import IconButton from "@material-ui/core/IconButton";
import Stack from "@material-ui/core/Stack";
import Typography from "@material-ui/core/Typography";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import { FC } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  minimum?: number;
}

const NumberInput: FC<Props> = ({ value, onChange, minimum = 0 }) => {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <IconButton onClick={() => onChange(Math.max(value - 1, minimum))}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography variant="body1" sx={{ width: 16, textAlign: "center" }}>
        {value}
      </Typography>
      <IconButton onClick={() => onChange(value + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Stack>
  );
};

export default NumberInput;
