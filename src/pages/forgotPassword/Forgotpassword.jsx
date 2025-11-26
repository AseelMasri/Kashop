import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  CircularProgress,
  Divider,
  Link, // 👈 تمت إضافتها
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ForgotPasswordSchema from "../../validations/ForgotPasswordSchema";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Forgotpassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMsg("");

    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://kashop1.runasp.net/api/Identity/Account/forgot-password",
        data
      );

      if (response.status === 200) {
        // المدة ثابتة من الفرونت (4:29)
        const expiresIn = 4 * 60 + 29;

        setSuccessMsg("Reset code has been sent to your email.");

        navigate("/verify-code", {
          state: {
            email: data.email,
            expiresIn,
          },
        });
      }
    } catch (error) {
      const status = error?.response?.status;
      const apiMsg = error?.response?.data?.message;

      if (status === 400) {
        setServerError(apiMsg || "Invalid email.");
      } else if (status === 404) {
        setServerError("Email not found.");
      } else {
        setServerError("Something went wrong. Try again later.");
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
          {/* الصورة */}
          <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
            <Box
              component="img"
              src="/images/login.png"
              alt="forgot"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                bgcolor: "#6A1B9A",
              }}
            />
          </Box>

          {/* الفورم */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Step 1
            </Typography>
            <Typography variant="h5" fontWeight={600}>
              Forgot Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your email and you'll receive a reset code.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="caption" color="text.secondary">
                Email Verification
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Email Address"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              {serverError && (
                <Typography color="error">{serverError}</Typography>
              )}

              {successMsg && (
                <Typography color="success.main">{successMsg}</Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Send Code"}
              </Button>
            </Box>

            {/* 🚀 الرابط المعدل */}
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Remembered your password?{" "}
              <Link
                component={RouterLink}
                to="/login"
                underline="none"
                sx={{ fontWeight: 600 }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
