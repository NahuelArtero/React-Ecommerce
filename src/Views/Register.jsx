import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonSpinner from "../Components/ButtonSpinner";
import { useForm } from "react-hook-form";
import { createUser } from "../Services/userService";
import AlertCustom from "../Components/AlertCustom";
import { registerMessage } from "../Utils/errorMessage";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const [alertC, setAlertC] = useState({ variant: "", text: "" });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await createUser(data);
      setLoading(false);
      setAlertC({
        variant: "success",
        text: "the register was successful",
        duration: 3000,
        link: "/login",
      });
    } catch (err) {
      console.log(err);
      setAlertC({
        variant: "danger",
        text: registerMessage[err.code] || "An error has occurred",
      });
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Card>
            <Card.Header>Create account</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <Form.Text className="text-muted">
                      The field is mandatory.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastname">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a lastname"
                    {...register("lastname")}
                  />
                  {errors.lastname && (
                    <Form.Text className="text-muted">
                      The field is mandatory.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
                    })}
                  />
                  {errors.email && (
                    <div>
                      <Form.Text className="text-muted">
                        {errors.email?.type === "required" && (
                          <span>The field is mandatory</span>
                        )}
                        {errors.email?.type === "pattern" && (
                          <span>Invalid format</span>
                        )}
                      </Form.Text>
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 12,
                    })}
                  />
                  {errors.password && (
                    <div>
                      <Form.Text className="text-muted">
                        {errors.password?.type === "required" && (
                          <span>The field is mandatory</span>
                        )}
                        {errors.password?.type === "minLength" && (
                          <span>Password requires at least 6 characters</span>
                        )}
                        {errors.password?.type === "maxLength" && (
                          <span>Password requires less than 12 characters</span>
                        )}
                      </Form.Text>
                    </div>
                  )}
                </Form.Group>
                <AlertCustom {...alertC}></AlertCustom>
                <div className="d-grid gap-2">
                <ButtonSpinner loading={loading}> Submit </ButtonSpinner>
                </div>
              </Form>
              <br />
              <Card.Link as={Link} to="/login">
                Sign in
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
