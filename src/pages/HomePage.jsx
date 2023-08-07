import React, { useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext";
import ProductItem from "../components/ProductItem";
import { Grid } from "@mui/material";
import Pagination from "../components/Pagination";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const { getProducts, products } = useProductContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        {products.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </Grid>
      <Box sx={{ width: "max-content", margin: "50px auto" }}>
        <Pagination />
      </Box>
    </div>
  );
};

export default HomePage;
