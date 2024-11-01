import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Link, Typography } from '@mui/material';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }: any) {
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <Link 
      underline="none" 
      color="inherit" 
      component={RouterLink} 
      to='/user'
    >
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        
        <Avatar src={user.image || ''} alt="photoURL" />
        <Box
          sx={{
            ml: 2,
            overflow: "hidden",
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {user?.name}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
