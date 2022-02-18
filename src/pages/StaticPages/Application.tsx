import { FC } from "react";
import { FormControl, MenuItem, CircularProgress, InputLabel, InputBase, Typography, Button, Grid, Container, Box, TextField, Divider, Select } from '@mui/material'
import { Widget } from "@typeform/embed-react";
import { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useWindowSize from "../../hooks/UseWindowSize";
import { Check, Error } from "@mui/icons-material";
import ScrollToTop from "../../components/ScrollToTop";
import { alpha, styled } from '@mui/material/styles';

const Application: FC = () => {
  return  <>
      <ScrollToTop />
      <Navbar />
      <Container sx={{ mt: 10, mb: 5 }}>
        <StepsContainer />
      </Container>
      <Footer />
    </>
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StepsContainer: FC = () => {
  const [name, setName] = useState('')
  const [confirmationNumber, setConfirmationNumber] = useState('')
  const [business, setBusiness] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [accommodations, setAccommodations] = useState('')
  const [help, setHelp] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [property, setProperty] = useState('')
  const buttonEnabled = ((property.length > 2) && (name.length > 2) && (business.length > 2) && (city.length > 2) && (email.length > 2) && (accommodations.length > 2) && (help.length > 2))

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setSuccess(true)
      }, 2500)
    }
    else {
      setSuccess(false)
    }
  }, [loading])

  useEffect(() => {
    if (success) {
     setTimeout(() =>  setLoading(false), 5000)
    }
  }, [success])

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://paperform.co/__embed.min.js"
    document.body.appendChild(script)
  }, [])

    return <Grid container spacing={2}>
    {/* <Grid item xs={12}>
      <Typography
        variant="h4"
        color="text.primary"
        sx={{ mt: 2, textAlign: "center" }}
      >
        List your property on Romingo
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2, textAlign: "center", fontWeight: 500 }}
      >
       <b style={{ display: 'block' }}>Welcome to Romingo!</b>
       Interested in listing your property on the pet-friendliest site on the web? <br /> Learn more about Romingo partnerships & distribution by completing this brief form. Someone from our team will be in touch asap!
      </Typography>
    </Grid> */}
    {/* <Grid item xs={12}>
      <hr style={{ margin: '1rem auto 1rem auto', display: 'block', border: '0px', height: '1px', width: '50%', background: '#ddd' }} />
    </Grid> */}
    <Grid item xs={12} sm={12} md={12} sx={{ margin: '0px auto 2rem auto' }} justifyContent='center'>
      <div style={{ marginTop: '-1rem' }} data-paperform-id="5rnusmd7"></div>
     </Grid>
  </Grid>
}

export default Application;
