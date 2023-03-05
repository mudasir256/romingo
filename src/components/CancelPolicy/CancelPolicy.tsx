import { FC, useState } from "react";
import { CSSObject } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { utils } from "../../services/utils";

interface Props {
  sx?: CSSObject;
  policy: {
    cancelable: boolean;
    deadlineLocal: string | null;
  };
}

const CancelPolicy: FC<Props> = ({ sx, policy }) => {

  const [showExtra, setShowExtra] = useState(false)

  return (
    <Box sx={sx}>
      <Box
        sx={{
          color: "#222",
          borderTop: "1px solid #ddd",
          pt: { xs: 3, sm: 2 },
          pb: 2.5,
          px: { xs: "0rem", sm: "1rem" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#222",
            textAlign: "left",
          }}
        >
          Cancellation &amp; Refund Policy
        </Typography>
        <Box
          sx={{
            mt: 0.5,
            px: 0,
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
                  fontFamily: "Lato",
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
                  variant="base"
                  sx={{
                    mt: 0,
                    fontWeight: 500,
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
                  variant="base"
                  sx={{
                    mt: 0,
                    fontWeight: 500,
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
                variant="caption"
                sx={{
                  mt: "1rem",
                  display: "block",
                  textAlign: "left",
                  color: "text.light",
                }}
              >
                *Dates effective in the hotel timezone.
              </Typography>
            </>
          ) : (<>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                mt: 1,
              }}
            >
              <CloseIcon
                sx={{
                  fontSize: { xs: 15, sm: 18 },
                  mr: 0.75,
                  mt: 0,
                  color: "error.main",
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  mt: 0,
                  mr: 0.75,
                  color: "red",
                }}
              >
                The rate is non-refundable.
              </Typography>
              <InfoOutlinedIcon style={{ fontSize: '20px', color: 'red', marginBottom: '6px'}} onMouseEnter={() => setShowExtra(true)} onMouseLeave={() => setShowExtra(false)} />
            </Box>
              {showExtra && <Box position="absolute">
              <Typography
                variant="body1"
                sx={{
                  mt: 0,
                  color: "text.light",
                }}
              >
                If you change or cancel your booking you will not get a refund or credit to use for a future stay. This policy will apply regardless of COVID-19, subject to any local consumer laws.
              </Typography></Box>
              } 
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CancelPolicy;
