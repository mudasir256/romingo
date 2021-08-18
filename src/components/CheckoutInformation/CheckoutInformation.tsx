import { FC, useState } from "react";
import { CSSObject } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

interface Props {
  sx?: CSSObject;
  finePrint?: {
    title: string;
    description: string;
  };
}

const CheckoutInformation: FC<Props> = ({ sx, finePrint = null }) => {
  const [checkState, setCheckState] = useState(false);

  const handleCheck = () => {
    setCheckState(!checkState);
  };

  return (
    <Box sx={sx}>
      <Box
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          borderRadius: 3,
          border: "1px solid #DDD",
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
          Traveller Information
        </Typography>
        <Grid container spacing={2} sx={{ py: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              type="text"
              label={"Traveller's Full Name"}
              placeholder="John Doe"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 3, sm: 2 }}>
            <TextField
              variant="outlined"
              type="text"
              label={"Email Address"}
              placeholder="John@email.com"
              fullWidth={true}
              sx={{
                mt: {
                  sm: 0,
                  xs: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 2, sm: 3 }}>
            <TextField
              variant="outlined"
              type="text"
              label={"Phone Number"}
              placeholder="xxx-xxx-xxxx"
              fullWidth={true}
              sx={{
                mt: {
                  sm: 0,
                  xs: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 4, sm: 4 }}>
            <TextField
              variant="outlined"
              type="date"
              label={"Estimated Check In Time"}
              defaultValue=""
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                mt: {
                  sm: 0,
                  xs: 1,
                },
              }}
            />
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            textAlign: "center",
          }}
        >
          Payment Information
        </Typography>
        <Grid container spacing={2} sx={{ py: 2 }}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              type="text"
              label={"Name on Credit Card"}
              placeholder="John Doe"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              type="text"
              label={"Credit Card Number"}
              placeholder="#### #### #### ####"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={7} sm={6} md={4}>
            <TextField
              variant="outlined"
              type="date"
              label={"Expiration Date"}
              defaultValue={""}
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                mt: {
                  sm: 0,
                  xs: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={5} sm={4} md={3}>
            <TextField
              variant="outlined"
              type="text"
              label={"CVV"}
              fullWidth={true}
              sx={{
                mt: {
                  sm: 0,
                  xs: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox
                checked={checkState}
                color="primary"
                onChange={handleCheck}
              />
              <Typography variant="body2">
                I agree to the booking <Link href="#">terms of service</Link>{" "}
                and cancellation policy.
              </Typography>
            </Box>
            <Hidden smUp>
              {finePrint !== null && (
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "secondary.main",
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: { xs: "85%", sm: "100%" },
                      textTransform: "capitalize",
                      mt: 0.5,
                    }}
                  >
                    {finePrint.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                    }}
                  >
                    {finePrint.description}
                  </Typography>
                </Box>
              )}
            </Hidden>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth={true}
              size="large"
              color="primary"
            >
              <Typography variant="h6">Book It</Typography>
            </Button>
          </Grid>
          <Hidden smDown>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "90%",
                  color: "text.primary",
                  textAlign: "center",
                }}
              >
                Your card will be authorized for $470.30, but you will not be
                charged until you check-in.
              </Typography>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckoutInformation;
