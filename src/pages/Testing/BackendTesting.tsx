import React, { ChangeEvent, Fragment, useState } from 'react'
// import { customFetch } from '../../utils/customFetch'
import { Box, Button, Input, Stack, Typography } from '@mui/material'

type requestData = {
  request: string;
  method: string;
  body: any;
  data: string;
}

export const BackendTesting = () => {
    const [data,setData]= useState<requestData>({request:'',method:'GET',body:{},data:''});

    const handleRequestChange = (e: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, request: e.target.value, data: '' });
    };
  
    const handleMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, method: e.target.value, data: '' });
    };
    const handleBodyChange = (e: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, body: e.target.value, data: '' });
    };

    const fetchData = () => {
    //   customFetch(data.request, {
    //     method: data.method,
    //     // body: JSON.stringify(data.body),
    //     body: {
    //       query: {
    //         _count:true,         
    //        _max:{
    //         updatedAt:true
    //       }     
    //     },       
    //     queryType:"aggregate"
    //   }
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       setData({ ...data, data: typeof res == "object" ? JSON.stringify(res, null, 2) : res }) ;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setData({ ...data, data: err.stack || err.customMessage?.length !== 0 ? err.customMessage : err.message });
    //     });
    };
    return (
      <Fragment>
      <Stack direction={'column'} p={5}>
        <Box>
            <Typography>
              Request:
            </Typography>
            <Input onChange={handleRequestChange} value={data.request} />
            <Typography>
              Method:
            <Input onChange={handleMethodChange} value={data.method} />
            </Typography>
            <Typography>
              Body:
            <Input onChange={handleBodyChange} value={data.body} />
            </Typography>
            <Button onClick={fetchData}>
              get data
            </Button>
            <Typography>
              Request: {data.request}
            </Typography>
            <Typography>
              Method: {data.method}
            </Typography>
            
            <pre>
              Data: {data.data}
            </pre>
            </Box>
      </Stack>
      </Fragment>
    )
}
