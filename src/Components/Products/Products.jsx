import Product from "../Product/Product";
import "./Products.css";
import InputSearch from "../InputSearch";
import Loader from "../Loader";
import useFetchProducts from "../../Utils/hooks/useFetchProducts";
import { useState } from "react";
import { Grid, Stack, Button } from "@mui/material";
import {NavigateNext, NavigateBefore} from '@mui/icons-material';

const Products = () => {
  const { loading, products, search, handleSearch } = useFetchProducts();

  const [currentPage, setCurrentPage] = useState(0);

  const filteredProducts = () => {
    if (search.length === 0) {
      return products.slice(currentPage, currentPage + 6);
    } else {
      return products
        .filter((product) =>
          product.data().product.toLowerCase().includes(search.toLowerCase())
        )
        .slice(currentPage, currentPage + 6);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 6);
  };

  const handleNextPage = () => {
    if (currentPage + 6 < products.length) {
      setCurrentPage(currentPage + 6);
    }
    console.log(products);
  };

  return (
    <Loader loading={loading}>
          <InputSearch search={search} handleChange={handleSearch} />
          <Stack spacing={2} direction="row">
          <Button variant="text" startIcon={<NavigateBefore />} onClick={handlePrevPage}>
            Prev
          </Button>
          <Button variant="text" endIcon={<NavigateNext />} onClick={handleNextPage}>
            Next
          </Button>
          </Stack>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filteredProducts().map((product) => (
              <Grid item xs={4} sm={4} md={4} key={product.id}>
                <Product
                  key={product.id}
                  thumbnail={product.data().thumbnail}
                  id={product.id}
                  product={product.data().product}
                  price={product.data().price}
                  description={product.data().description}
                />
              </Grid>
            ))}
      </Grid>
    </Loader>
  );
};

export default Products;
