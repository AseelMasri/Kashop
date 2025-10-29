import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import AxiosInstanse from '../../api/AxiosInstanse';
import { useTranslation } from 'react-i18next';

export default function Categories() {
    const {t}=useTranslation();

     {/*اول اشي منعمل فنكشن عشان نجيب الداتا */}
    const fetchCategories= async()=>{
        const response = await AxiosInstanse.get('/Categories');
        return response;

    }
    const {data,isLoading,isError,error}=useQuery({
        queryKey:['Categories'],
        queryFn:fetchCategories,
        staleTime:1000 * 60 *5
    });
    if(isError) return <Typography component="p" variant="p" color="error">Error: {error?.message || "Failed to load brands"}</Typography>
    if(isLoading) return <CircularProgress/>
    
 


  return (
      <Box py={5} >
            <Typography variant='h3' component='h2' mb={3}>
               {t("Categories")}
            </Typography>
            <Grid container spacing={3}>
                {data.data.map((category)=>(
                    <Grid key={category.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card sx={ {boxShadow:5,borderRadius:5} }>
                           
                            <CardContent>
                                <Typography align='center' variant='h6'>
                                    {category.name}
                                </Typography>
                            </CardContent>
                        </Card>
    
                    </Grid>
    
                ))}
    
            </Grid>
        </Box>
  )
}
