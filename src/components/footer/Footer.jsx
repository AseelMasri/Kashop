// src/components/footer/Footer.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Button,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        bgcolor: "#111111",
        color: "#ffffff",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* الأعلى */}
        <Grid
          container
          spacing={4}
          columnGap={12}
          justifyContent="flex-start"
        >
          {/* Follow Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{ fontWeight: 600, mb: 2, fontSize: 16 }}
            >
              Follow Us
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5 }}>
              {[InstagramIcon, PinterestIcon, TwitterIcon, MailOutlineIcon].map(
                (Icon, i) => (
                  <IconButton
                    key={i}
                    size="medium"
                    sx={{
                      border: "1px solid #40dfc4",
                      borderRadius: "50%",
                      color: "#40dfc4",
                      width: 40,
                      height: 40,
                      "&:hover": {
                        bgcolor: "rgba(64,223,196,0.1)",
                      },
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                )
              )}
            </Box>
          </Grid>

          {/* Our Product */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ fontWeight: 600, mb: 2, fontSize: 16 }}>
              Our Product
            </Typography>
            {[
              "All Products",
              "Laptops",
              "Headphones",
              "Smartphones",
              "PlayStation",
              "Smartwatch",
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  mb: 0.7,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.75)",
                  cursor: "pointer",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ fontWeight: 600, mb: 2, fontSize: 16 }}>
              Links
            </Typography>
            {[
              "Terms & Conditions",
              "Privacy Policy",
              "Refund & Return Policy",
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  mb: 0.7,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.75)",
                  cursor: "pointer",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Site Pages */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ fontWeight: 600, mb: 2, fontSize: 16 }}>
              Site Pages
            </Typography>

            {[
              { label: "Homepage", to: "/" },
              { label: "About KA Store", to: "/about" },
              { label: "Shop", to: "/shop" },
              { label: "Contact Us", to: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                component={RouterLink}
                to={link.to}
                underline="none"
                sx={{
                  display: "block",
                  mb: 0.7,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.75)",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>
        </Grid>

        {/* الخط */}
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.16)" }} />
        </Box>

        {/* الأسفل */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          {/* اليسار: الوقت + الأيقونات + Location */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {/* الوقت */}
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                Sunday to Thursday
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                09 AM — 07 PM
              </Typography>
            </Box>

            {/* الأيقونات + Location */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {[
                <PhoneInTalkOutlinedIcon />,
                <EmailOutlinedIcon />,
                <RoomOutlinedIcon />,
              ].map((icon, i) => (
                <IconButton
                  key={i}
                  size="small"
                  sx={{
                    border: "1px solid rgba(255,255,255,0.55)",
                    borderRadius: "50%",
                    color: "#ffffff",
                    width: 32,
                    height: 32,
                  }}
                >
                  {icon}
                </IconButton>
              ))}

              <Button
                size="small"
                startIcon={<RoomOutlinedIcon />}
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  fontSize: 12,
                  px: 3,
                  bgcolor: "#2e2e2e",
                  color: "#ffffff",
                  "&:hover": {
                    bgcolor: "#3a3a3a",
                  },
                }}
              >
                Location
              </Button>
            </Box>
          </Box>

          {/* اليمين: حقوق النشر */}
          <Typography
            sx={{
              fontSize: 11,
              color: "rgba(255,255,255,0.75)",
              mt: { xs: 1, md: 0 },
            }}
          >
            KA Store © 2025 | All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}