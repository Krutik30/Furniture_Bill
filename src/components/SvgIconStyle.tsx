import { Box, SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------

type inputProps = {
    iconFileName: string,
    sx?: SxProps<Theme>
}
export default function SvgIconStyle({ iconFileName, sx }: inputProps) {
  const src = `/icons/${iconFileName}.svg`;
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  );
}
