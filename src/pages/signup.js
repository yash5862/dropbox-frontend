import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../index.css";
import { apiClient } from "../common/general";
import { AppSettings } from "../appSettings";
import { Formik } from "formik";

export const Signup = () => {

  const navigate = useNavigate();
  const registerNow = (values, setSubmitting) => {
    apiClient({
      url: AppSettings.apiBaseURL + 'auth/signup',
      method: 'POST',
      data: values,
      isAuth: false,
      isToast: true
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      navigate("/");
    }).then(err => {
      setSubmitting(false);
    })
  }

  return (
    <div className="mainForm">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <div className="mainBox">
              <h1>Register Now</h1>

              <Formik
              initialValues={{ name: '', email: '', password: '' }}
              validate={values => {
                const errors = {};
                
                if (!values.name) {
                  errors.name = 'Name is Required!';
                }
                
                if (!values.email) {
                  errors.email = 'Email is Required!';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address!';
                }

                if (!values.password) {
                  errors.password = 'Password is Required!';
                } else if (values.password.length < 6){
                  errors.password = 'Password Must be atlease 6 characters!';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                registerNow(values, setSubmitting);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (

                <Form onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter name"
                    value={values.name} />
                  <Form.Text className="text-danger">
                  {errors.name && touched.name && errors.name}
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Email Address"
                    value={values.email} />
                  <Form.Text className="text-danger">
                  {errors.email && touched.email && errors.email}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter Password" />
                    <Form.Text className="text-danger">{errors.password && touched.password && errors.password}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
                <p className="mt-2">
                  Already Have an Account <Link to="/login">Login</Link> Now
                </p>
              </Form>
              )}
            </Formik>

              {/* <Form>
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
              </Form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
