import { useNavigate } from "react-router-dom";
import { toastSuccessSettings } from "../config";
import { Fragment } from "react";
import { Divider, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { customFetch } from "../utils/customFetch";
import SvgIconStyle from "./SvgIconStyle";

interface ListDeleteProps {
    handleCloseMenu: Function,
    docId: any,
    voucherType: string,
}


export const ListDeleteButton = (props: ListDeleteProps) => {
    const navigate = useNavigate();
    const { handleCloseMenu, docId, voucherType } = props;

    const constrainPropertiesString = Object.keys(docId).join('_')

    const handleDelete = async () => {
        // preparing pdf file in parallel without blocking confirmation dialog.
        //     const deletePdfBlobPromise = deletePdfBlobFunction(docId, voucherType);

        // asking for user confirmation.
            const confirmation = confirm(`Are you sure you Want to delete ${voucherType} ?`);
        
        // Using all async functions after confirmation.
            if (confirmation) {      
                try {
                    await customFetch(`/v1/updates/${voucherType}`,{
                        method: 'DELETE',
                        body: {
                            where:{
                                [constrainPropertiesString]:{
                                    ...docId
                                }
                            }
                        }
                    }).then((deleteRes)=>{
                        console.log({deleteRes})
                        toast.success(`${voucherType.toLocaleUpperCase()} deleted succesfully.`, toastSuccessSettings);
                    })
                    handleCloseMenu();
                    navigate(0);
                    return;
                }
                catch (error: any) {
                    console.log({error});
                        alert(error.message);
                }
            }
            handleCloseMenu();
    };

    return (
        <Fragment>
            <Divider sx={{ borderStyle: "dashed" }} />
            <MenuItem
                onClick={() => {
                    handleDelete();
                }}
            >
                <SvgIconStyle iconFileName={"delete-filled"} />
                Delete
            </MenuItem>
        </Fragment>
    )
};