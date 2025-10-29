import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import AxiosInstanse from '../../api/AxiosInstanse';
import { useQuery } from '@tanstack/react-query';
//import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
export default function Brands() {
    const {t}=useTranslation();

     {/*اول اشي منعمل فنكشن عشان نجيب الداتا */}
    const fetchBrands= async()=>{
        const response = await AxiosInstanse.get('/Brands');
        return response;

    }
    const {data,isLoading,isError,error}=useQuery({
        queryKey:['brands'],
        queryFn:fetchBrands,
        staleTime:1000 * 60 *5
    });
    if(isError) return <Typography component="p" variant="p" color="error">Error: {error?.message || "Failed to load brands"}</Typography>
    if(isLoading) return <CircularProgress/>
    
 
  return (
    <Box py={5} >
        <Typography variant='h3' component='h2' mb={3}>
           {t("Brands")}
        </Typography>
        <Grid container spacing={3}>
            {data.data.map((brand)=>(
                <Grid key={brand.id} item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={ {boxShadow:5,borderRadius:5} }>
                        <CardMedia height={160} sx={ {py:5} } component="img" image={brand.mainImageUrl} alt={brand.name}>

                        </CardMedia>
                        <CardContent>
                            <Typography align='center' variant='h6'>
                                {brand.name}
                            </Typography>
                        </CardContent>
                    </Card>

                </Grid>

            ))}

        </Grid>
    </Box>
  )
}
