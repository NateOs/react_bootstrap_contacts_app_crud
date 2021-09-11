import "./App.css";
import "./styles/bootstrap5.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ListItem from "./components/ListItem";
import Add from "./components/Add";

function App() {

  // Fetch DATA
  
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
