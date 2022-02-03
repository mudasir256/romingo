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

const ListYourProperty: FC = () => {
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
    <Grid item xs={12}>
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
    </Grid>
    <Grid item xs={12}>
      <hr style={{ margin: '1rem auto 1rem auto', display: 'block', border: '0px', height: '1px', width: '50%', background: '#ddd' }} />
    </Grid>
    <Grid item xs={12} sm={12} md={6} sx={{ margin: '0px auto 2rem auto' }} justifyContent='center'>
      <Grid container>
        <Grid item xs={12} sx={{ padding: { xs: '0rem', sm: '0rem', md: '0rem 1rem'}}}>
            {loading &&
              <Grid sx={{ zIndex: 1401, display: 'flex', position: 'fixed', justifyContent: 'center', alignItems: 'center', background: '#11111140', backdropFilter:'blur(12px)', top: '0px', bottom: '0px', left:'0px', right: '0px'}}>
                <Grid sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', background: '#fff', justifyContent: 'center',  maxWidth: '300px', height: '200px', border: '1px solid #ccc', textAlign: 'center', borderRadius: '8px', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15', padding: '0rem 2rem',}}>
                  {success ? <>
                    <Check sx={{ fontSize: '32px', mb: '1rem' }} />
                    <Typography variant="body1"  sx={{ fontWeight: 500, maxWidth: '90%' }}>
                      Great! You will be hearing from us shortly
                    </Typography>
                    </> :
                    <>
                    <CircularProgress sx={{ fontSize: '16px',  mb: '1rem', maxWidth: '32px', maxHeight: '32px' }} />
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '90%', fontWeight: 500 }}>
                      Submitting your request...
                    </Typography>
                    </>
                  }
              </Grid>
            </Grid>
            }
            {/* <Grid container>
              <Grid item xs={12} sx={{ mb: '1rem'}}>
                <FormControl color='primary' fullWidth size='small' sx={{ maxHeight: '40px', padding: '0rem' }}>
                  <InputLabel>Select property</InputLabel>
                  <Select disableUnderline value={property} onChange={e => setProperty(e.target.value)} label='Select property' variant='outlined' size='small' sx={{ maxHeight: '45px', padding: 0 }}>
                    <MenuItem value='hotel'>
                      Hotel
                    </MenuItem>
                    <MenuItem value='motel'>
                      Motel
                    </MenuItem>
                    <MenuItem value='short'>
                      Short term rental
                    </MenuItem>
                    <MenuItem value='extended'>
                      Extended stay
                    </MenuItem>
                    <MenuItem value='hostel'>
                      Hostel
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mb: '1rem'}}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Lets start with your name please?
                  </InputLabel>
                  <BootstrapInput defaultValue="" onChange={e => setName(e.target.value)} value={name} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mb: '1rem'}}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    What business or company do you represent?
                  </InputLabel>
                  <BootstrapInput defaultValue="" onChange={e => setBusiness(e.target.value)} value={business} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mb: '1rem'}}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    What city is your business located in?
                  </InputLabel>
                  <BootstrapInput defaultValue="" onChange={e => setCity(e.target.value)} value={city} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mb: '1rem'}}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    May we please collect your email address to contact you?
                  </InputLabel>
                  <BootstrapInput defaultValue="" onChange={e => setEmail(e.target.value)} value={email} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mb: '1rem'}}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Please describe your pet-friendly accommodations <br />
                  </InputLabel>
                  <i style={{ display: 'block', fontFamily: 'Montserrat', flexWrap: 'wrap', color: '#999', fontSize: '12px', marginBottom: '.5rem', marginTop: '1.25rem', fontWeight: 500}}> For example: No Pet Fees, 2 Dogs @ 75lbs. each, Pet Run, Nearby Pet Relief Area, Provides Dog Beds/Bowls, etc. </i>
                  <BootstrapInput multiline rows={5} defaultValue="" onChange={e => setAccommodations(e.target.value)} value={accommodations} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mb: '1rem'}}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                  How may Romingo help your business?
                  </InputLabel>
                  <BootstrapInput multiline rows={3} defaultValue="" onChange={e => setHelp(e.target.value)} value={help} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button disabled={!buttonEnabled || loading} onClick={() => setLoading(true)} variant='contained'  sx={{ margin: '0px auto', fontWeight: 500, textTransform: 'none' }}> Submit </Button>
              </Grid>
            </Grid>*/}
          </Grid>
        </Grid>


        <div style={{ marginTop: '-1rem' }} data-paperform-id="i5uth4bp"></div>

      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Box
        component="img"
        src="https://storage.googleapis.com/romingo-development-public/images/front-end/form-header.jpeg"
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "90%",
          mt: { xs: 0, sm: 0, md: '.5rem' },
          borderRadius: 5,
        }}
      />
      </Grid>
  </Grid>
}

export default ListYourProperty;
