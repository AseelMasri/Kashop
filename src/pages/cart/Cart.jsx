import axios from 'axios';
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
//import RemoveIcon from '@mui/icons-material/Remove';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Cart() {

const [carts, setCarts] = useState([]);
const [isLoading, setIsLoading] = useState(true);


 const getProducts =async()=>{

      try{
        const token= localStorage.getItem('userToken:');

        const response = await axios.get(`https://kashop1.runasp.net/api/Customer/Carts`,{
           headers:{
              Authorization:`Bearer ${token}`
            }
        }
      );
        console.log(response);
        setCarts(response.data);
        
      }

      catch(error){
        console.log(error);
      }finally{
        setIsLoading(false);

      }
    }

     const removeItem =async (productId)=>{

      try{
        const token= localStorage.getItem('userToken:');
        const response = await axios.delete(`https://kashop1.runasp.net/api/Customer/Carts/${productId}`,{
          headers:{
              Authorization:`Bearer ${token}`
            }
          
          })
        getProducts();

      }catch(error){

      }
     }

     const clearCart = async ()=>{

      try{
        const token = localStorage.getItem("userToken:");
        const response = await axios.delete(`https://kashop1.runasp.net/api/Customer/Carts/clear`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        } );
        if(response.status ==200)
          getProducts();
        //console.log(response);

      }catch(error){
        console.log(error);
      }
     }

     const icrementItem = async (productId)=>{

      try{
        const token= localStorage.getItem('userToken:');
        const response = await axios.post(`https://kashop1.runasp.net/api/Customer/Carts/increment/${productId}`,{},{
          headers:{
            Authorization:`Bearer ${token}`

          }
          
        });
        if(response.status==200){
          getProducts();
        }
          


      }catch(error){
        console.log(error);

      }

     }

     const dcrementItem = async (productId)=>{

      try{
        const token= localStorage.getItem('userToken:');
        const response = await axios.post(`https://kashop1.runasp.net/api/Customer/Carts/decrement/${productId}`,{},{
          headers:{
            Authorization:`Bearer ${token}`

          }
          
        });
        if(response.status==200){
          getProducts();
        }


      }catch(error){
        console.log(error);
      }

     }

     useEffect( ()=>{
    
        getProducts();
      } ,[]);
    
            if (isLoading) {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        );
      }
    

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
          {carts.items.map( (item)=>
            <TableRow key={item.productId}>
              <TableCell>{item.productId}</TableCell>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.price}$  </TableCell>
              
              <TableCell > 
                <Box sx={{display:'flex',alignItems:'center',gap:'8px'}}>
                <RemoveIcon variant='outlined' fontSize='small' onClick={ ()=> dcrementItem(item.productId)}>-</RemoveIcon>
                {item.count}
                <AddIcon variant='outlined' fontSize='small' onClick={ ()=> icrementItem(item.productId)}>+</AddIcon>
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
              {carts.cartTotal}$
            </TableCell>

           </TableRow>
           <TableRow>
            <TableCell colSpan={6} align='right' >
              <Button variant='contained' color='error' onClick={clearCart}> Clear Cart </Button>
            </TableCell>
           </TableRow>

         </TableBody>

      </Table>
    </TableContainer>
  )
}
