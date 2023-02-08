import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from 'formik';
import "../index.css";
import { apiClient } from "../common/general";
import { AppSettings } from "../appSettings";

export const Login = () => {

  const navigate = useNavigate();
  const loginNow = (values, setSubmitting) => {
    apiClient({
      url: AppSettings.apiBaseURL + 'auth/login',
      method: 'POST',
      data: values,
      isAuth: false,
      isToast: true
    }).then((res) => {
      console.log('res', res);
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
            <h1>Login Now</h1>
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors = {};
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
                loginNow(values, setSubmitting);
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
                  Don't Have an Account <Link to="/signup">Register</Link> Now
                </p>
              </Form>

                // <form onSubmit={handleSubmit}>
                //   <input
                //     type="email"
                //     name="email"
                //     onChange={handleChange}
                //     onBlur={handleBlur}
                //     value={values.email}
                //   />
                //   {errors.email && touched.email && errors.email}
                //   <input
                //     type="password"
                //     name="password"
                //     onChange={handleChange}
                //     onBlur={handleBlur}
                //     value={values.password}
                //   />
                //   {errors.password && touched.password && errors.password}
                //   <button type="submit" disabled={isSubmitting}>
                //     Submit
                //   </button>
                // </form>
              )}
            </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
