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
  setState,
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
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);

  // Fetch DATA
  useEffect(() => {
    const url = "http://www.mocky.io/v2/5c3e15e63500006e003e9795";

    const dataInStorage =
      JSON.parse(localStorage.getItem("productsState")) || [];

    if (dataInStorage.length > 0) {
      setError(false);
      setIsLoading(false);
      dispatch(setState(dataInStorage));
    }

    if (dataInStorage.length < 1) {
      axios
        .get(url)
        .then(function (response) {
          // handle success
          dispatch(setProductsData(response.data));
          setIsLoading(false);
          setError(false);
        })
        .catch(function (error) {
          // handle error
          setError(true);
        });
    }
  }, []);

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
          {!isLoading ? (
            products.map((item, index) => {
              const { name, id, prices } = item;
              return (
                <ListItem
                  key={id}
                  name={name}
                  prices={prices}
                  id={id}></ListItem>
              );
            })
          ) : (
            <p>Error encountered, check internet</p>
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
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>
          </Form>
          <Add
          // onClick={dispatch(
          //   saveItem({
          //     id: products.length + 1,
          //     name: name,
          //     price: price,
          //     date: new Date()
          //   })
          // )}
          ></Add>
        </Col>
      </Row>
    </div>
  );
}

export default App;
