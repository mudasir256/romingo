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
      gap: '1rem',
      flexDirection: { xs: 'column', sm: 'column', md: 'row' }
    }}>
      <Box sx={{ maxWidth: '290px' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }} variant='h6'>
          <PetsIcon />
          &nbsp;Pet-friendly guarantee
        </Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          Our team hand-selects hotel partners that offer a warm and welcoming stay for your four-legged friends.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: '296px', mx: '0rem' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }} variant='h6'> <CheckCircleIcon />&nbsp;Accurate pet policies</Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          Experience enjoyable and stress-free travels with your pets with our accurate and verified hotel pet policies.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: '240px' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }} variant='h6'>
          <PaidIcon />
          &nbsp;Lowest rates
        </Typography>
        <Typography sx={{ fontSize: '0.9em' }}>
          Unlike other sites, Romingo negotiates the lowest hotel rates, allowing you to travel with your pets without breaking the bank.
        </Typography>
      </Box>
    </Box>
  )
}