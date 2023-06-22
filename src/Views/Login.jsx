import React, { useContext, useState } from "react";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { login, signInWithGoogle } from "../Services/userService";
import { Link, useNavigate } from "react-router-dom";
import { loginMessage } from "../Utils/errorMessage";
import AlertCustom from "../Components/AlertCustom";
import { AuthContext } from "../Context/AuthContext";
import { Card, Col, Container, Row } from "react-bootstrap";
import ButtonSpinner from "../Components/ButtonSpinner";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [alertC, setAlertC] = useState({ variant: "", text: "" });
  const context = useContext(AuthContext);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await login(data.email, data.password);
      setLoading(false);
      console.log(user);
      context.handleLogin(user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setAlertC({
        variant: "danger",
        text: loginMessage[err.code] || "An error has occurred",
        duration: 3000,
      });
      setLoading(false);
    }
  };

  // const onGoogleSignIn = () => {
  //   // signInWithGoogle
  // }
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Card >
            <Card.Header>Login</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
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
                <ButtonSpinner loading={loading}> Submit </ButtonSpinner>{' '}
                {/* <Button onClick={onGoogleSignIn}> Sign in with Google </Button> */}
                </div>
              </Form>
              <br />
              Don't have an account?
              <br />
              <Card.Link as={Link} to="/register">
                Create account
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
