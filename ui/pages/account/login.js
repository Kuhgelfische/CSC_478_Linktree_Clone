import {useState} from 'react'
import { useFormik } from 'formik';
import {
  Button,
  Form
} from 'react-bootstrap';
import * as Yup from 'yup'

export default function login() {

  const [message, setMessage] = useState("");
  const schema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required")
  })
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      fetch('http://localhost:8080/accounts/login', {
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
          setMessage("Successfully logged in!");
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
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={formik.touched.password && !formik.errors.password}
                isInvalid={formik.touched.password && !!formik.errors.password}
                placeholder="MischiefManaged!"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="login">
              Login
            </Button>
          </Form>
      </div>
    </>
  )
}