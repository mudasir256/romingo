import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { CSSObject } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CheckBox, CheckCircleOutlineRounded } from "@mui/icons-material";

interface Props {
  sx?: CSSObject;
  payLater: boolean;
}

const PriceDetailCard: FC<Props> = ({ sx, payLater }) => {
  const detail = useSelector(
    (state: any) => state.hotelCheckoutReducer.checkout
  );
  const promoText = useSelector(
    (state: any) => state.hotelDetailReducer?.detail?.checkoutPagePromoText
  );
  const [priceArr, setPriceArr] = useState<
    {
      label: string;
      price: number;
    }[]
  >([]);
  const [feesIncluded, setFeesIncluded] = useState("");
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const tmp = [];

    if (detail?.room?.room?.feesIncluded) {
      setFeesIncluded(
        "*Includes all taxes and applicable fees (ie: resort/amenity fees)."
      );
    } else {
      setFeesIncluded(
        "*Includes all taxes. This Hotel may charge a resort or amenity fee, which you pay to the Hotel at check-in. These fees are not included in the amount above."
      );
    }

    tmp.push({
      label: "Average Price Per Night",
      price: detail?.room?.room?.averagePrice,
    });

    tmp.push({
      label: "Taxes & Fees",
      price:
        detail?.room?.room?.totalPriceAfterTax - detail?.room?.room?.totalPrice,
    });

    if (payLater) {
      tmp.push({
        label: "Total",
        price: detail?.room?.room?.totalPriceAfterTax,
      });
    }

    tmp.push({
      label: "Total Due Now",
      price: payLater ? 0 : detail?.room?.room?.totalPriceAfterTax,
    });

    setPriceArr([...tmp]);
    setFees(detail?.room?.room?.fees);
  }, [detail, payLater]);

  const detailsLen = payLater ? priceArr.length - 1 : priceArr.length;

  return (
    <Box
      sx={{
        color: "text.primary",
        paddingTop: { xs: "1rem", sm: "0rem" },
        paddingBottom: { xs: "2rem", sm: "1.5rem" },
        px: { xs: "0rem", sm: "1rem" },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Montserrat",
          color: "#222",
          textAlign: "left",
          mb: 1,
        }}
      >
        Price Details
      </Typography>
      {priceArr.map((detail, i) => {
        if (i === detailsLen - 1) {
          return (
            <Box
              key={i}
              sx={{
                borderTop: "1px solid #DDD",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                mt: 1.5,
                pt: 1.5,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  mt: 0,
                  textTransform: "capitalize",
                  color: "#222",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                  maxWidth: "70%",
                  fontWeight: 600,
                }}
              >
                {detail.label}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mt: 0,
                  color: "text.primary",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                }}
              >
                {`$${detail.price?.toFixed(2)}*`}
              </Typography>
            </Box>
          );
        } else {
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                mt: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mt: 0,
                  textTransform: "capitalize",
                  color: "text.primary",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                  maxWidth: "70%",
                  fontWeight: 600,
                }}
              >
                {detail.label}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  mt: 0,
                  fontFamily: "Roboto",
                  color: "text.primary",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                }}
              >
                {`$${detail.price?.toFixed(2)}`}
              </Typography>
            </Box>
          );
        }
      })}
      {/* {fees &&
        fees?.map((fee) => (
          <Box
            key={fee?.desc}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              mb: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{ textAlign: "left", fontSize: "80%" }}
            >
              {fee?.desc}:
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "right", fontSize: "80%" }}
            >
              ${fee?.amount.toFixed(2)}
            </Typography>
          </Box>
        ))} */}
      <Typography
        variant="caption"
        sx={{
          lineHeight: "1rem",
          fontWeight: 500,
          mt: ".5rem",
          display: "block",
        }}
      >
        {feesIncluded}
      </Typography>
      {promoText && (
        <Typography
          variant="body2"
          color="primary.main"
          sx={{
            lineHeight: "1rem",
            fontWeight: 500,
            mt: "1rem",
            mb: "-1.25rem",
            height: "100%",
          }}
        >
          <CheckCircleOutlineRounded
            sx={{
              fontSize: 15,
              mb: "-0.15rem",
              mr: ".1rem",
            }}
          />
          {promoText}
        </Typography>
      )}
    </Box>
  );
};

export default PriceDetailCard;
