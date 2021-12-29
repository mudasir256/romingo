import React, { FC, useState, useEffect, MouseEventHandler } from "react";
import { useHistory } from "react-router-dom";
import { CircularProgress, Box, CSSObject, useTheme, Link, AppBar, Popover, Grid, Toolbar, IconButton, Hidden, Dialog, DialogContent, DialogTitle, Typography, useMediaQuery, TextField, Button } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import CloseIcon from "@mui/icons-material/Close";
import LoginCard from "../../components/AuthCard/Login";
import RegisterCard from "../../components/AuthCard/Register";
import ResetPassword from "../../components/AuthCard/ResetPassword";

interface Props {
  sx?: CSSObject;
}

const Navbar: FC<Props> = ({ sx }) => {
  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [showLogin, setShowLogin] = useState(false);

  const LOGIN = "Login";
  const REGISTER = "Register";
  const FORGOT_PASSWORD = "Forgot";

  const [selectDialog, setSelectDialog] = useState("Login");

  const handleLogin: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLogin(true);
  };

  const handleClose = () => {
    setShowLogin(false);
    setSelectDialog(LOGIN);
  }

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "white", boxShadow: 2 }}>
        <Toolbar sx={{ display: "block", position: "relative" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: { xs: "56px", sm: "64px" }}}>
            <Hidden smDown>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton edge="start" sx={{ mr: 1, color: "black" }} aria-label="menu" href="https://www.facebook.com/RomingoTravel/" target="_blank">
                  <FacebookIcon />
                </IconButton>
                <IconButton edge="start" sx={{ mr: 1, color: "black" }} aria-label="menu" href="https://www.instagram.com/romingotravel/" target="_blank">
                  <InstagramIcon />
                </IconButton>
                <Link href='/list-your-property'>
                  <Typography variant="body2" color="primary">
                    List Your Property
                  </Typography>
                </Link>

              </Box>
              <Box sx={{ top: 0, left: "calc(50% - 62.5px)", height: "100%", width: "180px", textAlign: "center", display: "flex" }}>
                <Box component="img" src={"https://storage.googleapis.com/romingo-development-public/images/front-end/Romingo_Logo_Black.svg"} alt="Logo" draggable="false" onClick={() => history.push("/")} sx={{maxWidth: "180px", margin: "auto auto", cursor: "pointer" }}/>
              </Box>
              <RomingoDeals />
            </Hidden>


            <Hidden smUp>
              <Box
                component="img"
                src={"https://storage.googleapis.com/romingo-development-public/images/front-end/Romingo_Logo_Black.svg"}
                alt="Logo"
                onClick={() => {
                  history.push("/");
                }}
                draggable="false"
                sx={{
                  maxHeight: { xs: "35px", md: "45px" },
                }}
              />
              <RomingoDeals />
            </Hidden>
            {/* <Button
              variant="text"
              size="small"
              color="primary"
              onClick={() => history.push("/reservation/manage")}
            >
              Manage Reservation
            </Button> */}
          </Box>

        </Toolbar>
      </AppBar>
      <Dialog
        open={showLogin}
        keepMounted
        fullWidth
        fullScreen={fullScreen}
        maxWidth={"xs"}
        onClose={handleClose}
        scroll="body"
        aria-labelledby="amenities-dialog-slide-title"
        aria-describedby="amenities-dialog-slide-description"
      >
        <DialogTitle
          id="amenities-dialog-slide-title"
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            {selectDialog === LOGIN
              ? "Login"
              : selectDialog === REGISTER
              ? "Register"
              : "Reset Your Password"}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            px: {
              xs: 1,
              sm: 2.5,
            },
          }}
        >
          {selectDialog === LOGIN && (
            <LoginCard
              sx={{
                mt: 1,
                py: 1,
              }}
            />
          )}
          {selectDialog === REGISTER && (
            <RegisterCard
              sx={{
                mt: 1,
                py: 1,
              }}
            />
          )}
          {selectDialog === FORGOT_PASSWORD && (
            <ResetPassword
              sx={{
                mt: 1,
                py: 1,
              }}
            />
          )}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 1,
              textAlign: "center",
            }}
          >
            {selectDialog === LOGIN ? "Not a member?" : "Already a memeber?"}
          </Typography>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // setSelectDialog(FORGOT_PASSWORD);
              if (selectDialog === LOGIN) {
                setSelectDialog(REGISTER);
              } else {
                setSelectDialog(LOGIN);
              }
            }}
          >
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                textAlign: "center",
              }}
            >
              {selectDialog === LOGIN ? "Create Your Account" : "Log In"}
            </Typography>
          </Link>
          {selectDialog === LOGIN && (
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectDialog(FORGOT_PASSWORD);
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  textAlign: "center",
                }}
              >
                Forgot Password?
              </Typography>
            </Link>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};


const RomingoDeals = () => {
  const [showDealsPopup, setShowDealsPopup] = useState(false)
  const [email, setEmail] = useState('')
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  useEffect(() => {
    setEmailIsValid(/^\S+@\S+\.\S+$/.test(email))
  }, [email])

  useEffect(() => {
    emailSubmitted && setIsSubmitting(false)
    !emailSubmitted && setEmail('')
  }, [emailSubmitted])

  useEffect(() => {
    if (!showDealsPopup) setTimeout(() => {
      setEmailSubmitted(false)
    }, 250)

  }, [showDealsPopup])

  const submitEmail = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      fetch(`https://romingo.us6.list-manage.com/subscribe/post-json?u=585083137c3540a7371e3a74f&id=d4d3932414&EMAIL=${encodeURIComponent(email)}&c=?`,{ mode: "no-cors", method: "POST",}).then((res) => {
        setEmailSubmitted(true)
      })
    }, 500)
  }

  return <>
    <Popover
      onClose={() => setShowDealsPopup(false)}
      open={showDealsPopup}
      PaperProps={{sx: { borderRadius: '12px' }}}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Grid container sx={{width: { xs: '100%', sm: '393px' }, minHeight: '130px', display: 'flex', overflow: 'hidden'}}>

        <Grid item xs={12}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#00000099', background: '#D9F7FC', borderBottom: '3px solid #CAE9EE', p: '.5rem .5rem', pb: '.25rem', fontFamily: 'Montserrat', fontWeight: 900, fontSize: '.9rem' }}
        >
          Romingo Deals: Exlusive Rates and More!
          <Cancel onClick={() => setShowDealsPopup(false)} sx={{ cursor: 'pointer', transition: 'all .15s linear', '&:hover': { color: '#03989E' } }} />
        </Grid>
        {emailSubmitted ?
          <Grid item xs={12} sx={{ p: '.5rem .5rem .5rem .5rem', fontFamily: 'Work Sans', color: '#03989E', textAlign: 'center'}}>
          Awesome! You&lsquo;re subscribed to deals, tips, guides, and all the other great content from Romingo Insiders!
          </Grid>
          :
          <>
            <Grid item xs={12} sx={{ p: '.5rem .5rem .125rem .5rem', textAlign: 'center', fontFamily: 'Work Sans', color: '#03989E'  }}>
            Sign up with your email below:
            </Grid>
            { isSubmitting && <Grid sx={{ position: 'absolute', zIndex: 9,  display: 'flex', alignItems: 'center', justifyContent: 'center', top: '0px', right: '0', left: '0', bottom: '0px', background: '#ffffff80', backdropFilter: 'blur(1px)' }}>
              <CircularProgress />
            </Grid>}
            <Grid item xs={12} sm={12} sx={{ p: '.25rem .5rem .5rem .5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <TextField
                variant='outlined'
                color='primary'
                placeholder='Email Address'
                size='small'
                value={email}
                sx={{ outline: 'none', fontSize: '.8rem' }}
                InputProps={{sx: { fontSize: '.5rem', maxHeight: '30px', width: { xs: 'calc(100vw - 140px)', sm: '290px'  }, outline: 'none' }}}
                onChange={e => setEmail(e.target.value)}

              />
              <Button onClick={submitEmail} disabled={(!emailIsValid) || isSubmitting} size='small' variant='contained' sx={{ fontWeight: 600 }}>
                Sign up!
              </Button>
            </Grid>
          </>
        }
      </Grid>
    </Popover>
    <Link onClick={() => setShowDealsPopup(true)} sx={{ cursor: 'pointer'}}>
    <Typography variant="body2" color="primary">
      Romingo Deals
    </Typography>
  </Link>
  </>
}


export default Navbar;
