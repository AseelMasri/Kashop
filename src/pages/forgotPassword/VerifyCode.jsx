// src/pages/forgotPassword/VerifyCode.jsx
import {
  Box,
  Typography,
  Container,
  Button,
  Divider,
  Stack,
  OutlinedInput,
  Link,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const FORGOT_PASSWORD_URL =
  "https://kashop1.runasp.net/api/Identity/Account/forgot-password";

// مدة التايمر ثابتة (لأن الباك لا يرجّع expiresIn)
const TIMER_DURATION = 4 * 60 + 29;

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();

  // جايين من صفحة Forgotpassword
  const emailFromState = location.state?.email || "";

  // 4 خانات للكود
  const [codeDigits, setCodeDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  // تايمر
  const [secondsLeft, setSecondsLeft] = useState(TIMER_DURATION);

  // لو ما في إيميل (فتح الصفحة مباشرة)
  useEffect(() => {
    if (!emailFromState) navigate("/forgot-password");
  }, [emailFromState, navigate]);

  // تشغيل التايمر
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...codeDigits];
    next[index] = value;
    setCodeDigits(next);
    setError("");

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = codeDigits.join("");
    if (code.length < 4) {
      setError("Please enter the 4-digit code.");
      return;
    }

    // لاحقاً التحقق عند الباك
    navigate("/reset-password", {
      state: {
        code,
        email: emailFromState,
      },
    });
  };

  const handleResend = async () => {
    if (!emailFromState) {
      setError("Missing email. Please go back and try again.");
      return;
    }

    try {
      setError("");

      await axios.post(FORGOT_PASSWORD_URL, { email: emailFromState });

      // إعادة التايمر
      setSecondsLeft(TIMER_DURATION);

      // تفريغ الخانات
      setCodeDigits(["", "", "", ""]);
      inputsRef.current[0]?.focus();
    } catch (err) {
      console.log("resend error:", err);

      const status = err?.response?.status;
      const apiMsg = err?.response?.data?.message;

      if (status === 400) setError(apiMsg || "Invalid email.");
      else if (status === 404) setError("Email not found.");
      else setError("Failed to resend code. Please try again.");
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
              alt="verify code"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                bgcolor: "#6A1B9A",
              }}
            />
          </Box>

          {/* الشق الأيمن */}
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
              Step 2
            </Typography>

            <Typography variant="h6" fontWeight={600}>
              Enter Verification Code
            </Typography>

            <Typography variant="body2" color="text.secondary">
              We have sent OTP code via email, please enter it below to reset
              your password.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="caption" color="text.secondary">
                Code
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* فورم */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {/* خانات الكود */}
              <Stack direction="row" spacing={2} justifyContent="center">
                {codeDigits.map((digit, idx) => (
                  <OutlinedInput
                    key={idx}
                    inputRef={(el) => (inputsRef.current[idx] = el)}
                    value={digit}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    inputProps={{
                      maxLength: 1,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      style: {
                        textAlign: "center",
                        fontSize: "1.6rem",
                        padding: 0,
                      },
                    }}
                    sx={{
                      width: 64,
                      height: 64,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: 2,
                      },
                    }}
                  />
                ))}
              </Stack>

              {/* التايمر + resend */}
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ color: "#F97316", fontWeight: 600 }}>
                  {minutes}:{seconds}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  Didn’t get a code?{" "}
                  <Link
                    component="button"
                    onClick={handleResend}
                    underline="always"
                    sx={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      p: 0,
                      font: "inherit",
                    }}
                  >
                    Resend code
                  </Link>
                </Typography>
              </Box>

              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  textAlign="center"
                >
                  {error}
                </Typography>
              )}

              <Button variant="contained" size="large" fullWidth type="submit">
                Continue
              </Button>
            </Box>

            {/* Login link */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">
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
        </Box>
      </Container>
    </Box>
  );
}
