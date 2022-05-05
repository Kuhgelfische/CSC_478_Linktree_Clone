import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Toast,
  Row,
  Col,
  Container
} from 'react-bootstrap';
import useSession from '../../hooks/session';
import { useFormik } from 'formik';
import LTC_Link from '../../components/link';

export default function manageAccount() {
  const session = useSession();
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  useEffect(() => {
    if (session) {
      fetch('http://localhost:8080/session/profile', {
        headers: {
          'x-session': session['token']
        }
      })
        .then(res => res.json())
        .then(json => {
          formik.setValues({
            ...formik.values,
            ...json.data
          })
        })
        .catch(err => console.error(err));
    }
  }, [session])

  function saveAll()
  {
    fetch('http://localhost:8080/session/profile', {
      method: 'PUT',
      headers: {
        'x-session': session['token'],
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formik.values
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.ok) {
          setToastText("Successfully saved!");
        } else {
          setToastText("Something went wrong: " + json.msg);
        }

        setShowToast(true);
      })
      .catch(err => console.log(err));
  }

  const formik = useFormik({
    initialValues: {
      bio: "",
      linkColor: "secondary"
    },
    enableReinitialize: true
  });

  return (
    <div>
      <h2 className="text-center">Manage Account</h2>
      <div>
        <div className='text-center mt-3'>
          <Button as="a" href="/account/links">Edit Links</Button>
        </div>
        
        <Form.Group className='w-50 mt-3 mx-auto'>
          <Form.Label className="mb-0">Bio</Form.Label>
          <Form.Control
            as="textarea"
            name="bio"
            rows={3}
            value={formik.values.bio}
            onChange={formik.handleChange}
            placeholder="Here's a little something about myself..."
          />
        </Form.Group>

        <Form.Group className='w-50 mt-3 mx-auto'>
          <Form.Label className='mb-0'>Link Color</Form.Label>
          <Container>
            <Row className='d-flex align-items-center'>
              <Col>
                <Form.Select
                  value={formik.values.linkColor}
                  onChange={formik.handleChange}
                  name="linkColor"
                >
                  <option value="secondary">Default</option>
                  <option value="primary">Blue</option>
                  <option value="success">Green</option>
                  <option value="danger">Red</option>
                  <option value="dark">Black</option>
                </Form.Select>
              </Col>
              <Col>
                <LTC_Link title="Example" url="#" color={formik.values.linkColor} />
              </Col>
            </Row>
          </Container>
        </Form.Group>

        <div className='text-center mt-3'>
          <Button variant="success" onClick={saveAll}>Save</Button>
        </div>
      </div>

      <div className='position-absolute top-0 end-0 p-2'>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide>
          <Toast.Header>
            <span className="font-bold me-auto">Alert</span>
          </Toast.Header>
          <Toast.Body>
            {toastText}
          </Toast.Body>
        </Toast>
      </div>
    </div>
  )
}