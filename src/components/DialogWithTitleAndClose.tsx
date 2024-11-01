import { Dialog, DialogProps, DialogTitle, IconButton, Stack } from "@mui/material"
import { PropsWithChildren } from "react"
import SvgIconStyle from "./SvgIconStyle"

type inputProps = DialogProps & {
    onClose: () => void
    title?: string
}

export const DialogWithTitleAndClose = ({children, onClose, title, ...props}: PropsWithChildren<inputProps>) => {
    return (
        <Dialog
            fullWidth
            maxWidth='lg'
            onClose={onClose}
            {...props}
        >

            <Stack
                direction='row'
                width={1}
                justifyContent='space-between'
            >
                <DialogTitle>
                    {title}    
                </DialogTitle>
                <IconButton onClick={onClose}>
                    <SvgIconStyle iconFileName='cross-2' />
                </IconButton>   
            </Stack>
            {children}
        </Dialog>
    )
}