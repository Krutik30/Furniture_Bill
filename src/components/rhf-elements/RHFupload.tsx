//TODO : IMPORTED FROM SMART-AGENT MOVE FILE TO PACKAGE FOLDER
import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
// type
import UploadSingleFile from './UploadSingleFile';
import UploadMultiFile from './UploadMultipleFile';
import UploadAvatar  from './UploadAvatar'
import { useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { be_url } from '../../config';
import { v4 as uuidv4 } from 'uuid';
import { authTokensCache } from '../../utils/localCacheAPI'; 
import { customFetch } from '../../utils/customFetch';
// ----------------------------------------------------------------------

RHFUploadAvatar.propTypes = {
  name: PropTypes.string,
  fieldNameHolder: PropTypes.string,
  imageFieldName: PropTypes.string,
  sx:PropTypes.object
};

const getCompressedFile = async (blob: any) => {
  console.log(blob.size / 1000000, "MB");
  const options = {
      maxSizeMB: 0.04,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
      alwaysKeepResolution:true
  };
  // Compress the file only if its more than 15 KB.
  if (blob.size > 15360){
    blob = await imageCompression(blob, options)
    console.log(blob.size / 1000000, "MB");
    return blob;
    // console.log(getValues(name));
  };

  return blob;
}



export function RHFUploadAvatar({ fieldNameHolder, imageName, imageType, ...other }: any) {
  const { control,  setError, setValue } = useFormContext();
  const authTokens = authTokensCache.getItem();
  const handleDrop = useCallback(
    async(acceptedFiles: any) => {
      try {
        const file = acceptedFiles[0];

        if (file) {

        const blob: Blob = await getCompressedFile(file);
        
        console.log("going to upload")
        console.log(imageName , imageType)
        // posting to backend to get the url of the image
        const formData = new FormData();
        formData.append('file', blob);
        formData.set('blobName', imageName);
        formData.set('containerName',imageType);
        // for (var key of formData.entries()) {
        //   console.log(key[0] + ', ' + key[1]);
        // }



        customFetch('/image/upload', {
          method: 'post',
          body: formData
        })
          .then((response:any) => {
                // console.log("response", response)
                if (response?.payload?.url) {
                  // console.log("response", response.payload.url)
                  setValue(fieldNameHolder, response.payload.url);
                }else{
                  throw new Error('Failed to upload image.');
                }
            });
        }
      } catch (error: any){
        // console.log({error});
        setError(fieldNameHolder, {type:"custom", message: error?.message}, {shouldFocus: true})
      }
    },
    [setValue]
  );

  return (
    <Controller
      name={fieldNameHolder}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <div>
            <UploadAvatar imageFieldName={fieldNameHolder} onDrop={handleDrop} error={checkError} {...other} file={field.value} />
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

RHFUploadSingleFile.propTypes = {
  name: PropTypes.string,
};

export function RHFUploadSingleFile({ name, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <UploadSingleFile
            accept="image/*"
            file={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

RHFUploadMultiFile.propTypes = {
  name: PropTypes.string,
};

export function RHFUploadMultiFile({ fieldNameHolder, imageFieldName,imageType, ...other }: any) {
  const { control, getValues, setError, watch, setValue} = useFormContext();
  const imageArray = watch(fieldNameHolder)||[];
  const handleDrop = useCallback(
    async(acceptedFiles: any) => {
      try {
          //creating url object for new file
          // while uploading the images need to disable the submit button

          setValue("disableSubmitButton", true);

          await acceptedFiles.map(async (file: any,index:number) =>{
            console.log("this are incoming files", {file}, index);
            let blob: Blob  = await getCompressedFile(file);
            console.log({blob})
              const formData = new FormData();
              formData.append('file', blob);
              formData.append('blobName', uuidv4());
              formData.append('containerName',imageType);

              customFetch('/image/upload', {
                method: 'post',
                body: formData
              })
                .then((response:any) => {
                  // console.log("response", response)
                  if (response?.payload?.url) {
                    // console.log("response", response.payload.url)
                    // get the url and add it to the array
                    imageArray.push({type:'image',url:response.payload.url});
                    setValue(fieldNameHolder, imageArray);
                  }else{
                    throw new Error('Failed to upload image.');
              }
          });
          });
          // again enable the submit button
          setValue("disableSubmitButton", false);
          
          console.log(getValues())
          
        
      } catch (error: any){
        // console.log({error});
        setError(fieldNameHolder, {type:"custom", message: error?.message}, {shouldFocus: true})
      }
    }
    ,[setValue]
  );
  const handleRemoveAll = () => {
    setValue(fieldNameHolder, []);
  };
  
  const handleRemove = (file:any) => {
    // find the url of the file and remove it from the array
    const index = imageArray.indexOf(file);
    console.log({index})
    if (index > -1) {
      imageArray.splice(index, 1);
    }
    console.log({imageArray})
    setValue(fieldNameHolder, imageArray);
  };
  return (
    <Controller
      name={fieldNameHolder}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;
        // console.log(field)
        return (
          <UploadMultiFile
            accept={{
              'image/*': ['.jpeg', '.jpg', '.png'],
            }}
            files={[]}
            error={checkError}
            onDrop={handleDrop}
            onRemove={handleRemove}
            onRemoveAll={handleRemoveAll}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error?.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}