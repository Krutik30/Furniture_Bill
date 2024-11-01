import { Alert, Button, FormControlLabel, IconButton, Stack, Switch } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import SvgIconStyle from "../SvgIconStyle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

export type rhfSubmitButtonProps = {
    actionType?: 'edit' | 'add-new' | 'copy',
    buttonLabel?: 'login' | string,
    pdfNavigateLink?: string,
};

export const RhfSubmitButton = ({actionType, buttonLabel, pdfNavigateLink, ...props}: rhfSubmitButtonProps) => {
    const isDesktop = useResponsive('up', 'md');
    const navigate = useNavigate();
    const [allowEditToggle,setAllowEditToggle] = useState(false);
    const { formState: { errors, isDirty, isSubmitting } } = useFormContext();

    return (
      <Stack
        alignSelf='flex-end'
      >
        {!!errors.root?.message && 
          <Alert severity="error">{(errors.root?.message)||''}</Alert>
        }
        <Stack
            justifyContent='flex-end'
            direction='row'
            spacing={2}
            sx={{ mt:3 }}
        >
            {actionType === 'edit' && pdfNavigateLink && (
                isDesktop
                    ?   <Button
                            variant="outlined"
                            startIcon={<SvgIconStyle iconFileName="fill-type-pdf2"/>}
                            onClick={() => navigate(pdfNavigateLink)}
                        >
                            {(isDesktop) ? 'View PDF' : null}
                        </Button>
                    :   <IconButton
                            onClick={() => navigate(pdfNavigateLink)}
                            sx={{color: '#2065D1', p:0}}
                        >
                            <SvgIconStyle iconFileName="fill-type-pdf2" sx={{width:30, height:30}} />
                        </IconButton>
            )}
            {actionType === 'edit' &&
                <FormControlLabel
                    control={
                        <Switch
                            size="medium"
                            checked={allowEditToggle}
                            onChange={()=>setAllowEditToggle(!allowEditToggle)}
                        />
                    }
                    disabled={!isDirty}
                    label='Edit'
                />
            }
            <LoadingButton
                size='large'
                type='submit'
                variant='contained'
                disabled={!isDirty || (actionType === 'edit' && !allowEditToggle)}
                loading={isSubmitting}
                {...props}
            >
                {buttonLabel || (actionType === 'edit' ? 'Save' : 'Create')}
            </LoadingButton>
        </Stack>
      </Stack>
    )
}