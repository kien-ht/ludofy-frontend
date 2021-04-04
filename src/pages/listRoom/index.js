import "./style.css";
import React, { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import WithAuth from "components/WithAuth";
import { useHistory } from "react-router";
import { WrapperContext } from "App";

function ListRoom() {
  const history = useHistory();

  const { logout } = useContext(WrapperContext);

  return (
    <div className="list-room-bg">
      <div className="p-5">
        <Row>
          <Col>
            <h1 className="text-uppercase text-warning">
              list room, coming soon!
            </h1>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-around">
            <Button onClick={logout} className="text-uppercase btn-danger">
              log out
            </Button>
            <Button
              onClick={() => history.push("/waiting-room")}
              className="text-uppercase"
            >
              go to the waiting room
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WithAuth(ListRoom);
