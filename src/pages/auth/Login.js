import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { login } from "services/auth.service";
import { SAVE_TOKEN } from "commons/helpers";
import AutoPassLogin from "components/AutoPassLogin";
import { WrapperContext } from "App";

function Login() {
  const { setThisPlayer } = useContext(WrapperContext);
  const history = useHistory();
  const [form, setForm] = useState({ userName: "", password: "" });

  const [err, setErr] = useState("");

  const onChangeForm = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErr("");
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const response = await login(form);

    if (response.success) {
      SAVE_TOKEN(response.data.token);
      setThisPlayer(response.data);
      history.push("/list-room");
    } else {
      setErr(response.message);
    }
  };

  useEffect(() => {
    console.log("use effect login.js");
  }, []);
  return (
    <div className="login-register-bg">
      <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center text-left">
          <Col className="col-3 mt-5">
            <Form>
              <Form.Group controlId="formBasicUserName">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  placeholder="Enter userName"
                  size="sm"
                  value={form.userName}
                  onChange={onChangeForm}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  size="sm"
                  value={form.password}
                  onChange={onChangeForm}
                />
              </Form.Group>
              {err && (
                <p className="text-danger" style={{ fontSize: "75%" }}>
                  {err}
                </p>
              )}
              <Button
                variant="primary"
                size="sm"
                type="submit"
                onClick={onLogin}
                block
              >
                Login
              </Button>
              <div>Don't have an account?</div>
              <Link to="/register">Register here!</Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AutoPassLogin(Login);
