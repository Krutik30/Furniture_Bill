import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
import { varBounce } from './animate/variants';
import PageNotFoundIllustration from '../assets/illustration_404';
// components
// assets

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
  }));
  
  
  
  // ----------------------------------------------------------------------
  

function NoView() {
  return (
    <RootStyle>
    <Container>
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Sorry, Details not found!
          </Typography>
        </m.div>
        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the data you’re looking for. Perhaps you’ve mistyped the Serial Number? Be sure to check
          your spelling.
        </Typography>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button to="/" size="large" variant="contained" component={RouterLink}>
          Go to Home
        </Button>
      </Box>
    </Container>
  </RootStyle>
  )
}

export default NoView