import { Box, Button, FormControlLabel, FormGroup, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const AddCategory = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image:'',
  });

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      releaseDate: date
    }));
  };


  const sendRequest = async() => {
    try {
      const response = await axios.post("http://localhost:5000/books", {

        name: String(formData.name),
        category:  String(formData.category),
        description: String (formData.description),
        price:  String(formData.price),
        image:  String(formData.image),
        available:  String(checked),
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate form data here
    // Submit form data here
    console.log(formData, checked);
    await sendRequest();
    history('/books');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box 
      display='flex' 
      flexDirection="column" 
      justifyContent={'center'} 
      maxWidth={700}
      alignContent={"center"}
      alignSelf="center"
      marginLeft={"auto"}
      marginRight={"auto"}
      marginTop={5}
      >
       
         <FormLabel>Name</FormLabel>
        <TextField 
        margin="normal" 
        fullWidth variant='outlined' 
        name="description" 
        value={formData.name} 
        onChange={handleChange} 
        />

        <FormLabel>Category</FormLabel>
        <Select
          margin="normal"
          fullWidth
          variant="outlined"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <MenuItem value="">Select a category</MenuItem>
          <MenuItem value="fiction">Books</MenuItem>
          <MenuItem value="non-fiction">Electronic & Electrical</MenuItem>
          <MenuItem value="children">Clothes</MenuItem>
          <MenuItem value="children">Furniture</MenuItem>
          <MenuItem value="children">Tools</MenuItem>
          <MenuItem value="children">Gifts</MenuItem>
        </Select>

        <FormLabel>Description</FormLabel>
        <TextField 
        margin="normal" 
        fullWidth variant='outlined' 
        name="description" 
        value={formData.description} 
        onChange={handleChange} 
        />

        <FormLabel>Price</FormLabel>
        <TextField 
        type='number' 
        margin="normal" 
        fullWidth variant='outlined' 
        name="price" 
        value={formData.price} 
        onChange={handleChange}
         />
     
         <FormLabel>Image</FormLabel>
        <TextField 
        margin="normal" 
        fullWidth variant='outlined' 
        name="image" 
        value={formData.image} 
        onChange={handleChange}
         />
         
        <FormControlLabel 
        control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />} label="Available" />
        <Link to='/ViewCategory'>
        <Button 
        variant="contained" 
        color="primary" 
        type="submit">Add category</Button>
        </Link>
      </Box>
    </form>
  )
};

export default AddCategory;

