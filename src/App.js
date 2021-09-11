import "./App.css";
import { useEffect, useState } from "react";
import "./styles/bootstrap5.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ListItem from "./components/ListItem";
import Add from "./components/Add";
import axios from "axios";

function App() {
  const url = "http://www.mocky.io/v2/5c3e15e63500006e003e9795";

  const [data, setData] = useState([]);
  const [normdata, setNormdata] = useState([]);
  // Fetch DATA
  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setData(response.data);
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
          <h1 className="jumbotron text-center mt-5 border border-primary rounded p-1">
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
