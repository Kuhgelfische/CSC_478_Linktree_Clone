import {useState} from 'react'
import { useFormik } from 'formik';
import {
  Button,
  Form
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import * as Yup from 'yup'



export default function login() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
  })
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      username: '',
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
        /**
         * Requirement 1.4
         * Users should be able to log in with their credentials
         * and be directed to their account management
         */
          window.localStorage.setItem('_session', json.data['token']);
          window.location.href = '/account/manage';
        }
      });
    }
  });

  return (
    <>
      <div className="container-sm mx-auto">
          
          {
            message &&
            <h3 className="text-center mt-2">{message}</h3>
          }

          <Form onSubmit={formik.handleSubmit}>
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
                placeholder="superman5"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
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