// src/components/hero/HeroHome.jsx
import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HeroHome() {
    return (
        <Box
            component="section"
            sx={{
                mt: { xs: 3, md: 5 },
                opacity: 0,
                animation: "fadeIn 1s forwards",
                "@keyframes fadeIn": {
                    from: { opacity: 0 },
                    to: { opacity: 1 }
                }
            }}
        >
            {/* Hero Block */}
            <Box
                sx={{
                    position: "relative",
                    minHeight: { xs: "60vh", md: "80vh" },
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    backgroundImage:
                        "linear-gradient(120deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25)), url('/images/HeroHome.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 4,
                    overflow: "hidden",
                    px: { xs: 3, md: 6 },
                    py: { xs: 6, md: 10 },
                }}
            >
                {/* TEXT BOX */}
                <Box
                    sx={{
                        maxWidth: { xs: "100%", md: 520 },
                        display: "flex",
                        flexDirection: "column",
                        gap: 2.5,
                        transform: "translateY(30px)",
                        opacity: 0,
                        animation: "slideUp 1s 0.4s forwards",
                        "@keyframes slideUp": {
                            from: { opacity: 0, transform: "translateY(30px)" },
                            to: { opacity: 1, transform: "translateY(0)" }
                        }
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "2.2rem", md: "3rem" },
                        }}
                    >
                        Welcome to KA Shop
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 400,
                            lineHeight: 1.8,
                            color: "rgba(255,255,255,0.9)",
                        }}
                    >
                        Discover a simple and fast online shopping experience with the latest
                        products, clean design, and smooth navigation across all devices.
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ color: "rgba(255,255,255,0.85)" }}
                    >
                        Browse categories, compare prices, and complete your order in just a
                        few clicks from any device.
                    </Typography>

                    {/* BUTTONS */}
                    <Box
                        sx={{
                            mt: 2.5,
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                            opacity: 0,
                            animation: "fadeButtons 1s 0.8s forwards",
                            "@keyframes fadeButtons": {
                                from: { opacity: 0 },
                                to: { opacity: 1 }
                            }
                        }}
                    >
                        <Button
                            component={RouterLink}
                            to="/products"
                            variant="contained"
                            sx={{
                                px: 4,
                                py: 1.2,
                                borderRadius: 999,
                                fontWeight: 600,
                                backgroundColor: "#35C3C9",
                                color: "#fff",
                                textTransform: "none",
                                position: "relative",
                                overflow: "hidden",

                                // Hover
                                "&:hover": {
                                    backgroundColor: "#26a4aa",
                                    boxShadow: "0 0 20px rgba(53,195,201,0.6)",
                                },

                                //  Glow Animation
                                animation: "pulseGlow 2.2s infinite ease-in-out",

                                "@keyframes pulseGlow": {
                                    "0%": {
                                        boxShadow: "0 0 0px rgba(53,195,201,0.0)",
                                    },
                                    "50%": {
                                        boxShadow: "0 0 18px rgba(53,195,201,0.7)",
                                    },
                                    "100%": {
                                        boxShadow: "0 0 0px rgba(53,195,201,0.0)",
                                    },
                                },
                            }}
                        >
                            Shop Now
                        </Button>


                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
