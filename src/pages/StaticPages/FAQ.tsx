import {Helmet} from "react-helmet";
import Box from "@mui/material/Box";
import { FC } from "react";
import { Container, Divider, Grid, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { PopupButton } from "@typeform/embed-react";

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
            <Typography variant="h6" color="text.secondary">
              What is Romingo?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Romingo is a simple, user-friendly platform to book quality, pet
              friendly hotels. Our team works exclusively with hand-selected
              hotel partners to ensure you and your dog&apos;s guest experience
              is welcoming, warm, and 100% enjoyable. You can finally roam the
              world free with your pup and Romingo. Romingo does this by
              providing one, simple pet policy across all hotel partners. We
              call our streamlined policy the &quot;Romingo Guarantee&quot;.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              How is Romingo different from other booking websites?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              We hand-select our hotel partners. Romingo only partners with
              up to 20 hotels per destination, which allows you to book quality pet friendly hotels.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              What is the Romingo Guarantee?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              The Romingo Guarantee ensures that when you book on Romingo, your
              reservation will include waived non-refundable pet fees, allowance
              of up to (2) dogs with weight limits of 50-75 lbs. each. Some of our hotel partners 
              also allow pets of all sizes, with no weight restrictions. 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Why does Romingo only allow me to book hotels in certain
              destinations?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Our team here at Romingo is working tirelessly to bring
              pet-friendly travel to even more destinations across the US. Be
              sure to drop us a line if you&apos;d like to see Romingo in your
              city!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              How does Romingo get the best available room rates?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Romingo works with a finite number of hotels that agree to waive
              their pet fees and provide the best possible rates to our
              customers. Romingo negotiates the best rates with each of our hotels individually on your behalf and pass the savings onto you. 
              Our niche allows us to get even better rates than many competitors.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              Booking Hotels
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Are all hotels listed on Romingo pet-friendly?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Yes!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              How does payment of my hotel reservation work?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              The full room &amp; tax will be charged onto the credit card on file upon check in to the Hotel. Romingo does not collect any prepayment for your reservation. The hotel cancellation policy shall still apply, so please be sure to review each individual hotel cancellation policy. You may always cancel for a full refund so long as the reservation is cancelled inside the allowable cancellation window. Cancellations made inside the cancellation window are subject to the Hotel&apos;s cancellation fees.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              How do I know if my dog or dogs are allowed at a hotel?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Romingo hotel partners agree to either allow 2 dogs weighing 50-75 lbs. per pet in weight, and some properties allow pets of all sizes. Check out each hotel pet policy to ensure that you book the correct hotel based on your pet&apos;s size. 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Can I bring my cat(s) or other pet to a Romingo reservation?{" "}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Romingo loves cats too, please be sure to check out each hotel pet policy to ensure that you book a cat-friendly hotel.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              How do I make a hotel reservation?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Simple, check out our homepage at{" "}
              <Link href="/">romingo.com</Link> and search through our
              pet-friendly hotel listings!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              How do I cancel or change a hotel reservation?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              You can click &quot;manage my reservation&quot; from our homepage
              or use <Link href="/reservation/manage">this link</Link>. You will
              need the email address on file with the booking as well as your
              booking confirmation ID provided during checkout and in your
              confirmation email.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Why is the hotel asking me for a refundable pet deposit?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Some of our hotel partners do still require a refundable pet
              deposit upon check-in. This is to ensure that the Hotel&apos;s pet
              policies and guest rooms are not damaged as a result of taking in
              your pup. Keep in mind that this deposit is fully refundable so long as the guest room you stayed in is left in the same condition as you arrive.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Why can I book a room reservation with only up to 2 dogs?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Romingo and our hotels agree that any more than 2 dogs in a single
              room can be too uncomfortable and a hassle. We want your
              experience to be flawless and positive! That said, if you are
              travelling with more than 1 adult, you can always book another
              room with up to 2 dogs per room.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Why should I create a profile for myself and for my dog(s)?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              By creating your pup&apos;s profile, we can ensure that the Hotel is prepared to welcome you and your pups upon arrival. Some hotel partners will even be ready to greet your pet by name!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Do I need to bring anything for my pet?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Yes, you will need to bring your pet&apos;s food, bowls, bedding, toys, and any other necessary items. If you&apos;d prefer to buy these items at your destination, our pet-friendly travel guides will provide all the information you&apos;ll need!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              Concerns
            </Typography>
            <Typography variant="h6" color="text.secondary">
              What if I arrive at a hotel and they do not allow my dogs?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Please reach out to Romingo Support immediately if a Romingo hotel
              turns you away from a guaranteed reservation.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              What if I arrive at a hotel and they charge me a non-refundable
              pet fee?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Please reach out to Romingo Support immediately if a Romingo hotel
              attempts to charge any sort of a non-refundable pet fee. As a
              reminder, a hotel may ask you for a hotel pet deposit!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              What if I arrive at a hotel and they charge me a pet deposit?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Although Romingo and our partners do waive non-refundable pet
              fees, some of our hotel partners do require a refundable pet
              deposit upon check-in. Pet deposits are a way for our hotel
              partners to ensure that their hotel pet policies are followed. Any
              damage to the guest room, additional deep cleaning, and/or
              violation of the hotel&apos;s pet policies may result in the Hotel
              retaining or only partially-refunding the pet deposit to the
              guest.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              When will my pet deposit be returned to me?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Pet deposits are typically refunded or returned to the original
              card on file no later than 7-10 business days after check out.
              Please contact the Hotel directly if you have any issues with pet
              deposits.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Are pet-friendly hotels more expensive?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Not with Romingo. We negotiate with our hotel partners to ensure that guests -- and their pets -- receive fair rates at every Romingo stay.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              What if my dog has behavior issues?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              We understand that every pup has a unique personality. Still, if you expect your dog to bark excessively, destroy hotel property, or act aggressively towards other pets or guests, it&apos;s likely that you&apos;ll be in violation of our standardized pet policy.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Can my dog sleep in the bed with me at a hotel?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Yes! How pet-friendly would our hotels be if we prohibited cuddles?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Can I leave my dog in the hotel room without me?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Please consult each hotel pet policy to understand the hotel pet policy about unattended pets in the room.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              Customer Service
            </Typography>
            <Typography variant="h6" color="text.secondary">
              How do I get ahold of someone at Romingo?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              You can reach our Romingo Support team anytime from our{" "}
              <Link href="contact">Contact Us</Link> Page
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              Hotels &amp; Partnerships
            </Typography>
            <Typography variant="h6" color="text.secondary">
              I am a hotel or accommodations partner interested in partnering
              with Romingo, how do I inquire?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              We love partnering with new accommodations providers, and welcome
              any inquiries. Please{" "}
              <Link href="/list-your-property">click here</Link> to get started.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              What are the participation requirements for a hotel or
              accommodations partner?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              All accommodations partners must agree to adhere to our Romingo
              Guarantee. This includes waived non-refundable pet fees and allowance
              of up to two dogs of 50-75lbs. each.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default FAQ;
