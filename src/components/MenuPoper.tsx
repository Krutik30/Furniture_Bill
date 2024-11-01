import { styled } from '@mui/material/styles';
import { Popover, PopoverVirtualElement, SxProps, useTheme } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

const ArrowStyle = styled('span')(({ arrow }: {arrow: string }) => {

  const theme = useTheme();
  const SIZE = 12;

  const POSITION = -(SIZE / 2);

  const borderStyle = `solid 1px ${theme.palette.grey}`;

  const topStyle = {
    borderRadius: '0 0 3px 0',
    top: POSITION,
    borderBottom: borderStyle,
    borderRight: borderStyle,
  };
  const bottomStyle = {
    borderRadius: '3px 0 0 0',
    bottom: POSITION,
    borderTop: borderStyle,
    borderLeft: borderStyle,
  };
  const leftStyle = {
    borderRadius: '0 3px 0 0',
    left: POSITION,
    borderTop: borderStyle,
    borderRight: borderStyle,
  };
  const rightStyle = {
    borderRadius: '0 0 0 3px',
    right: POSITION,
    borderBottom: borderStyle,
    borderLeft: borderStyle,
  };

  return {
    [theme.breakpoints.up('sm')]: {
      zIndex: 1,
      width: SIZE,
      height: SIZE,
      content: "''",
      position: 'absolute',

      transform: 'rotate(-135deg)',
      background: theme.palette.background.paper,
    },
    // Top
    ...(arrow === 'top-left' && { ...topStyle, left: 20 }),
    ...(arrow === 'top-center' && { ...topStyle, left: 0, right: 0, margin: 'auto' }),
    ...(arrow === 'top-right' && { ...topStyle, right: 20 }),
    // Bottom
    ...(arrow === 'bottom-left' && { ...bottomStyle, left: 20 }),
    ...(arrow === 'bottom-center' && { ...bottomStyle, left: 0, right: 0, margin: 'auto' }),
    ...(arrow === 'bottom-right' && { ...bottomStyle, right: 20 }),
    // Left
    ...(arrow === 'left-top' && { ...leftStyle, top: 20 }),
    ...(arrow === 'left-center' && { ...leftStyle, top: 0, bottom: 0, margin: 'auto' }),
    ...(arrow === 'left-bottom' && { ...leftStyle, bottom: 20 }),
    // Right
    ...(arrow === 'right-top' && { ...rightStyle, top: 20 }),
    ...(arrow === 'right-center' && { ...rightStyle, top: 0, bottom: 0, margin: 'auto' }),
    ...(arrow === 'right-bottom' && { ...rightStyle, bottom: 20 }),
  };
});

// ----------------------------------------------------------------------

// MenuPopover.propTypes = {
//   sx: PropTypes.object,
//   children: PropTypes.node,
//   disabledArrow: PropTypes.bool,
//   open: PropTypes.bool,
//   anchorEl: PropTypes.any,
//   onClose: PropTypes.func,
//   anchorOrigin: PropTypes.any,
//   transformOrigin: PropTypes.any,
//   arrow: PropTypes.oneOf([
//     'top-left',
//     'top-center',
//     'top-right',
//     'bottom-left',
//     'bottom-center',
//     'bottom-right',
//     'left-top',
//     'left-center',
//     'left-bottom',
//     'right-top',
//     'right-center',
//     'right-bottom',
//   ]),
// };

type MenuPopoverType = {
    open: boolean,
    anchorEl: (() => PopoverVirtualElement) | undefined,
    children: ReactNode,
    arrow: string,
    disabledArrow: boolean,
    sx: SxProps,

}

export default function MenuPopover({ open, anchorEl, children, arrow = 'top-right', disabledArrow, sx, ...other }: MenuPopoverType) {

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: 'inherit',
          ...sx,
        },
      }}
      {...other}
    >
      {!disabledArrow && <ArrowStyle arrow={arrow} />}

      {children}
    </Popover>
  );
}
