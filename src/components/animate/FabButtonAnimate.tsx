import { m } from 'framer-motion';
import { ForwardedRef, PropsWithChildren, forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Fab, SxProps } from '@mui/material';

// ----------------------------------------------------------------------


type propTypes = {
    color: 'inherit' | 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error',
    size: 'small' | 'medium' | 'large',
    sx: SxProps,
    sxWrap: SxProps
};

const FabButtonAnimate = forwardRef(({ color = 'primary', size = 'large', children, sx, sxWrap, ...other }: PropsWithChildren<propTypes>, ref) => {
  const theme: any = useTheme();

  if (color === 'default' || color === 'inherit' || color === 'primary' || color === 'secondary') {
    return (
      <AnimateWrap ref={ref} size={size} sxWrap={sxWrap}>
        <Fab size={size} color={color} sx={sx} {...other}>
          {children}
        </Fab>
      </AnimateWrap>
    );
  }

  return (
    <AnimateWrap ref={ref} size={size} sxWrap={sxWrap}>
      <Fab
        size={size}
        sx={{
          boxShadow: theme.customShadows[color],
          color: theme.palette[color].contrastText,
          bgcolor: theme.palette[color].main,
          '&:hover': {
            bgcolor: theme.palette[color].dark
          },
          ...sx
        }}
        {...other}
      >
        {children}
      </Fab>
    </AnimateWrap>
  );
});

export default FabButtonAnimate;

// ----------------------------------------------------------------------

const varSmall = {
  hover: { scale: 1.07 },
  tap: { scale: 0.97 }
};

const varMedium = {
  hover: { scale: 1.06 },
  tap: { scale: 0.98 }
};

const varLarge = {
  hover: { scale: 1.05 },
  tap: { scale: 0.99 }
};

type AnimateWrapType = {
  ref: ForwardedRef<unknown>,
  size: 'small' | 'medium' | 'large',
  sxWrap: SxProps
};

function AnimateWrap({ ref, size, children, sxWrap }: PropsWithChildren<AnimateWrapType>) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <Box
      component={m.div}
      ref={ref} 
      whileTap="tap"
      whileHover="hover"
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: 'inline-flex',
        ...sxWrap
      }}
    >
      {children}
    </Box>
  );
}
