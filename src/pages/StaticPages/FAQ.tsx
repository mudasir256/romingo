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
        <title>Book pet friendly hotels - Romingo</title>
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
              Romingo is a simple, user-friendly platform to book quality, dog
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
              10-15 hotels per destination, which allows our team to focus on
              quality, rather than quantity!
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
              of up to (2) dogs with weight limits of 75 lbs. each, and dog
              beds, bowls, and treats provided in your room.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              What is the Romingo Score?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              We have a <Link href="/romingo-score">full page</Link> that
              details the Romingo Score. Check it out!
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
              customers. Our niche allows us to get even better rates than many
              competitors.
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
              The full room &amp; tax will be charged onto the credit card on
              file at time of reservation. However, if you booked a refundable
              room rate, then you can always cancel for a full refund so long as
              the reservation is cancelled inside the allowable cancellation
              window.
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
              So long as your well-behaved dog is 75 lbs or less, and you bring
              no more than 2 dogs, you are allowed at a Romingo hotel!
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
              Romingo loves cats too, but at this time we are focusing on
              spreading the message about dog-friendly travel.
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
              your pup.
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
              By creating your pup&apos;s profile, we can ensure that we have
              the correct size dog beds placed in your guestroom, and that we
              remember your pup&apos;s preferences and likes.
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
              Guarantee. This includes waived non-refundable pet fees, allowing
              up to (2) dogs of 75lbs. each, and providing dog beds, bowls,
              treats upon arrival. Romingo will provide dog beds &amp; bowls to
              those partners that do not already offer them.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default FAQ;
