import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Container, IconButton, Link, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [lang, setLang] = useState(i18n.language);

  // ============== FETCH PROFILE ONLY IF LOGGED IN ==============
  const fetchProfile = async () => {
    const response = await AxiosUserInstanse.get('/Users/profile');
    return response.data;
  };

  const { data: user } = useQuery({
    queryKey: ['User'],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
    enabled: isLoggedIn, // ⭐ أهم شيء
  });

  // ============== FETCH CART ITEMS ONLY IF LOGGED IN ==============
  const fetchCart = async () => {
    const response = await AxiosUserInstanse.get('/Customer/Carts');
    return response.data;
  };

  const { data: cartData } = useQuery({
    queryKey: ['CartItems'],
    queryFn: fetchCart,
    staleTime: 1000 * 60 * 5,
    enabled: isLoggedIn, // ⭐ نفس الشيء
  });

  const cartItemCount = cartData?.items?.length ?? 0;

  // ============== HANDLERS ==============
  const handleLogout = () => {
    localStorage.removeItem('userToken:');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  useEffect(() => {
    document.dir = i18n.dir();
  }, [lang, i18n]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" top="0">
        <Toolbar>
          <Container maxWidth="md">
            <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
              
              {/* LEFT SIDE */}
              <Box sx={{ display: "flex", gap: 5 }}>
                <Link component={RouterLink} to="/" color="inherit" underline="none">
                  {t("Home")}
                </Link>

                {isLoggedIn ? (
                  <>
                    <Link component={RouterLink} to="/cart" color="inherit" underline="none">
                      {t("Cart")} ({cartItemCount})
                    </Link>

                    <Link onClick={handleLogout} color="inherit" underline="none">
                      {t("Logout")}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link component={RouterLink} to="/register" color="inherit" underline="none">
                      {t("Register")}
                    </Link>
                    <Link component={RouterLink} to="/login" color="inherit" underline="none">
                      {t("Login")}
                    </Link>
                  </>
                )}
              </Box>

              {/* RIGHT SIDE */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                
                {/* THEME TOGGLE */}
                <IconButton onClick={toggleTheme}>
                  {mode === 'light' ? (
                    <DarkModeIcon sx={{ color: "white" }} />
                  ) : (
                    <LightModeIcon />
                  )}
                </IconButton>

                {/* LANGUAGE BUTTON */}
                <Button sx={{ color: 'white' }} onClick={toggleLanguage}>
                  {i18n.language === 'en' ? 'Ar' : 'En'}
                </Button>

                {/* USER NAME ONLY IF LOGGED IN */}
                {isLoggedIn && (
                  <Link
                    component={RouterLink}
                    to="/profile"
                    color="inherit"
                    underline="none"
                  >
                    {user?.fullName}
                  </Link>
                )}
              </Box>

            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
