import { Box, Typography, Container,TextField, Button, CircularProgress} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import LoginSchema from "../../validations/LoginSchema";
import { useNavigate,useOutletContext } from "react-router-dom";

export default function Login() {
   const { register,handleSubmit,formState:{errors}} =useForm({
     resolver:yupResolver(LoginSchema)
   });
     const navigate=useNavigate();
     const {setIsLoggedIn} = useOutletContext();
   const [isLoading ,setIsLoading] = useState(false);
   const onSubmit = async(data) =>{
     //console.log(data);
     try{
       setIsLoading(true);
       const response = await axios.post(`https://kashop1.runasp.net/api/Identity/Account/Login`,data)
       console.log(response);
       if(response.status==200){
        localStorage.setItem("userToken:",response.data.token);
        setIsLoggedIn(false);
        navigate('/');


       }

 
     }catch(error){
      
       console.log("cache error:",error);
 
     }finally{
       setIsLoading(false);
     }
 
   }


  return (
     <Box className="login-form" py={4}>
        <Container maxWidth={"lg"}>
          <Typography component={"h1"} variant='h4'> Login Page </Typography>

          <Box
          onSubmit={handleSubmit(onSubmit)}
          component= {"form"} sx={ {
              display:"flex",
              flexDirection:"column",
              gap:3,
              mt:5
          }
            
          }>

            <TextField {...register("email")}
             label="Email" variant="outlined" fullWidth
             error={errors.email}
             helperText={errors.email?.message} />


            <TextField {...register("password")}
             label="Password" variant="outlined" fullWidth
             error={errors.password}
             helperText={errors.password?.message} />


            <Button type="submit" variant="contained" size="large" disabled={isLoading}>
              {isLoading?<CircularProgress /> :"Login"}
            </Button>
            
          </Box>

        </Container>

      </Box>
  )
}
