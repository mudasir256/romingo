import React, { FC, useState, useEffect, MouseEventHandler } from "react";
import { useHistory } from "react-router-dom";
import {
  Menu,
  MenuItem,
  Divider,
  CircularProgress,
  Box,
  CSSObject,
  useTheme,
  Link,
  useScrollTrigger,
  AppBar,
  Popover,
  Grid,
  Toolbar,
  IconButton,
  Hidden,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  TextField,
  Button,
  Drawer
} from "@mui/material";
import {
  KeyboardArrowDown,
  Cancel,
  HomeWork,
  CalendarToday,
  ViewDay,
  Work,
  Groups,
  RssFeed,
  SupportAgent,
  Sell,
  Support,
  Pets,
  LiveHelp,
  PushPin,
  WorkRounded,
  HomeWorkRounded,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [mobileDeals, setMobileDeals] = useState<boolean>(false)
  const trigger = useScrollTrigger()
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
  };

  return (
    <>
      <AppBar
        position="fixed"
        style={{
          background: "#ffffffed",
          WebkitBackdropFilter: "blur(6px)",
          backdropFilter: "blur(6px)",
          backgroundColor: "#ffffffed",
        }}
        sx={{ boxShadow: trigger? 2 : 0, borderBottom: '1px solid #ddd' }}
      >
        <Toolbar sx={{ display: "block", position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: { xs: "56px", sm: "64px" },
            }}
          >
            <Hidden lgDown>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  src={
                    "https://storage.googleapis.com/romingo-development-public/images/front-end/Romingo_Logo_Black.svg"
                  }
                  alt="Logo"
                  draggable="false"
                  onClick={() => history.push("/")}
                  sx={{
                    maxWidth: "140px",
                    margin: "auto auto",
                    cursor: "pointer",
                  }}
                />
              </Box>
              <Link
                href="/reservation/manage"
                sx={{
                  ml: "auto",
                  padding: ".5rem 1rem",
                  borderRadius: "6px",
                  mr: ".75rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "#03989E" },
                  color: "#666",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontFamily: "Montserrat" }}
                >
                  My trips
                </Typography>
              </Link>
              <Link
                href="/about"
                sx={{
                  padding: ".5rem 1rem",
                  borderRadius: "6px",
                  mr: ".75rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "#03989E" },
                  color: "#666",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontFamily: "Montserrat" }}
                >
                  About us
                </Typography>
              </Link>
              <Link
                href="/romingo-partners"
                sx={{
                  padding: ".5rem 1rem",
                  borderRadius: "6px",
                  mr: ".75rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "#03989E" },
                  color: "#666",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontFamily: "Montserrat" }}
                >
                  Community
                </Typography>
              </Link>
              <Link
                href="/faq"
                sx={{
                  padding: ".5rem 1rem",
                  borderRadius: "6px",
                  mr: ".75rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "#03989E" },
                  color: "#666",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontFamily: "Montserrat" }}
                >
                  FAQ
                </Typography>
              </Link>
              <Link
                href="/blog"
                sx={{
                  padding: ".5rem 1rem",
                  borderRadius: "6px",
                  mr: ".75rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "#03989E" },
                  color: "#666",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontFamily: "Montserrat" }}
                >
                  Blog
                </Typography>
              </Link>
              <Link
                href="/contact"
                sx={{
                  padding: ".5rem 1rem",
                  borderRadius: "6px",
                  mr: ".75rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "#03989E" },
                  color: "#666",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontFamily: "Montserrat" }}
                >
                  Support
                </Typography>
              </Link>
              <Link
                sx={{
                  padding: ".5rem 1rem",
                  borderRadius: "6px",
                  mr: ".75rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "#03989E" },
                  color: "#666",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontFamily: "Montserrat" }}
                >
                  <RomingoDeals />
                </Typography>
              </Link>
              <Link
                href="/list-your-property"
                sx={{
                  border: "2px solid #03989E",
                  padding: ".25rem .5rem",
                  borderRadius: "6px",
                  mr: ".75rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  color: "#03989E",
                  '&:hover': {
                    background: '#03989E',
                    color: '#fff'
                  }
                }}
              >
                <HomeWork sx={{ mr: ".5rem", fontSize: "16px" }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontFamily: "Montserrat", }}
                >
                  List Your Property
                </Typography>
              </Link>
              {/* <Link onClick={(e) => { setMenuOpen(!menuOpen);setAnchorEl(e.currentTarget)}} sx={{cursor: 'pointer', padding: '.5rem 1rem', minWidth: '20px', background: menuOpen ? '#03989E': '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'cener', textDecoration: 'none', '&:hover': { background: '#03989E', color: '#fff' }, color: menuOpen ? '#fff':'#03989E'}}>
                <MenuIcon sx={{ margin: '0px auto'}} />
              </Link> */}
            </Hidden>



            <Hidden lgUp>
              <Drawer PaperProps={{ sx: { minWidth: '280px' }}} anchor='right' onClose={() => setAnchorEl(null)} open={anchorEl ? true : false}>
                <Box
                  component="img"
                  src={
                    "https://storage.googleapis.com/romingo-development-public/images/front-end/Romingo_Logo_Black.svg"
                  }
                  alt="Logo"
                  draggable="false"
                  onClick={() => history.push("/")}
                  sx={{
                    maxWidth: "140px",
                    margin: "1rem auto",
                  }}
                />
                <MenuItem
                  onClick={() => history.push("/about")}
                  component="button"
                  sx={{ fontWeight: 500, minWidth: "200px" }}
                >
                 <Pets sx={{ mr: '1.5rem', fontSize: '16px', color: '#666' }} /> About us
                </MenuItem>
                <MenuItem
                  onClick={() => history.push("/romingo-partners")}
                  component="button"
                  sx={{ fontWeight: 500, minWidth: "200px" }}
                >
                 <Groups sx={{ mr: '1.5rem', fontSize: '16px', color: '#666' }} /> Community
                </MenuItem>
                <MenuItem
                  onClick={() => history.push("/faq")}
                  component="button"
                  sx={{ fontWeight: 500, minWidth: "200px" }}
                >
                 <LiveHelp sx={{ mr: '1.5rem', fontSize: '16px', color: '#666' }} /> FAQ
                </MenuItem>
                <MenuItem
                  onClick={() => history.push("/blog")}
                  component="button"
                  sx={{ fontWeight: 500, minWidth: "200px" }}
                >
                <PushPin sx={{ mr: '1.5rem', fontSize: '16px', color: '#666' }} />  Blog
                </MenuItem>
                <MenuItem
                  onClick={() => history.push("/contact")}
                  component="button"
                  sx={{ fontWeight: 500, minWidth: "200px" }}
                >
                <Support sx={{ mr: '1.5rem', fontSize: '16px', color: '#666' }} />  Support
                </MenuItem>
                <RomingoDealsMobile />
                <MenuItem
                  component="button"
                  onClick={() => history.push("/list-your-property")}
                  sx={{ fontWeight: 500, minWidth: "200px" }}
                >
                <HomeWork sx={{ mr: '1.5rem', fontSize: '16px', color: '#666' }} />  List your property
                </MenuItem>
              </Drawer>
              <Box
                component="img"
                src={
                  "https://storage.googleapis.com/romingo-development-public/images/front-end/Romingo_Logo_Black.svg"
                }
                alt="Logo"
                onClick={() => {
                  history.push("/");
                }}
                draggable="false"
                sx={{
                  mr: "auto", ml: '0px',
                  maxHeight: { xs: "35px", md: "45px" },
                }}
              />

              <Typography
                onClick={() => history.push("/reservation/manage")}
                variant="body2"
                sx={{
                  cursor: "pointer",
                  color: "#222",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "6px",
                    padding: " .125rem .25rem",
                  }}
                >
                  <WorkRounded sx={{ fontSize: "20px", mr: ".25rem" }} />
                </span>
              </Typography>
              <a
                href='#destinations'
                style={{
                  cursor: "pointer",
                  marginRight: "0px",
                  marginLeft: '1rem',
                  color: "#222",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "6px",
                    padding: " .125rem .25rem",
                  }}
                >
                  <HomeWorkRounded sx={{ fontSize: "20px", mr: ".25rem" }} />
                </span>
              </a>

              <Link
                onClick={(e) => {
                  setMenuOpen(!menuOpen);
                  setAnchorEl(e.currentTarget);
                }}
                sx={{
                  padding: ".5rem 1rem",
                  minWidth: "20px",
                  background: "transparent",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "cener",
                  textDecoration: "none",
                  "&:hover": { color: "#999" },
                  cursor: "pointer",
                  color: menuOpen ? "#999" : "#222",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                <MenuIcon sx={{ margin: "0px auto" }} />
              </Link>
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
            <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
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
  const [showDealsPopup, setShowDealsPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  useEffect(() => {
    setEmailIsValid(/^\S+@\S+\.\S+$/.test(email));
  }, [email]);

  useEffect(() => {
    emailSubmitted && setIsSubmitting(false);
    !emailSubmitted && setEmail("");
  }, [emailSubmitted]);

  useEffect(() => {
    if (!showDealsPopup)
      setTimeout(() => {
        setEmailSubmitted(false);
      }, 250);
  }, [showDealsPopup]);

  const submitEmail = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      fetch(
        `https://romingo.us6.list-manage.com/subscribe/post-json?u=585083137c3540a7371e3a74f&id=d4d3932414&EMAIL=${encodeURIComponent(
          email
        )}&c=?`,
        { mode: "no-cors", method: "POST" }
      ).then((res) => {
        setEmailSubmitted(true);
      });
    }, 500);
  };

  return (
    <>
      <Popover
        onClose={() => setShowDealsPopup(false)}
        open={showDealsPopup}
        anchorEl={anchorEl}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            marginTop: "48px",
            border: "1px solid #ddd",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Grid
          container
          sx={{
            width: { xs: "100%", sm: "393px" },
            minHeight: "100px",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#00000099",
              p: ".5rem .5rem",
              pb: ".125rem",
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: ".9rem",
            }}
          >
            Sign up with your email below to access exclusive deals and more:
            <Cancel
              onClick={() => setShowDealsPopup(false)}
              sx={{
                cursor: "pointer",
                transition: "all .15s linear",
                marginBottom: "auto",
                "&:hover": { color: "#03989E" },
              }}
            />
          </Grid>
          {emailSubmitted ? (
            <Grid
              item
              xs={12}
              sx={{
                p: ".5rem .5rem .5rem .5rem",
                fontFamily: "Work Sans",
                color: "#03989E",
                textAlign: "center",
              }}
            >
              Awesome! You&lsquo;re subscribed to deals, tips, guides, and all
              the other great content from Romingo Insiders!
            </Grid>
          ) : (
            <>
              {isSubmitting && (
                <Grid
                  sx={{
                    position: "absolute",
                    zIndex: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "0px",
                    right: "0",
                    left: "0",
                    bottom: "0px",
                    background: "#ffffff80",
                    backdropFilter: "blur(1px)",
                  }}
                >
                  <CircularProgress />
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  p: ".25rem .5rem .5rem .5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  variant="outlined"
                  color="primary"
                  placeholder="enter email"
                  size="small"
                  value={email}
                  sx={{
                    outline: "none",
                    fontSize: ".8rem",
                    input: { fontFamily: "Montserrat" },
                  }}
                  InputProps={{
                    sx: {
                      fontSize: ".5rem",
                      maxHeight: "30px",
                      fontFamily: "Montserrat",
                      width: { xs: "calc(100vw - 140px)", sm: "290px" },
                      outline: "none",
                    },
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={submitEmail}
                  disabled={!emailIsValid || isSubmitting}
                  size="small"
                  variant="contained"
                  sx={{
                    fontWeight: 600,
                    textTransform: "none",
                    fontFamily: "Montserrat",
                  }}
                >
                  Sign up!
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Popover>
      <span
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          setShowDealsPopup(true);
          setAnchorEl(e.currentTarget);
        }}
      >
        Deals
      </span>
    </>
  );
};



const RomingoDealsMobile = () => {
  const [showDealsPopup, setShowDealsPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    setEmailIsValid(/^\S+@\S+\.\S+$/.test(email));
  }, [email]);

  useEffect(() => {
    emailSubmitted && setIsSubmitting(false);
    !emailSubmitted && setEmail("");
  }, [emailSubmitted]);

  useEffect(() => {
    if (!showDealsPopup)
      setTimeout(() => {
        setEmailSubmitted(false);
      }, 250);
  }, [showDealsPopup]);

  const submitEmail = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      fetch(
        `https://romingo.us6.list-manage.com/subscribe/post-json?u=585083137c3540a7371e3a74f&id=d4d3932414&EMAIL=${encodeURIComponent(
          email
        )}&c=?`,
        { mode: "no-cors", method: "POST" }
      ).then((res) => {
        setEmailSubmitted(true);
      });
    }, 500);
  };

  return (
    <>
      <span
        style={{ cursor: "pointer", transition: 'all .25s ease-in-out', overflow: 'hidden', maxHeight: showDealsPopup ? '200px': '50px', }}

      >
        <MenuItem
          onClick={(e) => {
            setShowDealsPopup(!showDealsPopup);
          }}
          sx={{ fontWeight: 500, minWidth: "200px" }}>
          <Sell sx={{ mr: '1.5rem', fontSize: '16px', color: '#666' }} />
          Deals
          <KeyboardArrowDown sx={{ opacity: showDealsPopup ? 1 : 0, ml: 'auto', transition: 'all .25s ease-in-out', transform: showDealsPopup? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </MenuItem>
        {showDealsPopup ?
        <Grid
          container
          sx={{
            maxWidth: '280px',
            minHeight: "100px",
            display: "flex",
            overflow: "hidden",
            padding: '0rem .5rem'
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#00000099",
              p: ".5rem .5rem",
              pb: ".125rem",
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: ".9rem",
            }}
          >
            Sign up with your email below to access exclusive deals and more:
          </Grid>
          {emailSubmitted ? (
            <Grid
              item
              xs={12}
              sx={{
                p: ".5rem .5rem .5rem .5rem",
                fontFamily: "Work Sans",
                color: "#03989E",
                textAlign: "center",
              }}
            >
              Awesome! You&lsquo;re subscribed to deals, tips, guides, and all
              the other great content from Romingo Insiders!
            </Grid>
          ) : (
            <>
              {isSubmitting && (
                <Grid
                  sx={{
                    position: "absolute",
                    zIndex: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "0px",
                    right: "0",
                    left: "0",
                    bottom: "0px",
                    background: "#ffffff80",
                    backdropFilter: "blur(1px)",
                  }}
                >
                  <CircularProgress />
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  p: ".25rem .5rem .5rem .5rem",
                  display: "flex",
                  flexDirection: 'column',
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  variant="outlined"
                  color="primary"
                  placeholder="enter email"
                  size="small"
                  value={email}
                  sx={{
                    outline: "none",
                    fontSize: ".8rem",
                    input: { fontFamily: "Montserrat" },
                  }}
                  InputProps={{
                    sx: {
                      fontSize: ".5rem",
                      maxHeight: "30px",
                      fontFamily: "Montserrat",
                      outline: "none",
                    },
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={submitEmail}
                  disabled={!emailIsValid || isSubmitting}
                  size="small"
                  fullWidth
                  variant="contained"
                  sx={{
                    fontWeight: 600,
                    textTransform: "none",
                    fontFamily: "Montserrat",
                    mt: '.5rem'
                  }}
                >
                  Sign up!
                </Button>
              </Grid>
            </>
          )}
        </Grid> : <></>}
      </span>
    </>
  );
};

export default Navbar;
