import "./App.css";
import { useEffect, useState } from "react";
import "./styles/bootstrap5.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ListItem from "./components/ListItem";
import Add from "./components/Add";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setNormalisedData, setProductsData } from "./redux/productsSlice";

function App() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const url = "http://www.mocky.io/v2/5c3e15e63500006e003e9795";

  // Fetch DATA
  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.data);
        dispatch(setProductsData(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <h1 className=" text-center mt-5 border rounded p-1">
            Item Price Manager
          </h1>
        </Col>
      </Row>
      <Row>
        <Col className="mx-auto" md={8}>
          <ListItem></ListItem>
          <Add></Add>
        </Col>
      </Row>
    </div>
  );
}

export default App;
