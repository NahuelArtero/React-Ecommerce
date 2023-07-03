import { Padding } from '@mui/icons-material';
import React from 'react'
import { Col,Form, Row } from "react-bootstrap";

const styles = {
  input:{
    marginBottom: '15px'
  }
};

const InputSearch = ({ search, handleChange }) => {
  return (
    <div className='input-container' style={{ padding: "15px" }}>
      <Row>
        <Col style={ styles.input} md={{ span:6, offset:3}}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={handleChange}
            />
          </Form>
        </Col>
      </Row>
      </div>
  )
}

export default InputSearch
