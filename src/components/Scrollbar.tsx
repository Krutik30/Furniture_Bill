// import SimpleBarReact from 'simplebar-react';
// @mui
// import { alpha, styled } from '@mui/material/styles';

import { Box, SxProps } from '@mui/material';
import { PropsWithChildren } from 'react';

// ----------------------------------------------------------------------

// const RootStyle = styled('div')(() => ({
//   flexGrow: 1,
//   height: '100%',
//   overflow: 'hidden',
// }));

// const SimpleBarStyle = styled(
//   Box
//   // SimpleBarReact
// )(({ theme }) => ({
//   maxHeight: '100%',
//   '& .simplebar-scrollbar': {
//     '&:before': {
//       backgroundColor: alpha(theme.palette.grey[600], 0.48),
//     },
//     '&.simplebar-visible:before': {
//       opacity: 1,
//     },
//   },
//   '& .simplebar-track.simplebar-vertical': {
//     width: 10,
//   },
//   '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
//     height: 6,
//   },
//   '& .simplebar-mask': {
//     zIndex: 'inherit',
//   },
// }));

// ----------------------------------------------------------------------

type ScrollbarPropTypes = {
  sx: SxProps,
};

export default function Scrollbar({ children, sx, ...other }: PropsWithChildren<ScrollbarPropTypes>) {

  // if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  // }

  // return (
  //   <RootStyle>
  //     <SimpleBarStyle timeout={500} 
  //       // clickOnTrack={false} 
  //       sx={sx} 
  //       {...other}
  //       >
  //       {children}
  //     </SimpleBarStyle>
  //   </RootStyle>
  // );
}
