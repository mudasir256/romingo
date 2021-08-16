import React, { FC, useState, MouseEventHandler } from "react";
import Box from "@material-ui/core/Box";
import { CSSObject } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import LoginCard from "../../components/AuthCard/Login";
import RegisterCard from "../../components/AuthCard/Register";
import ResetPassword from "../../components/AuthCard/ResetPassword";

interface Props {
  sx?: CSSObject;
}

const Navbar: FC<Props> = ({ sx }) => {
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
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: 2,
        }}
      >
        <Toolbar
          sx={{
            display: "block",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: { xs: "56px", sm: "64px" },
            }}
          >
            <Hidden smDown>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  edge="start"
                  sx={{ mr: 1, color: "black" }}
                  aria-label="menu"
                  href="https://www.facebook.com/RomingoTravel"
                  target="_blank"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  edge="start"
                  sx={{ mr: 1, color: "black" }}
                  aria-label="menu"
                  href="https://www.instagram.com/romingotravel"
                  target="_blank"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  edge="start"
                  sx={{ mr: 1, color: "black" }}
                  aria-label="menu"
                  href="https://twitter.com/RomingoTravel"
                  target="_blank"
                >
                  <TwitterIcon />
                </IconButton>
                <Link
                  href="https://romingo.com/contact"
                  target="_blank"
                  variant="body2"
                  sx={{
                    color: "text.primary",
                  }}
                >
                  Partner With Us
                </Link>
              </Box>
            </Hidden>
            <Hidden smUp>
              <Box
                component="img"
                src={"/images/Romingo_Logo_Black.svg"}
                alt="Logo"
                draggable="false"
                sx={{
                  maxHeight: { xs: "35px", md: "45px" },
                }}
              />
            </Hidden>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
          <Hidden smDown>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "calc(50% - 62.5px)",
                height: "100%",
                width: "180px",
                textAlign: "center",
                display: "flex",
              }}
            >
              <Box
                component="img"
                src={"/images/Romingo_Logo_Black.svg"}
                alt="Logo"
                draggable="false"
                sx={{
                  maxWidth: "180px",
                  margin: "auto auto",
                }}
              />
            </Box>
          </Hidden>
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
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
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
          <DialogContentText id="amenities-dialog-slide-description">
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
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
