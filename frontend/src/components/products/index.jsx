import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import axios from "axios";
import { Grid, Card, CardContent, CardMedia, Typography, Box, CircularProgress, Button, CardActionArea } from "@mui/material";
import { getAllProducts, selectAllProducts } from "../../store/slices/productSlice";

const ProductsPage = () => {
  const products = useSelector(selectAllProducts);
  console.log("PRODUCTS", products)
  const productsStatus = useSelector((state) => state.category.status);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(getAllProducts());
    }
    else{
        setError("Failed to load products.");
    }
  }, [productsStatus, dispatch]);

  if (!productsStatus) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3} alignItems="stretch">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card 
              sx={{
                height: '100%',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardActionArea sx={{ flexGrow: 1 }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{ height: 300,width:'100%', objectFit: "fill",display: "block"}}
                />
                <CardContent sx={{display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',}}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                  >
                    {product.brand}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                  >
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ marginBottom: 1 }}
                  >
                    {product.description.length > 50 ? 
                      `${product.description.substring(0, 50)}...` : 
                      product.description
                    }
                  </Typography>
                  
                </CardContent>
              </CardActionArea>
              <Box sx={{ padding: '16px' }}>
                <Typography 
                  variant="subtitle1" 
                  color="text.primary" 
                  sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                >
                  ${product.price}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>

  );
};

export default ProductsPage;
