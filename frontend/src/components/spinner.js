import React, { useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Spinner() {
  const navigate = useNavigate();
  const location=useLocation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login",{ state: { from: location.pathname } });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate,location]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CircularProgress />
    </Box>
  );
}
