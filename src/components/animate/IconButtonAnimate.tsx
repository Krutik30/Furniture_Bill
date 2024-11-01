import { m } from 'framer-motion';
import { MouseEventHandler, PropsWithChildren } from 'react';
// @mui
import { Box, IconButton } from '@mui/material';

// ----------------------------------------------------------------------


type propTypes = {
    color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error',
    onClick: MouseEventHandler<HTMLButtonElement>,
    size?: 'small' | 'medium' | 'large'
};

const IconButtonAnimate = ({ children, size = 'medium', ...other }: PropsWithChildren<propTypes>) => (
  <AnimateWrap size={size}>
    <IconButton size={size} {...other}>
      {children}
    </IconButton>
  </AnimateWrap>
);

export default IconButtonAnimate;

// ----------------------------------------------------------------------

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
};

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 }
};

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 }
};

type animateWrapType = {
  size: 'small' | 'medium' | 'large'
};

function AnimateWrap({ size, children }: PropsWithChildren<animateWrapType>) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <Box
      component={m.div}
      whileTap="tap"
      whileHover="hover"
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: 'inline-flex'
      }}
    >
      {children}
    </Box>
  );
}
