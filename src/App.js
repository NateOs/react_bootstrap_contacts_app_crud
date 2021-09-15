// packages
import "./App.css";
import axios from "axios";
import "./styles/bootstrap5.min.css";

// other imports
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setNormalisedData,
  setProductsData,
  deleteItem,
  saveItem,
  setPrices,
  setProducts,
} from "./redux/productsSlice";

// Components
import ListItem from "./components/ListItem";
import Add from "./components/Add";
import { Row, Col, Form } from "react-bootstrap";

function App() {
  const state = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [rdata, setrData] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);

  // Fetch DATA
  useEffect(() => {
    const url = "http://www.mocky.io/v2/5c3e15e63500006e003e9795";

    axios
      .get(url)
      .then(function (response) {
        // handle success
        setrData(response.data);
        // console.log("rdata", rdata);
        dispatch(setProductsData(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  // Creating iterables from state
  const stateProducts = [];
  const statePrices = [];

  setTimeout(() => {});

  return (
    <div>
      <Row>
        <Col>
          <h1 className="text-center mt-5 border rounded p-1">
            Item Price Manager
          </h1>
        </Col>
      </Row>
      <Row>
        <Col className="mx-auto" md={8}>
          {rdata ? (
            stateProducts.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  prices={statePrices}
                  deleteItem={deleteItem}
                />
              );
            })
          ) : (
            <p>Check internet conn</p>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Enter drugs</Form.Label>
              <Form.Control
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}></Form.Control>
              <Form.Label>Enter price</Form.Label>
              <Form.Control
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>
          </Form>
          <Add
            onClick={dispatch(
              saveItem({
                id: state?.products.length + 1,
                name: name,
                price: price,
              })
            )}></Add>
        </Col>
      </Row>
    </div>
  );
}

export default App;
