import { Button, Dialog, Stack, Typography } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import DeleteButton from './DeleteButton';
import { TextFieldElement } from 'react-hook-form-mui';


// ----------------------------------------------------------------------

function VariationsDialog({
    onClose,
    productIndex,
    primaryFieldName
}:any) {
    
    const { control, getValues, setValue } = useFormContext();

    const { fields: breakdownFields, append: breakdownAppend, remove: breakdownRemove } = useFieldArray({
        control,
        name: `${primaryFieldName}[${productIndex}].product_variations_breakdown`,
    });


    const handleAppend = () => {
        const lastEntry = getValues(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${breakdownFields.length-1}]`);
        breakdownAppend({
            ...lastEntry,
            variation_name: ''
        });
    }
    
    return (
        <Dialog 
            fullWidth 
            maxWidth="md" 
            open={true} 
            onClose={onClose}
            PaperProps={{ sx: { position: "fixed", top: 5, width:"95%", pb:2 } }}
        >
            <Typography variant="h6" sx={{px:1, pt:1}}> Product Details </Typography>
            {breakdownFields?.map((item,index)=>{
                return(
                    <Stack key={index} spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2.5, px: 1 }}>
                        
                        <DeleteButton
                            clickFunction={breakdownRemove}
                            input={index}
                            forceDelete={true}
                        />
                        <TextFieldElement
                            name={`${primaryFieldName}[${productIndex}].product_variations_breakdown[${index}].variation_name`}
                            label={"Name"}
                            size="small"
                            onChange={(e: any) => {
                                setValue(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${index}].variation_name`, e.target.value);
                                
                                // copy the last variation_quantity & price if the name is edited.
                                if (index=== (breakdownFields.length-1) && index !== 0) {
                                    setValue(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${index}].variation_quantity`, 
                                        getValues(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${index-1}].variation_quantity`)
                                    );
                                    setValue(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${index}].variation_price`,
                                        getValues(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${index-1}].variation_price`)
                                    );
                                    breakdownAppend({});
                                }
                            }}
                        />
                        <TextFieldElement
                            name={`${primaryFieldName}[${productIndex}].product_variations_breakdown[${index}].variation_quantity`}
                            label={"Qty"}
                            size="small"
                            type="number"
                            onClick={()=>setValue(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${index}].variation_quantity`, "")}
                            onChange={(e) => {
                                for (let i = index; i < breakdownFields.length; i++) {
                                    // dont copy the entry to the last row, if the name field of last row is blank.
                                    if ((i === breakdownFields.length - 1) && !getValues(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${i}].variation_name`)) {
                                        return;
                                    } 
                                    else {
                                        setValue(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${i}].variation_quantity`, e.target.value);
                                    }
                                }
                            }}
                        />
                        <TextFieldElement
                            name={`${primaryFieldName}[${productIndex}].product_variations_breakdown[${index}].variation_price`}
                            label={"Price"}
                            size="small"
                            type="number"
                            onClick={()=>setValue(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${index}].variation_price`, "")}
                            onChange={(e: any) => {
                                for (let i = index; i < breakdownFields.length; i++) {
                                    // dont copy the entry to the last row, if the name field of last row is blank.
                                    if ((i === breakdownFields.length - 1) && !getValues(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${i}].variation_name`)) {
                                        return;
                                    } 
                                    else {
                                        setValue(`${primaryFieldName}[${productIndex}].product_variations_breakdown[${i}].variation_price`, e.target.value);
                                    }
                                }
                            }}
                        />
                    </Stack>
                )
            })}
            

            <Stack spacing={2} direction={'row'} sx={{ justifyContent:"center", width:"100%" }}>
            <Button
                onClick={handleAppend}
                // variant="contained"
                size="small"
                sx={{mb:1}}
                >
                    Add size
                </Button>
                <Button
                onClick={onClose}
                variant="contained"
                size="small"
                
                >
                    Ok
                </Button>
            </Stack>
        </Dialog>
    )
}

export default VariationsDialog