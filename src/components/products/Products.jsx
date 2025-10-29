
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AxiosInstanse from '../../api/AxiosInstanse';
import { useTranslation } from 'react-i18next';

export default function Products() {
  const {t}=useTranslation();
  
     
    const fetchProducts= async()=>{
        const response = await AxiosInstanse.get('/products');
        return response.data;

    }
    const {data,isLoading,isError,error}=useQuery({
        queryKey:['products'],
        queryFn:fetchProducts,
        staleTime:1000 * 60 *5
    });
    console.log(data);
    if(isError) return <Typography component="p" variant="p" color="error">Error: {error?.message || "Failed to load brands"}</Typography>
    if(isLoading) return <CircularProgress/>
    
 
  return (
    <Box py={5}>
      <Typography variant="h3" component="h2" mb={3}>
        {t("Products")}
      </Typography>

      <Grid container spacing={3}>
        {data.data.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/product/${product.id}`}>
            
             <Card sx={ {boxShadow:5,borderRadius:5,maxWidth:300} } >
             <CardMedia
                component="img"
                height={160}
                sx={{ py: 5, objectFit: 'contain' }}
                image={product.mainImageUrl || 'https://via.placeholder.com/600x400?text=No+Image'}
                alt={product.name}
              />
              <CardContent>
                <Typography align="center" variant="h5">
                  {product.name.split(' ').slice(0,4).join(' ')}
                </Typography>
                {product.price != null && (
                  <Typography align="center" color="text.secondary" variant="h6">
                    {product.price} ₪
                  </Typography>
                )}
              </CardContent>
            
            </Card>
            
            </Link>

          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
