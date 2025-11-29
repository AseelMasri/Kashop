import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginSchema from "../../validations/LoginSchema";
import {
  useNavigate,
  useOutletContext,
  Link as RouterLink,
} from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(""); // ⭐

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setIsError("");

      const response = await axios.post(
        "https://kashop1.runasp.net/api/Identity/Account/Login",
        data
      );

      if (response.status === 200) {
        localStorage.setItem("userToken:", response.data.token);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.log("catch error:", error);

      const status = error?.response?.status;
      const apiMsg =
        error?.response?.data?.message

      if (status === 400) {
        setIsError(apiMsg || "An unexpected error occurred. Please try again later.");
      } else if (status === 401) {
        setIsError(apiMsg || "Unauthorized. Please login again.");
      } else if (status === 404) {
        setIsError(apiMsg || "Resource not found.");
      } else if (status === 500) {
        setIsError(apiMsg || "Server error. Please try again later.");
      } else {
        setIsError(apiMsg || "Network error. Please check your internet connection.");
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
            mt:3,
          }}
        >
          {/* الصورة */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              component="img"
              src="/images/login.png"
              alt="login"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                bgcolor: "#0f5a97e7",
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
            <Typography variant="h5" fontWeight={600}>
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Good to see you again!
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Button variant="outlined" fullWidth>Facebook</Button>
              <Button variant="outlined" fullWidth>Google</Button>
              <Button variant="outlined" fullWidth>Apple ID</Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="caption" color="text.secondary">
                or
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              <TextField
                {...register("email")}
                label="Email Address"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                {...register("password")}
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}

              <Box sx={{ textAlign: "right" }}>
                <Typography
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                  sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 1 }}>
              <Typography variant="body2">
                Don’t Have an Account?{" "}
                <Typography
                  component={RouterLink}
                  to="/register"
                  variant="body2"
                  sx={{ fontWeight: 600, textDecoration: "none" }}
                >
                  Create Account
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
