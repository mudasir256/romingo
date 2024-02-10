import {
    Radio,
    FormControlLabel,
    Typography
} from "@mui/material";

import styles from './styles';

const FilterRadioButton = ({value, label}) => {
    return (
        <FormControlLabel
        sx={styles.filterFormControlLabel}
        value={value}
        control={<Radio sx={{ py: 0 }} />}
        label={
            <Typography sx={styles.filterItemText}>
            {label}
            </Typography>
        }
        />
    )
}

export default FilterRadioButton