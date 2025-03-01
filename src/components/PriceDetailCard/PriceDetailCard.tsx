import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { CSSObject } from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";

interface Props {
  sx?: CSSObject;
  discountAmount?: number;
}

const PriceDetailCard: FC<Props> = ({ sx, discountAmount, tax = 0 }) => {
  console.log(discountAmount)
  const detail = useSelector(
    (state: any) => state.hotelCheckoutReducer.checkout
  );

  const search = useSelector((state: any) => state.searchReducer.search);

  const totalPetFees = useSelector(
    (state: any) => state.hotelDetailReducer?.detail?.petFeePolicy?.totalFees
  );
  const [priceArr, setPriceArr] = useState<
    {
      label: string;
      price: number;
    }[]
  >([]);
  const dollarUSLocale = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [feesIncluded, setFeesIncluded] = useState("");
  const [fees, setFees] = useState([]);
  const [markup, setMarkup] = useState(0);

  useEffect(() => {
    const tmp = [];
    // if (detail?.room?.room?.feesIncluded) {
    //   setFeesIncluded(
    //     "*Includes all taxes and applicable fees (ie: resort/amenity fees)."
    //   );
    // } else {
    //   setFeesIncluded(
    //     "*Includes all taxes. This Hotel may charge a resort or amenity fee, which you pay to the Hotel at check-in. These fees are not included in the amount above."
    //   );
    // }

    // const markupInitial = detail.room.PackagePrice.FinalPrice * 0.15
    // setMarkup(markupInitial)
    console.log(detail)

    const priceBeforeTax = detail.room.PackagePrice.FinalPrice - tax

    const markup = (priceBeforeTax * .1)

    const nights = moment(search.checkOut).diff(moment(search.checkIn),'days')
    tmp.push({
      label: "Average price per night",
      price: (priceBeforeTax + markup) / nights,
    });

    tmp.push({
      label: "Nights",
      price: nights,
    });

    tmp.push({
      label: "Total before taxes & fees",
      price: priceBeforeTax + markup,
    });

    tmp.push({
      label: "Taxes & fees",
      price: tax,
    });

    // tmp.push({
    //   label: "Pet Fees",
    //   price: 0,
    // });

    tmp.push({
      label: "Total",
      discount: (discountAmount > 0 ? discountAmount : 0),
      price: (detail.room.PackagePrice.FinalPrice + markup - (discountAmount > 0 ? discountAmount : 0)), //+ markupInitial),
    });

    tmp.push({
      label: "Pay now",
      price: detail?.room?.room?.totalPriceAfterTax + markup,
    });

    setPriceArr([...tmp]);
    setFees(detail?.room?.room?.fees);
  }, [detail, discountAmount]);

  const detailsLen = priceArr.length;

  return (
    <Box
      sx={{
        color: "text.primary",
        paddingTop: { xs: "1rem", sm: "1rem" },
        paddingBottom: { xs: "1rem", sm: "0.75rem" },
        px: { xs: "0rem", sm: "1rem" },
        boxShadow: { xs: 0, sm: 0, md: 1 },
        borderRadius: 2
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#222",
          textAlign: "left",
          mb: '0.75rem',
          fontWeight: 800
        }}
      >
        <b>Price Details</b>
      </Typography>

      {priceArr.map((detail, i) => {
        if (i === 1) {
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderBottom: "1px solid #DDD",
                mt: 1,
                pb: 2,
              }}
            >
              <Typography
                variant="base"
                sx={{
                  mt: 0,
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
                variant="base"
                sx={{
                  fontWeight: 500,
                  mt: 0,
                  color: "text.primary",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                }}
              >
                {`x ${detail.price?.toFixed(0)}`}
              </Typography>
            </Box>
          );
        } else if (i === detailsLen - 2) { //this is Total
          return (<Box key={i}>
            {(detail.discount > 0) ?
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                mt: 1,
                borderTop: "1px solid #DDD",
                pt: 2
              }}
            >

              <Typography
                variant="base"
                sx={{
                  mt: 0,
                  color: "black",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                  maxWidth: "70%",
                  fontWeight: 800,
                }}
              >
                <b>Discount</b>
              </Typography>

              <Typography
                variant="base"
                sx={{
                  fontWeight: 500,
                  mt: 0,
                  color: "black",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                }}
              >
                -{`${dollarUSLocale.format(detail.discount)}`}
              </Typography>
            </Box>
            : <></>}
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                mt: 1,
                borderTop: (detail.discount > 0) ? "" : '1px solid #DDD',
                pt: (detail.discount > 0) ? 0 : 2
              }}
            >

              <Typography
                variant="base"
                sx={{
                  mt: 0,
                  color: "black",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                  maxWidth: "70%",
                  fontWeight: 800,
                }}
              >
                <b>Pay now</b>
              </Typography>

              <Typography
                variant="base"
                sx={{
                  fontWeight: 800,
                  mt: 0,
                  color: "black",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                }}
              >
                <b>{`${dollarUSLocale.format(detail?.price)}`}</b>
              </Typography>
            </Box>
          </Box>);
        } else if (detail.label === "Pet Fees") {
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                pt: 0,
                pb: 1,  
              }}
            >
              <Typography
                variant="base"
                sx={{
                  mt: 0,
                  color: "text.primary",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                  maxWidth: "70%",
                  fontWeight: 500,
                }}
              >
                {detail.label}
              </Typography>

              <Typography
                variant="base"
                sx={{
                  fontWeight: 500,
                  mt: 0,
                  color: "text.primary",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                }}
              >
                {detail.price && detail.price !== -1 ? (
                  <>
                    <span
                      style={{
                        color: "#BC4749",
                        textDecoration: "line-through",
                      }}
                    >
                      {dollarUSLocale.format(detail.price)}
                    </span>
                    <span> $0</span>
                  </>
                ) : (
                  "$0"
                )}
              </Typography>
            </Box>
          );
        } else if (detail.label === "Pay now") {
          return (<Box key={i}></Box>)

        //     <Box
        //       key={i}
        //       sx={{
        //         display: "flex",
        //         justifyContent: "space-between",
        //         alignItems: "flex-end",
        //         mt: 1,
        //       }}
        //     >
        //       <Typography
        //         variant="body2"
        //         sx={{
        //           mt: 0,
        //           color: "#5B8D3E",
        //           textIndent: "-8px",
        //           paddingLeft: "8px",
        //           maxWidth: "70%",
        //           fontWeight: 600,
        //         }}
        //       >
        //         {detail.label}
        //       </Typography>

        //       <Typography
        //         variant="body2"
        //         sx={{
        //           fontWeight: 600,
        //           mt: 0,
        //           fontFamily: "Roboto",
        //           color: "#5B8D3E",
        //           textIndent: "-8px",
        //           paddingLeft: "8px",
        //         }}
        //       >
        //         {`${dollarUSLocale.format(detail?.price)}`}
        //       </Typography>
        //     </Box>
            
        //   )
         
        // } else if (detail.label === "Taxes & fees") {
        //   return (<Box key={i}>
        //     <Box
        //       key={i}
        //       sx={{
        //         display: "flex",
        //         justifyContent: "space-between",
        //         alignItems: "flex-end",
        //         mt: 1,
        //         pt: 2,
        //         borderTop: "1px solid #DDD",
        //       }}
        //     >
        //       <Typography
        //         variant="base"
        //         sx={{
        //           mt: 0,
        //           color: "text.primary",
        //           textIndent: "-8px",
        //           paddingLeft: "8px",
        //           maxWidth: "70%",
        //           fontWeight: 600,
        //         }}
        //       >
        //         {detail.label}
        //       </Typography>

        //       <Typography
        //         variant="base"
        //         sx={{
        //           fontWeight: 500,
        //           mt: 0,
        //           color: "text.primary",
        //           textIndent: "-8px",
        //           paddingLeft: "8px",
        //         }}
        //       >
        //         {`+ ${dollarUSLocale.format(detail?.price)}`}
        //       </Typography>
        //     </Box>
        //   </Box>);
        } else {
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                mt: 2,
                pb: 0.5
              }}
            >
              <Typography
                variant="base"
                sx={{
                  mt: 0,
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
                variant="base"
                sx={{
                  fontWeight: 500,
                  mt: 0,
                  color: "text.primary",
                  textIndent: "-8px",
                  paddingLeft: "8px",
                }}
              >
                {`${dollarUSLocale.format(detail?.price)}`}
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
      {/* {promoText && (
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
      )} */}
    </Box>
  );
};

export default PriceDetailCard;
