import React, { FC, useState, MouseEventHandler, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CSSObject } from "@mui/material";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Chip from "@mui/material/Chip";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
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
  cancellationPolicy: {
    cutOffAt: string | null;
    refundable: boolean;
  };
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
  cancellationPolicy: {
    cutOffAt: string | null;
    refundable: boolean;
  };
}

const RoomCard: FC<Props> = ({
  sx,
  beds,
  desc,
  amenities,
  averagePrice,
  averagePriceAfterTax,
  fees,
  totalPrice,
  totalPriceAfterTax,
  bestRate = false,
  cancellationPolicy,
  ...props
}) => {
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
  };

  const open = Boolean(anchorEl);
  const id = open ? "transitions-popper" : undefined;

  const [roomTitle, setRoomTitle] = useState("");

  let roomDescription = "";

  const getFormatDate = function (str: string | null) {
    let date;
    if (str) date = new Date(str);
    else date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  useEffect(() => {
    beds.map((bed) => {
      if (roomDescription !== "") roomDescription += " + ";

      roomDescription += `${bed.count} ${bed.desc} ${bed.__typename}${
        bed.count > 1 ? "s" : ""
      }`;
    });

    setRoomTitle(roomDescription);
  }, []);

  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        minHeight: "150px",
        flex: 1,
        backgroundColor: "lightBackground.main",
      }}
    >
      <Box
        sx={{
          width: "20%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "white",
            backgroundColor: "secondary.main",
            fontWeight: 800,
            borderRadius: 1,
            p: 0.75,
            ml: -2.8,
            mt: -2.8,
            boxShadow: 2,
            textAlign: "center",
          }}
        >
          {bestRate ? "Best Rate" : "Good Rate"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            fontSize: "50px",
          }}
        >
          {beds.map((bed, key) => {
            return Array.from({ length: bed.count }, (_, i: number) => (
              <React.Fragment key={key + "_" + i}>
                {bed.desc === "Queen" && (
                  <KingBedOutlinedIcon
                    sx={{
                      fontSize: { xs: "25px", md: "28px" },
                      p: 0.5,
                    }}
                  />
                )}
                {bed.desc === "King" && (
                  <KingBedOutlinedIcon
                    sx={{
                      fontSize: { xs: "25px", md: "28px" },
                      transform: "scale(1.25, 1)",
                      p: 0.5,
                    }}
                  />
                )}
                {bed.desc === "Single" && (
                  <SingleBedOutlinedIcon
                    sx={{
                      fontSize: { xs: "25px", md: "28px" },
                      p: 0.5,
                    }}
                  />
                )}
              </React.Fragment>
            ));
          })}
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "40%", md: "50%" },
          px: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          {roomTitle}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
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
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
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
            }}
          >
            Details
          </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          width: { xs: "40%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Chip
            color={cancellationPolicy.refundable ? "primary" : "warning"}
            sx={{ textAlign: "center", width: "100%" }}
            variant="outlined"
            label={
              cancellationPolicy.refundable ? "Refundable" : "Non-Refundable"
            }
          />

          {cancellationPolicy.refundable && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "75%",
                textAlign: "center",
                mt: 1,
              }}
            >
              Cancel by {getFormatDate(cancellationPolicy.cutOffAt)} for a
              refund
            </Typography>
          )}
        </div>
        <Box
          sx={{
            textAlign: "center",
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "80%" }}>
              Per Night
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "80%" }}>
              ${averagePrice.toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "80%" }}>
              Taxes/Fees
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "80%" }}>
              ${averagePriceAfterTax.toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: "80%", fontWeight: "bold" }}
            >
              Due Now
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "80%", fontWeight: "bold" }}
            >
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            color="primary"
            sx={{
              py: 1,
              px: 1,
              mb: 0.5,
              textTransform: "inherit",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ textTransform: "uppercase", fontSize: { xs: "16px" } }}
            >
              Book Now
            </Typography>
          </Button>
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
            color: "primary.main",
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
                mt: 2,
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
                  <Check
                    sx={{ fontSize: 15, color: "primary.main", mt: 0.4 }}
                  />
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
            <Link
              href="#"
              onClick={handleOpenPrice}
              aria-describedby={id}
              sx={{ display: "inline-flex" }}
            >
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  fontWeight: "bold",
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
                zIndex: 9999,
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
                      minWidth: "250px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        mb: 2,
                        px: 2,
                      }}
                    >
                      Price Details
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 2,
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        Average per night:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "right",
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
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        After Tax
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "right",
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
