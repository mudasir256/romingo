import React, { FC, useState, MouseEventHandler } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { CSSObject } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

import { utils } from "../../services/utils";

interface Props {
  sx?: CSSObject;
  HotelName: string;
  RoomIndex: number;
  BedTypes: {
    BedType: {
      Code: number;
      Count: number;
    }[]
  };
  RoomDescription: {
    Name: string;
    Text: string[];
  };
  Amenities: {
    Amenity: {
      Code: number;
      Description: string;
    }[]
  };
  Occupancy: {
    Max: number
  };
  RatePlans: {
    RatePlan: {
      RatePlanName: string;
      RatePlanType?: string;
      PrepaidIndicator: boolean;
      AvailableQuantity: number;
      RateSource: string;
      RateKey: string;
      RatePlanDescription: {
        Text: string;
      };
      RatePlanInclusions: {
        RatePlanInclusionDescription: {
          Name: string;
          Code: number
        }[]
      };
      RateInfo: {
        StartDate: string;
        EndDate: string;
        AmountBeforeTax: number;
        AmountAfterTax: number;
        AverageNightlyRate: number;
        CurrencyCode: string;
        AdditionalFeesInclusive: boolean;
        TaxInclusive: boolean;
        Rates?: {
          Rate: {
            StartDate: string;
            EndDate: string;
            AmountBeforeTax: number;
            AmountAfterTax: number;
            CurrencyCode: string;
          }[]
        },
        Taxes: {
          Amount: number;
          CurrencyCode: string;
          Tax?: {
            StartDate: string;
            EndDate: string;
            Amount: number;
            CurrencyCode: string
          }[];
          TaxGroups: {
            TaxGroup: {
              Code: number;
              Amount: number;
              CurrencyCode: string;
              TaxDescription: {
                Text: string[]
              }
            }[]
          };
        }
        CancelPenalties: {
          CancelPenalty: {
            Refundable: boolean;
            Deadline: {
              AbsoluteDeadline: string;
            };
            AmountPercent: {
              NmbrOfNights?: number;
              Amount?: number;
              CurrencyCode?: string;
            }
          }[]
        };
        Guarantee: {
          GuaranteeType: string;
          GuaranteesAccepted: {
            GuaranteeAccepted: {
              GuaranteeTypeCode: number;
              PaymentCards?: {
                PaymentCard: {
                  CardCode: string;
                  value: string;
                }[]
              }
            }[]
          };
          GuaranteeDescription?: {
            Text: string[];
          };
        }
        AdditionalDetails: {
          AdditionalDetail: {
            Code: number;
            Text: string[];
          }[]
        }
      }
    }[]
  }
}

export interface RoomInfo {
  RoomIndex: number;
  BedTypes: {
    BedType: {
      Code: number;
      Count: number;
    }[]
  };
  RoomDescription: {
    Name: string;
    Text: string[];
  };
  Amenities: {
    Amenity: {
      Code: number;
      Description: string;
    }[]
  };
  Occupancy: {
    Max: number
  };
  RatePlans: {
    RatePlan: {
      RatePlanName: string;
      RatePlanType?: string;
      PrepaidIndicator: boolean;
      AvailableQuantity: number;
      RateSource: string;
      RateKey: string;
      RatePlanDescription: {
        Text: string;
      };
      RatePlanInclusions: {
        RatePlanInclusionDescription: {
          Name: string;
          Code: number
        }[]
      };
      RateInfo: {
        StartDate: string;
        EndDate: string;
        AmountBeforeTax: number;
        AmountAfterTax: number;
        AverageNightlyRate: number;
        CurrencyCode: string;
        AdditionalFeesInclusive: boolean;
        TaxInclusive: boolean;
        Rates?: {
          Rate: {
            StartDate: string;
            EndDate: string;
            AmountBeforeTax: number;
            AmountAfterTax: number;
            CurrencyCode: string;
          }[]
        },
        Taxes: {
          Amount: number;
          CurrencyCode: string;
          Tax?: {
            StartDate: string;
            EndDate: string;
            Amount: number;
            CurrencyCode: string
          }[];
          TaxGroups: {
            TaxGroup: {
              Code: number;
              Amount: number;
              CurrencyCode: string;
              TaxDescription: {
                Text: string[]
              }
            }[]
          };
        }
        CancelPenalties: {
          CancelPenalty: {
            Refundable: boolean;
            Deadline: {
              AbsoluteDeadline: string;
            };
            AmountPercent: {
              NmbrOfNights?: number;
              Amount?: number;
              CurrencyCode?: string;
            }
          }[]
        };
        Guarantee: {
          GuaranteeType: string;
          GuaranteesAccepted: {
            GuaranteeAccepted: {
              GuaranteeTypeCode: number;
              PaymentCards?: {
                PaymentCard: {
                  CardCode: string;
                  value: string;
                }[]
              }
            }[]
          };
          GuaranteeDescription?: {
            Text: string[];
          };
        }
        AdditionalDetails: {
          AdditionalDetail: {
            Code: number;
            Text: string[];
          }[]
        }
      }
    }[]
  }
}

const RoomCard: FC<Props> = ({ sx, HotelName, RoomIndex, BedTypes, RoomDescription, Amenities, Occupancy, RatePlans, ...props }) => {

  const [showDialog, setShowDialog] = useState(false);
  const length = 30;

  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const descriptionArray = RoomDescription.Text[0].split("/").map((text, key) => {
    return text.trim();
  });

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

  return (
    <Box
      sx={{
        ...sx
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 0.5,
          color: "primary.main",
        }}
      >
        {HotelName}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 1.5
        }}
      >
        {RoomDescription.Name}
      </Typography>
      {descriptionArray.map((description, key) => {
        if (description !== "" && key < 5)
          return (
            <Typography
              variant="body2"
              sx={{
                mb: 0.5
              }}
              key={key}
            >
              {description}
            </Typography>
          )
      })}
      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
          color: "secondary.main",
          mt: 1.5
        }}
      >
        {RatePlans.RatePlan[0].RateInfo.CancelPenalties.CancelPenalty[0].Refundable ? "Fully Refundable" : "Non Refundable"}
      </Typography>
      {RatePlans.RatePlan[0].RateInfo.CancelPenalties.CancelPenalty[0].Refundable && (
        <Typography
          variant="body2"
          sx={{
            mt: 0.5
          }}
        >
          Before {utils.getOnlyDate(RatePlans.RatePlan[0].RateInfo.CancelPenalties.CancelPenalty[0].Deadline.AbsoluteDeadline)}
        </Typography>
      )}
      <Link href="#" onClick={handleClick}>
        <Typography
          variant="body2"
          sx={{
            mt: 1
          }}
        >
          More Details
        </Typography>
      </Link>

      <Dialog
        open={showDialog}
        keepMounted
        fullWidth
        fullScreen={true}
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
          <Typography variant="h6" color="primary">
            {HotelName}
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
          <DialogContentText id="room-dialog-slide-description">
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "secondary.main"
                }}
              >
                Description
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textIndent: "-8px",
                  paddingLeft: "8px",
                  mt: 0.4
                }}
              >
                {RoomDescription.Text[0]}
              </Typography>
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
              {Amenities.Amenity.map((amenity, key) => {
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
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "secondary.main",
                  mt: 2
                }}
              >
                Room Options
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.4,
                  paddingLeft: "8px"
                }}
              >
                {RatePlans.RatePlan[0].RateInfo.CancelPenalties.CancelPenalty[0].Refundable ? "Fully Refundable" : "Non Refundable"}
              </Typography>
              {RatePlans.RatePlan[0].RateInfo.CancelPenalties.CancelPenalty[0].Refundable && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 0.5,
                    color: "info.main",
                    paddingLeft: "8px"
                  }}
                >
                  Before {utils.getOnlyDate(RatePlans.RatePlan[0].RateInfo.CancelPenalties.CancelPenalty[0].Deadline.AbsoluteDeadline)}
                </Typography>
              )}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "secondary.main",
                  mt: 2
                }}
              >
                Price
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.4,
                  paddingLeft: "8px",
                  fontSize: "125%"
                }}
              >
                ${RatePlans.RatePlan[0].RateInfo.AverageNightlyRate}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  paddingLeft: "8px",
                }}
              >
                per night
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  paddingLeft: "8px",
                  mt: 0.4,
                  fontWeight: "bold"
                }}
              >
                Total: ${RatePlans.RatePlan[0].RateInfo.AmountBeforeTax}
              </Typography>
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
                          ${RatePlans.RatePlan[0].RateInfo.AverageNightlyRate}
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
                          ${RatePlans.RatePlan[0].RateInfo.AmountAfterTax}
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
                          Before Tax
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: "right"
                          }}
                        >
                          ${RatePlans.RatePlan[0].RateInfo.AmountBeforeTax}
                        </Typography>
                      </Box>
                    </Box>
                  </Fade>
                )}
              </Popper>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RoomCard;
