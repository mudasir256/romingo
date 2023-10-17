import React, { FC, useState, useEffect, MouseEventHandler } from "react";
import { useHistory } from "react-router-dom";
import {
  MenuItem,
  CircularProgress,
  Box,
  CSSObject,
  useTheme,
  Link,
  useScrollTrigger,
  AppBar,
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
  Drawer,
} from "@mui/material";
import {
  KeyboardArrowDown,
  HomeWork,
  Groups,
  Sell,
  Support,
  Pets,
  LiveHelp,
  PushPin,
  WorkRounded,
  HomeWorkRounded,
  Person,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginCard from "../../components/AuthCard/Login";
import RegisterCard from "../../components/AuthCard/Register";
import ResetPassword from "../../components/AuthCard/ResetPassword";
import { authService } from "../../services/authService.js"
import DropdownMenuNav from '../../components/DropdownMenuNav'
import LogoImg from '../../assets/images/logo-backup.png';


interface Props {
  sx?: CSSObject;
}

const Navbar: FC<Props> = ({ sx }) => {
  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const trigger = useScrollTrigger();
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

  const handleProfileClick = () => {
    const token = authService.getUser();
    console.log(token)
    if (token) {
      history.push('/profile')
      return
    }
    setShowLogin(true)
  }

  const path = history.location.pathname

  const linkStyle = {
    padding: ".25rem 1rem",
    borderRadius: "6px",
    mr: ".75rem",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    "&:hover": { color: "#03989E" },
    color: "black",
  }

  return <>
    <AppBar
      position={path === '/' ? 'fixed': 'relative'}
      style={{
        background: "white",
        WebkitBackdropFilter: "blur(6px)",
        backdropFilter: "blur(6px)",
        backgroundColor: "white",
      }}
      sx={{ boxShadow: trigger ? 2 : 0, borderBottom: "1px solid #ddd" }}
    >
      <Toolbar sx={{ display: "block", position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: { xs: "56px", sm: "84px" },
          }}
        >
          <Hidden lgDown>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'flex-start' }}>
                <Link
                  href="/faq"
                  sx={linkStyle}
                >
                  <div
                    style={{ marginLeft: '4em', fontSize: '1em', lineHeight: '28px',  }}

                  >
                    FAQ
                  </div>
                </Link>
                <Link
                  href="/reservation/manage"
                  sx={{
                    ml: "auto",
                    ...linkStyle
                  }}
                >
                  <div
                    style={{ fontSize: '1em', lineHeight: '28px' }}
                  >
                    My trips
                  </div>
                </Link>
              </Box>

            </Box>
            <Box
              component="img"
              src={
                "https://storage.googleapis.com/romingo-development-public/images/front-end/Romingo_Logo_Black.svg"
              }
              alt="Logo"
              draggable="false"
              onClick={() => history.push("/")}
              sx={{
                maxWidth: "230px",
                margin: "auto auto",
                cursor: "pointer",
                height: '77px'
              }}
            />
            <Link
              href="/blog"
              sx={{
                borderRadius: "6px",
                mr: "2rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                "&:hover": { color: "#03989E" },
                color: "black",
              }}
            >
              {/* <HomeWork sx={{ mr: ".5rem", fontSize: "16px" }} /> */}
              <div
                style={{ marginRight: '1em', fontSize: '1em', lineHeight: '28px' }}
              >
                Travel tips
              </div>
            </Link>
            <Box
              onClick={() => handleProfileClick()}
              sx={{
                borderRadius: "6px",
                mr: "4rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                "&:hover": { color: "#03989E" },
                color: "black",
              }}
            >
              Sign in
            </Box>
            <DropdownMenuNav />
          </Hidden>

          <Hidden lgUp>
            <Drawer
              PaperProps={{ sx: { minWidth: "280px" } }}
              anchor="right"
              onClose={() => setAnchorEl(null)}
              open={anchorEl ? true : false}
            >
              <Box
                component="img"
                src={LogoImg}
                alt="Logo"
                draggable="false"
                onClick={() => history.push("/")}
                sx={{
                  maxWidth: "120px",
                  margin: "1rem auto",
                }}
              />
              <MenuItem
                onClick={() => history.push("/about")}
                component="button"
                sx={{ fontWeight: 500, minWidth: "200px" }}
              >
                <Pets
                  sx={{ mr: "1.5rem", fontSize: "16px", color: "#666" }}
                />{" "}
                Our story
              </MenuItem>
              <MenuItem
                onClick={() => history.push("/romingo-partners")}
                component="button"
                sx={{ fontWeight: 500, minWidth: "200px" }}
              >
                <Groups
                  sx={{ mr: "1.5rem", fontSize: "16px", color: "#666" }}
                />{" "}
                Philanthropy
              </MenuItem>
              <MenuItem
                onClick={() => history.push("/faq")}
                component="button"
                sx={{ fontWeight: 500, minWidth: "200px" }}
              >
                <LiveHelp
                  sx={{ mr: "1.5rem", fontSize: "16px", color: "#666" }}
                />{" "}
                FAQ
              </MenuItem>
              <MenuItem
                onClick={() => history.push("/blog")}
                component="button"
                sx={{ fontWeight: 500, minWidth: "200px" }}
              >
                <PushPin
                  sx={{ mr: "1.5rem", fontSize: "16px", color: "#666" }}
                />{" "}
                Blog
              </MenuItem>
              <MenuItem
                onClick={() => history.push("/contact")}
                component="button"
                sx={{ fontWeight: 500, minWidth: "200px" }}
              >
                <Support
                  sx={{ mr: "1.5rem", fontSize: "16px", color: "#666" }}
                />{" "}
                Support
              </MenuItem>
              <RomingoDealsMobile />
              <MenuItem
                component="button"
                onClick={() => history.push("/blog")}
                sx={{ fontWeight: 500, minWidth: "200px" }}
              >
                <HomeWork
                  sx={{ mr: "1.5rem", fontSize: "16px", color: "#666" }}
                />{" "}
                Travel tips
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
                mr: "auto",
                ml: "0px",
                maxHeight: { xs: "44px", md: "44px" },
              }}
            />

            <DropdownMenuNav />


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
          size="large">
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
            handleClose={handleClose}
          />
        )}
        {selectDialog === REGISTER && (<>
          <Typography variant="base">Create an account with Romingo to earn rewards, manage reservations, and receive special deals / offers.</Typography>
          <RegisterCard
            sx={{
              mt: 1,
              py: 1,
            }}
          />
        </>)}
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
          {selectDialog === LOGIN ? "Not a member?" : "Already a member?"}
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
{/*          {selectDialog === LOGIN && (
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
        )}*/}
      </DialogContent>
    </Dialog>
  </>;
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
        style={{
          cursor: "pointer",
          transition: "all .25s ease-in-out",
          overflow: "hidden",
          maxHeight: showDealsPopup ? "200px" : "50px",
        }}
      >
        <MenuItem
          onClick={(e) => {
            setShowDealsPopup(!showDealsPopup);
          }}
          sx={{ fontWeight: 500, minWidth: "200px" }}
        >
          <Sell sx={{ mr: "1.5rem", fontSize: "16px", color: "#666" }} />
          Deals
          <KeyboardArrowDown
            sx={{
              opacity: showDealsPopup ? 1 : 0,
              ml: "auto",
              transition: "all .25s ease-in-out",
              transform: showDealsPopup ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </MenuItem>
        {showDealsPopup ? (
          <Grid
            container
            sx={{
              maxWidth: "280px",
              minHeight: "100px",
              display: "flex",
              overflow: "hidden",
              padding: "0rem .5rem",
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
                    flexDirection: "column",
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
                      "& label.Mui-focused": {
                        color: "#03989E",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "green",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#03989E",
                        },
                      },
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
                      mt: ".5rem",
                    }}
                  >
                    Sign up!
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        ) : (
          <></>
        )}
      </span>
    </>
  );
};

export default Navbar;