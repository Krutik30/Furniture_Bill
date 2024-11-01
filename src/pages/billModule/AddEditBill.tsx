/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Box, Stack, Button, MenuItem, Select, TextField, Dialog, DialogTitle, DialogContent } from '@mui/material';
import PdfDocument from './PdfDocument'; // Import for generating PDF
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
        { type: 'type1', name: 'Initial Product', length: 10, breadth: 5, depth: 3 } 
      ],
    },
  });

  const [isDialogue, setIsDialogue] = useState(false);
  const [pdfData, setPdfData] = useState<any>(null);
  const [currentType, setCurrentType] = useState < 'type1' | 'type2'>('type1');

  const { fields, append } = useFieldArray({
    control,
    name: 'products',
  });

  const handleAddProduct = () => {
    setIsDialogue(true);
  };

  const addProductDialogue = () => {
    append({ type: currentType })
    setIsDialogue(false);
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Submitted Data:', data);
    const formatedData: {
      type1: ProductType[],
      type2: ProductType[]
    } = {
      type1: [],
      type2: []
    }

    data.products.map((product) => {
      if(product.type === 'type1'){
        formatedData.type1.push(product);
      }else{
        formatedData.type2.push(product);
      }

      return product;
    })
    setPdfData(formatedData);
    handleDownload(formatedData)
  };

  const generatePdfBlob = async (formData: any): Promise<Blob | null> => {
    try {
      // Generate the PDF content
      const pdfContent = await pdf(<PdfDocument formData={formData} />);

      // Retrieve the PDF blob using the toBlob method
      const blob = await pdfContent.toBlob();

      return blob;
    } catch (error) {
      console.error('Error generating PDF blob:', error);
      return null;
    }
  };

  const handleDownload = async (formData: any) => {
    // Generate the PDF blob
    const blob = await generatePdfBlob(formData);

    // Trigger the download with a specified filename
    if (blob) {
      saveAs(blob, 'generated-pdf.pdf');
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>

          {fields.map((field, index) => (
            <Box key={field.id} border="1px solid #ddd" padding={2} borderRadius={1}>
              <TextField label="Name" {...register(`products.${index}.name` as const)} />

              {field.type === 'type1' && (
                <>
                  <TextField label="Length" type="number" {...register(`products.${index}.length` as const)} />
                  <TextField label="Breadth" type="number" {...register(`products.${index}.breadth` as const)} />
                  <TextField label="Depth" type="number" {...register(`products.${index}.depth` as const)} />
                </>
              )}

              {field.type === 'type2' && (
                <>
                  <TextField label="Rate" type="number" {...register(`products.${index}.rate` as const)} />
                  <TextField label="Quantity" type="number" {...register(`products.${index}.quantity` as const)} />
                </>
              )}
            </Box>
          ))}

          <Button variant="contained" onClick={handleAddProduct}>
            Add Product
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>


          <Dialog
            open={isDialogue}
            onClose={() => setIsDialogue(false)}
          >
            <DialogTitle>
              Which type?
            </DialogTitle>
            <DialogContent>
              <Select
                defaultValue={currentType || 'type1'}
                displayEmpty
                onChange={(e) => {
                  e.preventDefault();
                  // @ts-expect-error nai aave error
                  setCurrentType(e.target.value);
                }}
              >
                <MenuItem value="type1">Product Type 1</MenuItem>
                <MenuItem value="type2">Product Type 2</MenuItem>
              </Select>

              <Button
                variant='contained'
                size='large'
                sx={{
                  marginLeft: 5
                }}
                onClick={addProductDialogue}
              >
                Add
              </Button>
            </DialogContent>
          </Dialog>
        </Stack>
      </form>

      {pdfData && (
        <PDFViewer width="100%" height={800}>
          <PdfDocument formData={pdfData} />
        </PDFViewer>
      )}
    </Box>
  );
};

export default AddEditBill;
