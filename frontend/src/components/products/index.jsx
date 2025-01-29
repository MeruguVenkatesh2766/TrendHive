import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomSelect from "./CustomSelect";
import CustomTabs from "./CustomTabs";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  Button,
  CardActionArea,
  TextField,
} from "@mui/material";
import {
  getAllProducts,
  selectAllProducts,
} from "../../store/slices/productSlice";
import {
  getAllCategories,
  selectAllCategories,
} from "../../store/slices/categorySlice";

const ProductsPage = () => {
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);
  const productsStatus = useSelector((state) => state.product.status);
  const categoryStatus = useSelector((state) => state.category.status);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [error, setError] = useState(null);

  const tabsArr = useMemo(() => ["all", ...categories.map((e) => e.title)], []);
  const [tabsValue, setTabsValue] = useState(0);
  const handleChangeTabsValue = (event, newValue) => {
    setTabsValue(newValue);
  };

  const [searchValue, setSearchValue] = useState("");
  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(getAllProducts());
    } else if (productsStatus !== "success") {
      setError("Failed to load products.");
    }
  }, [productsStatus, dispatch]);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(getAllCategories());
    }
  }, [categoryStatus, dispatch]);

  useEffect(() => {
    if (tabsValue == 0)
      setFilteredProducts(
        products.filter((product) =>
          product["title"].toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    else {
      setFilteredProducts(
        products.filter(
          (product) =>
            categories.find((cat) => cat["id"] == product["category"])?.title ==
            tabsArr[tabsValue]
        )
      );
    }
  }, [tabsValue, searchValue]);

  if (!productsStatus) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2, paddingTop: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <CustomTabs
          options={tabsArr}
          tabsValue={tabsValue}
          handleChangeTabsValue={handleChangeTabsValue}
        />
        {/* <CustomSelect options={categories.map(e=>e.title)}/> */}
        <TextField
        sx={{width:'30%'}}
          id="outlined-basic"
          size="small"
          label="Search product"
          variant="outlined"
          value={searchValue}
          onChange={handleChangeSearchValue}
        />
      </Box>
      <Grid container spacing={3} alignItems="stretch">
        {console.log("FILTPRODS", filteredProducts)}
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                height: "100%",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardActionArea sx={{ flexGrow: 1 }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    height: 300,
                    width: "100%",
                    objectFit: "fill",
                    display: "block",
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    {product.brand}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 1 }}
                  >
                    {product.description.length > 50
                      ? `${product.description.substring(0, 50)}...`
                      : product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ padding: "16px" }}>
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
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
