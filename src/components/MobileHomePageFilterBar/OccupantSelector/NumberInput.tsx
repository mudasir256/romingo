import { FC } from "react";
import {
  IconButton,
  Typography,
  Stack,
} from "@mui/material";

import {
  RemoveCircleOutline,
  AddCircleOutline,
} from "@mui/icons-material";

export interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    minimum?: number;
}
  
const NumberInput: FC<NumberInputProps> = ({
    value,
    onChange,
    minimum = 0,
}) => {
    return (
        <Stack spacing={2} direction="row" alignItems="center">
            <IconButton onClick={() => onChange(Math.max(value - 1, minimum))} size="large">
                <RemoveCircleOutline />
            </IconButton>
            <Typography variant="body1" sx={{ width: 16, textAlign: "center" }}>
                {value}
            </Typography>
            <IconButton onClick={() => onChange(value + 1)} size="large">
                <AddCircleOutline />
            </IconButton>
        </Stack>
    );
};

export default NumberInput