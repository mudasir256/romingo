import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { utils } from "../../services/utils";

interface Activity {
  name: string;
  overview: string;
  activityType: {
    id: number;
    name: string;
  };
  addressLine1: string;
  desc: string;
  distanceInMeters: number;
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  price: number;
}

interface Props {
  title: string;
  nearby: Activity[];
}

const ActivitiesNeary: FC<Props> = ({ title, nearby }) => {
  const [showDialog, setShowDialog] = useState(false);

  const [popActivity, setPopActivity] = useState<Activity>({
    name: "string",
    overview: "",
    activityType: {
      id: 0,
      name: "",
    },
    addressLine1: "",
    desc: "",
    distanceInMeters: 0,
    id: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
    price: 0,
  });

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderRadius: 3,
        py: 0,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "secondary.main",
          mb: 1,
        }}
      >
        {title}
      </Typography>
      {nearby.map((item, key) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              mt: 0.4,
            }}
            key={key}
          >
            <Check
              sx={{
                fontSize: 15,
                color: "primary.main",
                mt: 0.4,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                mt: 0,
                color: "text.primary",
                textIndent: "-8px",
                paddingLeft: "8px",
              }}
            >
              {item.name}
              <span style={{ fontWeight: "bold" }}>
                {" "}
                {utils.meterToMile(item?.distanceInMeters)}mi{" "}
              </span>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setPopActivity({ ...nearby[key] });
                  setShowDialog(true);
                }}
              >
                details
              </Link>
            </Typography>
          </Box>
        );
      })}
      <Dialog
        open={showDialog}
        keepMounted
        fullWidth
        onClose={handleClose}
        scroll="body"
        aria-labelledby="amenities-dialog-slide-title"
        aria-describedby="amenities-dialog-slide-description"
        sx={{ maxWidth: "xl" }}
      >
        <DialogTitle
          id="amenities-dialog-slide-title"
          sx={{
            textAlign: "center",
            color: "primary.main",
            py: 1,
          }}
        >
          {popActivity["name"]}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              {popActivity["overview"]}
            </Typography>
            <Link
              href={`https://maps.google.com/?q=${popActivity["addressLine1"]}`}
              target="_blank"
            >
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  py: 0.5,
                  textAlign: "center",
                }}
              >
                {popActivity["addressLine1"]}
              </Typography>
            </Link>
          </Box>
          <Box py={1}>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                textAlign: "left",
              }}
            >
              {popActivity["desc"]}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "secondary.main",
                textAlign: "left",
              }}
            >
              Cost: ${popActivity["price"]}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ActivitiesNeary;
