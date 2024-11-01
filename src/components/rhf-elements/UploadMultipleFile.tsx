//TODO : IMPORTED FROM SMART-AGENT MOVE FILE TO PACKAGE FOLDER
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// @mui
// import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import RejectionFiles from './RejectionFiles';
import MultiFilePreview from './MultipleFilePreview';

// ----------------------------------------------------------------------

// const DropZoneStyle = styled('div')(({ theme }: any) => ({
//   outline: 'none',
//   padding: theme.spacing(5, 1),
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: theme.palette.background.neutral,
//   border: `1px dashed ${theme.palette.grey[500_32]}`,
//   '&:hover': { opacity: 0.72, cursor: 'pointer' },
// }));

// ----------------------------------------------------------------------

UploadMultiFile.propTypes = {
  error: PropTypes.bool,
  showPreview: PropTypes.bool,
  files: PropTypes.array,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function UploadMultiFile({
  showPreview = false,
  files,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  ...other
}: any) {
  const { getInputProps, fileRejections, open } = useDropzone({
    multiple: true,
    ...other,
  });
  // console.log({files});
  return (
    <Box sx={{ width: '100%', ...sx }}>

        <input {...getInputProps()} />

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
        {/* {console.log(files)} */}
      <MultiFilePreview files={files} showPreview={showPreview} onRemove={onRemove} onRemoveAll={onRemoveAll} open={open} />

      {helperText && helperText}
    </Box>
  );
}
