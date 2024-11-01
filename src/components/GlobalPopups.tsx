import { Button, Dialog, DialogActions, DialogContent,Typography, DialogTitle, Divider, Stack } from '@mui/material';
import { useRecoilState } from "recoil";
import { globalAlertPopupState } from '../utils/recoil_state';

export const GlobalPopups = () => {
    const [ globalAlertPopup, setGlobalAlertPopup ] = useRecoilState(globalAlertPopupState);
    
    return (
        
            <Dialog
                // ?? operator returns the right hand field when lefthand is null or undefined
                open={!!(globalAlertPopup ?? false)}
                onClose={() => {
                    setGlobalAlertPopup(null);
                    globalAlertPopup?.onClose && globalAlertPopup?.onClose();
                }}
                aria-labelledby={globalAlertPopup?.title}
                aria-describedby={globalAlertPopup?.content}
                PaperProps={{ sx: { width: "30%", background:"#f0f2b3" } }}
            >
                {globalAlertPopup?.title && 
                    <DialogTitle>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{}}>
                            <Typography variant='h3'>
                            ⚠️
                            </Typography>
                            <Typography variant='h5' >
                                {globalAlertPopup.title}
                            </Typography>
                            <Typography variant='h3'>
                            ⚠️
                            </Typography>
                        </Stack>
                       
                    </DialogTitle>
                }
                <Divider/>
                {globalAlertPopup?.content &&
                    <DialogContent>
                        {globalAlertPopup.content}
                    </DialogContent>
                }
                <DialogActions>
                    {globalAlertPopup?.onDisagree &&
                        <Button onClick={() => {
                                setGlobalAlertPopup(null);
                                globalAlertPopup.onDisagree && globalAlertPopup.onDisagree();
                            }}
                        color="error"
                    
                        > Cancel </Button>
                    }
                    <Button onClick={() => {
                            setGlobalAlertPopup(null);
                            globalAlertPopup?.onAgree();
                        }}
                        
                    > 
                        OK 
                    </Button>
                    
                </DialogActions>
            </Dialog>
 
    )
}