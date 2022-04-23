import { useState } from 'react';
import {
  Button,
  Form
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function createAccount() {
  const [message, setMessage] = useState("");

  const schema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password1: Yup.string().min(8, "Password is too short! (minimum 8 characters)").required("Password is required"),
    password2: Yup.string().required("Confirmation password is required").oneOf([Yup.ref('password1'), null], "Passwords must match")
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
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