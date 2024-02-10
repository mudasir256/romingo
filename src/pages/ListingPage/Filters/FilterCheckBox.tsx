import {
    Checkbox,
    FormControlLabel,
    Typography
} from "@mui/material";

import styles from './styles';

const FilterCheckBox = ({inputName, label, checked}) => {
    return (
        <FormControlLabel 
            sx={styles.filterFormControlLabel}
            control={(
                <Checkbox
                    name={inputName}
                    sx={styles.filterCheckBox}
                    checked={checked} 
                />
            )} 
            label={(
                <Typography sx={styles.filterItemText}>
                    {label}
                </Typography>
                )}
        />
    )
}

export default FilterCheckBox
