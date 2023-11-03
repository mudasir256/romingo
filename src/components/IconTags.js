import { Box, Typography } from '@mui/material';

import PetsIcon from '@mui/icons-material/Pets';
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function IconTags() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      mt: '1.5rem', 
      gap: '1.5rem',
      flexDirection: { xs: 'column', sm: 'column', md: 'row' }
    }}>
      <Box sx={{ maxWidth: '300px' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant='h6'>
          <PetsIcon />
          &nbsp;&nbsp;Pet-friendly
        </Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          Our team has hand-selected the best pet-friendly hotels and vacation rentals in the US for you to book with Romingo.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: '300px' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant='h6'><PaidIcon />&nbsp;&nbsp;Lowest rates</Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          Romingo builds relationships with each of our partners to offer you the lowest rates and $0 booking fees.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: '300px' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant='h6'>
          <CheckCircleIcon />
          &nbsp;&nbsp;Accurate & transparent
        </Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          Our pet policies are accurate, transparent, and crystal clear. Book with Romingo for a hassle-free and enjoyable pet-friendly trip.
        </Typography>
      </Box>
    </Box>
  )
}