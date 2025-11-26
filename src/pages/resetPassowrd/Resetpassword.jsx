// src/pages/forgotPassword/Resetpassword.jsx

import {
  Box,
  Typography,
  Container,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ResetPasswordSchema from "../../validations/ResetPasswordSchema";

import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RESET_PASSWORD_URL =
  "https://kashop1.runasp.net/api/Identity/Account/reset-password";

export default function Resetpassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // جاي من Verify Code
  const codeFromState = location.state?.code || "";
  const emailFromState = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // إظهار / إخفاء الباسورد
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // إذا المستخدم دخل الصفحة مباشرة أو عمل refresh
  useEffect(() => {
    if (!emailFromState || !codeFromState) {
      navigate("/forgot-password");
    }
  }, [emailFromState, codeFromState, navigate]);

  const onSubmit = async (data) => {
    setServerError("");

    try {
      setIsLoading(true);

      const payload = {
        newPassword: data.newPassword,
        code: codeFromState,
        email: emailFromState,
      };

      console.log("RESET PAYLOAD:", payload);

      const response = await axios.patch(RESET_PASSWORD_URL, payload);

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log("reset-password error:", error);

      const status = error?.response?.status;
      const apiMsg = error?.response?.data?.message;

      if (status === 400) {
        setServerError(apiMsg || "Invalid reset code.");
      } else if (status === 404) {
        setServerError("User not found.");
      } else {
        setServerError("Something went wrong. Please try again.");
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
          {/* الصورة يسار */}
          <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
            <Box
              component="img"
              src="/images/login.png"
              alt="reset password"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                bgcolor: "#6A1B9A",
              }}
            />
          </Box>

          {/* الجانب الأيمن */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: "#6A1B9A", fontWeight: 600 }}
            >
              Step 3
            </Typography>

            <Typography variant="h6" fontWeight={600}>
              Set a New Password
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Create a strong password to secure your account.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="caption" color="text.secondary">
                Reset Password
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* الفورم */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {/* New Password */}
              <FormControl
                variant="outlined"
                fullWidth
                error={!!errors.newPassword}
              >
                <InputLabel htmlFor="new-password">New Password</InputLabel>
                <OutlinedInput
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  label="New Password"
                  {...register("newPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        sx={{ background: "transparent !important" }}
                      >
                        {showPassword ? (
                          <Visibility sx={{ color: "#444" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "#444" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.newPassword && (
                  <FormHelperText error>
                    {errors.newPassword.message}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Confirm Password */}
              <FormControl
                variant="outlined"
                fullWidth
                error={!!errors.confirmPassword}
              >
                <InputLabel htmlFor="confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  label="Confirm Password"
                  {...register("confirmPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirm((prev) => !prev)}
                        edge="end"
                        sx={{ background: "transparent !important" }}
                      >
                        {showConfirm ? (
                          <Visibility sx={{ color: "#444" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "#444" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.confirmPassword && (
                  <FormHelperText error>
                    {errors.confirmPassword.message}
                  </FormHelperText>
                )}
              </FormControl>

              {serverError && (
                <Typography color="error" variant="body2">
                  {serverError}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{ mt: 1 }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Reset Password"}
              </Button>
            </Box>

            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Remembered your password?{" "}
              <Typography
                component={RouterLink}
                to="/login"
                sx={{ fontWeight: 600, textDecoration: "none" }}
              >
                Log in
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
