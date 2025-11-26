// src/components/navbar/Navbar.jsx

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Container,
  IconButton,
  Link,
  Button,
  Menu,
  MenuItem,
  Typography,
  Badge,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import AxiosUserInstanse from "../../api/AxiosUserInstanse";

import navBarLogo from "/images/navBarLogo.png";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [lang, setLang] = useState(i18n.language);

  // ======================= MOBILE MENU =======================
  const [anchorElNav, setAnchorElNav] = useState(null);
  const openNav = Boolean(anchorElNav);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // ======================= QUERIES ===========================
  const fetchProfile = async () => {
    const response = await AxiosUserInstanse.get("/Users/profile");
    return response.data;
  };

  const { data: user } = useQuery({
    queryKey: ["User"],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
    enabled: !!isLoggedIn,
  });

  const fetchCart = async () => {
    const response = await AxiosUserInstanse.get("/Customer/Carts");
    return response.data;
  };

  const { data: cartData } = useQuery({
    queryKey: ["CartItems"],
    queryFn: fetchCart,
    staleTime: 1000 * 60 * 5,
    enabled: !!isLoggedIn,
  });

  const cartItemCount = cartData?.items?.length ?? 0;

  // ======================= HANDLERS ==========================
  const handleLogout = () => {
    localStorage.removeItem("userToken:");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  useEffect(() => {
    document.dir = i18n.dir();
  }, [lang, i18n]);

  // ======================= DATA ==============================
  const navLinks = [
    { key: "Home", to: "/" },
    { key: "Categories", to: "/categories" },
    { key: "Products", to: "/products" },
    { key: "About Us", to: "/about" },
    { key: "Contact Us", to: "/contact" },
  ];

  // عناصر المنيو للموبايل (بدون Fragment)
  const mobileCommonItems = navLinks.map((link) => (
    <MenuItem key={link.to} onClick={handleCloseNavMenu}>
      <Link
        component={RouterLink}
        to={link.to}
        underline="none"
        color="inherit"
        sx={{ fontWeight: 500 }}
      >
        {t(link.key)}
      </Link>
    </MenuItem>
  ));

  const mobileGuestItems = [
    <MenuItem key="login" onClick={handleCloseNavMenu}>
      <Link
        component={RouterLink}
        to="/login"
        underline="none"
        color="inherit"
        sx={{ fontWeight: 600 }}
      >
        {t("Login")}
      </Link>
    </MenuItem>,
    <MenuItem key="register" onClick={handleCloseNavMenu}>
      <Link
        component={RouterLink}
        to="/register"
        underline="none"
        color="inherit"
        sx={{ fontWeight: 600 }}
      >
        {t("Register")}
      </Link>
    </MenuItem>,
  ];

  const mobileLoggedItems = [
    <MenuItem key="profile" onClick={handleCloseNavMenu}>
      <Link
        component={RouterLink}
        to="/profile"
        underline="none"
        color="inherit"
      >
        {user?.fullName || t("Profile")}
      </Link>
    </MenuItem>,
    <MenuItem key="cart" onClick={handleCloseNavMenu}>
      <Link
        component={RouterLink}
        to="/cart"
        underline="none"
        color="inherit"
      >
        {t("Cart")} ({cartItemCount})
      </Link>
    </MenuItem>,
    <MenuItem
      key="logout"
      onClick={() => {
        handleLogout();
        handleCloseNavMenu();
      }}
    >
      <Typography>{t("Logout")}</Typography>
    </MenuItem>,
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#35C3C9",
          boxShadow: "none",
        }}
      >
        <Toolbar disableGutters>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* =================== LOGO (يسار) =================== */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                gap: 1,
              }}
            >
              <Box
                component="img"
                src={navBarLogo}
                alt="KA STORE logo"
                sx={{ width: 50, height: 40, objectFit: "contain" }}
              />
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", md: "1.1rem" },
                }}
              >
                KA STORE
              </Typography>
            </Box>

            {/* =========== NAV LINKS (بالنص في الديسكتوب) ========== */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: 3,
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  underline="none"
                  color="inherit"
                  sx={{ fontWeight: 500 }}
                >
                  {t(link.key)}
                </Link>
              ))}
            </Box>

            {/* ====== RIGHT SIDE: Theme/Lang + guest/logged (ديسكتوب) ====== */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
                ml: "auto",
              }}
            >
              {/* Theme toggle */}
              <IconButton onClick={toggleTheme}>
                {mode === "light" ? (
                  <DarkModeIcon sx={{ color: "white" }} />
                ) : <LightModeIcon />}
              </IconButton>

              {/* Language toggle */}
              <Button
                sx={{ color: "white", textTransform: "none" }}
                onClick={toggleLanguage}
              >
                {i18n.language === "en" ? "Ar" : "En"}
              </Button>

              {/* Guest view */}
              {!isLoggedIn && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Link
                    component={RouterLink}
                    to="/login"
                    underline="none"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: "#ffffff",
                      color: "#35C3C9",
                      px: 3,
                      py: 0.6,
                      borderRadius: "20px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    Log in
                  </Link>
                  <Link
                    component={RouterLink}
                    to="/register"
                    underline="none"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: "#151B4F",
                      color: "#ffffff",
                      px: 3,
                      py: 0.6,
                      borderRadius: "20px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    Create Account
                  </Link>
                </Box>
              )}

              {/* Logged-in view: مربعات + Logout */}
              {isLoggedIn && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    component={RouterLink}
                    to="/profile"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "4px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #ffffff",
                    }}
                  >
                    <AccountCircleOutlinedIcon sx={{ color: "#151B4F" }} />
                  </IconButton>

                  <IconButton
                    component={RouterLink}
                    to="/wishlist"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "4px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #ffffff",
                    }}
                  >
                    <FavoriteBorderOutlinedIcon sx={{ color: "#151B4F" }} />
                  </IconButton>

                  <IconButton
                    component={RouterLink}
                    to="/cart"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "4px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #ffffff",
                    }}
                  >
                    <Badge badgeContent={cartItemCount} color="error">
                      <ShoppingCartOutlinedIcon sx={{ color: "#151B4F" }} />
                    </Badge>
                  </IconButton>

                  <Link
                    component="button"
                    underline="none"
                    sx={{
                      ml: 1,
                      color: "#ffffff",
                      fontWeight: 500,
                    }}
                    onClick={handleLogout}
                  >
                    {t("Logout")}
                  </Link>
                </Box>
              )}
            </Box>

            {/* ================= MOBILE MENU ICON ================= */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                ml: "auto",
              }}
            >
              <IconButton
                onClick={handleOpenNavMenu}
                sx={{ color: "inherit" }}
                aria-label="open navigation"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Container>

          {/* ====================== MOBILE MENU ====================== */}
          <Menu
            anchorEl={anchorElNav}
            open={openNav}
            onClose={handleCloseNavMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {mobileCommonItems}

            <MenuItem onClick={toggleTheme}>
              <Typography>
                {mode === "light" ? "Dark Mode" : "Light Mode"}
              </Typography>
            </MenuItem>

            <MenuItem onClick={toggleLanguage}>
              <Typography>{i18n.language === "en" ? "Ar" : "En"}</Typography>
            </MenuItem>

            {isLoggedIn ? mobileLoggedItems : mobileGuestItems}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
