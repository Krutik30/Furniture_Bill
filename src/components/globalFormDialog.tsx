import { Box, Button, Dialog, Stack } from "@mui/material";
import { useRecoilState } from "recoil";
import { globalFormPopupState } from "../utils/recoil_state";
import { Fragment } from "react";
import SvgIconStyle from "./SvgIconStyle";

const GlobalFormDialog = () => {
    const [globalFormPopup, setGlobalFormPopup] = useRecoilState(globalFormPopupState);
    
    return (
        <Fragment>
            {globalFormPopup?.map((popupComponent)=>(
                <Dialog maxWidth='xl' open={Boolean(popupComponent)} onClose={() => setGlobalFormPopup(globalFormPopup.filter(popup=>popup.type!==popupComponent.type))}>
                    <Stack  flexDirection={'row'} sx={{justifyContent: "flex-end"}} >
                        <Button onClick={()=>setGlobalFormPopup(globalFormPopup.filter(popup=>popup.type!==popupComponent.type))}>
                            <SvgIconStyle iconFileName={'close-fill'} sx={{ color: 'text.disabled', width: 30,height:30}} />
                        </Button>
                    </Stack>
                    <Box>
                        {popupComponent?.component}
                    </Box>
                </Dialog>
            ))}
        </Fragment>
        // globalFormPopup?.component
            // ?   
        //     : null
        
        
    )
};

export default GlobalFormDialog;