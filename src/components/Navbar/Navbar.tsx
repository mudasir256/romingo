import React, { FC, useState, MouseEventHandler } from "react";
import Box from "@mui/material/Box";
import { CSSObject } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { PopupButton } from "@typeform/embed-react";
import IconButton from "@mui/material/IconButton";
import Hidden from "@mui/material/Hidden";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

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
                <Link>
                  <PopupButton
                    id="zdVrRtxT"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      margin: 0,
                      marginBottom: -5,
                    }}
                  >
                    <Link>
                      <Typography variant="body2" color="primary">
                        List Your Property
                      </Typography>
                    </Link>
                  </PopupButton>
                </Link>
              </Box>
            </Hidden>
            <Hidden smUp>
              <Box
                component="img"
                src={"/images/Romingo_Logo_Black.svg"}
                alt="Logo"
                onClick={() => {
                  history.push("/");
                }}
                draggable="false"
                sx={{
                  maxHeight: { xs: "35px", md: "45px" },
                }}
              />
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
                onClick={() => {
                  history.push("/");
                }}
                sx={{
                  maxWidth: "180px",
                  margin: "auto auto",
                  cursor: "pointer",
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

export default Navbar;
