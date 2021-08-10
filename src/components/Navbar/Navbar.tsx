import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import { CSSObject } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

interface Props {
  sx?: CSSObject;
}

const Navbar: FC<Props> = ({ sx }) => {
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
                src={"/images/romingo_logo_yellow.svg"}
                alt="Logo"
                draggable="false"
                sx={{
                  maxHeight: { xs: "35px", md: "50px" },
                }}
              />
            </Hidden>
            <Button variant="outlined" size="small" color="primary">
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
                width: "125px",
                textAlign: "center",
                display: "flex",
              }}
            >
              <Box
                component="img"
                src={"/images/romingo_logo_yellow.svg"}
                alt="Logo"
                draggable="false"
                sx={{
                  maxWidth: "125px",
                  margin: "auto auto",
                }}
              />
            </Box>
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
