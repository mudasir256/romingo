import { FC, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingDetailCard from "../../components/BookingDetailCard";
import CancelPolicy from "../../components/CancelPolicy";
import PriceDetailCard from "../../components/PriceDetailCard";
import CheckoutInformation from "../../components/CheckoutInformation";
import { RoomInfo } from "../../components/RoomCard/RoomCard";
import { useMediaQuery, Button } from "@mui/material";
import ScrollToTop from "../../components/ScrollToTop";
import ImageSlider from "../../components/ImageSlider";
import { Star } from "@mui/icons-material";
import RomingoScore from "../../components/RomingoScore";
import DiscountIcon from '@mui/icons-material/LocalOffer';
import { gql, useQuery } from "@apollo/client";
import { getCancellationPolicy } from "../../constants/constants";

declare global {
  interface Window {
    Intercom: any;
  }
}

interface Props {
  hotel: any;
  bookingDetails: any;
  priceDetails: any;
  checkinDescription: any;
  finePrint: any;
  room: RoomInfo;
}

const CheckoutPage: FC<Props> = () => {
  const [couponText, setCouponText] = useState('')
  const [loadingCoupon, setLoadingCoupon] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)

  console.log(sessionStorage.getItem('tax'))
  console.log(sessionStorage.getItem('pricePerNight'))

  const search = useSelector((state: any) => state.searchReducer.search);
  const detail = useSelector(
    (state: any) => state.hotelCheckoutReducer.checkout
  );
  const hotel = useSelector((state: any) => {
    return state.hotelDetailReducer.detail;
  });
  

  const { data, loading, error } = useQuery(
    gql`${getCancellationPolicy(sessionStorage.getItem('travolutionaryId'), sessionStorage.getItem('sessionId'), sessionStorage.getItem('packageId')}`);

  console.log(data)

  const addTotalTaxes = (taxes) => {
    if (!taxes) {
      return null
    }
    let total = 0
    taxes.forEach(tax => {
      total = total + parseFloat(tax?.Value || 0)
    })
    return total
  }

  const handleApplyCoupon = async () => {
    setLoadingCoupon(true)
    const result = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}v2/coupon/${couponText}`)
    const data = await result.json()

    if (data.coupon.percent_off && data.coupon.valid) {

      const discount =  sessionStorage.getItem('totalPriceAfterTax') * (data.coupon.percent_off / 100)
      setDiscountAmount(discount)
    } else if (data.coupon.amount_off && data.coupon.valid) {
      const discount = (data.coupon.amount_off / 100)
      setDiscountAmount(discount)
    } else {
      setDiscountAmount(-1)
    }
    setLoadingCoupon(false)
  }

  const finalPrice = sessionStorage.getItem('totalPriceAfterTax')
  const SimplePrice = sessionStorage.getItem('travoPrice')
  const tax = sessionStorage.getItem('tax')
  const markup = sessionStorage.getItem('markup')

  const mobile = useMediaQuery("(max-width:800px)");

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#feffff",
          pt: '12px'
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            sx={{
              py: 3,
            }}
          >
            {!mobile && (
              <Grid item xs={12} md={8} order={{ xs: 2, sm: 1 }}>
                <CheckoutPageListingCard
                  {...hotelDetails}
                  showPrice={false}
                />
                <CheckoutInformation
                  sx={{ mt: 1, mb: "1rem" }}
                  // finePrint={{title: "test", description: 'test'}}
                  // price={123.33}
                  discountAmount={discountAmount || 0}
                  withoutFeesPrice={SimplePrice}
                  finalPrice={finalPrice - (discountAmount > 0 ? discountAmount : 0)}
                  policy={data?.getCancellationPolicyMultiPackages?.CancellationPolicies} 
                />
              </Grid>
            )}


            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Grid container spacing={2}>
                {mobile && (
                  <Grid item xs={12}>
                    <CheckoutPageListingCard
                      {...hotelDetails}
                      showPrice={false}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sx={{  mt: { xs: 0, sm: 0, md: '4.5rem' } }}>
                  <ImageSlider
                    images={[sessionStorage.getItem('hotelImage')] || []}
                    name={sessionStorage.getItem('roomType')}
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "50px",
                      borderRadius: "6px",
                      minHeight: { xs: "200px", sm: "200px", md: "220px" },
                      color: "#03989e",
                    }}
                  />
                </Grid>
                <Grid item xs={12} order={{ xs: 1, md: 1 }}>
                  <BookingDetailCard />
                </Grid>
                <Grid item xs={12} order={{ xs: 2, md: 2 }}>
                  <PriceDetailCard discountAmount={discountAmount} tax={tax} />
                </Grid>
                <Grid item xs={12} order={{ xs: 3, md: 3 }}>
                  <Box sx={{ boxShadow: 3, borderRadius: 3, p: '0.75rem' }}> 
                    <Typography variant="base">Special offer / discount code</Typography>
                    <input value={couponText} onChange={(e) => setCouponText(e.target?.value)} style={{ width: '65%' }} type=" text" />
                    <Button onClick={() => handleApplyCoupon()}>{loadingCoupon ? 'Loading...': 'Apply'}</Button>
                    {discountAmount === -1 && <Typography sx={{ color: 'red', fontSize: '12px'}}>Invalid / expired coupon code</Typography>}
                  </Box>
                </Grid>
                {mobile && (
                  <Grid item xs={12} order={2}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#222",
                        textAlign: "left",
                        mb: 1,
                      }}
                    >
                      Finish Your Reservation
                    </Typography>
                    <CheckoutInformation
                      sx={{ mt: 2 }}
                      // finePrint={finePrint}
                      // price={detail?.room?.room?.totalPriceAfterTax}
                      withoutFeesPrice={SimplePrice}
                      discountAmount={discountAmount || 0}
                      finalPrice={finalPrice - (discountAmount > 0 ? discountAmount : 0)}
                      policy={data?.getCancellationPolicyMultiPackages?.CancellationPolicies} 
                    />
                  </Grid>
                )}
                <Grid item xs={12} order={{ xs: 3, md: 3 }}>
                  <CancelPolicy withoutFeesPrice={SimplePrice} finalPrice={finalPrice} policy={data?.getCancellationPolicyMultiPackages?.CancellationPolicies} search={search} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export interface ListingCardProps {
  id: string;
  imageURLs: string[];
  name: string;
  addressLine1: string;
  romingoScore: number;
  cancellation?: boolean;
  lowestAveragePrice: number;
  currency?: string;
  dogAmenities?: string[];
  showAmenities?: boolean;
  highlighted?: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  city: {
    id: string;
    name: string;
  };
  neighborhood: string;
  showPrice?: boolean;
  noLink?: boolean;
  petFeePolicy: {
    maxPets: number;
    maxWeightPerPetInLBS: number;
    desc: string;
    perPet: boolean;
    perNight: boolean;
    breakup: JSON;
    totalFees: number;
  };
}

const CheckoutPageListingCard = ({
  imageURLs,
  name,
  addressLine1,
  romingoScore,
  city,
  lowestAveragePrice,
  currency = "$",
  highlighted = false,
  showPrice = true,
  ...props
}) => {
  console.log(props)
  return (
    <Box
      sx={{
        color: "text.primary",
        boxShadow: 0,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        maxWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: highlighted ? "lightBackground.main" : "white",
        pb: "1rem",
      }}
    >
      <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: 0 }, maxWidth: "100%" }}>

        <Box
          sx={{
            pt: 3,
            px: { xs: 0, sm: 1.8 },
          }}
        >
          <Typography variant="h4" mb="1rem">Secure Booking</Typography>
          <Typography component="p" mb="1rem" variant="base" sx={{ boxShadow: 1, p: '0.75rem', borderRadius: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DiscountIcon color="primary" /> You earn stay credit on this reservation!</Typography>
          <Box
            sx={{
              width: "100%",
              height: 275,
              mt: 3
            }}
          >
            <ImageSlider
              images={[sessionStorage.getItem('hotelImage')]}
              name="hotel photo"
              sx={{
                width: "100%",
                height: 275,
                borderRadius: "10px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#222",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontSize: "140%",
                flex: 1,
                fontWeight: 800,
              }}
            >
              {sessionStorage.getItem('hotelName')}
            </Typography>
            <RomingoScore score={sessionStorage.getItem('hotelRating')} />
          </Box>

          <Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "95%", sm: "100%" },
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                color: "#999",
                mb: { xs: 0, md: -1 },
              }}
            >
              {sessionStorage.getItem('hotelAddress')}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  textAlign: "right",
                  justifyContent: "end",
                  flexDirection: "column",
                }}
              >
                {showPrice && (
                  <>
                    <Typography
                      variant="h5"
                      sx={{
                        mr: 0.45,
                        letterSpacing: 1,
                        color: "text.secondary",
                        fontSize: "190%",
                      }}
                    >
                      {currency}
                      {Math.round(lowestAveragePrice)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      / night
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt="1.5rem" sx={{ mx: { xs: 0, sm: 0, md: '1rem' } }}>
          <hr />
        </Box>

      </Box>
    </Box>
  );
};

export default CheckoutPage;
