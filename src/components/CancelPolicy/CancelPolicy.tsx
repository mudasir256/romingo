import { FC, useState } from "react";
import { CSSObject, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { utils } from "../../services/utils";
import moment from "moment";

interface Props {
  sx?: CSSObject;
  policy: {
    cancelable: boolean;
    deadlineLocal: string | null;
  };
}

const CancelPolicy = ({ sx, policy, finalPrice, search, withoutFeesPrice }) => {
  console.log('cancel policy')
  console.log(policy)

  const getTimestamp = (timestamp) => {
    const regex = /\b\d+\b/;
    const timestampMatch = timestamp.match(regex);

    if (timestampMatch) {
      const timestamp = parseInt(timestampMatch[0], 10);
      return timestamp
    } else {
      console.log("No timestamp found in the string.");
    }
    return ""
  }

  let isRefundable = false
  let isFullRefund = false

  if (policy && policy.length === 1 && policy[0].CancellationFee?.FinalPrice === withoutFeesPrice) {
    const dateFrom = policy[0].DateFrom

    const date1 = new Date(getTimestamp(dateFrom)).getTime();
    const date2 = new Date().getTime();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(diffDays)
    if (diffDays < 2) {
      isRefundable = false

    } else {
      isRefundable = true
      isFullRefund = true
    }
    
  } else if (policy && policy.length === 2) {
    isRefundable = true
    isFullRefund = false
  } else {
    //TODO: flag this, we haven't covered this case
  }

  const [showExtra, setShowExtra] = useState(false)


  return (
    <Box sx={sx}>
      <Box
        sx={{
          color: "#222",
          pt: { xs: 2, sm: 2 },
          pb: 2.5,
          px: { xs: "1rem", sm: "1rem" },
          boxShadow: { xs: 1, sm: 1, md: 1 },
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#222",
            marginBottom: '15px'
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
          {policy && !isRefundable &&
            <>
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
                  This rate is non-refundable.
                </Typography>
                <InfoOutlinedIcon style={{ fontSize: '20px', color: 'red', marginBottom: '6px' }} onMouseEnter={() => setShowExtra(true)} onMouseLeave={() => setShowExtra(false)} />
              </Box>
              {showExtra && <Box boxShadow={1} sx={{ backgroundColor: 'white', borderRadius: 2, p: '1rem' }} position="absolute">
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
          }

          {(policy && isRefundable && isFullRefund) && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Typography variant="base">Cancel <span style={{ color: 'red'}}>before {new Date(getTimestamp(policy[0].DateFrom)).toLocaleDateString()} {moment(getTimestamp(policy[0].DateFrom)).format('h:mm A')}</span> for a full refund. Please allow 5-7 business days for a refund to process.</Typography>
              <Typography variant="base">Cancellations after will be considered a no-show and you will be charged the full reservation price.</Typography>
            </Box>          
          )}

          {(policy && isRefundable && !isFullRefund) && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Typography variant="base">Cancel <span style={{ color: 'red'}}>before {new Date(getTimestamp(policy[0].DateFrom)).toLocaleDateString()} {moment(getTimestamp(policy[0].DateFrom)).format('h:mm A')}</span> for a partial refund. You will be charged a cancellation fee of <span style={{ color: 'red'}}>${policy[0].CancellationFee?.FinalPrice}</span>.</Typography>
              <Typography variant="base">Cancellations after will be considered a no-show and you will be charged the full reservation price.</Typography>
            </Box>          
          )}

        </Box>
      </Box>
    </Box>
  );
};

export default CancelPolicy;
