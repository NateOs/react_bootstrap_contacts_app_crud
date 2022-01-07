import { React, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { deleteItem } from "../redux/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { saveItem } from "../redux/productsSlice";
import UpdateForm from "./UpdateForm.jsx";

export default function ListItem({ name, id, prices }) {
  const dispatch = useDispatch();
  const recentPrice = prices[prices.length - 1];

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Row
        className="border border-secondary rounded p-2 text-left onHover"
        onClick={handleShow}>
        <Col xs={10}>
          <h5>{name}</h5>
          {}
          <span className="mx-3">{recentPrice.price}</span>
        </Col>
        <Col xs={2}>
          <Button
            className="btn btn-danger"
            onClick={() => {
              dispatch(deleteItem(id));
              dispatch(saveItem());
            }}>
            Delete
          </Button>
        </Col>
        <UpdateForm show={show} handleClose={handleClose} id={id} />
      </Row>
    </>
  );
}
