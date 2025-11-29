// src/pages/register/Register.jsx
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Link,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RegisterSchema from "../../validations/RegisterSchema";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setServerError("");

      const response = await axios.post(
        "https://kashop1.runasp.net/api/Identity/Account/Register",
        data
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setServerError(error.response.data?.message || "Registration failed.");
      } else {
        setServerError("An unexpected error occurred...");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt:3
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            bgcolor: "#fff",
            boxShadow: 3,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* الجزء اليسار - الصورة */}
          <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
            <Box
              component="img"
              src="/images/login.png"
              alt="register illustration"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                bgcolor: "#0f5a97e7",
              }}
            />
          </Box>

          {/* الجزء اليمين - الفورم */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* العنوان والوصف */}
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Create New Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join us to track orders, save favorites, and get special offers.
              </Typography>
            </Box>

            {/* أزرار السوشال */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="flex-start"
            >
              <Button
                variant="outlined"
                size="small"
                sx={{ textTransform: "none", flex: 1 }}
              >
                Facebook
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ textTransform: "none", flex: 1 }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ textTransform: "none", flex: 1 }}
              >
                Apple ID
              </Button>
            </Stack>

            {/* or */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="caption" color="text.secondary">
                or
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* الفورم */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              {serverError && (
                <Typography color="error" variant="body2">
                  {serverError}
                </Typography>
              )}

              {/* صف فيه حقلين زي First/Last في التصميم */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  {...register("fullName")}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
                <TextField
                  {...register("userName")}
                  label="User Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                />
              </Box>

              {/* Email */}
              <TextField
                {...register("email")}
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              {/* Password */}
              <TextField
                {...register("password")}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={
                  errors.password?.message || "Must be at least 8 characters long"
                }
              />

              {/* Phone Number */}
              <TextField
                {...register("phoneNumber")}
                label="Phone Number"
                variant="outlined"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />

              {/* زر إنشاء حساب */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{
                  mt: 1,
                  textTransform: "none",
                  borderRadius: 999,
                }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Create New Account"}
              </Button>
            </Box>

            {/* Login link تحت */}
            <Typography
              variant="body2"
              sx={{ textAlign: "center", mt: 2, color: "text.secondary" }}
            >
              Already have an Account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                underline="none"
                sx={{ fontWeight: 600 }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
