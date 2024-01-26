import { FC, ReactNode } from 'react';
import { 
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Box
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface FullPageDialogProps {
    isOpen: boolean;
    close: () => void;
    onDone?: () => void;
    children: ReactNode;
}

const FullPageDialog: FC<FullPageDialogProps> = ({ isOpen, close, onDone = () => {},children }) => {
    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={() => close()}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => close()}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {children}
            {onDone &&
                <Box 
                    sx={{
                        zIndex: "900" ,
                        position: "fixed" ,
                        width: "94%" ,
                        backgroundColor: "white",
                        bottom: "0" ,
                        p: "1rem",
                    }}
                >
                    <Button 
                        onClick={() => onDone()} 
                        fullWidth 
                        variant="contained"
                    >
                        Done
                    </Button>
                </Box>
            }
        </Dialog>
    )
}

export default FullPageDialog