import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, TextField, Typography, Grid, Avatar, Stack } from '@mui/material';

export interface UserFormData {
    name: string;
    rate: number;
    email: string;
    phone: string;
    address: string;
    image: string;
    signature: string;
}

export function UserPage() {
    const { register, handleSubmit, setValue } = useForm<UserFormData>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('user');
        if (storedData) {
            const userData: UserFormData = JSON.parse(storedData);
            setValue('name', userData.name);
            setValue('rate', userData.rate);
            setValue('email', userData.email);
            setValue('phone', userData.phone);
            setValue('address', userData.address);
            setValue('image', userData.image);
            setValue('signature', userData.signature);
            setImagePreview(userData.image);
            setSignaturePreview(userData.signature);
        }
    }, [setValue]);

    const onSubmit: SubmitHandler<UserFormData> = (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        alert('User data saved!');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'signature') => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileData = event.target?.result as string;
                setValue(field, fileData);
                if (field === 'image') {
                    setImagePreview(fileData);
                } else if (field === 'signature') {
                    setSignaturePreview(fileData);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                User Information
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Name"
                        {...register('name', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Rate of Work"
                        type="number"
                        {...register('rate', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        {...register('email', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        type="tel"
                        {...register('phone', { required: true })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Address"
                        {...register('address', { required: true })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack 
                        direction="row" 
                        spacing={2}
                    >
                        <Box
                            sx={{ mt: 2, pl: 10 }}
                        >
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => handleFileChange(e, 'image')}
                                />
                            </Button>
                            {imagePreview && (
                                <Avatar
                                    src={imagePreview}
                                    alt="User Image"
                                    sx={{ width: 100, height: 100, mt: 2 }}
                                />
                            )}
                        </Box>
                        <Box
                            sx={{ mt: 2, pl: 10 }}
                        >
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload Signature
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => handleFileChange(e, 'signature')}
                                />
                            </Button>
                            {signaturePreview && (
                                <Avatar
                                    src={signaturePreview}
                                    alt="User Signature"
                                    sx={{ width: 100, height: 100, mt: 2 }}
                                />
                            )}
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                Submit
            </Button>
        </Box>
    );
}