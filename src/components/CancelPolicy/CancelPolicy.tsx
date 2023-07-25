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

const CancelPolicy = ({ sx, policy, search }) => {
  console.log(policy)
  const [showExtra, setShowExtra] = useState(false)

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

  return (
    <Box sx={sx}>
      <Box
        sx={{
          color: "#222",
          pt: { xs: 0, sm: 2 },
          pb: 2.5,
          px: { xs: "0rem", sm: "1rem" },
          boxShadow: { xs: 0, sm: 0, md: 1 },
          borderRadius: 2,
          ml: 2.5
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#222",
            textAlign: "center",
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
          {policy && policy.length > 0 ? (
            <>
              <Grid container>
                <Grid item container style={{marginBottom: 5, textAlign: 'center'}} >
                  <Grid item style={{width: '35%'}}>Start Date</Grid>
                  <Grid item style={{width: '35%'}}>End Date</Grid>
                  <Grid item style={{width: '30%'}}>Price</Grid>
                </Grid>
                {policy.map((p, i) => <Grid item container key={i} spacing={3} style={{marginTop: 2}}  justifyContent='space-evenly'>
                  <Grid item>{new Date(getTimestamp(p.DateFrom)).toLocaleDateString()}</Grid>
                  <Grid item>{policy[i + 1] ? new Date(getTimestamp(policy[i + 1].DateFrom)).toLocaleDateString() : new Date(search.checkOut).toLocaleDateString()}</Grid>
                  <Grid item>{p.CancellationFee.FinalPrice}</Grid>
                </Grid>)}
              </Grid>
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
              <InfoOutlinedIcon style={{ fontSize: '20px', color: 'red', marginBottom: '6px' }} onMouseEnter={() => setShowExtra(true)} onMouseLeave={() => setShowExtra(false)} />
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
