import { useFormik } from 'formik';
import { useState } from 'react';
import {
  Container,
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

export default function LTC_LinkEditor({ link, onChange, onDelete }) {
  const formik = useFormik({
    initialValues: {
      title: link['title'],
      url: link['url']
    },
  });

  function passUp() {
    onChange(formik.values);
  }

  return (
    <div className="w-50 mx-auto mb-2 mt-3">
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className="mb-0">Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={passUp}
                  placeholder="Link Title"
                  name="title"
                />
              </Form.Group>
            </Col>
            <Col xs={7}>
              <Form.Group>
                <Form.Label className="mb-0">URL</Form.Label>
                <Form.Control
                  type="text"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  onBlur={passUp}
                  placeholder="https://example.com"
                  name="url"
                />
              </Form.Group>
            </Col>
            <Col xs={1} className="d-flex align-items-end">
              <Button variant="danger" onClick={onDelete}>&times;</Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  )
}