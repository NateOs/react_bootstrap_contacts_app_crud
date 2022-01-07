import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updatePrice } from "../redux/productsSlice";

export default function UpdateForm({ show, handleClose, id }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [price, setPrice] = useState('0200123456');
  console.log(handleClose);
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
  
      <div onClick={(e) => e.stopPropagation()}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Enter contact</Form.Label>
                <Form.Control
                  name="name"
                  value={editableItem.name}></Form.Control>
                <Form.Label>Enter phone</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => dispatch(updatePrice({ id, newPrice: price }))}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
