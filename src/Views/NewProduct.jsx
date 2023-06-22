import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { addProduct } from '../Services/productsService';
import ButtonSpinner from '../Components/ButtonSpinner';
import AlertCustom from '../Components/AlertCustom';

const NewProduct = () => {

    const {
        register,
        handleSubmit,
    } = useForm({ mode: "onChange" });
    const [loading,setLoading] = useState(false);
    const [alertC,setAlertC] = useState({ variant: "", text: "" });
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const productDocument = await addProduct(data)
            setLoading(false);
            setAlertC({
                variant: "success",
                text: "the product was added",
                duration: 3000,
                link: "/",
              });
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>Add a Product</h1>
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
            <ButtonSpinner loading={loading}> Save </ButtonSpinner>
        </Form>
    )
}

export default NewProduct
