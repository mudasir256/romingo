import React, { FC, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert, {AlertColor} from "@material-ui/core/Alert";
import Typography from "@material-ui/core/Typography";

interface Props {
  open: boolean;
  message: string;
  type: AlertColor;
}

const CustomToast: FC<Props> = ({ open, message, type }) => {
  const [status, setStatus] = useState(open);

  const handleClose = () => {
    setStatus(false);
  }

  return (
    <>
      <Snackbar open={status} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={handleClose}>
        <Alert severity={type} variant="filled" color={type}>
          <Typography
            variant="body2"
            color="text.primary"
          >
            {message}
          </Typography>
        </Alert>
      </Snackbar>
    </>
  )
};

export default CustomToast;
