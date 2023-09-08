import { FC, useState } from "react";
import {
  Box,
  Typography,
  Link,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Nature, Park, LocationCity, Pets } from "@mui/icons-material";
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
      sx={{ color: "text.primary", borderRadius: 3, py: 0, pr: { sm: "1rem" } }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#222222",
          mb: 1,
          fontWeight: 600,
          fontFamily: "Montserrat",
        }}
      >
        {title}
      </Typography>
      {nearby.length === 0 && (
        <>
          <Typography variant="body2">Coming soon...</Typography>
          <Typography variant="body2">
            We are hard at work compiling a list of the best pet-friendly
            activities, restaurants, and shops nearby this hotel.
          </Typography>
        </>
      )}
      {nearby.map((item, key) => {
        if (key < 6) {
          return (
            <Box
              sx={{ mt: "0.9rem", display: "flex", alignItems: "center" }}
              key={key}
            >
              {item.name.toLowerCase().includes("recreation") ? (
                <Nature sx={{ color: "#999", mr: "1rem", fontSize: "20px" }} />
              ) : item.name.toLowerCase().includes("city") ? (
                <LocationCity
                  sx={{ color: "#999", mr: "1rem", fontSize: "20px" }}
                />
              ) : item.name.toLowerCase().includes("dog") ? (
                <Pets sx={{ color: "#999", mr: "1rem", fontSize: "20px" }} />
              ) : (
                <Park sx={{ color: "#999", mr: "1rem", fontSize: "20px" }} />
              )}
              <Typography
                title={item.name}
                variant="body1"
                sx={{
                  mt: 0,
                  color: "rgba(0, 0, 0, 0.78)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  fontWeight: 400,
                  textTransform: "capitalize",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                  letterSpacing: ".015rem",
                  fontFamily: "Roboto",
                  fontSize: ".9rem",
                }}
              >
                <span style={{ fontWeight: 600, color: "#888" }}>
                  {" "}
                  {utils.meterToMile(item?.distanceInMeters)}mi{" "}
                </span>
                &#8212;&nbsp;
                {item.name}
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setPopActivity({ ...nearby[key] });
                    setShowDialog(true);
                  }}
                >
                  {/* <Launch sx={{ ml: '.5rem', fontSize: '20px' }} /> */}
                </Link>
              </Typography>
            </Box>
          );
        }
      })}
      <Dialog
        open={showDialog}
        keepMounted
        fullWidth
        onClose={handleClose}
        scroll="body"
        sx={{ maxWidth: "xl" }}
      >
        <DialogTitle
          id="amenities-dialog-slide-title"
          sx={{ textAlign: "center", color: "primary.main", py: 1 }}
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
            size="large">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              {popActivity["overview"]}
            </Typography>
            <Link
              href={`https://maps.google.com/?q=${popActivity["addressLine1"]}`}
              target="_blank"
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", py: 0.5, textAlign: "center" }}
              >
                {popActivity["addressLine1"]}
              </Typography>
            </Link>
          </Box>
          <Box py={1}>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", textAlign: "left" }}
            >
              {popActivity["desc"]}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "secondary.main", textAlign: "left" }}
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
