import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";

export default function UpdateForm({ show, handleClose }) {
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
              <Form.Control required name="name"></Form.Control>
              <Form.Label>Enter price</Form.Label>
              <Form.Control required type="number" name="price"></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
