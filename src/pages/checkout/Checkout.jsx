import { useQuery } from '@tanstack/react-query';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { Box, Button, Card, CardContent, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

export default function Checkout() {

    const {register,control,handleSubmit}=useForm({});
    

     const fetchProducts= async ()=>{
        const response =await AxiosUserInstanse.get('/Carts');
        return response.data;
    
      }
      const {data, isLoading, isError, error}=useQuery({
        queryKey:['cartItems'],
        queryFn:fetchProducts,
        staleTime:1000*60*5
      });
      console.log(data?.items?.length??0);
      const cartItemCount=data?.items?.length??0;
      const cartItems=data?.items;
      console.log(data);

      const onSubmit=async (formData)=>{
        //console.log(formData);
        const response = await AxiosUserInstanse.post('/CheckOut/payment',{
            "paymentMethod": formData.paymentMethod
        });

        if(response.status==200){
          console.log(response);
          location.href=response.data.url;

        }

      } 


        if(isError) return <Typography component="p" variant="p" color="error">Error: {error?.message || "Failed to load brands"}</Typography>
        if(isLoading) return <CircularProgress/>
  return (
    <Box py={5}>
        <Typography variant='h5'>Checkout</Typography>
            {cartItems.map( item=>(
                <Card key={item.productId} sx={{mb:3}}>
                    <CardContent sx={{ display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <Typography variant='h6'> {item.productName} </Typography>
                        <Typography > {item.count}*{item.price}$ = {item.count * item.price}$ </Typography>
                    </CardContent>
                </Card>
            ))}

            <Typography variant='h6' mt={2}>Total : {data?.cartTotal} $ </Typography>
             <Box
                      onSubmit={handleSubmit(onSubmit)}
                      component= {"form"} sx={ {
                          display:"flex",
                          flexDirection:"column",
                          gap:3,
                          mt:5
                      }}>

                      
                     <Controller control={control} name='paymentMethod' defaultValue={'Visa'} 

                           render={({field})=>(
                            <Box>
                                <FormLabel>Payment Method</FormLabel>
                                <RadioGroup {...field}>
                                  <FormControlLabel value={'Cash'} control={ <Radio/> } label="Cash"/>
                                  <FormControlLabel value={'Visa'} control={ <Radio/> } label="Visa"/>


                                </RadioGroup>
                            </Box>
                            

                           )}

                     />
                              <Button type="submit" variant="contained" size="large" /*disabled={isLoading}*/>
                                Creat Order
                                 {/*{isLoading?<CircularProgress /> :"register"}*/} 
                              </Button>
                      </Box>

    </Box>
  )
}
