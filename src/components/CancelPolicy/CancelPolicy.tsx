import { FC } from "react";
import { CSSObject } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { utils } from "../../services/utils";

interface Props {
  sx?: CSSObject;
  policy: {
    cancelable: boolean;
    deadlineLocal: string | null;
  };
}

const CancelPolicy: FC<Props> = ({ sx, policy }) => {
  return (
    <Box sx={sx}>
      <Box
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          borderRadius: 3,
          border: "none",
          pt: 2,
          pb: 2.5,
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            textAlign: "center",
          }}
        >
          Cancellation &amp; Refund Policy
        </Typography>
        <Box
          sx={{
            mt: 0.5,
            px: 0.5,
          }}
        >
          {policy?.cancelable ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "bottom",
                  justifyContent: "start",
                  mt: 1,
                }}
              >
                <Check
                  sx={{
                    fontSize: { xs: 15, sm: 18 },
                    mr: 0.75,
                    mt: 0.25,
                    color: "success.main",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    mt: 0,
                    color: "text.light",
                  }}
                >
                  Cancel on or before{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {utils.getDateFull(policy?.deadlineLocal)}*
                  </span>{" "}
                  for a full refund
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "bottom",
                  justifyContent: "start",
                  mt: 1,
                }}
              >
                <CloseIcon
                  sx={{
                    fontSize: { xs: 15, sm: 18 },
                    mr: 0.75,
                    mt: 0.25,
                    color: "error.main",
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    mt: 0,
                    color: "text.light",
                  }}
                >
                  Cancellations after{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {utils.getDateFull(policy?.deadlineLocal)}*
                  </span>{" "}
                  are non-refundable
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  textAlign: "right",
                  fontSize: "80%",
                  color: "text.light",
                }}
              >
                *Hotel timezone.
              </Typography>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "bottom",
                justifyContent: "start",
                mt: 1,
              }}
            >
              <CloseIcon
                sx={{
                  fontSize: { xs: 15, sm: 18 },
                  mr: 0.75,
                  mt: 0.25,
                  color: "error.main",
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  mt: 0,
                  color: "text.light",
                }}
              >
                The rate is non-refundable.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CancelPolicy;
