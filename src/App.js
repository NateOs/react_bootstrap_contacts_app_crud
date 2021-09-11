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
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [rdata, setrData] = useState([]);

  const url = "http://www.mocky.io/v2/5c3e15e63500006e003e9795";

  // Fetch DATA
  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        setrData(response.data);
        console.log(rdata);
        dispatch(setProductsData(response.data));

        // Normalising
        const price = new schema.Entity("prices", {});
        const product = new schema.Entity("products", {
          prices: [price],
        });
        const normalizedData = normalize(rdata, { products: [product] });
        dispatch(setNormalisedData(normalizedData.entities));
        console.log(normalizedData);
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
