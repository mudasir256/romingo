import {Helmet} from "react-helmet";
import Box from "@mui/material/Box";
import { FC } from "react";
import { Container, Divider, Grid, Typography } from "@mui/material";
import Link from "@mui/material/Link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";

const FAQ: FC = () => {
  return (
    <>
      <Helmet>
        <title>Book pet friendly hotels - Romingo FAQ</title>
        <description>Romingo is revolutionizing travel by encouraging dog owners everywhere to never leave their dog home alone again while traveling.</description>
        <meta property="og:title" content="Book pet friendly hotels - Romingo" />
        <meta property="og:description" content="Romingo is revolutionizing travel by encouraging dog owners everywhere to never leave their dog home alone again while traveling." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://romingo.com/static/media/logo.11150e63.png" />
        <meta property="og:site_name" content="Romingo" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollToTop />
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2" color="text.primary" sx={{ mt: 2 }}>
            Frequently Asked Questions
          </Typography>
        </Box>
        <Divider variant="middle" light sx={{ my: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Your Guide To Pet-Friendly Travel Questions
          </Typography>
        </Divider>
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 6,
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              About Romingo
            </Typography>
            <Typography variant="h6">
              What is Romingo?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Romingo is the future of pet-friendly travel. Recently launched in 2021, our mission is simple: <em>to provide pet owners everywhere a simple and accurate tool to search and book pet-friendly travel</em>.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              How is Romingo different from other booking websites?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Our team has spent countless hours hand-selecting the best pet-friendly accommodations. Romingo then partners with them to offer you the lowest rates, the clearest and most inclusive pet policies, and the guarantee that every reservation will have a pet-friendly guestroom. Our expert team of customer support agents are available around the clock to ensure that your pet-friendly travel experience is enjoyable and hassle-free.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              What is the Romingo Guarantee?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Every reservation is backed by our Romingo Guarantee. The Romingo Guarantee ensures that every room booked on our site will be in a pet-friendly sleeping room at a pet-friendly hotel. The Romingo Guarantee also ensures that the pet policies listed on our site are accurate and representative based on the most updated pet policies provided by our accommodation partners to Romingo. If for any reason an issue arises pertaining to the accommodation&apos;s pet-friendliness status, guestroom reservation, or pet policy listed on our site, then our customer support team will do everything we can to make it right for our guests. 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Why does Romingo only allow me to book hotels in certain
              destinations?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Romingo currently provides accommodations in the United States. Please <Link href="/#cta">sign up</Link> for our newsletter to learn more about future travel destinations that we are actively working on.  
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              How does Romingo get the best available room rates?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Our team of dedicated pet-friendly agents work with major accommodation brands, as well as individual properties, to provide you with the most favorable rates, the most inclusive pet policies, and the easiest way to book your pet-friendly accommodations.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              Booking Hotels
            </Typography>
            <Typography variant="h6">
              Do all accommodation partners allow dogs?            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Yes! Please check the individual pet policy for each partner to confirm the specific pet policies.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              What about cats?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Many of our accommodation partners do accept cats. Please check the individual pet policy for each partner to confirm the specific pet policies.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">
              How does payment for my reservation work?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              The full room & tax will be charged onto the credit card on file at time of reservation.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Can I cancel my reservation after it is booked?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              If a refundable reservation is booked, and the reservation is cancelled within the allowable cancellation window, then cancellation is free and a refund of the deposit shall be issued to the original payment method.
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "justify", lineHeight: 2 }}>If a refundable reservation is booked, and the reservation is cancelled outside the allowable cancellation window, then the cancellation shall incur a &quot;cancellation fee&quot; as defined by the individual reservation policy. The &quot;cancellation fee&quot; shall be retained, and any difference between the deposit on file and the &quot;cancellation fee&quot; shall be issued via refund to the original payment method.</Typography>
            <Typography variant="body1" sx={{ textAlign: "justify", lineHeight: 2 }}>If a non-refundable reservation is booked, and the reservation is cancelled at any point in time, then the cancellation shall incur a &quot;cancellation fee&quot; as defined by the individual reservation policy. The &quot;cancellation fee&quot; shall be retained, and any difference between the deposit on file and the &quot;cancellation fee&quot; shall be issued via refund to the original payment method.</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">
              Why is the hotel asking me for a refundable pet deposit?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Some of our hotel partners do require a refundable pet deposit upon check-in. These refundable deposits are to ensure that the guestrooms are left in the same condition and working order upon departure. Refundable deposits may also be required to ensure that the hotel&apos;s pet policies are abided by at all times during a guest&apos;s stay.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              When will my pet deposit be returned to me?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Pet deposits are typically refunded or returned to the original card on file no later than 7-10 business days after check out.  Please contact the Hotel directly if you have any issues with pet deposits.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              How do I know if my dog or dogs are allowed at a hotel?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Each accommodation partner with Romingo has their individual pet policies. Please consult each accommodation&apos;s individual pet policy.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              What if I have more questions about an individual hotel pet policy?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              While our <Link href="/contact">support team</Link> is available to assist you, we suggest contacting the hotel directly should you have any questions regarding a hotel pet policy. 
            </Typography>
          </Grid>
       
          <Grid item xs={12}>
            <Typography variant="h6">
              How do I make a hotel reservation?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Please visit our <Link href="/">homepage</Link> and book your next pet-friendly trip with Romingo.  
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              How do I cancel or change a hotel reservation?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
             Please visit &quot;My trips&quot; from our homepage, or simply <Link href="/create-account">create an account</Link> to manage your future trips with Romingo.
            </Typography>
          </Grid>
       
          <Grid item xs={12}>
            <Typography variant="h6">
              Why should I create a profile for myself and for my dog(s)?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              By creating your pet&apos;s profile, our team can ensure that the hotel is ready to receive you and your pet and provide a first class travel experience.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              Concerns
            </Typography>
            <Typography variant="h6">
              What if I arrive to a hotel and they do not allow my dogs?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Please first consult the individual hotel&apos;s pet policy, and then please reach out to our <Link href="/contact">support team</Link> immediately if an accommodation turns you away from a reservation due to their pet policy.
            </Typography>
          </Grid>
    
          <Grid item xs={12}>
            <Typography variant="h6">
              What if I arrive to a hotel and they charge me a pet fee?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Many of our hotel partners do charge pet fees in order to provide extra cleaning, pet perks, and dedicated pet-friendly rooms. Please consult each individual pet policy for a description of all pet fees. 
            </Typography>
          </Grid>
       
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              Customer Service
            </Typography>
            <Typography variant="h6">
              How do I get ahold of someone at Romingo?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              You can reach our <Link href="contact">support team</Link> anytime with questions, comments, or concerns. 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              Hotels &amp; Partnerships
            </Typography>
            <Typography variant="h6">
              I am a hotel or accommodations partner interested in partnering with Romingo, how do I inquire?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              We love partnering with pet-friendly accommodations, and welcome any inquiries <Link href="/list-your-property">here</Link>.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default FAQ;
