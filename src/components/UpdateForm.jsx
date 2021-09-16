import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updatePrice } from "../redux/productsSlice";

export default function UpdateForm({ show, handleClose, logSomething, id }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [price, setPrice] = useState(0.0);

  // Getting Item
  const editableItem = products.find((product) => {
    if (product.id === id) {
      return product;
    }
  });

  // Latest Price
  let lastIndex = editableItem.length - 1;
  const latestPrice = editableItem.prices[lastIndex];
  console.log(latestPrice);
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Update Price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Enter drugs</Form.Label>
              <Form.Control
                name="name"
                value={editableItem.name}></Form.Control>
              <Form.Label>Enter price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => logSomething()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => dispatch(updatePrice({ id, newPrice: price }))}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
// Onclick of list item ,get item values by id
// populate fields
// edit items
