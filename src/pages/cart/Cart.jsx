import axios from 'axios';
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast, Zoom } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Cart() {
        const queryClient = useQueryClient();

   const fetchProducts= async ()=>{
    const response =await AxiosUserInstanse.get('/Customer/Carts');
    return response.data;

  }
  const {data, isLoading, isError, error}=useQuery({
    queryKey:['cartItems'],
    queryFn:fetchProducts,
    staleTime:1000*60*5
  });

  const incrementItem = async(productId)=>{
    const response = await AxiosUserInstanse.post(`/Customer/Carts/increment/${productId}`,{});

    if(response.status==200){
      queryClient.invalidateQueries(['cartItems']);
      toast.success('incrementItem sucessful', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress:undefined ,
              theme: "colored",
              transition: Zoom,
              });
  
    }
  }

  const dcrementItem= async(productId)=>{
     const response = await AxiosUserInstanse.post(`/Customer/Carts/decrement/${productId}`,{});
     if(response.status==200){
      queryClient.invalidateQueries(['cartItems']);
      toast.success('Decrement Item sucessful', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress:undefined ,
              theme: "colored",
              transition: Zoom,
              });
  
    }


  }
  

  const removeItem =async(productId)=>{
    const response = await AxiosUserInstanse.delete(`/Customer/Carts/${productId}`);
      if(response.status==200){
      queryClient.invalidateQueries(['cartItems']);
      toast.success('Remove Item Is sucessful', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress:undefined ,
              theme: "colored",
              transition: Zoom,
              });
  
    }
  }
    

    const clearCart =async()=>{
          const response = await AxiosUserInstanse.delete(`/Customer/Carts/clear`);
          if(response.status==200){
                  queryClient.invalidateQueries(['cartItems']);


          }

    

  }
  if(isError) return <Typography component="p" variant="p" color="error">Error: {error?.message || "Failed to load brands"}</Typography>
    if(isLoading) return <CircularProgress/>

  return (
    <TableContainer>
      <Table>
         <TableHead>
          <TableRow>
            <TableCell>product ID</TableCell>
             <TableCell>Product Name</TableCell>
             <TableCell>Price</TableCell>
             <TableCell> Quantity</TableCell>
             <TableCell>Total</TableCell>
             <TableCell>Action</TableCell>

          </TableRow>

         </TableHead>
         <TableBody>
          {data.items.map( (item)=>
            <TableRow key={item.productId}>
              <TableCell>{item.productId}</TableCell>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.price} $  </TableCell>
              
              <TableCell > 
                <Box sx={{display:'flex',alignItems:'center',gap:'8px'}}>

               <RemoveIcon variant='outlined' fontSize='small' onClick={ ()=> dcrementItem(item.productId)}>-</RemoveIcon>
                {item.count} 
                <AddIcon variant='outlined' fontSize='small' onClick={ ()=> incrementItem(item.productId)}>+</AddIcon>
                 </Box>
                 </TableCell>
                 
              <TableCell>{item.totalPrice}  </TableCell>
              <TableCell> <Button color='error' onClick={ ()=>removeItem(item.productId)}>Remove</Button></TableCell>

            </TableRow>
           )}
           <TableRow >
            <TableCell colSpan={4}>
              <Typography> 
                Total Price :
              </Typography>
            </TableCell>
            <TableCell>
              {data.cartTotal}$
            </TableCell>

           </TableRow>
           <TableRow>
            <TableCell colSpan={6} align='right' >
              <Box sx={{display:'flex',gap:2,justifyContent:'flex-end'}} >
                <Button variant='contained' color='error' onClick={clearCart}> Clear Cart </Button> 
                <Button component={Link} to='/checkout' variant='contained' color='primary'> checkout </Button> 
              </Box>
            </TableCell>
           </TableRow>

         </TableBody>

      </Table>
    </TableContainer>
  )
}
