import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import { AuthContext } from "../../Context/AuthContext";

const Product = ({ id, product, price, description, thumbnail }) => {
  const context = useContext(AuthContext);
  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            e-C
          </Avatar>
        }
        title=<h5>{product}</h5>
      />
      <CardMedia component="img" height="250" image={thumbnail} />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          $ {price}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Stack spacing={2} direction="row">
          <Button variant="text" as={Link} to={`/product/${id}`}>
            Details
          </Button>
          {context.login && (
            <Button variant="text" as={Link} to={`/product/edit/${id}`}>
              Edit
            </Button>
          )}
          <IconButton aria-label="add to favorites"></IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Product;
