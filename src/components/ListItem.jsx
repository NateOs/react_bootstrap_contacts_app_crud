import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function ListItem({ item, prices }) {
  const { name, id } = item;
  console.log(id);

  return (
    <Row
      className="border border-secondary rounded p-2 text-center"
      onClick={() => {
        console.log("this is a list item");
      }}>
      <Col xs={10}>
        <h5>{name}</h5>
        {prices.map((price) => {
          if (price.id === id)
            return <span className="mx-3">{price.price}</span>;
        })}
        {/* <span className="mx-3">Price 2</span>
        <span className="mx-3">Price 3</span> */}
      </Col>
      <Col xs={2}>
        <Button className="btn btn-danger">Delete</Button>
      </Col>
    </Row>
  );
}
