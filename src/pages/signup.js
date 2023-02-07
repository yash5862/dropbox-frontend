import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../index.css";

export const Signup = () => {
  return (
    <div className="mainForm">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <div className="mainBox">
              <h1>Register Now</h1>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <p className="mt-2">
                  Already Have an Account <Link to="/login">Login</Link> Now
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
