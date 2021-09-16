import React, { FC, useState, MouseEventHandler, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CSSObject } from "@mui/material";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import useMediaQuery from "@mui/material/useMediaQuery";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import SingleBedOutlinedIcon from "@mui/icons-material/SingleBedOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";

import { utils } from "../../services/utils";

interface Props {
  sx?: CSSObject;
  beds: {
    code: number;
    count: number;
    desc: string;
    __typename: string;
  }[];
  desc: string;
  amenities: {
    code: number;
    desc: string;
    value: string;
  }[];
  averagePrice: number;
  averagePriceAfterTax: number;
  breakfastIncluded: boolean;
  dinnerIncluded: boolean;
  fees: number | null;
  lunchIncluded: boolean;
  maxOccupants: number;
  nonSmoking: boolean;
  priceKey: string;
  totalPrice: number;
  totalPriceAfterTax: number;
  type: string;
  bestRate?: boolean;
}

export interface RoomInfo {
  beds: {
    code: number;
    count: number;
    desc: string;
    __typename: string;
  }[];
  desc: string;
  amenities: {
    code: number;
    desc: string;
    value: string;
  }[];
  averagePrice: number;
  averagePriceAfterTax: number;
  breakfastIncluded: boolean;
  dinnerIncluded: boolean;
  fees: number | null;
  lunchIncluded: boolean;
  maxOccupants: number;
  nonSmoking: boolean;
  priceKey: string;
  totalPrice: number;
  totalPriceAfterTax: number;
  type: string;
  bestRate?: boolean;
}

const RoomCard: FC<Props> = ({ sx, beds, desc, amenities, averagePrice, averagePriceAfterTax, fees, totalPrice, totalPriceAfterTax, bestRate=false, ...props }) => {

  const [showDialog, setShowDialog] = useState(false);
  const length = 30;

  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const handleClick: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDialog(true);
  };

  const handleOpenPrice: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleClose = () => {
    setShowDialog(false);
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  const [roomTitle, setRoomTitle] = useState("");

  let roomDescription = "";

  useEffect(() => {
    beds.map(bed => {
      if (roomDescription !== "")
        roomDescription += " + ";

      roomDescription += `${bed.count} ${bed.desc} ${bed.__typename}${(bed.count > 1) ? "s" : ""}`
    });

    setRoomTitle(roomDescription);
  }, []);

  return (
    <Box
      sx={{
        ...sx
      }}
    >
      <Box
        sx={{
          display: "flex",

        }}
      >
        <Box
          sx={{
            width: "20%"
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "primary.secondary"
            }}
          >
            {bestRate ? "Best Rate" : "Good Rate"}
          </Typography>
          <Box>
            {beds.map((bed, key) => {
              return Array.from({length: bed.count}, (_, i: number) => (
                  <React.Fragment key={key + "_" + i}>
                    {(bed.desc === "Queen") && (
                      <KingBedOutlinedIcon 
                        sx={{
                          transform: "scale(1.25, 1)",
                          px: 1
                        }}
                      />
                    )}
                    {(bed.desc === "King") && (
                      <KingBedOutlinedIcon 
                        sx={{
                          px: 1
                        }}
                      />
                    )}
                    {(bed.desc === "Single") && (
                      <SingleBedOutlinedIcon 
                        sx={{
                          px: 1
                        }}
                      />
                    )}
                  </React.Fragment>
               ))
            })}
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              mb: 1.5,
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "center"
            }}
          >
            {roomTitle}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 1
            }}
          >
            Room Amenities
          </Typography>
          {amenities.slice(0, 4).map((amenity, key) => {
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
                  {amenity.desc}
                </Typography>
              </Box>
            );
          })}
          <Link href="#" onClick={handleClick}>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                textAlign: "center"
              }}
            >
              More Details
            </Typography>
          </Link>
        </Box>
      </Box>

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
            color: "primary.main"
          }}
        >
          {desc}
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
                fontWeight: "bold",
                color: "secondary.main",
                mt: 2
              }}
            >
              Amenities
            </Typography>
            {amenities.map((amenity, key) => {
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
                    {amenity.desc}
                  </Typography>
                </Box>
              );
            })}
            <Link href="#" onClick={handleOpenPrice} aria-describedby={id} sx={{display: "inline-flex"}}>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  fontWeight: "bold"
                }}
              >
                Price details
              </Typography>
            </Link>
            <Popper 
              id={id} 
              open={open} 
              anchorEl={anchorEl} 
              transition
              style={{
                zIndex: 9999
              }}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Box
                    sx={{
                      border: "1px solid #DDD",
                      borderRadius: "5px",
                      boxShadow: 2,
                      padding: "8px",
                      backgroundColor: "white",
                      minWidth: "250px"
                    }}
                  >
                    <Typography 
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        mb: 2,
                        px: 2
                      }}
                    >
                      Price Details
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 2,
                        mb: 0.5
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "left"
                        }}
                      >
                        Average per night:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "right"
                        }}
                      >
                        ${averagePrice.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 2,
                        mb: 0.5
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "left"
                        }}
                      >
                        After Tax
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "right"
                        }}
                      >
                        ${averagePriceAfterTax.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              )}
            </Popper>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RoomCard;
