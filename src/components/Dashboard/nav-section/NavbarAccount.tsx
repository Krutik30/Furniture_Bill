import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Link, Typography } from '@mui/material';
// hooks
// import useAuth from '../../hooks/useAuth';
// routes
import { sessionOgCompanyCache, userObjectCache } from '../../../utils/localCacheAPI';


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
  
  const userObj = userObjectCache.getItem();
//   console.log("=-=-=--=-=-=-=-=-ogdata==-=-=-=-=-=-")
//   console.log(userData)
  const sessionOgCompanyData = sessionOgCompanyCache.getItem();
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
        
        <Avatar src={sessionOgCompanyData?.logo_url||''} alt="photoURL" />
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
          <Typography variant="subtitle2" noWrap>
            {/* {ogData?.groupDetails?.groupName} */}
            {sessionOgCompanyData?.ownercompany_name || "Loading..."} 
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {userObj?.user_name}
          </Typography>
            {/* financial year */}
          <Typography variant="body2" noWrap sx={{ color: 'text.primary' }}>
            FY: 2324
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
