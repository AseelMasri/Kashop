import { Box, Typography, Container,TextField, Button, CircularProgress} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import RegisterSchema from "../../validations/RegisterSchema";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const { register,handleSubmit,formState:{errors}} =useForm({
    resolver:yupResolver(RegisterSchema)
  });
  const [serverError,setServerError]=useState("");
  const navigate=useNavigate();
  const [isLoading ,setIsLoading] = useState(false);
  const onSubmit = async(data) =>{
    //console.log(data);
    try{
      setIsLoading(true);
      const response = await axios.post(`https://kashop1.runasp.net/api/Identity/Account/Register`,data)
      console.log(response);
       if(response.status==200){
        navigate('/login');
       }

    }catch(error){
       if(error.response){
        setServerError(error.response.data.message);
       }else{
        //console.log("cache error:",error);
        setServerError("An Unexptected error...");

       }
      

    }finally{
      setIsLoading(false);
    }

  }



  return (
      <Box className="register-form" py={4}>
        <Container maxWidth={"lg"}>
          <Typography component={"h1"} variant='h4'> Register Page </Typography>

          <Box
          onSubmit={handleSubmit(onSubmit)}
          component= {"form"} sx={ {
              display:"flex",
              flexDirection:"column",
              gap:3,
              mt:5
          }
            
          }>
            {serverError.length > 0 && (<Typography color="error">{serverError}</Typography>)}



            <TextField {...register("fullName")} 
            label="Full Name" variant="outlined"  fullWidth
            error={errors.fullName}
            helperText={errors.fullName?.message}
            />

            <TextField {...register("userName")} label="User Name" variant="outlined" fullWidth
            error={errors.userName}
            helperText={errors.userName?.message} />
            <TextField {...register("email")} label="Email" variant="outlined" fullWidth />
            <TextField {...register("password")} label="Password" variant="outlined" fullWidth />
            <TextField {...register("phoneNumber")} label="Phone Number" variant="outlined" fullWidth />
            <Button type="submit" variant="contained" size="large" disabled={isLoading}>
              {isLoading?<CircularProgress /> :"register"}
            </Button>
            
          </Box>
         

        </Container>

      </Box>
  )
}
