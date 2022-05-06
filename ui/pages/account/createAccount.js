import { useState } from 'react';
import {
  Button,
  Form
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/**
 * Requirement 1.1
 * User should be allowed to create an account
 */

export default function createAccount() {
  const [message, setMessage] = useState("");

  const schema = Yup.object().shape({
    username: Yup.string().min(2, "Username is too short").max(12, "Username can only be up to 12 characters").matches("^[a-zA-Z0-9_.-]*$", "Username contains invalid characters").required("A Username is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    /**
     * Requirement 1.3
     * Passwords should not have constraints that enforce insecure standards
     */
    password1: Yup.string().min(8, "Password is too short! (minimum 8 characters)").required("Password is required"),
    password2: Yup.string().required("Confirmation password is required").oneOf([Yup.ref('password1'), null], "Passwords must match")
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      username: '',
      email: '',
      password1: '',
      password2: ''
    },
    onSubmit: values => {
      fetch('http://localhost:8080/accounts/createAcct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(res => res.json())
      .then(json => {
        if (!json.ok) {
          setMessage(json.msg);
        } else {
          setMessage("Successfully created account!");
          window.location.href = '/account/login';
        }
      });
    }
  });

  return (
    <>
      <div className="container-sm mx-auto">
          
          {
            message
            ?
            <h3 className="text-center mt-2">{message}</h3>
            :
            <div/>
          }

          <Form onSubmit={formik.handleSubmit}>
          {/* 
            Requirement 1.2
            User should be allowed to choose a username
          */}
          <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={formik.touched.username && !formik.errors.username}
                isInvalid={formik.touched.username && !!formik.errors.username}
                placeholder="patrick500"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={formik.touched.email && !formik.errors.email}
                isInvalid={formik.touched.email && !!formik.errors.email}
                placeholder="hpotter@hogwarts.com"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password1"
                value={formik.values.password1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={formik.touched.password1 && !formik.errors.password1}
                isInvalid={formik.touched.password1 && !!formik.errors.password1}
                placeholder="MischiefManaged!"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password1}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="password2"
                value={formik.values.password2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={formik.touched.password2 && !formik.errors.password2}
                isInvalid={formik.touched.password2 && !!formik.errors.password2}
                placeholder="MischiefManaged!"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password2}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
      </div>
    </>
  )
}