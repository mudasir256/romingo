import { FC, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

interface Props {
  open: boolean;
  message: string;
  type: AlertColor;
  duration?: number;
}

const CustomToast: FC<Props> = ({ open, message, type, duration = 5000 }) => {
  const [status, setStatus] = useState(open);

  const handleClose = () => {
    setStatus(false);
  };

  return (
    <>
      <Snackbar
        open={status}
        autoHideDuration={duration}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert severity={type} variant="filled" color={type}>
          <Typography variant="body2" color="text.primary">
            {message}
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomToast;
