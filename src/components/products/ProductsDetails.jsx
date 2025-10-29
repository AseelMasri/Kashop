import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Rating, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import AxiosUserInstanse from "../../api/AxiosUserInstanse";
import { toast, Zoom } from "react-toastify";
import AxiosInstanse from "../../api/AxiosInstanse";
import { useQuery } from "@tanstack/react-query";

export default function ProductsDetails() {
    
    const {id} =useParams();

         {/*اول اشي منعمل فنكشن عشان نجيب الداتا */}
    const fetchProduct= async()=>{
        const response = await AxiosInstanse.get(`/products/${id}`);
        return response;

    }
    const {data,isLoading,isError,error}=useQuery({
        queryKey:['products',id],
        queryFn:fetchProduct,
        staleTime:1000 * 60 *5
    });
    console.log(data);
    if(isError) return <Typography component="p" variant="p" color="error">Error: {error?.message || "Failed to load brands"}</Typography>
    if(isLoading) return <CircularProgress/>
   
   

    const addToCart = async (id)=>{
      try{

        const response= await AxiosUserInstanse.post(`/Carts`,
          {productId:id});
          console.log(response);

          if(response.status==200){
            toast.success('product add sucessful', {
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
        console.log(response);

      }catch(error){
        const status = error?.response?.status;
        if (status === 409) {
      toast.error("Product already added", { transition: Zoom });
    } else if (status === 400) {
      toast.error("Bad request. Please check product id.", { transition: Zoom });
    } else if (status === 401) {
      toast.error("Unauthorized. Please log in.", { transition: Zoom });
    } else if (status === 500) {
      toast.error("Server error. Try again later.", { transition: Zoom });
    } else {
      toast.error("Something went wrong.", { transition: Zoom });
    }
     console.error("addToCart error:", error);

      }
    }



  return (
    <Box py={4}>
      <Card sx={{display:'flex',alignItems:'center',boxShadow:5}}>
        <CardMedia sx={{width:400,p:4}} component="img" image={ data.data.mainImageUrl}>
        </CardMedia>
        <CardContent sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
          <Typography component={'h2'} variant="h6">
            {data.data.name}
          </Typography>

          <Rating value={data.data.rate} readOnly/>
          <Typography component={'p'} variant="body1">
            {data.data.description}
          </Typography>
          <Typography sx={{color:"red"}} component={'p'} variant="body1">
            price: {data.data.price}$
          </Typography>
          <Typography component={'p'} variant="body1">
            category: <Chip label={data.data.categoryName} component="span" />
          </Typography>
          <Typography component={'p'} variant="body1">
            Brand: <Chip label={data.data.brandName} component="span" />
          </Typography>
          <Button variant="contained" color="primary" onClick={()=>addToCart(data.data.id)}  >
            Add to Cart
          </Button>
          </CardContent>

      </Card>
    </Box>
  )
}
