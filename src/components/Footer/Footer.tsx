import Box from "@material-ui/core/Box";
import { FC } from "react";
import { CSSObject } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import IconButton from '@material-ui/core/IconButton';
import Hidden from "@material-ui/core/Hidden";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

interface Props {
  sx?: CSSObject;
  footerMenus: {
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
  }
}

const Footer: FC<Props> = ({ sx, footerMenus }) => {
  return (
    <Box
      sx={{
        pt: 3,
        backgroundColor: "#F7F7F7"
      }}
    >
      <Container maxWidth="lg">
        <Grid container sx={{borderBottom: "1px solid #DDDDDD"}}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary"
              }}
            >
              About Us
            </Typography>
            <List>
              {footerMenus.about.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{pl: 0}}>
                    <Link href={menu.link}>
                      {menu.text}
                    </Link>
                  </ListItem>
                )
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary"
              }}
            >
              Contact Us
            </Typography>
            <List>
              {footerMenus.contact.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{pl: 0}}>
                    <Link href={menu.link}>
                      {menu.text}
                    </Link>
                  </ListItem>
                )
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary"
              }}
            >
              Blog
            </Typography>
            <List>
              {footerMenus.blog.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{pl: 0}}>
                    <Link href={menu.link}>
                      {menu.text}
                    </Link>
                  </ListItem>
                )
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "text.primary"
              }}
            >
              Sitemap
            </Typography>
            <List>
              {footerMenus.sitemap.map((menu, key) => {
                return (
                  <ListItem key={key} sx={{pl: 0}}>
                    <Link href={menu.link}>
                      {menu.text}
                    </Link>
                  </ListItem>
                )
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
            py: 1
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "light",
              mr: 1
            }}
          >
            © {new Date().getFullYear()} Airbnb, Inc.
          </Typography>
          <Link 
            href="#"
            sx={{
              mr: 1
            }}
          >
            Privacy
          </Link>
          <Link href="#">
            Terms
          </Link>
        </Box>
        <Hidden smUp>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <IconButton edge="start" sx={{mr: 1, color: "black"}} aria-label="menu" href="https://www.facebook.com/RomingoTravel" target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton edge="start" sx={{mr: 1, color: "black"}} aria-label="menu" href="https://www.instagram.com/romingotravel" target="_blank">
              <InstagramIcon />
            </IconButton>
            <IconButton edge="start" sx={{mr: 1, color: "black"}} aria-label="menu" href="https://twitter.com/RomingoTravel" target="_blank">
              <TwitterIcon />
            </IconButton>
          </Box>
        </Hidden>
      </Container>
    </Box>
  );
};

export default Footer;
