import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Link } from '@mui/material';
import { Link as RouterLink, useNavigate} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';

export default function Navbar({isLoggedIn,setIsLoggedIn}) {
  const { t, i18n } = useTranslation();

   const fetchProducts= async ()=>{
    const response =await AxiosUserInstanse.get('/Carts');
    return response.data;

  }
  const {data}=useQuery({
    queryKey:['cartItems'],
    queryFn:fetchProducts,
    staleTime:1000*60*5
  });
  const cartItemCount=data?.items?.length??0;
  console.log(cartItemCount);

  //console.log(data?.items?.length??0);
  //console.log(data?.items?.length ?? 0);
 //console.log(data.data.items.length);
  const navigate=useNavigate();

  const {mode,toggleTheme}=useContext(ThemeContext);
  const [lang,setLang]=useState(i18n.language);

  const handleLogout=() =>{
    localStorage.removeItem("userToken:");
    setIsLoggedIn(false);
    navigate('/login')
  }

  const toggleLanguage=(newLanguage)=>{
    i18n.changeLanguage(newLanguage);
    setLang(newLanguage);
    
  }
  useEffect( ()=>{
    window.document.dir = i18n.dir();

  },[lang]);

  return (
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{gap:3}}>
          <Link component={RouterLink} to={'/'} color='inherit' underline='none'> 
          {t("Home")}
          </Link>
          {isLoggedIn ?(
            <>
            <Link component={RouterLink} to={'/cart'} color='inherit' underline='none'>{t("Cart")} {cartItemCount} </Link>
            <Link onClick={handleLogout} color='inherit' underline='none'> {t("Logout")}</Link>

             </>
          ):(
            <>
            <Link component={RouterLink} to={'/register'} color='inherit' underline='none'> {t("Register")}</Link>
            <Link component={RouterLink} to={'/login'} color='inherit' underline='none'> {t("Login")}</Link>
            </>
          )}

          <IconButton onClick={toggleTheme}>
            {mode=='light'?<DarkModeIcon sx={{ color: 'white' }}/>:<LightModeIcon />}
            
          </IconButton>

          <Button sx={{color:"white"}} onClick={()=>toggleLanguage(i18n.language=='en'?'ar':'en')}>
            {i18n.language=='en'?'Ar':'En'}
          </Button>
          
          
        </Toolbar>
      </AppBar>
    </Box>
  )
}
