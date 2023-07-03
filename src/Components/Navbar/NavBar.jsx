import React, { useContext } from "react";
import "./NavBar.css"
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../../Context/AuthContext";
import { red } from "@mui/material/colors";
import { Avatar } from "@mui/material";

const NavBar = () => {
  const context = useContext(AuthContext);
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            e-C
          </Avatar>
          ommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/" className="navLink">
              {" "}
              Home{" "}
            </Nav.Link>
            {!context.login && (
              <>
                <Nav.Link as={Link} to="/register" className="navLink">
                  {" "}
                  Register{" "}
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="navLink">
                  {" "}
                  Login{" "}
                </Nav.Link>
              </>
            )}
            {context.login && (
              <>
                <NavDropdown title="Products" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/product/new">
                    Add Product
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={context.handleLogout} className="navLink"> Logout </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {context.login && (
          <div>
            <h3> Welcome {context.user.name} </h3>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
