import { Button, CircularProgress, InputAdornment, Stack } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Label from "./Label";
import { FormTextField } from "rhf-custom-components";
import { customFetch } from "../utils/customFetch";
import { sessionOgCompanyCache } from "../utils/localCacheAPI";

const SerialNumberTextField = ({ actionType, disabled = false, name, docType }: { actionType: string, disabled?: boolean, name: string, docType: string }) => {

    const [serialQueryStatus, setSerialQueryStatus] = useState("fetching");
    const { control, getValues, setValue } = useFormContext();

    const sessionOgCompany = sessionOgCompanyCache.getItem()


    const [order_id, ownercompany_short_name] = useWatch({
        control: control,
        name: ['againstOrder.id', 'sessionOgCompany.ownercompany_short_name']
    });

    // const setIdForOffline = () => {
    //     const daysDifference = differenceInCalendarDays(new Date(), new Date("2023-04-01")) + 100;

    //     // the fourth char needs to br string to act as a differentiator.
    //     const serial_number = `${daysDifference}${stringForOrderForm()}${uid(2)}`;
    //     // console.log(serial_number)
    //     setValue(name, serial_number);
    //     const id = `${ownercompany_id}` + `${serial_number}`;
    //     setValue('id', id);
    //     setIdInChildTables(id);
    //     alert(`you are offline!, giving you offline ${docType} number`);
    //     setSerialQueryStatus("completed")
    // };

    // const setIdInChildTables = (id: number | string) => {
    //     if (docType === "invoice") {
    //         id = Number(id);
    //         const products = getValues("products") || [];
    //         products.forEach((_prodObj: any, i: number) => {
    //             // console.log({prodObj, i});
    //             setValue(`products[${i}].invoice_id`, id);
    //         });

    //         const deliveryDetails = getValues("delivery_details") || [];
    //         deliveryDetails.forEach((_deliveryObj: any, i: number) => {
    //             setValue(`delivery_details[${i}].invoice_id`, id);
    //         })
    //     }
    //     else if (docType === "order") {
    //         const products = getValues("products") || [];
    //         products.forEach((_prodObj: any, i: number) => {
    //             setValue(`products[${i}].order_id`, id);
    //         });
    //     }
    //     else if (docType === 'payment') {
    //         id = Number(id);
    //         const paymentObj: any = getValues();
    //         // console.log({id});
    //         paymentObj.againstinvoices = paymentObj.againstinvoices.map((obj: any) => ({
    //             ...obj,
    //             payment_id: id
    //         }));
    //         paymentObj.chequedetails = paymentObj.chequedetails?.map((obj: any) => ({
    //             ...obj,
    //             payment_id: id
    //         }));
    //         paymentObj.grdeliverydetails = paymentObj.grdeliverydetails?.map((obj: any) => ({
    //             ...obj,
    //             payment_id: id
    //         }));
    //         // console.log({paymentObj});
    //         reset(paymentObj);
    //     }
    //     else if (docType === 'commbill') {
    //         id = Number(id);
    //         const row_item_details = getValues('row_item_details');
    //         row_item_details?.forEach((_rowItem: any, i: number) => {
    //             setValue(`row_item_details[${i}].commbill_id`, id);
    //         });
    //     }

    // };

    const duplicateSerialNumberCheck = (userInput: number) => {
        // const id = getVoucherId(ownercompany_id, userInput);
        setValue("id", '');
        // console.log("duplicate check:", {id});
        // if (actionType !== "edit") {
        //     customFetch(`/api/uniqueSerialNumberCheck/${docType}/${id}`)
        //         .then((checkRes: any) => {
        //             // console.log({checkRes});
        //             if (checkRes.unique) {
        //                 setValue("id", id);
        //                 setIdInChildTables(id);
        //             } else {
        //                 throw new Error("Duplicate Id");
        //             }
        //         })
        //         .catch((error: any) => {
        //             console.error(error);
        //             setSerialQueryStatus("error")
        //             setNewSerialNumber();
        //         })
        // }
    };

    const setNewSerialNumber = () => {
        customFetch(`/v1/utils/getSerialNumber/order/${sessionOgCompany.ownercompany_short_name}/2324`).then((data)=>{
            if(data.payload.serial_number !== null){
                const daily_order_number = data.payload.serial_number;
                const voucherNumber = data.payload.days_difference + "A" + `${daily_order_number}`.padStart(2,"0"); 
                setValue('daily_order_number', daily_order_number);
                setValue("voucher_number", voucherNumber);
                setSerialQueryStatus("completed");
            }
        })
    };
    // useEffect(()=>{
    //     setNewSerialNumber()
    // },[])

    useEffect(() => {
        // console.log("useEffect serialnumber");
        // console.log({ownercompany_id});
        if (!sessionOgCompany.ownercompany_short_name) {
            setSerialQueryStatus("error");
        } else if (actionType === "edit") {
            setSerialQueryStatus("completed");
        } else {
            // console.log({serialQueryStatus});
            setSerialQueryStatus("fetching");
            setNewSerialNumber();
        }
        setSerialQueryStatus('edit')
    }, [order_id, sessionOgCompany.ownercompany_short_name]);

    const ownercompany = getValues('ownercompany');
    const status = getValues('status') || "Pending";

    return (
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <FormTextField
                disabled={(actionType === "edit" || serialQueryStatus === "fetching" || disabled)}
                name={name}
                label="Serial / Voucher No."
                // this is to check if duplicate id is throwing an error
                onBlur={(e: any) => {
                    duplicateSerialNumberCheck(e.target.value);
                }}
                InputProps={{
                    endAdornment: (
                        <Fragment>
                            {serialQueryStatus === "fetching"
                                ? <CircularProgress color="inherit" size={20} />
                                : serialQueryStatus === "error"
                                    ? <Button
                                        color="error"
                                        onClick={setNewSerialNumber}
                                        sx={{ width: 1 }}
                                        variant="outlined"
                                    >
                                        Error - Retry
                                    </Button>
                                    : ""
                            }
                            {

                                <InputAdornment position="start">
                                    {ownercompany?.suffix ? "/" + ownercompany?.suffix : ""}
                                </InputAdornment>

                            }
                        </Fragment>

                    ),
                    startAdornment: (
                        <InputAdornment position="start">
                            {ownercompany?.prefix ? (ownercompany?.prefix) + "/" : ""}
                        </InputAdornment>
                    ),
                }}
            />
            <Label 
                variant={'ghost'}
                color={
                    (status === 'Active' && 'success') ||
                    (status === 'Billed' && 'success') ||
                    (status === 'Draft' && 'warning') ||
                    (status === 'Exact' && 'success') ||
                    (status === "Paid" && "success") ||
                    (status === 'Part' && 'darkPink') ||
                    (status === 'Pending' && 'info') ||
                    (status === 'Un-Billed' && 'info') ||
                    (status === "Un-Paid" && "error") ||
                    'default'
                }
                sx={{ textTransform: 'uppercase', 
                    marginLeft: '10px',
                    padding: '10px' 
                }}
            >
                {status}
            </Label>
        </Stack>
    )
};

export default SerialNumberTextField;