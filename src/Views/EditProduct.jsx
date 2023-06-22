import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { deleteProduct, editProduct, getProductsById } from '../Services/productsService';
import { useParams } from 'react-router-dom';
import AlertCustom from '../Components/AlertCustom';

const EditProduct = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({ mode: "onChange" });
  const [alertC,setAlertC] = useState({ variant: "", text: "" });

  useEffect(() => {
    const result = async () => {
      try {
        const response = await getProductsById(id)
        setValue("product", response.data().product);
        setValue("price", response.data().price);
        setValue("description", response.data().description);
        setValue("thumbnail", response.data().thumbnail);
      } catch (e) {
        console.log(e);
      }
    };
    result();
  }, [id, setValue]);


  const onSubmit = async (data) => {
    try {
      const productDocument = await editProduct(id, data)
      setAlertC({
        variant: "success",
        text: "the changes was added",
        duration: 3000,
        link: "/",
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleClickDelete = async () => {
    try {
      const response = await deleteProduct(id);
      setAlertC({
        variant: "danger",
        text: "the product was delete",
        duration: 3000,
        link: "/",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Edit</h1>
      <Form.Group className="mb-3" controlId="formBasicProduct">
        <Form.Label>Product</Form.Label>
        <Form.Control
          type="text"
          placeholder="Product"
          {...register("product")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Price"
          {...register("price")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          {...register("description")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Photo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Photo"
          {...register("thumbnail")}
        />
      </Form.Group>
      <AlertCustom {...alertC}></AlertCustom>
      <Button variant="primary" type="submit">
        Save
      </Button>{' '}
      <Button variant="danger" onClick={handleClickDelete}>
        Delete
      </Button>
    </Form>
  )
}

export default EditProduct
