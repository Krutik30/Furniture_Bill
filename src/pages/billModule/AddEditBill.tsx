/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Box, Stack, Button, MenuItem, Select, TextField, Dialog, DialogTitle, DialogContent } from '@mui/material';
import PdfDocument from './PdfDocument';
import { pdf, PDFViewer } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

export interface FormData {
  products: ProductType[];
}

export interface ProductType {
  type: 'type1' | 'type2';
  name?: string;
  length?: number;
  breadth?: number;
  depth?: number;
  rate?: number;
  quantity?: number;
}

export const AddEditBill = () => {
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      products: [
        { type: 'type1', name: 'Initial Product', length: 10, breadth: 5, depth: 3 },
      ],
    },
  });

  const [isDialogue, setIsDialogue] = useState(false);
  const [pdfData, setPdfData] = useState<any>(null);
  const [currentType, setCurrentType] = useState<'type1' | 'type2'>('type1');

  const { fields, append } = useFieldArray({
    control,
    name: 'products',
  });

  const handleAddProduct = () => setIsDialogue(true);
  const addProductDialogue = () => {
    append({ type: currentType });
    setIsDialogue(false);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formattedData = data.products.reduce(
      (acc: { type1: ProductType[]; type2: ProductType[] }, product) => {
        acc[product.type].push(product);
        return acc;
      },
      { type1: [], type2: [] }
    );
    setPdfData(formattedData);
    handleDownload(formattedData);
  };

  const generatePdfBlob = async (formData: any): Promise<Blob | null> => {
    try {
      const pdfContent = await pdf(<PdfDocument formData={formData} />);
      return await pdfContent.toBlob();
    } catch (error) {
      console.error('Error generating PDF blob:', error);
      return null;
    }
  };

  const handleDownload = async (formData: any) => {
    const blob = await generatePdfBlob(formData);
    if (blob) saveAs(blob, 'generated-pdf.pdf');
  };

  return (
    <Box sx={{ padding: 2, maxWidth: '100%', margin: 'auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ width: { xs: '100%', sm: '80%', md: '60%' }, margin: 'auto' }}>
          {fields.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                border: '1px solid #ddd',
                padding: 2,
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                backgroundColor: index % 2 === 0 ? '#fafafa' : '#f0f0f0',
              }}
            >
              <TextField
                label="Name"
                {...register(`products.${index}.name` as const)}
                fullWidth
                sx={{ marginBottom: 1 }}
              />

              {field.type === 'type1' && (
                <>
                  <TextField label="Length" type="number" {...register(`products.${index}.length` as const)} fullWidth />
                  <TextField label="Breadth" type="number" {...register(`products.${index}.breadth` as const)} fullWidth />
                  <TextField label="Depth" type="number" {...register(`products.${index}.depth` as const)} fullWidth />
                </>
              )}

              {field.type === 'type2' && (
                <>
                  <TextField label="Rate" type="number" {...register(`products.${index}.rate` as const)} fullWidth />
                  <TextField label="Quantity" type="number" {...register(`products.${index}.quantity` as const)} fullWidth />
                </>
              )}
            </Box>
          ))}

          <Button variant="contained" onClick={handleAddProduct} fullWidth sx={{ padding: 1 }}>
            Add Product
          </Button>
          <Button type="submit" variant="contained" fullWidth sx={{ padding: 1 }}>
            Submit
          </Button>
        </Stack>
      </form>

      <Dialog open={isDialogue} onClose={() => setIsDialogue(false)}>
        <DialogTitle>Choose Product Type</DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Select
            value={currentType}
            onChange={(e) => setCurrentType(e.target.value as 'type1' | 'type2')}
            sx={{ minWidth: 150, marginBottom: 2 }}
          >
            <MenuItem value="type1">Product Type 1</MenuItem>
            <MenuItem value="type2">Product Type 2</MenuItem>
          </Select>
          <Button variant="contained" onClick={addProductDialogue} fullWidth sx={{ padding: 1 }}>
            Add
          </Button>
        </DialogContent>
      </Dialog>

      {pdfData && (
        <Box sx={{ display: { xs: 'none', md: 'block' }, marginTop: 4 }}>
          <PDFViewer width="100%" height={800}>
            <PdfDocument formData={pdfData} />
          </PDFViewer>
        </Box>
      )}
    </Box>
  );
};

export default AddEditBill;
