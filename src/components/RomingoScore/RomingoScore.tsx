import { FC, useState, MouseEvent } from "react";
import Typography from "@material-ui/core/Typography";
import Star from "@material-ui/icons/Star";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PetsIcon from "@material-ui/icons/Pets";

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
    <Box
      sx={{
        display: "flex",
        minWidth: 0,
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "warning.main",
          fontSize: "100%",
        }}
      >
        {score}
      </Typography>
      <PetsIcon sx={{ color: "warning.main", fontSize: "90%", mt: -0.3 }} />
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        minWidth: 0,
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "warning.main",
        }}
      >
        {score}
      </Typography>
      <PetsIcon sx={{ color: "warning.main", fontSize: "110%", mt: -0.2 }} />
      <Typography
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="body1"
        sx={{
          ml: 0.75,
          mt: 0.2,
          color: "text.secondary",
          textDecoration: "underline",
        }}
      >
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
                    primary="Dog-friendly city score"
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
                    primary="Nearby dog-friendly restaurants"
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
