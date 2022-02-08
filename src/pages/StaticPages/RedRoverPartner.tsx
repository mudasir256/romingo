import Box from "@mui/material/Box"
import Hidden from "@mui/material/Hidden"
import { FC } from "react"
import { Container, Divider, Grid, Typography } from "@mui/material"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import ScrollToTop from "../../components/ScrollToTop"

const RedRoverPartner: FC = () => {

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2" color="text.primary" sx={{ mt: 2 }}>
            Romingo’s Partners
          </Typography>
        </Box>
        <Divider variant="middle" light sx={{ my: 2 }}>
            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
              We’re committed to doing our part
            </Typography>
          </Divider>
        <Grid container>
          <Grid item xs={12} sm={12} md={4} sx={{ mb: { xs: '2rem', sm: '2rem', md: '0rem', }, display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
            <Box component="img" src="https://storage.googleapis.com/romingo-development-public/images/front-end/red-rover-logo.png" alt={"Red Rover - Bringing Animals from Crisis to Care"} sx={{ width: "100%", borderRadius: 5, }}/>
          </Grid>
          <Grid item xs={12} sm={12} md={8} sx={{ pl: {xs: 0, sm: 0, md: '1.5rem'} }}>
          <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500, textAlign: { xs: "left", md: "justify" }, lineHeight: 2 }} >
              That’s why every booking on Romingo includes a small charitable donation to Red Rover, a non-profit organization that aims to assist those in need. When you book with Romingo you’re helping real pets and their guardians find real help.
            </Typography>
          </Grid>
        </Grid>

          <Grid container spacing={4}  sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 6, }}>
          <Grid item xs={12}>
            <Box sx={{ backgroundColor: "#F5ECEF", px: 2, py: 2, mt: 2, mb: 4 }}>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, fontSize: '1.125rem', textAlign: "center", lineHeight: 1.5 }}>
                &quot;Red Rover’s mission is to bring animals out of crisis and strengthen the bond between people and animals through emergency sheltering, disaster-relief services, financial assistance, and education. We accomplish this by engaging volunteers and supporters, collaborating with others, and maximizing the use of online technology.&quot;
              </Typography>

              <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", marginTop: '1rem', color: '#940940' }}>
                - RedRover
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <Grid item xs={12} md={6}>
                <Box component="img" src="https://storage.googleapis.com/romingo-development-public/images/front-end/red-rover-dog.jpg" alt={"Sage, a rescued German Shepherd and also a psychiatric assistance dog."} sx={{ objectFit: "cover", width: "100%", height: '400px',  borderRadius: 5,  }} />
              </Grid>
              <Hidden mdDown>
                <Grid item xs={12} md={6}>
                  <Box component="img" src="https://storage.googleapis.com/romingo-development-public/images/front-end/red-rover-dog-in-cone.jpg" alt={"Sage, a rescued German Shepherd after her surgery."} sx={{ objectFit: "cover", width: "100%", height: '400px',borderRadius: 5,}}/>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="text.secondary">
              What you can do!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, textAlign: "left", lineHeight: 2, '& a': { color: '#940940'}}}>
              <ul style={{paddingInlineStart: '1rem'}}>
                <li>
                  <a href="https://kindnews.redrover.org/adopt-a-classroom/">Adopt-a-Classroom</a> and provide Kind News™ magazine subscriptions of students. RedRover maintains a waiting list of classroom teachers who would like to have a subscription sent to their classroom.
                </li>
                <li>
                  <a href="https://redrover.org/donate/become-an-on-call-angel/">Become an On-Call-Angel</a> and be confident that your donation as an On-Call Angel is helping the animals and families who need it most. Red Rover requires proof of hardship to ensure only those in greatest financial need being helped.
                </li>
                <li>
                  <a href="https://redrover.donorsupport.co/-/XQUYHHML">Give to those in need</a> to honor a pet, friend, family member, or to celebrate a special occasion while ensuring RedRover can continue its lifesaving work.
                </li>
                <li>
                  <a href="https://redrover.donorsupport.co/-/XGHNMREB">Gift a Membership</a> and provide Kind News™ magazine subscriptions of students. RedRover maintains a waiting list of classroom teachers who would like to have a subscription sent to their classroom.
                </li>
              </ul>
              <a style={{marginLeft: '1rem'}} href="https://redrover.org/ways-to-give/">Learn more</a>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default RedRoverPartner