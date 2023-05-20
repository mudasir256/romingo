import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const HighlightBox = ({ title, highlights }) => (
  <Box>
    <Typography variant='base'>{title}</Typography>
    <List>
      {highlights.map((highlight, index) => (
        <ListItem sx={{ padding: '0 8px' }} key={index}>
          <FiberManualRecordIcon sx={{ marginRight: '8px', fontSize: '8px' }} />
          <ListItemText primary={highlight} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default HighlightBox;