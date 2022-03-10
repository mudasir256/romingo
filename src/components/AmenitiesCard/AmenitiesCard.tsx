import { FC, useState, MouseEventHandler } from "react";
import Check from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Box,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";

interface AmenitiesProps {
  title: string;
  amenities: string[];
  rowNumber?: number;
  viewAll?: boolean;
}

const AmenitiesCard: FC<AmenitiesProps> = ({
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
        borderRadius: 3,
        boxShadow: 4,
        py: 2,
        px: 2,
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "primary.main", textAlign: "center", mb: 1 }}
      >
        {title}
      </Typography>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={5}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
        >
          {amenities.map((amenity, key) => {
            if (key < 6) {
              return (
                <Box
                  sx={{ display: "inline-flex", flexDirection: "row", mt: 0.4 }}
                  key={key}
                >
                  <Check
                    sx={{
                      fontSize: 15,
                      color: "primary.main",
                      mt: 0.4,
                      mr: ".25rem",
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 0,
                      textTransform: "capitalize",
                      color: "text.primary",
                      textIndent: "-8px",
                      paddingLeft: "8px",
                    }}
                  >
                    {amenity}
                  </Typography>
                </Box>
              );
            }
          })}
        </Grid>
        {!fullScreen && (
          <Grid item sm={4} md={4} lg={5}>
            {amenities.map((amenity, key) => {
              if (key > 6 && key < 13) {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      pl: {
                        sx: "0",
                        sm: "1rem",
                        md: "2rem",
                        lg: "3rem",
                        xl: "4rem",
                      },
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
                        mr: ".25rem",
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 0,
                        textTransform: "capitalize",
                        color: "text.primary",
                        textIndent: "-8px",
                        paddingLeft: "8px",
                      }}
                    >
                      {amenity}
                    </Typography>
                  </Box>
                );
              }
            })}
          </Grid>
        )}
      </Grid>
      {viewAll && amenities.length > 13 && (
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
                color: "primary.main",
              }}
            >
              Amenities
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
                      variant="body1"
                      sx={{
                        mt: 0,
                        color: "text.light",
                        textIndent: "-8px",
                        paddingLeft: "8px",
                      }}
                    >
                      {amenity}
                    </Typography>
                  </Box>
                );
              })}
            </DialogContent>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default AmenitiesCard;
