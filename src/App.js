// packages
import "./App.css";
import "./styles/bootstrap5.min.css";

// other imports
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setState, addNewItem, getItemInfo } from "./redux/productsSlice";

// Components
import ListItem from "./components/ListItem";
import { Row, Col, Form, Button } from "react-bootstrap";

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
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <h1 className="text-center mt-5 border rounded p-1">Contacts App</h1>
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
                  onclick={() => dispatch(getItemInfo(id))}
                  id={id}></ListItem>
              );
            })
          ) : (
            <p>Error encountered, check internet</p>
          )}
          <Form>
            <Form.Group>
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                required
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}></Form.Control>
              <Form.Label>Enter Phone number</Form.Label>
              <Form.Control
                required
                type="tel"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>
          </Form>
          <Button
            className="btn btn-block mt-3"
            type="submit"
            onClick={() =>
              dispatch(
                addNewItem({
                  id: products.length + 1,
                  name: name,
                  prices: price,
                }),
              )
            }>
            Add New Item
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default App;
