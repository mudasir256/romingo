import React, { FC, useState, MouseEventHandler } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Check from "@material-ui/icons/Check";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";

interface Props {
  title: string;
  amenities: {
    Code: number;
    Description: string;
    Value: string;
  }[];
  rowNumber?: number;
  viewAll?: boolean;
}

const AmenitiesCard: FC<Props> = ({
  title,
  amenities,
  rowNumber = 5,
  viewAll,
}) => {
  const subAmenities =
    amenities.length > rowNumber ? amenities.slice(0, rowNumber) : amenities;

  const [showDialog, setShowDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleOpen: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDialog(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderRadius: 5,
        boxShadow: 4,
        py: 2,
        px: 2,
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          fontSize: "85%",
          textAlign: "center",
          mb: 1,
        }}
      >
        {title}
      </Typography>
      {subAmenities.map((amenity, key) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              mt: 0.4,
            }}
            key={key}
          >
            <Check sx={{ fontSize: 15, color: "primary.main", mt: 0.4 }} />
            <Typography
              variant="body2"
              sx={{
                mt: 0,
                textTransform: "capitalize",
                color: "text.primary",
                textIndent: "-8px",
                paddingLeft: "8px",
              }}
            >
              {amenity.Description}
            </Typography>
          </Box>
        );
      })}
      {viewAll && (
        <>
          <Box
            sx={{
              py: 0.2,
              textAlign: "center",
            }}
          >
            <Link href="#" onClick={handleOpen}>
              <Typography variant="body2">View All</Typography>
            </Link>
          </Box>
          <Dialog
            open={showDialog}
            keepMounted
            fullWidth
            fullScreen={fullScreen}
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
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                Amenities
              </Typography>
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
              <DialogContentText id="amenities-dialog-slide-description">
                {amenities.map((amenity, key) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        py: 1.25,
                      }}
                      key={key}
                    >
                      <Check
                        sx={{
                          fontSize: 15,
                          color: "primary.main",
                          mt: 0.3,
                          mr: 0.5,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0,
                          color: "text.light",
                          textIndent: "-8px",
                          paddingLeft: "8px",
                        }}
                      >
                        {amenity.Description}
                      </Typography>
                    </Box>
                  );
                })}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default AmenitiesCard;
