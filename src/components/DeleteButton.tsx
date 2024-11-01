import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { toastSuccessSettings, toastErrorSettings } from '../config';

function DeleteButton(props:any) {
  const {clickFunction,input, forceDelete,name="",permission}=props;
  const deleteFunction=()=>{
    if(!permission && !forceDelete){
      toast.error("You don't have permission to delete!", toastErrorSettings);
      return;
    }
    else if(forceDelete){
      clickFunction(input)
    }else{
      const deleteConfirm = confirm("are you sure ?")
      if(deleteConfirm){
        clickFunction(input);
        toast.success('Deleted Successfully.', toastSuccessSettings);

      }else{
        return;
      }
    }
  }
  return (
    <Box
    sx={{
      display:"flex",
      flexDirection:"row",
      justifyContent: 'flex-start',
      
    }}
    onClick={deleteFunction}
    
    >

    <DeleteIcon 
    color="error"
    />
      <Typography>
        {name}
      </Typography>
    </Box>
    
  )
}

export default DeleteButton;