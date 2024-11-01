import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, TextField, Typography, Grid, Avatar } from '@mui/material';

export interface UserFormData {
    name: string;
    rate: number;
    email: string;
    phone: string;
    address: string;
    image: string;
}

export function UserPage() {
    const { register, handleSubmit, setValue } = useForm<UserFormData>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const onSubmit: SubmitHandler<UserFormData> = (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        alert('User data saved!');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target?.result as string;
                setValue('image', imageData);
                setImagePreview(imageData);
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
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                    {imagePreview && (
                        <Avatar
                            src={imagePreview}
                            alt="User Image"
                            sx={{ width: 100, height: 100, mt: 2 }}
                        />
                    )}
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                Submit
            </Button>
        </Box>
    );
}