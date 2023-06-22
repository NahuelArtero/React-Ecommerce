import React, { useContext, useEffect, useState } from "react";
import { getProductsById } from "../Services/productsService";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Loader from "../Components/Loader";
import AlertCustom from "../Components/AlertCustom";
import { Button, Card } from "react-bootstrap";

const ProductDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const context = useContext(AuthContext);
  const [alertC, setAlertC] = useState({ variant: "", text: "" });

  const styles = {
    card: {
      width: "23rem",
      margin: "auto",
    },
  };

  useEffect(() => {
    const request = async () => {
      try {
        const response = await getProductsById(id);
        setProduct(response.data());
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    request();
  }, [id]);

  const handleClick = () => {
    setAlertC({
      variant: "success",
      text: "the product was added to cart",
    });
  };

  return (
    <Loader loading={loading}>
        <Card style={styles.card}>
          <Card.Img variant="top" src={product.thumbnail} />
          <Card.Body>
            <Card.Title>{product.product}</Card.Title>
            <Card.Text>$ {product.price}</Card.Text>
            <Card.Text>{product.description}</Card.Text>
            <AlertCustom {...alertC}></AlertCustom>
            {context.login && (
              <Button variant="outline-primary" onClick={handleClick}>
                BUY
              </Button>
            )}
          </Card.Body>
        </Card>
    </Loader>
  );
};

export default ProductDetails;
