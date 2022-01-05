import { FC, useState, MouseEvent } from "react";
import Typography from "@mui/material/Typography";
import Star from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PetsIcon from "@mui/icons-material/Pets";

interface Props {
  score: number;

  sm?: boolean;
}

const RomingoScore: FC<Props> = ({ score, sm = false }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return sm ? (
    <Box sx={{ display: "flex", minWidth: 0, alignItems: "center", }}>
      <Typography variant="h6" sx={{ color: "warning.main", fontSize: "100%", }}>
        {score}
      </Typography>
      <PetsIcon sx={{ color: "warning.main", fontSize: "90%", mt: -0.3 }} />
    </Box>
  ) : (
    <Box sx={{ display: "flex", minWidth: 0, alignItems: "center", }}>

      <PetsIcon sx={{ color: "warning.main", fontSize: '1rem', mt: -0.2, mr: '.5rem' }} />
      <Typography variant="h6" sx={{ color: "warning.main", }}>
        {score}
      </Typography>
      <br />
      <Typography onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} variant="body1" sx={{ ml: 0.75, mt: 0.2, color: "text.secondary", textDecoration: "underline", fontSize: '.9rem', cursor: 'pointer'}}>
        Romingo Score
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box sx={{ p: 1, pb: 0, maxWidth: "350px" }}>
          <Typography
            sx={{
              fontSize: "80%",
              color: "text.secondary",
              textAlign: "center",
              mb: 0.2,
            }}
          >
            How is the Romingo Score calculated?
          </Typography>
          <Divider />
          <Box sx={{ fontSize: "80%", mt: 0.3 }}>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PetsIcon sx={{ fontSize: "100%", mr: 0.5, mt: 0.8 }} />
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "100%" }}
                    primary="In-house pet amenities"
                  />
                </ListItemIcon>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PetsIcon sx={{ fontSize: "100%", mr: 0.5, mt: 0.8 }} />
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "100%" }}
                    primary="Pet-friendly city score"
                  />
                </ListItemIcon>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PetsIcon sx={{ fontSize: "100%", mr: 0.5, mt: 0.8 }} />
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "100%" }}
                    primary="Nearby dog parks or beaches"
                  />
                </ListItemIcon>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PetsIcon sx={{ fontSize: "100%", mr: 0.5, mt: 0.8 }} />
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "100%" }}
                    primary="Nearby pet-friendly restaurants"
                  />
                </ListItemIcon>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default RomingoScore;
