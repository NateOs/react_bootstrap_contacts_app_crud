import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function ListItem() {
  return (
    <Row
      className="border border-secondary rounded p-2 text-center"
      onClick={() => {
        console.log("this is a list item");
      }}>
      <Col xs={6}>
        <h5>List Item 1</h5>
        <span className="mx-3">Price 1</span>
        <span className="mx-3">Price 2</span>
        <span className="mx-3">Price 3</span>
      </Col>
      <Col xs={6}>
        <Button className="btn btn-danger">Delete</Button>
      </Col>
    </Row>
  );
}
