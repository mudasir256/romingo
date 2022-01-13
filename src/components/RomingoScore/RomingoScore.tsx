import { FC, useState, MouseEvent } from "react";
import Star from "@mui/icons-material/Star";
import PetsIcon from "@mui/icons-material/Pets";
import { ListItemText, ListItemIcon, ListItem, List, Divider, Popover, Box, Typography, Grid } from '@mui/material'

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
      <Star sx={{ color: "warning.main", fontSize: "90%", mt: -0.3 }} />
    </Box>
  ) : (
    <Box onClick={e => e.stopPropagation()} sx={{ display: "flex", minWidth: 0, alignItems: "center", mr: {sm: '0rem', xs: 'auto'}, ml:{ sm: 'auto', xs: '0px' } }}>
      <Grid container>
        <Grid item xs={12} sx={{ textAlign: { sm: 'right', xs: 'left' } }}>
          <Typography variant="h6" sx={{ color: "warning.main", mr: {sm: '0rem', xs: 'auto'}, ml:{ sm: 'auto', xs: '0px' }}}>
            {score} {new Array(Math.round(score)).fill(undefined).map((item) => <Star key={item} sx={{ color: "warning.main", fontSize: '1rem', mt: -0.2, mr: '.25rem' }} />)}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ ml: 'auto', textAlign: { sm: 'right', xs: 'left' }}}>
          <Typography onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} variant="body1" sx={{ mt: 0.1, color: "text.secondary", textDecoration: "underline", fontSize: '.9rem', cursor: 'pointer'}}>
          Romingo Score
          </Typography>
        </Grid>
      </Grid>


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
