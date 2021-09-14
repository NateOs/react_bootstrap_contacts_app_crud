// packages
import "./App.css";
import axios from "axios";
import "./styles/bootstrap5.min.css";
import ObjectID from "bson-objectid";

// other imports
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { normalize, schema } from "normalizr";
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
  const normState = useSelector((state) => state.products.normalisedState);
  const dispatch = useDispatch();
  // console.log(normState);

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

        // Normalising
        const price = new schema.Entity("prices", {});
        const product = new schema.Entity("products", {
          prices: [price],
        });
        const normalizedData = normalize(response.data, {
          products: [product],
        });
        // Set
        dispatch(setNormalisedData(normalizedData.entities));
        dispatch(setProducts(normalizedData.entities.products));
        dispatch(setPrices(normalizedData.entities.prices));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (name && price) {
  //     const item = { name: name, price: price };
  //   } else {
  //     alert("Invalid input");
  //   }
  // };

  // console.log("products", normState.products);
  // console.log("prices", normState.prices);

  // Creating iterables from state
  const stateProducts = [];
  const statePrices = [];

  if (normState.products && normState.prices) {
    Object.values(normState.products).forEach((val) => stateProducts.push(val));
    Object.values(normState.prices).forEach((val) => statePrices.push(val));
  }

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
                id: ObjectID().toHexString(),
                name: { name },
                price: { price },
              })
            )}></Add>
        </Col>
      </Row>
    </div>
  );
}

export default App;
