import React from 'react'
import Layout from '../components/layout'
import Box from '@mui/material/Box';

const NoPageFound = () => {
  return (
    <Layout  title={"NoPageFound -Ecommerce app"}>
      <Box sx={{marginTop:"250px",marginLeft:"700px"}}>
    <h1 style={{ fontSize: "5rem", margin:"1px", fontWeight: 700 }}>404</h1>
    <h2 style={{ fontSize: "2rem", margin: "1rem 0" }}>Oops! Page Not Found</h2>
   < button
      style={{
        padding: "0.75rem 2rem",
        fontSize: "1rem",
        background: "#333",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "1rem",
      }}
      onClick={() => window.history.back()}
    >
      Go Back
    </button>
    </Box>
    </Layout>
  )
}

export default NoPageFound
