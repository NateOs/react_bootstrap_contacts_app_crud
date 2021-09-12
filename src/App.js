// packages
import "./App.css";
import axios from "axios";
import "./styles/bootstrap5.min.css";

//other imports
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNormalisedData, setProductsData } from "./redux/productsSlice";
import { normalize, schema } from "normalizr";

// Components
import ListItem from "./components/ListItem";
import Add from "./components/Add";
import { Row, Col } from "react-bootstrap";

function App() {
  const normState = useSelector((state) => state.products.normalisedState);
  const dispatch = useDispatch();
  console.log(normState);

  const [rdata, setrData] = useState([]);

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
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  console.log("products", normState.products);
  console.log("prices", normState.prices);

  // Creating iterables from state
  const stateProducts = [];
  const statePrices = [];

  if (normState.products && normState.prices) {
    Object.values(normState.products).forEach((val) => stateProducts.push(val));
    Object.values(normState.prices).forEach((val) => statePrices.push(val));
  }

  console.log("statePrices", statePrices);
  const { name, id } = stateProducts;
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
          {stateProducts.map((item) => {
            return <ListItem key={item.id} item={item} />;
          })}
          <Add></Add>
        </Col>
      </Row>
    </div>
  );
}

export default App;
