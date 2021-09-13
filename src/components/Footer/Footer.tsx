import Box from "@mui/material/Box";
import { FC } from "react";
import { CSSObject } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Hidden from "@mui/material/Hidden";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

interface Props {
  sx?: CSSObject;
  footerMenus?: {
    reservation: {
      text: string;
      link: string;
    }[]
    about: {
      text: string;
      link: string;
    }[];
    contact: {
      text: string;
      link: string;
    }[];
    blog: {
      text: string;
      link: string;
    }[];
    sitemap: {
      text: string;
      link: string;
    }[];
  };
}

const FooterMenus = {
  reservation: [
    {
      text: "Manage Reservation",
      link: "/reservation/manage",
    },
    {
      text: "Cancel an existing reservation",
      link: "/reservation/cancel"
    }
  ],
  about: [
    {
      text: "How Romingo Works",
      link: "#",
    },
    {
      text: "Newsroom",
      link: "#",
    },
    {
      text: "Romingo 2021",
      link: "#",
    },
    {
      text: "Investors",
      link: "#",
    },
    {
      text: "Romingo Plus",
      link: "#",
    },
  ],
  contact: [
    {
      text: "Contact Us",
      link: "#",
    },
    {
      text: "Schedule a Meeting",
      link: "#",
    },
    {
      text: "Romingo 2021",
      link: "#",
    },
    {
      text: "Investors",
      link: "#",
    },
    {
      text: "Romingo Plus",
      link: "#",
    },
  ],
  blog: [
    {
      text: "Overview",
      link: "#",
    },
    {
      text: "Romingo Blog",
      link: "#",
    },
    {
      text: "Romingo 2021",
      link: "#",
    },
  ],
  sitemap: [
    {
      text: "How Romingo Works",
      link: "#",
    },
    {
      text: "Newsroom",
      link: "#",
    },
    {
      text: "Romingo 2021",
      link: "#",
    },
    {
      text: "Investors",
      link: "#",
    },
    {
      text: "Romingo Plus",
      link: "#",
    },
  ],
};

const Footer: FC<Props> = ({ sx, footerMenus = FooterMenus }) => {
  return (
    <Box
      sx={{
        ...sx,
        pt: 3,
        backgroundColor: "#F7F7F7",
      }}
    >
      <Container maxWidth="lg">
        <Grid container sx={{ borderBottom: "1px solid #DDDDDD" }}>
        <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Reservation
            </Typography>
            <List>
              {footerMenus.reservation.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "primary.main",
                        }}
                      >
                        {menu.text}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              About Us
            </Typography>
            <List>
              {footerMenus.about.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "primary.main",
                        }}
                      >
                        {menu.text}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Contact Us
            </Typography>
            <List>
              {footerMenus.contact.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "primary.main",
                        }}
                      >
                        {menu.text}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Blog
            </Typography>
            <List>
              {footerMenus.blog.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "primary.main",
                        }}
                      >
                        {menu.text}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Sitemap
            </Typography>
            <List>
              {footerMenus.sitemap.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{ pl: 0 }}>
                    <Link href={menu.link}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "primary.main",
                        }}
                      >
                        {menu.text}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mr: 1,
            }}
          >
            © {new Date().getFullYear()} Romingo, Inc.
          </Typography>
          <Link
            href="#"
            sx={{
              mr: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
              }}
            >
              Privacy
            </Typography>
          </Link>
          <Link href="#">
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
              }}
            >
              Terms
            </Typography>
          </Link>
        </Box>
        <Hidden smUp>
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
          </Box>
        </Hidden>
      </Container>
    </Box>
  );
};

export default Footer;
