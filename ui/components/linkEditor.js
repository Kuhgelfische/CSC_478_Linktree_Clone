import { useFormik } from 'formik';
import { useState } from 'react';
import {
  Container,
  Form,
  Row,
  Col
} from 'react-bootstrap';

export default function LTC_LinkEditor({ link, onSave }) {
  const formik = useFormik({
    initialValues: {
      title: link['title'],
      url: link['url']
    },
    onSubmit: values => {
      onSave(values)
    }
  });

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
                  placeholder="Link Title"
                />
              </Form.Group>
            </Col>
            <Col xs={8}>
              <Form.Group>
                <Form.Label className="mb-0">URL</Form.Label>
                <Form.Control
                  type="text"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  placeholder="https://example.com"
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  )
}