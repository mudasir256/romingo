import { FC, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";

import People from "@mui/icons-material/People";

import NumberInput from "./NumberInput";
import FullPageDialog from "../FullPageDialog";

export interface Occupant {
    adults: number;
    children: number;
    dogs: number;
    childrenAge?: number[];
    disabled?: boolean;
}
  
interface OccupantSelectorProps {
    value: Occupant;
    onChange: (value: Occupant) => void;
    onClose?: () => void;
    fullWidth?: boolean;
    size?: "small" | "medium" | undefined;
    variant?: "filled" | "outlined" | "standard" | undefined;
    disabled?: boolean;
    align?: "left" | "right";
}
  
const OccupantSelector: FC<OccupantSelectorProps> = ({
    value,
    onChange,
    onClose,
}) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [error, setError] = useState("");
    const [showOccupantDialog, setShowOccupantDialog] = useState(false)
  
    const handleClick = (event: any) => {
      setShowOccupantDialog(true);
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
      setShowOccupantDialog(false);
    };
  
    const popOverLabelText = {
      fontSize: '1em',
      fontFamily: 'overpass-light',
      color: 'black',
    }
  
    return (
        <>
            <Grid
                container
                onClick={handleClick}
                sx={{
                    border: "1px solid #aaabab",
                    borderRadius: "6px",
                    padding: ".5rem 0rem .5rem 0.75rem",
                    backgroundColor: 'white',
                }}
            >
                <Grid
                    item
                    sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: '0.5em',
                    mr: '0.25em',
                    }}
                >
        
                    <People 
                        sx={{
                            fontSize: "1.5em",
                            pointerEvents: "auto",
                            mr: '0.25em',
                            height: '24px',
                            p: '0.1em',
                            pl: 0,
                        }} 
                    />
                </Grid>
                <Typography 
                    variant="base"
                    sx={{
                    mt: '0.25em',
                    ml: '0.25em',
                    }}
                >
                    {value.adults + value.children} Guests, {value.dogs} Pet
                    {value.dogs === 1 ? "" : "s"}
                </Typography>
            </Grid>
    
            <FullPageDialog
              isOpen={showOccupantDialog}
              close={() => setShowOccupantDialog(false)}
              onDone={handleClose}
            >
                <Box 
                    sx={{
                        zIndex: 100,
                        width: '100%',
                        height: '90vh',
                        position: 'fixed',
                        backgroundColor: 'white',
                        gap: '1rem',
                        left: '0', top: '50px', mt: '0rem'
                    }}
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
                            <Typography sx={popOverLabelText}>Dogs</Typography>
                            <NumberInput
                                value={value.dogs}
                                onChange={(dogs) => {
                                    if (dogs > 2) return;
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
                                        key={i}
                                        sx={{
                                            mx: "5px",
                                            mt: "0px",
                                            mb: "15px",
                                            width: "calc(50% - 10px)",
                                            display: "inline-block",
                                        }}
                                    >
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel sx={{ textAlign: "center" }}>
                                                Child {i + 1} Age
                                            </InputLabel>
                                            <Select
                                                key={i}
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                                sx={{ ...popOverLabelText, textAlign: "center", marginTop: '20px' }}
                                                value={
                                                    value.childrenAge && value.childrenAge[i]
                                                    ? value.childrenAge[i].toString()
                                                    : "1"
                                                }
                                                onChange={(e: any) => {
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
                    {/* <Button
                        sx={{ pt: 1.5, pb: 1.5, width: "100%", mt: -1.25 }}
                        onClick={handleClose}
                    >
                        Done
                    </Button> */}
                </Box>
            </FullPageDialog>
        </>
    );
};

export default OccupantSelector