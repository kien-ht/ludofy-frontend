import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { makeRegister } from "services/auth.service";
import { SAVE_TOKEN } from "commons/helpers";
import AutoPassLogin from "components/AutoPassLogin";
import { WrapperContext } from "App";

function Register() {
  const { setThisPlayer } = useContext(WrapperContext);
  const history = useHistory();
  const [form, setForm] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState("");

  const onChangeForm = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErr("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 4) {
      setErr("Password can't be shorter than 4 characters!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErr("Passwords are not matched!");
      return;
    }
    const response = await makeRegister(form);

    if (response.success) {
      SAVE_TOKEN(response.data.token);
      setThisPlayer(response.data);
      history.push("/list-room");
    } else {
      setErr(response.message);
    }
  };

  return (
    <div className="login-register-bg">
      <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center text-left">
          <Col className="col-3 mt-5">
            <Form>
              <Form.Group controlId="formBasicuserName">
                <Form.Label>userName</Form.Label>
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
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  size="sm"
                  value={form.confirmPassword}
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
                block
                onClick={onSubmit}
              >
                Register
              </Button>
              <div>Already have an account?</div>
              <Link to="/login">Login here!</Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AutoPassLogin(Register);
