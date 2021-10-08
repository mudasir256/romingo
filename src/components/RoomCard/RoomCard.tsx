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
import Backdrop from "@mui/material/Backdrop";
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
  totalFees?: number;
  fees?: {
    amount: number;
    desc: string;
  }[];
  lunchIncluded: boolean;
  maxOccupants: number;
  nonSmoking: boolean;
  priceKey: string;
  totalPrice: number;
  totalPriceAfterTax: number;
  type: string;
  bestRate?: boolean;
  cancelationPolicy: {
    deadlineLocal: string | null;
    cancelable: boolean;
  };
  feesIncluded: boolean;
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
  totalFees?: number;
  fees?: {
    amount: number;
    desc: string;
  }[];
  lunchIncluded: boolean;
  maxOccupants: number;
  nonSmoking: boolean;
  priceKey: string;
  totalPrice: number;
  totalPriceAfterTax: number;
  type: string;
  bestRate?: boolean;
  cancelationPolicy: {
    deadlineLocal: string | null;
    cancelable: boolean;
  };
  feesIncluded: boolean;
}

const RoomCard: FC<Props> = ({
  sx,
  beds,
  desc,
  amenities,
  averagePrice,
  averagePriceAfterTax,
  fees,
  totalFees,
  totalPrice,
  totalPriceAfterTax,
  bestRate = false,
  cancelationPolicy,
  feesIncluded,
  type,
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

  useEffect(() => {
    let roomDescription = "";

    beds.map((bed) => {
      if (roomDescription !== "") roomDescription += " + ";

      roomDescription += `${bed.count} ${bed.desc} ${bed.__typename}${
        bed.count > 1 ? "s" : ""
      }`;
    });

    roomDescription = (type ? type + "\n" : "") + roomDescription;

    setRoomTitle(roomDescription);
  }, []);
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        flexWrap: "wrap",
        minHeight: "150px",
        flex: 1,
        backgroundColor: "lightBackground.main",
        boxShadow: bestRate ? 4 : 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "40%", sm: "20%" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: bestRate ? "white" : "secondary.main",
            backgroundColor: bestRate ? "primary.main" : "white",
            fontWeight: 800,
            borderRadius: 1,
            p: 0.75,
            ml: -2.8,
            mt: -2.8,
            boxShadow: 2,
            textAlign: "center",
            transform: "rotate(-7deg)",
          }}
        >
          {bestRate ? "Best Rate!" : "Good Rate"}
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
          {beds?.map((bed, key) => {
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
                {bed.desc === "Double" && (
                  <KingBedOutlinedIcon
                    sx={{
                      fontSize: { xs: "25px", md: "28px" },
                      transform: "scale(0.85, 0.9)",
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
          width: { xs: "60%", sm: "40%" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            fontSize: "1.1rem",
            letterSpacing: 0,
            whiteSpace: "pre-line",
          }}
        >
          {roomTitle}
        </Typography>
        <Box sx={{ mx: 2 }}>
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
      </Box>
      <Box
        sx={{
          width: { xs: "100%", sm: "30%" },
          display: { xs: "block", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Chip
            color={cancelationPolicy.cancelable ? "primary" : "warning"}
            sx={{
              textAlign: "center",
              width: "100%",
              height: "40px",
              backgroundColor: "white",
              mt: { xs: "20px", sm: "0px" },
            }}
            variant="outlined"
            label={
              <Typography
                variant="body2"
                sx={{
                  overflow: "visible",
                  textAlign: "center",
                  whiteSpace: "pre-line",
                  fontSize: "12px",
                  lineHeight: 1,
                  fontWeight: 800,
                  marginTop: 1,
                  marginBottom: 1,
                }}
              >
                {cancelationPolicy.cancelable
                  ? `Refundable before
                ${utils.getFormatDate(cancelationPolicy.deadlineLocal)}`
                  : "Non-Refundable"}
              </Typography>
            }
          />
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
              Per Night:
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
              Taxes:
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "80%" }}>
              ${(totalPriceAfterTax - totalPrice).toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontVariantNumeric: "tabular-nums",
              my: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "80%",
                fontWeight: "bold",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleOpenPrice}
            >
              Due Now*:
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "80%", fontWeight: "bold" }}
            >
              ${totalPriceAfterTax.toFixed(2)}
            </Typography>
          </Box>
          <Backdrop
            open={open}
            onClick={() => {
              setAnchorEl(null);
            }}
            invisible={true}
          >
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
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "80%",
                        textAlign: "center",
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
                          fontSize: "80%",
                        }}
                      >
                        Per Night:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "right",
                          fontSize: "80%",
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
                          fontSize: "80%",
                        }}
                      >
                        Taxes:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "right",
                          fontSize: "80%",
                        }}
                      >
                        ${(totalPriceAfterTax - totalPrice).toFixed(2)}
                      </Typography>
                    </Box>
                    {totalFees && totalFees > 0 && (
                      <Box
                        sx={{
                          px: 2,
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: "center",
                            fontSize: "80%",
                          }}
                        >
                          Fees:
                        </Typography>
                      </Box>
                    )}
                    {fees?.map((fee) => {
                      return (
                        <Box
                          key={fee.desc}
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
                              fontSize: "80%",
                            }}
                          >
                            {fee?.desc}:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: "right",
                              fontSize: "80%",
                            }}
                          >
                            ${fee?.amount.toFixed(2)}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Fade>
              )}
            </Popper>
          </Backdrop>
          <Box
            sx={{
              textAlign: "left",
              mb: 0.5,
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "70%", lineHeight: 1 }}>
              {feesIncluded
                ? "*Includes all taxes and fees"
                : "*Some fees due at property"}
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
            pt: 1.5,
            pb: 0.5,
          }}
        >
          {roomTitle}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "secondary.main",
                mt: 1,
                textAlign: "justify",
              }}
            >
              {desc}
            </Typography>
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
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RoomCard;
