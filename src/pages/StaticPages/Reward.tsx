import { FC } from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";

const Reward: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2" color="text.primary" sx={{ mt: 2 }}>
            Romingo
          </Typography>
        </Box>
        <Divider variant="middle" light sx={{ my: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Rewards Program
          </Typography>
        </Divider>
        <Typography variant="body1" color="text.primary">
          Romingo Rewards is our official Customer Incentive Program designed to
          reward our valued customers. Participation in Romingo Rewards is
          complimentary for all customers with an active Romingo account.
          Participation is optional and can be terminated at any time by the
          customer through their Account Details Page.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          How to Participate
        </Typography>
        <Typography variant="body1" color="text.primary">
          To be eligible for Romingo Rewards, customers must have an active
          account. For every 10 qualifying room nights booked through Romingo,
          customers earn a $100 Romingo Rewards Certificate. This certificate is
          sent via email and can be applied towards future reservations.
          Qualifying room nights require a minimum spend of $200 per room, per
          night, inclusive of taxes and fees.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Terms and Conditions
        </Typography>
        <Typography variant="body1" color="text.primary">
          The $100 Romingo Rewards certificate is applicable to a single future
          reservation and any unused balance will be forfeited. The certificate
          is valid for 365 days from its issue date. Rewards cannot be applied
          to no-show fees, late cancellation fees, resort fees, pet fees, or
          other miscellaneous fees charged by the hotel. Participation in
          Romingo Rewards signifies agreement to receive email marketing,
          including newsletters and special offers from Romingo. Customers can
          opt out of Romingo Rewards by deleting their account via the Accounts
          Page. Romingo reserves the right to terminate a customer&apos;s
          participation in the Rewards Program at any time for violation of any
          terms or policies.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.primary">
          For questions or concerns regarding the Romingo Rewards Program,
          please contact our Customer Support at hello@romingo.com.
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default Reward;
