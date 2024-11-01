

import { Box, CircularProgress, DialogActions, IconButton, Stack, Tooltip, Typography, Dialog } from '@mui/material';
import React from 'react'
import SvgIconStyle from './SvgIconStyle';
import { BlobProvider, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import useToggle from '../hooks/useToggle';

function DocViewToolbar({ pdfComponent,voucherType,fileName,handleEdit}:any) {
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const { toggle: open, onOpen, onClose } = useToggle();
    const handleShareClick = async (blob:any, url:any, error:any) => {
        const docBlob = blob;
        console.log(docBlob, url, error);
        if (blob) {
            
            const file = new File([docBlob], `${fileName}.pdf`, {type: 'application/pdf'});
            const filesArray = [file];
            if(navigator.canShare && navigator.canShare({ files: filesArray })) {
                console.log("Inside navigator sharing");
                navigator.share({
                text: fileName,
                files: filesArray,
                title: fileName,
                url: "https://smartagent.one"
                });
            }
        } else {
            alert(`${url} --- ${error}`);
        }
    }
    
  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1}>
          
          {handleEdit &&
            <Typography variant="subtitle2" color='#212B36' onClick={handleEdit}>
            <Tooltip title="Edit">
              <IconButton>
                <SvgIconStyle iconFileName={'edit-fill'} />
              </IconButton>
            </Tooltip>Edit
            </Typography>
          }

          <PDFDownloadLink
            document={pdfComponent}
            fileName={fileName}
            style={{ textDecoration: 'none' }}
          >
              {({ loading }: any) => (
                <Typography variant="subtitle2" color='#212B36'>
                <Tooltip title="Download">
                  <IconButton>                    
                    {loading ? <CircularProgress size={24} color="inherit" /> : <SvgIconStyle iconFileName={'download-fill'} />}
                  </IconButton>
                </Tooltip>Download
                </Typography>
              )}
          </PDFDownloadLink>
            
          {isMobile &&
            <Tooltip title="Share">
              <BlobProvider
                document={pdfComponent}
                
              >
                {({ blob, url, loading, error }) => {
                  return (
                    <Typography variant="subtitle2" color='#212B36'>
                    <IconButton onClick={() => handleShareClick(blob,url, error)}>
                      <SvgIconStyle iconFileName={'share-fill'} />
                    </IconButton>Share</Typography>
                  )
                }}
              </BlobProvider>
            </Tooltip>
          }
        </Stack>

      </Stack>

        {/* eslint-disable-next-line  */}
      {/* @ts-ignore */}
      <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme: any) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={onClose}>
                <SvgIconStyle iconFileName={'close-fill'} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              {pdfComponent}
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

export default DocViewToolbar